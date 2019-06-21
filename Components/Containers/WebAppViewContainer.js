import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	setWebAppView, 
	fetchEntities, 
	replaceProfile, 
	navigateTo,
	removeAllEntities,
	selectEntity
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
		/*hostProfile: state.entitiesReducer.profile.byIds.host,*/
		owner: state.entitiesReducer.profile.byIds.owner,
		formType: state.toggleModal.modal,
		requestUrl: state.toggleModal.prevRequestUrl,
		requestType: state.toggleModal.prevRequestType,
	};
}

const mapDispatchToProps = (dispatch, props) => ({
	navEventCallbacks : {
		a : (isOwnerProfileEntityPresent) => {
			//dispatch(setWebAppView("home"))
			/*dispatch(selectEntity(OxiAppConstants.EntityTypes.ITEM, false));
			dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, false));
			dispatch(selectEntity(OxiAppConstants.EntityTypes.OUTFIT, false));

			dispatch(removeAllEntities(OxiAppConstants.EntityTypes.ITEM_CONTENT));
			dispatch(removeAllEntities(OxiAppConstants.EntityTypes.CONTENT));
			dispatch(removeAllEntities(OxiAppConstants.EntityTypes.ITEM));
			dispatch(removeAllEntities(OxiAppConstants.EntityTypes.OUTFIT));*/
			console.log('in navEventCallback for navRequestMap.a');
			dispatch(navigateTo(OxiAppConstants.navRequestMap.a.toLowerCase(), isOwnerProfileEntityPresent));
		},
		b : (profileId) => {
			/*dispatch(setWebAppView("profile"));
			//fetch owners outfits 
			dispatch(fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, ''));
			//fetch owners body info
			dispatch(fetchEntities(OxiAppConstants.EntityTypes.PROFILE, ''));*/
			//Clear existing store

			//Deselect everything
			//dispatch(selectEntity(OxiAppConstants.EntityTypes.ITEM, false));
			//dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, false));
			//dispatch(selectEntity(OxiAppConstants.EntityTypes.OUTFIT, false));
			////remove all entitiy data from entitiesReducer branch
			//dispatch(removeAllEntities(OxiAppConstants.EntityTypes.ITEM_CONTENT));
			//dispatch(removeAllEntities(OxiAppConstants.EntityTypes.CONTENT));
			//dispatch(removeAllEntities(OxiAppConstants.EntityTypes.ITEM));
			//dispatch(removeAllEntities(OxiAppConstants.EntityTypes.OUTFIT));
			console.log('in navEventCallback for navRequestMap.b');
			dispatch(navigateTo(OxiAppConstants.navRequestMap.b.toLowerCase()));
		},
		c : () => {
			//dispatch(setWebAppView("settings"))
			//dispatch(navigateTo(OxiAppConstants.navRequestMap.landing.toLowerCase()));
			dispatch(navigateTo(OxiAppConstants.navRequestMap.c.toLowerCase()));
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
	}
})

const AppView = connect(mapStateToProps, mapDispatchToProps)(WebAppView);
export default withRouter(AppView);