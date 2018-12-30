import React from 'react';
import OutfitStyles from '../../outfit.css';
import Outfit from './Outfit.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

const OutfitList = ({items={}, outfitIds = [], outfits = {}, addedOutfitIds = [], addedOutfits = {}, selectedId = null, selectedAddedId = null, view,  onClickContextProfile, onClickContextHome, onControlClick, focusOnAddedOutift, createContent, controlDisabled, getCoverPic, editOutfit, viewState, contents, selectedContentId}) => {
	//This seams sloppy but there should never be more than 1 outfit in the addedEntitiesReducer tree
	let contentId = undefined;
	/*if(addedOutfitIds != undefined){
		if(addedOutfitIds.length > 0 ){
			if(selectedAddedId != addedOutfitIds[0]){
				focusOnAddedOutift(addedOutfitIds[0]);
			}	
		}
	}*/
	return (
		<TransitionGroup>
			<div style={(view.webAppView === OxiAppConstants.navRequestMap.home.toLowerCase()) ? ({'padding-right':'100px'}) : ({})}>
				<div style={(view.webAppView === OxiAppConstants.navRequestMap.home.toLowerCase()) ? ({'width':'900px','margin':'auto'}) : ({'width':'250px'})}>
	    			<div className={OutfitStyles.outfitMenuBlock}>
	    				
	    				{outfitIds.map((outfitId) => 
	    					<Outfit 
	    						key={outfitId} 
	    						{...outfits[outfitId]} 
	    						id={outfitId}
	    						onClickContextProfile={onClickContextProfile} 
	    						onClickContextHome={onClickContextHome}
	    						isSelected={selectedId === outfitId}  
	    						createContent={createContent} 
	    						coverpicuri={outfits[outfitId].coverpicuri} 
	    						getCoverPic={getCoverPic}
	    						contentIds={outfits[outfitId]["contents"]}
	    						webAppView={view.webAppView}
	    						editOutfit={() => editOutfit(outfits[outfitId], selectedId, contents, selectedContentId, items)}
	    						viewState={viewState}
	    					/>
	    				)}
	    				{addedOutfitIds.map((outfitId) => 
	    					<Outfit 
	    						key={outfitId} 
	    						{...addedOutfits[outfitId]} 
	    						id={outfitId}
	    						onClickContextProfile={null} 
	    						isSelected={selectedId === outfitId}  
	    						createContent={createContent} 
	    						coverpicuri={addedOutfits[outfitId].coverpicuri} 
	    						getCoverPic={getCoverPic}
	    						contentIds={addedOutfits[outfitId]["contents"]}
	    						webAppView={null}
	    						viewState={viewState}
	    					/>
	    				)}
	    			</div>
	    		</div>
	    	</div>
	    </TransitionGroup>
	);
}

export default OutfitList;