import React from 'react';
import OutfitStyles from '../../outfit.css';
import Outfit from './Outfit.js'

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
	);
}

export default OutfitList;