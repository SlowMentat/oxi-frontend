import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.css';
import Styles from '../../root.css';
import {sendAsyncRequest/*, OxiAppConstants*/} from '../../App.js';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {handleUnauthorizedRequest, requestInterceptor, loginConfig, cookies} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {denormalizeOutfit} from '../../Util/Schema.js';
import VisibleFieldDropdownList from '../../Components/Containers/VisibleFieldDropdownList.js'
import LoginFormContainer from '../../Components/Containers/LoginFormContainer.js'
/*import TypeJacket from '../SvgAssets/Icons/TypeJacket.js';
import TypePants from '../SvgAssets/Icons/TypePants.js';
import TypeShirtLong from '../SvgAssets/Icons/TypeShirtLong.js';
import TypeShirtT from '../SvgAssets/Icons/TypeShirtT.js';
import TypeShorts from '../SvgAssets/Icons/TypeShorts.js';*/
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

import { Route, Switch, Redirect } from 'react-router-dom';


//=========Form selection switch block//=========

function FormDeck(props){
	switch(props.formType){
		case OxiAppConstants.FormType.LOGIN:
			console.log('login hit')
			return (
				<LoginFormContainer isModal={true}/>
				//<LoginFormContainer 
				//	cancelAction={props.cancelAction} 
				//	requestUrl={props.requestUrl}
				//	requestType={props.requestType}
				//	afterLoginSuccess={props.afterLoginSuccess}
				//	math={props.match}
				//	history={props.history}
				///>
			)
		case OxiAppConstants.FormType.ADD_ITEM:
			return (
				<ItemForm 
					cancelAction={props.cancelAction} 
					submitAction={props.submitAction} 
					submitContext="Add" 
					contents={props.contents} 
					itemAllIds={props.itemAllIds}
					modifyContentItems={props.modifyContentItems}
					brandIds={props.brandIds}
					brands={props.brands}
					retailerIds={props.retailerIds}
					retailers={props.retailers}
					itemLocation={props.itemLocation}
					editingItem={props.editingItem}

					math={props.match}
					history={props.history}

					getSuggestion={props.getSuggestion}
					getApparelTypes={props.getApparelTypes}

					allApparelTypes={props.allApparelTypes}
				/>
			)
		case OxiAppConstants.FormType.UPDATE_ITEM:
			return (
				<ItemForm 
					cancelAction={props.cancelAction} 
					submitAction={props.submitAction} 
					submitContext="Update"

					math={props.match}
					history={props.history}

					getSuggestion={props.getSuggestion}
					getApparelTypes={props.getApparelTypes}

					allApparelTypes={props.allApparelTypes}
				/>
			)
		case OxiAppConstants.FormType.DISCARD_EDITS:
			return (
				<DiscardForm 
					requestedNav={props.requestedNav}
					cancelAction={props.cancelAction}
					submitAction={props.confirmDiscardSubmitAction}
					outfits={props.outfits}
					contents={props.contents}
					items={props.items}
					clearUpdates={props.clearUpdates}
					clearInvalidations={props.clearInvalidations}

					math={props.match}
					history={props.history}
				/>
			)
		default:
			return null
	} 
}



export const InputTextField = ({context, type, name, onChange, toggleFocus, toggleBlur, textValue}) => {
	let backgroundColorStyle = context === 0 ? 
		({'background-color':'var(--retailer-dd-field-color)'}) : 
		({'background-color':'var(--user-dd-field-color)'});
	return(
		<div 
			className={FormStyles.nameField} 
			style={backgroundColorStyle}
		>
			<input 
				value={textValue} 
				type="text" 
				name={name} 
				placeholder={name/*(name == 'retailer' ? ("Where'd Ya Get It") : (name))*/} 
				onChange={onChange} 
				onFocus={toggleFocus} 
				onBlur={toggleBlur}
				style={backgroundColorStyle}
			/>
		</div>	
	)
}

