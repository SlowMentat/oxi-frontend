import { connect } from 'react-redux';
import { setFormVisibility, editContentView, createOutfit, updateOutfit } from '../../Components/Actions/indexActions.js';
import OutfitList from '../../Components/Presentations/OutfitList.js';


const mapStateToProps = (state) => {
	return ({
		outfits : state.entitiesReducer.outfits.byIds,
		outfitIds : state.entitiesReducer.outfits.allIds 
	});
}

const mapDispatchToProps = (dispatch) => ({
	onClick : () => dispatch(setFormVisibility(true)),
	onControlClick : () => {
		dispatch(createOutfit());
		//dispatch(createContent());
		dispatch(editContentView(true));
	}
})

const VisibleOutfitList = connect(mapStateToProps, mapDispatchToProps)(OutfitList);
export default VisibleOutfitList;