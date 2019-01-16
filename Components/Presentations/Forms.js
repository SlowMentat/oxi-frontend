import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.css';
import Styles from '../../root.css';
import {sendAsyncRequest/*, OxiAppConstants*/} from '../../App.js';
import axios from 'axios';
import {handleUnauthorizedRequest, requestInterceptor, loginConfig} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {denormalizeOutfit} from '../../Util/Schema.js';
/*import TypeJacket from '../SvgAssets/Icons/TypeJacket.js';
import TypePants from '../SvgAssets/Icons/TypePants.js';
import TypeShirtLong from '../SvgAssets/Icons/TypeShirtLong.js';
import TypeShirtT from '../SvgAssets/Icons/TypeShirtT.js';
import TypeShorts from '../SvgAssets/Icons/TypeShorts.js';*/
import {SvgIcon} from '../SvgAssets/SvgIcon.js';


//=========Form selection switch block//=========

function FormDeck(props){
	switch(props.formType){
		case OxiAppConstants.FormType.LOGIN:
			console.log('login hit')
			return (
				<LoginForm 
					cancelAction={props.cancelAction} 
					requestUrl={props.requestUrl}
					requestType={props.requestType}
					afterLoginSuccess={props.afterLoginSuccess}
				/>
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
				/>
			)
		case OxiAppConstants.FormType.UPDATE_ITEM:
			return (
				<ItemForm 
					cancelAction={props.cancelAction} 
					submitAction={props.submitAction} 
					submitContext="Update"
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
				/>
			)
		default:
			return null
	} 
}



const InputTextField = ({type, name, onChange, toggleFocus, toggleBlur, textValue}) => (
	<div className={FormStyles.nameField}>
		<input 
			value={textValue} 
			type="text" 
			name={name} 
			placeholder={(name == 'retailer' ? ("Where'd Ya Get It") : (name))} 
			onChange={onChange} 
			onFocus={toggleFocus} 
			onBlur={toggleBlur}
		/>
	</div>	
)

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
		this.props.dropdownSelected('')
	}

	_handleOnInputBlur(event){
		this.setState(prevState => ({
				isDown: !prevState.isDown
			})
		);
	}


	render(){
		//console.log('this.props.inputValue', this.props.inputValue);
		console.log('dropdownNames for ' + this.props.type + ' = ', this.props.dropdownNames)
		return(
			<div>
				<InputTextField 
					textValue={this.props.inputValue}
					type={this.props.type} 
					name={this.props.type.toLowerCase()}
					onChange={() => {this.props.onInputChange(event)}} 
					toggleFocus={() => this._handleOnInputFocus(event)}
					toggleBlur={() => this._handleOnInputBlur(event)}
				/>
				<div className={FormStyles.dropDownContainer} style={this.state.isDown ? null : {display:'none'}}>
					<div style={{'margin-left':'10px'}}>
						{
							this.props.inputValue ? 
							this.props.dropdownNames.filter((dropdownName) => dropdownName.toLowerCase().includes(this.props.inputValue.toLowerCase())).map((dropdownName) => (
								<div 
									className={FormStyles.dropdownItemContainer} 
									style={this.props.style} 
									onMouseDown={() => this.props.dropdownSelected(dropdownName)}>
									{
										OxiAppConstants.ItemTypesByIconName[dropdownName] !== undefined ? (<DropDownTypeContent type={dropdownName}/>) : dropdownName								
									}
								</div>)
							) : 
							this.props.dropdownNames.map((dropdownName) => (
								<div 
									className={FormStyles.dropdownItemContainer}
									style={this.props.style} 
									onMouseDown={() => this.props.dropdownSelected(dropdownName)}>
									{
										OxiAppConstants.ItemTypesByIconName[dropdownName] !== undefined ? (<DropDownTypeContent type={dropdownName}/>) : dropdownName									
									}
								</div>
							))
						}
					</div>
				</div>
			</div>
		);
	}
}

//=========Add Item Form