const DropDownTypeContent = (props) => {
	console.log('dropDownType = ',props.type);
	return(
		<React.Fragment>
			<div style={{
				display: 'inline-block',
				width: '60px',
				height: '100%',
				'margin-left': '-25px',
			}}>
				<SvgIcon name={props.type}/>
			</div> 
			<div style={{
				display: 'inline-block',
				position: 'relative',
				height: '100%',
				width: 'calc(100% - 50px)',
				'margin-left': '10px'
			}}>
				<div style={{
					position: 'absolute',
					width: '100%',
					top: '12px',
				}}>
					{OxiAppConstants.ItemTypesByIconName[props.type].label}
				</div>
			</div>
		</React.Fragment>
	)
};

const DropDownItem = (props) => {
	return(
		<React.Fragment>
			<div className={FormStyles.ddItemPreviewPic_div}>
			</div>
			<div className={FormStyles.ddItemContent_div}>
				<div className={FormStyles.ddItemTitle_div}>
				</div>
				<div className={FormStyles.ddItemDescription_div}>
				</div>
			</div>
		</React.Fragment>
	);
}

class DropDownField extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isDown: false
		}
		this._handleOnInputFocus = this._handleOnInputFocus.bind(this);
		this._handleOnInputBlur = this._handleOnInputBlur.bind(this);
	}

	_handleOnInputFocus(event){
		this.setState(prevState => ({
				isDown: !prevState.isDown
			})
		);
		//Delete what any text existing in the text input
		this.props.dropdownSelected(event, '');
		this.props.hydrateTask();
	}

	_handleOnInputBlur(event){
		this.setState(prevState => ({
				isDown: !prevState.isDown
			})
		);
	}


	render(){
		//console.log('this.props.inputValue', this.props.inputValue);
		console.log('dropdownNames for ' + this.props.apparelType + ' = ', this.props.dropdownNames)
		let dropDownList = null;
		/*let borderColor = this.props.context === 0 ? 
			({'border-color':'var(--retailer-dd-field-color)'}) : 
			({'border-color':'var(--user-dd-field-color)'});*/
		return(
			<div>
				<InputTextField 
					context={this.props.context}
					textValue={this.props.inputValue}
					fieldType={this.props.fieldType} 
					name={this.props.fieldType.toLowerCase()}
					onChange={() => {this.props.onInputChange(event)}} 
					toggleFocus={() => this._handleOnInputFocus(event)}
					toggleBlur={() => this._handleOnInputBlur(event)}
				/>
				<div
					className={this.state.isDown ? FormStyles.dropDownContainer : FormStyles['dropDownContainer--hidden']}
					//style={borderColor}
				>
					<div style={{'margin-left':'10px','margin-right':'10px','margin-top':'10px'}}>
						{
							<VisibleFieldDropdownList 
								fieldType={this.props.fieldType} 
								context={this.props.context} 
								filteredApparelTypes={this.props.filteredApparelTypes}
								dropdownOptionSelected={this.props.dropdownOptionSelected} />
						}
					</div>
				</div>
			</div>
		);
	}
}


export class ItemForm extends React.Component{
	constructor(props){
		super(props);
		this.formType = {
			type1:'RETAILER TAGS',
			type2:'USER TAGS'
		}
		this.state = {
			selectedFormType:this.formType.type1,
			type1Entry:{
				retailer:'',
				item:'',
				size:'',
			},
			//Deprecated
			//type1SearchPromise:{
			//	retailer:[],
			//	item:[],
			//	size:[],				
			//},
			type1SearchSelection:{
				retailer:{},
				item:{},
				size:{},			
			},

			type2Entry:{
				retailer:'',
				apparelType:'',
				size:'',
			},
			//Deprecated
			//type2SearchPromise:{
			//	retailer:[],
			//	type:[],
			//	size:[],				
			//},
			type2SearchSelection:{
				retailer:{},
				apparelType:{},
				size:{},			
			},

			'types':[],
			'size':'',
			'retailer':'',
			'brand':'',
			'iconName':'',
		};
		this.type1EntryKeys = Object.keys(this.state.type1Entry);
		this.type2EntryKeys = Object.keys(this.state.type2Entry);

		this.hydrateType1Tasks = {
			[this.type1EntryKeys[0]]: () => ('retailer dropdown'),
			[this.type1EntryKeys[1]]: () => ('item dropdown'),
			[this.type1EntryKeys[2]]: () => ('size dropdown'),
		};
		this.hydrateType2Tasks = {
			[this.type2EntryKeys[0]]: () => ('retailer dropdown'),
			[this.type2EntryKeys[1]]: () => ('apparelType dropdown'),
			[this.type2EntryKeys[2]]: () => ('size dropdown'),
		};

		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._handleOnSubmit = this._handleOnSubmit.bind(this);
		this._handleDropdownSelected = this._handleDropdownSelected.bind(this);
		this._handleDropDownOptionSelected = this._handleDropDownOptionSelected.bind(this);
	}

