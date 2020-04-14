import React from 'react';
import FormUpdatePassword from '../../Components/Presentations/FormUpdatePassword.js';

export default class PageUpdatePassword extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
	}

	render(){
		return(
			<div>
				<FormUpdatePassword
					isModal={false} 
					{...this.props}
				/>
			</div>
		);
	}
}

