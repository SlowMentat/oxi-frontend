import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	addItem, 
	selectAddedEntity, 
	modifyContent, 
	navigateTo, 
	editContentView, 
	disableAddOutfit, 
	removeAddedEntityAndPropogate,
	clearAllAddedEntitiesState,
	clearEdittingI,
	addToEdittingI,
	replaceEdittingI,
	clearEdittingIds,
	addToEdittingIds,
	replaceEdittingIds,
	disableAddContentButton,
	clearClientInvalidation,
	clearSelectMultipleEntity,
	fetchSuggestion,
	selectAndPropagate,
	getSizeChartByItemId,
	createSizeGroups,
	clientInvalidateEntities,
	fetchImage,
	modifyProfile,
	postProfile,
	postImage,
	setFormOverlayVisibility,
	deselectAndPropogate,
	verifyIntent,
	setWebAppViewContext,
	deleteOutfits,
} from '../../Components/Actions/indexActions.js';
import Modal from '../../Components/Presentations/Modal.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

import { withRouter } from 'react-router-dom';
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

const mapStateToProps = (state, props) => {
	console.log("state = " + state.toggleModal.modal)
	let outfits = null;
	let contents = null;
	let items = null;
	let itemAllIds = null;

	if(state.toggleModal.modal === OxiAppConstants.FormType.ADD_ITEM){
		contents = state.addedEntitiesReducer.contents;
		itemAllIds = state.addedEntitiesReducer.items.allIds;
	}

	//TODO:  won't worth with the current state implementaion.  Items being updated are done in the addedEntityReducer tree
	else if(state.toggleModal.modal === OxiAppConstants.FormType.UPDATE_ITEM){
		contents = state.entitiesReducer.contents;
		itemAllIds = state.entitiesReducer.items.allIds;
	}

	else if(state.toggleModal.modal === OxiAppConstants.FormType.DISCARD_EDITS){
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
		overlayModal: state.toggleModal.overlayModal,
		outfits: outfits,

		contents: contents,
		items: items,
		itemAllIds: itemAllIds !== null ? itemAllIds : state.addedEntitiesReducer.items.allIds,
		requestUrl: state.toggleModal.prevRequestUrl,
		requestType: state.toggleModal.prevRequestType,
		itemLocation: state.toggleModal.otherData ? state.toggleModal.otherData.newItemLocation : ({}),
		brandIds: state.entitiesReducer.brands.allIds,
		brands: state.entitiesReducer.brands.byIds,
		retailerIds: state.entitiesReducer.retailers.allIds,
		retailers: state.entitiesReducer.retailers.byIds,
		outfitByIds: state.entitiesReducer.outfits.byIds,
		requestedNav : state.requestedNavigation.location,
		entitiesStateReducer: state.entitiesStateReducer,
		addedEntitiesReducer: state.addedEntitiesReducer,
		allApparelTypes: Object.values(state.entitiesReducer.apparelTypes.byIds),
		viewState: state.contentViewState.viewState,
		profile: state.entitiesReducer.profile.byIds
	};
}

