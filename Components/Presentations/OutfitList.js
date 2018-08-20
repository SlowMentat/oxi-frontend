import React from 'react';
import OutfitStyles from '../../outfit.css';
import Outfit from './Outfit.js'

const OutfitList = ({outfitIds = [], outfits = {}, onClick, onControlClick, createContent, controlDisabled, getCoverPic}) => {
	return (
	    <div className={OutfitStyles.outfitMenuBlock}>
	    	<Outfit onClick={controlDisabled ?  console.log('Outfit control disabled!') : () => {onControlClick()}} isControl={true} >
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
	    </div>
	);
}

export default OutfitList;