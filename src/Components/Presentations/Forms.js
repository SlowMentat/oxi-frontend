import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.scss';
import Styles from '../../root.scss';
//import {sendAsyncRequest/*, OxiAppConstants*/} from '../../App.js';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {handleUnauthorizedRequest, requestInterceptor, loginConfig, cookies} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {denormalizeOutfit} from '../../Util/Schema.js';
import VisibleFieldDropdownList from '../../Components/Containers/VisibleFieldDropdownList.js'
import LoginFormContainer from '../../Components/Containers/LoginFormContainer.js'
import {InputTextField, InputTextFieldAccount} from '../../Components/Presentations/CommonElements.js';
/*import TypeJacket from '../SvgAssets/Icons/TypeJacket.js';
import TypePants from '../SvgAssets/Icons/TypePants.js';
import TypeShirtLong from '../SvgAssets/Icons/TypeShirtLong.js';
import TypeShirtT from '../SvgAssets/Icons/TypeShirtT.js';
import TypeShorts from '../SvgAssets/Icons/TypeShorts.js';*/
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import CreateAccountStyles from '../../createAccount.scss';

import { Route, Switch, Redirect } from 'react-router-dom';


//=========Form selection switch block//=========

function FormDeck(props){
	switch(props.formType){
		case OxiAppConstants.FormType.LOGIN:
			console.log('login hit')
			return (
				<LoginFormContainer isModal={true}/>
			)

		case OxiAppConstants.FormType.ADD_ITEM:
			return (
				<ItemForm 
					{
						...{
							...props,
							submitContext: "Add",
						}
					}			
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



/*export const InputTextField = ({context, type, name, onChange, toggleFocus, toggleBlur, textValue}) => {
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
				placeholder={name} 
				onChange={onChange} 
				onFocus={toggleFocus} 
				onBlur={toggleBlur}
				style={backgroundColorStyle}
			/>
		</div>	
	)
}*/


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
		console.log('dropdownNames for ' + this.props.apparelType + ' = ', this.props.dropdownNames)
		let dropDownList = null;

		return(
			<div
				className={FormStyles.nameFieldContainer_div}
			>
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
					style={(this.state.isDown && initialInnerHeight > 0) ? ({height: `calc(${initialScreenHeight}px/2 - 80px)`}) : ({})}
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
		this.prevAddedItemIds = [];

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

	componentDidUpdate(prevProps){
		this.prevAddedItemIds = [];

		// Assuming anything added to itemAllIds are appended, so the new ids are determined from the diff in lengths
		// Extract only number type ids which represent added unpersisted items
		this.prevAddedItemIds = this.props.itemAllIds.slice(prevProps.length, this.props.itemAllIds.length).filter(id => typeof id === 'number');
		this.prevAddedItemIds.length > 0 && this.props.clientInvalidateAddedItems(this.prevAddedItemIds);
	}

	_handleInputFieldChange(event, entryType='', entryObj={}, searchResultType='', searchResultObj={}){
		const entryObjKey = Object.keys(entryObj)[0];

		this.setState(prevState => ({
			...prevState,
			[entryType]:{
				...prevState[entryType],
				...entryObj,
			},
			/**
			* Have to detect when entryObj contains retailer property because retailer
			* name in type2SearchSelection.retailer object is saved as name property.
			*/
			...(
				(/^(type2)/).test(entryType) ? 
					// Update state with entered value
					({
						type2SearchSelection: {
							...prevState.type2SearchSelection,
							[entryObjKey]: {
								...prevState.type2SearchSelection[entryObjKey],
								[(entryObjKey === 'retailer' ? 'name' : entryObjKey)]: entryObj[entryObjKey],
							}
						}
					}) :
					// Clear previously selected value if input changes
					({
						type1SearchSelection: {
							...prevState.type1SearchSelection,
							[entryObjKey]: {},
						}						
					})
			),
			[searchResultType]:{
				...prevState[searchResultType],
				...searchResultObj
			}
		}));
	}

	_handleOnSubmit(event){
		let matchedBrand = Object.values(this.props.brands).filter((brand) => brand.name.toLowerCase().includes(this.state.brand.toLowerCase()));
		let matchedRetailers = Object.values(this.props.retailers).filter((retailer) => retailer.name.toLowerCase().includes(this.state.retailer.toLowerCase()));
		
		let itemEntity = null;

		if(this.state.selectedFormType === "USER TAGS"){
			//Build custome user defined tag
			itemEntity = Object.assign(
				{}, 
				OxiAppConstants.EntityTemplates.ITEM, 
				{
					positionx: this.props.itemLocation.positionx,
					positiony: this.props.itemLocation.positiony,
					product: {
						...OxiAppConstants.EntityTemplates.CUSTOM_PRODUCT_TEMPLATE,
						handle: 'Custom Tag',
						udr: this.state.type2SearchSelection.retailer.name,
						uds: this.state.type2SearchSelection.size.size,
						onlineStoreUrl: 'tbd',
					},
					apparelType: this.state.type2SearchSelection.apparelType.id,
					platform:OxiAppConstants.PLATFORM,
				}
			)
		}

		else{
			let {item, size, retailer} = this.state.type1SearchSelection;
			//Build existing tag
			this.props.createSizeGroup({ [size.id]: size} );
			itemEntity = Object.assign(
				{}, 
				OxiAppConstants.EntityTemplates.ITEM, 
				{
					id: item.id,
					positionx: this.props.itemLocation.positionx,
					positiony: this.props.itemLocation.positiony,
					product: {
						...OxiAppConstants.EntityTemplates.STANDARD_PRODUCT_TEMPLATE,
						...item.itemSnippet.product,
						//size: size,
						retailer: retailer,
					},
					////Note we store size in this way rather than adding it to the product object
					////This is done to be consistent in the way that size information is read from item entities
					////in both preview and edit modes
					////sizeChartDto:{
					//	...OxiAppConstants.EntityTemplates.ITEM.sizeChartDto,
					//	sizeGroupDtos: [{
					//		...OxiAppConstants.EntityTemplates.SIZE_GROUP,
					//		...size
					//	}]
					//}
					sizeChartDto: null,
					sizeGroupId: size.id,
					//platform: item.platform,
				}
			)
		}

		console.log('itemEntity = ', itemEntity);
		this.props.submitAction(itemEntity);
		//TODO:  	commenting out line below, but there is a need to handle the ids of server persisted items as UUID
		// 			and any newly created item id as incremented integer... maybe calling edittingItem is not needed here
		//this.props.editingItem(this.props.itemAllIds);
		this.props.cancelAction();
	}

	//_handleDropdownSelected(event, selectionType, valueSelected){	
	_handleDropdownSelected(event, entryType, entryObj){
		
		event.stopPropagation();
		//let {size} = entryObj;
		//size !== undefined && this.state.type1SearchSelection.item.id !== undefined ? 
		//	this.props.getSizeChartByItemId(this.state.type1SearchSelection.item.id) : 
		//	null;
	}

	_handleDropDownOptionSelected(event, selectionType='', valueObj){
		
		event.stopPropagation();		
		let {item} = valueObj;
		item !== undefined ? this.props.getSizeChartByItemId(item.id) : null

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
			<div 
				className={Styles.modal}
				style={ initialInnerHeight > 0 ? ({height: `${initialInnerHeight}px`}) : ({}) }
			>
				<CSSTransition 
					timeout={300}
					classNames="formViewContainer_div"
					in={true}
					unmountOnExit>
					<div 
						id="form_container_add_item"
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
						    timeout={200}
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
						    timeout={200}
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
										}}
										onClick={this.props.cancelAction} >
										cancel
									</div>
								</div>
							</div>
						</div>
					</div>
				</CSSTransition>
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
				</form>
		)
	}
}


