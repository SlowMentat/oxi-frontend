import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	editContentView, 
	updateOutfit, 
	createContent, 
	fetchImage, 
	selectOutfit, 
	selectAndPropogate,
	selectAddedEntity, 
	addOutfit,
	addContent,
	fetchMetrics
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import OutfitList from '../../Components/Presentations/OutfitList.js';




const mapStateToProps = (state, webAppView) => {
	return ({
		outfits : state.entitiesReducer.outfits.byIds,
		outfitIds : state.entitiesReducer.outfits.allIds,
		addedOutfits : state.addedEntitiesReducer.outfits.byIds,
		addedOutfitIds : state.addedEntitiesReducer.outfits.allIds,
		//addedContentIds	: state.addedEntitiesReducer.contents.allIds,
		controlDisabled: state.entitiesReducer.outfits.controlDisabled,
		selectedId: state.entitiesReducer.outfits.selected,
		view: webAppView
	});
}

const mapDispatchToProps = (dispatch) => ({
	onClickContextProfile : (outfitId, targetChildId) => {
		console.log("view Outfit div clicked")
		dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitId, targetChildId));
		//dispatch(selectOutfit(outfitId));
	},
	onClickContextHome : (outfitId) => {
		//fetch for the outfit's user's profile metrics (findProfileByOutfitId)
		console.log('clicked', outfitId);
		dispatch(fetchMetrics(outfitId));
				
	},
	focusOnAddedOutift : (addedOutfitId) => dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.OUTFIT, addedOutfitId)),
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback))
})

const VisibleOutfitList = connect(mapStateToProps, mapDispatchToProps)(OutfitList);
export default VisibleOutfitList;