	_handleInputFieldChange(event, entryType='', entryObj={}, searchResultType='', searchResultObj={}){

		this.setState(prevState => ({
			...prevState,
			[entryType]:{
				...this.state[entryType],
				...entryObj,
			},
			[searchResultType]:{
				...this.state[searchResultType],
				...searchResultObj
			}
		}));
	}

	_handleOnSubmit(event){
		let matchedBrand = Object.values(this.props.brands).filter((brand) => brand.name.toLowerCase().includes(this.state.brand.toLowerCase()));
		let matchedRetailers = Object.values(this.props.retailers).filter((retailer) => retailer.name.toLowerCase().includes(this.state.retailer.toLowerCase()));
		//console.log('matchedBrand length', matchedBrand.length);
		//console.log('matchedRetailers length', matchedRetailers.length);

		//if(matchedBrand.length > 0){
		//	if(matchedRetailers.length > 0){
				let itemEntity = this.state.selectedFormType === "USER TAGS" ?
					//Build custome user defined tag
					Object.assign(
						{}, 
						OxiAppConstants.EntityTemplates.ITEM, 
						{
							/*positionx: this.props.itemLocation.positionx,
							positiony: this.props.itemLocation.positiony,
							retailer: matchedRetailers[0].id,
							brand: matchedBrand[0].id,*/
							positionx: this.props.itemLocation.positionx,
							positiony: this.props.itemLocation.positiony,
							product: {
								handle: 'Custom Tag',
								udr: this.state.type2SearchSelection.retailer.name,
								uds: this.state.type2SearchSelection.size.size,
								onlineStoreUrl: 'tbd',
							},
							//retailer: this.state.type2SearchSelection.retailer,
							apparelType: this.state.type2SearchSelection.apparelType.id,
							//...this.state.type2SearchSelection.size,
							platform:'wearsit'
						}
					) :
					//Build existing tag
					Object.assign(
						{}, 
						OxiAppConstants.EntityTemplates.ITEM, 
						{
							id: this.state.type1SearchSelection.item.id,
							positionx: this.props.itemLocation.positionx,
							positiony: this.props.itemLocation.positiony,
							product: this.state.type1SearchSelection.item.itemSnippet.product,
							retailer: this.state.type1SearchSelection.retailer,
							//brand: matchedBrand[0].id
						}
					)

				console.log('itemEntity = ', itemEntity);
				//this.props.submitAction(this.state.apparelType, this.props.itemLocation.positionx, this.props.itemLocation.positiony, this.state.size, matchedRetailers[0].id, matchedBrand[0].id);
				this.props.submitAction(itemEntity);
				//TODO:  	commenting out line below, but there is a need to handle the ids of server persisted items as UUID
				// 			and any newly created item id as incremented integer... maybe calling edittingItem is not needed here
				//this.props.editingItem(this.props.itemAllIds);
				this.props.cancelAction();
				//this.props.history.goBack();
		//	}else{
		//		console.log('input is not an approved retailer');
		//	}
		//}else{
		//	console.log('input is not an approved brand');
		//}
	}

