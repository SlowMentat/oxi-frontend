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
	});
}

const mapDispatchToProps = (dispatch) => ({
	onClick : (outfitId, targetChildId) => {
		dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitId, targetChildId));
		//dispatch(selectOutfit(outfitId));
	},
	//onClick : () => dispatch(setFormVisibility(true)),
	//createContent : (props) => dispatch(createContent(props)),
	onControlClick : (contentId, profileId) => {
		//First add outfit entity with passing child id addedContentIds taken from state mapping above
		//Note:  this is anticipating content id of 1 since there should only 
		//be one content entity present in the addedEntitiesReducer at anygiven time.
		dispatch(addOutfit('','','','',[1], profileId));
		dispatch(editContentView(true));
		//Then add outfit child entity/entiteis.
		//Note:  this is anticipating outfit id of 1 since there should only 
		//be one outfit entity present in the addedEntitiesReducer at anygiven time.
		dispatch(addContent(1, []));
	},
	focusOnAddedOutift : (addedOutfitId) => dispatch(selectAddedEntity(OxiAppConstants.EntityTypes.OUTFIT, addedOutfitId)),
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback))
})

const VisibleOutfitList = connect(mapStateToProps, mapDispatchToProps)(OutfitList);
export default VisibleOutfitList;