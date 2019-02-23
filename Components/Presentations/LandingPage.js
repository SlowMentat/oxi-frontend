import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Media from "react-media";

//Presentation Components
import LandingPageContainer from '../../Components/Containers/LandingPageContainer.js'
import { SiteNav } from '../../Components/Presentations/WebAppView.js'

//SVG Assets
import FemaleFront from '../../Components/SvgAssets/FemaleFront.js'
import FemaleSide from '../../Components/SvgAssets/FemaleSide.js'
import MaleFront from '../../Components/SvgAssets/MaleFront.js'
import MaleSide from '../../Components/SvgAssets/MaleSide.js'
import MaleSideVertMirrored from '../../Components/SvgAssets/MaleSideVertMirrored.js'
import FemaleSideVertMirrored from '../../Components/SvgAssets/FemaleSideVertMirrored.js'

//Third Party
import fetch from 'cross-fetch'
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//CSS Styles
import Styles from '../../root.css';
import NavStyles from '../../nav.css';
import FormStyles from '../../forms.css';
import CreateAccountStyles from '../../createAccount.css';
import ProfileMenuStyles from '../../profileMenu.css';

//Constants
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//SVG
import {stepOne} from '../../Content/SvgLandingPage'
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

const descriptionContainerStyle = {
	'font-family': 'Comfortaa, cursive',
	'text-align':'center',
	'width':'800px',
	'margin':'auto',
	'padding-top':'110px',
	//'padding-bottom':'50px',
	'color':'#fdfdfd',
	'background-color':'#212121'
}

const getStartedStyle = {
	'font-family': 'Comfortaa, cursive',
	'position': 'relative',
	'left':'50%',
	'transform':'translateX(-50%)',
    'top': '-30px',
    'text-align': 'center',
    'background-color': '#fdfdfd',
    'padding-left': '10px',
    'padding-right': '10px',
    'width':'120px'
}

const inputTextProfileStyle = {
	'font-size':'30px'
}

const inputTextProfileForm = {

}

const submitBtnStyle = {
	'width':'150px',
	'margin':'auto',
	'margin-top':'15px',
	'border-radius':'5px',
	'padding': '11px',
	'background-color': '#434343',
	'color':'#fdfdfd'
}

const descriptionBlockStyle = {
	'width':'50%',
	'display':'inline-block',
	'heigh':'250px'
}

const descriptionBlockImgStyle = {
	'width':'100%',
	'height':'100%'
}


const Description = (props) => (
	<div style={descriptionContainerStyle}>
		<div>  </div>
		<div>
			<div style={{
				'margin-bottom':'2.5em',
				'font-size':'30px',
				'font-family': 'sans-serif'
			}}>  
				Join the community of shoppers, designers, and retailers. 
			</div>
		</div>
	</div>
);

const InputTextField = ({props}) => {
	return(
		<div className={props.containerStyle}>
			{props.type} <input 
				//pattern={props.name === 'password' ? "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" : null}
				value={props.value}
				type="text" 
				name={props.name} 
				placeholder={props.placeholder} 
				onChange={props.onChange} 
				className={props.inputStyle}
				style={props.selectedFieldName === props.name ? ({'border-color':'white'}) : ({})}
				onFocus={props.onSelect} />
		</div>	
	);
};

const InputNumberField = ({props}) => (
	<div className={props.containerStyle}>
		{props.type} <input 
			id="measurementField"
			value={props.value}
			type="number"
			step="0.01"
			min="0"
			max="999.99" 
			name={props.name} 
			placeholder={props.placeholder} 
			onChange={props.onChange} 
			className={props.inputStyle}
			onFocus={props.onSelect}
		/>
	</div>	
);

const RadioButton = (props) => (
	<div style={this.props.selected ? radioSelectedStyle : radioDeselectedStyle} onClick={() => this.props.toggleRadio(this.props.id)}>
	</div>
)

const CheckBox = (props) => (
	<div style={this.props.selected ? radioSelectedStyle : radioDeselectedStyle} onClick={() => this.props.toggleCheckBox(this.props.id)}>
	</div>
)

