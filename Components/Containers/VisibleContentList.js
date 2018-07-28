import { connect } from 'react-redux';
import { setFormVisibility, createContent, createItem, updateItem, fetchImage, selectContent } from '../../Components/Actions/indexActions.js';
import ContentList from '../../Components/Presentations/ContentList.js';

const mapStateToProps = state => {
	return ({
		contents : state.entitiesReducer.contents.byIds,
		contentIds : state.entitiesReducer.contents.allIds,
		controlDisabled: state.entitiesReducer.contents.controlDisabled,
		isEdit: state.editableContentView.isEditingContent
	});
}

const mapDispatchToProps = dispatch => ({
	onClick : (contentId) => dispatch(selectContent(contentId)),
	onControlClick : () => dispatch(createContent()),
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback))
})

const VisibleContentList = connect(mapStateToProps, mapDispatchToProps)(ContentList);
export default VisibleContentList;