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
				style={props.selectedFieldName === props.name ? ({'border-color':'white'}) : ({})}
				onFocus={props.onSelect} />
		</div>	
	);
};

//const InputNumberField = ({props}) => (
//	<div className={props.containerStyle} style={props.selectedField === props.name ?  ({'border-style':'none'}) : null}>
//		{props.type} <input 
//			id="measurementField"
//			value={props.value}
//			type="number"
//			step="0.5"
//			maxlength="5"
//			min="0"
//			max="999.99" 
//			name={props.name} 
//			placeholder={props.placeholder} 
//			onChange={props.onChange} 
//			className={props.inputStyle}
//			onFocus={props.onSelect}
//			style={props.selectedField === props.name ? 
//				({
//					'background-color': '#ffffff00',
//					color: 'white',
//				}):
//				null
//			}
//
//		/>
//	</div>
//);

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



//class ProfileFieldWrapper extends React.Component{
//	constructor(props){
//		super(props);
//	}
//
//	shouldComponentUpdate(nextProps){
//		const differentField = this.props.field !== nextProps.field;
//		const differentCallback = this.props.callback !== nextProps.callback;
//		return differentField || differentCallback;
//	}
//
//	render(){
//		const isSelected = this.props.selectedField === this.props.field;
//		return(
//			<div>
//				<div className={ProfileMenuStyles.inputNumberContainer_div} style={this.props.style || (isSelected ? ({'border-radius': '2px', color:'white'}) : null)}>
//					<div className={ProfileMenuStyles.selectHighlight_div} style={isSelected ? ({width: '100%'}) : ({width:'0px'})}>			
//					</div>
//					<InputNumberField props={{
//						containerStyle: ProfileMenuStyles.inputNumber_div,
//						inputStyle: ProfileMenuStyles.inputNumber_input,
//						name: this.props.field,
//						placeholder: "",
//						value: this.props.value,
//						onChange:(event) => this.props.callback(event),
//						onSelect:this.props.onSelect,
//						selectedField: this.props.selectedField
//					}}/>
//					<div className={ProfileMenuStyles.displayUnits_div} style={(isSelected ? ({color: '#70ccf4'}) : null)}>
//						{(this.props.units === 'cm' ? 'cm' : 'in')}
//					</div>
//					<div className={ProfileMenuStyles.inputNumberLabel_div}>
//						{this.props.field}
//					</div>
//				</div>
//			</div>		
//		);
//	}
//}

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

