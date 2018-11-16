import React from 'react';
import { connect } from 'react-redux';
import { setFormVisibility, createItem, postImage } from '../../Components/Actions/indexActions.js';
import FormStyles from '../../forms.css';
import Styles from '../../root.css';
import ContentStyles from '../../content.css';
import VisibleContentList from '../Containers/VisibleContentList.js';
import CroppableImageForm from '../../Util/CroppableImageForm.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import ItemLocationMap from './ItemLocationMap.js';

const imgStyle = {
	//width: 'calc((2 / 3) * (100vh - 40px - 80px))',
	height: '100%',
	'max-height': 'calc(100vh - 200px * (3/2))',
	//width: '100%',
    'max-width': 'calc((100vh - 200px) * 2/3)',
	display: 'block',
	'border-radius': '4px',
	'object-fit': 'cover',
	margin:'auto'
    /*'margin-top': '31%'		/*This is the heigt of the previes row (55%) divided by 2 and added to the height of the header (5%)*/
}

const imgFormStyle = {
	//display:'inline-block',
	margin:'auto',
	height:'100%', 
	//'max-width': '50%',
	//height: 'calc(100% - 80px)'
	padding: '0px 5% 0px 5%',
	//'background-color':'#ececec',
	overflow: 'hidden'
}

const controlContainerStyle = {
	'text-align':'center',
	padding: '0 10% 0 10%',
    height: 'calc(5vh + 25px)',
	width:'100%'
}


const ShowContentView = (props) => {
	console.log("in showContentView = ", props.viewContext);
	console.log('visibleItemsMap = ', props.visibleItemsMap);
	let contentView = null;
	if(props.viewContext === OxiAppConstants.viewState.ADD){
		contentView = (
			<ImageAdd 
				addedEntities={props.addedEntities}
				entitiesStateReducer={props.entitiesStateReducer}
				contentSelected={props.contentSelected} 
				outfitSelected={props.outfitSelected} 
				brands={props.brands} 
				retailers={props.retailers} 
				getItemForm={props.getItemForm} 
				visibleItemsMap={props.visibleItemsMap} 
				postAddedOutfit={props.postAddedOutfit} 
				confirmDiscard={props.confirmDiscard}
				clientInvalidateEntity={props.clientInvalidateEntity}
				clientInvalidatedContents={props.invalidatedContents}
				clientInvalidatedOutfits={props.invalidatedOutfits}
				clientInvalidatedItems={props.invalidatedItems}
			/>
		);
	}else if(props.viewContext === OxiAppConstants.viewState.PREVIEW){
		contentView = (
			<ImagePreview 
				onClick={props.getGestureForm} 
				contents={props.contents} 
				contentSelected={props.contentSelected} 
				visibleItemsMap={props.visibleItemsMap} 
				getPreviewPic={props.getPreviewPic} 
				pictures={props.pictures}
			/>
		);
	}else if(props.viewContext === OxiAppConstants.viewState.EDIT){
		contentView = (
			<ImageEdit 
				addedEntities={props.addedEntities} 
				entitiesStateReducer={props.entitiesStateReducer}
				contents={props.contents} 
				addedContents={props.addedContents}
				contentSelected={props.contentSelected} 
				outfitSelected={props.outfitSelected}
				brands={props.brands}
				retailers={props.retailers} 
				getItemForm={props.getItemForm}  
				visibleItemsMap={props.visibleItemsMap} 
				getPreviewPic={props.getPreviewPic} 
				postAddedOutfit={props.postAddedOutfit} 
				postAddedContent={props.postAddedContent} 
				confirmDiscard={props.confirmDiscard}
				pictures={props.pictures}
				clientInvalidateEntity={props.clientInvalidateEntity}
				clientInvalidatedContents={props.invalidatedContents}
				clientInvalidatedOutfits={props.invalidatedOutfits}
				clientInvalidatedItems={props.invalidatedItems}
				putModifiedOutfit={props.putModifiedOutfit}
			/>
		);
	}else{
		console.log("nothing selected");
	}
	
	return(
		<div style={{'height':'calc(100vh - 200px)'}}>
			<div className={FormStyles.imageUploadPreview}>
				{contentView}
			</div>			
		</div>
	)
}