	//_handleDropdownSelected(event, selectionType, valueSelected){	
	_handleDropdownSelected(event, entryType, entryObj){	
		event.stopPropagation();
	}

	_handleDropDownOptionSelected(event, selectionType='', valueObj){
		event.stopPropagation();
		this.setState(prevState => ({
			...prevState,
			[selectionType]:{
				...this.state[selectionType],
				...valueObj
			}
		}));
	}

	_updateApparelTypes(event, data){
		this.setState(prevState => ({
			...prevState,
			types: data
		}))
	}

	render(){
		let retailerNames = [];	
		let brandNames = [];
		if(this.props.brands !== undefined && this.props.brands !== null){
			//create and array of names from the the byIds object to pass to DropDownField component
			brandNames = Object.values(this.props.brands).map((brand, ind) => {
				return (brand.name)
			});
		}
		if(this.props.retailers !== undefined && this.props.retailers !== null){
			//create and array of names from the the byIds object to pass to DropDownField component
			retailerNames = Object.values(this.props.retailers).map((retailer, ind) => {
				return (retailer.name)
			});
		}
		return(
			<div className={Styles.modal}>
				<div 
					id="form_containter_add_item" 
					className={FormStyles.formViewContainer_div} 
				>
					<div style={{'text-align':'center', height:'25px'}}>
						<div 
							className={this.state.selectedFormType === this.formType.type1 ? FormStyles['bangTab_div--selected'] : FormStyles.bangTab_div}
							onClick={event => this.setState({selectedFormType:this.formType.type1})} >
							{this.formType.type1}
						</div>
						<div
							className={this.state.selectedFormType === this.formType.type2 ? FormStyles['bangTab_div--selected'] : FormStyles.bangTab_div}
							onClick={event => this.setState({selectedFormType:this.formType.type2})} >
							{this.formType.type2}
						</div>
					</div>
					<CSSTransition
					    tiemout={200}
					    classNames="retailerItemFormContainer"
					    in={this.state.selectedFormType === this.formType.type1}
					    unmountOnExit>	
						<ExistingItems 
							allApparelTypes={this.props.allApparelTypes}
							getSuggestion={(uri) => this.props.getSuggestion(uri)}
							fieldsObj={this.state.type1Entry} 
							hydrateTasks={this.hydrateType1Tasks}
							handleInputFieldChange={(event, entryObj, searchResultObj) => this._handleInputFieldChange(event, 'type1Entry', entryObj, 'type1SearchPromise', searchResultObj)}
							handleDropdownSelected={(event, entryObj, searchResultObj) => this._handleDropdownSelected(event, 'type1Entry', entryObj, 'type1SearchPromise', searchResultObj)}
							handleDropdownOptionSelected={(event, valueObj) => this._handleDropDownOptionSelected(event, 'type1SearchSelection', valueObj) } />
					</CSSTransition>
					<CSSTransition
					    tiemout={200}
					    classNames="userItemFormContainer"
					    in={this.state.selectedFormType === this.formType.type2}
					    unmountOnExit>	
						<CustomItems 
							allApparelTypes={this.props.allApparelTypes}
							updateApparelTypes ={(data) => this._updateApparelTypes(data)}
							getApparelTypes={(uri) => this.props.getApparelTypes(uri)}
							getSuggestion={(uri) => this.props.getSuggestion(uri)}
							fieldsObj={this.state.type2Entry} 
							hydrateTasks={this.hydrateType2Tasks}
							handleInputFieldChange={(event, entryObj, searchResultObj) => this._handleInputFieldChange(event, 'type2Entry', entryObj, 'type2SearchPromise', searchResultObj)}
							handleDropdownSelected={(event, entryObj, searchResultObj) => this._handleDropdownSelected(event, 'type2Entry', entryObj, 'type2SearchPromise', searchResultObj)}
							handleDropdownOptionSelected={(event, valueObj) => this._handleDropDownOptionSelected(event, 'type2SearchSelection', valueObj) }  />
					</CSSTransition>
					<div className={FormStyles.addItemCtrlContainer_div}>
						<div className={FormStyles.addItem_div}>
							<div className={FormStyles.formL3Button} onClick={() => {this._handleOnSubmit(event)}}>
								{this.props.submitContext}
							</div>
						</div>
						<div style={{width:'100%'}}>
							<div className={FormStyles.cancelSelection_div}>
								<div 
									className={FormStyles.l1Button_div}
									style={{
										'text-align': 'right', 
										right: '17px'
									}}>
									cancel
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class ExistingItems extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		};
	}

