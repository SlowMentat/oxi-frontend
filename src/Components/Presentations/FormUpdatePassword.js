//import "core-js";
//import "regenerator-runtime/runtime";

import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.scss';
import Styles from '../../root.scss';
import axios from 'axios';

import {
	//handleUnauthorizedRequest, 
	loginConfig, 
	cookies
} from '../../Components/Actions/indexActions.js';

import { OxiAppConstants } from '../../Util/OxiAppConstants.js';
import { InputTextField } from '../../Components/Presentations/CommonElements.js';
import { SvgIcon } from '../SvgAssets/SvgIcon.js';
import { Button } from '../../Components/Presentations/Controls.js';

import { 
	//Route, 
	//Switch, 
	Redirect 
} from 'react-router-dom';

import queryString from 'query-string';


export default class FormUpdatePassword extends React.Component{

	constructor(props){
		super(props);

		const fieldNames = [
			'Old Password',
			'New Password',
			'Confirm Password',
		]

		this.state = {
			payload: fieldNames.reduce((accum, name) => ({...accum, [name]:''}), {}),
			isAuthenticated: false,
			isEmailSent: false,
			error: false,
		};
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._onSubmitLogin = this._onSubmitLogin.bind(this);
		this._updatePassword = this._updatePassword.bind(this);
		this._iniPassword = this._iniPassword.bind(this);
		this.setAuthorization = this.setAuthorization.bind(this);
	}

	_handleInputFieldChange(value, type){
		this.setState(prevState => ({
			...prevState,
			payload:{
				...prevState.payload,
				[type]: value//e.target.value,
			}
		}));
	}