class ImagePreview extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			base64Image:null,
			contentId:null
		};
		this._handleImgChange = this._handleImgChange.bind(this);
		this._handleImgMouseOver = this._handleImgMouseOver.bind(this);
		this._handleImgClick = this._handleImgClick.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
	}

	componentDidMount(){
	}

	_handleImgChange(event){
	}

	_handleImgMouseOver(event){
	}

	_handleImgClick(event){
	}

	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	render(){
		if(this.state.contentId != this.props.contentSelected){			
			//get image data from content entity coverpicuri property
			console.log("component did mount with contentSelected = " + this.props.contentSelected);
			console.log("this.props.pictures = ", this.props.pictures);
			let contentIds = Object.keys(this.props.contents);
			if(this.props.contentSelected !== null && this.props.contentSelected !== undefined && this.props.contentSelected !== false && this.props.pictures !== undefined){
				console.log("calling getPreviewPic");
				console.log("this.props.contents = ", this.props.contents);
				if(Object.keys(this.props.pictures).length > 0 && contentIds.length > 0){
					console.log('contentSelected = ', this.props.contentSelected);
					this.props.getPreviewPic(this.props.pictures[this.props.contents[this.props.contentSelected].picture].largeuri, this._handleImageReceived);
				}
			}
			this.state.contentId = this.props.contentSelected;
		}
		return (
			<div style={imgFormStyle}>
				<div style={{'position':'relative','width':'auto','padding':'5% 0% 2vh 0%', 'padding-top':'calc(5vh + 25px)', /*'background-color':'#ececec',*/'max-height':'100%', 'height':'100%'}}>
					<img src={this.state.base64Image} style={imgStyle}/>
					<ItemLocationMap visibleItemsMap={this.props.visibleItemsMap}/>
				</div>
			</div>
		)
	}
}