	render(){
		return(
				<form className={FormStyles.addItemForm} action="" method="POST" autocomplete="off">
					{
						Object.keys(this.props.fieldsObj).map((key, ind) => (
							<DropDownField 
								context={0}
								fieldType={key} 
								onInputChange={(event) => {
									if(key === 'item'){ this.props.getSuggestion(encodeURI(`${OxiAppConstants.routeURIs.search.a}?retailer=${this.props.fieldsObj['retailer']}&term=${event.target.value}`)); }
									else if(key === "retailer"){ this.props.getSuggestion(encodeURI(`${OxiAppConstants.routeURIs.search.b}?term=${event.target.value}`)); }
									else if(key === "size"){  }
									this.props.handleInputFieldChange(event, {[key]: event.target.value}, null);
								}} 
								inputValue={this.props.fieldsObj[key]}
								dropdownItemIds={null}
								allApparelTypes={this.props.allApparelTypes}
								dropdownSelected={(event, value) => this.props.handleDropdownSelected(event, {[key]: value})}
								dropdownOptionSelected = {(event, value) => this.props.handleDropdownOptionSelected(event, {[key]: value})}
								hydrateTask={this.props.hydrateTasks[key]}
								style={{height:'50px'}}							
							/>
						))
					}
					{
					/*
					<DropDownField 
					type='Retailers' 
					onInputChange={() => this.props.handleInputFieldChange(event)} 
					inputValue={this.state.type}
					dropdownItemIds={null}
					dropdownNames={Object.keys(OxiAppConstants.ItemTypesByIconName)}
					dropdownSelected={(value) => this._handleDropdownSelected(event, 'type', OxiAppConstants.ItemTypesByIconName[value].label)}
					style={{height:'50px'}}
					/>
					<DropDownField 
					type='Size' 
					onInputChange={() => this.props.handleInputFieldChange(event)} 
					inputValue={this.state.size}
					dropdownItemIds={null} 
					dropdownNames={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
					dropdownSelected={(value) => this._handleDropdownSelected(event, 'size', value)}
					/>
					<DropDownField 
					textValue={this.state.retailer}
					type='Retailer' 
					onInputChange={() => this.props.handleInputFieldChange(event)} 
					inputValue={this.state.retailer}
					dropdownNames={retailerNames}
					//dropdownItemIds={this.props.retailerIds} 
					dropdownSelected={(value) => this._handleDropdownSelected(event, 'retailer', value)}
					/>
					<DropDownField 
					textValue={this.state.brand}
					type='Brand' 
					onInputChange={() => this.props.handleInputFieldChange(event)} 
					inputValue={this.state.brand}
					dropdownNames={brandNames}
					//dropdownItemIds={this.props.brandIds} 
					dropdownSelected={(value) => this._handleDropdownSelected(event, 'brand', value)}
					/>
					<div id="button_container" style={{'margin-top':'70px', 'margin-bottom':'10px', 'text-align':'center'}}>
						<div className={FormStyles.formL3Button} style={{display:'inline-block', 'margin-right':'calc(50% - (125px/2))'}} onClick={() => {this._handleOnSubmit(event)}}>
							{this.props.submitContext}
						</div>
						<div className={FormStyles.formL3Button} style={{'display':'inline-block'}} onClick={this.props.cancelAction}>
							Cancel
						</div>
					</div>
					*/}
				</form>
		);
	}
}

