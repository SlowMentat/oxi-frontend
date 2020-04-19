import React from 'react';
import { connect } from 'react-redux';
import { 
	setFormVisibility, 
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
import {Button} from '../../Components/Presentations/Controls.js';

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
		} = this.props;

		var {
			outfits,
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

		var previewedUsername = viewState === OxiAppConstants.viewState.ADD ? 
			(username) :
			outfits[entitiesStateReducer.outfits.selected].username;

		var isEditting = viewState != OxiAppConstants.viewState.PREVIEW.toLowerCase();
		var buttonDisplay = isEditting ? 'none' : 'inline-block';
		const customButtonStyles = {
			display: buttonDisplay,
			'margin-left':'5%',
			'vertical-align':'top',
			color:'var(--icon-color)',
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
						buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a}
						onClickHandler={(event) => {
							overrideOnExit ? overrideOnExit() : null;
							unsetPreviewFocus();
							//this.forceUpdate();
						}}
						title=''
						ligature="arrow_back"
						iconName={null}
						//customButtonStyles={{display:buttonDisplay, 'margin-top':'8px'}} 
						customButtonStyles={customButtonStyles}
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
							(<React.Fragment><Button
								buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a}
								onClickHandler={(event) => {
									editOutfit(outfits[selectedOutfitId], entitiesStateReducer, contents, selectedContentId, items); 
								}}
								title=''
								ligature="edit"
								iconName={null}
								customButtonStyles={{display:buttonDisplay, 'margin-top':'8px'}}
								customButtonStyles={customButtonStyles}
							/>
							<Button
								buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a}
								onClickHandler={() => {
									new Promise((resolve, reject) => {
										resolve( changeOutfitCoverPic({ 
											id: entitiesStateReducer.outfits.selected,
											coverpicuri: pictures[contents[selectedContentId].picture].smalluri 
										}) );
									});
								}}
								title=''
								//ligature="collections"
								ligature="portrait"
								iconName={null}
								customButtonStyles={{display:buttonDisplay, 'margin-top':'8px'}}
								customButtonStyles={customButtonStyles}
							/></React.Fragment>) :
							null
					}
					{
						!isDevice ? 
							null :
							<Button
								buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a}
								onClickHandler={(event) => {
									showComments(event, !isCommentsShown);
								}}
								title='comment'
								ligature={isCommentsShown ? "arrow_back" : "mode_comment"}
								iconName={null}
								customButtonStyles={{...customButtonStyles, right: 'calc(85vw + 10px)', position: 'absolute'}}								
							/>
					}
				</div>				
			</React.Fragment>
		);
	}
}