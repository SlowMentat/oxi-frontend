import { connect } from 'react-redux';
import {} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import MetricTitle from '../../Components/Presentations/MetricTitle.js';

const mapStateToProps = (state) => {
	return ({
		ownerName : (state.entitiesReducer.profile.byIds.owner === undefined ? '' : state.entitiesReducer.profile.byIds.owner.username),
		hostName : (state.entitiesReducer.profile.byIds.host === undefined ? '' : state.entitiesReducer.profile.byIds.host.username),
	});
}

const mapDispatchToProps = (dispatch) => ({
})

const MetricTitleContainer = connect(mapStateToProps, mapDispatchToProps)(MetricTitle);
export default MetricTitleContainer;