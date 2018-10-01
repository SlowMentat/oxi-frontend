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
	'background-color':'#ececec',
	overflow: 'hidden'
}

const controlContainerStyle = {
	'text-align':'center',
	padding: '0 10% 0 10%',
    height: 'calc(5vh + 25px)',
	width:'100%'
}


const ShowContentView = ({viewContext, addedEntities, contentsByIds, contentSelected, getPreviewPic, getItemForm, getGestureForm, postAdditions, brands, retailers, confirmDiscard, visibleItems}) => {
	console.log("in showContentView");
	console.log(viewContext);
	let contentView = null;
	if(viewContext === 'edit'){//OxiAppConstants.ContentViewStates.edit.CROPPING:
		contentView = (
			<ImageUpload addedEntities={addedEntities} brands={brands} retailers={retailers} getItemForm={getItemForm} postAdditions={postAdditions} confirmDiscard={confirmDiscard}/>
		);
	}else if(viewContext === 'view'){//OxiAppConstants.ContentViewStates.edit.PREVIEWING:
	/*case OxiAppConstants.ContentViewStates.edit.TAGGING:
		$contentView = (
			<ImagePreview onClick={getItemForm} postAdditions={postAdditions}/>
		);*/
		contentView = (
			<ImagePreview onClick={getGestureForm} contentsByIds={contentsByIds} contentSelected={contentSelected} getPreviewPic={getPreviewPic} visibleItems={visibleItems}/>
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
			//get image data from content entity coverpicuri property.  
			//TODO:  This will need to be refactored to read filename from Picture entity instead
			console.log("component did mount with contentSelected = " + this.props.contentSelected);
			this.props.getPreviewPic(this.props.contentsByIds[this.props.contentSelected].coverpicuri, this._handleImageReceived);
			this.state.contentId = this.props.contentSelected;
		}
		return (
			<div style={imgFormStyle}>
				<div style={{'position':'relative','width':'auto','padding':'5% 0% 2vh 0%', 'padding-top':'calc(5vh + 25px)', 'background-color':'#ececec','max-height':'100%', 'height':'100%'}}>
					<img src={this.state.base64Image} style={imgStyle}/>
					<ItemLocationMap visibleItems={this.props.visibleItems}/>
				</div>
			</div>
		)
	}
}

class ImageUpload extends React.Component{
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
			if(json.id !== undefined) json.id = undefined;
			//check if content exist
			if(this.props.addedEntities.outfits.byIds['1'].contents.length > 0){
				let contentId = this.props.addedEntities.outfits.byIds['1'].contents[0];	//Do not modify contentId
				//There should only be one content per post
				json = Object.assign({}, json, {contents: [Object.assign({}, this.props.addedEntities.contents.byIds[contentId])]});		
				if(json.contents[0].id !== undefined) json.contents[0].id = undefined;		//delete client assigned content id	
				//json.contents[0].items = [{}];												//set content.items to an array with a single empty object
				//check if items exit
				//let itemIds = this.props.addedEntities.contents.byIds[contentId].items;
				let itemIds = this.props.addedEntities.items.allIds;
				console.log("itemIds = ", itemIds);
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
			this.props.postAdditions(fileData, json, this.props.addedEntities);
		}
		console.log('normalized json payload for added outfit: ', json);
	}

	_handleImgMouseOver(event) {

	}

	_handleImgClick(event) {
		console.log("image clicked!!");
		//store clicked location
		//call item form
		console.log("pageX = ", event.pageX)
		console.log("pageY = ", event.pageY)
		console.log()
		console.log("target width = ", event.target.width)
		console.log('target height = ', event.target.height)
		console.log()
		console.log("top = ", event.target.getBoundingClientRect().top)
		console.log("left = ", event.target.getBoundingClientRect().left)

		let xCoordPercent = (event.pageX - event.target.getBoundingClientRect().left) / event.target.width;
		let yCoordPercent = (event.pageY - event.target.getBoundingClientRect().top) / event.target.height; 	
		
		console.log('xCoord = ', xCoordPercent)	
		console.log('yCoord = ', yCoordPercent)

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
				imgFormStyle={imgFormStyle}
				controlContainerStyle={controlContainerStyle}
				imgFormControlStyle={FormStyles.imgFormControlStyle}
				postAdditions={this._handleSubmit}
				onImageClick={this._handleImgClick}
				discardChanges={this._handleChangesDiscarded}
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
		console.log("contentSelected = " + this.props.contentSelected +", editView = " + this.props.editView)
		if(this.props.editView){
			viewContext = "edit"
		}else if(this.props.contentSelected != undefined){
			if(this.props.contentSelected != false){
				viewContext = "view"
			}else{
				console.log("contentSelected is false");
			}
		}else{
			console.log("contentSelected is undefined");
		}
		return(
    		<div className={Styles.previewBlock}>    			
				<ShowContentView  
					viewContext={viewContext} 
					addedEntities={this.props.addedEntities}
					brands={this.props.brands}
					retailers={this.props.retailers}
					contentsByIds={this.props.contentsByIds} 
					contentSelected={this.props.contentSelected} 
					getPreviewPic={this.props.getPreviewPic}
					getItemForm={this.props.getItemForm}
					getGestureForm={this.props.getGestureForm} 
					postAdditions={this.props.postAdditions}
					confirmDiscard={this.props.confirmDiscard}
					visibleItems={this.props.visibleItems}
				/>
				<VisibleContentList />
    		</div>
		);
	}
}

export default ContentView;