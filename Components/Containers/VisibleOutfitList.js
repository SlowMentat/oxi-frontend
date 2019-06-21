import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	editContentView, 
	clearEdittingIds,
	addToEdittingIds,
	replaceEdittingIds,
	createContent, 
	fetchImage, 
	selectEntity, 
	selectAndPropogate,
	selectAddedEntity, 
	addOutfit,
	addContent,
	fetchMetrics,
	disableAddOutfit,
	selectContent,
	addItem,
	clientInvalidateEntities,
	addItemContent,
	patchEntity,
	updateOutfitCoverpicuri,
	removeAllEntities,
	navigateTo,
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import OutfitList from '../../Components/Presentations/OutfitList.js';
import {maskEdits} from '../../Util/CommonSelectors.js';



const mapStateToProps = (state, props) => {
	console.log('state before call to maskEdits: ', state);
	let filteredOutfits = maskEdits(state.entitiesReducer.outfits, state.entitiesReducer.outfits.allEditingIds);
	console.log('state after call to maskEdits: ', state);
	console.log('filteredOutfits = ',filteredOutfits);
	console.log('props = ', props);
	return ({
		outfits : filteredOutfits.byIds,
		outfitIds : filteredOutfits.allIds,
		addedOutfits : state.addedEntitiesReducer.outfits.byIds,
		addedOutfitIds : state.addedEntitiesReducer.outfits.allIds,
		//addedContentIds	: state.addedEntitiesReducer.contents.allIds,
		controlDisabled: state.entitiesReducer.outfits.controlDisabled,
		selectedId: state.entitiesStateReducer.outfits.selected,
		//selectedAddedId: state.entitiesStateReducer.outfits.selected,
		//view: props.view,
		viewState: state.contentViewState.viewState,
		webAppView: state.appView.webAppView,
		contents : state.entitiesReducer.contents.byIds,
		selectedContentId : state.entitiesStateReducer.contents.selected,
		items : state.entitiesReducer.items.byIds,

		currentPage: state.entitiesStateReducer.outfits.currentPage,
		lastPage: state.entitiesStateReducer.outfits.lastPage,
		isFetching: state.entitiesStateReducer.outfits.isFetching,

		prevPageURL: state.entitiesStateReducer.outfits.prevPageURL,
		nextPageURL: state.entitiesStateReducer.outfits.nextPageURL,
		scrollPageHeight: state.entitiesStateReducer.outfits.scrollPageHeight,
		pages: state.entitiesReducer.outfits.pages,
		pictures: state.entitiesReducer.pictures.byIds,
	});
}

const mapDispatchToProps = (dispatch, state) => ({
	onClickContextProfile : (outfitId, targetChildId) => {
		console.log("view Outfit div clicked")
		dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitId, targetChildId));
	},
	onClickContextBrowse : (outfitId, targetChildId) => {
		console.log("outfit tile selected");
		dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitId, null));
	},
	getHostMeasurements : (outfitId) => {
		//fetch for the outfit's user's profile metrics (findProfileByOutfitId)
		console.log('clicked', outfitId);
		dispatch(fetchMetrics(outfitId));
				
	},
	focusOnAddedOutift : (addedOutfitId) => dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.OUTFIT, addedOutfitId)),
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
	editOutfit : (outfit, selectedOutfitId, contents, selectedContentId, items) => {
		console.log('editOutfit:  outfit = ', outfit);
		dispatch(disableAddOutfit(true));
		if(selectedOutfitId !== outfit.id){
			//set the selected content to the first in the array.  Outfit should always have at least one content child entity.
			dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfit.id, outfit.contents[0]))
		}
		//inserts this outfit id into the allEdittingIds array, specifying what entities have been modified.
		//dispatch(updateOutfit(outfit.id));
		dispatch(addToEdittingIds(OxiAppConstants.EntityTypes.OUTFIT, outfit.id));
		//copy outfit entity to the addedEntitiesReducer tree
		//TODO: change this and other ADD_* actions to just take an entity object as its parameter
		dispatch(addOutfit(Object.assign({}, OxiAppConstants.EntityTemplates.OUTFIT, outfit)));
		//dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.OUTFIT, outfit.id));
		//copy content entities that are children of outfit to the addedEntitiesReducer tree
		for(let contentId of outfit['contents']){
			dispatch(addToEdittingIds(OxiAppConstants.EntityTypes.CONTENT, contentId));
			//dispatch(updateContent(contentId));
			//dispatch(addContent(contentId, outfit.id, contents[contentId].items));
			let content = Object.assign({}, OxiAppConstants.EntityTemplates.CONTENT, contents[contentId]);	
			console.log('megered content = ', content);
			dispatch(addContent(content));		
			for(let itemId of contents[contentId].items){
				//dispatch(updateItem(itemId));
				dispatch(addToEdittingIds(OxiAppConstants.EntityTypes.ITEM, itemId));
				dispatch(addItem(Object.assign({}, OxiAppConstants.EntityTemplates.ITEM, items[itemId])));
				dispatch(addItemContent({id: null, itemId: itemId, contentId: contentId}));
			}
			console.log('megered content after adding items = ', content);
		}
		//select the first child content.  There should always exist at least 1 content child per outfit
		//dispatch(selectContent(outfit.contents[0]));
		dispatch(editContentView(OxiAppConstants.viewState.EDIT));
	},	
	setScrollPageHeight: (scrollPageHeight) => dispatch(setEntityScrollPageHeight(OxiAppConstants.EntityTypes.OUTFIT, scrollPageHeight)),
	setCurrentEntityPage: (page) => dispatch(setCurrentEntityPage(OxiAppConstants.EntityTypes.OUTFIT, page)),
	setNextPageURL: (URL) => dispatch(setNextPageURL(OxiAppConstants.EntityTypes.OUTFIT, URL)),
	setPrevPageURL: (URL) => dispatch(setPrevPageURL(OxiAppConstants.EntityTypes.OUTFIT, URL)),
	changeOutfitCoverPic: (modifiedProperties) => {
		return new Promise((resolve, reject) => {
			resolve(dispatch(patchEntity(OxiAppConstants.EntityTypes.OUTFIT, modifiedProperties)));
		})
		.then(response => {
			dispatch(updateOutfitCoverpicuri(modifiedProperties));
		});
	},	
	navToHostProfile : (hostUsername) => {	
		//Deselect everything
		/*dispatch(selectEntity(OxiAppConstants.EntityTypes.ITEM, false));
		dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, false));
		dispatch(selectEntity(OxiAppConstants.EntityTypes.OUTFIT, false));
		//remove all entitiy data from entitiesReducer branch
		dispatch(removeAllEntities(OxiAppConstants.EntityTypes.ITEM_CONTENT));
		dispatch(removeAllEntities(OxiAppConstants.EntityTypes.CONTENT));
		dispatch(removeAllEntities(OxiAppConstants.EntityTypes.ITEM));
		dispatch(removeAllEntities(OxiAppConstants.EntityTypes.OUTFIT));*/
	
		dispatch(navigateTo(OxiAppConstants.navRequestMap.b.toLowerCase()));
	},
	compareHostMeasurements: (outfitId) => {

	}
})

const VisibleOutfitList = connect(mapStateToProps, mapDispatchToProps)(OutfitList);
export default VisibleOutfitList;