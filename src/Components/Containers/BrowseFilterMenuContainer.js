import { connect } from 'react-redux';
import {
	editContentView, 
	clearEdittingIds,
	addToEdittingIds,
	replaceEdittingIds,
	createContent, 
	fetchImage, 
	selectEntity, 
	selectAndPropagate,
	selectAddedEntity, 
	addOutfit,
	addContent,
	fetchMetrics,
	disableAddOutfit,
	selectContent,
	addItem,
	clientInvalidateEntities,
	addItemContent
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import BrowseFilterMenu from '../../Components/Presentations/BrowseFilterMenu.js';
import {maskEdits} from '../../Util/CommonSelectors.js';



const mapStateToProps = (state, props) => ({
	//filterMenuVisible: state.filterMenu.isVisible,
	browseSelection: state.browseState.browseSelection,
	filterMenuPositionx: state.popupMenusReducer.filter.positionx,
	filterMenuPositiony: state.popupMenusReducer.filter.positiony,
	filterMenuVisible: state.popupMenusReducer.filter.isVisible,
})

const mapDispatchToProps = (dispatch) => ({
})

const BrowseFilterMenuContainer = connect(mapStateToProps, mapDispatchToProps)(BrowseFilterMenu);
export default BrowseFilterMenuContainer;