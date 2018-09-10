import React from 'react';
import { connect } from 'react-redux';
import { setFormVisibility, createItem, postImage } from '../../Components/Actions/indexActions.js';
import FormStyles from '../../forms.css';
import Styles from '../../root.css';
import ContentStyles from '../../content.css';
import VisibleContentList from '../Containers/VisibleContentList.js';
import CroppableImageForm from '../../Util/CroppableImageForm.js';
import {} from '../../Util/OxiAppConstants.js';

const imgStyle = {
	//width: 'calc((2 / 3) * (100vh - 40px - 80px))',
	'max-height': 'inherit',
	//height: 'auto',
	'height': 'calc(100% - 80px - 5%)',
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

const imgFormControlStyle = {
    width: '50px',
    height: '50px',
    'background-color': '#eeeeee',
    'border-style': 'solid',
    'border-width': '1px',
    'border-color': '#212121',
    'border-radius': '5px',
    color:'black',
    'text-align':'center',
    'font-size':'80%'
}

const controlContainerStyle = {
	display:'inline-block',
	'margin-left':'-50px',
	width:'5%',
	float:'left'
}


const ShowContentView = ({viewContext, addedEntities, contentsByIds, contentSelected, getPreviewPic, getItemForm, getGestureForm, postChanges}) => {
	console.log("in showContentView");
	console.log(viewContext);
	let contentView = null;
	if(viewContext === 'edit'){//OxiAppConstants.ContentViewStates.edit.CROPPING:
		contentView = (
			<ImageUpload addedEntities={addedEntities} getItemForm={getItemForm} postChanges={postChanges} />
		);
	}else if(viewContext === 'view'){//OxiAppConstants.ContentViewStates.edit.PREVIEWING:
	/*case OxiAppConstants.ContentViewStates.edit.TAGGING:
		$contentView = (
			<ImagePreview onClick={getItemForm} postChanges={postChanges}/>
		);*/
		contentView = (
			<ImagePreview onClick={getGestureForm} contentsByIds={contentsByIds} contentSelected={contentSelected} getPreviewPic={getPreviewPic} />
		);
	}else{
		console.log("nothing selected");
	}
	
	return(
		<div style={{'height':'calc(100% - 80px)'}}>
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
				<div style={{'width':'auto','padding':'5% 0% 5% 0%', 'padding-top':'calc(5vh + 25px)', 'background-color':'#ececec','max-height':'100%'}}>
					<img src={this.state.base64Image} style={imgStyle}/>
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
				json = Object.assign({}, json, {contents: [this.props.addedEntities.contents.byIds[contentId]]});		
				if(json.contents[0].id !== undefined) json.contents[0].id = undefined;		//delete client assigned content id	
				//json.contents[0].items = [{}];												//set content.items to an array with a single empty object
				//check if items exit
				//let itemIds = this.props.addedEntities.contents.byIds[contentId].items;
				let itemIds = this.props.addedEntities.items.allIds;
				console.log("itemIds");
				console.log(itemIds);
				if(itemIds.length > 0){  //Do not modify itemIds
					//There can be multiple items per post
					for(let id of itemIds){
						console.log('item id:');
						console.log(id);
						console.log('item to be scrubbed:')
						console.log(this.props.addedEntities.items.byIds[id]);
						let scrubbedItem = Object.assign({}, this.props.addedEntities.items.byIds[id], {id: undefined});						
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
		}
		console.log('normalized json payload for added outfit:');
		console.log(json);
		this.props.postChanges(fileData, json);
	}

	_handleImgMouseOver(event) {

	}

	_handleImgClick(event) {
		console.log("image clicked!!");
		//store clicked location
		//call item form
		this.props.getItemForm();
		event.stopPropagation();
		//store.dispatch(setFormVisibility("AddItem"));
		//event.preventDefault();//maybe event.stopPropagation
	}
	_handleOpenFile(event){
		this.props.confirmDiscard
	}

	_handleChangesDiscarded(event){
		//dispatch action to removeAndPropogate added Outfit
		//dispatch action to transition into preview mode
		//dispatch action to select previously selected Outfit id (before adding discarded outfit)
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
				imgFormControlStyle={imgFormControlStyle}
				postChanges={this._handleSubmit}
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
					contentsByIds={this.props.contentsByIds} 
					contentSelected={this.props.contentSelected} 
					getPreviewPic={this.props.getPreviewPic}
					getItemForm={this.props.getItemForm}
					getGestureForm={this.props.getGestureForm} 
					postChanges={(imageData = null, json) => {if(imageData != null) postImage(imageData, json);}}
				/>
				<VisibleContentList />
    		</div>
		);
	}
}

export default ContentView;