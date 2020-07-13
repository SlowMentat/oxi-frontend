import React from 'react';
import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	createItem, postImage, 
	batchRequestEntities, 
	putItems,
	putRemoveItems, 
	postItems } from '../../Components/Actions/indexActions.js';

import {
	outfit, 
	outfitsSchema,
	content,
	profileSchema, 
	contents, 
	items, 
	denormalizeOutfit, 
	buildItemContentsObject,
} from '../../Util/Schema.js';

import {
	mapImageUri,
} from '../../Util/Misc.js'

import FormStyles from '../../forms.scss';
import Styles from '../../root.scss';
import ContentStyles from '../../content.scss';
import VisibleContentList from '../Containers/VisibleContentList.js';
import CroppableImageForm from '../../Util/CroppableImageForm.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import ItemLocationMap from './ItemLocationMap.js';
import ItemLocationMapContainer from '../Containers/ItemLocationMapContainer.js';
//import LoaderWrapper from '../../Util/LoaderWrapper.js';
import { Carousel } from '../../Components/Presentations/Carousel.js';

import { 
	Swipeable,
	LEFT,
	RIGHT,
	UP,
	DOWN,
} from '../../Components/Presentations/FitseeUI/Swipeable.js';

import { CircularProgress } from  '@rmwc/circular-progress';
import  '@rmwc/circular-progress/styles';

import { Image } from '../../Components/Presentations/Image.js';
import styled from 'styled-components';
import { desktopRules, mobileRules } from '../../mixin.js';

const imgStyle = {
	height: '100%',
    'max-width': 'calc((100vh - 200px) * var(--img-aspect-ratio))',
	display: 'block',
	'border-radius': '4px',
	'object-fit': 'contain',
	'float':'right',
	'border-top-right-radius':'0px',
	'border-bottom-right-radius':'0px',
}

const imgFormStyle = {
	margin:'auto',
	height:'100%',  
	overflow: 'hidden'
}

const PictureCarousel = styled( props => (
	<Carousel {...props} />
))`
	margin: auto;
	height: 100%;
	overflow: hidden;
`

class ShowContentView extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			loaded: false,
		}

		this._onImgLoading = this._onImgLoading.bind(this);
		this._onImgLoaded = this._onImgLoaded.bind(this);
	}

	_onImgLoading(){
		this.setState(prevState => ({
			...prevState,
			loaded: false,
		}))
	}

	_onImgLoaded(){
		this.setState(prevState => ({
			...prevState,
			loaded: true,
		}))
	}

	render(){
		const {
			contentState,
			images,
		} = this.props;
	
		let contentView = null;		
		const defaultSrc = `https://www.oxisalechannel.com/${OxiAppConstants.ContentDirectories.IMAGES}/no_image_optimized.svg`;
		const selectedContentId = contentState ? contentState.selected : undefined;
	
		//const {
		//	src
		//} = Object.keys(images).length === 0 ?
		//	({src: defaultSrc}) :
		//	selectedContentId ? 
		//		(images[selectedContentId]) : 
		//		({src: defaultSrc}); 
	
		const {
			src
		} = selectedContentId === undefined || selectedContentId === null ?
			({src: defaultSrc}) :
			images[selectedContentId] ? 
				(images[selectedContentId]) : 
				({src: defaultSrc}); 
	
	
		//if(this.props.viewContext === OxiAppConstants.viewState.ADD){
		//	contentView = (
		//		<ImageAdd 
		//			{
		//				...{
		//					...this.props,
		//					src: src,
		//					selectedContentId: selectedContentId,
		//				}
		//			}
//	
		//		/>
		//	);
		//}
	
		if(this.props.viewContext === OxiAppConstants.viewState.PREVIEW){
			contentView = (
				<ImagePreview 
					{
						...{
							...this.props,
							onImgLoading: () => this._onImgLoading(),
							onImgLoaded: () => this._onImgLoaded(),
							selectedContentId: selectedContentId,
							src: src,
						}
					}
				/>
			);
		}
	
		else if(this.props.viewContext === OxiAppConstants.viewState.EDIT || this.props.viewContext === OxiAppConstants.viewState.ADD){
			contentView = (
				<ImageEdit 
					{
						...{
							...this.props,
							onImgLoading: () => this._onImgLoading(),
							onImgLoaded: () => this._onImgLoaded(),
							selectedContentId: selectedContentId,
							src: src,
						}
					}
				/>
			);
		}
	
		else{
			console.log("nothing selected");
		}
		
		return(
			<div 
				className={FormStyles.imageUploadPreviewContainer_div}
				//style={{
				//	//'height':'calc(100vh - 200px)'
				//	//'height':'calc(100vh - 275px + 3vh)'
				//	'height':'100%'
				//}}
			>
				{
				//<LoaderWrapper
				//	loaded={this.state.loaded}
				//	style={{
				//		width: '100px',
   	 			//		//height: '125px',
   	 			//		position: 'absolute',
   	 			//		margin: 'auto',
   	 			//		//border: 'solid 1px #FF9800',
   	 			//		top: 'calc(50% - 20px)',
   	 			//		left: 'calc(50% - 50px)',
   	 			//		'z-index': '10',
   	 			//		display: (this.state.loaded ? 'none' : 'block'),
				//	}}
				///>
				}
				<div className={FormStyles.imageUploadPreview} >
					{contentView}
				</div>			
			</div>
		)
	}
}