export class DiscardForm extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let denormOutfit = null;
		console.log('denormOutfit = ', denormOutfit)

		return(
			<div className={Styles.modal}>
				<div 
					id="form_container_add_item" 
					className={FormStyles.discardFormViewContainer_div}
				>
					<div id="prompt">
						<div style={{'text-align':'center','width':'75%','margin':'auto','margin-bottom':'60px'}}>
							<div style={{'text-align':'left'}}>
								<p style={{color: '#353535'}}> You are leaving edit mode.  Any changes made will be lost! Do you want to continue</p>
							</div>
						</div>
						<div style={{
							width:'75%',
							margin: 'auto',
							position: 'relative',
							height: '36px'
						}}>
							<div 
								className={FormStyles.formL3Button} 
								style={{position:'absolute', left:'0px', top:'0px'}} 
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
								style={{position:'absolute', right:'0px', top:'0px'}} 
								onClick={(event) => {
									event.stopPropagation();
									this.props.cancelAction(OxiAppConstants.FormType.DISCARD_EDITS);
								}}>
								Cancel
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


const InvalidPasswordPrompt = ({props}) => (
	<div className={CreateAccountStyles.invalidInputPrompt_div}>
		{
			!props.validPasswordLength ? 
				(
					<div className={CreateAccountStyles.invalidMessageContainer_div}>
						<div className={CreateAccountStyles.invalidMessage_div}>
							At least 10 characters
						</div>
					</div>
				) : 
				null
		}
		{
			!props.validPasswordUppercase ? 
				(
					<div className={CreateAccountStyles.invalidMessageContainer_div}>
						<div className={CreateAccountStyles.invalidMessage_div}>
							At least 1 uppercase character
						</div>
					</div>
				) : 
				null
		}
		{
			!props.validPasswordLowercase ? 
				(
					<div className={CreateAccountStyles.invalidMessageContainer_div}>
						<div className={CreateAccountStyles.invalidMessage_div}>
							At least 1 lowercase character
						</div>
					</div>
				) : 
				null
		}
		{
			!props.validPasswordNumber ? 
				(
					<div className={CreateAccountStyles.invalidMessageContainer_div}>
						<div className={CreateAccountStyles.invalidMessage_div}>
							At least 1 number
						</div>
					</div>
				) : 
				null
		}
	</div>
)

//TODO:  Make sure to perfom server side validation as weell.
const validateEmail = (email) => {
    //regular expression that accepts unicode
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

export const CreateAccountField = ({props}) => (
	<div className={CreateAccountStyles.inputContainer_div}>
		<InputTextFieldAccount props={{
			containerStyle: CreateAccountStyles.inputTextContainer_div, 
			inputStyle: (props.selectedFieldName === props.name ? CreateAccountStyles['inputText_input--selected'] : CreateAccountStyles.inputText_input), 
			name: props.name, 
			placeholder: props.placeholder, 
			onChange: props.onChange,
			onSelect: props.onSelect,
			selectedFieldName: props.selectedFieldName
		}}/>
		<div className={CreateAccountStyles.validatorIconContainer_div}>
			<div className={CreateAccountStyles.validatorIcon_div}>
				{
					props.isValid ? 
						<SvgIcon name='OkIcon' fill='#6dd7b4'/> :
						<div style={{
							width:'10px', 
							height:'10px', 
							'border-radius':'5px', 
							'background-color':'#b46262', 
							position:'absolute', 
							top: '10px',
							left: 'calc(50% - 5px)'
						}} />
				}
			</div>
		</div>
	</div>
);

export class CreateAccountForm extends React.Component{
	constructor(props){
		super(props);

		let sharedState = {
			fieldValues:{
				'email':'',
				'password':'',
				'username':'',
			},
			fieldPlaceHolders:{
				'email':'Email',
				'password':'Password',
				'username':'Username',
			},
			fieldCompleteness:{
				email:{
					'validEmailSyntax': false,
				},
				password:{
					'validPasswordLength': false,
					'validPasswordUppercase': false,
					'validPasswordNumber': false,
					'validPasswordLowercase': false,
				},
				username:{
					'validUsername': true,
				}
			},
			'selectedFieldName': ''		
		};

		this.state = this.props.accountType === 'shopper' ? 
			({
				...sharedState,
			}) :
			this.props.accountType === 'retailer' ? 
				({
					...sharedState,
					fieldValues: {
						...sharedState.fieldValues,
						'country':'',
						'state':'',
						'city':'',
						'address1':'',
						'address2':'',
					},
					fieldPlaceHolders:{
						...sharedState.fieldPlaceHolders,
						'username': 'Company Name',
						'email': 'Company Email',
						'country':'Country',
						'state':'State',
						'city':'City',
						'address1':'Address 1',
						'address2':'Address 2',						
					},
					fieldCompleteness:{
						...sharedState.fieldCompleteness,
						'country':{},
						'state':{},
						'city':{},
						'address1':{},
						'address2':{},
					}
				}) :
				({
					...sharedState,
				})
		this._handleOnSubmit = this._handleOnSubmit.bind(this);
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._handleInputSelect = this._handleInputSelect.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
	}

	_handleOnSubmit(){

		const {validEmailSyntax} = this.state.fieldCompleteness.email;
		const {validPasswordLength, validPasswordLowercase, validPasswordNumber, validPasswordUppercase} = this.state.fieldCompleteness.password;
		const {validUsername} = this.state.fieldCompleteness.username;

		if(validEmailSyntax && (validPasswordLength && validPasswordLowercase && validPasswordNumber && validPasswordUppercase) && validUsername){
			if(this.props.accountType === 'shopper'){
				this.props.createUser(this.state.fieldValues);
			}else if (this.props.accountType === 'retailer'){
				this.props.createCompany(this.state.fieldValues);
			}
		}
		//Clear email password and username from react state
		this.setState({
			'email':'',
			'password':'',
			'username':''
		});
	}

	validatePassword(password) {
		let validPasswordLength = false;
		let validPasswordUppercase = false;
		let validPasswordNumber = false;
		let validPasswordLowercase = false;
		//At least one lowercase character
		if ((/[a-z]/g).test(password)){
			validPasswordLowercase = true
		}
		//At least one uppercase character
		if ((/[A-Z]/g).test(password)){
			validPasswordUppercase = true;
		}
		//At least one digit in password
		if ((/[0-9]/g).test(password)){
			validPasswordNumber = true
		}
		//At least 10 characters long
		if (password.length >= 10){
			validPasswordLength = true;
		}

		this.setState(prevState => ({
			...prevState,
			fieldCompleteness:{
				...prevState.fieldCompleteness,
				password:{
					...prevState.fieldCompleteness.password,
					'validPasswordLength': validPasswordLength,
					'validPasswordUppercase': validPasswordUppercase,
					'validPasswordNumber': validPasswordNumber,
					'validPasswordLowercase': validPasswordLowercase,	
				}
			}	
		}));
	}

	_handleInputFieldChange(field, value){
		this.setState(prevState => ({
			...prevState,
			fieldValues:{
				...prevState.fieldValues,
				[field]: value,
			}
		}));

		switch(field){
			case 'email':
				let isEmailValid = validateEmail(value);
				this.setState(prevState => ({
					...prevState,
					fieldCompleteness:{
						...prevState.fieldCompleteness,
						[field]:{
							validEmailSyntax: isEmailValid,
						}
					}
				}));
				break;
			case 'password':
				this.validatePassword(value);
				break;
			case 'username':
				break;
			default:
				break
		}

	}

	_handleInputSelect(name, e){
		console.log('_handleInputSelect triggered')
		this.setState(prevState => ({
			selectedFieldName: name
		}))
	}

	render(){
		return(
			<div>
				<div className={CreateAccountStyles.accountFormContainer_div}>
					<div>
						{
							(<form action="" method="POST">
								<div className={CreateAccountStyles.formContent_div}>
									{
										Object.keys(this.state.fieldValues).map(field => {
											const fieldValidReducer = (accumulator, currentValue) => (accumulator && this.state.fieldCompleteness[field][currentValue]);
											return(
												<React.Fragment>
													<CreateAccountField 
														props={{
															name:field, 
															placeholder:this.state.fieldPlaceHolders[field], 
															onChange: (e) => this._handleInputFieldChange(field, e.target.value),
															selectedFieldName: this.state.selectedFieldName,
															onSelect: (e) => this._handleInputSelect(field, e),
															isValid: Object.keys(this.state.fieldCompleteness[field]).reduce(fieldValidReducer, true)
														}}/>
													{
														field === 'password' ? 
															(<div 
																//style={{height:'68px', 'padding-top':'10px'}}
																className={CreateAccountStyles.invalidInputPromptContainer_div}
															>
																{
																	!(this.state.fieldCompleteness[field].validPasswordLength && 
																		this.state.fieldCompleteness[field].validPasswordLowercase && 
																		this.state.fieldCompleteness[field].validPasswordNumber && 
																		this.state.fieldCompleteness[field].validPasswordUppercase) ?
																		<InvalidPasswordPrompt props={{
																			validPasswordLength: this.state.fieldCompleteness[field].validPasswordLength,
																			validPasswordUppercase: this.state.fieldCompleteness[field].validPasswordUppercase,
																			validPasswordLowercase: this.state.fieldCompleteness[field].validPasswordLowercase,
																			validPasswordNumber: this.state.fieldCompleteness[field].validPasswordNumber
																		}}/> :
																		null
																}
															</div>) : 
															null
													}
												</React.Fragment>
											);
										})
									}
									<div 
										//className={CreateAccountStyles.inputContainer_div} 
										className={CreateAccountStyles.submitContainer_div}
										//style={{
										//	'margin-top':'35px', 'height':'30px',
//
										//}}
									>
										<div className={CreateAccountStyles.termsTextContainer_div}>
											<div className={CreateAccountStyles.inputAcceptTermsContainer_div}>
												<div className={CreateAccountStyles.inputAcceptTerms_div}>
													<input type='checkbox' className={CreateAccountStyles.inputAcceptTerms_checkbox}>
													</input>
												</div>
											</div>
											<div className={CreateAccountStyles.textAcceptTermsContainer_div}>
												<div className={CreateAccountStyles.textAcceptTerms_div}>
													<p>By clicking submit, you are agreeing to the <a style={{color:'var(--color6)'}}>Fitsee Terms of Service</a></p>
												</div>
											</div>
										</div>
										<div className={CreateAccountStyles.submitBtnContainer1_div}>										
											<div className={CreateAccountStyles.submitBtnContainer_div}>
												<div
													className={CreateAccountStyles.submitBtn_div} 
													onClick={
														() => {
															logout();
															this._handleOnSubmit()
														}
													} 
													style={{'text-align':'center'}}>
													SUBMIT
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>)
						}
					</div>
				</div>
			</div>
		);
	}
}

export default FormDeck