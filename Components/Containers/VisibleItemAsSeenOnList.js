import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	createItem, updateItem, 
	selectMultipleEntity, 
	deselectMultipleEntity,
	setCurrentEntityPage,
	setEntityScrollPageHeight,
	fetchImage, 
} from '../../Components/Actions/indexActions.js';
import ItemAsSeenOnList from '../../Components/Presentations/ItemAsSeenOnList.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';


const mapStateToProps = (state, props) => {
	let brands = state.entitiesReducer.brands.byIds;
	let retailers = state.entitiesReducer.retailers.byIds;

	return ({
		webAppView: state.appView.webAppView,
		browseSelection: state.browseState.browseSelection,
		browseSelection: state.browseState.browseSelection,
		multipleSelectedAllIds: state.entitiesStateReducer.items.multipleSelected,
		selectedContent: state.addedEntitiesReducer.contents.byIds[state.entitiesStateReducer.contents.selected],

		//pageBufferSize: state.entitiesReducer.items.pageBufferSize,
		currentPage: state.entitiesStateReducer.contents.currentPage,
		lastPage: state.entitiesStateReducer.contents.lastPage,
		isFetching: state.entitiesStateReducer.contents.isFetching,

		prevPageURL: state.entitiesStateReducer.contents.prevPageURL,
		nextPageURL: state.entitiesStateReducer.contents.nextPageURL,
		scrollPageHeight: state.entitiesStateReducer.contents.scrollPageHeight,
		pages: state.entitiesReducer.contents.pages,

		contents : state.entitiesReducer.contents.byIds,
		pictures : state.entitiesReducer.pictures.byIds,
		contentIds : state.entitiesReducer.contents.allIds,
	});
}

const mapDispatchToProps = dispatch => ({
	onClick : () => {
		console.log("dispatching setFormVisibility for UpdateItme"); dispatch(setFormVisibility("UpdateItem"));
	},
	setScrollPageHeight: (scrollPageHeight) => dispatch(setEntityScrollPageHeight(OxiAppConstants.EntityTypes.CONTENT, scrollPageHeight)),
	setCurrentEntityPage: (page) => dispatch(setCurrentEntityPage(OxiAppConstants.EntityTypes.CONTENT, page)),
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
})

const VisibleItemAsSeenOnList = connect(mapStateToProps, mapDispatchToProps)(ItemAsSeenOnList);
export default VisibleItemAsSeenOnList;