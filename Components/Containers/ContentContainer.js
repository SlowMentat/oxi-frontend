import { connect } from 'react-redux';
import { 
	setFormVisibility,
	postImage,
	putImage,
	fetchImage,
	fetchEntities,
	fetchItemMenus,
	verifyIntent,
	createOutfit,
	createContent,
	createItem,
	editContentView,
	selectAndPropogate,
//	removeAddedEntityAndPropogate,
	clearAllAddedEntitiesState,
	createPictures,
	clientInvalidateEntities,
	replaceOutfits,
	replaceContents,
	replaceItems,
	replacePictures,
	disableAddOutfit,
	createItemContent,
	modifyImageData,
	postContent,
	postOutfit,
	postItems,
	putItems,
	clearEdittingIds,
	mergeResponseEntities,
	modifyContent,
	clearClientInvalidation
	
} from '../../Components/Actions/indexActions.js';
import {outfit, profileSchema, contents, items, denormalizeOutfit, buildItemContentsObject} from '../../Util/Schema.js';
import {normalize, denormalize} from 'normalizr';
import ContentView from '../../Components/Presentations/ContentView.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

const mapStateToProps = (state, props) => {
	return {
		viewState: state.contentViewState.viewState,
		//contentViewed: state.shownContentView.shownContentId,
		contents: state.entitiesReducer.contents.byIds,
		addedContents : state.addedEntitiesReducer.contents.byIds,
		//contentSelected : state.viewState.shownContentId
		contentSelected : state.entitiesStateReducer.contents.selected,
		outfitSelected : state.entitiesStateReducer.outfits.selected,
		//isVisible: state.shownContentView.shownContentView
		addedEntities : state.addedEntitiesReducer,
		entitiesStateReducer : state.entitiesStateReducer,
		brands : state.entitiesReducer.brands,
		retailers : state.entitiesReducer.retailers,
		pictures: state.entitiesReducer.pictures.byIds,

		clientInvalidatedOutfits: state.entitiesStateReducer.outfits.clientInvalidated,
		clientInvalidatedContents: state.entitiesStateReducer.contents.clientInvalidated,
		clientInvalidatedItems: state.entitiesStateReducer.items.clientInvalidated,
	};
}

