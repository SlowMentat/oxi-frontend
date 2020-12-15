import React from 'react';
import OutfitStyles from '../../outfit.scss';
import outfitCoverBtnStyle from '../../makeOutfitCoverBtn.css';
import Styles from '../../root.scss';

import Outfit from './Outfit.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import PagedListContainer from '../../Components/Containers/PagedListContainer.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import {Button} from '../../Components/Presentations/Controls.js';
import ProfileHeader from '../../Components/Presentations/ProfileHeader.js';
import ProfileTitleContainer from '../../Components/Containers/ProfileTitleContainer.js';

//Presentation Component 
import PagedList from './PagedList.js';
import styled from 'styled-components';
import { desktopRules, mobileRules } from '../../mixin.js';

import { ListLoadProgress } from '../../Components/Presentations/FitseeUI/ListLoadProgress.js';

const container1_div = {
	'height': '100%',
    'padding-left': '200px',
    'padding-right': '200px',	
}

const container2_div = {
	'width': '900px',
    'margin': 'auto',
    'height': '100%',
}

class PagedOutfitList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {
			webAppView,
			owner,
			location,
		} = this.props;

		const {
			profileStatsDto,
		} = owner ? owner : ({});

		const pathArray = location.pathname.split('/');
		var uri = pathArray[pathArray.length - 1];

		const isOwner = owner ?
			uri === owner.username :
			(false);

		const isProfileView = this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase();
		const usernameSelected = this.props.outfits[this.props.selectedId] ? this.props.outfits[this.props.selectedId].username : undefined;

		const getIsSelected = (testId) => {
			for(var id of this.props.entitiesStateReducer.outfits.multipleSelected){
				console.debug('multipleSelected = ', this.props.entitiesStateReducer.outfits.multipleSelected);
				console.debug('testId = ', testId, '\nid = ', id);
				if(testId === id) return true;
			}
			return false;
		}

		return(
			<PagedListContainer
				id={OxiAppConstants.PageListIds.c}
				className={this.props.className}
    			//scrollContainerStyle={this.props.scrollContainerStyle}
    			currentPage={this.props.currentPage}
    			lastPage={this.props.lastPage}
    			isFetching={this.props.isFetching}
    			prevPageURL={this.props.prevPageURL}
    			nextPageURL={this.props.nextPageURL}
    			setScrollPageHeight={this.props.setScrollPageHeight}
    			scrollPageHeight={this.props.scrollPageHeight}
    			setCurrentEntityPage={this.props.setCurrentEntityPage}
    			pages={this.props.pages}
    			setNextPageURL={this.props.setNextPageURL}
				setPrevPageURL={this.props.setPrevPageURL}
				webAppView={this.props.webAppView}
    			list={
    				<React.Fragment>

			    		<div 
			    			style={webAppView !== OxiAppConstants.navRequestMap.b.toLowerCase() ? ({display:'none', width:'0px'}) : ({})}
			    			className={Styles.mobileTitleContainer_div}
			    		>
			    			<div 
			    				className={Styles.userTitle_div}
								//style={{
    							//	'padding-bottom': '15px',
    							//	'height': '165px',
    							//	'margin-right':'-1px',
    							//	'position':'relative',
								//}}
							>
								<ProfileTitleContainer isMobile={true}/>
								<div className={Styles.points_div}>
									{
										!isOwner || !profileStatsDto ? 
											null :
											profileStatsDto.points >= 0 ?
												profileStatsDto.points : 
												null
									}
								</div>										
							</div>
						</div>
						<div className={OutfitStyles.outfitMenuBlockContainer1_div}>
							<ProfileHeader 
								profile={this.props.profile} 
								username={ uri }
								getCoverPic={this.props.getCoverPic}
								isProfileView={ isProfileView }
								openProfilePicForm={e => this.props.openProfilePicForm(e)}
							>
							</ProfileHeader>
							
		    				<div className={isProfileView ? OutfitStyles.profileOutfitMenuBlockContainer2_div : OutfitStyles.outfitMenuBlockContainer2_div}>
								<div className={isProfileView ? OutfitStyles.outfitMenuBlockProfile : OutfitStyles.outfitMenuBlock}>	  
									{this.props.outfitIds !== undefined ? this.props.outfitIds.map((outfitId) => 
										(this.props.outfits[outfitId] !== undefined ? <Outfit 
											key={outfitId} 
											{...this.props.outfits[outfitId]} 
											id={outfitId}
											onClickContextProfile={this.props.onClickContextProfile} 
											onClickContextBrowse={this.props.onClickContextBrowse}
											getHostMeasurements={this.props.getHostMeasurements}
											navToHostProfile={this.props.navToHostProfile}
											//routeToHostProfile={this.props.routeToHostProfile(`/${this.props.outfits[outfitId].username}`)}
											//isSelected={this.props.entitiesStateReducer.outfits.selected === outfitId}  
											isSelected={ getIsSelected(outfitId) }  
											createContent={this.props.createContent} 
											coverpicuri={this.props.outfits[outfitId].coverpicuri} 
											getCoverPic={this.props.getCoverPic}
											username={this.props.outfits[outfitId].username}
											contentIds={this.props.outfits[outfitId]["contents"]}
											webAppView={this.props.webAppView}
											webAppViewContext={this.props.webAppViewContext}
											editOutfit={() => this.props.editOutfit(
												this.props.outfits[outfitId], 
												this.props.entitiesStateReducer, 
												this.props.contents, 
												this.props.selectedContentId, 
												this.props.items)}
											viewState={this.props.viewState}
											containerHeight={this.props.containerHeight}
											//containerWidth={this.props.containerWidth}
											setPreviewFocus={this.props.setPreviewFocus}
											//profileIds={this.props.profileIds}
											unlike={this.props.unlike}
											like={this.props.like}
											outfit={this.props.outfits[outfitId]}
											pictures={this.props.pictures}
											//likeCountIdsSize={this.props.likeCountIdsSize}
											likeCount={this.props.likeCounts[this.props.outfits[outfitId].likeCount]}
											//likeCountIds={this.props.likeCountIds}
											toggleMetricPanel={this.props.toggleMetricPanel}
											owner={this.props.owner}
											getOutfitPreviewForm={this.props.getOutfitPreviewForm}
											showOutfitPreviewFromBrowse={this.props.showOutfitPreviewFromBrowse}
											previewOutfitFromBrowse={this.props.previewOutfitFromBrowse}
											selectOutfit={this.props.selectOutfit}
											deselectOutfit={this.props.deselectOutfit}
											previewedOutfitId={this.props.previewedOutfitId}
											history={this.props.history}
										/> :
										null)
									) : null}
									{this.props.addedOutfitIds !== undefined ? this.props.addedOutfitIds.map((outfitId) => 
										<Outfit 
											key={outfitId} 
											{...this.props.addedOutfits[outfitId]} 
											id={outfitId}
											onClickContextProfile={null} 
											//isSelected={this.props.entitiesStateReducer.outfits.selected === outfitId}  
											isSelected={ getIsSelected(outfitId) }
											createContent={this.props.createContent} 
											coverpicuri={this.props.addedOutfits[outfitId].coverpicuri} 
											getCoverPic={this.props.getCoverPic}
											contentIds={this.props.addedOutfits[outfitId]["contents"]}
											webAppView={null}
											webAppViewContext={this.props.webAppViewContext}
											viewState={this.props.viewState}
											containerHeight={this.props.containerHeight}
											owner={this.props.owner}
											getOutfitPreviewForm={this.props.getOutfitPreviewForm}
											//containerWidth={this.props.containerWidth}
											//toggleMetricPanel={this.props.toggleMetricPanel}
											selectOutfit={this.props.selectOutfit}
											deselectOutfit={this.props.deselectOutfit}
											pictures={this.props.pictures}
										/>
									) : null}
								</div>
								{/*	<ListLoadProgress isShown={this.props.isFetching}/>*/}
								{/*<div
									className={Styles.listLoading_div}
									style={{
										'height': '125px',
									}}
								>
									<div>
										{this.props.isFetching ? <CircularProgress size="48" /> : null}
									</div>
								</div>*/}
		    				</div>
		    			</div>
    				</React.Fragment>
				}
			/>
		)		
	}
}

