import { connect } from 'react-redux';
import { 
	setBrowserSelection,
	placeMenu,
	showMenu,
	fetchEntities,
	removeAllEntities,
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import ProfileControl from '../../Components/Presentations/ProfileControl.js';



const mapStateToProps = (state, props) => ({
	browseSelection: state.browseState.browseSelection,
	name: props.name,
	filterVisible: state.popupMenusReducer.filter.isVisible,
})

const mapDispatchToProps = (dispatch) => ({
	selectBrowserType: (selection) => {
		dispatch(setBrowserSelection(selection));
	},
	positionMenu: (positionx, positiony) => dispatch(placeMenu(OxiAppConstants.MenuTypes.FILTER, positionx, positiony)),
	showFilterMenu: () => dispatch(showMenu(OxiAppConstants.MenuTypes.FILTER, true)),
	hideFilterMenu: () => dispatch(showMenu(OxiAppConstants.MenuTypes.FILTER, false)),
	getItems: (filter) => {
		return new Promise((resolve, reject) => {
			resolve(dispatch(removeAllEntities(OxiAppConstants.EntityTypes.ITEM)));
		})
		.then((value) => {
			dispatch(fetchEntities(OxiAppConstants.EntityTypes.ITEM, '', filter));
		});		
		
		/*switch(filter){
			case filter === 'bookmarks':
				//dispatch()
				break;
			case filter === 'all':
				dispatch(fetchEntities(OxiAppConstants.EntityTypes.ITEM, '', filter);
				break;
			default:
				break;
		}*/
	},
	getOutfits: (filter) => {
		dispatch(fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, '', filter));
	}
})

const ProfileControlContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileControl);
export default ProfileControlContainer;