import { connect } from 'react-redux';
import { 
	postImage,
	postImages,
	uploadImages,
	uploadContents,
	putImage,
	fetchImage,
	fetchEntities,
	fetchItemMenus,
	verifyIntent,
	createOutfit,
	createContent,
	createItem,
	editContentView,
	selectAndPropagate,
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
	putContent,
	postItems,
	putItems,
	clearEdittingIds,
	mergeResponseEntities,
	modifyContent,
	clearClientInvalidation,
	batchRequestEntities,
	clearSelectMultipleEntity,
	putRemoveItems,
	modifyOutfit,
	patchEntity,
	updateOutfitCoverpicuri,
	modifyEntityProperties,
	addContents,
	previewContent,
	selectEntity,
	createModal,
	modifyModalMetaData,
	removeModalById
} from '../../Components/Actions/indexActions.js';
import * as entityActions from '../../Components/Actions/EntityActions/Index.js'; 
import {
	outfit, 
	outfitsSchema,
	content,
	profileSchema, 
	contents, 
	items, 
	denormalizeOutfit, 
	buildItemContentsObject,
	createModalEntity,
} from '../../Util/Schema.js';
import {normalize, denormalize} from 'normalizr';
import PicturePreview from '../../Components/Presentations/PicturePreview.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

const mapStateToProps = (state, props) => {
	console.log('state.addedEntities in PicturePreviewContainer = ', state.addedEntitiesReducer);
	return {
		viewState: state.contentViewState.viewState,
		//contentViewed: state.shownContentView.shownContentId,
		contents: state.entitiesReducer.contents.byIds,
		//addedContents : state.addedEntitiesReducer.contents.byIds,
		addedContentIds: state.addedEntitiesReducer.contents.allIds,
		itemContent: state.entitiesReducer.itemContent,
		//contentSelected : state.viewState.shownContentId
		contentSelected : state.entitiesStateReducer.contents.selected,
		outfitIdSelected : state.entitiesStateReducer.outfits.selected,
		outfitEditting:  state.addedEntitiesReducer.outfits.byIds[state.entitiesStateReducer.outfits.selected],
		//isVisible: state.shownContentView.shownContentView
		addedEntities : state.addedEntitiesReducer,
		entitiesStateReducer : state.entitiesStateReducer,
		brands : state.entitiesReducer.brands,
		retailers : state.entitiesReducer.retailers,
		pictures: state.entitiesReducer.pictures.byIds,

		clientInvalidatedOutfits: state.entitiesStateReducer.outfits.clientInvalidated,
		clientInvalidatedContents: state.entitiesStateReducer.contents.clientInvalidated,
		clientInvalidatedItems: state.entitiesStateReducer.items.clientInvalidated,

		//*** TODO:  eventually consolidate all the props above with the props below ***

		//current entities
		pictures: 		state.entitiesReducer.pictures,
		contents: 		state.entitiesReducer.contents,
		outfits: 		state.entitiesReducer.outfits,

		//added entities
		addedContents: 	state.addedEntitiesReducer.contents,
		addedOutfits: 	state.addedEntitiesReducer.outfits,

		//application state
		contentState: 	state.entitiesStateReducer.contents,
		outfitState: 	state.entitiesStateReducer.outfits,
		itemState: 		state.entitiesStateReducer.items,
		pictureState: 	state.entitiesStateReducer.pictures,

		//isModalVisible: state.toggleModal.isModalVisible,
		outfitPreviewModal: state.modalsReducer.byIds[OxiAppConstants.FormType.OUTFIT_PREVIEW],
		isImageSourceModalOpen: state.modalsReducer.byIds[OxiAppConstants.FormType.IMAGE_SOURCE],
		//modals: state.modalsReducer.byIds,
	};
}
//TODO:  consolidate all the http request functions below :(
const mapDispatchToProps = (dispatch) => ({
	//fileReferences => { 'full filenmae' : FileObject }
	selectContentView : (contentId) => {
		dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, contentId));
		dispatch(previewContent(contentId)); 
	},
	showBlockingLoad : (msg) => {
		dispatch(createModal({
			id: OxiAppConstants.FormType.BLOCKING_PROGRESS, 
			otherData:{
				msg,
			},
		}));
	},
	hideBlockingLoad : () => {
		dispatch(removeModalById(OxiAppConstants.FormType.BLOCKING_PROGRESS));
	},
	addContentFromImages: (fileReferences, viewState, addedContents) => {
		var contentEntities = [];
		var contentEntityAdded = false;

		Object.keys(fileReferences).map((id, ind, ids) => {
			const results = {
				// Temporarily store the filename in coverpicuri so that newly opened images can be displayed while editing before submitting to the server
				coverpicuri: fileReferences[id].name,
				picture: id,
			}

			if(viewState === OxiAppConstants.viewState.ADD && addedContents.byIds[addedContents.allIds[0]].picture.length === 0 && ind === 0){
				dispatch(modifyContent( {
					...addedContents.byIds[addedContents.allIds[0]], 
					...results,
				}));
				//dispath(clientInvalidateEntity(OxiAppConstants.EntityTypes.CONTENT, addedContents.allIds[0]))
			}
			else{
				contentEntities = [
					...contentEntities, 
					{
						...OxiAppConstants.EntityTemplates.CONTENT, 
						...results,
					}
				];

				contentEntityAdded = true;
			}
		})

		// Add all content entities to the addedEntitiesReducer
		contentEntityAdded ? dispatch(addContents(contentEntities)) : null;
	},
	getItemForm: (posx, posy) => {
		/*dispatch(fetchEntities(OxiAppConstants.EntityTypes.BRAND, '', ''))
		dispatch(fetchEntities(OxiAppConstants.EntityTypes.RETAILER, '', ''))*/
		//dispatch(fetchItemMenus())
		//dispatch(setFormVisibility("AddItem", null, null, {newItemLocation: {positionx: posx, positiony: posy}}));
		dispatch(modifyModalMetaData(
			OxiAppConstants.FormType.OUTFIT_PREVIEW,
			{
				newItemLocation:{
					positionx: posx,
					positiony: posy,
				}
			}
		));
		//dispatch(createModal({
		//	id: OxiAppConstants.FormType.ADD_ITEM,
		//	otherData: {
		//		newItemLocation:{
		//			positionx: posx,
		//			positiony: posy,
		//		}
		//	},
		//}));

	},
	//getGestureForm: () => dispatch(setFormVisibility("AddGesture")),
	getPreviewPic : (filename, callback, picture, cancel) => dispatch(fetchImage(filename, callback, picture, cancel)),
	confirmDiscard : () => dispatch(verifyIntent(OxiAppConstants.FormType.DISCARD_EDITS)),
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
					dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.PICTURE, entityIds));
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
	postAddedOutfit : (imageFiles = null, outfitJson, addedEntities, entitiesStateReducer, itemContentCount, crops, initializeImages) => {
		if(imageFiles !== null){
			//postImage(imageData, () => postOutfit(outfitJson, createResponseHandler(dispatch, addedEntities, entitiesStateReducer, outfit, false, itemContentCount)));			
			uploadImages(
				imageFiles, 
				() => postOutfit(outfitJson, createResponseHandler(dispatch, addedEntities, entitiesStateReducer, outfit, false, itemContentCount, initializeImages)), 
				crops,
				dispatch);			
		}
	},
	putModifiedOutfit : (outfitJson) => {
		/*outfitJsonPayload = Object.assign({}, outfitJson, {contents: undefined, items: undefined});
		putOutfit(outfitJson.id, outfitJsonPayload, createResponseHandler(dispatch, addedEntities)));*/			
	},


	// modified or added contents
	uploadContents : (imageFiles = null, contentJson, outfitId, addedEntities, entitiesStateReducer, itemContentCount, crops, initializeImages) =>{
		if(imageFiles !== null){
			uploadImages(
				imageFiles, 
				() => uploadContents(contentJson, outfitId, createResponseHandler(dispatch, addedEntities, entitiesStateReducer, contents, false, itemContentCount, initializeImages)),
				crops,
				dispatch);
		}
	},

	postAddedContent : (imageFiles = null, contentJson, outfitId, addedEntities, entitiesStateReducer, itemContentCount, initializeImages) => {
		if(imageData !== null) postImage(imageData, () => postContent(contentJson, outfitId, createResponseHandler(dispatch, addedEntities, entitiesStateReducer, contents, false, itemContentCount, initializeImages)));
	},

	putModifiedContent : (imageData = null, contentJson, outfitId, addedEntities, entitiesStateReducer, itemContentCount, initializeImages) => {
		if(imageData !== null){
			console.log('image data is not null');
			putImage(imageData, contentJson.id, () => putContent(contentJson, outfitId, createResponseHandler(dispatch, addedEntities, entitiesStateReducer, contents, null, itemContentCount, initializeImages)));	
		}else{
			console.log('image data is null');
			putContent(contentJson, outfitId, createResponseHandler(dispatch, addedEntities, entitiesStateReducer, contents, null, itemContentCount))(imageData);
		}
	},


	putPostItems: (itemPayload, addedEntities, entitiesStateReducer) => {

	},
	/*putModifiedItems: (itemPayload, addedEntities, entitiesStateReducer) => {
		putItems(itemPayload, entitiesStateReducer.outfits.selected, createResponseHandler(dispatch, addedEntities, entitiesStateReducer))();
	},
	postAddedItems: (itemPayload, addedEntities, entitiesStateReducer) => {
		postItems(itemPayload, entitiesStateReducer.outfits.selected, createResponseHandler(dispatch, addedEntities, entitiesStateReducer))();
	},*/
	batchRequestEntities: (batchedRequests) => {
		//batchRequestEntities(OxiAppConstants.EntityTypes.ITEM, 
	},
	createResponseHandler: (addedEntities, entitiesStateReducer, schema, overwriteItemContents=null, itemContentCount, exitEditMode=false) => {
		return (response) => {
			createResponseHandler(dispatch, addedEntities, entitiesStateReducer, schema, overwriteItemContents, itemContentCount)([response]);
			exitEditMode ? exitEditMode() : null; 
		}
	},
	exitEditMode: (entitiesStateReducer) => {
		//Remove all ids from edditingIds array associated to each entity
		dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.OUTFIT));
		dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.CONTENT));
		dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.ITEM));
		dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.PROFILE));
	
		console.log('PicturePreviewContainer#createResponseHandler: clearing all clientInvalidations');
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
		//clear all selected items		
		dispatch(clearSelectMultipleEntity(OxiAppConstants.EntityTypes.ITEM));
		//Enable the button that adds outfits
		dispatch(disableAddOutfit(false));
	}
})

