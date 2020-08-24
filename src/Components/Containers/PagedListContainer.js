import { connect } from 'react-redux';
import { 
	setBrowserSelection,
	placeMenu,
	showMenu,
	fetchEntities,
	removeAllEntities,
	fetchContentsWithOutfitByItemId,
	fetchPagedItems,
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import BrowseControl from '../../Components/Presentations/BrowseControl.js';
import PagedList from '../../Components/Presentations/PagedList.js';



const mapStateToProps = (state, props) => ({
	//pageBufferSize: props.pageBufferSize,
})

const mapDispatchToProps = (dispatch) => ({
	getContentsByItemId: (URL) => {
		return new Promise((resolve, reject) => {
			resolve(dispatch(fetchContentsWithOutfitByItemId(null, URL)));
		})
		.then((response) => {

		});	
	},
	getItems: (URL) => {
		return new Promise((resolve, reject) => {
			resolve(dispatch(fetchEntities(OxiAppConstants.EntityTypes.ITEM, '', '', URL, '', '')));
		})
		.then((response) => {
			console.log('RESPONSE = ', response)
			return response;
		});
		
	},
	getOutfits: (URL) => {
		return new Promise((resolve, reject) => {
			resolve(dispatch(fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, '', '', URL, '', '')));
		})
		.then(({normalizedJson, response}) => {
			console.log('RESPONSE = ', response)
			return response;
		});
	}

})

const PagedListContainer = connect(mapStateToProps, mapDispatchToProps)(PagedList);
export default PagedListContainer;
