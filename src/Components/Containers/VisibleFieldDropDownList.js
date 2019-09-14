import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	addItem, 
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
	fetchSuggestion
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
		sizeLabelResults: state.searchState.addItemContext.sizeLabelResults,
	});
}

const mapDispatchToProps = (dispatch) => ({
})

const VisibleFieldDropDownList = connect(mapStateToProps, mapDispatchToProps)(FieldDropDownList);
export default VisibleFieldDropDownList;