/*const Ruler = ({props}) => (props.ticks.map((tick, ticks) => (
		tick < 9 ? 
			(<div
				id={ (props.measurement + ((tick - ticks.length/2) * props.scale / 2)) }  
				className={ProfileMenuStyles.tick_div}>
			</div>) : 
			null
	))
);

const TolerancePresets = ({props}) => (
	<div 
		className={ProfileMenuStyles.toleranceCheckBox_div}
		style={ props.selectedPreset === props.label ? ({'background-color': '#525252', 'color':'white'}) : ({}) }
		onClick={(e) => props.handlePresetClicked(e, props.label)}
	>
		{props.label}
	</div>
)

const SlideSwitch = ({props}) => (
	<div className={ProfileMenuStyles.inputNumberContainer_div}>
		<div className={ProfileMenuStyles.slideSwitchLabelContainer_div}>
			<div className={ProfileMenuStyles.slideSwitchLabel_div}>
				cm.
			</div>
		</div>
		<div className={ProfileMenuStyles.slideSwitchContainer_div}>
			<div className={ProfileMenuStyles.slideSwitch_div}>
				<div 
					className={ProfileMenuStyles.slide_div} 
					style={props.units === 'in' ? ({left: 'calc(100% - 65%)'}) : null}
					onClick={(event) => props.toggleSlidSwitch(event)}>
				</div>
			</div>
		</div>
		<div className={ProfileMenuStyles.slideSwitchLabelContainer_div}>
			<div className={ProfileMenuStyles.slideSwitchLabel_div}>
				in.
			</div>
		</div>
	</div>
);



class ToleranceSettings extends React.Component{

	constructor(props){
		super(props);
	
		//let minToleranceFields = {};
		//let maxToleranceFields = {};
		this.filteredFieldNames = Object.keys(this.props.displayedProfileData); //Object.keys(this.props.displayedProfileData).filter(field => (field !== 'id' && field !== 'country' && field !== 'username' && field !== 'bodyShape' && field !== 'mens' && field !== 'womens'));
		//this.ticks = [0,1,2,3,3,4,5,6,7,8];
		//this.scale = 0.5;
		this.slideWidth = 7.5;	//slide width in px
		//this.tickPixelDelta = (300 - 30)/2/this.props.ticks.length;
		this.tickPixelDelta = 300/(this.props.ticks.length - 1);
		this.presets = {
			preset1: 'Tight',
			preset2: 'Fit',
			preset3: 'Loose',
		}

		//if(Object.keys(this.props.minTolerances).length === 0 && Object.keys(this.props.maxTolerances).length === 0){
		//	for(let field of this.filteredFieldNames){
		//		//values int ticks indecese 
		//		minToleranceFields = Object.assign({}, minToleranceFields, {[field]: 0 });
		//		maxToleranceFields = Object.assign({}, maxToleranceFields, {[field]: (this.props.ticks.length-1) });
		//	}
		//}else{
		//	minToleranceFields = this.props.minTolerances;
		//	maxToleranceFields = this.props.maxTolerances;
		//}

		this.state={
			//minTolerances: {...minToleranceFields},
			//maxTolerances: {...maxToleranceFields},
			//selectedPreset: '',
			minGrabbedSlider: '',
			maxGrabbedSlider:'',
			startX: 0,
			deltaX: 0,
			startTick:0,
			deltaTick:0,
			sliderTransition:true,
		};

		this._handleMaxSliderMove = this._handleMaxSliderMove.bind(this);
		this._handleMinSliderMove = this._handleMinSliderMove.bind(this);
		//this._handlePresetClicked = this._handlePresetClicked.bind(this);
		this._sliderGrabbed = this._sliderGrabbed.bind(this);
		this._sliderReleased = this._sliderReleased.bind(this);
		this.getDeltaTick = this.getDeltaTick.bind(this);
		//this.getToleranceValues = this.getToleranceValues.bind(this);
		//this.getUpdatedToleranceTick = this.getUpdatedToleranceTick.bind(this);
		//this.setPresetTolerances = this.setPresetTolerances.bind(this);
	}

	//componentWillUnmount(){
	//	this.props.saveTickState({
	//		minTolerances: this.state.minTolerances,
	//		maxTolerances: this.state.maxTolerances,			
	//	})
	//}

	getDeltaTick(field, isMinTolerance){
		const deltaTick = Math.round((this.state.deltaX)/this.tickPixelDelta);
		const maxTick = this.props.ticks.length - 1;
		const minTick = 0;
		const nextTick = this.state.startTick + deltaTick;

		//make sure min slider is not greater than max slider and vice versa
		if(isMinTolerance){
			if(nextTick >= this.props.maxTolerances[field]) return (this.props.maxTolerances[field] - this.state.startTick - 1);
		}else {
			if(nextTick <= this.props.minTolerances[field]) return (this.props.minTolerances[field] + 1 - this.state.startTick);
		}

		//make sure min and max slider are within the min and max tick bounds
		if(nextTick > maxTick) return maxTick - this.state.startTick;
		else if(nextTick + deltaTick < minTick) return minTick - this.state.startTick;

		return deltaTick;
	}

	//getToleranceValues(field, isMinTolerance){
	//	let value = 0;
	//	const displayedProfileDataValue = parseInt(this.props.displayedProfileData[field], 10);
	//	if(isMinTolerance){
	//		value = displayedProfileDataValue > 4 ? 
	//			(displayedProfileDataValue + (this.state.minTolerances[field] - 5) * this.scale) :
	//			(displayedProfileDataValue + (this.state.minTolerances[field] - 4) * this.scale)
	//	}else{
	//		value = displayedProfileDataValue > 4 ? 
	//			(displayedProfileDataValue + (this.state.maxTolerances[field] - 5) * this.scale) :
	//			(displayedProfileDataValue + (this.state.maxTolerances[field] - 4) * this.scale)
	//	}

	//	return value;
	//}

	_handleMinSliderMove(e, field){
		console.log('x = ', e.clientX);
		this.setState(prevState => {
			const pixelDelta = e.clientX - prevState.startX;
			return({
				deltaX: pixelDelta,
				deltaTick: this.getDeltaTick(field, true),
			});
		});
	}

	_handleMaxSliderMove(e, field){
		console.log('x = ', e.clientX);
		this.setState(prevState => {
			const pixelDelta = e.clientX - prevState.startX;
			return({
				deltaX: pixelDelta,
				deltaTick: this.getDeltaTick(field, false),
			});
		});
	}

	_sliderGrabbed(e, field, isMinSlider){
		e.stopPropagation();
		console.log('e = ', e.clientX)
		const xCoord = e.clientX;
		//const adjTick = isMinSlider ? this.state.minTolerances[field] : this.state.maxTolerances[field] + 1;
		this.setState({
			[(isMinSlider ? 'minGrabbedSlider' : 'maxGrabbedSlider')]: field,
			startX: xCoord,
			startTick: this.props[(isMinSlider ? 'minTolerances' : 'maxTolerances')][field],
			sliderTransition: false
		});

		this.handleMinSliderMoveWrapper = (e) => this._handleMinSliderMove(e, field);
		this.handleMaxSliderMoveWrapper = (e) => this._handleMaxSliderMove(e, field);
		this.handleMinSliderReleasedWrapper = (e) => this._sliderReleased(e, true);
		this.handleMaxSliderReleasedWrapper = (e) => this._sliderReleased(e, false);

		if(isMinSlider){
			window.addEventListener('mousemove', this.handleMinSliderMoveWrapper);
			window.addEventListener('mouseup', this.handleMinSliderReleasedWrapper);
		}else{
			window.addEventListener('mousemove', this.handleMaxSliderMoveWrapper);	
			window.addEventListener('mouseup', this.handleMaxSliderReleasedWrapper);
		}		
	}

	_sliderReleased(e, isMinSlider){
		const field = (isMinSlider ? this.state.minGrabbedSlider : this.state.maxGrabbedSlider);
		const toleranceObjType = (isMinSlider ? 'minTolerances' : 'maxTolerances');

		this.props.updateTolerances(toleranceObjType, field, (this.state.startTick + this.state.deltaTick));

		this.setState(prevState => ({
			[(isMinSlider ? 'minGrabbedSlider' : 'maxGrabbedSlider')]: '',
			deltaX: 0,
			startX: 0,
			deltaTick :0,
			//[toleranceObjType]: {
			//	...this.state[toleranceObjType],
			//	[field]: (prevState.startTick + prevState.deltaTick),
			//},
			sliderTransition:true
		}));

		switch(true){
			case isMinSlider:
				console.log('removing minSlider event handlers from window\'s mousemove and mouseup');
				if(this.handleMinSliderMoveWrapper){
					window.removeEventListener('mousemove', this.handleMinSliderMoveWrapper);
					if(this.handleMinSliderReleasedWrapper){
						window.removeEventListener('mouseup', this.handleMinSliderReleasedWrapper);
					}else{
						console.log('this.handleMinSliderReleasedWrapper is undefined')
					}
				} else {
					console.log('this.handleMinSliderMoveWrapper is undefined');
				}
				break;
			case !isMinSlider:
				console.log('removing maxSlider event handlers from window\'s mousemove and mouseup');
				if(this.handleMaxSliderMoveWrapper){
					window.removeEventListener('mousemove', this.handleMaxSliderMoveWrapper);
					if(this.handleMaxSliderReleasedWrapper){
						window.removeEventListener('mouseup', this.handleMaxSliderReleasedWrapper);
					}else{
						console.log('this.handleMaxSliderReleasedWrapper is undefined')
					}
				}else{
					console.log('this.handleMaxSliderMoveWrapper undefined');
				}
				break;
			default:
				break;
		}
	}

	//_handlePresetClicked(e, label){
	//	console.log('_presetClicked')
	//	this.setState(prevState => ({
	//		selectedPreset: label,
	//		...this.setPresetTolerances(label)
	//	}));
	//}

	//setPresetTolerances(preset){		
	//	let minToleranceFields = {};
	//	let maxToleranceFields = {};
	//	let minToleranceValue = 0;
	//	let maxToleranceValue = this.props.ticks.length-1;

	//	switch(true){
	//		//Tight
	//		case preset === this.presets.preset1:
	//			minToleranceValue = 2;
	//			maxToleranceValue = 3;
	//			break;
	//		//Fit
	//		case preset === this.presets.preset2:
	//			minToleranceValue = 4;
	//			maxToleranceValue = 5;
	//			break;
	//		//Loose
	//		case preset === this.presets.preset3:
	//			minToleranceValue = 6;
	//			maxToleranceValue = 7;
	//			break;
	//	}

	//	for(let field of this.filteredFieldNames){
	//		//values int ticks indecese 
	//		minToleranceFields = Object.assign({}, minToleranceFields, {[field]: minToleranceValue });
	//		maxToleranceFields = Object.assign({}, maxToleranceFields, {[field]: maxToleranceValue });
	//	}

	//	return({
	//		minTolerances:{
	//			...minToleranceFields
	//		},
	//		maxTolerances:{
	//			...maxToleranceFields
	//		},
	//	});
	//}

	render(){
		return(
			<div style={{
					height:'100%',
					'--main-height':'25px'
			}}>
				<div style={{'margin-bottom':'20px'}}>
					<div className={ProfileMenuStyles.tolerancePresetContainer_div}>
						<div className={ProfileMenuStyles.tolerancePreset_div}>
							<TolerancePresets props={{
								label:'Tight',
								selectedPreset: this.props.selectedPreset,
								handlePresetClicked: this.props.handlePresetClicked,
							}}/>
						</div>
					</div>
					<div className={ProfileMenuStyles.tolerancePresetContainer_div}>
						<div className={ProfileMenuStyles.tolerancePreset_div}>
							<TolerancePresets props={{
								label:'Fit',
								selectedPreset: this.props.selectedPreset,
								handlePresetClicked: this.props.handlePresetClicked,
							}}/>
						</div>
					</div>
					<div className={ProfileMenuStyles.tolerancePresetContainer_div}>
						<div className={ProfileMenuStyles.tolerancePreset_div}>
							<TolerancePresets props={{
								label:'Loose',
								selectedPreset: this.props.selectedPreset,
								handlePresetClicked: this.props.handlePresetClicked,
							}}/>
						</div>
					</div>
				</div>
				<div 
					style={{
						position: 'relative',
						height:'inherit',
				}}>
					<div className={ProfileMenuStyles.measurementsContainer_div}>
						{
							this.filteredFieldNames.map(field => (	
								<div className={ProfileMenuStyles.measurements_div}>
									<Ruler props={{
										ticks: this.props.ticks,
										scale: this.props.scale,
										measurement: this.props.displayedProfileData[field]
									}} />							
									<div className={ProfileMenuStyles.measurementValue_div} style={{width: `${this.tickPixelDelta}px`}}>
										{this.props.displayedProfileData[field]}
									</div>
								</div>	
							))
						}
					</div>
					<div className={ProfileMenuStyles.toleranceControllersContainer_div}>
						<div className={ProfileMenuStyles.toleranceController_div}>
							{
								Object.keys(this.props.minTolerances).map(field => (
									<div className={ProfileMenuStyles.sliderContainer_div}>											
										<div className={ProfileMenuStyles.slideLabel}>
											{field}
										</div>

										<div 
											id={field} 
											className={ProfileMenuStyles.minSlider_div}
											onMouseDown={(e) => this._sliderGrabbed(e, field, true)}
											//onMouseUp={(e) => this._sliderReleased(e, true)}
											style={
												this.state.minGrabbedSlider === field ? 
													({left: `${this.props.minTolerances[field]*this.tickPixelDelta + this.state.deltaX}px`, transition: 'none'}) : 
													({left: `${this.tickPixelDelta * (this.props.minTolerances[field]) - this.slideWidth}px`, transition: 'left 150ms ease-in-out'})
											}
										>
											<div>
												<div>
												</div>
											</div>
										</div>
										<div 
											id={field} 
											className={ProfileMenuStyles.maxSlider_div}
											onMouseDown={(e) => this._sliderGrabbed(e, field, false)}
											//onMouseUp={(e) => this._sliderReleased(e, false)}
											style={
												this.state.maxGrabbedSlider === field ? 
													({left: `${(this.props.maxTolerances[field])*this.tickPixelDelta + this.state.deltaX}px`, transition: 'none'}) :
													({left: `${this.tickPixelDelta * (this.props.maxTolerances[field]) - this.slideWidth}px` , transition: 'left 150ms ease-in-out'})
											}
										>
											<div>
												<div>
													
												</div>
											</div>
										</div>

										<div className={ProfileMenuStyles.slideValueRange_div}>
											<div className={ProfileMenuStyles.slideValueData_div}>
												{this.props.getToleranceValues(field, true)}
											</div>
											<div className={ProfileMenuStyles.slideValueData_div}> 
												- 
											</div>
											<div className={ProfileMenuStyles.slideValueData_div}>
												{this.props.getToleranceValues(field, false)}
											</div>
										</div>
									</div>
								))
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class ProfileMenu extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.test);
		this.menuPage1 = 'Measurements';
		this.menuPage2 = 'Tolerance';
		this.decimals = 1;
		this.scale = 0.5;
		this.ticks = [0,1,2,3,3,4,5,6,7,8];		
		this.presets = {
			preset1: 'Tight',
			preset2: 'Fit',
			preset3: 'Loose',
		}

		if(!this.props.test){
			this.state = {
				'profileData':{
					//'id': this.props.profile.id,
					'username':this.props.profile.username,
					userMetricsDto:{
						'bodyShape': 'female',
						'womens':false,
						'mens':false,
					}				
				}
			}
		}
		//Hydrate all profile fields with a random float.  Used for creating test profiles.
		//Generated values in inches :)
		else{
			let maxHeight = 84;
			let minHeight = 48;
			let height = minHeight + Math.round((Math.random() * (maxHeight - minHeight)));
			let iniMeasurements = {
				'height': height,
				'neck': (Math.random() * height),
				'fullShoulder':(Math.random() * height),
				'halfShoulder':(Math.random() * height),
				'chest':(Math.random() * height),
				'waist':(Math.random() * height),
				'hip':(Math.random() * height),
				'sleeve':(Math.random() * height),
				'frontLength':(Math.random() * height),
				'backLength':(Math.random() * height),
				'pantInseam':(Math.random() * height),
				'pantOutseam':(Math.random() * height),
				'thigh':(Math.random() * height),
				'calf':(Math.random() * height)
			}

			let minToleranceFields = {};
			let maxToleranceFields = {};
			let displayedProfileData = {					
				'height': parseFloat(iniMeasurements.height.toFixed(this.decimals)),
				'neck': parseFloat(iniMeasurements.neck.toFixed(this.decimals)),
				'fullShoulder': parseFloat(iniMeasurements.fullShoulder.toFixed(this.decimals)),
				'halfShoulder': parseFloat(iniMeasurements.halfShoulder.toFixed(this.decimals)),
				'chest': parseFloat(iniMeasurements.chest.toFixed(this.decimals)),
				'waist': parseFloat(iniMeasurements.waist.toFixed(this.decimals)),
				'hip': parseFloat(iniMeasurements.hip.toFixed(this.decimals)),
				'sleeve': parseFloat(iniMeasurements.sleeve.toFixed(this.decimals)),
				'frontLength': parseFloat(iniMeasurements.frontLength.toFixed(this.decimals)),
				'backLength': parseFloat(iniMeasurements.backLength.toFixed(this.decimals)),
				'pantInseam': parseFloat(iniMeasurements.pantInseam.toFixed(this.decimals)),
				'pantOutseam': parseFloat(iniMeasurements.pantOutseam.toFixed(this.decimals)),
				'thigh': parseFloat(iniMeasurements.thigh.toFixed(this.decimals)),
				'calf': parseFloat(iniMeasurements.calf.toFixed(this.decimals))
			};
	
			for(let field of Object.keys(displayedProfileData)){
				//values int ticks indecese 
				minToleranceFields = Object.assign({}, minToleranceFields, {[field]: 0 });
				maxToleranceFields = Object.assign({}, maxToleranceFields, {[field]: (this.ticks.length-1) });
			}

			this.state = {
				minTolerances: {...minToleranceFields},
				maxTolerances: {...maxToleranceFields},
				'prevSelectedField':'',
				'selectedField':'',
				'fieldListTitle':this.menuPage1,
				units: 'cm',
				'profileData':{
					'username':this.props.profile.username,
					userMetricsDto: {
						id:null,
						'bodyShape': 'female',
						'womens':false,
						'mens':false,	
						...iniMeasurements
					},
					profileStatsDto:null//{
					//	id:null,
					//	following:null,
					//	likes:null,
					//	points:null,
					//	lastUpdate:null
					//}
				},
				displayedProfileData
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
		this._toggleSlidSwitch = this._toggleSlidSwitch.bind(this);
		this.saveTickState = this.saveTickState.bind(this);
		this.getToleranceValues = this.getToleranceValues.bind(this);
		this._handlePresetClicked = this._handlePresetClicked.bind(this);
		this.setPresetTolerances = this.setPresetTolerances.bind(this);
		this.updateTolerances = this.updateTolerances.bind(this);
	}

	updateTolerances(toleranceType, key, value){
		this.setState(prevState => ({
			[toleranceType]:{
				...this.state[toleranceType],
				[key]:value
			}
		}));
	}

	setPresetTolerances(preset){		
		let minToleranceFields = {};
		let maxToleranceFields = {};
		let minToleranceValue = 0;
		let maxToleranceValue = this.ticks.length-1;

		switch(true){
			//Tight
			case preset === this.presets.preset1:
				minToleranceValue = 2;
				maxToleranceValue = 3;
				break;
			//Fit
			case preset === this.presets.preset2:
				minToleranceValue = 4;
				maxToleranceValue = 5;
				break;
			//Loose
			case preset === this.presets.preset3:
				minToleranceValue = 6;
				maxToleranceValue = 7;
				break;
		}

		for(let field of Object.keys(this.state.displayedProfileData)){
			//values int ticks indecese 
			minToleranceFields = Object.assign({}, minToleranceFields, {[field]: minToleranceValue });
			maxToleranceFields = Object.assign({}, maxToleranceFields, {[field]: maxToleranceValue });
		}

		return({
			minTolerances:{
				...minToleranceFields
			},
			maxTolerances:{
				...maxToleranceFields
			},
		});
	}

	getToleranceValues(field, isMinTolerance){
		let value = 0;
		const displayedProfileDataValue = parseInt(this.state.displayedProfileData[field], 10);
		console.log('displayedProfileDataValue = ', displayedProfileDataValue);
		if(isMinTolerance){
			value = displayedProfileDataValue > 4 ? 
				(displayedProfileDataValue + (this.state.minTolerances[field] - 5) * this.scale) :
				(displayedProfileDataValue + (this.state.minTolerances[field] - 4) * this.scale)
		}else{
			value = displayedProfileDataValue > 4 ? 
				(displayedProfileDataValue + (this.state.maxTolerances[field] - 5) * this.scale) :
				(displayedProfileDataValue + (this.state.maxTolerances[field] - 4) * this.scale)
		}
		console.log('value = ', value);
		return value;
	}

	_handlePresetClicked(e, label){
		console.log('_presetClicked')
		this.setState(prevState => ({
			selectedPreset: label,
			...this.setPresetTolerances(label)
		}));
	}

	_handleInputFieldChange(e, field){
		this.setState(prevState => ({
			'profileData':{
				...prevState.profileData,				
				userMetricsDto:{
					...prevState.profileData.userMetricsDto,
					[field]:parseFloat(prevState.units === 'cm' ? e.target.value : (e.target.value * 2.54))
				}
			}
		}));
	}

	_handleRadioToggled(selection){
		this.setState(prevState => ({
			'profileData':{
				...prevState.profileData,
				userMetricsDto:{
					...prevState.profileData.userMetricsDto,
					'bodyShape':selection
				}
			}
		}));
	}

	_handleBoxChecked(type){
		this.setState(prevState => ({
			'profileData':{
				...prevState.profileData,
				userMetricsDto:{
					...prevState.profileData.userMetricsDto,
					[type]: !prevState.profileData.userMetricsDto[type]
				}
			}
		}));
	}

	_handleFieldFocus(event){
		console.log('event.target.name = ', event.target.name)
		this.setState(prevState => {

			let updatedDisplayData =  
				prevState.selectedField !== 'id' && 
				prevState.selectedField !== 'country' && 
				prevState.selectedField !== 'username' && 
				prevState.selectedField !== 'bodyShape' && 
				prevState.selectedField !== 'mens' && 
				prevState.selectedField !== 'womens' &&
				prevState.selectedField !== '' ? 
					({ [prevState.selectedField]: (prevState.units === 'cm' ? 
						parseFloat(prevState.profileData.userMetricsDto[prevState.selectedField].toFixed(this.decimals)) : 
						parseFloat((prevState.profileData.userMetricsDto[prevState.selectedField] / 2.54).toFixed(this.decimals))
					) }) :
					({});

			return({
				selectedField: event.target.name,
				displayedProfileData:{
					...prevState.displayedProfileData,
					...updatedDisplayData
				}
			})
		});
	}

	_handleFieldBlur(event){
		//this.setState(prevState => ({
		//	prevSelectedField: event.target.name
		//}));
	}

	_handleOnSubmit(){
		//When calling modifyProfile the profileData object is passed as the action payload.
		//The reducer is expecting this payload to contain an id field which it uses as a key
		//to reference the payload data in the redux state tree.  This id field needs to be
		//added explicitly here because it is left undefined when the profile object is 
		//returned by the server, which is refernced to dynamically build this.state.profileData fields.
		let scrubbedProfileState = Object.assign({}, this.state.profileData, {id: 1});

		//gotta do some string gymnastics so construct tolerance ojbect property that is compatible
		//with the server api spec
		let tolerance = {};
		for(let field of Object.keys(this.state.minTolerances)){
			tolerance[`min${field.charAt(0).toUpperCase() + field.slice(1)}`] = this.getToleranceValues(field, true);
		}

		for(let field of Object.keys(this.state.maxTolerances)){
			tolerance[`max${field.charAt(0).toUpperCase() + field.slice(1)}`] = this.getToleranceValues(field, false);			
		}

		console.log('tolerance = ', tolerance);
		scrubbedProfileState = Object.assign({}, scrubbedProfileState, {...scrubbedProfileState, toleranceDto:{id:null, ...tolerance}});
		this.props.modifyProfile(scrubbedProfileState);
		this.props.postProfile(scrubbedProfileState/*this.state.profileData*//*);
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

	_toggleSlidSwitch(event){
		this.setState(prevState => {
			let convertedDisplayData = prevState.displayedProfileData;
			for(let field of Object.keys(prevState.displayedProfileData)){
				convertedDisplayData[field] = prevState.units === 'cm' ? 
					(prevState.profileData[field] / 2.54).toFixed(this.decimals): //convert to inches
					(prevState.profileData[field]).toFixed(this.decimals); //convert to centimeters
			}
			return({
				units: (prevState.units === 'cm' ? 'in' : 'cm'),
				displayedProfileData: {
					...convertedDisplayData
				}
			});
		});
	}

	saveTickState(tickObj={minTolerances: {}, maxTolerances: {}}){
		this.setState(prevState => ({
			minTolerances:{
				...tickObj.minTolerances
			},
			maxTolerances:{
				...tickObj.maxTolerances
			}
		}))
	}

	render(){
		//TODO:  push this to the select in LandingPageConnector.js
		//This filters what properties to display on the Profile Creation page
		let fields = Object.keys(this.props.profile);
		let filteredFieldNames =  fields.filter(field => field != 'id')
		.filter(field => field != 'height')
		.filter(field => field != 'bodyShape')
		.filter(field => field != 'mens')
		.filter(field => field != 'username')
		.filter(field => field != 'womens')
		.filter(field => field != 'apparelInterest')
		.filter(field => field != 'country')
		.filter(field => field != 'toleranceDto')
		.filter(field => field != 'dateOfBirth');
		console.log('filteredFieldNames');
		console.log(filteredFieldNames);
		let fieldSet = filteredFieldNames.map(field => {
			//console.log(this.state.profileData[field]);
			return(
				<ProfileFieldWrapper 
					key={field} 
					field={field} 
					value={
						this.state.selectedField !== field ? 
							this.state.displayedProfileData[field] : 
							this.state.units === 'cm' ? 
								this.state.profileData[field] :
								this.state.profileData[field] / 2.54
					} 
					callback={()=>{this._handleInputFieldChange(event, field)}} 
					onSelect={() => this._handleFieldFocus(event)}
					selectedField={this.state.selectedField}
					units={this.state.units}/>
			);
		});
		const bodyShape = this.state.profileData.userMetricsDto.bodyShape;
		let bodyShapeContainer = (bodyShape === 'female') ? femaleContainer : maleContainer;
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
							{
								bodyShape === 'male' ? 
									<MaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : 
									<FemaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>
							}
						</div>
						<div style={bodySvgContianerStyles}>
							{
								bodyShape === 'male' ? 
									<MaleSide allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : 
									<FemaleSide allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>
							}
						</div>
					</div>
				</div>

				<div className={ProfileMenuStyles.fieldList_div}>
					<div className={ProfileMenuStyles.fieldListTitleContainer1_div} >
						<div className={ProfileMenuStyles.fieldListTitleContainer2_div} >
							<div className={ProfileMenuStyles.fieldListTitle_div} >
								{ this.state.fieldListTitle }
							</div>
						</div>
					</div>

					{ 
						this.state.fieldListTitle === this.menuPage1 ? (
							<React.Fragment>
								{//<ProfileFieldWrapper 
								//field='country' 
								//value={this.state.profileData['USA']} 
								//callback={()=>{this._handleInputFieldChange(event, 'country')}}
								//onSelect={() => this._handleFieldFocus(event)} 
								//selectedField={this.state.selectedField} />}
								<SlideSwitch props={{
									toggleSlidSwitch: this._toggleSlidSwitch,
									units: this.state.units
								}}/>
								<div style={{'margin-bottom':'10px'}} >
										<div>
											<div>
												<div id="bodyShape" style={{'text-align':'left', 'margin-top':'10px'}} >
													<div id="bodyShapeRadioList" style={radioListStyle}>
														<div id="female" style={radioAndCheckContainerStyle}>
															<div id='bodyShapeTitle' style={radioTitleStyle}>Female</div>
															<div id='bodyShapeRadio' style={bodyShape === 'female' ? selectedRadioStyle : radioStyle} onClick={() => this._handleRadioToggled('female')}></div>
														</div>
														<div id="male" style={{'display':'inline-block'}}>
															<div id='bodyShapeTitle' style={radioTitleStyle}>Male</div>
															<div id='bodyShapeRadio' style={bodyShape === 'male' ? selectedRadioStyle : radioStyle} onClick={() => this._handleRadioToggled('male')}></div>										
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
															<div style={this.state.profileData.userMetricsDto.womens ? selectedCheckBoxStyle : checkBoxStyle} onClick={() => this._handleBoxChecked('womens')} ></div>
														</div>
														<div id="mens" style={{'display':'inline-block'}}>
															<div style={radioTitleStyle}>Mens</div>
															<div style={this.state.profileData.userMetricsDto.mens ? selectedCheckBoxStyle : checkBoxStyle} onClick={() => this._handleBoxChecked('mens')}></div>
														</div>
													</div>
													<div id="apparelInterestTitle" style={{'display':'inline-block', 'vertical-align':'bottom'}}>
														Apperel Interest
													</div>			
												</div>								
											</div>
										</div>
								</div>
								<ProfileFieldWrapper 
									field='height' 
									value={
										this.state.selectedField !== 'height' ? 
											this.state.displayedProfileData['height'] : 
											this.state.units === 'cm' ? 
												this.state.profileData.userMetricsDto['height'] :
												this.state.profileData.userMetricsDto['height'] / 2.54
									} 
									callback={()=>{this._handleInputFieldChange(event, 'height')}} 
									onSelect={() => this._handleFieldFocus(event)} 
									selectedField={this.state.selectedField}
									units={this.state.units} />
								{fieldSet}
							</React.Fragment>
						) : (
							<ToleranceSettings 
								displayedProfileData={this.state.displayedProfileData} 
								saveTickState={this.saveTickState}
								minTolerances={this.state.minTolerances}
								maxTolerances={this.state.maxTolerances}
								getToleranceValues={this.getToleranceValues}
								scale={this.scale}
								handlePresetClicked={this._handlePresetClicked}
								setPresetTolerances={this.setPresetTolerances}
								updateTolerances={this.updateTolerances}
								ticks={this.ticks}
								selectedPreset={this.state.selectedPreset}/>
						)
					}

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
							{bodyShape === 'male' ? <MaleSideVertMirrored allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : <FemaleSideVertMirrored allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>}
						</div>
						<div style={bodySvgContianerStyles}>
							{bodyShape === 'male' ? <MaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : <FemaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}*/



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
								<CreateAccountForm style={getStartedStyle} createUser={this.props.createUser}/>
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
									this.props.navToCreateAccount(this.props.title.toLowerCase())
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
		this.defualtURI = "/account/user/register";
	}

	render() {
		return(
			<React.Fragment>
				<SiteNav match={this.props.match} webAppView={!this.props.profileMenu ? 'landing' : ''}/>
				<div>				
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
													description="Discover new styles, be confident in the fit, and get rewarded.  Join the community of shoppers, designers, and retailers to streamline your online shopping experience."
													infoLink={null}
													highlight='#6dd7b4'
													actionIndicator="create account"
													enterPortal={() => this.props.navStateToBrowse(this.props.handlePortalSelect, (this.props.profile !== undefined))}
													navToCreateAccount={this.props.navToCreateAccount}
												/>
												<Portal 
													title="Designer"
													description="Curate your creative works, get inspired, and get connected"
													infoLink={null}
													highlight='#70ccf4'
													actionIndicator="create account"
													enterPortal={() => console.log('Designer portal clicked')}
													navToCreateAccount={this.props.navToCreateAccount}
												/>
												<Portal 
													title="E-Retailer"
													description="Get your apparel noticed.  Leverage our community affiliate program to increase exposure and gain insights on what's trending."
													infoLink={null}
													highlight='#e0c570'
													actionIndicator="create account"
													enterPortal={() => {
														console.log('E-Retailer portal clicked');
														
													}}
													navToCreateAccount={this.props.navToCreateAccount}
												/>
											</div>
										</div>
										<CreateAccountForm style={getStartedStyle} createUser={this.props.createUser}/> 
										<HowItWorks/>
									</div>
								) : 
								this.props.createAccountView === 'shopper' ? (
										<React.Fragment>
											<Redirect to={this.defualtURI} />
											<Route path={this.defualtURI} render={props => <CreateAccount accountType="shopper" createUser={this.props.createUser}/>} /> 
										</React.Fragment>
									) : 
									null
					}								
				</div>
			</React.Fragment>
		);
	}
}