//make sure to perfom server side validation
function validateEmail(email) {
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('hello')
    //regular expression that accepts unicode
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}



function validateUsername(email) {
	//make a GET request with username to server to verify uniqueness
}

const CreateAccountField = ({props}) => (
	<div className={CreateAccountStyles.inputContainer_div}>
		<InputTextField props={{
			containerStyle: CreateAccountStyles.inputTextContainer_div, 
			inputStyle: CreateAccountStyles.inputText_input, 
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
							left: 't0px'
						}} />
				}
			</div>
		</div>
	</div>
);

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

class GetStarted extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'email':'',
			'password':'',
			'username':'',
			'validEmailSyntax': false,
			'validPasswordLength': false,
			'validPasswordUppercase': false,
			'validPasswordNumber': false,
			'validPasswordLowercase': false,
			'validUsername': true,
			'selectedFieldName': ''
		};
		this._handleOnSubmit = this._handleOnSubmit.bind(this);
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._handleInputSelect = this._handleInputSelect.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
	}

	_handleOnSubmit(){
		console.log("\"Creat Profile\" clicked");
		if(this.state.validEmailSyntax && 
			(this.state.validPasswordLength && this.state.validPasswordLowercase && this.state.validPasswordNumber && this.state.validPasswordUppercase) && 
			this.state.validUsername) this.props.createUser(this.state.email, this.state.password, this.state.username);
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
			'validPasswordLength': validPasswordLength,
			'validPasswordUppercase': validPasswordUppercase,
			'validPasswordNumber': validPasswordNumber,
			'validPasswordLowercase': validPasswordLowercase,			
		}));
	}

	_handleInputFieldChange(field, e){
		this.setState({
			[field]:e.target.value
		});
		console.log('type = ', typeof e.target.value);
		switch(field){
			case 'email':
				if(validateEmail(e.target.value)){
					this.setState({'validEmailSyntax': true})
				} else {
					console.log('unsuccess')
					this.setState({'validEmailSyntax': false})
				}
				break;
			case 'password':
				this.validatePassword(e.target.value);
				break;
			case 'username':
				/*if(validateUsername(e.target.value)){
					this.setState({'validUsername': true})
				} else {
					this.setState({'validUsername': false})
				}*/
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
						<form action="" method="POST">
							<div className={CreateAccountStyles.formContent_div}>
								<CreateAccountField 
									props={{
										name:'email', 
										placeholder:'Email', 
										onChange: (e) => this._handleInputFieldChange('email', e),
										selectedFieldName: this.state.selectedFieldName,
										onSelect: (e) => this._handleInputSelect('email', e),
										isValid: this.state.validEmailSyntax
									}}/>
								<CreateAccountField 
									props={{
										name:'password', 
										placeholder:'Password', 
										onChange: (e) => this._handleInputFieldChange('password', e),
										selectedFieldName: this.state.selectedFieldName,
										onSelect: (e) => this._handleInputSelect('password', e),
										isValid: (this.state.validPasswordLength && this.state.validPasswordLowercase && this.state.validPasswordNumber && this.state.validPasswordUppercase)
									}}/>
								<div style={{height:'68px', 'padding-top':'10px'}}>
									{
										!(this.state.validPasswordLength && this.state.validPasswordLowercase && this.state.validPasswordNumber && this.state.validPasswordUppercase) ?
											<InvalidPasswordPrompt props={{
												validPasswordLength: this.state.validPasswordLength,
												validPasswordUppercase: this.state.validPasswordUppercase,
												validPasswordLowercase: this.state.validPasswordLowercase,
												validPasswordNumber: this.state.validPasswordNumber
											}}/> :
											null
									}
								</div>
								<CreateAccountField 
									props={{
										name:'username', 
										placeholder:'Username', 
										onChange: (e) => this._handleInputFieldChange('username',e),
										selectedFieldName: this.state.selectedFieldName,
										onSelect: (e) => this._handleInputSelect('username', e),
										isValid: this.state.validUsername
									}}/>
								<div className={CreateAccountStyles.inputContainer_div} style={{'margin-top':'35px', 'height':'30px'}}>
									<div className={CreateAccountStyles.inputTextContainer_div}>
										<div className={CreateAccountStyles.inputAcceptTermsContainer_div}>
											<div className={CreateAccountStyles.inputAcceptTerms_div}>
												<input type='checkbox' className={CreateAccountStyles.inputAcceptTerms_checkbox}>
												</input>
											</div>
										</div>
										<div className={CreateAccountStyles.textAcceptTermsContainer_div}>
											<div className={CreateAccountStyles.textAcceptTerms_div}>
												I agree to the Wearsit Terms of Service
											</div>
										</div>
									</div>
									<div className={CreateAccountStyles.validatorIconContainer_div}>										
										<div className={CreateAccountStyles.submitBtnContainer_div}>
											<div
												className={CreateAccountStyles.submitBtn_div} 
												onClick={() => {this._handleOnSubmit()}} style={{'text-align':'center'}}>
												Continue
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

class ProfileFieldWrapper extends React.Component{
	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps){
		const differentField = this.props.field !== nextProps.field;
		const differentCallback = this.props.callback !== nextProps.callback;
		return differentField || differentCallback;
	}

	render(){
		return(
			<div>
				<div className={ProfileMenuStyles.inputNumberContainer_div} style={this.props.style || {}}>
					<InputNumberField props={{
						containerStyle: ProfileMenuStyles.inputNumber_div,
						inputStyle: ProfileMenuStyles.inputNumber_input,
						name: this.props.field,
						placeholder: "",
						value: this.props.value,
						onChange:() => this.props.callback(),
						onSelect:this.props.onSelect,
					}}/>
					<div className={ProfileMenuStyles.inputNumberLabel_div}>
						{this.props.field}
					</div>
				</div>
			</div>		
		);
	}
}

const radioListStyle = {
	'display':'inline-block',
	'text-align':'left',
	'margin-right':'10px'
};
const radioAndCheckContainerStyle = {
    'display': 'inline-block',
    'width':'40px',
    'margin-right':'10px'
}
const radioStyle = { 
	'width': '15px',
    'height': '15px',
    'border-style': 'solid',
   	'border-radius': '7.5px',
    'border-width': '1px'
}
const selectedRadioStyle = { 
	'width': '15px',
    'height': '15px',
    'border-style': 'solid',
   	'border-radius': '7.5px',
    'border-width': '1px',
    'background-color':'black'
}
const checkBoxStyle = {
	'width': '15px',
    'height': '15px',
    'border-style': 'solid',
   	'border-radius': '2px',
    'border-width': '1px'
}
const selectedCheckBoxStyle = {
	'width': '15px',
    'height': '15px',
    'border-style': 'solid',
   	'border-radius': '2px',
    'border-width': '1px',
    'background-color':'black'	
}
const radioTitleStyle = {
	'font-size':'10px'
}
const bodySvgContianerStyles = {
	'width': '50%',
	'display': 'inline-block'
}
const maleContainer = {
	'height':'calc(100vh - 80px)', 
	'width':'90%',
	'margin':'auto',
	'margin-top':'80px',
	'vertical-align':'top'
}
const femaleContainer = {								
	'width': '75%',
	'display': 'block',
	'margin':'auto',
	'margin-top': '185px'	
}

class ProfileMenu extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.test);
		this.menuPage1 = 'Measurements';
		this.menuPage2 = 'Tolerance';

		if(!this.props.test){
			this.state = {
				'profileData':{
					//'id': this.props.profile.id,
					'username':this.props.profile.username,
					'bodyShape': 'female',
					'womens':false,
					'mens':false,				
				}
			}
		}

		//Hydrate all profile fields with a random float.  Used for creating test profiles.
		//Generated values in inches :)
		else{
			let maxHeight = 84;
			let minHeight = 48;
			let height = minHeight + (Math.random() * (maxHeight - minHeight));
			this.state = {
				'prevSelectedField':'',
				'selectedField':'',
				'fieldListTitle':this.menuPage1,
				'profileData':{
					'username':this.props.profile.username,
					'bodyShape': 'female',
					'womens':false,
					'mens':false,	
					'height': height,
					'neck': (Math.random() * height),
					'fullShoulder':(Math.random() * height),
					'halfShoulder':(Math.random() * height),
					'chest':(Math.random() * height),
					'waist':(Math.random() * height),
					'hips':(Math.random() * height),
					'sleeve':(Math.random() * height),
					'frontLength':(Math.random() * height),
					'backLength':(Math.random() * height),
					'pantInseam':(Math.random() * height),
					'pantOutseam':(Math.random() * height),
					'thigh':(Math.random() * height),
					'calf':(Math.random() * height)
				}			
			}
		}

		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._handleRadioToggled = this._handleRadioToggled.bind(this);
		this._handleBoxChecked = this._handleBoxChecked.bind(this);
		this._handleOnSubmit = this._handleOnSubmit.bind(this);
		this._handleFieldFocus = this._handleFieldFocus.bind(this);
		this._handleFieldBlur = this._handleFieldBlur.bind(this);
		this._goToMeasurments = this._goToMeasurments.bind(this);
		this._goToTolerance = this._goToTolerance.bind(this);
	}

	_handleInputFieldChange(e, field){
		this.setState(prevState => ({
			'profileData':{
				...prevState.profileData,				
				[field]:e.target.value
			}
		}));
	}
	_handleRadioToggled(selection){
		this.setState(prevState => ({
			'profileData':{
				...prevState.profileData,
				'bodyShape':selection
			}
		}));
	}
	_handleBoxChecked(type){
		this.setState(prevState => ({
			'profileData':{
				...prevState.profileData,
				[type]: !prevState.profileData[type]
			}
		}));
	}
	_handleFieldFocus(event){
		console.log('event.target.name = ', event.target.name)
		this.setState(prevState => ({
			selectedField: event.target.name
		}));
	}
	_handleFieldBlur(event){
		/*this.setState(prevState => ({
			prevSelectedField: event.target.name
		}));*/
	}
	_handleOnSubmit(){
		//When calling modifyProfile the profileData object is passed as the action payload.
		//The reducer is expecting this payload to contain an id field which is uses as a key
		//to reference the payload data in the redux state tree.  This id field needs to be
		//added explicitly here because it is left undefined when the profile object is 
		//returned by the server, which is refernced to dynamically build this.state.
		//profileData fields
		let scrubbedProfileState = Object.assign({}, this.state.profileData, {id: 1});
		this.props.modifyProfile(scrubbedProfileState);
		this.props.postProfile(this.state.profileData);
	}

	_goToMeasurments(){
		this.setState(prevState => ({
			fieldListTitle: this.menuPage1
		}))
	}

	_goToTolerance(){
		this.setState(prevState => ({
			fieldListTitle: this.menuPage2
		}))
	}

	render(){
		//TODO:  push this to the select in LandingPageConnector.js
		//This filters what properties to display on the Profile Creation page
		let fields = Object.keys(this.props.profile);
		let filteredFields =  fields.filter(field => field != 'id')
		.filter(field => field != 'height')
		.filter(field => field != 'bodyShape')
		.filter(field => field != 'mens')
		.filter(field => field != 'username')
		.filter(field => field != 'womens')
		.filter(field => field != 'apparelInterest')
		.filter(field => field != 'country');
		console.log('filteredFields');
		console.log(filteredFields);
		let fieldSet = filteredFields.map(field => {
			//console.log(this.state.profileData[field]);
			return(
				<ProfileFieldWrapper key={field} field={field} value={this.state.profileData[field]} callback={()=>{this._handleInputFieldChange(event, field)}} onSelect={() => this._handleFieldFocus(event)}/>
			);
		});
		let bodyShapeContainer = (this.state.profileData.bodyShape === 'female') ? femaleContainer : maleContainer;
		console.log('bodyShapeContainer = ', bodyShapeContainer);
		console.log('fieldSet');
		console.log(fieldSet);
		return(
			<div>
				<div style={{							
    				'display': 'inline-block',
    				'width': '42.5%',
    				'vertical-align':'top'
    			}}>
					<div id='leftBodyDiagramContainer' style={bodyShapeContainer}>
						<div style={bodySvgContianerStyles}>
							{this.state.profileData.bodyShape === 'male' ? <MaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : <FemaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>}
						</div>
						<div style={bodySvgContianerStyles}>
							{this.state.profileData.bodyShape === 'male' ? <MaleSide allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : <FemaleSide allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>}
						</div>
					</div>
				</div>
				<div 
					//id='fieldList'
					className={ProfileMenuStyles.fieldList_div}>
					<div className={ProfileMenuStyles.fieldListTitleContainer1_div} >
						<div className={ProfileMenuStyles.fieldListTitleContainer2_div} >
							<div className={ProfileMenuStyles.fieldListTitle_div} >
								{ this.state.fieldListTitle }
							</div>
						</div>
					</div>
					<ProfileFieldWrapper field='country' value={this.state.profileData['USA']} callback={()=>{this._handleInputFieldChange(event, 'country')}}/>
					<div style={{'margin-bottom':'10px'}} >
									<div>
										<div>
											<div id="bodyShape" style={{'text-align':'left', 'margin-top':'10px'}} >
												<div id="bodyShapeRadioList" style={radioListStyle}>
													<div id="female" style={radioAndCheckContainerStyle}>
														<div id='bodyShapeTitle' style={radioTitleStyle}>Female</div>
														<div id='bodyShapeRadio' style={this.state.profileData.bodyShape === 'female' ? selectedRadioStyle : radioStyle} onClick={() => this._handleRadioToggled('female')}></div>
													</div>
													<div id="male" style={{'display':'inline-block'}}>
														<div id='bodyShapeTitle' style={radioTitleStyle}>Male</div>
														<div id='bodyShapeRadio' style={this.state.profileData.bodyShape === 'male' ? selectedRadioStyle : radioStyle} onClick={() => this._handleRadioToggled('male')}></div>										
													</div>
												</div>
												<div id="bodyShapeTitle" style={{'display':'inline-block', 'vertical-align':'bottom'}}>
													Body Shape
												</div>								
											</div>
											<div id="apparelInterest" style={{'text-align':'left','margin-top':'10px'}} >
												<div id="apperelInterestRadioList" style={radioListStyle}>
													<div id="womens" style={radioAndCheckContainerStyle}>
														<div style={radioTitleStyle}>Womens</div>
														<div style={this.state.profileData.womens ? selectedCheckBoxStyle : checkBoxStyle} onClick={() => this._handleBoxChecked('womens')} ></div>
													</div>
													<div id="mens" style={{'display':'inline-block'}}>
														<div style={radioTitleStyle}>Mens</div>
														<div style={this.state.profileData.mens ? selectedCheckBoxStyle : checkBoxStyle} onClick={() => this._handleBoxChecked('mens')}></div>
													</div>
												</div>
												<div id="apparelInterestTitle" style={{'display':'inline-block', 'vertical-align':'bottom'}}>
													Apperel Interest
												</div>			
											</div>								
										</div>
									</div>
					</div>
					<ProfileFieldWrapper field='height' value={this.state.profileData['height']} callback={()=>{this._handleInputFieldChange(event, 'height')}}/>
					{fieldSet}
					<div className={ProfileMenuStyles.btnsContainer_div}>
						<div className={ProfileMenuStyles.btns_div}>
							{
								this.state.fieldListTitle === this.menuPage2 ?
									(
										<div 
											onClick={() => {this._goToMeasurments()}} 
											className={ProfileMenuStyles.goBackBtnText_div}>
											Back
										</div>
									) :
									null
							}
							<div 
								onClick={() => {this.state.fieldListTitle === this.menuPage1 ? this._goToTolerance() : this._handleOnSubmit()}} 
								className={ProfileMenuStyles.submitBtnText_div} >
								{this.state.fieldListTitle === this.menuPage1 ? ('Next') : ('Submit')}
							</div>
						</div>
					</div>					
				</div>
				<div style={{							
    				'display': 'inline-block',
    				'width': '42.5%',
    				'vertical-align':'top'
				}}>
					<div  id='rightBodyContainer' style={bodyShapeContainer}>
						<div style={bodySvgContianerStyles}>
							{this.state.profileData.bodyShape === 'male' ? <MaleSideVertMirrored allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : <FemaleSideVertMirrored allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>}
						</div>
						<div style={bodySvgContianerStyles}>
							{this.state.profileData.bodyShape === 'male' ? <MaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : <FemaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}



class Step extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<div style={{'display':'inline-block'}}>
					
				</div>
				<div style={{'display':'inline-block'}}>
					
				</div>
			</div>
		);
	}
}

