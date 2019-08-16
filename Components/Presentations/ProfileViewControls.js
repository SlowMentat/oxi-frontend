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
import FormStyles from '../../forms.css';
import Styles from '../../root.css';
import ContentStyles from '../../content.css';
import VisibleContentList from '../Containers/VisibleContentList.js';
//import ProfileTileContainer from '../Containers/ProfileTileContainer.js';
import CroppableImageForm from '../../Util/CroppableImageForm.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import ItemLocationMap from './ItemLocationMap.js';
import ItemLocationMapContainer from '../Containers/ItemLocationMapContainer.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {Button} from '../../Components/Presentations/Controls.js';



export default class ProfileViewControls extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		const {
			unsetPreviewFocus,
			editOutfit,
			changeOutfitCoverPic,
			goBack
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
			viewState
		} = this.props;

		var isEditting = viewState === OxiAppConstants.viewState.EDIT.toLowerCase();
		var bottonDisplay = isEditting ? 'none' : 'block';

		return(
			<React.Fragment>
				<div 
					className={Styles.controlsContianer}
					style={{left: '275px'}}>
					<div className={Styles.controlsContainerTitle}>
						{(isEditting ? 'Editting' : null)}
					</div>
					<Button
						buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a}
						onClickHandler={(event) => {
							unsetPreviewFocus();
							//this.forceUpdate();
						}}
						title=''
						ligature="arrow_back"
						iconName={null}
						customButtonStyles={{display:bottonDisplay, 'margin-top':'8px'}} />
					<Button
						buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a}
						onClickHandler={(event) => {
							editOutfit(outfits[selectedOutfitId], entitiesStateReducer, contents, selectedContentId, items); 
						}}
						title=''
						ligature="edit"
						iconName={null}
						customButtonStyles={{display:bottonDisplay, 'margin-top':'8px'}} />
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
						customButtonStyles={{display:bottonDisplay, 'margin-top':'8px'}} />
				</div>				
			</React.Fragment>
		);
	}
}