import { connect } from 'react-redux';
import {} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import MetricList from '../../Components/Presentations/MetricList.js';

const upperBodyMetrics = ['neck', 'sleeve', 'frontLength','backLength', 'fullShoulder','halfShoulder', 'chest', 'waist']
const lowerBodyMetrics = ['hip', 'pantOutseam', 'pantInseam', 'thigh', 'calf']
const getVisibleMetrics = (profile, blackList) => {
	let ownerProfileMetrics = {};
	if(profile !== null && profile !== undefined ){
		ownerProfileMetrics = Object.assign({}, profile);
		console.log('ownerProfileMetrics', ownerProfileMetrics);
		let i = 0;
		for(let ind of blackList){
			delete ownerProfileMetrics[blackList[i]];
			i++;
		}
	}
	return ownerProfileMetrics;	
}

const mapStateToProps = (state, username) => {
	//TODO:  This needs to be scrubbed server side at the DTO level
	/*let scrubbedOwnerProfile = Object.assign({}, state.entitiesReducer.profile.byIds.owner, {
		id:undefined, 
		username:undefined,
		country:undefined,
		dateOfBirth:undefined,
		bodyShape:undefined,
		mens:undefined,
		womens:undefined
	});*/
	//console.log("scrubbedOwnerProfile: ");
	//console.log(scrubbedOwnerProfile);
	/*let ownerProfileMetrics = {};
	if(state.entitiesReducer.profile.byIds.owner !== null && state.entitiesReducer.profile.byIds.owner !== undefined ){
		ownerProfileMetrics = state.entitiesReducer.profile.byIds.owner;
	}*/
	let blackList = [
		'id',
		'country',
		'dateOfBirth',
		'bodyShape',
		'mens',
		'womens',
		'username',
		'height'
	]
	let filteredOwnerUpperBodyMetrics = getVisibleMetrics(state.entitiesReducer.profile.byIds.owner, [...blackList, ...lowerBodyMetrics]);
	let filteredOwnerLowerBodyMetrics = getVisibleMetrics(state.entitiesReducer.profile.byIds.owner, [...blackList, ...upperBodyMetrics]);

	let filteredHostUpperBodyMetrics = getVisibleMetrics(state.entitiesReducer.profile.byIds.host, [...blackList, ...lowerBodyMetrics]);
	let filteredHostLowerBodyMetrics = getVisibleMetrics(state.entitiesReducer.profile.byIds.host, [...blackList, ...upperBodyMetrics]);

	console.log('filteredOwnerUpperBodyMetrics = ', filteredOwnerUpperBodyMetrics)
	console.log('filteredOwnerLowerBodyMetrics = ', filteredOwnerLowerBodyMetrics)
	console.log('filteredHostUpperBodyMetrics = ', filteredHostUpperBodyMetrics)
	console.log('filteredHostLowerBodyMetrics = ', filteredHostLowerBodyMetrics)

	return ({
		ownerUpperBodyMetrics : filteredOwnerUpperBodyMetrics,
		ownerLowerBodyMetrics : filteredOwnerLowerBodyMetrics,
		ownerUpperBodyMetricIds :  Object.keys(filteredOwnerUpperBodyMetrics),
		ownerLowerBodyMetricIds :  Object.keys(filteredOwnerLowerBodyMetrics),
		hostUpperBodyMetrics : filteredHostUpperBodyMetrics,
		hostLowerBodyMetrics : filteredHostLowerBodyMetrics,
		hostUpperBodyMetricIds :  Object.keys(filteredHostUpperBodyMetrics),
		hostLowerBodyMetricIds :  Object.keys(filteredHostLowerBodyMetrics)
	});
}

const mapDispatchToProps = (dispatch) => ({
})

const VisibleMetricList = connect(mapStateToProps, mapDispatchToProps)(MetricList);
export default VisibleMetricList;