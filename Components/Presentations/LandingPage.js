import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

//Presentation Components
import LandingPageContainer from '../../Components/Containers/LandingPageContainer.js'

//Third Party
import fetch from 'cross-fetch'
import axios from 'axios';

//CSS Styles
import Styles from '../../root.css';
import NavStyles from '../../nav.css';
import FormStyles from '../../forms.css';

//Constants
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//SVG
import {stepOne} from '../../Content/SvgLandingPage'

const descriptionContainerStyle = {
	'font-family': 'Comfortaa, cursive',
	'text-align':'center',
	'width':'600px',
	'margin':'auto',
	'padding-top':'110px',
	'padding-bottom':'50px',
	'color':'#fdfdfd',
	'background-color':'#434343'
}

const getStartedContainerStyle = {
	'font-family': 'Comfortaa, cursive',
	'width':'550px',
	'margin':'auto',
	'margin-top':'160px',
    'padding': '20px',
    'border-width': '2px',
    'border-color': '#d8d8d8',
    'border-style': 'solid',
    'border-radius':'6px',
    'height': '360px'
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

const formContentStyle = {
    'margin': 'auto'
}

const inputTextProfileStyle = {
	'font-size':'30px'
}

const inputTextContainer = {
	'text-align':'center',
	'margin':'auto',
	'margin-top':'15px',
	'border-radius': '4px',
    'border-width': '1px',
    'border-color': '#434343',
    'border-style': 'solid',
    'width':'60%'
}

const inputTextProfileForm = {

}

const inputTextContainerProfileFrm = {
	'text-align':'center',
	'display':'inline-block',
	'margin':'auto',
	'margin-top':'8px',
	'margin-right':'10px',
	'border-radius': '10px',
    'border-width': '1px',
    'border-color': '#434343',
    'border-style': 'solid',
    'width':'25%'	
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
		<div> comming soon </div>
		<div>
			<div style={{'margin-top':'65px','margin-bottom':'25px','font-size':'30px'}}> Shop your style that fits your body </div>
			<div style={{'font-size':'20px'}}> Upload • Discover • Compare • Buy </div>
		</div>
	</div>
);

const InputTextField = ({containerStyle, inputStyle, type, name, onChange, placeholder}) => (
	<div style={containerStyle}>
		{type} <input 
			type="text" 
			name={name} 
			placeholder={placeholder} 
			onChange={onChange} 
			style={inputStyle}
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

    //regular expression that accepts unicode
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

class GetStarted extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'email':'',
			'password':'',
			'username':'',
			'validEmailSyntax':false
		};
		this._handleOnSubmit = this._handleOnSubmit.bind(this);
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
	}

	_handleOnSubmit(){
		console.log("\"Creat Profile\" clicked");
		if(this.state.validEmailSyntax) this.props.createProfile(this.state.email, this.state.password, this.state.username);
		//Clear email password and username from react state
		this.setState({
			'email':'',
			'password':'',
			'username':''
		});
	}

	_handleInputFieldChange(e, field){
		this.setState({
			[field]:e.target.value
		});
		if(validateEmail(e.target.value)){
			this.setState({'validEmailSyntax':true});
		}
	}

	render(){
		return(
			<div>
				<div style={getStartedContainerStyle}>
					<div style={getStartedStyle}> Get Started </div>
					<div>
						<form action="" method="POST">
							<div style={formContentStyle}>
								<InputTextField 
									containerStyle={inputTextContainer} 
									inputStyle={{'width':'90%','text-align':'center','font-size':'20px','outline':'none'}} 
									name="email" 
									placeholder="Email" 
									onChange={() => {this._handleInputFieldChange(event, 'email')}}
								/>
								<InputTextField 
									containerStyle={inputTextContainer} 
									inputStyle={{'width':'90%','text-align':'center','font-size':'20px','outline':'none'}} 
									name="password" 
									placeholder="Password" 
									onChange={() => {this._handleInputFieldChange(event, 'password')}}
								/>
								<InputTextField 
									containerStyle={inputTextContainer} 
									inputStyle={{'width':'90%','text-align':'center','font-size':'20px','outline':'none'}} 
									name="username" 
									placeholder="Username" 
									onChange={() => {this._handleInputFieldChange(event, 'username')}}
								/>
								<div style={submitBtnStyle}>
									<div onClick={() => {this._handleOnSubmit()}} style={{'text-align':'center'}}>
										Create Profile
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
				<div style={{'width':'100%','margin':'auto','text-align':'left','display':'inline-block'}}>
					<InputTextField 
						containerStyle={inputTextContainerProfileFrm} 
						inputStyle={{'width':'80%','text-align':'center','font-size':'15px','outline':'none'}} 
						name={this.props.field}
						placeholder="" 
						onChange={() => {this.props.callback()}}
					/>
					<div style={{'display':'inline-block'}}>
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

class ProfileMenu extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			'fieldSet':[],
			'bodyShape': 'female',
			'womens':false,
			'mens':false
		}
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._handleRadioToggled = this._handleRadioToggled.bind(this);
		this._handleBoxChecked = this._handleBoxChecked.bind(this);
	}

	_handleInputFieldChange(e, field){
		this.setState({
			[field]:e.target.value
		})
	}
	_handleRadioToggled(radio){
		this.setState({
			'bodyShape': radio
		})
	}
	_handleBoxChecked(type){
		this.setState({
			[type]: !this.state[type]
		})
	}
	/*shouldComponentUpdate(nextProps){
		const differentProfile = this.props.profile !== nextProps.profile;
		return differentProfile;
	}*/
