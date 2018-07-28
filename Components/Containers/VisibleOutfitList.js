import { connect } from 'react-redux';
import { setFormVisibility, editContentView, createOutfit, updateOutfit, createContent, fetchImage } from '../../Components/Actions/indexActions.js';
import OutfitList from '../../Components/Presentations/OutfitList.js';


const mapStateToProps = (state) => {
	return ({
		outfits : state.entitiesReducer.outfits.byIds,
		outfitIds : state.entitiesReducer.outfits.allIds,
		controlDisabled: state.entitiesReducer.outfits.controlDisabled
	});
}

const mapDispatchToProps = (dispatch) => ({
	onClick : () => dispatch(setFormVisibility(true)),
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