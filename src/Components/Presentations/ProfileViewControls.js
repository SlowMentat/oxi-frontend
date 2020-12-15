import React from 'react';
import { connect } from 'react-redux';
import { 
	createItem, postImage, 
	batchRequestEntities, 
	putItems,
	putRemoveItems, 
	postItems } from '../../Components/Actions/indexActions.js';
import {
	outfit, 
	outfitsSchema,
	content,
	profileSchema, 
	contents, 
	items, 
	denormalizeOutfit, 
	buildItemContentsObject
} from '../../Util/Schema.js';
import FormStyles from '../../forms.scss';
import Styles from '../../root.scss';
import ContentStyles from '../../content.scss';
import VisibleContentList from '../Containers/VisibleContentList.js';
//import ProfileTileContainer from '../Containers/ProfileTileContainer.js';
import CroppableImageForm from '../../Util/CroppableImageForm.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import ItemLocationMap from './ItemLocationMap.js';
import ItemLocationMapContainer from '../Containers/ItemLocationMapContainer.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
//import {Button} from '../../Components/Presentations/Controls.js';
import { IconButton, Button } from '../../Components/Presentations/FitseeUI/Buttons/index.js'; 

//import { Button as ButtonMUI } from '@material-ui/core/Button';
//import { makeStyles } from '@material-ui/core/styles';


//const useStyles = makeStyles((theme) => ({
//  button: {
//    margin: theme.spacing(1),
//  },
//}));

export default class ProfileViewControls extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		const {
			unsetPreviewFocus,
			editOutfit,
			changeOutfitCoverPic,
			goBack,
			overrideOnExit,
			showComments,
			//refreshOnCoverpicUpdate,
		} = this.props;

		var {
			outfits,
			addedOutfits,
			outfitIds,
			selectedOutfitId,
			entitiesStateReducer,
			contents, 
			selectedContentId,
			items,
			pictures,
			viewState,
			isControlsHidden,
			isCommentsShown,
			username,
		} = this.props;

		var outfitSelected = outfits[entitiesStateReducer.outfits.selected];
		var addedOutfitSelected = addedOutfits[entitiesStateReducer.outfits.selected];

		/*var previewedUsername = (viewState === OxiAppConstants.viewState.ADD || viewState === OxiAppConstants.viewState.EDIT) || !outfitSelected ? 
			(username) :
			outfitSelected.username ?
				outfitSelected.username : 
				addedOutfitSelected.username;*/

		var previewedUsername = username;

		if(outfitSelected && viewState === OxiAppConstants.viewState.PREVIEW) previewedUsername = outfitSelected.username;
		if(addedOutfitSelected) previewedUsername = addedOutfitSelected.username;

		var isEditting = viewState != OxiAppConstants.viewState.PREVIEW.toLowerCase();
		
		const customButtonStyles = {
			display: (isEditting ? 'none' : null),
			//'margin-left':'5%',
			//'vertical-align':'top',
			//color:'var(--icon-color)',
		}

		return(
			<React.Fragment>
				<div 
					className={Styles.controlsContainerPreviewMode}
					style={
						isControlsHidden ? ({'--translate-y': 'var(--mobile-footer-height)'}) : ({'--translate-y': '0px'})
					}
				>
					<div className={Styles.controlsContainerTitle}>
						{(isEditting ? 'Editting' : null)}
					</div>
					<Button
						onClick={(event) => {
							overrideOnExit ? overrideOnExit() : null;
							unsetPreviewFocus();
							//this.forceUpdate();
						}}
						icon="arrow_back"
						label="back"
						theme="textPrimaryOnLight"
						style={customButtonStyles}
					/>
					{/*<ButtonMUI
						color="default"
						className={classes.button}
						startIcon={<i>arrow_back</i>}
					>
					</ButtonMUI>
					{/*<button class="mdc-button mdc-button--outlined">
						<div class="mdc-button__ripple"></div>
						<i class="material-icons mdc-button__icon" aria-hidden="true">arrow_back</i>
					</button>*/}
					{
						username === previewedUsername ?
							(<React.Fragment>
								<Button									
									onClick={(event) => {
										editOutfit(outfits[selectedOutfitId], entitiesStateReducer, contents, selectedContentId, items); 
									}}									
									icon="edit"
									label="edit"
									theme="textPrimaryOnLight"						
									style={customButtonStyles}
								/>
								<Button									
									onClick={() => {
										new Promise((resolve, reject) => {
											resolve( changeOutfitCoverPic({ 
												id: entitiesStateReducer.outfits.selected,
												//coverpicuri: pictures[contents[selectedContentId].picture].smalluri 
												coverPictureId: pictures[contents[selectedContentId].picture].id,
												coverpicuri: pictures[contents[selectedContentId].picture].mediumuri,
											}) );
										}).then(result => {
											// Force update of outfit list
											//refreshOnCoverpicUpdate(pictures[contents[selectedContentId].picture].mediumuri)
										});
									}}									
									icon="portrait"		
									label="cover pic"
									theme="textPrimaryOnLight"				
									style={customButtonStyles}
								/>
							</React.Fragment>) :
							null
					}
					{
						!isDevice ? 
							null :
							<IconButton								
								onClick={(event) => {
									showComments(event, !isCommentsShown);
								}}
								icon={isCommentsShown ? "arrow_back" : "mode_comment"}								
								style={{
									...customButtonStyles, 
									right: 'calc(85vw + 10px)', 
									position: 'absolute',
									display:'none',
								}}								
							/>
					}
				</div>				
			</React.Fragment>
		);
	}
}