/*	
	field != 'id' || 
	field != 'username' || 
	field != 'bodyShap' || 
	field != 'apparelInterest' || 
	field != 'height'
*/
	render(){
		//**pusht this to the select in LandingPageConnector.js
		let fields = Object.keys(this.props.profile);
		let filteredFields =  fields.filter(field => field != 'id').filter(field => field != 'height').filter(field => field != 'bodyShape').filter(field => field != 'apparelInterest').filter(field => field != 'username');
		console.log('filteredFields');
		console.log(filteredFields);
		let fieldSet = filteredFields.map(field => (
			<ProfileFieldWrapper key={field} field={field} callback={()=>{this._handleInputFieldChange(event, field)}}/>
		));

		console.log('fieldSet');
		console.log(fieldSet);
		return(
			<div>
				<div style={{'display':'inline-block','width':'47%','margin-top':'160px'}}>
					
				</div>
				<div style={{'width':'300px','margin':'auto','margin-top':'160px','display':'inline-block','text-align':'center'}}>
					<ProfileFieldWrapper field='country' callback={()=>{this._handleInputFieldChange(event, 'country')}}/>
					<div style={{'margin-bottom':'10px'}} >
						<div>
							<div>
								<div id="bodyShape" style={{'text-align':'left', 'margin-top':'10px'}} >
									<div id="bodyShapeRadioList" style={radioListStyle}>
										<div id="female" style={radioAndCheckContainerStyle}>
											<div style={radioTitleStyle}>Female</div>
											<div style={this.state.bodyShape === 'female' ? selectedRadioStyle : radioStyle} onClick={() => this._handleRadioToggled('female')}>
											</div>
										</div>
										<div id="male" style={{'display':'inline-block'}}>
											<div style={radioTitleStyle}>Male</div>
											<div style={this.state.bodyShape === 'male' ? selectedRadioStyle : radioStyle} onClick={() => this._handleRadioToggled('male')}>
											</div>										
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
											<div style={this.state.womens ? selectedCheckBoxStyle : checkBoxStyle} onClick={() => this._handleBoxChecked('womens')} >
											</div>
										</div>
										<div id="mens" style={{'display':'inline-block'}}>
											<div style={radioTitleStyle}>Mens</div>
											<div style={this.state.mens ? selectedCheckBoxStyle : checkBoxStyle} onClick={() => this._handleBoxChecked('mens')}>
											</div>
										</div>
									</div>
									<div id="apparelInterestTitle" style={{'display':'inline-block', 'vertical-align':'bottom'}}>
										Apperel Interest
									</div>			
								</div>								
							</div>
						</div>
					</div>
					<ProfileFieldWrapper field='height' callback={()=>{this._handleInputFieldChange(event, 'height')}}/>
					{fieldSet}
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

export default class LandingPage extends React.Component{
	constructor(props){
		super(props);
	}

	render() {
		return(
			<div>				
				{this.props.profileMenu ? (<ProfileMenu profile={this.props.profile} toggleRadio={this.props.toggleRadio}/>) : (
					<div>
						<div style={{'background-color':'#434343'}}>
							<Description/>
						</div>
						<GetStarted style={getStartedStyle} createProfile={this.props.createProfile}/> 
						<HowItWorks/>
					</div>
				)}								
			</div>
		);
	}
}