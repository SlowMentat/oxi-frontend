import React from 'react';
import OutfitStyles from '../../outfit.css';
import Outfit from './Outfit.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import PagedListContainer from '../../Components/Containers/PagedListContainer.js';

//Presentation Component 
import PagedList from './PagedList.js';

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


class OutfitList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let outfits = (container1_div, container2_div) => (
			<PagedListContainer
    			id="outfitListProfile"
    			scrollContainerStyle={this.props.scrollContainerStyle}
    			//pageBufferSize={this.props.pageBufferSize}
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
    			list={
    				<React.Fragment>
						<div style={container1_div}>
		    				<div style={container2_div}>
								<div className={OutfitStyles.outfitMenuBlock}>	  
									{this.props.outfitIds !== undefined ? this.props.outfitIds.map((outfitId) => 
										<Outfit 
											key={outfitId} 
											{...this.props.outfits[outfitId]} 
											id={outfitId}
											onClickContextProfile={this.props.onClickContextProfile} 
											onClickContextHome={this.props.onClickContextHome}
											isSelected={this.props.selectedId === outfitId}  
											createContent={this.props.createContent} 
											coverpicuri={this.props.outfits[outfitId].coverpicuri} 
											getCoverPic={this.props.getCoverPic}
											contentIds={this.props.outfits[outfitId]["contents"]}
											webAppView={this.props.view}
											editOutfit={() => this.props.editOutfit(
												this.props.outfits[outfitId], 
												this.props.selectedId, 
												this.props.contents, 
												selectedContentId, 
												this.props.items)}
											viewState={this.props.viewState}
										/>
									) : null}
									{this.props.addedOutfitIds !== undefined ? this.props.addedOutfitIds.map((outfitId) => 
										<Outfit 
											key={outfitId} 
											{...this.props.addedOutfits[outfitId]} 
											id={outfitId}
											onClickContextProfile={null} 
											isSelected={this.props.selectedId === outfitId}  
											createContent={this.props.createContent} 
											coverpicuri={this.props.addedOutfits[outfitId].coverpicuri} 
											getCoverPic={this.props.getCoverPic}
											contentIds={this.props.addedOutfits[outfitId]["contents"]}
											webAppView={null}
											viewState={this.props.viewState}
										/>
									) : null}
								</div>
		    				</div>
		    			</div>
    				</React.Fragment>
				}
			/>
		);
		//This seams sloppy but there should never be more than 1 outfit in the addedEntitiesReducer tree
		let contentId = undefined;
		console.log('view = ', this.props.view);
		return (
			<TransitionGroup style={{'height':'100%'}}>
				{(
					this.props.view === OxiAppConstants.navRequestMap.home.toLowerCase() ?
		    			outfits(container1_div, container2_div) :
		    			outfits({'height':'100%'},{'height':'100%'})
		    	)}
		    </TransitionGroup>
		);
	}
}

export default OutfitList;