export class ItemForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'type':'',
			'size':'',
			'retailer':'',
			'brand':'',
			'iconName':'',
		};
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._handleOnSubmit = this._handleOnSubmit.bind(this);
		this._handleDropdownSelected = this._handleDropdownSelected.bind(this);
	}

	_handleInputFieldChange(event){
		//e.stopPropagation();
		const target = event.target;

		switch (target.name){
			case 'type':
				this.setState({
					type: event.target.value
				});
				break;
			case 'size':
				this.setState({size: event.target.value});
				break;
			case 'retailer':
				this.setState({retailer: event.target.value});
				break;
			case 'brand':
				this.setState({brand : event.target.value});
				break;
			default:
				console.log("target names not found in Item input feilds")
				break;
		}
	}

	_handleOnSubmit(event){
		let matchedBrand = Object.values(this.props.brands).filter((brand) => brand.name.toLowerCase().includes(this.state.brand.toLowerCase()));
		let matchedRetailers = Object.values(this.props.retailers).filter((retailer) => retailer.name.toLowerCase().includes(this.state.retailer.toLowerCase()));
		//console.log('matchedBrand length', matchedBrand.length);
		//console.log('matchedRetailers length', matchedRetailers.length);

		if(matchedBrand.length > 0){
			if(matchedRetailers.length > 0){
				let itemEntity = Object.assign(
					{}, 
					OxiAppConstants.EntityTemplates.ITEM, 
					{
						...this.state,
						positionx: this.props.itemLocation.positionx,
						positiony: this.props.itemLocation.positiony,
						retailer: matchedRetailers[0].id,
						brand: matchedBrand[0].id,
					}); 
				console.log('itemEntity = ', itemEntity);
				//this.props.submitAction(this.state.type, this.props.itemLocation.positionx, this.props.itemLocation.positiony, this.state.size, matchedRetailers[0].id, matchedBrand[0].id);
				this.props.submitAction(itemEntity);
				//TODO:  	commenting out line below, but there is a need to handle the ids of server persisted items as UUID
				// 			and any newly created item id as incremented integer... maybe calling edittingItem is not needed here
				//this.props.editingItem(this.props.itemAllIds);
				this.props.cancelAction();
			}else{
				console.log('input is not an approved retailer');
			}
		}else{
			console.log('input is not an approved brand');
		}
	}

	_handleDropdownSelected(event, selectionType, valueSelected){	
		event.stopPropagation()	
		switch (selectionType){
			case 'type':
				this.setState({type: valueSelected});
				break;
			case 'size':
				this.setState({size: valueSelected});
				break;
			case 'retailer':
				this.setState({retailer: valueSelected});
				break;
			case 'brand':
				this.setState({brand : valueSelected});
				break;
			default:
				console.log("target names not found in Item input feilds")
				break;
		}		
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
				<div id="form_containter_add_item" style={{'background-color':'#fdfdfd', padding:'10px', 'border-radius':'3px', 'width':'550px'}}>
					<form className={FormStyles.addItemForm} action="" method="POST" autocomplete="off">
						<DropDownField 
							type='Type' 
							onInputChange={() => this._handleInputFieldChange(event)} 
							inputValue={this.state.type}
							dropdownItemIds={null}
							dropdownNames={Object.keys(OxiAppConstants.ItemTypesByIconName)}
							dropdownSelected={(value) => this._handleDropdownSelected(event, 'type', OxiAppConstants.ItemTypesByIconName[value].label)}
							style={{height:'50px'}}
						/>
						<DropDownField 
							type='Size' 
							onInputChange={() => this._handleInputFieldChange(event)} 
							inputValue={this.state.size}
							dropdownItemIds={null} 
							dropdownNames={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
							dropdownSelected={(value) => this._handleDropdownSelected(event, 'size', value)}
						/>
						<DropDownField 
							textValue={this.state.retailer}
							type='Retailer' 
							onInputChange={() => this._handleInputFieldChange(event)} 
							inputValue={this.state.retailer}
							dropdownNames={retailerNames}
							//dropdownItemIds={this.props.retailerIds} 
							dropdownSelected={(value) => this._handleDropdownSelected(event, 'retailer', value)}
						/>
						<DropDownField 
							textValue={this.state.brand}
							type='Brand' 
							onInputChange={() => this._handleInputFieldChange(event)} 
							inputValue={this.state.brand}
							dropdownNames={brandNames}
							//dropdownItemIds={this.props.brandIds} 
							dropdownSelected={(value) => this._handleDropdownSelected(event, 'brand', value)}
						/>
						<div id="button_container" style={{'margin-top':'70px', 'margin-bottom':'10px', 'text-align':'center'}}>
							<div className={FormStyles.submitButton} style={{display:'inline-block', 'margin-right':'calc(50% - (125px/2))'}} onClick={() => {this._handleOnSubmit(event)}}>
								{this.props.submitContext}
							</div>
							<div className={FormStyles.submitButton} style={{'display':'inline-block'}} onClick={this.props.cancelAction}>
								Cancel
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

/*AddItem.propTypes = {
	onClick: propTypes.func.isRequried
}*/

//=========Login Form=========
export class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'inputNameVal':'',
			'inputPasswordVal':''
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
		/*var formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		console.log(formData);*/
		console.log('calling axio post request from Login Form');
		axios(loginConfig(username, password))
		.then(response => {
			if(response.status == OxiAppConstants.HttpStatus.OK){
				this.props.cancelAction();
				this.props.afterLoginSuccess(this.props.requestUrl, this.props.requestType);
			}else{
				//handleUnauthorizedRequest(response);
			}
		}).catch((error) => {
			console.log('error caught from login form: ',error);
		});
		/*sendAsyncRequest(
					{},
					formData,
					'POST',
					'http://72.14.177.220/gs-convert-jar-to-war-0.1.0/login',
					this.props.cancelAction()
		);*/
		e.preventDefault();
		//throw OxiAppConstants.NavigationException.USER_SUBMITTED
	}

	render(){
		return(
			<div className={Styles.modal}>
				<div id="form_containter_add_item" style={{'background-color':'#fdfdfd', padding:'10px', 'border-radius':'3px', 'width':'25%'}}>
					<form className={FormStyles.loginForm} action="" method="POST">
						<InputTextField type="User Name" name="username" onChange={(event) => {this._handleInputFieldChange(event, 'name')}}/>
						<InputTextField type="Password" name="password" onChange={(event) => {this._handleInputFieldChange(event, 'password')}}/>
						<div className={FormStyles.submitButton} onClick={(event) => {
								this._onSubmitLogin(event, this.state.inputNameVal, this.state.inputPasswordVal)
							}
						}>
							SUBMIT
						</div>
					</form>
				</div>
			</div>
		);
	}
}

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
							className={FormStyles.submitButton} 
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
							className={FormStyles.submitButton} 
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
/*Login.propTypes = {
	onClick: propTypes.func.isRequired
}*/

export default FormDeck
//export default Login
//export default Login
//export default FormDeck