class HowItWorks extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<div style={{'width':'600px','margin':'auto','margin-top':'100px'}}>
					<div style={descriptionBlockStyle}>
						<svg
							width="300px"
							height="250px"
							viewBox="0 0 73.999998 52.000001"
							id="svg8">
							<g>
							  <circle
							     style={{'fill':'#424242','fill-opacity':'1','stroke':'none','stroke-width':'2.48643565','stroke-linecap':'round','stroke-miterlimit':'4','stroke-dasharray':'none','stroke-opacity':'1'}}
							     id="path851"
							     cx="36.533382"
							     cy="12.887323"
							     rx="10.586014"
							     ry="10.014877" />
							</g>
							<g>
							  <path
							     id="path885"
							     style={{'fill':'#424242','fill-opacity':'1','stroke':'#424242','stroke-width':'0.43077734px','stroke-linecap':'butt','stroke-linejoin':'miter','stroke-opacity':'1'}}
							     d="m 30.050843,291.35458 c 0,0 0,2.58466 2.584664,2.58466 2.584663,0 2.584663,-2.49551 2.584663,-2.49551 l 0,-6.9816 h 1.292332 V 268.95415 H 22.29685 c 0,0 -2.584663,0 -2.584663,2.58467 0,2.58465 2.512814,2.58465 2.512814,2.58465 h 6.102733 c 0,0 1.723109,0 1.723109,1.72312 v 1.7231 13.78489" />
							</g>
						</svg>
					</div>
					<div style={descriptionBlockStyle}>
						Create a profile then add your measurements by following our guide
					</div>

					<div style={descriptionBlockStyle}>
						Upload and tag photos to let everyone know where you got your outfit
					</div>
					<div style={descriptionBlockStyle}>
						<img src={OxiAppConstants.ContentDirectories.IMAGES + "/step1.svg"} style ={descriptionBlockImgStyle}/>						
					</div>

					<div style={descriptionBlockStyle}>
						<img src={OxiAppConstants.ContentDirectories.IMAGES + "/step1.svg"} style ={descriptionBlockImgStyle}/>						
					</div>
					<div style={descriptionBlockStyle}>
						Browse outfits from other profiles and see how well it fits your body type with our fit meter
					</div>

					<div style={descriptionBlockStyle}>
						Once you find a fit that fits, follow the tag to the online retailer to treat yourself
					</div>
					<div style={descriptionBlockStyle}>
						<img src={OxiAppConstants.ContentDirectories.IMAGES + "/step1.svg"} style ={descriptionBlockImgStyle}/>						
					</div>
				</div>
			</div>
		);
	}
}