const StyledPagedOutfitList = styled(PagedOutfitList)`

`;


class OutfitList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		//This seams sloppy but there should never be more than 1 outfit in the addedEntitiesReducer tree
		let contentId = undefined;
		console.log('webAppView = ', this.props.webAppView);
		let customButtonStyles = {
			color:'white',
			'margin':'auto',		
		}
		return (
			<React.Fragment>
				<TransitionGroup style={{'height':'100%'}}>
					{(
						this.props.webAppView === OxiAppConstants.navRequestMap.a.toLowerCase() ?
		    				<StyledPagedOutfitList
		    					className={this.props.scrollContainerStyle} 
		    					//container1_div={container1_div} 
		    					//container2_div={container2_div} 
		    					{...this.props} 
		    				/> :
		    				<StyledPagedOutfitList 
		    					className={this.props.scrollContainerStyle} 
		    					//container1_div={{'height':'100%'}} 
		    					//container2_div={{'height':'100%'}} 
		    					{...this.props} 
		    				/>
		    		)}
		    	</TransitionGroup>
		    	{null
		    		//this.props.viewState !== OxiAppConstants.viewState.PREVEIW && this.props.webAppView === 'profile' ? 
		    		//	(<div id='makeOutfitCoverBtnContiner' className={outfitCoverBtnStyle.makeOutfitCoverBtnContainer_div}>
		    		//		<div 
		    		//			id='makeOutfitCoverBtn' 
		    		//			className={outfitCoverBtnStyle.makeOutfitCoverBtn_div}		    			
					//			onClick={() => {
					//				new Promise((resolve, reject) => {
					//					resolve( this.props.changeOutfitCoverPic({ 
					//						id: this.props.entitiesStateReducer.outfits.selected,
					//						coverpicuri: this.props.pictures[this.props.contents[this.props.selectedContentId].picture].smalluri 
					//					}) );
					//				});
					//			}}
					//		>
					//			<Button
					//				buttonType={OxiAppConstants.ControlConstants.ButtonTypes.b} //dynamic icon button
					//				//onClickHandler={this.props.discardChanges}
					//				title='make cover'
					//				iconName='OutfitCoverIcon'
					//				expandedWidth={125}
					//				buttonHeight={40}
					//				customButtonStyles={customButtonStyles} />
		    		//			{/*<SvgIcon name='OutfitCoverIcon' style={{display:'inline-block'}}/>
		    		//			<div className={outfitCoverBtnStyle.makeOutfitCoverTextCtnr_div}>
		    		//				<div className={outfitCoverBtnStyle.makeOutfitCoverText_div}>
		    		//					Make outfit cover
		    		//				</div>
		    		//			</div>*/}
		    		//		</div>
		    		//	</div>) :
		    		//	null
		    	}
		    </React.Fragment>
		);
	}
}

export default OutfitList;