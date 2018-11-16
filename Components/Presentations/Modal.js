import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FormDeck from './Forms.js';


function Modal(props){
	return (
		<ModalContainer>
			<FormDeck 
				formType={props.formType} 
				cancelAction={props.closeModal} 
				submitAction={props.submitAction} 
				confirmDiscardSubmitAction = {() => props.confirmDiscardSubmitAction(null, props.addedEntitiesReducer)}
				outfits={props.outfits}
				contents={props.contents} 
				items={props.items}
				itemAllIds={props.itemAllIds}
				modifyContentItems={props.modifyContentItems}
				afterLoginSuccess={props.afterLoginSuccess}
				requestUrl={props.requestUrl}
				requestType={props.requestType}
				brandIds={props.brandIds}
				brands={props.brands}
				retailerIds={props.retailerIds}
				retailers={props.retailers}
				requestedNav={props.requestedNav}
				itemLocation={props.itemLocation}
				editingItem={props.editingItem}
				clearUpdates={props.clearUpdates}
				clearInvalidations={() => props.clearInvalidations(props.entitiesStateReducer)}

			/>
		</ModalContainer>
	);
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

export default Modal;