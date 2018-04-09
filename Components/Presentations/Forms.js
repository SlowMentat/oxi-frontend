import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from './forms2.css';
import Styles from '../../root.css';
import {sendAsyncRequest, OxiAppConstants} from '../../App.js';

//=========Primitives Elements=========

const InputTextField = ({type, name, onChange}) => (
	<div className={FormStyles.nameField}>
		{type} <input type="text" name={name} onChange={onChange}/>
	</div>	
)

//=========Form selection switch block//=========

function FormDeck(props){
	console.log("FormDeck selections: " + props.selection)
	switch(props.selection){
		case "Login":
			return (
				<Login closeLogin={props.closeForm}/>
			)
		case "AddItem":
			return (
				<AddItem onClick={props.onClick}/>
			)
		default:
			return null
	} 
}

//=========Add Item Form

export const AddItem = ({onClick}) => (	
	<div className={Styles.modal}>
		<form className={FormStyles.loginForm} action="" method="POST">
			<InputTextField type="Size" name="size" />
			<InputTextField type="#" name="tag" />
			<InputTextField type="URL" name="url" />
			<div className={FormStyles.submitButton} onClick={onClick}>
				SUBMIT
			</div>
		</form>
	</div>
)

/*AddItem.propTypes = {
	onClick: propTypes.func.isRequried
}*/

//=========Login Form=========
export class Login extends React.Component{
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
		var formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		console.log(formData);
		sendAsyncRequest(
					{},
					formData,
					'POST',
					'http://72.14.177.220/gs-convert-jar-to-war-0.1.0/login'/*OxiAppConstants.apiBaseUri + '/login'*/,
					this.props.closeLogin()
		);
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