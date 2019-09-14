import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.css';
import Styles from '../../root.css';
import {sendAsyncRequest/*, OxiAppConstants*/} from '../../App.js';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {handleUnauthorizedRequest, requestInterceptor, loginConfig, cookies} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {denormalizeOutfit} from '../../Util/Schema.js';
import VisibleFieldDropdownList from '../../Components/Containers/VisibleFieldDropdownList.js';
import {InputTextField} from '../../Components/Presentations/Forms.js'
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
			'inputNameVal':'',
			'inputPasswordVal':'',
			'isAuthenticated':false,
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
				cookies.get('authorization') === undefined ? cookies.set('authorization', response.headers['www-authenticate'] + ' ') : null;
				//append the authorization token expected in the 200 /login response onto the defualt Authorization header
				cookies.set('authorization', cookies.get('authorization') + response.headers['authorization']);
				axios.defaults.headers.common['authorization'] = cookies.get('authorization');
				this.props.cancelAction !== undefined ? this.props.cancelAction() : null;
				//this.props.history !== undefined ? this.props.history.goBack() : null;
				if(this.props.afterLoginSuccess !== undefined){
					this.props.afterLoginSuccess(this.props.requestUrl, this.props.requestType);
					this.setState(prevState => ({
						isAuthenticated: true,
					}));
				}else{
					console.log('afterLoginSuccess not defined');
				}
			}else{
				//handleUnauthorizedRequest(response);
			}
		}).catch((error) => {
			console.log('error caught from login form: ',error);
		});
		e.preventDefault();
	}

	render(){
		return(
			<React.Fragment>
			{
				this.state.isAuthenticated ? 
					(<Redirect to={`${OxiAppConstants.routeURIs.browse}`}/>) :
					(<div className={(this.props.isModal === undefined || this.props.isModal === true) ? Styles.modal : Styles.loginPage_div}>
						<div 
							id="form_containter_add_item" 
							style={{
								'background-color':'#fdfdfd', 
								padding:'10px', 
								'border-radius':'3px', 
								'--user-dd-field-color': '#4c4c4c',
							}}
						>
							<form className={FormStyles.loginForm} action="" method="POST">
								<InputTextField 
									type="User Name" 
									name="username" 
									onChange={(event) => {this._handleInputFieldChange(event, 'name')}}/>
								<InputTextField 
									type="Password" 
									name="password"
									onChange={(event) => {this._handleInputFieldChange(event, 'password')}}/>
								<div 
									className={FormStyles.l3Button} 
									onClick={(event) => {this._onSubmitLogin(event, this.state.inputNameVal, this.state.inputPasswordVal)}} 
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