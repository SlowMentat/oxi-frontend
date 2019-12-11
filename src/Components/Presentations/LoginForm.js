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
//import VisibleFieldDropdownList from '../../Components/Containers/VisibleFieldDropdownList.js';
import {InputTextField} from '../../Components/Presentations/CommonElements.js';
/*import TypeJacket from '../SvgAssets/Icons/TypeJacket.js';
import TypePants from '../SvgAssets/Icons/TypePants.js';
import TypeShirtLong from '../SvgAssets/Icons/TypeShirtLong.js';
import TypeShirtT from '../SvgAssets/Icons/TypeShirtT.js';
import TypeShorts from '../SvgAssets/Icons/TypeShorts.js';*/
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

import { Route, Switch, Redirect } from 'react-router-dom';



export default class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			payload:{
				[props.login]: '',
				[props.credentials]: '',
			},
			'isAuthenticated':false,
		};
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._onSubmitLogin = this._onSubmitLogin.bind(this);
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


	_onSubmitLogin(e, payload){
		//e.stopPropagation();
		/*var formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		console.log(formData);*/
		console.log('calling axio post request from Login Form');
		axios(loginConfig(payload))
		.then(response => {

			if(response.status == OxiAppConstants.HttpStatus.OK){
				cookies.get('authorization') === undefined ? cookies.set('authorization', response.headers['www-authenticate'] + ' ') : null;
				cookies.set('authorization', cookies.get('authorization') + response.headers['authorization']);
				axios.defaults.headers.common['authorization'] = cookies.get('authorization');
				this.props.cancelAction !== undefined ? this.props.cancelAction() : null;
				//this.props.history !== undefined ? this.props.history.goBack() : null;

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

	render(){
		const {
			login,
			credentials,
		} = this.props;

		return(
			<React.Fragment>
			{
				this.state.isAuthenticated ? 
					(<Redirect to={`${OxiAppConstants.routeURIs.browse}`}/>) :
					(<div className={(this.props.isModal === undefined || this.props.isModal === true) ? Styles.modal : Styles.loginPage_div}>
						<div 
							id="form_container_add_item" 
							style={{
								//'background-color':'#fdfdfd', 
								//padding:'10px', 
								//'border-radius':'3px', 
								//'--user-dd-field-color': '#4c4c4c',
							}}
							className={FormStyles.loginFormViewContainer_div}
						>
							<form className={FormStyles.loginForm} action="" method="POST">
								<InputTextField 
									type="Login" 
									name={login} 
									onChange={(event) => {this._handleInputFieldChange(event, login)}}/>
								<InputTextField 
									type="Credentials" 
									name={credentials}
									onChange={(event) => {this._handleInputFieldChange(event, credentials)}}/>
								<div 
									className={FormStyles.l3Button} 
									onClick={(event) => {this._onSubmitLogin(event, this.state.payload )}} 
								>
									SUBMIT
								</div>
							</form>
						</div>
					</div>)
			}
			</React.Fragment>
		);
	}
}