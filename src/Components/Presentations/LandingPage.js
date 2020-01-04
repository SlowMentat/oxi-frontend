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
import Styles from '../../root.scss';
import NavStyles from '../../nav.scss';
import FormStyles from '../../forms.scss';
import CreateAccountStyles from '../../createAccount.scss';
import ProfileMenuStyles from '../../profileMenu.scss';

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

//const submitBtnStyle = {
//	'width':'150px',
//	'margin':'auto',
//	'margin-top':'15px',
//	'border-radius':'5px',
//	'padding': '11px',
//	'background-color': '#434343',
//	'color':'#fdfdfd'
//}

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
				//style={props.selectedFieldName === props.name ? ({'border-color':'white'}) : ({})}
				onFocus={props.onSelect} />
		</div>	
	);
};

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

export const CreateAccountField = ({props}) => (
	<div className={CreateAccountStyles.inputContainer_div}>
		<InputTextField props={{
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

export const InvalidPasswordPrompt = ({props}) => (
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

class CreateAccountForm extends React.Component{
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

		/*let getFieldValueUpdater = e => prevState => ({
			...prevState,
			fieldValues:{
				...prevState.fieldValues,
				[field]: e.target.value
			}
		});*/

		/*let getFieldCompletenessUpdater = (e, validator) => (prevState => ({
			...prevState,
			fieldCompleteness:{
				...prevState.fieldCompleteness,
				[field]:{
					validEmailSyntax: isEmailValid,
				}
			}
		}));*/

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
							//this.props.accountType === 'shopper' ?

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
														onClick={() => {this._handleOnSubmit()}} style={{'text-align':'center'}}>
														SUBMIT
													</div>
												</div>
											</div>
										</div>
									</div>
								</form>) /*: 

								/*this.props.accountType === 'shopper' ?

									(<form action="" method="POST">
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
									</form>) : */
									//null
						}
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
					className={CreateAccountStyles.CreateAccount_div}
					//style={{
					//	height: '100vh', 
					//	'background-color':'#212121',
					//	'padding-top':'200px'
					//}}
				>
					<div>
						<div
							className={CreateAccountStyles.createAccountFormContainer_div} 
							//style={{
							//	'width': '800px',
    						//	'margin': 'auto',
    						//	'padding-left': '50px',
							//}}
						>
							<div>
								<CreateAccountForm 
									style={getStartedStyle} 
									createUser={this.props.createUser} 
									createCompany={this.props.createCompany}
									accountType={this.props.accountType}/>
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
					//style={(this.state.isMouseOver && this.props.highlight) ? ({display:'none'}) : ({display: 'block'})}
				>
				</div>
				<div 
					className={Styles.portalGraphicContainer_div}
					//style={(this.state.isMouseOver && this.props.highlight) ? ({'border-color': this.props.highlight}) : ({})}
				>
					<div>
					</div>
				</div>
				<div 
					className={Styles.portalContentContainer_div}
				>
					<div className={Styles.portalHeaderContainer_div}>
						<div 
							className={Styles.portalHeader_div} 
							//style={this.state.isMouseOver ? ({color: this.props.highlight}) : ({})}
						>
							<h2>{this.props.title}</h2>
						</div>
						<div className={Styles.portalDescription_div}>
							<p>{this.props.description}</p>
						</div>
						<div className={Styles.signupBtnContainer_div} >
							<div 
								className={Styles.signupBtn_div} 
								//style={this.state.isMouseOver ? ({'display': 'block'}) :  ({'display':'none'}) }
								onClick={(event) => {
									event.stopPropagation();
									this.props.navToCreateAccount()
								}}
							>
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
		this.registerUserURI = "/account/user/register";
		this.registerRetailerURI = "/account/retailer/register";
	}

	render() {
		console.log("TEST: rendering landing page");
		return(
			<React.Fragment>
				<SiteNav match={this.props.match} history={this.props.history} webAppView={!this.props.profileMenu ? 'landing' : ''}/>
				<div style={{width:'100vw'}}>				
					{
						this.props.profileMenu ? null/*(
								<ProfileMenu 
									profile={this.props.addedProfile !== undefined ? this.props.addedProfile : this.props.profile} 
									test={true}
									toggleRadio={this.props.toggleRadio} 
									postProfile={this.props.postProfile} 
									modifyProfile={this.props.modifyProfile}
									profileId={this.props.addedProfileId} />
							)*/ : 
							(this.props.createAccountView === 'none' || this.props.createAccountView === '') ? (
									<div>
										<div 
											className={Styles.landingPageContainer_div}
											//style={{
											//	height: '100vh', 
											//	'background-color':'#212121',
											//	'padding-top':'200px'
											//}}
										>
											{/*<Description/>*/}
											<div 
												className={Styles.landingPageCTA_div}
												//style={{
												//	height: '100%', 
												//	'width':'900px', 
												//	margin:'auto', 
												//	'margin-top': '25px',
												//}}
											>
												<Portal 
													title="Shopper"
													description="Discover new styles, be confident in the fit, and get rewarded.  Join the community of shoppers, designers, and retailers to streamline your online shopping experience."
													infoLink={null}
													highlight='#6dd7b4'
													actionIndicator="create account"
													enterPortal={() => this.props.navStateToBrowse(this.props.handlePortalSelect, (this.props.profile !== undefined))}
													navToCreateAccount={() => this.props.navToCreateAccount('shopper')}
												/>
												{/*<Portal 
													title="E-Retailer"
													description="Get your apparel noticed.  Leverage our community affiliate program to increase exposure and gain insights on what's trending."
													infoLink={null}
													highlight='#e0c570'
													actionIndicator="create account"
													enterPortal={() => window.location = OxiAppConstants.webAppBaseURL + OxiAppConstants.routeURIs.retailer}
													navToCreateAccount={() => this.props.navToCreateAccount('retailer')}
												/>
												<Portal 
													title="Designer"
													description="Curate your creative works, get inspired, and get connected"
													infoLink={null}
													//highlight='#70ccf4'
													actionIndicator="create account"
													enterPortal={() => (console.log('designer portal clicked'))}
													navToCreateAccount={this.props.navToCreateAccount}
												/>*/}
											</div>
										</div>
										{
											//<CreateAccountForm 
											//	style={getStartedStyle} 
											//	createUser={this.props.createUser} /> 
											//<HowItWorks/>
										}
									</div>
								) : 
								this.props.createAccountView === 'shopper' ? (
										<React.Fragment>
											<Redirect to={this.registerUserURI} />
											<Route path={this.registerUserURI} render={props => <CreateAccount accountType="shopper" createUser={this.props.createUser}/>} /> 
										</React.Fragment>
									) : 
									this.props.createAccountView === 'retailer' ? (
											<React.Fragment>
												<Redirect to={this.registerRetailerURI} />
												<Route path={this.registerRetailerURI} render={props => <CreateAccount accountType="retailer" createCompany={this.props.createCompany}/>} /> 
											</React.Fragment>
										) : 
										null
					}								
				</div>
			</React.Fragment>
		);
	}
}