	_updatePassword(e, oldPassword, newPassword){

		axios({
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				newPassword: newPassword,
			},
			//url: `${OxiAppConstants.apiBaseURL}${OxiAppConstants.endPoints.b}/user/sendVerificationEmail`, 
			url: `${OxiAppConstants.apiBaseURL}${OxiAppConstants.endPoints.b}/user/password?oldPassword=${oldPassword}`, 
		})

	}

	_iniPassword(e, token, newPassword){

		new Promise((resolve, reject) => {
			resolve(axios({
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					password: newPassword,
				},
				//url: `${OxiAppConstants.apiBaseURL}${OxiAppConstants.endPoints.b}/user/sendVerificationEmail`, 
				url: `${OxiAppConstants.apiBaseURL}${OxiAppConstants.endPoints.b}/user/iniPassword?token=${token}`, 
			}));
		})
		.then(response => {

			console.log("response status = ", response.status);

			if(response.status === OxiAppConstants.HttpStatus.OK){
				console.log('sending req to /shop/browse')
				window.location = `${OxiAppConstants.webAppBaseURL}${OxiAppConstants.routeURIs.browse}`
				//axios({
				//	method: 'GET',
				//	headers: {},
				//	data: {},
				//	url: `${OxiAppConstants.webAppBaseURL}${OxiAppConstants.routeURIs.browse}`
				//})
				//.then(response => )
				//.catch(error => throw error)
			}
		})
		.catch(error => {
			console.error(error.response.data.message);
		});

	}

	_onSubmit(e, payload){

		axios(loginConfig(payload, `${OxiAppConstants.apiBaseURL}${OxiAppConstants.endPoints.b}/user`))
		.then(response => {

			if(response.status === OxiAppConstants.HttpStatus.OK){

				this.setAuthorization(response);
				// rquestUrl is expected be defined and not null during a resend email submission 
				axios({
					method: this.props.requestType,
					url: `${this.props.requestUrl}`
				})
				.then((response) => {
					if(OxiAppConstants.HttpStatus.OK){
						this.setState(prevState => ({
							...prevState,
							isEmailSent: true,
							error: false,
						}))			
					}
				})
				.catch(error => {
					this.setState(prevState => ({
						...prevState,
						error: error.response.data.message,
					}))
				});
			}
		})
		.catch(error => {
			this.setState(prevState => ({
				...prevState,
				error: 'Login failed.  Incorrect username or password',
			}))
		})
	}

	_onSubmitLogin(e, payload){
		//e.stopPropagation();
		/*var formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		console.log(formData);*/
		console.log('calling axio post request from Login Form');
		axios(loginConfig(payload, this.props.serviceURL))
		.then(response => {

			if(response.status == OxiAppConstants.HttpStatus.OK){
				this.setAuthorization(response);

				if(this.props.afterLoginSuccess !== undefined){
					this.props.afterLoginSuccess(this.props.requestUrl, this.props.requestType);
					this.setState(prevState => ({
						isAuthenticated: true,
					}));
				}
				else{
					console.log('afterLoginSuccess not defined');
				}
			}
			else{
				//handleUnauthorizedRequest(response);
			}
		}).catch((error) => {
			console.log('error caught from login form: ',error);
		});
		e.preventDefault();
	}

	setAuthorization(response){
		var cookieAuth = cookies.get('authorization');
		
		cookieAuth = cookieAuth === undefined || cookieAuth === null ? 
			cookies.set('authorization', response.headers['www-authenticate'] + ' ' + response.headers['authorization']) :
			null;

		if(cookieAuth === undefined || cookieAuth === null){
			cookies.set('authorization', response.headers['www-authenticate'] + ' ' + response.headers['authorization']);
		}
		
		const isBearerSet = cookies.get('authorization') ? 
			cookies.get('authorization').slice("Bearer ".length).length > 0 :
			false;

		isBearerSet ? 
			(null) :
			cookies.set('authorization', cookies.get('authorization') + response.headers['authorization']);

		//cookies.set('authorization', cookies.get('authorization') + response.headers['authorization']);
		axios.defaults.headers.common['authorization'] = cookies.get('authorization');
		this.props.cancelAction !== undefined ? this.props.cancelAction() : null;
		//this.props.history !== undefined ? this.props.history.goBack() : null;

	}

	render(){
		// Methods
		const {
			handleRegister,
		} = this.props;

		// Variables
		const {
			isIntentToRegister,
			login,
			credentials,
			location,
		} = this.props;

		const {
			isEmailSent,
			error,
		} = this.state;

		const { search } = location ? location : ({});
		const qs = queryString.parse(search);
		const fieldNames = Object.keys(this.state.payload);

		return(
			<React.Fragment>
			{
				this.state.isAuthenticated ? 
					(<Redirect to={`${OxiAppConstants.routeURIs.browse}`}/>) :
					(<div className={(this.props.isModal === undefined || this.props.isModal === true) ? Styles.modal : Styles.loginPage_div}>
						<div 
							id="form_container_add_item" 
							style={
								isIntentToRegister ? ({
										'background-color': 'white',
										'border-radius': '3px',
										border:'solid 1px var(--colorBorder)',
										position: 'relative',
									}) : ({

									})
							}
							className={FormStyles.loginFormViewContainer_div}
						>
							{
								isIntentToRegister ? (	
									<React.Fragment>								
										<div 
											style={{
												position: 'absolute',
												right: '27px',
												top: '27px',
												color: '#c7c7c7',
											}}
										>
											<i 
												class="material-icons"
												style={{
													'font-size':'48px'
												}}
											>
												mail_outline
											</i>
										</div>								
										<div 
											style={
												isEmailSent ? ({
													position: 'absolute',
													right: '58px',
													top: '20px',
													color: '#3ab93a'

												}) : {
													position: 'absolute',
													right: '58px',
													top: '20px',
													color: '#ff508a',
												}}
										>
											<i 
												class="material-icons"
												style={{
													'font-size':'28px'
												}}
											>
												{ isEmailSent ? "check_circle" : "error" }
											</i>
										</div>
										<div className={FormStyles.rem_container_div}>
											<div className={FormStyles.rem__div}>
												{
													isEmailSent ? 
														<p>
															<span 
																style={{
																	'font-size':'18px',
																	'font-weight':'bold',
																	'color':'#4c4c4c',
																	'line-height': '24px',
																}}
															>
																Email Sent
															</span>
															<br/>
															Check your email for verification link.
														</p> :
														error ? 
															<p style={{'color':'red'}}><b>Error</b>&nbsp;{error}</p> :
															<p>
																<span 
																	style={{
																		'font-size':'18px',
																		'font-weight':'bold',
																		'color':'#4c4c4c',
																		'line-height': '24px',
																	}}
																>
																	Link Expired
																</span>
																<br/>
																<br/>
																Enter credentials below to&nbsp;
																<b style={{color:'var(--color6)'}}>
																	resend&nbsp;
																</b> 
																a verification link to your&nbsp;
																<b style={{color:'var(--color6)'}}>
																	email
																</b>
																.
															</p>
												}
											</div>
										</div>
									</React.Fragment>
								) : null
							}
							<form className={FormStyles.loginForm} action="" method="POST">
								{
									qs.token ? 
										null :
										(<InputTextField 
											type={fieldNames[0]}//old password 
											name={fieldNames[0]} 
											onChange={(event) => {this._handleInputFieldChange(event.target.value, fieldNames[0])}}
										/>)
								}
								<InputTextField 
									type={fieldNames[1]}//new password
									name={fieldNames[1]} 
									onChange={(event) => {this._handleInputFieldChange(event.target.value, fieldNames[1])}}/>
								<InputTextField 
									type={fieldNames[2]}//confirm password
									name={fieldNames[2]} 
									onChange={(event) => {this._handleInputFieldChange(event.target.value, fieldNames[2])}}/>
								<div 
									className={FormStyles.l3Button} 
									style={{
										'margin-top': '17px', 
										'font-size':'1.3rem'
									}}
									onClick={(event) => {
										if(qs.token && this.state.payload[fieldNames[1]] === this.state.payload[fieldNames[2]]){
											this._iniPassword(event, qs.token, this.state.payload[fieldNames[1]]);
										}
										else{
											this._updatePassword(event, this.state.payload[fieldNames[0]], this.state.payload[fieldNames[1]])
											console.error("New password must be the same as confirmation password.")
										}
									}} 
								>
									{ 'SUBMIT' }
								</div>
							</form>
						</div>
					</div>)
			}
			</React.Fragment>
		);
	}
}