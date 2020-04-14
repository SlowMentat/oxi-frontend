import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FormDeck from './Forms.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';


function Modal(props){
	return (
		<ModalContainer>
			<FormDeck 
				{
					...{
						...props,
						cancelAction: props.closeModal,
						/*submitAction: props.submitAction,*/
						confirmDiscardSubmitAction: (location, isOverlay) => props.confirmDiscardSubmitAction(
							location, 
							props.addedEntitiesReducer, 
							(props.viewState === OxiAppConstants.viewState.ADD ? 
								props.addedEntitiesReducer.outfits.byIds[props.entitiesStateReducer.outfits.prevSelected] :
								props.outfitByIds[props.entitiesStateReducer.outfits.prevSelected]),
							isOverlay
						),					
						clearInvalidations: () => props.clearInvalidations(props.entitiesStateReducer),
					}
				}
			/>
		</ModalContainer>
	);
}

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