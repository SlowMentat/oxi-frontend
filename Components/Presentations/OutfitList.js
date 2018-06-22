import React from 'react';
import OutfitStyles from '../../outfit.css';
import Outfit from './Outfit.js'

const OutfitList = ({outfitIds = [], outfits = {}, onClick, onControlClick}) => {
	return (
	    <div className={OutfitStyles.outfitMenuBlock}>
	    	<Outfit onClick={() => {console.log("OutfitList onControlClick = "); console.log(onControlClick); onControlClick()}} isControl={true}/>
	    	{outfitIds.map((outfitId) => <Outfit {...outfits[outfitId]} onClick={onClick} isControl={false}/> )}
	    </div>
	);
}

export default OutfitList;