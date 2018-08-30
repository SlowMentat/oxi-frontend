import { connect } from 'react-redux';
import { setFormVisibility, addItem, selectAddedEntity, modifyContent } from '../../Components/Actions/indexActions.js';
import Modal from '../../Components/Presentations/Modal.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

/*const selectModalContent = (selectedForm) => {
	console.log("entering switch statement if selectModalContent container")
	//(selectedForm === 'NONE') ? null : <FromDeck selection={selectedForm}/>;

	/*switch(selectedForm){
		case 'Login':
			return (<Login />);
		case 'AddItem':
			return (<AddItem />);
		default:
			return null;
	}*/
//}

const mapStateToProps = state => {
	console.log("state = " + state.toggleModal.modal)
	let contents = null;
	let itemAllIds = null;
	if(state.toggleModal.modal === OxiAppConstants.FormType.ADD_ITEM){
		contents = state.addedEntitiesReducer.contents;
		itemAllIds = state.addedEntitiesReducer.items.allIds;
	}else if(state.toggleModal.modal === OxiAppConstants.FormType.UPDATE_ITEM){
		contents = state.entitiesReducer.contents;
		itemAllIds = state.entitiesReducer.items.allIds;
	}
	return {
		formType: state.toggleModal.modal,
		contents: contents,
		itemAllIds: itemAllIds
	};
}

const mapDispatchToProps = dispatch => ({
		closeModal: () => dispatch(setFormVisibility(null)),
		submitAction: (size, hashTag, url) => {
			dispatch(addItem(url, size, hashTag));
			//dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.ITEM, addedOutfitId))
		},
		modifyContentItems: (contentId, itemAllIds) => {
			dispatch(modifyContent({
				'id': contentId, 
				'items':itemAllIds
			}));
		}
})

const ModalContentSelection = connect(mapStateToProps, mapDispatchToProps)(Modal);
export default ModalContentSelection;