class ImagePreview extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			base64Image: null,
			contentId: null,
			imgLoaded: false,
		};
		this._handleImgLoad = this._handleImgLoad.bind(this);
		this._handleImgMouseOver = this._handleImgMouseOver.bind(this);
		this._handleImgClick = this._handleImgClick.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
	}

	componentDidMount(){
	}

	//componentDidUnmount(){
	//}

	_handleImgLoad(event){

		// target width is not the correct value wrt image aspect ratio
		// setting the correct width here before updating webAppView state
		const {
			naturalHeight,
			naturalWidth,
		} = event.target;

		var {
			width,
			height,
		} = event.target;

		var correctedWidth = width;
		const aspect = naturalWidth / naturalHeight;
		
		if(aspect < 1){
			correctedWidth = height * aspect;
		}

		this.props.updateImageDimension(correctedWidth, height);
		//this.props.updateImageDimension(width, height);
	}

	_handleImgMouseOver(event){
	}

	_handleImgClick(event){
	}

	_handleImageReceived(event, data){
		this.props._onLoad();

		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	setSwipeableStyles(div){
		div ? div.style.height = '100%' : null;
	}

	render(){

		const {
			onImgLoading,
			onImgLoaded,
			selectContentView,
			swipeCallback,
			setupImageRef,
		} = this.props;

		const {
			images,
			contentState,
			contents,
			selectedContentId,
			src,
			contentIdsToInd,
		} = this.props;

		var indLength = Object.keys(contentIdsToInd).length;

		//if(this.state.contentId != this.props.contentSelected){
		//	//get image data from content entity coverpicuri property
		//	//console.log("component did mount with contentSelected = " + this.props.contentSelected);
		//	//console.log("this.props.pictures = ", this.props.pictures);
		//	let contentIds = Object.keys(this.props.contents);
		//	if(this.props.contentSelected !== null && this.props.contentSelected !== undefined && this.props.contentSelected !== false && this.props.pictures !== undefined){
		//		//console.log("calling getPreviewPic");
		//		//console.log("this.props.contents = ", this.props.contents);
		//		if(Object.keys(this.props.pictures).length > 0 && contentIds.length > 0){
		//			//console.log('contentSelected = ', this.props.contentSelected);
		//			//check if selected contentId is valid
		//			//TODO: 	race condition this module renders when contentSelect or entitiesReducer.contents changes.  
		//			//			Either content.selected id is invalid, or I'm assuming the content entity will not yet exist in entitiesReducer.contents state. Fix this shit!
		//			if(this.props.contents[this.props.contentSelected] !== undefined){
		//				this.props.getPreviewPic(this.props.pictures[this.props.contents[this.props.contentSelected].picture].largeuri, this._handleImageReceived);
		//			}else{
		//				console.log("invalid contentId in entitiesStateReducer.content.selected state");
		//			}
		//		}
		//	}
		//	this.state.contentId = this.props.contentSelected;
		//}
		//onImgLoading();
		return (
			//<div style={imgFormStyle}>
			//	<Swipeable 
			//		onSwiped={
			//			(e) => swipeCallback(e)
			//		}
			//		delta={30}
			//		innerRef={(div) => {
			//			if(div){
			//				div.style.height = '100%';
			//				isDevice ? null : div.style.maxWidth = 'calc(75vh - 20px)';
			//			}
			//		}} 
			//	>
			//		<div 
			//			style={{
			//				height: '100%',
			//				display: 'flex',
			//				'justify-content': 'flex-start',
			//				'align-items': 'center',
			//				//'max-width': `${isDevice ? `calc(75vh - 20px)` : `unset`}`,
			//				width: (isDevice ? `calc(100vw * ${indLength.length})` : `calc((75vh - 20px) * ${indLength.length})`),
			//				transition: 'transform 300ms ease-in-out',
			//				transform: `translateX(${(-100 / indLength.length) * contentIdsToInd[selectedContentId].ind}%)`,
			//				'will-change':'transform',
			//			}}
			//		>
			<PictureCarousel 
				index={contentIdsToInd[selectedContentId] ? contentIdsToInd[selectedContentId].ind : 0} 
				size={indLength}
				swipeableRef={(div) => {
					if(div){
						div.style.height = '100%';
						isDevice ? null : div.style.maxWidth = 'calc(75vh - 20px)';
					}					
				}}
				swipeCallback={swipeCallback}
			>
					{
						Object.keys(images).map(id => (
							<div 
								key={id} 
								className={FormStyles.previewImageContainer_div}
								style={{'background-color': '#f0f0f0'}}
								//style={{
								//	'position':'relative',
								//	'width':'auto',
								//	'padding-top':'calc(5vh + 25px)', 
								//	'max-height':'100%', 
								//	'height':'100%'
								//}}
							>
								<Image
									//handleImageLoad={e => this._handleImgLoad(e)}
									//onImgLoaded={onImgLoaded}
									setupImageRef={this.props.setupImageRef}
									imgStyle={{'background-color':'#f9f9f9', 'object-fit':'contain'}}
									src={images[id].src}
									imgLoaded={this.state.imgLoaded}
									className={FormStyles.image_img}
									onLoad={e => {
										onImgLoaded();
										this._handleImgLoad(e);
										this.setState(prevState => ({...prevState, imgLoaded: true,}));								
									}}
									showProgress
								/>
								<ItemLocationMapContainer 
									visibleItemsMap={this.props.visibleItemsMap} 
									viewState={this.props.viewContext} 
									populateItemsMap={this.props.populateItemsMap}
									itemMapDimension={this.props.itemMapDimension}
									itemIdHovered={this.props.itemIdHovered}
									changeItemHovered={this.props.changeItemHovered}
						
									selectedContentId = { selectedContentId }
									contents = { contents }
								/>							
							</div>
						))
					}
			</PictureCarousel>
			//		</div>
			//	</Swipeable>
			//</div>
		)
	}
}

