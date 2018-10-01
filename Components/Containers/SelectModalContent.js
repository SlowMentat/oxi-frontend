import { connect } from 'react-redux';
import { setFormVisibility, addItem, selectAddedEntity, modifyContent, navigateTo, editContentView, disableAddOutfit, removeAddedEntityAndPropogate } from '../../Components/Actions/indexActions.js';
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
	let outfits = null;
	let contents = null;
	let items = null;
	let itemAllIds = null;

	if(state.toggleModal.modal === OxiAppConstants.FormType.ADD_ITEM){
		contents = state.addedEntitiesReducer.contents;
		itemAllIds = state.addedEntitiesReducer.items.allIds;
	}else if(state.toggleModal.modal === OxiAppConstants.FormType.UPDATE_ITEM){
		contents = state.entitiesReducer.contents;
		itemAllIds = state.entitiesReducer.items.allIds;
	}else if(state.toggleModal.modal === OxiAppConstants.FormType.DISCARD_EDITS){
		console.log('setting entities:')
		outfits = state.addedEntitiesReducer.outfits.byIds;
		contents = state.addedEntitiesReducer.contents.byIds;
		items = state.addedEntitiesReducer.items.byIds;
		console.log('outfits', outfits);
		console.log('contents', contents);
		console.log('items', items);
	}

	return {
		formType: state.toggleModal.modal,
		outfits: outfits,
		contents: contents,
		items: items,
		itemAllIds: itemAllIds,
		requestUrl: state.toggleModal.prevRequestUrl,
		requestType: state.toggleModal.prevRequestType,
		itemLocation: state.toggleModal.otherData.newItemLocation,
		brandIds: state.entitiesReducer.brands.allIds,
		brands: state.entitiesReducer.brands.byIds,
		retailerIds: state.entitiesReducer.retailers.allIds,
		retailers: state.entitiesReducer.retailers.byIds,
		requestedNav : state.requestedNavigation.location
	};
}

const mapDispatchToProps = (dispatch, state) => ({
		closeModal: (formType) => {
			dispatch(setFormVisibility(null));
			//if(formType === OxiAppConstants.FormType.DISCARD_EDITS) throw OxiAppConstants.NavigationException.USER_CANCELED
		},
		submitAction: (type, posx, posy, size, retailer, brand) => {
			dispatch(addItem(type, posx, posy, size, retailer, brand));
			//dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.ITEM, addedOutfitId))
		},		
		//entity:  		is the enttiy object to discard
		//location:  	indicates this method was invoced from a navigation action to location
		confirmDiscardSubmitAction: (entity, location) => {
			console.log("confirmDiscardSubmitAction dispatched")
			dispatch(setFormVisibility(null));
			//dispatch action to removeAndPropogate added Outfit.  This assumes that there will only ever be 1 outfit entity with id = 1 in addedEntitiesReducer tree 
			dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, entity))
			//dispatch action to transition into preview mode
			dispatch(editContentView(false));
			//check if the form was created due to a navigation action.  If so, follow up with navigation.
			if(location !== null){
				dispatch(navigateTo(location));
			}
			//Enable the button that adds outfits
			dispatch(disableAddOutfit(false));
			//dispatch action to select previously selected Outfit id (before adding discarded outfit)
		},
		modifyContentItems: (contentId, itemAllIds) => {
			dispatch(modifyContent({
				'id': contentId, 
				'items':itemAllIds
			}));
		},
		afterLoginSuccess:  (requestUrl, requestType) => OxiAppConstants.requestToBatchedDispatchMap[requestUrl.replace(OxiAppConstants.serviceUrl+'/', "").split('?')[0]][requestType](dispatch)
})

const ModalContentSelection = connect(mapStateToProps, mapDispatchToProps)(Modal);
export default ModalContentSelection;