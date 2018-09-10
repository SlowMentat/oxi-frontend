import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	editContentView, 
	createOutfit, 
	updateOutfit, 
	createContent, 
	fetchImage, 
	selectOutfit, 
	selectAndPropogate,
	selectAddedEntity, 
	addOutfit,
	addContent
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import OutfitList from '../../Components/Presentations/OutfitList.js';




const mapStateToProps = (state) => {
	return ({
		outfits : state.entitiesReducer.outfits.byIds,
		outfitIds : state.entitiesReducer.outfits.allIds,
		addedOutfits : state.addedEntitiesReducer.outfits.byIds,
		addedOutfitIds : state.addedEntitiesReducer.outfits.allIds,
		//addedContentIds	: state.addedEntitiesReducer.contents.allIds,
		controlDisabled: state.entitiesReducer.outfits.controlDisabled,
		selectedId: state.entitiesReducer.outfits.selected
	});
}

const mapDispatchToProps = (dispatch) => ({
	onClick : (outfitId, targetChildId) => {
		dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitId, targetChildId));
		//dispatch(selectOutfit(outfitId));
	},
	focusOnAddedOutift : (addedOutfitId) => dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.OUTFIT, addedOutfitId)),
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback))
})

const VisibleOutfitList = connect(mapStateToProps, mapDispatchToProps)(OutfitList);
export default VisibleOutfitList;