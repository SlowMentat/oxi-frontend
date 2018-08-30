import React from 'react';
import OutfitStyles from '../../outfit.css';
import Outfit from './Outfit.js'

const OutfitList = ({outfitIds = [], outfits = {}, addedOutfitIds = [], addedOutfits = {}, /*addedContentIds,*/  onClick, onControlClick, focusOnAddedOutift, createContent, controlDisabled, getCoverPic}) => {
	//This seams sloppy but there should never be more than 1 outfit in the addedEntitiesReducer tree
	let contentId = undefined;
	if(addedOutfitIds != undefined){
		if(addedOutfitIds.length > 0 ){
			focusOnAddedOutift(addedOutfitIds[0]);	
		}
	}
	/*if(addedContentIds != undefined){
		contentId = addedContentIds[0];
	}*/
	return (
	    <div className={OutfitStyles.outfitMenuBlock}>
	    	<Outfit onClick={controlDisabled ?  console.log('Outfit control disabled!') : () => {onControlClick(1, 'test')}} isControl={true} >
	    		Add Outfit
	    	</Outfit>
	    	{outfitIds.map((outfitId) => 
	    		<Outfit 
	    			key={outfitId} 
	    			{...outfits[outfitId]} 
	    			id={outfitId}
	    			onClick={onClick} 
	    			isControl={false}  
	    			createContent={createContent} 
	    			thumbnail={outfits[outfitId].coverpicuri} 
	    			getCoverPic={getCoverPic}
	    			contents={outfits[outfitId]["contents"]}
	    		/>
	    	)}
	    	{addedOutfitIds.map((outfitId) => 
	    		<Outfit 
	    			key={outfitId} 
	    			{...addedOutfits[outfitId]} 
	    			id={outfitId}
	    			onClick={null} 
	    			isControl={false}  
	    			createContent={createContent} 
	    			thumbnail={addedOutfits[outfitId].coverpicuri} 
	    			getCoverPic={getCoverPic}
	    			contents={addedOutfits[outfitId]["contents"]}
	    		/>
	    	)}
	    </div>
	);
}

export default OutfitList;