function createResponseHandler(dispatch, addedEntities, entitiesStateReducer, schema, overwriteItemContents=null, itemContentCount, initializeImages){
	return (responses, picturesById) => {
		picturesById ? dispatch(entityActions.replacePictures(picturesById)) : null;

		for(var response of responses){
			let responseData = response.data.length === 0 ? [response.data] : response.data
			//normalize response data and create a new outfit node in entitiesReducer tree
			let normalizedJson = normalize(responseData, schema);
			console.log('PicturePreviewContainer#createResponseHandler: clearing all clientInvalidations ', normalizedJson);
	
			const selectAddedContentId = (dispatch, schemaType) => {
				let createdContentIds = [];
				let entityType = "";
				switch(schemaType){
					//response data is of type outfit
					case OxiAppConstants.JsonPropertyNames.OUTFIT:	
						//find the new content id
						for(let content of responseData[0].contents){
							for(let existingContentId of addedEntities.contents.allIds){
								if(content.id === existingContentId) break;
							}
							createdContentIds = [...createdContentIds, content.id];
						}
						entityType = OxiAppConstants.EntityTypes.OUTFIT;
						break;
					//response data is of type content
					case OxiAppConstants.JsonPropertyNames.CONTENT:						
						//find the new content id
						let prevOutfitId = null;
						let outfitModifications = {};
						let existingContentIds = addedEntities.contents.allIds.filter(id => typeof id === 'string');
						for(let content of responseData){
							for(let existingContentId of existingContentIds){
								if(content.id === existingContentId) break;
								//Add the new content id to its parent outfit's contents property
								/*if(content.outfitId !== prevOutfitId){
									dispatch(replaceOutfits( [Object.assign( {}, addedEntities.outfits.byIds[content.outfitId], {
										contents: [...addedEntities.outfits.byIds[content.outfitId].contents, content.id]
									} )] ));
									prevOutfitId = content.outfitId;
								}*/
							}
	
							createdContentIds = [...createdContentIds, content.id];
							//build action payload to modify entitiesReducer.outfits contents property to include new content id
							outfitModifications = Object.assign({}, outfitModifications, {
								[content.outfitId]:{
									contents:[...existingContentIds, ...createdContentIds]
								}
							});
						}
	
						dispatch(modifyEntityProperties(OxiAppConstants.EntityTypes.OUTFIT, outfitModifications));
						entityType = OxiAppConstants.EntityTypes.CONTENT;
						break;
					default:
						return false;
				}
				dispatch(selectAndPropagate(
					OxiAppConstants.EntityTypes.OUTFIT, 
					(/*response.data.id || */entitiesStateReducer.outfits.selected),
					(createdContentIds.length > 0 ? createdContentIds[0] :  null)));
				return createdContentIds;
			}
	
			//Remove all entities from addedEntitiesReducer
			dispatch(clearAllAddedEntitiesState(addedEntities));
			let itemContentJson = {};

			switch(overwriteItemContents){
				case null:
					break;
				case true:  //Overwrites all of entitiesReducer#itemContent
					itemContentJson = buildItemContentsObject(schema.schema._key, responseData, 0);
					break;
				case false:  //appends to entitiesReducer#itemContent
					//itemContentJson = buildItemContentsObject(schema.schema._key, responseData, itemContentCount);
					itemContentJson = buildItemContentsObject(schema._key, responseData, itemContentCount);
					break;
				default:
					break;
			}

			if(Object.keys(itemContentJson).length > 0) dispatch(createItemContent(itemContentJson));	
			mergeResponseEntities(dispatch, normalizedJson);
			
			//Remove all ids from edditingIds array associated to each entity
			dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.OUTFIT));
			dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.CONTENT));
			dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.ITEM));
			dispatch(clearEdittingIds(OxiAppConstants.EntityTypes.PROFILE));

			dispatch(editContentView(OxiAppConstants.viewState.PREVIEW));
			selectAddedContentId(dispatch, schema.schema._key);		
	
	
			console.log('PicturePreviewContainer#createResponseHandler: clearing all clientInvalidations');
	
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
			//clear all selected items		
			dispatch(clearSelectMultipleEntity(OxiAppConstants.EntityTypes.ITEM));	
			//Enable the button that adds outfits
			dispatch(disableAddOutfit(false));
		}

		initializeImages ? initializeImages() : null;
	}
}

const PicturePreviewContainer = connect(mapStateToProps, mapDispatchToProps)(PicturePreview);
export default PicturePreviewContainer;