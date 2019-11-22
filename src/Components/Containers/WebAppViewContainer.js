import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	setWebAppView, 
	fetchEntities, 
	replaceProfile, 
	navigateTo,
	removeAllEntities,
	selectEntity,
	getSavedItems,
	unsetPreviewFocus,
	setPreviewFocus,

	editContentView, 
	addOutfit,
	disableAddOutfit,
	addContent,
	deselectAndPropogate,
	selectAndPropogate,
	clientInvalidateEntities,
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import WebAppView from '../../Components/Presentations/WebAppView.js';
import fetch from 'cross-fetch'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, props ) => {
	return {
		webAppView: state.appView.webAppView,
		browseSelection: state.browseState.browseSelection,
		viewState: state.contentViewState.viewState,
		isFocusedPreview: state.contentViewState.isFocusedPreview,
		/*hostProfile: state.entitiesReducer.profile.byIds.host,*/
		owner: state.entitiesReducer.profile.byIds.owner,
		formType: state.toggleModal.modal,
		requestUrl: state.toggleModal.prevRequestUrl,
		requestType: state.toggleModal.prevRequestType,
		savedItemMap: state.cache.savedItemMap,
		buttonDisabled: state.buttonState.addOutfit.disabled,


		//Router location state
  		pathname: state.router.location.pathname,
  		search: state.router.location.search,
  		hash: state.router.location.hash,		
	};
}

const mapDispatchToProps = (dispatch, props) => ({
	getSavedItems : () => dispatch(getSavedItems()),
	navEventCallbacks : {
		//Browse
		a : (isOwnerProfileEntityPresent) => {
			dispatch(navigateTo(OxiAppConstants.navRequestMap.a.toLowerCase(), isOwnerProfileEntityPresent));
		},
		//Profil e
		b : (profileId) => {
			dispatch(navigateTo(OxiAppConstants.navRequestMap.b.toLowerCase()));
		},
		//Fitting
		c : (isOwnerProfileEntityPresent) => {
			dispatch(navigateTo(OxiAppConstants.navRequestMap.c.toLowerCase(), isOwnerProfileEntityPresent));
		},
		search : () => {
			dispatch(setWebAppView("search"))
		},
		logout : () => {
			axios.post(OxiAppConstants.apiBaseURL + '/logout', null, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'conentType': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			})
		}
	},
	setPreviewFocus: () => dispatch(setPreviewFocus()),
	unsetPreviewFocus: () => dispatch(unsetPreviewFocus()),
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
	}
})

const AppView = connect(mapStateToProps, mapDispatchToProps)(WebAppView);
export default withRouter(AppView);