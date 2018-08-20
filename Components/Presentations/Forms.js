import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from './forms2.css';
import Styles from '../../root.css';
import {sendAsyncRequest, OxiAppConstants} from '../../App.js';
import axios from 'axios';
import {handleUnauthorizedRequest, requestInterceptor, loginConfig} from '../../Components/Actions/indexActions.js';

//=========Primitives Elements=========

const InputTextField = ({type, name, onChange}) => (
	<div className={FormStyles.nameField}>
		{type} <input type="text" name={name} onChange={onChange}/>
	</div>	
)

//=========Form selection switch block//=========

function FormDeck(props){
	switch(props.formType){
		case "Login":
			return (
				<LoginForm cancelAction={props.cancelAction}/>
			)
		case "AddItem":
			return (
				<ItemForm cancelAction={props.cancelAction} submitAction={props.submitAction} submitContext="Add"/>
			)
		case "UpdateItem":
			return (
				<ItemForm cancelAction={props.cancelAction} submitAction={props.submitAction} submitContext="Update"/>
			)
		default:
			return null
	} 
}

//=========Add Item Form

export class ItemForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'type':'',
			'size':'',
			'hashTag':'',
			'url':''
		};
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._handleOnSubmit = this._handleOnSubmit.bind(this);
	}

	_handleInputFieldChange(event){
		//e.stopPropagation();
		const target = event.target;

		switch (target.name){
			case 'ItemType':
				this.setState({type: event.target.value});
				break;
			case 'size':
				this.setState({size: event.target.value});
				break;
			case 'hashTag':
				this.setState({hashTag: event.target.value});
				break;
			case 'url':
				this.setState({url : event.target.value});
				break;
			default:
				console.log("target names not found in Item input feilds")
				break;
		}
	}

	_handleOnSubmit(event){
		this.props.submitAction(this.state.size, this.state.hashTag, this.state.url);
		this.props.cancelAction();
	}

	render(){
		return(
			<div className={Styles.modal}>
				<form className={FormStyles.loginForm} action="" method="POST">
					<div className={FormStyles.nameField}>
						<select name="ItemType" onChange={() => {this._handleInputFieldChange(event)}}>
							<option value="pants">pants</option>
							<option value="shirt">shirt</option>
							<option value="shoes">shoes</option>
							<option value="accessories">accessories</option>
						</select>
					</div>
					<InputTextField type="Size" name="size" onChange={() => {this._handleInputFieldChange(event)}}/>
					<InputTextField type="Tag" name="hashTag" onChange={() => {this._handleInputFieldChange(event)}}/>
					<InputTextField type="URL" name="url" onChange={() => {this._handleInputFieldChange(event)}}/>
					<div className={FormStyles.submitButton} onClick={() => {this._handleOnSubmit(event)}}>
						{this.props.submitContext}
					</div>
					<div className={FormStyles.submitButton} onClick={this.props.cancelAction}>
						Cancel
					</div>
				</form>
			</div>
		);
	}
}

/*AddItem.propTypes = {
	onClick: propTypes.func.isRequried
}*/

//=========Login Form=========
export class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'inputNameVal':'',
			'inputPasswordVal':''
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
		/*axios.post(OxiAppConstants.apiBaseUrl + '/login', {
			'password': password,
			'username': username,
			headers:{
				'X-CSRF-TOKEN' : cookies.get('csrf_token')
			}
		})*/
		.then(response => {
			if(response.status == 200){
				this.props.cancelAction();
			}else{
				//handleUnauthorizedRequest(response);
			}
		});
		/*sendAsyncRequest(
					{},
					formData,
					'POST',
					'http://72.14.177.220/gs-convert-jar-to-war-0.1.0/login',
					this.props.cancelAction()
		);*/
		e.preventDefault();
	}

	render(){
		return(
			<div className={Styles.modal}>
				<form className={FormStyles.loginForm} action="" method="POST">
					<InputTextField type="User Name" name="username" onChange={() => {this._handleInputFieldChange(event, 'name')}}/>
					<InputTextField type="Password" name="password" onChange={() => {this._handleInputFieldChange(event, 'password')}}/>
					<div className={FormStyles.submitButton} onClick={() => {
							this._onSubmitLogin(event, this.state.inputNameVal, this.state.inputPasswordVal)
						}
					}>
						SUBMIT
					</div>
				</form>
			</div>
		);
	}
}

/*Login.propTypes = {
	onClick: propTypes.func.isRequired
}*/

export default FormDeck
//export default Login
//export default Login
//export default FormDeck