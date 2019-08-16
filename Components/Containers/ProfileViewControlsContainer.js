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
import ProfileViewControls from '../../Components/Presentations/ProfileViewControls.js';
import {maskEdits} from '../../Util/CommonSelectors.js';



const mapStateToProps = (state, props) => {
	console.log('state before call to maskEdits: ', state);
	let filteredOutfits = maskEdits(state.entitiesReducer.outfits, state.entitiesReducer.outfits.allEditingIds);
	console.log('state after call to maskEdits: ', state);
	console.log('filteredOutfits = ',filteredOutfits);
	console.log('props = ', props);
	return ({
		// Outfits
		outfits : filteredOutfits.byIds,
		outfitIds : filteredOutfits.allIds,
		addedOutfits : state.addedEntitiesReducer.outfits.byIds,
		addedOutfitIds : state.addedEntitiesReducer.outfits.allIds,
		selectedOutfitId: state.entitiesStateReducer.outfits.selected,

		// Contents
		contents : state.entitiesReducer.contents.byIds,
		selectedContentId : state.entitiesStateReducer.contents.selected,

		//Items
		items : state.entitiesReducer.items.byIds,

		// Pictures
		pictures: state.entitiesReducer.pictures.byIds,

		// State
		entitiesStateReducer: state.entitiesStateReducer,
		controlDisabled: state.entitiesReducer.outfits.controlDisabled,
		viewState: state.contentViewState.viewState,
		webAppView: state.appView.webAppView,
	});
}

const mapDispatchToProps = (dispatch, state) => ({
	editOutfit : (outfit, entitiesStateReducer, contents, selectedContentId, items) => {
		console.log('editOutfit:  outfit = ', outfit);
		dispatch(disableAddOutfit(true));

		//if(entitiesStateReducer.outfits.selected !== outfit.id || entitiesStateReducer.outfits.prevSelected === false){
			//set the selected content to the first in the array.  Outfit should always have at least one content child entity.
			dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfit.id, outfit.contents[0], null));
		//}

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
	changeOutfitCoverPic: (modifiedProperties) => {
		return new Promise((resolve, reject) => {
			resolve(dispatch(patchEntity(OxiAppConstants.EntityTypes.OUTFIT, modifiedProperties)));
		})
		.then(response => {
			dispatch(updateOutfitCoverpicuri(modifiedProperties));
		});
	},	
	goBack: () => {
		dispatch(navigateTo(OxiAppConstants.navRequestMap.b.toLowerCase()));
	},
})

const ProfileViewControlsContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileViewControls);
export default ProfileViewControlsContainer;