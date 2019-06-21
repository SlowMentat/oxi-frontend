import React from 'react';
import MetricStyles from '../../metric.css';
import {OxiAppConstants} from  '../../Util/OxiAppConstants.js'

import {CreateAccountField} from '../../Components/Presentations/LandingPage.js';
import LoginFormContainer from '../../Components/Containers/LoginFormContainer.js';

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

//SVG
import {stepOne} from '../../Content/SvgLandingPage'
import {SvgIcon} from '../SvgAssets/SvgIcon.js';



export default class LoginPage extends React.Component{
	constructor(props){
		super(props);
		//this.state = {
		//	'email':'',
		//	'password':'',
		//	'username':'',
		//	'validEmailSyntax': false,
		//	'validPasswordLength': false,
		//	'validPasswordUppercase': false,
		//	'validPasswordNumber': false,
		//	'validPasswordLowercase': false,
		//	'validUsername': true,
		//	'selectedFieldName': ''
		//};
		//this._handleOnSubmit = this._handleOnSubmit.bind(this);
		//this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		//this._handleInputSelect = this._handleInputSelect.bind(this);
		//this.validatePassword = this.validatePassword.bind(this);
	}

	/*_handleOnSubmit(){
		console.log("\"Creat Profile\" clicked");
		if(this.state.validEmailSyntax && (this.state.validPasswordLength && this.state.validPasswordLowercase && this.state.validPasswordNumber && this.state.validPasswordUppercase)){
			//this.props.createUser(this.state.email, this.state.password, this.state.username);			
		console.log('calling axio post request from Login Form');
		axios(loginConfig(this.state.email, this.state.password))
		.then(response => {
			if(response.status == OxiAppConstants.HttpStatus.OK){
				//append the authorization token expected in the 200 /login response onto the defualt Authorization header
				cookies.set('authorization', cookies.get('authorization') + response.headers['authorization']);
				axios.defaults.headers.common['authorization'] = cookies.get('authorization');
				//this.props.cancelAction();
				//this.props.history.goBack();
				//this.props.afterLoginSuccess(this.props.requestUrl, this.props.requestType);
				<Redirect to=""/>
			}else{
				//handleUnauthorizedRequest(response);
			}
		}).catch((error) => {
			console.log('error caught from login form: ',error);
		});
		e.preventDefault();
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
				//if(validateUsername(e.target.value)){
				//	this.setState({'validUsername': true})
				//} else {
				//	this.setState({'validUsername': false})
				//}
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
	}*/

	render(){
		return(
			<div>
				<LoginFormContainer isModal={false}/>
			</div>
		);
	}
}

