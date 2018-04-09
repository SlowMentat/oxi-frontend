import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FormDeck from './Forms.js';


const FilledModal = ({modalContent, closeModal}) => {
	return (
		<ModalContainer>
			<FormDeck selection={modalContent} closeForm={closeModal}/>
		</ModalContainer>
	)
}

/*
class FilledModal extends React.Component{
	constructor(props){
		super(props);

		this._handleClose = this._handleClose.bind(this);
	}

	componentDidMount(){
	}

	componentWillUnmount(){
	}

	_handleClose(){
		props
	}

	render(){
		<Modal>
			{modalContent}
		</Modal>		
	}
}*/

class ModalContainer extends React.Component{
	constructor(props){
		super(props);
    	this.el = document.createElement('div');
	}

	componentDidMount(){
		document.getElementById('modalRoot').appendChild(this.el);
	}

	componentWillUnmount(){
		document.getElementById('modalRoot').removeChild(this.el);
	}

	render(){
		return ReactDOM.createPortal(this.props.children, this.el,);
	}
}

export default FilledModal;