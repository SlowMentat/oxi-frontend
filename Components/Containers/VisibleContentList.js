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
	modifyContent
} from '../../Components/Actions/indexActions.js';
import ContentList from '../../Components/Presentations/ContentList.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

const getVisibleContents = (contents, filter, outfits) => {
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
					if(outfits.selected != undefined){
						if(outfits.selected != false){
							//array of content ids
							result.allIds = outfits.byIds[outfits.selected]["contents"].sort();
							for(let contentId of result.allIds){
								result.byIds[contentId] =  contentsById[contentId];
							}
							//result.allIds = Object.keys(result.byIds);
							console.log("returning filtered result");
							console.log(result);
							return Object.assign({}, contents, result);	
						}else{
							console.log("outfits.selected is false");
						}				
					}else{
						console.log("outfits.selected is undefined");
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
	let filteredContents = getVisibleContents(
		state.entitiesReducer.contents,
		'BY_OUTFIT_ID',
		state.entitiesReducer.outfits
	);
	let filteredAddedContents = getVisibleContents(
		state.addedEntitiesReducer.contents,
		'BY_OUTFIT_ID',
		state.addedEntitiesReducer.outfits
	);
	return ({
		contents : filteredContents.byIds,
		//contents : state.entitiesReducer.contents.byIds,
		contentIds : filteredContents.allIds,//state.entitiesReducer.contents.allIds,
		controlDisabled: state.entitiesReducer.contents.controlDisabled,
		isEdit: state.contentViewState.isEditingContent,
		addedContents : filteredAddedContents.byIds,
		addedContentIds : filteredAddedContents.allIds,
		selectedId :  state.addedEntitiesReducer.contents.selected,
		addedItemIds : state.addedEntitiesReducer.items.allIds
	});
}

const mapDispatchToProps = dispatch => ({
	onClick : (contentId) => {
		dispatch(selectContent(contentId));
		dispatch(previewContent(contentId));
	},
	onClickAddedContent : (contentId) => {
		dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.CONTENT, contentId));
		dispatch(previewContent(contentId));
	},
	onControlClick : () => dispatch(addContent()),
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
	focusOnAddedContent : (addedContentId) => dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.CONTENT, addedContentId)),
	modifyContentItems: (contentId, itemAllIds) => dispatch(modifyContent({
		'id': contentId, 
		'items':itemAllIds
	}))
})

const VisibleContentList = connect(mapStateToProps, mapDispatchToProps)(ContentList);
export default VisibleContentList;