class CustomItems extends React.Component{
	constructor(props){
		super(props);
		this._getSuggestion = this._getSuggestion.bind(this);
		this.state = {
			filteredApparelTypes: null
		}
	}

	_getSuggestion(event, term){
		let filteredApparelTypes = (term !== null || term !== undefined) ? 
			this.props.allApparelTypes.filter((apparelType) => apparelType.name.toLowerCase().includes(term.toLowerCase())) : 
			null;

		this.setState(prevState => ({
			...prevState,
			filteredApparelTypes: filteredApparelTypes,
		}))
	}

	render(){
		return(
				<form className={FormStyles.addItemForm} action="" method="POST" autocomplete="off">

					{
						Object.keys(this.props.fieldsObj).map((key, ind) => (
							<DropDownField 
								context={1}
								fieldType={key} 
								filteredApparelTypes={this.state.filteredApparelTypes === null ? (this.props.allApparelTypes) : (this.state.filteredApparelTypes)}
								onInputChange={(event) => {
									if(key === 'retailer'){ this.props.getSuggestion(encodeURI(`${OxiAppConstants.routeURIs.search.c}?retailer=${event.target.value}`)); }
									else if(key === "apparelType"){/*this.props.apparelTypes.values/* this._getSuggestion(event, event.target.value);*/ }
									else if(key === "size"){ this.props.getSuggestion(encodeURI(`${OxiAppConstants.routeURIs.search.d}?size=${event.target.value}`)); }
									this.props.handleInputFieldChange(event, {[key]: event.target.value}, null);
								}} 
								inputValue={this.props.fieldsObj[key]}
								dropdownItemIds={null}
								dropdownNames={Object.keys(OxiAppConstants.ItemTypesByIconName)}
								dropdownSelected={(value) => {
									if(key === 'apparelType' && this.props.allApparelTypes.length === 0){
										this.props.getApparelTypes(encodeURI(`${OxiAppConstants.appUris.a}`));
									}
									this.props.handleDropdownSelected(event, {[key]: value})
								}}								
								dropdownOptionSelected = {(event, value) => this.props.handleDropdownOptionSelected(event, {[key]: value})}
								hydrateTask={this.props.hydrateTasks[key]}
								style={{height:'50px'}}							
							/>
						))
					}
					{/*
						Object.keys(this.props.fieldsObj).map(key => (
							<DropDownField 
								type={key} 
								onInputChange={(event) => {
									let searchPromise = this.props.getSuggestion(key, event.target.value);
									this.props.handleInputFieldChange(event, {[key]: event.taget.value}, {[key]: searchPromise})
								}} 
								inputValue={this.props.fieldsObj[key]}
								dropdownItemIds={null}
								dropdownNames={Object.keys(OxiAppConstants.ItemTypesByIconName)}
								dropdownSelected={(value) => this.props.handleDropdownSelected(event, {[key]: value})}
								hydrateTask={this.props.hydrateTasks[key]}
								style={{height:'50px'}}							
							/>
						))
					*/}
				</form>
		)
	}
}

