import { connect } from 'react-redux';
import { setFormVisibility, setWebAppView, fetchEntities } from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import WebAppView from '../../Components/Presentations/WebAppView.js';
import fetch from 'cross-fetch'
import axios from 'axios';

const mapStateToProps = state => {
	return {
		webAppView: state.appView.webAppView
	};
}

const mapDispatchToProps = (dispatch, props) => ({
	navEventCallbacks : {
		home : () => dispatch(setWebAppView("home")),
		profile : (profileId) => {
			dispatch(setWebAppView("profile"));
			dispatch(fetchEntities('outfit', "gg"));
		},
		settings : () => dispatch(setWebAppView("settings")),
		search : () => dispatch(setWebAppView("search")),
		logout : () => {
			axios.post(OxiAppConstants.apiBaseUrl + '/logout', null, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'conentType': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			})
		}
	}
})

const AppView = connect(mapStateToProps, mapDispatchToProps)(WebAppView);
export default AppView;