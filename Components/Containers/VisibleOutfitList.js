import { connect } from 'react-redux';
import { setFormVisibility, editContentView, createOutfit, updateOutfit, createContent, fetchImage, selectOutfit, selectAndPropogate} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import OutfitList from '../../Components/Presentations/OutfitList.js';




const mapStateToProps = (state) => {
	return ({
		outfits : state.entitiesReducer.outfits.byIds,
		outfitIds : state.entitiesReducer.outfits.allIds,
		controlDisabled: state.entitiesReducer.outfits.controlDisabled
	});
}

const mapDispatchToProps = (dispatch) => ({
	onClick : (outfitId, targetChildId) => {
		dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitId, targetChildId));
		//dispatch(selectOutfit(outfitId));
	},
	//onClick : () => dispatch(setFormVisibility(true)),
	//createContent : (props) => dispatch(createContent(props)),
	onControlClick : (props) => {
		dispatch(createOutfit());
		dispatch(editContentView(true));
		//dispatch(createContent(props);
	},
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback))
})

const VisibleOutfitList = connect(mapStateToProps, mapDispatchToProps)(OutfitList);
export default VisibleOutfitList;