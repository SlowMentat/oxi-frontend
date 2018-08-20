import { connect } from 'react-redux';
import { setFormVisibility, createItem, postImage, fetchImage } from '../../Components/Actions/indexActions.js';
import ContentView from '../../Components/Presentations/ContentView.js';

const mapStateToProps = state => {
	return {
		editView: state.contentViewState.isEditingContent,
		//contentViewed: state.shownContentView.shownContentId,
		contentsByIds: state.entitiesReducer.contents.byIds,
		//contentSelected : state.contentViewState.shownContentId
		contentSelected : state.entitiesReducer.contents.selected
		//isVisible: state.shownContentView.shownContentView
	};
}

const mapDispatchToProps = (dispatch, props) => ({
		onImgClick: () => dispatch(setFormVisibility("AddItem")),
		uploadImage : (imageData) => dispatch(postImage(imageData)),
		getPreviewPic : (filename, callback) => dispatch(fetchImage(filename, callback))
})

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(ContentView);
export default ContentContainer;