const mapDispatchToProps = (dispatch, ownProps) => ({
		closeModal: (formType, isOverlay) => {
			isOverlay ? dispatch(setFormOverlayVisibility(null)) : dispatch(setFormVisibility(null));
			//if(formType === OxiAppConstants.FormType.DISCARD_EDITS) throw OxiAppConstants.NavigationException.USER_CANCELED
		},
		//confirmDiscard : () => dispatch(verifyIntent(OxiAppConstants.Intent.DISCARD_EDITS)),
		submitAction: (item) => {
			dispatch(addItem(item));
			//dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.ITEM, addedOutfitId))
		},
		clientInvalidateAddedItems: (ids) => {
			clientInvalidateEntities(OxiAppConstants.EntityTypes.ITEM, ids);
		},
		editingItem: (addedItemIds) => {
			//record the added item above to the isEdittingIds lt
			//dispatch(updateItem(addedItemIds[addedItemIds.length-1]));
			console.log('editingItem:  addedItemIds = ', addedItemIds);
			dispatch(replaceEdittingIds(OxiAppConstants.EntityTypes.ITEM, addedItemIds));
			//dispatch(addToEdittingIds(OxiAppConstants.EntityTypes.ITEM, addedItemIds));
		},
		//entity:  		is the enttiy object to discard
		//location:  	indicates this method was invoced from a navigation action to location
		confirmDiscardSubmitAction: (location, addedEntities, prevSelectedOutfit, selectedOutfitId, isOverlay, formType) => {
			console.log("confirmDiscardSubmitAction dispatched");
			
			var prevSelectedOutfitId = prevSelectedOutfit ? prevSelectedOutfit.id : null;
			var prevSelectedContentId = prevSelectedOutfit ? prevSelectedOutfit.contents[0] : null;
			
			isOverlay ?
				dispatch(setFormOverlayVisibility(null)) :
				dispatch(setFormVisibility(null));

			//dispatch action to removeAndPropogate added Outfit.  This assumes that there will only ever be 1 outfit entity with id = 1 in addedEntitiesReducer tree 
			//TODO: change this to support adding pre-existing outfits/contents/items/pictures containing UUID's
			//dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, entity))
			dispatch(clearAllAddedEntitiesState(addedEntities));
			dispatch(clearSelectMultipleEntity(OxiAppConstants.EntityTypes.ITEM));
			//dispatch action to transition into preview mode
			dispatch(selectAndPropagate(OxiAppConstants.EntityTypes.OUTFIT, prevSelectedOutfitId, prevSelectedContentId));
			dispatch(editContentView(OxiAppConstants.viewState.PREVIEW));

			//check if the form was created due to a navigation action.  If so, follow up with navigation.
			if(location !== null){
				dispatch(navigateTo(location));
			}

			if(formType === OxiAppConstants.FormType.ADD_ITEM){
				dispatch(setFormVisibility(OxiAppConstants.FormType.OUTFIT_PREVIEW));
			}

			// Edge case for when there's only one newly added outfit (having id of type number).  
			// Encountered when an outfit is created then it is subsequently discarded befor posting to server.
			if(typeof selectedOutfitId === 'number'){
				// close modal
				dispatch(setFormVisibility(null));
			}

			//Enable the button that adds outfits
			dispatch(disableAddOutfit(false));
			dispatch(disableAddContentButton(false));
			//dispatch action to select previously selected Outfit id (before adding discarded outfit)
		},
		confirmDeleteOutfits: (outfitIds) => {
			dispatch(deleteOutfits(outfitIds, (response) => null));
			dispatch(clearSelectMultipleEntity(OxiAppConstants.EntityTypes.OUTFIT));
			dispatch(setFormVisibility(null));
			// exit the Profile view from the edit context	
			dispatch(setWebAppViewContext(null));
		},
		modifyContentItems: (contentId, itemAllIds) => {
			dispatch(modifyContent({
				'id': contentId, 
				'items':itemAllIds
			}));
		},
		afterLoginSuccess:  (requestUrl, requestType) => {
			if(requestUrl !== null && requestUrl !== undefined && requestUrl !== ''){
				OxiAppConstants.requestToBatchedDispatchMap[requestUrl.replace(OxiAppConstants.serviceURL+'/', "").split('?')[0]][requestType](dispatch);
			}else{
				
			}
		},
		clearUpdates: () => {
			dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.OUTFIT));
			dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.CONTENT));
			dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.ITEM));
			dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.PROFILE));
			/*dispatch(updateOutfit(null));
			dispatch(updateContent(null));
			dispatch(updateItem(null));
			dispatch(updateProfile(null));*/
		},
		clearInvalidations: (entitiesStateReducer) => {
			console.log('clearInvalidations: before switch');
			switch(true){
				case entitiesStateReducer.profile.clientInvalidated.length > 0:
					dispatch(clearClientInvalidation(OxiAppConstants.EntityTypes.PROFILE));
				case entitiesStateReducer.outfits.clientInvalidated.length > 0:
					dispatch(clearClientInvalidation(OxiAppConstants.EntityTypes.OUTFIT));
				case entitiesStateReducer.contents.clientInvalidated.length > 0:
					dispatch(clearClientInvalidation(OxiAppConstants.EntityTypes.CONTENT));
				case entitiesStateReducer.items.clientInvalidated.length > 0:
					dispatch(clearClientInvalidation(OxiAppConstants.EntityTypes.ITEM));
				case entitiesStateReducer.pictures.clientInvalidated.length > 0:
					dispatch(clearClientInvalidation(OxiAppConstants.EntityTypes.PICTURE));
				default:
					break;
			}
		},
		getSuggestion:(uri)=>{
			return new Promise((resolve, reject) => {
				resolve(dispatch(fetchSuggestion(uri)));
			});
		},
		getApparelTypes:(uri)=>{
			return new Promise((resolve, reject) => {
				resolve(dispatch(fetchSuggestion(uri)));
			})
		},
		getSizeChartByItemId:(itemId) => {
			dispatch(getSizeChartByItemId(itemId));
		},
		createSizeGroup:(sizeGroup)=>{
			dispatch(createSizeGroups(sizeGroup));
		},
		getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
		addProfilePic : (imageData, crop) => {
			
			const onAddProfilePic = async (pictureId) => {
				const {
					owner,
				} = ownProps;

				var profileWithCrop = {
					...owner,
					'pictureDto': {
						...owner.pictureDto,
						crop,
						id: pictureId,
					}
				};

				//TODO:  method name misleading.  should be putProfile
				await dispatch(postProfile(profileWithCrop));
				//dispatch(setFormVisibility(null));
			}

			if(imageData !== null) postImage(imageData, () => onAddProfilePic, null, true);
		},
		navToOutfitPreviewModal: (posx, posy) => {
			dispatch(setFormVisibility("OutfitPreview", null, null, null));
		},
		deselectAndPropogate: (entityType) => dispatch(deselectAndPropogate(entityType)),

})

const ModalContentSelection = connect(mapStateToProps, mapDispatchToProps)(Modal);
export default withRouter(ModalContentSelection);