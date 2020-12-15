import { connect } from 'react-redux';
import { 
	/*addItem, 
	selectAddedEntity, 
	modifyContent, 
	navigateTo, 
	editContentView, 
	disableAddOutfit, 
	removeAddedEntityAndPropogate,
	clearAllAddedEntitiesState,
	clearEdittingI,
	addToEdittingI,
	replaceEdittingI,
	clearEdittingIds,
	addToEdittingIds,
	replaceEdittingIds,
	disableAddContentButton,
	clearClientInvalidation,
	clearSelectMultipleEntity,
	fetchSuggestion*/
	replaceProfile,
} from '../../Components/Actions/indexActions.js';
import {FieldDropDownList} from '../../Components/Presentations/FieldDropDownList.js'
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

import { withRouter } from 'react-router-dom';


const mapStateToProps = (state, props) => {
	return ({
		retailerItems: state.searchState.addItemContext.retailerItemResults,
		retailerNames: state.searchState.addItemContext.retailerNameResults,
		retailerSize: state.searchState.addItemContext.sizeResults,
		udrNameResults: state.searchState.addItemContext.udrNameResults,
		udsLabelResults: state.searchState.addItemContext.udsLabelResults,
		uDItemResults: state.searchState.addItemContext.uDItemResults,
		sizeLabelResults: state.searchState.addItemContext.sizeLabelResults,
		apparelTypes: state.entitiesReducer.apparelTypes.byIds,
		ownerTolerances: state.entitiesReducer.profile.byIds.owner.toleranceDto,
	});
}

const mapDispatchToProps = (dispatch) => ({
	compareSize: (metrics) => {
		metrics ? dispatch(replaceProfile({'host' : {'userMetricsDto': metrics}})) : null;
	},
})

const VisibleFieldDropdownList = connect(mapStateToProps, mapDispatchToProps)(FieldDropDownList);
export default VisibleFieldDropdownList;