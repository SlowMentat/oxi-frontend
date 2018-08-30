import React from 'react';
import ContentStyles from '../../content.css';
import Content from './Content.js'
import OxiAppConstants from '../../App.js';

const ContentList = ({contentIds = [], contents = {}, addedContentIds = [], addedContents = {}, selected, addedItemIds, modifyContentItems, focusOnAddedContent, onClick, onControlClick, isEdit, controlDisabled, getCoverPic}) => {
	/*let contentKeys = Object.keys(contents)
	let idArray = contentIds;
	//modify the idArray to be in agreement with provided contents object
	if(contentIds.length != contentKeys.length){
		idArray = contentKeys;
	}*/
	if(addedContentIds != undefined){
		if(addedContentIds.length > 0){
			console.log('contents:');
			console.log(addedContents);
			console.log('addedContents.selected:');
			console.log(selected);
			console.log('addedContentIds[0]:');
			console.log(addedContentIds[0])
			if(selected != addedContentIds[0]) focusOnAddedContent(addedContentIds[0]);	
		}
	}
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
	    	{addedContentIds.map((contentId) => 
	    		<Content 
		    		key = {contentId}
		    		{...addedContents[contentId]} 
	    			id={contentId}
		    		onClick={onClick} 
		    		isControl={false} 
		    		thumbnail={addedContents[contentId].coverpicuri} 
		    		getCoverPic={getCoverPic}
		    		selected={selected}
		    		addedItemIds={addedItemIds}
		    		modifyContentItems={modifyContentItems}
		    		addedContents = {addedContents}
	    		/>
	    	)}
	    </div>
	);
}

export default ContentList;