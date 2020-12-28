import { connect } from 'react-redux';
import { 
	//setFormVisibility, 
	createModal,
	removeModalById,
	createItem, 
	updateItem, 
	selectMultipleEntity, 
	deselectMultipleEntity,
	clientInvalidateEntities,
	clearSelectMultipleEntity,
	removeAddedEntities,
	clientDeleteEntities,
	modifyContent,
	fetchEntities,
	fetchContentsWithOutfitByItemId,
	removeAllEntities,
	setEntityScrollPageHeight,
	setCurrentEntityPage,
	setNextPageURL,
	setPrevPageURL,
	fetchImage,
	selectEntity
} from '../../Components/Actions/indexActions.js';
import ItemListBrowse from '../../Components/Presentations/ItemListBrowse.js';
import {maskEdits} from '../../Util/CommonSelectors.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';


const mapStateToProps = (state, props) => {
	let brands = state.entitiesReducer.brands.byIds;
	let retailers = state.entitiesReducer.retailers.byIds;

	return ({
		items : state.entitiesReducer.items.byIds,
		itemIds : state.entitiesReducer.items.allIds,//state.entitiesReducer.items.allIds 
		pictures : state.entitiesReducer.pictures.byIds,
		pictureIds : state.entitiesReducer.pictures.allIds,
		brands : brands,
		retailers :  retailers,
		webAppView: state.appView.webAppView,
		browseSelection: state.browseState.browseSelection,
		multipleSelectedAllIds: state.entitiesStateReducer.items.multipleSelected,
		selectedContent: state.addedEntitiesReducer.contents.byIds[state.entitiesStateReducer.contents.selected],
		
		//pageBufferSize: state.entitiesReducer.items.pageBufferSize,
		currentPage: state.entitiesStateReducer.items.currentPage,
		lastPage: state.entitiesStateReducer.items.lastPage,
		isFetching: state.entitiesStateReducer.items.isFetching,

		prevPageURL: state.entitiesStateReducer.items.prevPageURL,
		nextPageURL: state.entitiesStateReducer.items.nextPageURL,
		scrollPageHeight: state.entitiesStateReducer.items.scrollPageHeight,
		pages: state.entitiesReducer.items.pages
	});
}

const mapDispatchToProps = dispatch => ({
	onClick : () => {
		console.log("dispatching setFormVisibility for UpdateItme"); 
		//dispatch(setFormVisibility("UpdateItem"));
		dispatch(createModal({
			id: OxiAppConstants.FormType.UPDATE_ITEM,
		}));
	},
	createHandleMulSel: (id) => dispatch(selectMultipleEntity(OxiAppConstants.EntityTypes.ITEM , id)),
	createHandleMulDesel: (id) => dispatch(deselectMultipleEntity(OxiAppConstants.EntityTypes.ITEM , id)),
	setScrollPageHeight: (scrollPageHeight) => dispatch(setEntityScrollPageHeight(OxiAppConstants.EntityTypes.ITEM, scrollPageHeight)),
	setCurrentEntityPage: (page) => dispatch(setCurrentEntityPage(OxiAppConstants.EntityTypes.ITEM, page)),
	setNextPageURL: (URL) => dispatch(setNextPageURL(OxiAppConstants.EntityTypes.ITEM, URL)),
	setPrevPageURL: (URL) => dispatch(setPrevPageURL(OxiAppConstants.EntityTypes.ITEM, URL)),
	deleteItem: (selectedAllIds, selectedContent) => {
		dispatch(clientDeleteEntities(OxiAppConstants.EntityTypes.ITEM, selectedAllIds))
		//add selected content to content.clientInvalidated
		///dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.CONTENT, [selectedContent.id]));
		//remove items from addedEntitiesReducer corresponding to the id found in items.multipleSelected
		dispatch(removeAddedEntities(OxiAppConstants.EntityTypes.ITEM, selectedAllIds));
		//update content child items to reflect changes
		dispatch(modifyContent({
			id: selectedContent.id,
			items: selectedContent.items.filter(id => {
				for(let removedId of selectedAllIds){
					if(id === removedId) return false;
				}
				return true;
			})
		}));
		//clear items.mulltipleSelected
		dispatch(clearSelectMultipleEntity(OxiAppConstants.EntityTypes.ITEM));
	},
	clientInvalidateItems: (itemIds) => dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.ITEM, itemIds)),
	getContentsByItemId: (itemId) => {

		return new Promise((resolve, reject) => {
			resolve(dispatch(fetchContentsWithOutfitByItemId(itemId)));
		})
		.then((response) => {
			//var outfitIds = response.data['_embedded'].contentDtoes.map(content => content.outfitId);
			//console.log('outfits = ' + outfitIds);
			//dispatch(fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, '', 'ids', null, 0, 10, {params:outfitIds}));
		},(error) => {
			//Rejected
			console.log(error);
		});	
	},	
	removeContentEntities: () => dispatch(removeAllEntities(OxiAppConstants.EntityTypes.CONTENT)),
	removeAuxContentEntities: () => dispatch(removeAllEntities(OxiAppConstants.EntityTypes.AUX_CONTENT)),
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
	clearSelectMultipleEntity: () => dispatch(clearSelectMultipleEntity(OxiAppConstants.EntityTypes.ITEM)),
})

const VisibleItemListBrowse = connect(mapStateToProps, mapDispatchToProps)(ItemListBrowse);
export default VisibleItemListBrowse;