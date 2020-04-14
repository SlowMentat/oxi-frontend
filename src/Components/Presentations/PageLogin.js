import React from 'react';
import MetricStyles from '../../metric.scss';
import {OxiAppConstants} from  '../../Util/OxiAppConstants.js'

import { CreateAccountField } from '../../Components/Presentations/Forms.js';
import FormLoginContainer from '../../Components/Containers/FormLoginContainer.js';

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

//SVG
import {stepOne} from '../../Content/SvgLandingPage'
import {SvgIcon} from '../SvgAssets/SvgIcon.js';



export default class PageLogin extends React.Component{
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

	render(){
		return(
			<div>
				<FormLoginContainer isModal={false} {...this.props}/>
			</div>
		);
	}
}

