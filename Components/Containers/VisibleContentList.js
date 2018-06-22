import { connect } from 'react-redux';
import { setFormVisibility, createItem, updateItem } from '../../Components/Actions/indexActions.js';
import ContentList from '../../Components/Presentations/ContentList.js';


const mapStateToProps = state => {
	return ({
		contents : state.entitiesReducer.contents.byIds,
		contentIds : state.entitiesReducer.contents.allIds,
		isEdit: state.editableContentView.isEditingContent 
	});
}

const mapDispatchToProps = dispatch => ({
	onClick : () => dispatch((true)),
	onControlClick : () => dispatch(editContentView(true))
})

const VisibleContentList = connect(mapStateToProps, mapDispatchToProps)(ContentList);
export default VisibleContentList;