class ImageAdd extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			imagePreviewUrl: ''
		};
		//this._handleImgChange = this._handleImgChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleImgMouseOver = this._handleImgMouseOver.bind(this);
		this._handleImgClick = this._handleImgClick.bind(this);
		this._handleChangesDiscarded = this._handleChangesDiscarded.bind(this);
	}

	//TODO: this event handler gathers entity data for new Outfits only. this does not handle
	//modified entities yet...
	_handleSubmit(fileData) {
		//build normalized json payload
		var json = {contents:[{items:[{}]}]};
		//check if added outfit exists
		if(this.props.addedEntities.outfits.byIds){
			json = Object.assign({}, json, this.props.addedEntities.outfits.byIds['1']);
			//remove id property for server due to this being a newly created entity.  The servier will repopulate the id propterty with a UUID.
			if(json.id !== undefined) json.id = undefined;
			//check if content exist
			if(this.props.addedEntities.outfits.byIds['1'].contents.length > 0){
				let contentId = this.props.addedEntities.outfits.byIds['1'].contents[0];	//Do not modify contentId
				//There should only be one content per post
				json = Object.assign({}, json, {contents: [Object.assign({}, this.props.addedEntities.contents.byIds[contentId])]});		
				//delete client assigned content id.  The servier will repopulate the id propterty with a UUID. 
				if(json.contents[0].id !== undefined) json.contents[0].id = undefined;
				let itemIds = this.props.addedEntities.items.allIds;
				if(itemIds.length > 0){  //Do not modify itemIds
					//There can be multiple items per post
					for(let itemId of itemIds){
						console.log('item itemId = ', itemId);
						console.log('item to be scrubbed = ', this.props.addedEntities.items.byIds[itemId])
						let scrubbedItem = Object.assign({}, this.props.addedEntities.items.byIds[itemId], {
							id: undefined, 
							retailer: this.props.retailers.byIds[this.props.addedEntities.items.byIds[itemId].retailer].id,
							brand: this.props.brands.byIds[this.props.addedEntities.items.byIds[itemId].brand].id
						});						
						//json.contents[0].items = [...json.contents[0].items, scrubbedItem];
						if(json.contents[0].items !== undefined && Object.keys(json.contents[0].items[0]).length > 0 && json.contents[0].items[0].constructor === Object){
							json.contents[0].items = [...json.contents[0].items, scrubbedItem];
						}else{
							json.contents[0].items = [scrubbedItem];
						}

					}
					console.log(json)
					/*console.log(Object.values(this.props.addedEntities.items.byIds));
					json.contents.items = Object.values(this.props.addedEntities.items.byIds);*/
				}else{
					console.log('itemIds is empty array');
				}
			}
			console.log('this.props.addedEntities = ', this.props.addedEntities);
			this.props.postAddedOutfit(fileData, json, this.props.addedEntities);
		}
		console.log('normalized json payload for added outfit: ', json);
	}

	_handleImgMouseOver(event) {

	}

	_handleImgClick(event) {
		console.log("image clicked!!");
		//store clicked location
		//call item form
		let xCoordPercent = (event.pageX - event.target.getBoundingClientRect().left) / event.target.width;
		let yCoordPercent = (event.pageY - event.target.getBoundingClientRect().top) / event.target.height;
		this.props.getItemForm(xCoordPercent, yCoordPercent);
		event.stopPropagation();
		//store.dispatch(setFormVisibility("AddItem"));
		//event.preventDefault();//maybe event.stopPropagation
	}
	_handleOpenFile(event){
		this.props.confirmDiscard
	}

	_handleChangesDiscarded(event){
		//dispatch verificatio modal
		this.props.confirmDiscard();
		event.stopPropagation();
	}

	render() {
		let {imagePreviewUrl} = this.state;
		let $imagePreview = null;
		let defaultImage = "Graphics/photo_upload_icon.svg"
		if (imagePreviewUrl) {
			$imagePreview = (<CroppableImageForm />);
		}else{
			console.log("no img URI detected")
			$imagePreview = null;		
		}

		return (
			<CroppableImageForm 
				imgStyle={imgStyle}
				clientInvalidateEntity={(entityIds, entityType) => this.props.clientInvalidateEntity(this.props.entitiesStateReducer, entityIds, entityType)}
				imgFormStyle={imgFormStyle}
				controlContainerStyle={controlContainerStyle}
				imgFormControlStyle={FormStyles.imgFormControlStyle}
				postAddedOutfit={this._handleSubmit}
				onImageClick={this._handleImgClick}
				discardChanges={this._handleChangesDiscarded}
				itemLocationMap ={<ItemLocationMap visibleItemsMap={this.props.visibleItemsMap}/>}
				entitiesStateReducer={this.props.entitiesStateReducer}
			/>
		)
	}
}

