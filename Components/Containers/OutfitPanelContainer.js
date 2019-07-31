import { connect } from 'react-redux';
import { 
	editContentView, 
	addOutfit,
	disableAddOutfit,
	addContent,
	deselectAndPropogate,
	selectAndPropogate,
	clientInvalidateEntities
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import OutfitCtrlAndInd from '../../Components/Presentations/OutfitCtrlAndInd.js';



const mapStateToProps = (state, props) => {
	return ({
		buttonDisabled: state.buttonState.addOutfit.disabled,
		webAppView: state.appView.webAppView,
		entitiesStateReducer: state.entitiesStateReducer
	});
}

const mapDispatchToProps = (dispatch) => ({
	addOutfit : (contentId, profileId, entitiesStateReducer) => {

		let outfitIds = [1];
		//First add outfit entity passing child id addedContentIds taken from state mapping above
		//Note:  this is anticipating content id of 1 since there should only 
		//be one content entity present in the addedEntitiesReducer at anygiven time.
		dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT));
		//dispatch(addOutfit('','','','',[1], profileId));

		dispatch(addOutfit(Object.assign({}, OxiAppConstants.EntityTemplates.OUTFIT, {contents: outfitIds})));
		dispatch(addContent(Object.assign({}, OxiAppConstants.EntityTemplates.CONTENT, {})));
		dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitIds[0], 1, entitiesStateReducer));
		//dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT, outfitIds[0], null));

		dispatch(disableAddOutfit(true));
		dispatch(editContentView(OxiAppConstants.viewState.ADD));
		dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.OUTFIT, outfitIds));
		//Then add outfit child entity/entiteis.
		//Note:  this is anticipating outfit id of 1 since there should only 
		//be one outfit entity present in the addedEntitiesReducer when adding a new outfit.
		
		//dispatch(addContent(null, 1, []));
	}
})

const OutfitPanel = connect(mapStateToProps, mapDispatchToProps)(OutfitCtrlAndInd);
export default OutfitPanel;