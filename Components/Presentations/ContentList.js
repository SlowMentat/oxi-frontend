import React from 'react';
import ContentStyles from '../../content.css';
import Content from './Content.js'

const ContentList = ({contentIds = [], contents = {}, onClick, onControlClick, isEdit}) => {
	return (
	    <div className={ContentStyles.contentContainer}>
	    	{isEdit ? (<Content onClick={() => {console.log("ContentList onControlClick = "); console.log(onControlClick); onControlClick()}} isControl={true}/>) : null}
	    	{contentIds.map((contentId) => <Content {...contents[contentId]} onClick={onClick} isControl={false}/> )}
	    </div>
	);
}

export default ContentList;