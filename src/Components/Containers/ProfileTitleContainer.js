import { connect } from 'react-redux';
import { OxiAppConstants } from '../../Util/OxiAppConstants.js';
import { setFormVisibility, fetchEntities, fetchImage } from '../../Components/Actions/indexActions.js';
import ProfileTitle from '../../Components/Presentations/ProfileTitle.js';

const mapStateToProps = (state) => {
	return ({
		ownerName : (state.entitiesReducer.profile.byIds.owner === undefined ? '' : state.entitiesReducer.profile.byIds.owner.username),
		hostName : (state.entitiesReducer.profile.byIds.host === undefined ? '' : state.entitiesReducer.profile.byIds.host.username),
		webAppView: state.appView.webAppView,
		location: state.router.location,
		//ownerpicuri: (state.entitiesReducer.profile.byIds.owner ? state.entitiesReducer.profile.byIds.owner.pictureDto.smalluri : ''),
	});
}

const mapDispatchToProps = (dispatch) => ({
	openProfilePicForm: (posx, posy) => {
		/*dispatch(fetchEntities(OxiAppConstants.EntityTypes.BRAND, '', ''))
		dispatch(fetchEntities(OxiAppConstants.EntityTypes.RETAILER, '', ''))*/
		//dispatch(fetchItemMenus())
		dispatch(setFormVisibility(OxiAppConstants.FormType.PROFILE_PIC, null, null));
	},
	//getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
})

const ProfileTitleContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileTitle);
export default ProfileTitleContainer;