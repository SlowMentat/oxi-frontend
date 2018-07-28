import { connect } from 'react-redux';
import { setFormVisibility, createItem, postImage } from '../../Components/Actions/indexActions.js';
import ContentView from '../../Components/Presentations/ContentView.js';

const mapStateToProps = state => {
	return {
		editView: state.editableContentView.isEditingContent,
		isVisible: state.shownContentView.shownContentView
	};
}

const mapDispatchToProps = dispatch => ({
		onImgClick: () => dispatch(setFormVisibility("AddItem")),
		uploadImage : (imageData) => dispatch(postImage(imageData))
})

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(ContentView);
export default ContentContainer;