class ImageEdit extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			pictureId: '',
			imagePreviewUrl: '',
			base64Image: null
		};
		//this._handleImgChange = this._handleImgChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleImgMouseOver = this._handleImgMouseOver.bind(this);
		this._handleImgClick = this._handleImgClick.bind(this);
		this._handleChangesDiscarded = this._handleChangesDiscarded.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
		this.pruneAddedEntities = this.pruneAddedEntities.bind(this);
	}

	//returns a denormalized json object modified to comply with the server consumer api spec
	//@param (String) entityType:	 			OxiAppConstant.EntityTypes entity type
	//@param (Object) json: 					json object to be modified
	//@param (string, number) parentId: 		value of the parent Id (optional)
	//@param ([string], [number]) targetIds: 	array of ids that are invalidated (optional).  Item objects not having these ids are filtered adding to the final json object
	pruneAddedEntities(entityType, json, parentId, targetIds){
		switch(entityType){
			case OxiAppConstants.EntityTypes.OUTFIT:
				let invalidatedOutfitId = this.props.entitiesStateReducer.outfits.clientInvalidated;
				json = Object.assign({}, json, this.props.addedEntities.outfits.byIds[invalidatedOutfitId]);					
				//remove ids from child contents array of json object.  This will be filled by content json object
				json.contents = [];
				//remove id for new entities per server api spec.  New entities will have number ids
				if(json.id !== undefined && typeof json.id === 'number'){
					json.id = undefined;
				}
				//prune each child content
				if(this.props.entitiesStateReducer.contents.clientInvalidated.length > 0){
					json = this.pruneAddedEntities(OxiAppConstants.EntityTypes.CONTENT, json);
				}
				break;
			case OxiAppConstants.EntityTypes.CONTENT:
				//let contentId = this.props.addedEntities.outfits.byIds[entitiesStateReducer.outfits.selected].contents[0];
				//There should only be one content entity per post, but this will cover cases for more than 1 modified content entity
				for(let invalidatedContentId of this.props.entitiesStateReducer.contents.clientInvalidated){
					let contentJson = this.props.addedEntities.contents.byIds[invalidatedContentId];
								
					//remove ids from child items array of json object (this will be filled by item json object)
					contentJson.items=[];
					json = Object.assign({}, json, {contents: [...json.contents, contentJson]});
					//prune child picture
					if(this.props.entitiesStateReducer.pictures.clientInvalidated.length > 0){
						json = this.pruneAddedEntities(OxiAppConstants.EntityTypes.PICTURE, json, invalidatedContentId, this.props.entitiesStateReducer.pictures.clientInvalidated);
					}

					//prune each child item
					if(this.props.entitiesStateReducer.items.clientInvalidated.length > 0){
						json = this.pruneAddedEntities(OxiAppConstants.EntityTypes.ITEM, json, invalidatedContentId, this.props.entitiesStateReducer.items.clientInvalidated);
					}
					//Check for an id property having of number type to set to undefined
					if(json.contents[json.contents.length-1].id !== undefined && typeof json.contents[json.contents.length-1].id === 'number'){
						json.contents[json.contents.length-1].id = undefined;
					}
				}
				break;
			case OxiAppConstants.EntityTypes.ITEM:
				//filter the array of targetIds to those that are present in state.entitiesStateReducer.items.clientInvalidated
				let filteredTargetIds = targetIds.filter(targetId => {
					for(let invalidatedId of this.props.entitiesStateReducer.items.clientInvalidated){
						if(targetId === invalidatedId) return true;
					}
					return false;
				});
				//find the json.contents element associated with the parentId
				let contentIndex = -1;
				for(let content of json.contents){
					if(content.id === parentId){
						contentIndex++;
						break;
					}
					contentIndex++;
				}

				for(let invalidatedItemId of filteredTargetIds){
					let itemJson = this.props.addedEntities.items.byIds[invalidatedItemId];
					console.log('itemJson = ', itemJson);
					//Check for an id property having a number type to set to undefined
					if(itemJson.id !== undefined && typeof itemJson.id === 'number'){
						itemJson.id = undefined;
					}
					//Add additional info to item json
					itemJson = Object.assign({}, this.props.addedEntities.items.byIds[invalidatedItemId], {
						retailer: this.props.retailers.byIds[this.props.addedEntities.items.byIds[invalidatedItemId].retailer].id,
						brand: this.props.brands.byIds[this.props.addedEntities.items.byIds[invalidatedItemId].brand].id
					});

					if(json.contents[contentIndex].items !== undefined && json.contents[contentIndex].items.length > 0 /*&& json.contents[contentIndex].items.constructor === Object*/){
						json.contents[contentIndex].items = [...json.contents[contentIndex].items, itemJson];
					}
					//handle the case where items is an empty opbject
					else{
						json.contents[contentIndex].items = [itemJson];
					}	
				}			
				break;
			/*case OxiAppConstants.EntityTypes.PCITURE:				
				let filteredTargetIds = targetIds.filter(targetId => {
					for(let invalidatedId of this.props.entitiesStateReducer.picture.clientInvalidated){
						if(targetId === invalidatedId) return true;
					}
					return false;
				});
				//find the json.contents element associated witht he parentId
				let contentIndex = 0;
				for(let content of json.contents){
					if(content.id === parentId) break;
					contentIndex++;
				}

				console.log('targetIds = ', targetIds);
				console.log('invalidatedIds = ', this.props.entitiesStateReducer.items.clientInvalidated);
				console.log('filteredTargetIds = ', filteredTargetIds); 

				for(let invalidatedPictureId of filteredTargetIds){
					let pictureJson = this.props.addedEntities.pictures.byIds[invalidatedPictureId];
					//
				}*/
			default:
				break
		}
		return json;
	}

	_handleSubmit(fileData){
		var outfitJson = {};
		outfitJson = this.pruneAddedEntities(OxiAppConstants.EntityTypes.OUTFIT, outfitJson);
		//TODO: second parameter to handle multiple file uploads as well as edits/adds to multiple content and item entities.
		switch(true){
			//Either new outfit has been added or outfits non-entity properties have been modified
			case this.props.entitiesStateReducer.outfits.clientInvalidated.length > 0:
				switch(typeof this.props.entitiesStateReducer.outfits.selected){
					//outfit exists on the server
					case 'string':
						this.props.putModifiedOutfit(fileData, this.props.entitiesStateReducer.contents.selected, outfitJson, this.props.addedEntities);
						break;
					//outfit does not exist on the server
					case 'number':
						this.props.postAddedOutfit(fileData, outfitJson.contents[0], outfitJson.id, this.props.addedEntities);
						break;
					default:
						break;
				}
				break;
			//Either new content has been added or contents non-entity properties have been modified
			case this.props.entitiesStateReducer.contents.clientInvalidated.length > 0:
				switch(typeof this.props.entitiesStateReducer.contents.selected){
					case 'string':
						this.props.putModifiedContent(fileData, outfitJson.contents[0], this.props.addedEntities);
						break;
					case 'number':
						this.props.postAddedContent(fileData, outfitJson.contents[0], this.props.entitiesStateReducer.outfits.selected, this.props.addedEntities);
						break;
					default:
						break;
				}
				break;
			case this.props.entitiesStateReducer.items.clientInvalidated.length > 0:
				break;
			default:
				break;
		}
	}

	_handleImageReceived(event, data, picture){
		if(data === null){
			this.setState({
				pictureId: picture.id,
				base64Image: data
			})
		}else{
			this.setState({
				pictureId: picture.id,
				base64Image: 'data:image/jpeg;base64,' + data
			});
		}
	}

	_handleImgMouseOver(event) {

	}

	_handleImgClick(event) {
		console.log("image clicked!!");
		//store clicked location
		//call item form
		let xCoordPercent = (event.pageX - event.target.getBoundingClientRect().left) / event.target.width;
		let yCoordPercent = (event.pageY - event.target.getBoundingClientRect().top) / event.target.height;
		this.props.getItemForm(xCoordPercent, yCoordPercent);
		event.stopPropagation();
		//store.dispatch(setFormVisibility("AddItem"));
		//event.preventDefault();//maybe event.stopPropagation
	}
	_handleOpenFile(event){
		this.props.confirmDiscard
	}

	_handleChangesDiscarded(event){
		//dispatch verificatio modal
		this.props.confirmDiscard();
		event.stopPropagation();
	}

	render() {
		//if(this.props.contentSelected !== null && this.props.contentSelected !== undefined && this.props.pictures !== undefined && this.state.base64Image === null){
		if(this.props.contentSelected !== false){
			console.log("this.props.addedContents = ", this.props.addedContents);
			//check if picture object is not empty
			if(Object.keys(this.props.pictures).length > 0){
				//let contentPicture = this.props.pictures[this.props.contents[this.props.contentSelected].picture];
				console.log('this.props.pictures = ', this.props.pictures);
				console.log('this.props.')
				let contentPictureId = this.props.addedContents[this.props.contentSelected].picture.id;
				console.log('contentPictureId = ', contentPictureId);
				//determin if the selcted content's picture property is different, and thus not loaded in the contentView
				if(contentPictureId !== this.state.pictureId && contentPictureId !== undefined && contentPictureId !== null){
					//check if the picture id is not from a newly added content entity.  If so the content view needs to be nullified
					if(contentPictureId !== ''){
						this.props.getPreviewPic(this.props.pictures[contentPictureId].largeuri, this._handleImageReceived, this.props.pictures[contentPictureId]);//TODO:  refactor fetchImage to just take picture obejct.  OutfitList container calls fetchImage
					}else{
						console.log('calling _handleImageReceived()');
						this._handleImageReceived(null, '', {id: ''});
					}
				}
			}
		}

		return (
			<CroppableImageForm 
				src={this.state.base64Image}
				clientInvalidateEntity={(entityIds, entityType) => this.props.clientInvalidateEntity(this.props.entitiesStateReducer, entityIds, entityType)}

				/*clientInvalidatedContents={props.invalidatedContents}
				clientInvalidatedOutfits={props.invalidatedOutfits}
				clientInvalidatedItems={props.invalidatedItems}*/

				imgStyle={imgStyle}
				imgFormStyle={imgFormStyle}
				controlContainerStyle={controlContainerStyle}
				imgFormControlStyle={FormStyles.imgFormControlStyle}
				postAddedOutfit={this._handleSubmit}
				onImageClick={this._handleImgClick}
				discardChanges={this._handleChangesDiscarded}
				itemLocationMap ={<ItemLocationMap visibleItemsMap={this.props.visibleItemsMap}/>}
				entitiesStateReducer={this.props.entitiesStateReducer}
			/>
		)
	}
}

