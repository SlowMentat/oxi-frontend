import { connect } from 'react-redux';
import { 
	//setFormVisibility, 
	createModal,
	removeModalById,
	createItem, 
	updateItem, 
	selectMultipleEntity, 
	deselectMultipleEntity,
	setCurrentEntityPage,
	setEntityScrollPageHeight,
	fetchImage,

	fetchEntities,
	selectAndPropagate,	
} from '../../Components/Actions/indexActions.js';
import ItemAsSeenOnList from '../../Components/Presentations/ItemAsSeenOnList.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';


const mapStateToProps = (state, props) => {
	let brands = state.entitiesReducer.brands.byIds;
	let retailers = state.entitiesReducer.retailers.byIds;

	return ({
		webAppView: state.appView.webAppView,
		browseSelection: state.browseState.browseSelection,
		multipleSelectedAllIds: state.entitiesStateReducer.items.multipleSelected,
		//selectedContent: state.addedEntitiesReducer.auxContents.byIds[state.entitiesStateReducer.auxContents.selected],

		//pageBufferSize: state.entitiesReducer.items.pageBufferSize,
		currentPage: state.entitiesStateReducer.auxContents.currentPage,
		lastPage: state.entitiesStateReducer.auxContents.lastPage,
		isFetching: state.entitiesStateReducer.auxContents.isFetching,

		prevPageURL: state.entitiesStateReducer.auxContents.prevPageURL,
		nextPageURL: state.entitiesStateReducer.auxContents.nextPageURL,
		scrollPageHeight: state.entitiesStateReducer.auxContents.scrollPageHeight,
		pages: state.entitiesReducer.auxContents.pages,

		contents : state.entitiesReducer.auxContents.byIds,
		pictures : state.entitiesReducer.pictures.byIds,
		contentIds : state.entitiesReducer.auxContents.allIds,
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
	setScrollPageHeight: (scrollPageHeight) => dispatch(setEntityScrollPageHeight(OxiAppConstants.EntityTypes.CONTENT, scrollPageHeight)),
	setCurrentEntityPage: (page) => dispatch(setCurrentEntityPage(OxiAppConstants.EntityTypes.CONTENT, page)),
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
	previewOutfitFromBrowse: (outfitId) => {
		new Promise(async (resolve, reject) => {
			var {normalizedJson, response} = await dispatch(fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, null, null, `${OxiAppConstants.serviceURL}/outfit/${outfitId}`));
			resolve(normalizedJson);
		})
		.then(normalizedJson => {
			const {
				outfits,
				contents,
				picture,
			} = normalizedJson ? normalizedJson.entities : ({});

			if(contents){
				// TODO:  assign all outfits' coverpicuri to their corresponding picture uuid
				var contentArrays = Object.keys(contents);
				const contentIds = contentArrays.filter(contentId => picture[contents[contentId].picture].mediumuri === outfits[outfitId].coverpicuri);
				dispatch(selectAndPropagate(OxiAppConstants.EntityTypes.OUTFIT, outfitId, contentIds[0]));
				//dispatch(setFormVisibility(OxiAppConstants.FormType.OUTFIT_PREVIEW, null, null));				
				dispatch(removeModalById(OxiAppConstants.FormType.OUTFIT_PREVIEW));
			}

			//props.setPreviewedOutfit(outfitId);
		});
	},
})

const VisibleItemAsSeenOnList = connect(mapStateToProps, mapDispatchToProps)(ItemAsSeenOnList);
export default VisibleItemAsSeenOnList;