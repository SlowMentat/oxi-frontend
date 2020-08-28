import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	addContent, 
	createItem, 
	updateItem, 
	fetchImage, 
	selectContent, 
	previewContent,
	selectAddedEntity,
	modifyContent,
	modifyOutfit,
	selectEntity,
	disableAddContentButton,
	clientInvalidateEntities,
	addItemContent
} from '../../Components/Actions/indexActions.js';
import ContentList from '../../Components/Presentations/ContentList.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {maskEdits} from '../../Util/CommonSelectors.js';

const getVisibleContents = (contents, filter, outfits, /*addedOutfits,*/ selectedOutfitId) => {
	let contentsById = contents.byIds;
	let result = {byIds:{}, allIds:[]};
	//Only perform filter on non-empty contents object
	if(!(Object.keys(contentsById).length === 0 && contentsById.constructor === Object)){
		switch(filter){
			case 'SHOW_ALL':
				return contents;
				break;
			case 'BY_OUTFIT_ID':
				if(outfits != undefined){
					if(selectedOutfitId !== undefined){
						if(selectedOutfitId !== false){
							//array of content ids
							//result.allIds = outfits.allEditingIds.includes(selectedOutfitId) ? addedOutfits.byIds[selectedOutfitId]["contents"].sort() : outfits.byIds[selectedOutfitId]["contents"].sort();
							if(Object.keys(outfits.byIds).length > 0) result.allIds = outfits.byIds[selectedOutfitId]["contents"].sort();
							for(let contentId of result.allIds){
								result.byIds[contentId] =  contentsById[contentId];
							}
							//result.allIds = Object.keys(result.byIds);
							console.log("returning filtered result = ", result);
							return Object.assign({}, contents, result);	
						}else{
							console.log("selectedOutfitId is false");
						}				
					}else{
						console.log("selectedOutfitId is undefined");
					}
				}else{
					console.log("outfits is undefined");
				}
				break;
			default:
				console.log('default case for BY_OUTFIT_ID filter selector')
				return contents;
		}
	}
	console.log("returning empty result:");
	console.log(result);
	return result;
}

const mapStateToProps = state => {
	console.log("state.entitiesReducer.outfits = ", state.entitiesReducer.outfits);
	let filteredContents = maskEdits(getVisibleContents(
		state.entitiesReducer.contents,
		'BY_OUTFIT_ID',
		state.entitiesReducer.outfits,
		/*state.addedEntitiesReducer.outfits,*/
		state.entitiesStateReducer.outfits.selected === 1 ? false : state.entitiesStateReducer.outfits.selected
	), state.entitiesReducer.contents.allEditingIds);
	let filteredAddedContents = state.addedEntitiesReducer.contents/*getVisibleContents(
		state.addedEntitiesReducer.contents,
		'BY_OUTFIT_ID',
		state.addedEntitiesReducer.outfits,
		state.entitiesStateReducer.outfits.selected
	);*/
	return ({
		selectedOutfitId :  state.entitiesStateReducer.outfits.selected,
		selectedOutfit : state.entitiesReducer.outfits.byIds[state.entitiesStateReducer.outfits.selected],
		addedOutfitEntity : state.addedEntitiesReducer.outfits,
		contents : filteredContents.byIds,
		//contents : state.entitiesReducer.contents.byIds,
		contentIds : filteredContents.allIds,//state.entitiesReducer.contents.allIds,
		//controlDisabled: state.entitiesReducer.contents.controlDisabled,
		controlDisabled: state.buttonState.addContent.disabled,
		viewState: state.contentViewState.viewState,
		addedContents : filteredAddedContents.byIds,
		addedContentIds : filteredAddedContents.allIds,
		selectedId :  state.entitiesStateReducer.contents.selected,
		addedItemIds : state.addedEntitiesReducer.items.allIds,
		pictures : state.entitiesReducer.pictures.byIds,
		invalidatedItemIds: state.entitiesStateReducer.items.clientInvalidated,
		invalidatedContentIds:  state.entitiesStateReducer.contents.clientInvalidated,
		itemContents: state.entitiesReducer.itemContent.byIds,
		addedItemContents: state.addedEntitiesReducer.itemContent.byIds,
	});
}

const mapDispatchToProps = dispatch => ({
	selectContentView : (contentId) => {
		dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, contentId));
		dispatch(previewContent(contentId)); 
	},
	onClickAddedContent : (contentId) => {
		//dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.CONTENT, contentId));
		dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, contentId));
		//dispatch(previewContent(contentId));
	},
	onControlClick : () => {
		dispatch(disableAddContentButton(true));
		new Promise((resolve, reject) => {
			resolve( dispatch( addContent( Object.assign({}, OxiAppConstants.EntityTemplates.CONTENT, {}) ) ) );
		})
		.then(response => {
			//ids of created content entities in store have incrementing ids starting at 1.
			//Assuming here that there will only ever be one created content in the addedEntitiesReducer node of the redux store
			dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, 1));
		});
	},
	modifyAddedOutfitContents : (selectedOutfitId, addedContentIds) => {
		if(selectedOutfitId !== false ){
			dispatch(modifyOutfit({
				'id':selectedOutfitId, 'contents': addedContentIds
			}));
		}		
	},
	selectAfterAdd: (addedContentId) => {
		dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, addedContentId))
		dispatch(previewContent(addedContentId));
	},
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
	focusOnAddedContent : (addedContentId) => dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.CONTENT, addedContentId)),
	modifyContentItems: (contentId, itemAllIds) => dispatch(modifyContent({
		'id': contentId, 
		'items':itemAllIds
	})),
	clientInvalidateItems: (invalidatedItemIds, addedItemIds) => {
		let itemIdsToInvalidate = [];
		for(let itemId of addedItemIds){
			if(!invalidatedItemIds.includes(itemId)){
				itemIdsToInvalidate = [...itemIdsToInvalidate, itemId];					
			}
			dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.ITEM, itemIdsToInvalidate));
		}
	},
	addItemContent: (contentId, itemId) => {
		dispatch(addItemContent({id: null, itemId: itemId, contentId: contentId}));
	}
})

const VisibleContentList = connect(mapStateToProps, mapDispatchToProps)(ContentList);
export default VisibleContentList;