class ContentView extends React.Component{
	constructor(props){
		super(props);
		this._handlePictureClick = this._handlePictureClick.bind(this);
	}

	componentDidMount(){
		 
	}

	componentWillUnmount(){

	}

	_handleAddOutfitClick(){

	}	

	_handlePictureClick(event, action){
		action();
		event.preventDefault();
	}

	render(){
		var viewContext = null;
		console.log("contentSelected = " + this.props.contentSelected +", viewState = " + this.props.viewState)
		//Set the view state 
		switch(this.props.viewState){
			case OxiAppConstants.viewState.ADD:
				viewContext = OxiAppConstants.viewState.ADD;
				break;
			case OxiAppConstants.viewState.EDIT:
				viewContext = OxiAppConstants.viewState.EDIT;
				break;
			case OxiAppConstants.viewState.PREVIEW:
				viewContext = OxiAppConstants.viewState.PREVIEW;
				break;
			default:
				break;
		}
		//TODO:  verify if this can be deleted
		/*if(this.props.contentSelected != undefined){
			if(this.props.contentSelected != false){
				viewContext = OxiAppConstants.viewState.PREVIEW
			}else{
				console.log("contentSelected is false");
			}
		}else{
			console.log("contentSelected is undefined");
		}*/
		console.log('viewContext = ', viewContext);
		return(
    		<div className={Styles.previewBlock}>    			
				<ShowContentView  
					viewContext={viewContext} 
					addedEntities={this.props.addedEntities}
					entitiesStateReducer={this.props.entitiesStateReducer}
					entityStateReduc
					brands={this.props.brands}
					retailers={this.props.retailers}
					contents={this.props.contents} 
					addedContents={this.props.addedContents}
					contentSelected={this.props.contentSelected} 
					outfitSelected={this.props.outfitSelected}
					getPreviewPic={this.props.getPreviewPic}
					getItemForm={this.props.getItemForm}
					getGestureForm={this.props.getGestureForm} 
					confirmDiscard={this.props.confirmDiscard}
					visibleItemsMap={this.props.visibleItemsMap}
					pictures={this.props.pictures}
					/*clientInvalidatedContents={this.props.invalidatedContents}
					clientInvalidatedOutfits={this.props.invalidatedOutfits}
					clientInvalidatedItems={this.props.invalidatedItems}*/
					clientInvalidateEntity={this.props.clientInvalidateEntity}
					postAddedOutfit={this.props.postAddedOutfit}
					postAddedContent={this.props.postAddedContent}
					putModifiedOutfit={this.props.putModifiedOutfit}
					putModifiedContent={this.props.putModifiedContent}
				/>
				<VisibleContentList />
    		</div>
		);
	}
}

export default ContentView;