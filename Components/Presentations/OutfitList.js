import React from 'react';
import OutfitStyles from '../../outfit.css';
import outfitCoverBtnStyle from '../../makeOutfitCoverBtn.css';
import Outfit from './Outfit.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import PagedListContainer from '../../Components/Containers/PagedListContainer.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

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



class PagedOutfitList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<PagedListContainer
    			scrollContainerStyle={this.props.scrollContainerStyle}
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
						<div style={this.props.container1_div}>
		    				<div style={this.props.container2_div}>
								<div className={OutfitStyles.outfitMenuBlock}>	  
									{this.props.outfitIds !== undefined ? this.props.outfitIds.map((outfitId) => 
										(this.props.outfits[outfitId] !== undefined ? <Outfit 
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
												this.props.selectedContentId, 
												this.props.items)}
											viewState={this.props.viewState}
											containerHeight={this.props.containerHeight}
											containerWidth={this.props.containerWidth}
										/> :
										null)
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
											containerHeight={this.props.containerHeight}
											containerWidth={this.props.containerWidth}
										/>
									) : null}
								</div>
		    				</div>
		    			</div>
    				</React.Fragment>
				}
			/>
		)		
	}
}


class OutfitList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		//This seams sloppy but there should never be more than 1 outfit in the addedEntitiesReducer tree
		let contentId = undefined;
		console.log('view = ', this.props.view);
		return (
			<React.Fragment>
				<TransitionGroup style={{'height':'100%'}}>
					{(
						this.props.view === OxiAppConstants.navRequestMap.home.toLowerCase() ?
		    				(<PagedOutfitList container1_div={container1_div} container2_div={container2_div} {...this.props} />) :
		    				(<PagedOutfitList container1_div={{'height':'100%'}} container2_div={{'height':'100%'}} {...this.props} />)
		    		)}
		    	</TransitionGroup>
		    	<div id='makeOutfitCoverBtnContiner' className={outfitCoverBtnStyle.makeOutfitCoverBtnContainer_div}>
		    		<div 
		    			id='makeOutfitCoverBtn' 
		    			className={outfitCoverBtnStyle.makeOutfitCoverBtn_div}		    			
						onClick={() => {
							new Promise((resolve, reject) => {
								resolve( this.props.changeOutfitCoverPic({ 
									id: this.props.selectedId,
									coverpicuri: this.props.pictures[this.props.contents[this.props.selectedContentId].picture].smalluri 
								}) );
							});
						}}
					>
		    			<SvgIcon name='OutfitCoverIcon' style={{display:'inline-block'}}/>
		    			<div className={outfitCoverBtnStyle.makeOutfitCoverTextCtnr_div}>
		    				<div className={outfitCoverBtnStyle.makeOutfitCoverText_div}>
		    					Make outfit cover
		    				</div>
		    			</div>
		    		</div>
		    	</div>
		    </React.Fragment>
		);
	}
}

export default OutfitList;