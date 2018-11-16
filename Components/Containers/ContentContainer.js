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
	postOutfit
	
} from '../../Components/Actions/indexActions.js';
import {outfit, profileSchema, contents, items, denormalizeOutfit} from '../../Util/Schema.js';
import {normalize, denormalize} from 'normalizr';
import ContentView from '../../Components/Presentations/ContentView.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

const mapStateToProps = (state, ownProps={}) => {
	console.log('props = ', ownProps)
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
		clientInvalidatedItems: state.entitiesStateReducer.items.clientInvalidated
	};
}

const mapDispatchToProps = (dispatch, ownProps) => ({
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
	postAddedOutfit : (imageData = null, outfitJson, addedEntities) => {
		if(imageData !== null) postImage(imageData, () => postOutfit(outfitJson, createResponseHandler(dispatch, addedEntities)));						
	},
	putModifiedOutfit : (outfitJson) => {
		/*outfitJsonPayload = Object.assign({}, outfitJson, {contents: undefined, items: undefined});
		putOutfit(outfitJson.id, outfitJsonPayload, createResponseHandler(dispatch, addedEntities)));*/			
	},
	postAddedContent : (imageData = null, contentJson, outfitId, addedEntities) => {
		if(imageData !== null) postImage(imageData, () => postContent(contentJson, outfitId, createResponseHandler(dispatch, addedEntities)));
	},
	putModifiedContent : (imageData = null, contentJson, addedEntities) => {
		if(imageData !== null) putImage(imageData, contentJson.id, () => putContent(contentJson, createResponseHandler(dispatch, addedEntities)));	
	}
})

function createResponseHandler(dispatch, addedEntities){
	return (response) => {
		//normalize response data and create a new outfit node in entitiesReducer tree
		let normalizedJson = normalize(response.data, outfit);
		console.log('normalizedJson = ', normalizedJson)
		let keys = Object.keys(normalizedJson.entities)
		//response data is just a single outfit object
		let outfitJson = response.data;
		
		//Manually build itemContents join table
		for(let contentJson of outfitJson.contents){
			if(contentJson != null && contentJson != undefined){
				for(let itemJson of contentJson.items){
					if(itemJson != null && itemJson != undefined) dispatch(createItemContent({
						id: null, 
						itemId: itemJson.id, 
						contentId: contentJson.id
					}));
				}
			}
		}
		dispatch(clearAllAddedEntitiesState(addedEntities));
		
		//denormalize addedEntitiesReducers tree and remove froms redux state via removeAddedEntityAndPropogate()
		/*console.log('addedEntities.outfits.byIds = ', addedEntities.outfits.byIds)
		console.log('addedEntities.contents.byIds = ', addedEntities.contents.byIds)
		console.log('addedEntities.itmes.byIds = ', addedEntities.items.byIds)
		let denormAddedOutfit = denormalizeOutfit(addedEntities.outfits.byIds, addedEntities.contents.byIds, addedEntities.items.byIds);
		console.log('denormAddedOutfit = ', denormAddedOutfit)*/
		//exit edit mode and select the recently created outfit id
		
		

		//dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, denormAddedOutfit));
		dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitJson.id, outfitJson.contents[0].id));
		dispatch(editContentView(OxiAppConstants.viewState.PREVIEW));
		//Enable the button that adds outfits
		dispatch(disableAddOutfit(false));
		//reset modified image data state
		dispatch(modifyImageData(false));
	}
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(ContentView);
export default ContentContainer;