import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FormDeck from './Forms.js';
import { OxiAppConstants } from '../../Util/OxiAppConstants.js';
import { WrapMuiProviders } from '../../App.js';
/*import { Dialog, DialogContent } from '@rmwc/dialog';
import '@rmwc/dialog/styles';*/
import { Dialog, DialogContent } from '../../Components/Presentations/FitseeUI/Dialogs/index.js';


function Modal(props){
	//[ dialogStyle, setDialogStyle ] = React.useState({});

	// set prevSelectedOutfitId to prevSelected otherwise set to selected
	var prevSelectedOutfitId = props.entitiesStateReducer.outfits.prevSelected;

	return (
		
		<Dialog
			open={props.formType !== null}
			preventOutsideDismiss={
				props.viewState == OxiAppConstants.viewState.EDIT || 
				props.viewState == OxiAppConstants.viewState.ADD ||
				props.formType == OxiAppConstants.FormType.LOGIN
			}
			scrimOpacity={(props.modals[props.formType] ? props.modals[props.formType].scrimOpacity : 0.6)}
			//preventOutsideDismiss={ true }
			onClose={e => props.closeModal(props.formType)}
			//style={ dialogStyle }
		>
			{/*<DialogContent>*/}
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
									props.addedEntitiesReducer.outfits.byIds[prevSelectedOutfitId] :
									props.outfitByIds[prevSelectedOutfitId]),
								props.entitiesStateReducer.outfits.selected,
								isOverlay,
								props.formType
							),		
							clearInvalidations: () => props.clearInvalidations(props.entitiesStateReducer),
							//scrollTop: scrollTop,
							//setScrollTop: setScrollTop,
						}
					}
				/>
			{/*</DialogContent>*/}
		</Dialog>
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
		const portal = ReactDOM.createPortal(this.props.children, this.el,);
		return(
			{ portal }
		);
	}
}

export default Modal;