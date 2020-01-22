import React from 'react';
import ContentStyles from '../../content.scss';
import outfitCoverBtnStyle from '../../makeOutfitCoverBtn.css';
import Content from './Content.js'
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {AddContentButton, DeleteContentButton} from './ContentListControls.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

class ContentList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addedItemIds: this.props.addedItemIds
		};
		this.extractAddedElement = this.extractAddedElement.bind(this);
		this.syncronizeState = this.syncronizeState.bind(this);
		this.extractNonExistingIds = this.extractNonExistingIds.bind(this);
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

	//Returns an array without ids not present in both targetArray and searchArray
	extractNonExistingIds(targetArray, searchArray){
		let result = targetArray;
		for(let searchElement of searchArray){
			let targetIndex = 0;
			let match = false;
			for(let targetElement of targetArray){
				if(targetElement === searchElement){
					match = true;
					break;
				}
				targetIndex++;
			}
			if(!match){
				console.log('targetIndex = ', targetIndex)
				result = result.splice(targetIndex, 1);
			}
		}
		return result;		
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
						if(this.props.addedContents[this.props.selectedId].items.length > 0 || this.props.invalidatedContentIds.length > 0){
							this.props.clientInvalidateItems(this.props.invalidatedItemIds, [addedItemId]);
							//TODO: experimental
							this.props.addItemContent(this.props.selectedId, addedItemId);
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
					/*let result = this.extractNonExistingIds(this.state.addedItemIds, this.props.addedItemIds);
					console.log('result = ', result);
					if(result.length !== this.state.addedItemIds.length){
						this.props.modifyContentItems(this.props.selectedId, result);
						this.setState({
							addedItemIds: this.props.addedItemIds
						});
					}*/
					this.setState({
						addedItemIds: this.props.addedItemIds
					});
				}
				break;
			case (itemIdsLengthDiff <= 2):
				//console.log('Unexpected de-sync between item id arrays:  ContetList component state, addedItemIds more than 1 less elements than redux state.addedEntitiesReducer.items.allIds!');
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

		// Methods
		const {
			onClick,
			getCoverPic,
			modifyAddedOutfitContents,
			focusOnAddedContent,
		} = this.props;

		// Props
		const {
			controlDisabled,
			selectAfterAdd,

			addedContentIds,
			addedContents,
			selectedId,
			contentIds,
			contentId,
			contents,
			
			selectedOutfit,
			selectedOutfitId,
			addedOutfitEntity,

			addedItemIds,
			modifyContentItems,

			pictures,

			viewState,
		} = this.props;

		const {
			coverpicuri,
		} = selectedOutfit ? selectedOutfit : ({});

		const {
			smalluri,
			thumbnailuri,
		} = !(contents[contentId] && pictures) ? 
				({}) :
				pictures[contents[contentId].picture] ?  
					pictures[contents[contentId].picture] : 
					({});
		
		const addedThumbnailuri = !(addedContents[contentId] && pictures) ? 
			(null) :
			pictures[addedContents[contentId].picture] ? 
				pictures[addedContents[contentId].picture].thumbnailuri : 
				null;

		const addedCoverpicuri = addedContents[contentId] ? addedContents[contentId].coverpicuri : ({});
		let addContentButton = null;

		if(addedContentIds != undefined){
			if(addedContentIds.length > 0){
				console.log('added contents:');
				console.log(addedContents);
				console.log('addedContents.selectedId:');
				console.log(selectedId);
				console.log('addedContentIds[0]:');
				console.log(addedContentIds[0])

				//TODO:  need to fix this to handle multiple file upload eventually
				/*if(selectedId != addedContentIds[0]){
					//console.log("calling focusOnAddedContent");focusOnAddedContent(addedContentIds[0]);
					console.log("calling focusOnAddedContent");focusOnAddedContent(1);
				}*/
				//if add Contents button was just pressed and the selected content Id is not the last element in addedContentIds array
				/*if(controlDisabled && selectedId != addedContentIds[addedContentIds.length-1]){
					selectAfterAdd(addedContentIds[addedContentIds.length-1])
				}*/
			}
		}

		/*switch(viewState){
			case OxiAppConstants.viewState.ADD:
				addContentButton = (<Content onClick={controlDisabled ?  console.log('Content control disabled!') : () => {onControlClick()}} isControl={true}>Add Content</Content>);

				break;
			case OxiAppConstants.viewState.EDIT:
				addContentButton = (<Content onClick={controlDisabled ?  console.log('Content control disabled!') : () => {onControlClick()}} isControl={true}>Add Content</Content>);
				break;
			case OxiAppConstants.viewState.PREVIEW:
				break;
			default:
				break;
		}*/

		if(selectedOutfitId != false){
			if(viewState !== OxiAppConstants.viewState.PREVIEW && addedOutfitEntity.byIds[selectedOutfitId] !== undefined){
				if(addedOutfitEntity.byIds[selectedOutfitId].contents.length !== addedContentIds.length){
					modifyAddedOutfitContents(selectedOutfitId, addedContentIds)
				}
			}
		}

		return (			
		    <React.Fragment>
		    	<div className={ContentStyles.contentListContainer}>
		    		{/*<AddContentButton 
		    			shown={viewState != OxiAppConstants.viewState.PREVIEW} 
		    			enabled={!controlDisabled} 
		    			handleClick={onControlClick} />*/}
		    		{
		    			contentIds.map((contentId) => 
		    				<Content 
				    			key = {contentId}
				    			{...contents[contentId]} 
		    					id={contentId}
				    			onClick={onClick} 
				    			isControl={false} 
				    			selectedId={selectedId}
				    			thumbnail={thumbnailuri} 
				    			getCoverPic={getCoverPic}
				    			isOutfitCoverpic={
				    				!(selectedOutfit && smalluri) ? 
				    					(smalluri === selectedOutfit.coverpicuri) :
				    					false 
				    			}
		    				/>)
		    		}
		    		{
		    			addedContentIds.map((contentId) => 
		    				<Content 
				    			key = {contentId}
				    			{...addedContents[contentId]} 
		    					id={contentId}
				    			//onClick={onClickAddedContent}		    		
				    			onClick={onClick} 
				    			isControl={false} 
				    			thumbnail={//TODO: this may not be necessary
				    				!addedContents[contentId] ? 
				    					undefined : 
				    					addedCoverpicuri ? 
				    						addedThumbnailuri : 
				    						'blob'//addedContents[contentId].coverpicuri
				    			} 
				    			getCoverPic={getCoverPic}
				    			selectedId={selectedId}
				    			addedItemIds={addedItemIds}
				    			modifyContentItems={modifyContentItems}
				    			addedContents = {addedContents}
				    			isOutfitCoverpic={false}
		    				/>)
		    		}
		    		{
		    			/*(<DeleteContentButton 
		    				style={{
		    					right: '0px',
		    			    	top: '3px',
		    				}} 
		    				shown={viewState != OxiAppConstants.viewState.PREVIEW} 
		    				enabled={!controlDisabled} 
		    				handleClick={onControlClick} />)*/
		    		}
		    	</div>
		    </React.Fragment>
		);
	}
}

export default ContentList;