const mapDispatchToProps = (dispatch) => ({
	getItemForm: (posx, posy) => {
		/*dispatch(fetchEntities(OxiAppConstants.EntityTypes.BRAND, '', ''))
		dispatch(fetchEntities(OxiAppConstants.EntityTypes.RETAILER, '', ''))*/
		//dispatch(fetchItemMenus())
		dispatch(setFormVisibility("AddItem", null, null, {newItemLocation: {positionx: posx, positiony: posy}}));
	},
	getGestureForm: () => dispatch(setFormVisibility("AddGesture")),
	/*postAddedOutfit : (imageData = null, json) => {
		if(imageData != null) dispatch(postImage(imageData, json));
	},*/
	getPreviewPic : (filename, callback, picture) => dispatch(fetchImage(filename, callback, picture)),
	confirmDiscard : () => dispatch(verifyIntent(OxiAppConstants.Intent.DISCARD_EDITS)),
	clientInvalidateEntity: (entitiesStateReducer, entityIds/*addedEntities*/, entityType=null) => {
		return () => {
			console.log('in clientInvalidateEntities method:  entityType = ', entityType);
			switch(entityType){
				//Invalidate selected outfit in addedEntitiesReducer including ALL child entities in addedEntitiesReducer
				case null:
					//check if selected outfit id does not exists in invalidated array
					if(!entitiesStateReducer.outfits.clientInvalidated.includes(entitiesStateReducer.outfits.selected)){
						dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.OUTFIT, entitiesStateReducer.outfits.selected));
					}
					if(!entitiesStateReducer.contents.clientInvalidated.includes(entitiesStateReducer.contents.selected)){
						//invalidate selected content
						dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.CONTENT, entitiesStateReducer.contents.selected));
						//Ivalidate selected content.picture 
						dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.PICTURE, addedEntities.contents.byIds[entitiesStateReducer.contents.selected].picture))
						//invalidate all child items associated with selected content
						let itemIdsToInvalidate = [];
						console.log('added content items = ',addedEntities.contents.byIds[entitiesStateReducer.contents.selected].items)
						for(let itemId of addedEntities.contents.byIds[entitiesStateReducer.contents.selected].items){
							console.log('itemId = ', itemId);
							if(!entitiesStateReducer.items.clientInvalidated.includes(itemId)){
								itemIdsToInvalidate = [...itemIdsToInvalidate, itemId];
							}
						}
						dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.ITEM, itemIdsToInvalidate))
					}					
					break;
				//Invalidate just the selected outfit in addedEntitiesReducer
				case OxiAppConstants.EntityTypes.OUTFIT:
					dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.OUTFIT, entityIds));
					break;
				//Invalidate selected content in addedEntitiesReducer including all child entities in addedEntitiesReducer
				case OxiAppConstants.EntityTypes.CONTENT:
					dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.CONTENT, entityIds));
					break;
				//Invalidate content.picture from selected content in addedEntitiesReducer
				case OxiAppConstants.EntityTypes.PICTURE:
					break;
				//Invalidate selected content.items in addedEntitiesReducer
				case OxiAppConstants.EntityTypes.ITEM:
					dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.ITEM, entityIds));
					break;
				////Invalidate selected profile in addedEntitiesReducer
				case OxiAppConstants.EntityTypes.PROFILE:
					dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.PROFILE, entityIds));
					break;
				default:
					break;
			}
		}
	},
	postAddedOutfit : (imageData = null, outfitJson, addedEntities, entitiesStateReducer) => {
		if(imageData !== null) postImage(imageData, () => postOutfit(outfitJson, createResponseHandler(dispatch, addedEntities, entitiesStateReducer)));						
	},
	putModifiedOutfit : (outfitJson) => {
		/*outfitJsonPayload = Object.assign({}, outfitJson, {contents: undefined, items: undefined});
		putOutfit(outfitJson.id, outfitJsonPayload, createResponseHandler(dispatch, addedEntities)));*/			
	},
	postAddedContent : (imageData = null, contentJson, outfitId, addedEntities, entitiesStateReducer) => {
		if(imageData !== null) postImage(imageData, () => postContent(contentJson, outfitId, createResponseHandler(dispatch, addedEntities, entitiesStateReducer)));
	},
	putModifiedContent : (imageData = null, contentJson, addedEntities, entitiesStateReducer) => {
		if(imageData !== null) putImage(imageData, contentJson.id, () => putContent(contentJson, createResponseHandler(dispatch, addedEntities, entitiesStateReducer)));	
	},
	putModifiedItems: (itemPayload, addedEntities, entitiesStateReducer) => {
		putItems(itemPayload, entitiesStateReducer.outfits.selected, createResponseHandler(dispatch, addedEntities, entitiesStateReducer))();
	},
	postAddedItems: (itemPayload, addedEntities, entitiesStateReducer) => {
		postItems(itemPayload, entitiesStateReducer.outfits.selected, createResponseHandler(dispatch, addedEntities, entitiesStateReducer))();
	}
})

function createResponseHandler(dispatch, addedEntities, entitiesStateReducer){
	return (response, pictureJson) => {
		//normalize response data and create a new outfit node in entitiesReducer tree
		let normalizedJson = normalize(response.data, outfit);
		//Remove all entities from addedEntitiesReducer
		dispatch(clearAllAddedEntitiesState(addedEntities));
		dispatch(editContentView(OxiAppConstants.viewState.PREVIEW));
		//dispatch(modifyContent(Object.assign({}, addedEntities.contents.byIds[entitiesStateReducer.contents.selected], {picture: {...pictureJson, contentId: undefined}})));
		mergeResponseEntities(dispatch, normalizedJson);
		//response data is just a single outfit object
		let outfitJson = response.data;
		
		//Manually build itemContents join table
		let itemContentJson = buildItemContentsObject([outfitJson]);
		dispatch(createItemContent(itemContentJson));

		//dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, denormAddedOutfit));

		//get the find the new content id
		let addedContentIds = [];
		for(let returnedContent of outfitJson.contents){
			for(let existingContentId of addedEntities.contents.allIds){
				if(returnedContent.id === existingContentId) break;
			}
			addedContentIds = [...addedContentIds, returnedContent.id];
		}

		dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitJson.id, (addedContentIds.length > 0 ? addedContentIds[0] :  null)));

		//Remove all ids from edditingIds array associated to each entity
		dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.OUTFIT));
		dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.CONTENT));
		dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.ITEM));
		dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.PROFILE));

		console.log('ContentContainer#createResponseHandler: clearing all clieentInvalidations');
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
		//Enable the button that adds outfits
		dispatch(disableAddOutfit(false));
	}
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(ContentView);
export default ContentContainer;