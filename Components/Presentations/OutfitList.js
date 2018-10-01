import React from 'react';
import OutfitStyles from '../../outfit.css';
import Outfit from './Outfit.js'

const OutfitList = ({outfitIds = [], outfits = {}, addedOutfitIds = [], addedOutfits = {}, selectedId = null, view,  onClickContextProfile, onClickContextHome, onControlClick, focusOnAddedOutift, createContent, controlDisabled, getCoverPic}) => {
	//This seams sloppy but there should never be more than 1 outfit in the addedEntitiesReducer tree
	let contentId = undefined;
	if(addedOutfitIds != undefined){
		if(addedOutfitIds.length > 0 ){
			if(selectedId != addedOutfitIds[0]){focusOnAddedOutift(addedOutfitIds[0]);}	
		}
	}
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
	    			thumbnail={outfits[outfitId].coverpicuri} 
	    			getCoverPic={getCoverPic}
	    			contents={outfits[outfitId]["contents"]}
	    			webAppView={view.webAppView}
	    		/>
	    	)}
	    	{addedOutfitIds.map((outfitId) => 
	    		<Outfit 
	    			key={outfitId} 
	    			{...addedOutfits[outfitId]} 
	    			id={outfitId}
	    			onClickContextProfile={null} 
	    			isSelected={true}  
	    			createContent={createContent} 
	    			thumbnail={addedOutfits[outfitId].coverpicuri} 
	    			getCoverPic={getCoverPic}
	    			contents={addedOutfits[outfitId]["contents"]}
	    			webAppView={null}
	    		/>
	    	)}
	    </div>
	);
}

export default OutfitList;