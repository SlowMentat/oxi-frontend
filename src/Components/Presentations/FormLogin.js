import "core-js";
import "regenerator-runtime/runtime";

import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.scss';
import Styles from '../../root.scss';
//import {sendAsyncRequest/*, OxiAppConstants*/} from '../../App.js';
import axios from 'axios';

import { 
	TransitionGroup, 
	CSSTransition,
} from 'react-transition-group';

import {
	handleUnauthorizedRequest, 
	requestInterceptor, 
	loginConfig, 
	//cookies,
} from '../../Components/Actions/indexActions.js';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {denormalizeOutfit} from '../../Util/Schema.js';
import {InputTextField} from '../../Components/Presentations/CommonElements.js';
import { SvgIcon } from '../SvgAssets/SvgIcon.js';
import { Button } from '../../Components/Presentations/FitseeUI/Buttons/index.js';

import { 
	Route, 
	Switch, 
	Redirect,
} from 'react-router-dom';

import { TextField } from './FitseeUI/index.js'
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { Theme } from '@rmwc/theme';
import '@rmwc/theme/styles';
import { ThemeProvider } from '@rmwc/theme';
import { defaultCookieOptions } from '../../Components/Actions/NetworkActions.js';
import Cookies from 'universal-cookie';
var cookies = new Cookies();


export default class FormLogin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			payload:{
				[props.login]: '',
				[props.credentials]: '',
			},
			'isAuthenticated':false,
			isEmailSent: false,
			error: false,
		};
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._onSubmitLogin = this._onSubmitLogin.bind(this);
		this._onSubmitResend = this._onSubmitResend.bind(this);
		this.setAuthorization = this.setAuthorization.bind(this);
	}

	_handleInputFieldChange(e, type){
		const {
			login,
			credentials,
		} = this.props;

		//e.stopPropagation();
		switch (type){
			case login:
				this.setState({
					payload:{
						[login]: e.target.value,
						[credentials]: this.state.payload[credentials],
					}
				});
				break;
			case credentials:
				this.setState({
					payload:{
						[login]: this.state.payload[login],
						[credentials]: e.target.value,
					}
				});
				break;
			default:
				break;
		}
	}

	_onSubmitResend(e, payload){
		/*axios({
			method: 'GET',
			//headers: {
			//	'token': token,
			//},
			//url: `${OxiAppConstants.apiBaseURL}${OxiAppConstants.endPoints.b}/user/sendVerificationEmail`, 
			url: `${OxiAppConstants.apiBaseURL}${OxiAppConstants.endPoints.b}/user/login`, 
		})*/
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

	_onSubmitLogin(e, payload, cookies){
		//e.stopPropagation();
		/*var formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		console.log(formData);*/
		console.log('calling axio post request from Login Form');
		const response = null;

		try{
			axios(loginConfig(payload, this.props.serviceURL))
			.then(response => {
				//return response;
				if(response.status == OxiAppConstants.HttpStatus.OK){
					this.setAuthorization(response, cookies);

					if(this.props.afterLoginSuccess !== undefined){
						this.props.afterLoginSuccess(this.props.requestUrl, this.props.requestType);
						this.props.closeModal(OxiAppConstants.FormType.LOGIN);
						
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
			})

			.catch((error) => {
				console.log('error caught from login form: ',error);
				return error;
			});
		}
		catch(error){
			console.log(error);
		}


		e.preventDefault();
	}

	setAuthorization(response, cookies){
		var cookieAuth = cookies.cookies['authorization'];
		
		//cookieAuth = cookieAuth ? //cookieAuth === undefined || cookieAuth === null ? 
		//	cookies.set('authorization', response.headers['www-authenticate'] + ' ' + response.headers['authorization'], defaultCookieOptions) :
		//	null;

		if(!cookies.get('authorization')){
			// Set the authorization cookie referencing the ww-authenticate and authorization response header values.
			cookies.set(
				'authorization', 
				response.headers['www-authenticate'] + ' ' + response.headers['authorization'], 
				defaultCookieOptions
			);
		}
		else{
			// Add token to authorization cookie referencing the authorization respone header.
			if(cookies.get('authorization').slice("Bearer ".length).length > 0){
				// Bearer token has already been set
			}
			else{
				cookies.set(
					'authorization', 
					cookies.get('authorization') + response.headers['authorization'], 
					defaultCookieOptions
				);
			}			
		}

		axios.defaults.headers.common['authorization'] = cookies.cookies['authorization'];
		this.props.cancelAction !== undefined ? this.props.cancelAction() : null;
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

		var qsParams = location ? 
			location.search.slice(1).split('&').reduce((accum, pair) => {
				var keyVal = pair.split('=');

				return({
					...accum,
					[keyVal[0]] : keyVal[1],
				});

			}, {}) : 
			({});

		var {
			token,
		} = qsParams;

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
								{/*<InputTextField 
									type="Login" 
									name={login} 
									onChange={(event) => {this._handleInputFieldChange(event, login)}}/>
								<InputTextField 
									type="Credentials" 
									name={credentials}
									onChange={(event) => {this._handleInputFieldChange(event, credentials)}}/>*/}
								{/*<Typography use="overline">	*/}
								<ThemeProvider
									options={{
										primary: 'var(--color-01-tint-02)',
										secondary: 'var(--color-05-tint-01)',
									}}
									style={{
										'margin-bottom': '24px',
									}}
								>
								<Theme use="secondary">
								<TextField
									style={{'margin-top':'7px', width: '100%', 'font-size':'14px'}}
									theme="secondary"
									outlined
									label={login}
									onChange={(event) => {this._handleInputFieldChange(event, login)}}
								/>
								<TextField
									style={{'margin-top':'17px', width: '100%', 'font-size':'14px'}}
									theme="secondary"
									outlined
									label={credentials}
									onChange={(event) => {this._handleInputFieldChange(event, credentials)}}
								/>
								</Theme>
								</ThemeProvider>
								{/*</Typography>*/}
								{
								//	<div 
								//		className={FormStyles.l3Button} 
								//		style={{
								//			'margin-top': '17px', 
								//			'font-size':'1.3rem'
								//		}}
								//		onClick={(event) => {
								//			if(isIntentToRegister){
								//				this._onSubmitResend(event, this.state.payload);
								//			}
								//			else{
								//				this._onSubmitLogin(event, this.state.payload);
								//			}
								//		}} 
								//	>
								
								//			{ isIntentToRegister ? 'RESEND' : 'SUBMIT' }
								//	<div>
								}
								<div
									style={{
										display:'flex',
										'justify-content':'center',
									}}
								>
									<Button
										//icon="cloud_upload"
										theme={["textPrimaryOnDark", "primaryBg"]}
										label={ isIntentToRegister ? 'RESEND' : 'SUBMIT' }
										labelSize='12px'
										raised
										onClick={(event) => {
											if(isIntentToRegister){
												this._onSubmitResend(event, this.state.payload);
											}
											else{
												this._onSubmitLogin(event, this.state.payload, cookies);
											}
										}}
										//style={eppCtrl_div} 
									/>
								</div>
							</form>
						</div>
					</div>)
			}
			</React.Fragment>
		);
	}
}