class CreateAccount extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<div 
					style={{
						height: '100vh', 
						'background-color':'#212121',
						'padding-top':'200px'
					}}>
					<div>
						<div style={{
							'width': '800px',
    						'margin': 'auto',
    						'padding-left': '50px',
						}}>
							<div>
								<GetStarted style={getStartedStyle} createUser={this.props.createUser}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class Portal extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isMouseOver: false
		}

		this._handleMouseEnter = this._handleMouseEnter.bind(this);
		this._handleMouseLeave = this._handleMouseLeave.bind(this);
	}

	_handleMouseEnter(event){
		this.setState(prevState => ({
			isMouseOver: true,
		}))
	}

	_handleMouseLeave(event){
		this.setState(prevState => ({
			isMouseOver: false,
		}))
	}

	render(){
		return(
			<div
				onMouseEnter={(event) => this._handleMouseEnter(event)}
				onMouseLeave={(event) => this._handleMouseLeave(event)} 
				className={Styles.portalContainer_div}
				onClick={this.props.enterPortal}
			>
				<div 
					className={Styles.portalMask_div}
					style={!this.state.isMouseOver ? ({display: 'block'}) : ({display:'none'})}>
				</div>
				<div 
					className={Styles.portalGraphicContainer_div}
					style={this.state.isMouseOver ? ({'border-color': this.props.highlight}) : ({})}
				>
					<div>
					</div>
				</div>
				<div 
					className={Styles.portalContentContainer_div}
				>
					<div>
						<div 
							className={Styles.portalHeader_div} 
							style={this.state.isMouseOver ? ({color: this.props.highlight}) : ({})}
						>
							<h2>{this.props.title}</h2>
						</div>
						<div className={Styles.portalDescription_div}>
							<p>{this.props.description}</p>
						</div>
						<div 
							className={Styles.signUpBtnContainer_div} 
							style={{    
								'text-align':'right',
								'font-size':'18px',
								'position':'relative',
								'height':'calc(200px - (36px + 69px + 5px))',
							}} >
							<div 
								className={Styles.signupBtn_div} 
								style={this.state.isMouseOver ? ({'display': 'block'}) :  ({'display':'none'}) }
								onClick={(event) => {
									event.stopPropagation();
									this.props.navToCreatAccount(this.props.title.toLowerCase())
								}}>
								<div className={Styles.signupBtnText_div} >
									{this.props.actionIndicator}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={Styles.infoLinkContainer_div}>
					<div className={Styles.infoLink_div}>
						►
					</div>
				</div>
			</div>
		);
	}
}

