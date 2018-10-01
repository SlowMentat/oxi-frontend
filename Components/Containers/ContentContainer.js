import { connect } from 'react-redux';
import { setFormVisibility, postImage, fetchImage, fetchEntities, fetchItemMenus, verifyIntent, createOutfit, createContent, createItem, editContentView, selectAndPropogate, updateItemContent, removeAddedEntityAndPropogate} from '../../Components/Actions/indexActions.js';
import {outfit, profileSchema, contents, items, denormalizeOutfit} from '../../Util/Schema.js';
import {normalize, denormalize} from 'normalizr';
import ContentView from '../../Components/Presentations/ContentView.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

const mapStateToProps = (state, props) => {
	return {
		editView: state.contentViewState.isEditingContent,
		//contentViewed: state.shownContentView.shownContentId,
		contentsByIds: state.entitiesReducer.contents.byIds,
		//contentSelected : state.contentViewState.shownContentId
		contentSelected : state.entitiesReducer.contents.selected,
		//isVisible: state.shownContentView.shownContentView
		addedEntities : state.addedEntitiesReducer,
		brands : state.entitiesReducer.brands,
		retailers : state.entitiesReducer.retailers,
		visibleItems: props.visibleItems
	};
}

const mapDispatchToProps = (dispatch, props) => ({
		getItemForm: (posx, posy) => {
			/*dispatch(fetchEntities(OxiAppConstants.EntityTypes.BRAND, '', ''))
			dispatch(fetchEntities(OxiAppConstants.EntityTypes.RETAILER, '', ''))*/
			//dispatch(fetchItemMenus())
			dispatch(setFormVisibility("AddItem", null, null, {newItemLocation: {positionx: posx, positiony: posy}}));
		},
		getGestureForm: () => dispatch(setFormVisibility("AddGesture")),
		/*postAdditions : (imageData = null, json) => {
			if(imageData != null) dispatch(postImage(imageData, json));
		},*/
		getPreviewPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
		confirmDiscard : () => dispatch(verifyIntent(OxiAppConstants.Intent.DISCARD_EDITS)),
		postAdditions : (imageData = null, json, addedEntities) => {
			if(imageData != null) postImage(imageData, json, (response) => {
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
							if(itemJson != null && itemJson != undefined) dispatch(updateItemContent(null, itemJson.id, contentJson.id));
						}
					}
				}
				for(let entity of keys){
					if(entity === 'outfits'){
						dispatch(createOutfit(normalizedJson.entities[entity]));
					}else if(entity === 'contents'){
						dispatch(createContent(normalizedJson.entities[entity]));
					}else if(entity === 'items'){
						dispatch(createItem(normalizedJson.entities[entity]));
					}else{
						throw "unrecognized entity"
					}
				}
				//denormalize addedEntitiesReducers tree and remove froms redux state via removeAddedEntityAndPropogate()
				console.log('addedEntities.outfits.byIds = ', addedEntities.outfits.byIds)
				console.log('addedEntities.contents.byIds = ', addedEntities.contents.byIds)
				console.log('addedEntities.itmes.byIds = ', addedEntities.items.byIds)
				let denormAddedOutfit = denormalizeOutfit(addedEntities.outfits.byIds, addedEntities.contents.byIds, addedEntities.items.byIds);
				console.log('denormAddedOutfit = ', denormAddedOutfit)
				//exit edit mode and select the recently created outfit id
				dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, denormAddedOutfit))
				dispatch(editContentView(false));
				dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitJson.id, outfitJson.contents[0].id))
				//Enable the button that adds outfits
				dispatch(disableAddOutfit(false));
			});						
		}
})

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(ContentView);
export default ContentContainer;