// DEPRICATED
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
	_handleSubmit(fileData, crops) {
		const {
			postAddedOutfit,
		} = props;

		const {
			addedEntities,
			entitiesStateReducer,
			itemContent,
			images,
		} = props;
		//build normalized json payload
		var json = {
			contents:[
				{
					items:[{}],
				}
			]
		};

		//check if added outfit exists
		if(addedEntities.outfits.byIds){
			json = Object.assign({}, json, addedEntities.outfits.byIds['1']);
			
			//remove id property for server due to this being a newly created entity.  The servier will repopulate the id propterty with a UUID.
			if(json.id !== undefined) json.id = undefined;

			//check if content exist
			//if(addedEntities.outfits.byIds['1'].contents.length > 0){
			for(let contentId of addedEntities.outfits.byIds['1'].contents){
				//let contentId = addedEntities.outfits.byIds['1'].contents[0];	//Do not modify contentId
				//There should only be one content per post
				//json = Object.assign({}, json, {contents: [Object.assign({}, addedEntities.contents.byIds[contentId])]});
				json = {
					...json,
					contents: [...addedEntities.contents.byIds[contentId]],
				}	

				//delete client assigned content id.  The servier will repopulate the id propterty with a UUID. 
				if(json.contents[0].id !== undefined) json.contents[0].id = undefined;

				let itemIds = addedEntities.items.allIds;

				if(itemIds.length > 0){  //Do not modify itemIds

					//There can be multiple items per post
					for(let itemId of itemIds){
						console.log('item itemId = ', itemId);
						console.log('item to be scrubbed = ', addedEntities.items.byIds[itemId]);

						let scrubbedItem = {
							...addedEntities.items.byIds[itemId], 
							id: undefined, 
							//retailer: retailers.byIds[addedEntities.items.byIds[itemId].retailer].id,
							//retailer: addedEntities.items.byIds[itemId].retailer.name,
							//brand: brands.byIds[addedEntities.items.byIds[itemId].brand].id
							//apparelType: addedEntities.items.byIds[itemId].apparelType.id,
							product: JSON.stringify(addedEntities.items.byIds[itemId].product),
						};	

						//json.contents[0].items = [...json.contents[0].items, scrubbedItem];
						if(json.contents[0].items !== undefined && Object.keys(json.contents[0].items[0]).length > 0 && json.contents[0].items[0].constructor === Object){
							json.contents[0].items = [...json.contents[0].items, scrubbedItem];
						}

						else{
							json.contents[0].items = [scrubbedItem];
						}

					}

					console.log(json)
					/*console.log(Object.values(addedEntities.items.byIds));
					json.contents.items = Object.values(addedEntities.items.byIds);*/
				}

				else{
					console.log('itemIds is empty array');
				}
			}

			//const crops = images.map(id => images[id].crop);
			console.log('addedEntities = ', addedEntities);
			postAddedOutfit(fileData, json, addedEntities, entitiesStateReducer, itemContent.count, crops);
		}

		console.log('normalized json payload for added outfit: ', json);
	}

	_handleImgMouseOver(event) {

	}

	/*_handleImgClick(event) {
		console.log("image clicked!!");
		//store clicked location
		//call item form
		let xCoordPercent = (event.pageX - event.target.getBoundingClientRect().left) / event.target.width;
		let yCoordPercent = (event.pageY - event.target.getBoundingClientRect().top) / event.target.height;
		this.props.getItemForm(xCoordPercent, yCoordPercent);
		event.stopPropagation();
		//store.dispatch(setFormVisibility("AddItem"));
		//event.preventDefault();//maybe event.stopPropagation
	}*/

	_handleImgClick(event) {
		console.log("image clicked!!");
		let xCoordPercent = ((event.pageX === 0 ? event.clientX : event.pageX) - ((event.target.getBoundingClientRect === undefined) ? event.target.x : event.target.getBoundingClientRect().left)) / event.target.width;
		let yCoordPercent = ((event.pageY === 0 ? event.clientY : event.pageY) - ((event.target.getBoundingClientRect === undefined) ? event.target.y : event.target.getBoundingClientRect().top)) / event.target.height;
		this.props.getItemForm(xCoordPercent, yCoordPercent);
		event.stopPropagation();
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
		let defaultImage = "Graphics/photo_upload_icon.svg";

		if (imagePreviewUrl) {
			$imagePreview = (<CroppableImageForm />);
		}else{
			console.log("no img URI detected")
			$imagePreview = null;		
		}

		return (

			<CroppableImageForm 	
				itemLocationMap={
					(itemMapDimension) => (
						<ItemLocationMapContainer 
							visibleItemsMap={this.props.visibleItemsMap} 
							viewState={this.props.viewContext} 
							populateItemsMap={this.props.populateItemsMap}
							itemMapDimension={itemMapDimension}	
							onImageClick={this._handleImgClick}
							simulateImageClick={this.props.simulateImageClick}

							itemIdHovered={this.props.itemIdHovered}
							changeItemHovered={this.props.changeItemHovered}

							contentSelected = {this.props.contentSelected}
							addedContents = {this.props.addedContents}
							contents = {this.props.contents}  />				
					)
				}

				addContentFromImages={this.props.addContentFromImages}
				imgStyle={imgStyle}
				clientInvalidateEntity={(entityIds, entityType) => this.props.clientInvalidateEntity(this.props.entitiesStateReducer, entityIds, entityType)}
				imgFormStyle={imgFormStyle}
				imgFormControlStyle={FormStyles.imgFormControlStyle}
				
				_handleSubmit={this._handleSubmit}
				onImageClick={this._handleImgClick}
				discardChanges={this._handleChangesDiscarded}
				entitiesStateReducer={this.props.entitiesStateReducer}
				setupImageRef={this.props.setupImageRef}
				src={this.props.src}
				viewState={this.props.viewContext} 
				//setupContentViewRef={this.props.setupContentViewRef}
				itemMapDimensions={this.props.itemMapDimensions}
				itemMapDimension={this.props.itemMapDimension}
				addedContents={this.props.addedContents}
				addedContentIds={this.props.addedContentIds}
				updateImageDimension={this.props.updateImageDimension}
				imageElement={this.props.imageElement}

				images 				={ this.props.images }
				pictures			={ this.props.pictures }
				selectedContentId	={ this.props.selectedContentId }
				contentState		={ this.props.contentState }
				updateImageState	={ this.props.updateImageState }
				contentIdsToInd		={ this.props.contentIdsToInd}
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
		this._handleImgLoad = this._handleImgLoad.bind(this);
		this._handleImgMouseOver = this._handleImgMouseOver.bind(this);
		this._handleImgClick = this._handleImgClick.bind(this);
		this._handleChangesDiscarded = this._handleChangesDiscarded.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
		this.pruneAddedEntities = this.pruneAddedEntities.bind(this);

		this.cancelList = [];
	}

	componentWillUnmount(){
		//cancel all cancelable request
		this.cancelList = this.cancelList.map((cancelObj, ind) => {
			
			if(cancelObj.cancel){
				cancelObj.cancel(`Request URI: ${cancelObj.requestURI}`);
			}

			else{
				console.warn('undefined axios cancel function');
			}

			return null;
		});
	}

	//returns a denormalized json object modified to comply with the server's consumer api spec
	//@param (String) entityType:	 			OxiAppConstant.EntityTypes entity type
	//@param (Object) json: 					json object to be modified
	//@param (string, number) parentId: 		value of the parent Id (optional)
	//@param ([string], [number]) targetIds: 	array of ids that are invalidated (optional).  Item objects not having these ids are filtered adding to the final json object
	pruneAddedEntities(entityType, json, parentId, targetIds){
		switch(entityType){

			case OxiAppConstants.EntityTypes.OUTFIT:
				let invalidatedOutfitId = this.props.entitiesStateReducer.outfits.clientInvalidated;
				let selectedOutfitId = this.props.entitiesStateReducer.outfits.selected;
				json = Object.assign({}, json, (this.props.addedEntities.outfits.byIds[invalidatedOutfitId] || this.props.addedEntities.outfits.byIds[selectedOutfitId]));					
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
				let currentInd = 0;

				//let contentId = this.props.addedEntities.outfits.byIds[entitiesStateReducer.outfits.selected].contents[0];
				//There should only be one content entity per post, but this will cover cases for more than 1 modified content entity
				for(let invalidatedContentId of this.props.entitiesStateReducer.contents.clientInvalidated){
					
					let contentJson = {
						...this.props.addedEntities.contents.byIds[invalidatedContentId],
						...(typeof invalidatedContentId === 'number' ? ({id: null}) : ({})),
					};

					//remove ids from child items array of json object (this will be filled by item json object)
					//contentJson.items=[];
					json = {
						...json, 
						...{contents: [...json.contents, contentJson]}
					};

					//prune child picture
					//if(this.props.entitiesStateReducer.pictures.clientInvalidated.length > 0){
					//	json = this.pruneAddedEntities(
					//		OxiAppConstants.EntityTypes.PICTURE, 
					//		json, 
					//		invalidatedContentId, 
					//		this.props.addedEntities.contents.byIds[invalidatedContentId].picture);
					//}

					//prune each child item
					//if(this.props.entitiesStateReducer.items.clientInvalidated.length > 0){
					let itemsJson = [];
					for(let itemId of this.props.addedEntities.contents.byIds[invalidatedContentId].items){
						let itemJson = Object.assign({}, this.props.addedEntities.items.byIds[itemId], {product: JSON.stringify(this.props.addedEntities.items.byIds[itemId].product)});
						if(itemJson.id !== undefined && typeof itemJson.id === 'number'){
							itemJson.id = undefined;
						}						
						itemsJson = [...itemsJson, itemJson];
					}

					//json = this.pruneAddedEntities(OxiAppConstants.EntityTypes.ITEM, json, invalidatedContentId, itemsJson); //this.props.entitiesStateReducer.items.clientInvalidated);
					console.log('TEST 1:  addedEntities = ', this.props.addedEntities.contents.byIds[invalidatedContentId].items);
					json.contents[currentInd].items = itemsJson;
					console.log('TEST 2:  addedEntities = ', this.props.addedEntities.contents.byIds[invalidatedContentId].items);
					console.log('========');
					console.log();
					
					////Check for an id property having of number type to set to undefined
					//if(json.contents[currentInd].id !== undefined && typeof json.contents[currentInd].id === 'number'){
					//	json.contents[currentInd].id = undefined;
					//}
					currentInd++;
				}

				break;

			//case OxiAppConstants.EntityTypes.PICTURE:
			//	const {
			//		images
			//	} = this.props
//
			//	//  targetIds is a single value in this case.
			//	const crop = iamges ? images[targetIds] : ({});
//
			//	json = { 
			//		...json, 
			//		contents: {
			//			...json.contents,
			//			[parentId]:{
			//				...json.contents[parentId],
			//				picture:{
			//					...json.contents[parentId].picture,
			//					crop,
			//				}
			//			}
			//		}
			//	}
//
			//	break;

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
					//let itemJson = this.props.addedEntities.items.byIds[invalidatedItemId];
					//Add additional info to item json
					let itemJson = Object.assign({}, this.props.addedEntities.items.byIds[invalidatedItemId], {
						//retailer: this.props.retailers.byIds[this.props.addedEntities.items.byIds[invalidatedItemId].retailer].id,
						//retailer: this.props.addedEntities.items.byIds[invalidatedItemId].retailer.name,
						//brand: this.props.brands.byIds[this.props.addedEntities.items.byIds[invalidatedItemId].brand].id
						//apparelType: this.props.addedEntities.items.byIds[invalidatedItemId].apparelType.id,
						product: JSON.stringify(this.props.addedEntities.items.byIds[invalidatedItemId].product)
					});

					console.log('itemJson = ', itemJson);

					//Check for an id property having a number type to set to undefined
					if(itemJson.id !== undefined && typeof itemJson.id === 'number'){
						itemJson.id = undefined;
					}

					if(json.contents[contentIndex].items !== undefined && json.contents[contentIndex].items.length > 0 /*&& json.contents[contentIndex].items.constructor === Object*/){
						json.contents[contentIndex].items = [...json.contents[contentIndex].items, itemJson];
					}
					//handle the case where items is an empty opbject
					else{
						json.contents[contentIndex].items = [itemJson];
					}	
				}

				break;

			default:
				break
		}
		return json;
	}

	_handleSubmit(files/*, invalidatedContentId*/, crops){
		var outfitJson = {};
		console.log('addedEntities before call to pruneAddedentities = ', this.props.addedEntities);
		outfitJson = this.pruneAddedEntities(OxiAppConstants.EntityTypes.OUTFIT, outfitJson);
		//TODO: second parameter to handle multiple file uploads as well as edits/adds to multiple content and item entities.
		switch(true){

			//Either new outfit has been added or outfits non-entity properties have been modified
			case this.props.entitiesStateReducer.outfits.clientInvalidated.length > 0:

				switch(typeof this.props.entitiesStateReducer.outfits.selected){
					//outfit exists on the server
					case 'string':
						this.props.putModifiedOutfit(
							files, 
							this.props.entitiesStateReducer.contents.selected, 
							outfitJson, this.props.addedEntities, 
							this.props.entitiesStateReducer, 
							this.props.itemContent.count
						);
						break;
					//outfit does not exist on the server
					case 'number':
						//this.props.postAddedOutfit(files, outfitJson.contents[0], outfitJson.id, this.props.addedEntities, this.props.entitiesStateReducer);
						this.props.postAddedOutfit(
							files, 
							outfitJson, 
							this.props.addedEntities, 
							this.props.entitiesStateReducer, 
							this.props.itemContent.count,
							crops
						);
						break;
					default:
						break;
				}
				break;

			//Either new content has been added or contents non-entity properties have been modified
			case this.props.entitiesStateReducer.contents.clientInvalidated.length > 0:

				//for(let invalidatedContentId of this.props.entitiesStateReducer.contents.clientInvalidated){
					
					// extract contents (with id=null if new content) from outfitJson
					var contents = outfitJson.contents.reduce((accum, content) => ([
						...accum,
						{ 
							...content, 
							id: (typeof content.id === 'number' ? null : content.id) 
						}
					]), []); 

					this.props.uploadContents(
						files,
						contents,
						outfitJson.id, 
						this.props.addedEntities, 
						this.props.entitiesStateReducer,
						this.props.itemContent.count,
						crops
					)

					/*let currentContent = outfitJson.contents.filter(content => content.id === invalidatedContentId)[0];

					switch(typeof invalidatedContentId){//this.props.entitiesStateReducer.contents.selected){
						case 'string':
							console.log('addedEntities before call to putModifiedContent = ', this.props.addedEntities);
							this.props.putModifiedContent(
								files[currentContent.coverpicuri],
								Object.assign({}, currentContent, {id: null}),//contents[0]), 
								outfitJson.id, 
								this.props.addedEntities, 
								this.props.entitiesStateReducer,
								this.props.itemContent.count );
							break;
						case 'number':
							this.props.postAddedContent(
								files[currentContent.coverpicuri],
								Object.assign({}, currentContent, {id: null}),//,contents[0], 
								contents,
								this.props.entitiesStateReducer.outfits.selected, 
								this.props.addedEntities, 
								this.props.entitiesStateReducer, 
								this.props.itemContent.count);
							break;
						default:
							break;
					}*/
				//}
				break;

			//Only item enitties have been modified or added
			case (this.props.entitiesStateReducer.items.clientInvalidated.length > 0 || this.props.entitiesStateReducer.items.clientDeleted.length > 0):
				let payloadJsonPost = {}; 		//payload for new items
				let payloadJsonPut = {};		//payoad for existing items
				let payloadJsonPutRemove = {};	//payload for deleted items
				let postPayloadEmpty = true;
				let putPayloadEmpty = true;
				let putRemovePayloadEmpty = true;

				if(this.props.entitiesStateReducer.items.clientInvalidated.length > 0){
					for(let itemId of this.props.entitiesStateReducer.items.clientInvalidated){
						switch(typeof itemId){

							case 'string':
								//get the parent id
								for(let itemContentId of this.props.addedEntities.itemContent.allIds){
									//add to putPayload
									if(this.props.addedEntities.itemContent.byIds[itemContentId].itemId === itemId){
										let contentId = this.props.addedEntities.itemContent.byIds[itemContentId].contentId;
										let payloadJsonValue = payloadJsonPut[contentId] ? payloadJsonPut[contentId] : [];
										payloadJsonPut = Object.assign({}, payloadJsonPut, {
											[contentId]: [
												...payloadJsonValue, 
												//remove product property from non-custom items in contentJson
												this.props.addedEntities.items.byIds[itemId].platform === null ? 
													Object.assign( {}, this.props.addedEntities.items.byIds[itemId], {'product': undefined, 'sizeChartDto':undefined} ):
													this.props.addedEntities.items.byIds[itemId]
											]
										});
										putPayloadEmpty = false;
									}
								}
								break;

							case 'number':
								//get the parent id
								for(let itemContentId of this.props.addedEntities.itemContent.allIds){
									//add to payload
									if(this.props.addedEntities.itemContent.byIds[itemContentId].itemId === itemId){
										let contentId = this.props.addedEntities.itemContent.byIds[itemContentId].contentId;
										let payloadJsonValue = payloadJsonPost[contentId] ? payloadJsonPost[contentId] : [];
										payloadJsonPost =Object.assign({}, payloadJsonPost, {
											[contentId]: [
												...payloadJsonValue, 
												{
													...this.props.addedEntities.items.byIds[itemId], 
													product: JSON.stringify(this.props.addedEntities.items.byIds[itemId].product),
													id: null
												}
											]
										});
										postPayloadEmpty = false;
									}
								}
								break;
							default:
								break;
						}
					}
				}

				if(this.props.entitiesStateReducer.items.clientDeleted.length > 0){
					for(let deletedItemId of this.props.entitiesStateReducer.items.clientDeleted){
						//Note:  the for loop is perfomed on entitiesReducer.itemContent because addedEntitiesReducer will have had removed the entity wrt the deleted item.
						for(let itemContentId of this.props.itemContent.allIds){
							//get the parent Id
							if(this.props.itemContent.byIds[itemContentId].itemId === deletedItemId){
								let contentId = this.props.itemContent.byIds[itemContentId].contentId;
								let payloadJsonValue = payloadJsonPutRemove[contentId] ? payloadJsonPutRemove[contentId] : [];
								payloadJsonPutRemove = Object.assign({}, payloadJsonPutRemove, {
									[contentId]: [
										...payloadJsonValue, 
										deletedItemId
									]
								});
								putRemovePayloadEmpty = false;
							}
						}
					}
				}
				// DEBUG LOGGING
				//console.log('entitiesStateReducer = ', this.props.entitiesStateReducer);
				//console.log();
				//console.log('putRemovePayloadeEmpty = ',putRemovePayloadEmpty);
				//console.log('putPayloadEmpty = ', putPayloadEmpty);
				//console.log('postPayloadEmpty = ', postPayloadEmpty);
				//console.log()
				//console.log('payloadJsonPutRemove = ', payloadJsonPutRemove);
				//console.log('payloadJsonPut = ', payloadJsonPut);
				//console.log('payloadJsonPost = ', payloadJsonPost);

				let requestPromise = null;
				switch(true){
					case (!putPayloadEmpty && !postPayloadEmpty && !putRemovePayloadEmpty):
						requestPromise = new Promise((resolve, reject) => {
							let status = putItems(payloadJsonPut, this.props.entitiesStateReducer.outfits.selected, ()=>{})();
							console.log('checking status from put request: status = ', status);
							//status === OxiAppConstants.HttpStatus.OK ? resolve(status) : reject(status);
							resolve(status);
						}).then(value => {
							let status = postItems(
								payloadJsonPost, 
								this.props.entitiesStateReducer.outfits.selected, 
								this.props.createResponseHandler(
									this.props.addedEntities, 
									this.props.entitiesStateReducer,
									outfit,
									false,
									this.props.itemContent.count,
									() => this.props.exitEditMode(this.props.entitiesStateReducer)))();
							console.log('checking status from post request: status = ', status);
							//resolve(status);
							//status === OxiAppConstants.HttpStatus.CREATED ? resolve(status) : reject(status);
						}, reason => {
							console.log('rejected: ', reason);
							//throw reason;
						}).then(value => {
							putRemoveItems(
								payloadJsonPutRemove,
								this.props.entitiesStateReducer.outfits.selected,
								this.props.createResponseHandler(
									this.props.addedEntities,
									this.props.entitiesStateReducer,
									outfit,
									false,
									this.props.itemContent.count,
									() => this.props.exitEditMode(this.props.entitiesStateReducer)))();
						}, reason => {
							console.log('rejected: ', reason);
						})/*.catch(error => {
							console.log("error thrown from requestPromise:  " + error);
							//reject(error);
						})*/;
						break;
						
					case (!putPayloadEmpty && !postPayloadEmpty):
						requestPromise = new Promise((resolve, reject) => {
							let status = putItems(payloadJsonPut, this.props.entitiesStateReducer.outfits.selected, ()=>{})();
							console.log('checking status from put request: status = ', status);
							//status === OxiAppConstants.HttpStatus.OK ? resolve(status) : reject(status);
							resolve(status);
						}).then(value => {
							let status = postItems(
								payloadJsonPost, 
								this.props.entitiesStateReducer.outfits.selected, 
								this.props.createResponseHandler(
									this.props.addedEntities, 
									this.props.entitiesStateReducer,
									outfit,
									false,
									this.props.itemContent.count,
									() => this.props.exitEditMode(this.props.entitiesStateReducer)))();
							console.log('checking status from post request: status = ', status);
							//resolve(status);
							//status === OxiAppConstants.HttpStatus.CREATED ? resolve(status) : reject(status);
						}, reason => {
							console.log('rejected: ', reason);
							//throw reason;
						})/*.catch(error => {
							console.log("error thrown from requestPromise:  " + error);
							//reject(error);
						})*/;
						//batchRequestEntities(requestPromise);
						break;

					case (!postPayloadEmpty && !putRemovePayloadEmpty):
						requestPromise = new Promise((resolve, reject) => {
							let status = postItems(
								payloadJsonPost, 
								this.props.entitiesStateReducer.outfits.selected, 
								this.props.createResponseHandler(
									this.props.addedEntities, 
									this.props.entitiesStateReducer,
									outfit,
									false,
									this.props.itemContent.count,
									() => this.props.exitEditMode(this.props.entitiesStateReducer)))();
							console.log('checking status from post request: status = ', status);
							resolve(status);
							//status === OxiAppConstants.HttpStatus.CREATED ? resolve(status) : reject(status);
						}).then(value => {
							putRemoveItems(
								payloadJsonPutRemove,
								this.props.entitiesStateReducer.outfits.selected,
								this.props.createResponseHandler(
									this.props.addedEntities,
									this.props.entitiesStateReducer,
									outfit,
									false,
									this.props.itemContent.count,
									() => this.props.exitEditMode(this.props.entitiesStateReducer)))();
						}, reason => {
							console.log('rejected: ', reason);
						})/*.catch(error => {
							console.log("error thrown from requestPromise:  " + error);
							//reject(error);
						})*/;
						break;

					default:
						if(!putPayloadEmpty){
							//this.props.putModifiedItems(payloadJsonPut, this.props.addedEntities, this.props.entitiesStateReducer);
							putItems(
								payloadJsonPut, 
								this.props.entitiesStateReducer.outfits.selected, 
								this.props.createResponseHandler(
									this.props.addedEntities, 
									this.props.entitiesStateReducer,
									outfit,
									null,
									this.props.itemContent.count,
									() => this.props.exitEditMode(this.props.entitiesStateReducer)))();
						}
						if(!postPayloadEmpty){
							//this.props.postAddedItems(payloadJsonPost, this.props.addedEntities, this.props.entitiesStateReducer);						
							postItems(
								payloadJsonPost, 
								this.props.entitiesStateReducer.outfits.selected, 
								this.props.createResponseHandler(
									this.props.addedEntities, 
									this.props.entitiesStateReducer,
									outfit,
									false,
									this.props.itemContent.count,
									() => this.props.exitEditMode(this.props.entitiesStateReducer)))();
						}
						if(!putRemovePayloadEmpty){
							putRemoveItems(
								payloadJsonPutRemove,
								this.props.entitiesStateReducer.outfits.selected,
								this.props.createResponseHandler(
									this.props.addedEntities,
									this.props.entitiesStateReducer,
									outfit,
									false,
									this.props.itemContent.count,
									() => this.props.exitEditMode(this.props.entitiesStateReducer)))();
						}
						break;
				}				
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


	_handleImgLoad(event){
		//this.props.updateImageDimension(event.target.width, event.target.height);

	}

	_handleImgClick(event) {
		console.log("image clicked!!");
		//store clicked location
		//call item form
		let xCoordPercent = ((event.pageX === 0 ? event.clientX : event.pageX) - ((event.target.getBoundingClientRect === undefined) ? event.target.x : event.target.getBoundingClientRect().left)) / event.target.width;
		let yCoordPercent = ((event.pageY === 0 ? event.clientY : event.pageY) - ((event.target.getBoundingClientRect === undefined) ? event.target.y : event.target.getBoundingClientRect().top)) / event.target.height;
		this.props.getItemForm(xCoordPercent, yCoordPercent);
		//event.stopPropagation();
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
		//methods
		const {
			getPreviewPic,
			updateImageState,
			swipeCallback,
			isCropReused,
		} = this.props;

		//variables
		const {
			addedContents,
			contentSelected,
			pictures,
			contents,
			selectedContentId,
			contentState,
			images,
			src,
			contentIdsToInd,

		} = this.props;

		const {
			pictureId
		} = this.state;


		var indLength = Object.keys(contentIdsToInd).length;

		if(contentSelected !== false){
			//check if picture object is not empty
			if(Object.keys(pictures).length > 0){
				//let contentPicture = pictures[contents[contentSelected].picture];
				let contentPictureId = null;

				if(addedContents[contentSelected] !== undefined){
					contentPictureId = addedContents[contentSelected].picture;
				}

				//determine if the selected content's picture property is different, and thus not loaded in the contentView
				if(contentPictureId !== pictureId && contentPictureId !== undefined && contentPictureId !== null){

					//check if the picture id is not from a newly added content entity.  If so the content view needs to be nullified
					if(contentPictureId !== '' && typeof contentPictureId !== 'number'){
						var cancel;

						this.cancelList = [
							...this.cancelList, 
							{requestURI: pictures[contentPictureId].largeuri, method: cancel}
						];

						//TODO:  refactor fetchImage to just take picture obejct.  OutfitList container calls fetchImage
						getPreviewPic(
							pictures[contentPictureId].largeuri, 
							this._handleImageReceived, 
							pictures[contentPictureId], cancel);
					}

					else{
						//contentPictureId is of type number, which means the picture data is from a local image file
						//force update of pictureId
						this.setState({
							pictureId: contentPictureId,
							base64Image: null
						})
					}
				}
			}
		}

		return (
			//<Swipeable 
			//	onSwiped={
			//		(e) => swipeCallback(e)
			//	}
			//	delta={30}
			//	innerRef={(div) => { div ? div.style.height = '100%' : null; }}
			//>
				<CroppableImageForm 
					itemLocationMap={
						(itemMapDimension) => (
							<ItemLocationMapContainer 
								visibleItemsMap={this.props.visibleItemsMap} 
								viewState={this.props.viewContext} 
								populateItemsMap={this.props.populateItemsMap}
								itemMapDimension={this.props.itemMapDimension}	
								onImageClick={this._handleImgClick}
								simulateImageClick={this.props.simulateImageClick}
	
								itemIdHovered={this.props.itemIdHovered}
								changeItemHovered={this.props.changeItemHovered}
	
								selectedContentId = {selectedContentId}
								addedContents = {addedContents}
								contents = {contents}/>				
						)
					}
					addContentFromImages={this.props.addContentFromImages}
					//src={this.state.base64Image === null ? null : this.state.base64Image.split(',')[1] ? this.state.base64Image : null}
					src={src}
					clientInvalidateEntity={(entityIds, entityType) => this.props.clientInvalidateEntity(this.props.entitiesStateReducer, entityIds, entityType)}
	
					/*clientInvalidatedContents={props.invalidatedContents}
					clientInvalidatedOutfits={props.invalidatedOutfits}
					clientInvalidatedItems={props.invalidatedItems}*/
	
					imgStyle={imgStyle}
					imgFormStyle={imgFormStyle}
					imgFormControlStyle={FormStyles.imgFormControlStyle}
					_handleSubmit={this._handleSubmit}
					onImageClick={this._handleImgClick}
					discardChanges={this._handleChangesDiscarded}
					entitiesStateReducer={this.props.entitiesStateReducer}
					viewState={this.props.viewContext} 
	
					setupImageRef={this.props.setupImageRef}
					//setupContentViewRef={this.props.setupContentViewRef}
	
					itemMapDimension={this.props.itemMapDimension}
					addedContents={this.props.addedContents}
					addedContentIds={this.props.addedContentIds}
					updateImageDimension={this.props.updateImageDimension}
					imageElement={this.props.imageElement}
	
					images 				={ images }
					pictures			={ pictures }
					contents			={ contents }
					selectedContentId	={ selectedContentId }
					contentState		={ contentState }
					updateImageState	={ updateImageState }
					swipeCallback		={swipeCallback}
					indLength			={indLength}
					contentIdsToInd		={contentIdsToInd}

					isCropReused={isCropReused}
				/>
			//</Swipeable>
		)
	}
}


class PicturePreview extends React.Component{
	constructor(props){
		super(props);

		this.imageDataTemplate = {
			cropping:false,
			src: null,
			croppedSrc: null,
			srcFileRef: null,
			imageRef:null,
			//maxHeight: 600,
			//maxWidth: 600 * OxiAppConstants.aspectRatio,
			maxHeight: 'unset',
			maxWidth: 0,
			minYPercent: 0,
			minYPixel: 0,
			//imageX: 0,
			//imageY: 0,
			//imageWidth: 0,
			//imageHeight: 0,
			rotation: 0,
			crop: {
				unit: '%',
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				aspect: OxiAppConstants.aspectRatio,
				savedMaxHeight: 0,
			}
		};

		this.state = {
			imageWidth: 0,
			imageHeight: 0,
			imageRef:null,
			images: {},
			loaded: false,
		};
		//this.image = React.createRef();
		this.updateImageDimension = this.updateImageDimension.bind(this);
		this.setupImageRef = this.setupImageRef.bind(this);
		this._handleResize = this._handleResize.bind(this);
		this._handlePictureClick = this._handlePictureClick.bind(this);
		this.simulateImageClickFactory = this.simulateImageClickFactory.bind(this);
		this.updateImageState = this.updateImageState.bind(this);
		this.removeDiscardedImages = this.removeDiscardedImages.bind(this);
		this.getUsedEntities = this.getUsedEntities.bind(this);
		this.isCropReused = this.isCropReused.bind(this);
	}

	setupImageRef(img){
		const {
			contentState
		} = this.props;

		this.image = img;
		//this.image ? this.image.crossOrigin = "Anonymous" : null;
		this.simulateImageClick = this.simulateImageClickFactory(img).bind(this);
		//this.props.imageResized(image.width, image.height);
		this.setState(prevState => ({
			...prevState,
			imageRef: img,
			images:{
				...prevState.images,
				[contentState.selected] : {
					...this.imageDataTemplate,
					...prevState.images[contentState.selected],					
					imageRef: img,
					crop:{
						...this.imageDataTemplate.crop,
						...(prevState.images[contentState.selected] ? prevState.images[contentState.selected].crop : ({}) ),
					}
				}
			}	
		}))
		//this.forceUpdate();
	}

	// returns true if crop is resused, or false if crop is new
	isCropReused(crop){
		return (
			crop.width != 0 && 
			(
				crop.height != 0 &&
				// Height is assigned to crop.maxHeight in the case of the user adding a new photo.  
				// maxHeight may be 'unset' during component updates until its value is calculated 
				// in _onCropImageLoaded in CroppableImageForm.js. 
				crop.height != 'unset'
			)
		);
	}

	updateImageState(images){
		
		//const contentIds = Object.keys(images).reduce((accum, id) => {
		//	return({
		//		...accum,
		//		[id]:{
		//			...accum.id,
		//			...images.id,
		//		}
		//	});
		//}, prevState.images);

		this.setState(prevState => ({
			...prevState,
			images:{
				...(Object.keys(images).reduce((prevImages, id) => {
					var crop = {};

					switch(true){
						// New crop
						case !prevImages[id] || (prevImages[id].crop && !this.isCropReused(prevImages[id].crop)):
							console.log("new crop");
					
							crop = {
								...images[id].crop,
								...(
									// Load crop from redux state if images crop width exists.  Note, redux crop state is passed as images parameter in this case.
									this.isCropReused(images[id].crop) ? 
										{} : 
										{
											height: images[id].maxHeight,
											width: images[id].maxWidth,											
										}
								),
							};					
							break;
					
						// Change crop
						case images[id].crop && this.isCropReused(images[id].crop):
							console.log("changing crop");
							crop = {...prevImages[id].crop, ...images[id].crop};
							break;
					
						// Revert to crop in component state
						default:
							console.log("reverting crop");
							crop = {...prevImages[id].crop};
							break;
					}
					
					/*if(prevImages[id]){
						crop = {
							...prevImages[id].crop,
							height: images[id].maxHeight,
							width: images[id].maxWidth,
						};

						if(prevImages[id].crop && prevImages[id].crop.height !== 0 && prevImages[id].crop.width !== 0){
							crop = prevImages[id].crop;
						}
					}*/

					return({
						...prevImages,
						[id]:{
							...prevImages[id],
							...images[id],
							crop:{
								...crop,
								//...( prevImages[id] ? prevImages[id].crop : ({}) ), //if [id] exists in prevImagesulator, spread its crop property
								//...( images[id].crop.height !== 0 && images[id].crop.width !== 0 ? images[id].crop :  ({}) ),  // If the provided image has a crop height or width of 0, use crop dimensions from previous state.
							},
							imageRef: (images[id].imageRef || this.image),
							// When a user reenters crop (case: revert to crop), crop.savedMaxHeight will contain maxHeight of the original image (uncropped image from previous state).
							// This is done to avoid recalculating the image's maxHeight when the user reenters crop mode.
							// Since the previous crop dimensions are re-used when the user reenters crop mode, a subsequent recalc of the images will trigger ReactCrop component to catch an on change event.
							// This will alter the crop dimensions proportional to the change in maxHeight
							...(crop.savedMaxHeight != 0 ? ({maxHeight: crop.savedMaxHeight}) : ({}) ),
						}
					});
				}, prevState.images))				
			}
		}));
	}


	simulateImageClickFactory(imageElement){
		return((x, y) => {
			var event = new MouseEvent('click', {
				view: window,
				bubbles: true,
				cancelable: true,
				target: imageElement,
				clientX: x,
				clientY: y,
			});
			imageElement.dispatchEvent(event);
		});
	}

	updateImageDimension(width, height){
		console.log(`ContentView#updateImageDimension: calling imageResized( width:${width}, height:${height} )`);
		this.props.imageResized(width, height);
	}

	_handleResize(event){
		console.log(`ContentView#_handleResize: calling _handleResize( width:${this.image.clientWidth}, height:${this.image.clientHeight} )`);
		//this.updateImageDimension(this.image.clientWidth, this.image.clientHeight);
		this.props.imageResized(this.image.clientWidth, this.image.clientHeight); 
		//this.props.contentViewResized(this.contentViewRef.clientWidth, this.contentViewRef.clientHeight);
	}

	componentDidMount(){
		window.addEventListener('resize', this._handleResize);
		//this.props.contentViewResized(this.contentViewRef.clientWidth, this.contentViewRef.clientHeight);

		//methods
		const {
			getPreviewPic
		} = this.props;

		//variables
		const {
			pictures, 	
			contents, 	
			outfits, 
			addedContents,
			addedOutfits,

			contentState, 
			outfitState, 
			itemState, 	
			pictureState, 

			viewState,
		} = this.props;

		const { 
			usedContents,
			usedOutfits,

		} = this.getUsedEntities();/*(viewState === OxiAppConstants.viewState.PREVIEW) ? 
			({ 
				usedContents: contents, 
				usedOutfits: outfits,
			}) : 
			({ 
				usedContents: addedContents, 
				usedOutfits: addedOutfits,
			});*/

		//fetch all images associated with the outfit selected
		//update state with base64 data from images
		const getAllImages = (this2) => async (images, onComplete) => {
			try {		
				const callBack = (event, data, picture) => ({
					...this2.imageDataTemplate, 
					...{src: OxiAppConstants.encodingPrefixes.JPEG.BASE64 + data}
				});
			
				//loop through content children of selected outfit
				for(let id of usedOutfits.byIds[outfitState.selected].contents){
					var pictureId = usedContents.byIds[id].picture;

					if(pictureId.length > 0){
						//var largePicURI =  pictures.byIds[pictureId].largeuri;		
						var largePicURL = OxiAppConstants.getImageURL(pictures.byIds[pictureId].largeuri, 3);
						//var result = await getPreviewPic(largePicURI, callBack, pictures.byIds[pictureId]);	//base54 data
						
						var result = {
							...this2.imageDataTemplate,
							//src:`${OxiAppConstants.webAppBaseURL}${mapImageUri(`${largePicURI}.jpg`)}`, 
							src: largePicURL, 
							croppedSrc: largePicURL, 
						}

						images[id] = result;
					}
					else{
						images[id] = {};
					}
				}
	
				//resolve(images);
				onComplete(images)
			}
			catch(error){
				console.error(error);
			}			
		}

		getAllImages(this)({}, (images) => {
			this.setState(prevState => ({
				...prevState,
				images:{
					...prevState.images,
					...images,
				}
			}));
		});
	}

	//componentDidUnmount(){
	//}

	componentWillUnmount(){
		window.removeEventListener('resize', this._handleResize);
	}

	_handleAddOutfitClick(){

	}	

	_handlePictureClick(event, action){
		action();
		event.preventDefault();
	}

	getUsedEntities(){	
		const {
			addedOutfits,
			addedContents,
			outfits,
			contents,
			viewState

		} = this.props;

		const { 
			usedContents,
			usedOutfits,
		} = (viewState === OxiAppConstants.viewState.PREVIEW) ? 
			({ 
				usedContents: contents, 
				usedOutfits: outfits,
			}) : 
			({ 
				usedContents: addedContents, 
				usedOutfits: addedOutfits,
			});

		return({
			usedContents,
			usedOutfits,
		})
	}

	//Reference redux state to identify existing content Ids to 
	//use in rebuilding the images object in this component state.
	//This will discard any previosly added images to components images object
	removeDiscardedImages(){
		//variables
		const { 	
			contents, 	
			outfits, 
			outfitState,
		} = this.props;

		let keys = Object.keys(this.state.images);
		let keptImages = {};

		//only execut this block if removedDiscardedImages was NOT called after transitioning from an 'add' viewState
		if(outfitState.selected !== 1 && outfits.byIds[outfitState.selected]){
			for(let contentId of outfits.byIds[outfitState.selected].contents){
				keptImages = {
					...keptImages,
					[contentId]: this.state.images[contentId],
				}
			}
		}

		this.setState(prevState => ({
			...prevState,
			images:{
				...keptImages,
			}
		}))
	}

	render(){
		const {
			selectContentView,
		} = this.props;

		const {
			viewState,
			outfits,
			outfitIdSelected,
			contentSelected,
		} = this.props;

		var {
			usedOutfits,
			usedContents,
		} = this.getUsedEntities();

		var viewContext = null;
		var contentIdsToInd = {};
		
		// build data object that tracks contiguous content ids associated with the selected outfit
		if(usedOutfits.byIds[outfitIdSelected]){
			contentIdsToInd = usedOutfits.byIds[outfitIdSelected].contents.reduce((accum, val, ind, arr) => ({
				...accum, 
				[val] : {
					ind, 
					prev: arr[ind - 1],
					next: arr[ind + 1],
				}
			}), contentIdsToInd);
		}
		
		console.log("contentSelected = " + this.props.contentSelected +", viewState = " + this.props.viewState);

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

		//check if state.images contians any recently discarded images and remove them.
		//ASSUMPTION: if a discarded image/s exists, there is guaranteed to be at least one discarded image object with key == 1
		if(viewState === OxiAppConstants.viewState.PREVIEW && Object.keys(this.state.images).filter(key => key == 1).length > 0){
			this.removeDiscardedImages();
		}

		return(
    		<div className={Styles.previewBlock}>    			
				<ShowContentView  
					{
						...{
							viewContext: viewContext,
							updateImageState: this.updateImageState,
							imageElement: this.image,
							setupImageRef: this.setupImageRef,
							updateImageDimension: this.updateImageDimension,
							simulateImageClick: this.simulateImageClick,
							images: this.state.images,
							itemMapDimension: {width: this.props.imageWidth, height: this.props.imageHeight},
							contentIdsToInd: contentIdsToInd,
							isCropReused: this.isCropReused,
							swipeCallback: (event) => {
	
								var prevId = contentIdsToInd[contentSelected] ? contentIdsToInd[contentSelected].prev : null;
								var nextId = contentIdsToInd[contentSelected] ? contentIdsToInd[contentSelected].next : null;
	
								switch(true){
									case event.dir === LEFT:
										nextId ? selectContentView(nextId) : null;
										break;
	
									case event.dir === RIGHT:
										prevId ? selectContentView(prevId) : null;
										break;
	
									default:
										break;
								}
							},
							...this.props
						}
					}
				/>
					<div style={{width: 'calc(100% - 400px)'}}>
						<div 
							style={{
								...(isDevice ? 
									({}) :
									({
										width: (this.image === undefined || this.image === null) ? '0px' : 'calc(400px + 100%)',//`${this.image.clientWidth}px`,
										display: (this.image === undefined || this.image === null) ? 'none' : this.image.clientWidth > 0 ? 'block' : 'none',
										'margin-right': '-400px',
										'background-color': '#a9a9a9',
									})),
							}}
							className={FormStyles.contentListContainer_div}
						>
							<VisibleContentList contentViewImage={this.image}/>
						</div>
					</div>
    		</div>
		);
	}
}

export default PicturePreview;