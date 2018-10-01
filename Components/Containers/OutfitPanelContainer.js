import { connect } from 'react-redux';
import { 
	editContentView, 
	addOutfit,
	disableAddOutfit,
	addContent,
	deselectAndPropogate
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import OutfitCtrlAndInd from '../../Components/Presentations/OutfitCtrlAndInd.js';



const mapStateToProps = (state, webAppView) => {
	return ({
		buttonDisabled: state.buttonState.addOutfit.disabled,
		webAppView: webAppView
	});
}

const mapDispatchToProps = (dispatch) => ({
	addOutfit : (contentId, profileId) => {
		//First add outfit entity with passing child id addedContentIds taken from state mapping above
		//Note:  this is anticipating content id of 1 since there should only 
		//be one content entity present in the addedEntitiesReducer at anygiven time.
		dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT));
		dispatch(addOutfit('','','','',[1], profileId));
		dispatch(disableAddOutfit(true));
		dispatch(editContentView(true));
		//Then add outfit child entity/entiteis.
		//Note:  this is anticipating outfit id of 1 since there should only 
		//be one outfit entity present in the addedEntitiesReducer at anygiven time.
		dispatch(addContent(1, []));
	}
})

const OutfitPanel = connect(mapStateToProps, mapDispatchToProps)(OutfitCtrlAndInd);
export default OutfitPanel;