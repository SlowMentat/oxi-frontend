import React from 'react';
import ContentStyles from '../../content.css';
import Content from './Content.js'
import OxiAppConstants from '../../App.js';

const ContentList = ({contentIds = [], contents = {}, onClick, onControlClick, isEdit, controlDisabled, getCoverPic}) => {
	/*let contentKeys = Object.keys(contents)
	let idArray = contentIds;
	//modify the idArray to be in agreement with provided contents object
	if(contentIds.length != contentKeys.length){
		idArray = contentKeys;
	}*/
	return (
	    <div className={ContentStyles.contentContainer}>
	    	{isEdit ? (<Content onClick={controlDisabled ?  console.log('Content control disabled!') : () => {onControlClick()}} isControl={true}>Add Content</Content>) : null}
	    	{contentIds.map((contentId) => 
	    		<Content 
		    		key = {contentId}
		    		{...contents[contentId]} 
	    			id={contentId}
		    		onClick={onClick} 
		    		isControl={false} 
		    		thumbnail={contents[contentId].coverpicuri} 
		    		getCoverPic={getCoverPic}
	    		/>
	    	)}
	    </div>
	);
}

export default ContentList;