/*export class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'inputNameVal':'',
			'inputPasswordVal':'',
			'isAuthenticated':false,
		};
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._onSubmitLogin = this._onSubmitLogin.bind(this);
	}

	_handleInputFieldChange(e, type){
		//e.stopPropagation();
		switch (type){
			case 'name':
				this.setState({inputNameVal: e.target.value});
				break;
			case 'password':
				this.setState({inputPasswordVal: e.target.value});
				break;
			default:
				break;
		}
	}

	_onSubmitLogin(e, username, password){
		//e.stopPropagation();
		//var formData = new FormData();
		//formData.append('username', username);
		//formData.append('password', password);
		//console.log(formData);
		console.log('calling axio post request from Login Form');
		axios(loginConfig(username, password))
		.then(response => {
			if(response.status == OxiAppConstants.HttpStatus.OK){
				//append the authorization token expected in the 200 /login response onto the defualt Authorization header
				cookies.set('authorization', cookies.get('authorization') + response.headers['authorization']);
				axios.defaults.headers.common['authorization'] = cookies.get('authorization');
				this.props.cancelAction !== undefined ? this.props.cancelAction() : null;
				this.props.history !== undefined ? this.props.history.goBack() : null;
				if(this.props.afterLoginSuccess !== undefined){
					this.props.afterLoginSuccess(this.props.requestUrl, this.props.requestType);
					this.setState(prevState => ({
						isAuthenticated: true,
					}));
				}else{
					console.log('afterLoginSuccess not defined');
				}
			}else{
				//handleUnauthorizedRequest(response);
			}
		}).catch((error) => {
			console.log('error caught from login form: ',error);
		});
		e.preventDefault();
	}

	render(){
		return(
			<React.Fragment>
			{
				this.state.isAuthenticated ? 
					(<Redirect to={`${OxiAppConstants.webAppBaseURL}${OxiAppConstants.routeURIs.browse}`}/>) :
					(<div className={(this.props.isModal === undefined || this.props.isModal === true) ? Styles.modal : null}>
						<div id="form_containter_add_item" style={{'background-color':'#fdfdfd', padding:'10px', 'border-radius':'3px', 'width':'25%'}}>
							<form className={FormStyles.loginForm} action="" method="POST">
								<InputTextField 
									type="User Name" 
									name="username" 
									onChange={(event) => {this._handleInputFieldChange(event, 'name')}}/>
								<InputTextField 
									type="Password" 
									name="password"
									onChange={(event) => {this._handleInputFieldChange(event, 'password')}}/>
								<div 
									className={FormStyles.formL3Button} 
									onClick={(event) => {this._onSubmitLogin(event, this.state.inputNameVal, this.state.inputPasswordVal)}} 
								>
									SUBMIT
								</div>
							</form>
						</div>
					</div>)
			}
			</React.Fragment>
		);
	}
}*/


export class DiscardForm extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		/*let denormContents = [];
		//Build denormalized contents object array
		console.log('this.props.contents = ', this.props.contents)
		console.log('Object.values(this.props.contents) = ', Object.values(this.props.contents))
		for(let content of Object.values(this.props.contents)){
			let denormItems = [];
			//Build denormalized items object array
			for(let itemId of content.items){
				denormItems = [...denormItems, this.props.items[itemId]]
			}
			console.log('content = ', content)
			console.log('denormalized items = ', denormItems)
			denormContents = [...denormContents, Object.assign(content, {items: denormItems})]
		}
		console.log('denormalized contents = ', denormContents)
		//build denormalized outfit object
		let denormOutfit = Object.assign({}, this.props.outfits['1'], {contents: denormContents});*/
		let denormOutfit = null;
		//denormOutfit = denormalizeOutfit(this.props.outfits, this.props.contents, this.props.items);
		console.log('denormOutfit = ', denormOutfit)
		return(
			<div className={Styles.modal}>
				<div id="form_containter_add_item" style={{'background-color':'#fdfdfd', padding:'10px', 'border-radius':'3px', 'width':'25%'}}>
					<div id="prompt">
						<div style={{'text-align':'center','width':'75%','margin':'auto','margin-bottom':'60px'}}>
							<div style={{'text-align':'left'}}>
								<p> You are leaving edit mode.  Any changes made will be lost! Do you want to continue</p>
							</div>
						</div>
						<div 
							className={FormStyles.formL3Button} 
							style={{'margin-right': 'calc(100% - 250px)', 'display':'inline-block'}} 
							onClick={() => {
								this.props.submitAction(this.props.requestedNav/*, denormOutfit*/);
								this.props.clearUpdates();
								this.props.clearInvalidations();
							}
						}>
							Continue
						</div>
						<div 
							className={FormStyles.formL3Button} 
							style={{'display':'inline-block'}} 
							onClick={(event) => {
								event.stopPropagation();
								this.props.cancelAction(OxiAppConstants.FormType.DISCARD_EDITS);
							}}>
							Cancel
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FormDeck