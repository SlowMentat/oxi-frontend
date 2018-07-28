import { connect } from 'react-redux';
import PageView from '../../Components/Presentations/PageView.js';

const mapStateToProps = state => {
	return {
		page: state.editableContentView.isEditingContent
	};
}

const mapDispatchToProps = dispatch => ({
		onImgClick: () => dispatch(setFormVisibility("AddItem")),
		onSubmit : () => dispatch(submitChanges())
})

const PageContainer = connect(mapStateToProps, mapDispatchToProps)(PageView);
export default PageContainer;