export default class LandingPage extends React.Component{
	constructor(props){
		super(props);
	}

	render() {
		return(
			<React.Fragment>
				<SiteNav webAppView={!this.props.profileMenu ? 'landing' : ''}/>
				<div>				
					{
						this.props.profileMenu ? (
								<ProfileMenu 
									profile={this.props.addedProfile !== undefined ? this.props.addedProfile : this.props.profile} 
									test={true}
									toggleRadio={this.props.toggleRadio} 
									postProfile={this.props.postProfile} 
									modifyProfile={this.props.modifyProfile}
									profileId={this.props.addedProfileId} />
							) : 
							(this.props.createAccountView === 'none' || this.props.createAccountView === '') ? (
									<div>
										<div 
											style={{
												height: '100vh', 
												'background-color':'#212121',
												'padding-top':'200px'
											}}
										>
											{/*<Description/>*/}
											<div style={{height: '100%', 'width':'900px', margin:'auto', 'margin-top': '25px'}}>
												<Portal 
													title="Shopper"
													description="Join the community of shoppers, designers, and retailers to streamline your online shopping experience.  Discover new apparel styles, be confident in the fit, and get rewarded while you're at it."
													infoLink={null}
													highlight='#6dd7b4'
													actionIndicator="create account"
													enterPortal={() => this.props.navStateToBrowse(this.props.handlePortalSelect)}
													navToCreatAccount={this.props.navToCreatAccount}
												/>
												<Portal 
													title="Designer"
													description="Curate your creative works, get inspired, and get connected"
													infoLink={null}
													highlight='#70ccf4'
													actionIndicator="create account"
													enterPortal={() => console.log('Designer portal clicked')}
													navToCreatAccount={this.props.navToCreatAccount}
												/>
												<Portal 
													title="E-Retailer"
													description="Get your apparel noticed!  Leverage our community affiliate program to increase exposure and gain insights on what's trending."
													infoLink={null}
													highlight='#e0c570'
													actionIndicator="create account"
													enterPortal={() => console.log('E-Retailer portal clicked')}
													navToCreatAccount={this.props.navToCreatAccount}
												/>
											</div>
										</div>
										<GetStarted style={getStartedStyle} createUser={this.props.createUser}/> 
										<HowItWorks/>
									</div>
								) : 
								this.props.createAccountView === 'shopper' ? (
										<React.Fragment>
											<Redirect to='/account-shopper' />
											<Route path='/account-shopper' render={props => <CreateAccount accountType="shopper" createUser={this.props.createUser}/>} /> 
										</React.Fragment>
									) : 
									null
					}								
				</div>
			</React.Fragment>
		);
	}
}