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
	showMenu,
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import Menus from '../../Components/Presentations/Menus.js';
import {maskEdits} from '../../Util/CommonSelectors.js';



const mapStateToProps = (state, props) => ({
	//filterMenuVisible: state.filterMenu.isVisible,
	browseSelection: state.browseState.browseSelection,
	filterMenuPositionx: state.popupMenusReducer.filter.positionx,
	filterMenuPositiony: state.popupMenusReducer.filter.positiony,
	filterMenuVisible: state.popupMenusReducer.filter.isVisible,
})

const mapDispatchToProps = (dispatch) => ({
	closeMenu: () => dispatch(showMenu('', false)),
})

const MenusContainer = connect(mapStateToProps, mapDispatchToProps)(Menus);
export default MenusContainer;