/*import { connect } from 'react-redux';
import { fetchImage } from '../../Components/Actions/indexActions.js';
import { OxiAppConstants } from '../../Util/OxiAppConstants.js';
import ProfileTitle from '../../Components/Presentations/ProfileTitle.js';
import ProfilePicForm from '../../Components/Presentations/ProfilePicForm'

const mapStateToProps = (state) => {
	return ({
		owner: state.entitiesReducer.profile.byIds.owner,
	});
}

const mapDispatchToProps = (dispatch) => ({
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
})

const ProfilePicForm = connect(mapStateToProps, mapDispatchToProps)(ProfileTitle);
export default ProfilePicForm;*/