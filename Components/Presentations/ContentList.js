import React from 'react';
import ContentStyles from '../../content.css';
import Content from './Content.js'
import OxiAppConstants from '../../App.js';

const ContentList = ({contentIds = [], contents = {}, addedContentIds = [], addedContents = {}, selectedId, addedItemIds, modifyContentItems, focusOnAddedContent, onClick, onClickAddedContent, onControlClick, isEdit, controlDisabled, getCoverPic}) => {
	/*let contentKeys = Object.keys(contents)
	let idArray = contentIds;
	//modify the idArray to be in agreement with provided contents object
	if(contentIds.length != contentKeys.length){
		idArray = contentKeys;
	}*/
	console.log('contentIds');
	console.log(contentIds);
	console.log('contents');
	console.log(contents);
	if(addedContentIds != undefined){
		if(addedContentIds.length > 0){
			console.log('added contents:');
			console.log(addedContents);
			console.log('addedContents.selectedId:');
			console.log(selectedId);
			console.log('addedContentIds[0]:');
			console.log(addedContentIds[0])
			if(selectedId != addedContentIds[0]){console.log("calling focusOnAddedContent");focusOnAddedContent(addedContentIds[0]);}
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
		    		selectedId={selectedId}
		    		thumbnail={contents[contentId].coverpicuri} 
		    		getCoverPic={getCoverPic}
	    		/>
	    	)}
	    	{addedContentIds.map((contentId) => 
	    		<Content 
		    		key = {contentId}
		    		{...addedContents[contentId]} 
	    			id={contentId}
		    		onClick={onClickAddedContent} 
		    		isControl={false} 
		    		thumbnail={addedContents[contentId].coverpicuri} 
		    		getCoverPic={getCoverPic}
		    		selectedId={selectedId}
		    		addedItemIds={addedItemIds}
		    		modifyContentItems={modifyContentItems}
		    		addedContents = {addedContents}
	    		/>
	    	)}
	    </div>
	);
}

export default ContentList;