import React from 'react';
import ContentStyles from '../../content.css';
import Content from './Content.js'
import {OxiAppConstants} from '../../Util/OxiAppConstants.js'

class ContentList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addedItemIds: this.props.addedItemIds
		};
		this.extractAddedElement = this.extractAddedElement.bind(this);
		this.syncronizeState = this.syncronizeState.bind(this);
	}

	//Searches for each element of stat.addedItemIds from this.props.addedItemIds to identify the new element in this.props.addedItemIds.
	extractAddedElement(targetArray, searchArray){
		for(let searchElement of searchArray){
			let match = false;
			for(let targetElement of targetArray){
				if(targetElement === searchElement){
					match = true;
					break;
				}
			}
			if(!match) return searchElement;
		}
		return null;
	}

	syncronizeState(){
		//check the addedItemIds array for a user adding a NEW item
		console.log('this.props.addedItemIds.length = ', this.props.addedItemIds.length);
		console.log('this.state.addedItemIds.length = ', this.state.addedItemIds.length);
		let itemIdsLengthDiff = this.props.addedItemIds.length - this.state.addedItemIds.length;
		console.log('itemIdsLengthDiff = ', itemIdsLengthDiff)
		switch(true){
			case (itemIdsLengthDiff >= 1):
				let addedItemId = this.extractAddedElement(this.state.addedItemIds, this.props.addedItemIds);
				console.log('addedItemId = ', addedItemId);
				if(addedItemId !== null){
					let duplicate = false;
					//Fence posting kinda:  checking for duplicate entries.  
					//On entry into edit contentext view the selected outfit and all child entities are copied to the addedEntitiesReducer.
					//This means the selected contents will have its child items array populated.  Adding a new content in this context will 
					//duplicate the elements in previously selected content's items array before the select leaf of the entitesStateReducer.contents tree
					//can switch to the newly created content entity.  Feels ugly but it works and items per content are limited.
					for(let itemId of this.props.addedContents[this.props.selectedId].items){
						if(itemId === addedItemId){
							duplicate = true;
							break;
						}
					}
					//Note:  This block will not be executed during componentDidMount
					if(!duplicate){
						this.props.modifyContentItems(this.props.selectedId, [...this.props.addedContents[this.props.selectedId].items, addedItemId]);
						if(/*this.props.addedContents[this.props.selectedId].items.length > 0 &&*/ this.props.invalidatedContentIds.length > 0){
							this.props.clientInvalidateItems(this.props.invalidatedItemIds, [addedItemId]);
						}
					}
				}
				this.setState({
					addedItemIds: this.props.addedItemIds
				});
				break;
			case (itemIdsLengthDiff >= 2):
				console.log('Unexpected de-sync between item id arrays:  ContetList component state, addedItemIds contains more than 1 less elements than redux state.addedEntitiesReducer.items.allIds!');
				break;
			//Remove all elements form state.addedItemIds array when all edits have been discarded (indicated by a switch to PREVIEW viewStat)
			case (itemIdsLengthDiff < 0):
				if(this.props.viewState === OxiAppConstants.viewState.PREVIEW){
					this.setState({
						addedItemIds: []
					})
				}else{
					//TODO: handle the case when an added item entity is removed during and EDITING viewState
					//...
				}
				break;
			case (itemIdsLengthDiff <= 2):
				console.log('Unexpected de-sync between item id arrays:  ContetList component state, addedItemIds more than 1 less elements than redux state.addedEntitiesReducer.items.allIds!');
				break;
			default:
				break;
		}		
	}

	componentDidMount(){
		this.syncronizeState();
	}

	componentDidUpdate(){
		this.syncronizeState()
	}

	render(){
		let addContentButton = null;

		if(this.props.addedContentIds != undefined){
			if(this.props.addedContentIds.length > 0){
				console.log('added contents:');
				console.log(this.props.addedContents);
				console.log('this.props.addedContents.selectedId:');
				console.log(this.props.selectedId);
				console.log('addedContentIds[0]:');
				console.log(this.props.addedContentIds[0])
				if(this.props.selectedId != this.props.addedContentIds[0]){
					console.log("calling this.props.focusOnAddedContent");this.props.focusOnAddedContent(this.props.addedContentIds[0]);
				}
				//if add Contents button was just pressed and the selected content Id is not the last element in this.props.addedContentIds array
				if(this.props.controlDisabled && this.props.selectedId != this.props.addedContentIds[this.props.addedContentIds.length-1]){
					this.props.selectAfterAdd(this.props.addedContentIds[this.props.addedContentIds.length-1])
				}
			}
		}

		switch(this.props.viewState){
			case OxiAppConstants.viewState.ADD:
				addContentButton = (<Content onClick={this.props.controlDisabled ?  console.log('Content control disabled!') : () => {this.props.onControlClick()}} isControl={true}>Add Content</Content>);
				break;
			case OxiAppConstants.viewState.EDIT:
				addContentButton = (<Content onClick={this.props.controlDisabled ?  console.log('Content control disabled!') : () => {this.props.onControlClick()}} isControl={true}>Add Content</Content>);
				break;
			case OxiAppConstants.viewState.PREVIEW:
				break;
			default:
				break;
		}

		if(this.props.selectedOutfitId != false){
			if(this.props.viewState !== OxiAppConstants.viewState.PREVIEW && 
				this.props.addedOutfitEntity.byIds[this.props.selectedOutfitId].contents.length !== this.props.addedContentIds.length){
				this.props.modifyAddedOutfitContents(this.props.selectedOutfitId, this.props.addedContentIds)
			}
		}

		return (
		    <div className={ContentStyles.contentContainer}>
		    	{addContentButton}
		    	{this.props.contentIds.map((contentId) => 
		    		<Content 
			    		key = {contentId}
			    		{...this.props.contents[contentId]} 
		    			id={contentId}
			    		onClick={this.props.onClick} 
			    		isControl={false} 
			    		selectedId={this.props.selectedId}
			    		thumbnail={this.props.pictureIds[this.props.contents[contentId].picture].thumbnailuri} 
			    		getCoverPic={this.props.getCoverPic}
		    		/>
		    	)}
		    	{this.props.addedContentIds.map((contentId) => 
		    		<Content 
			    		key = {contentId}
			    		{...this.props.addedContents[contentId]} 
		    			id={contentId}
			    		//onClick={onClickAddedContent}		    		
			    		onClick={this.props.onClick} 
			    		isControl={false} 
			    		thumbnail={//TODO: this may not be necessary
			    			(this.props.addedContents[contentId] === undefined) ? undefined : 
			    				(this.props.addedContents[contentId].coverpicuri === null) ? this.props.pictureIds[this.props.addedContents[contentId].picture].thumbnailuri : 
			    					this.props.addedContents[contentId].coverpicuri
			    		} 
			    		getCoverPic={this.props.getCoverPic}
			    		selectedId={this.props.selectedId}
			    		addedItemIds={this.props.addedItemIds}
			    		modifyContentItems={this.props.modifyContentItems}
			    		addedContents = {this.props.addedContents}
		    		/>
		    	)}
		    </div>
		);
	}
}

export default ContentList;