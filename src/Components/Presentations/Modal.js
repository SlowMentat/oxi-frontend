import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FormDeck from './Forms.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';


function Modal(props){
	return (
		<ModalContainer>
			<FormDeck 
				formType={props.formType} 
				cancelAction={props.closeModal} 
				submitAction={props.submitAction} 
				confirmDiscardSubmitAction = {
					(location) => props.confirmDiscardSubmitAction(
						location, 
						props.addedEntitiesReducer, 
						(props.viewState === OxiAppConstants.viewState.ADD ? 
							props.addedEntitiesReducer.outfits.byIds[props.entitiesStateReducer.outfits.prevSelected] :
							props.outfitByIds[props.entitiesStateReducer.outfits.prevSelected])
					)
				}
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
				math={props.match}
				history={props.history}
				getSuggestion={props.getSuggestion}
				getApparelTypes={props.getApparelTypes}
				allApparelTypes={props.allApparelTypes}
				getSizeChartByItemId={props.getSizeChartByItemId}
				createSizeGroup={props.createSizeGroup}
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