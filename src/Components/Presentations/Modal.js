import React from 'react';
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

	return (
		
		<Dialog
			open={props.formType !== null}
			preventOutsideDismiss={props.viewState === OxiAppConstants.viewState.EDIT ? true : false}
			//preventOutsideDismiss={ true }
			onClose={props.closeModal}
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
									props.addedEntitiesReducer.outfits.byIds[props.entitiesStateReducer.outfits.prevSelected] :
									props.outfitByIds[props.entitiesStateReducer.outfits.prevSelected]),
								isOverlay,
								props.formType
							),					
							clearInvalidations: () => props.clearInvalidations(props.entitiesStateReducer),
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