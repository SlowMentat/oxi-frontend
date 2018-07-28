import React from 'react';
import ContentStyles from '../../content.css';
import Content from './Content.js'
import OxiAppConstants from '../../App.js';

const ContentList = ({contentIds = [], contents = {}, onClick, onControlClick, isEdit, controlDisabled, getCoverPic}) => {
	return (
	    <div className={ContentStyles.contentContainer}>
	    	{isEdit ? (<Content onClick={controlDisabled ?  console.log('Content control disabled!') : () => {onControlClick()}} isControl={true}>Add Content</Content>) : null}
	    	{contentIds.map((contentId) => 
	    			<Content 
		    			{...contents[contentId]} 
	    				id={contentId}
		    			onClick={onClick} 
		    			isControl={false} 
		    			thumbnail={contents[contentId].coverpicuri} 
		    			getCoverPic={getCoverPic}
	    			/>
	    		)
	    	}
	    </div>
	);
}

export default ContentList;