import React from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
//import {ReactCropStyles} from 'react-image-crop/dist/ReactCrop.css';
import {ReactCropStyles} from '../reactCrop.css';
import FormStyles from '../forms.css';

import {OxiAppConstants} from './OxiAppConstants.js';
import {FileUploadIcon} from '../Components/SvgAssets/Icons/FileUploadIcon.js';
//import DiscardIcon from '../Components/SvgAssets/Icons/DiscardIcon.js';
//import CropIcon from '../Components/SvgAssets/Icons/CropIcon.js';
//import OkIcon from '../Components/SvgAssets/Icons/OkIcon.js';
import {SvgIcon} from '../Components/SvgAssets/SvgIcon.js';

/**
 * @param {File} image - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
 * @param {String} fileName - Name of the returned file in Promise
 */
function getCroppedImg(data, pixelCrop, fileName, imageWidth, imagHeight) {
	return new Promise((resolve, reject) => {
		var image = new Image();
		image.src = data;
		image.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = pixelCrop.width*image.width/100;
			canvas.height = pixelCrop.height*image.height/100;
			const ctx = canvas.getContext('2d');
			console.log('image width');
			console.log(image.width);
			console.log('image height');
			console.log(image.height);
			ctx.drawImage(
				image,
				pixelCrop.x*image.width/100,	//x coordinate of the top left corner of the sub-rectagle of the source image to draw into the destination context
				pixelCrop.y*image.height/100,	//The Y coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
				canvas.width,					//The width of the sub-rectangle of the source image to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by sx and sy to the bottom-right corner of the image is used.
				canvas.height,					//The height of the sub-rectangle of the source image to draw into the destination context.
				0,								//The X coordinate in the destination canvas at which to place the top-left corner of the source image.
				0,								//The Y coordinate in the destination canvas at which to place the top-left corner of the source image.
				canvas.width,					//The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
				canvas.height 					//The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
			);
			resolve(canvas.toDataURL('image/jpeg', 0.7));
		};
	});
	// As Base64 string
	// const base64Image = canvas.toDataURL('image/jpeg');
	//return canvas.toDataURL('image/jpeg');
	// As a blob

	/*return new Promise((resolve, reject) => {
		canvas.toBlob(file => {
			file.name = fileName;
			resolve(file);
		}, 'image/jpeg');
	});*/
}


class CroppableImageForm extends React.Component{
	constructor(props){
		super(props);
		this.fileRefs=[];

  		this.frStateNames = {
  			[FileReader.EMPTY]   : 'EMPTY',
  			[FileReader.LOADING] : 'LOADING',
  			[FileReader.DONE]    : 'DONE',
  		}

		this.imageDataTemplate = {
			cropping:true,
			src: null,
			srcFileRef: null,
			maxHeight: 600,
			maxWidth: 600 * OxiAppConstants.aspectRatio,
			imageX: 0,
			imageY: 0,
			imageWidth: 0,
			imageHeight: 0,
			crop: {
				x: 25,
				y: 0,
				width: 0,
				height: 0,
				aspect: OxiAppConstants.aspectRatio
			}
		};

		this.state = {
			images:{
				[this.props.entitiesStateReducer.contents.selected]: {...this.imageDataTemplate}
			},
			fileUploadHovering: false,
			submitHovering: false,
			cropHovering:false,
			discardHovering:false,
		}
		this.fileRefs=[];

		this._handleSubmit = this._handleSubmit.bind(this);
		this._onSelectFile = this._onSelectFile.bind(this);
		this._onImageLoaded = this._onImageLoaded.bind(this);
		this._onSelectMultipleFiles = this._onSelectMultipleFiles.bind(this);
		this._onCropComplete = this._onCropComplete.bind(this);
		this._onCropChange = this._onCropChange.bind(this);
		this._handleAcceptCrop = this._handleAcceptCrop.bind(this);
		this._handleImageLoad = this._handleImageLoad.bind(this);
		//this.simulateImageClick = this.simulateImageClick.bind(this);
		this._handleIconHover = this._handleIconHover.bind(this);
		this.setupCropImgRoot = this.setupCropImgRoot.bind(this);
		this.getImageSrc = this.getImageSrc.bind(this);
	}

	componentDidUpdate(prevProps){

		//Single addition 
		//Multiple addition
		//Single removal (multiple removal not allowed)
		if(prevProps.addedContentIds.length !== this.props.addedContentIds.length){

			console.log('CroppableImageForm#componentDidUpdate:  Changing state');		

			const loadAllImages = async (this1) => {	
				var postLoadTasks = [];
				var taskInd = 0;
				let images = {};
				var readers = [];

				for(let id of this1.props.addedContentIds){
					this1.currentId = id;
					//async function loadImagesInState(props, fileRefs, currentId){
					////ignore persisted contents (those with uuid string id values)
					//	if(typeof currentId === 'number'){
					//		let imageLoading = new Promise((resolve, reject) => {
					//			resolve(reader.readAsDataURL(fileRefs[props.addedContents[currentId].coverpicuri]));
					//		});
					//		//wait for image to finish loading into state before continuing
					//		await imageLoading;
					//	}
					//}
					//loadImagesInState(this1.props, this1.fileRefs, this1.currentId);
	
					if(typeof id === 'number'){
						readers[taskInd] = new FileReader();
						//var file = this1.fileRefs[this1.props.addedContents[`${id}`].coverpicuri];
	
						let getOnloadHandler = (contentId, this2, images, ti) => ((event) => {
							console.log(`image loaded for content id: ${contentId}`);
							postLoadTasks[ti] = new Promise((resolve, reject) => {
								console.log(`int post-loading task #${ti}`);
								Object.assign(images, {
									...images,
									[`${contentId}`]:{
										//...images[contentId],
										...this2.imageDataTemplate,
										srcFileRef: this2.props.addedContents[contentId].coverpicuri,
										src: readers[ti].result,
										cropping: true								
									}
								})
								console.log(`post-loading task #${ti}: images updated`, images);
							});
							postLoadTasks[ti];
						});
	
						readers[taskInd].addEventListener("load", getOnloadHandler(id, this1, images, taskInd));
			
						readers[taskInd].onError = (e) => {
							throw e;
						}
	
            			//Only pics
            			//if (!file.type.match('image/jpeg') ) continue;
            			//else {throw error('unsupported file format')}
						readers[taskInd].readAsDataURL(this1.fileRefs[this1.props.addedContents[`${id}`].coverpicuri]);
					}
					taskInd++;
	
					//try{
					//	while(reader.readyState === FileReader.LOADING){
					//		//loading in progress
					//		console.log('reader.readyState = ', this1.frStateNames[reader.readyState]);
					//	}
					//}catch(e){
					//	console.log('during multifile upload', e);
					//	break;
					//}
				}

				await Promise.all(postLoadTasks);
				return images;
			};
			
			loadAllImages(this).then(response => {

				console.log('about to update state');
				let images = Object.assign(response, this.state.images);
				console.log(images);
				this.setState(prevState => ({
					...prevState,
					images
					//images: {
					//	...prevState.images,
					//	...response
					//}
				}));
			});
		}
		//Single modification (multiple modification not allowed)
		else{

			//check coverpicuri of each addedContent entity to see if any filenames have changed, which would indicate file has changed
			for(let id of this.props.addedContentIds){
				if(this.props.addedContents[id].coverpicuri !== prevProps.addedContents[id].coverpicuri){

				}
			}
		}
	}

	_handleSubmit(e) {
		e.preventDefault();
		// TODO: do something with -> this.state.file 
		//postAddedOutfit(this.state.file);
		this.state.images[this.selectedContentId].cropping ?  
			console.log('please finish cropping before submiting image') : 
			(this.props.entitiesStateReducer.pictures.clientInvalidated.length > 0) ? //TODO:  should be ... > 0
				this.props.postAddedOutfit(this.state.images[this.selectedContentId].src) :
				this.props.postAddedOutfit(null);
		//event.preventDefault();
	}

	_handleAcceptCrop(event){
		if(this.state.images[this.selectedContentId].cropping){
			getCroppedImg(
				(this.state.images[this.selectedContentId].src || this.props.src), 
				this.state.images[this.selectedContentId].crop, 
				'croppedResult', 
				this.state.images[this.selectedContentId].maxWidth, 
				this.state.images[this.selectedContentId].maxHeight
			)
			.then(croppedFile => {				
				this.setState(prevState => ({
					...prevState,
					images:{
						...prevState.images,
						[this.selectedContentId]:{
							src: croppedFile,
							cropping: !this.state.images[this.selectedContentId].cropping
						}
					}
				}));
			})
		}else{			
			this.setState(prevState => ({
				...prevState,
				images:{
					...prevState.images,
					[this.selectedContentId]:{
						cropping: !this.state.images[this.selectedContentId].cropping
					}
				}
			}));
		}
	}

	/*
	* creates references to all selected images (up to max allowned content entities) 
	* Then adds content entites to addedEntitiesReducer with contet.coverpicuri set to a corresponding image file reference
	*/
	_onSelectMultipleFiles(event){

		let newFileRefs = {}		
		let currentCount = Object.keys(this.fileRefs).length;
		let addCount = 1;

		for(var i=0; i < event.target.files.length; i++){
			
			if(currentCount + addCount < 7){
				//make sure file reference does not already exist in this.fileRefs
				if (this.fileRefs[event.target.files[i].name] === undefined){
					newFileRefs = Object.assign({}, newFileRefs, {[event.target.files[i].name]: event.target.files[i]} );				
				}else{
					console.log('Image is already being editted.  Remove image from editor before adding again')
				}
			}else{
				console.log("image count limit reached")
				break;
			}
			addCount++;
		}

		this.fileRefs = Object.assign({}, this.fileRefs, newFileRefs );
		if(Object.keys(newFileRefs).length > 0) this.props.addContentFromImages(newFileRefs);
	}

	_onSelectFile(event){
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.onloadend = () => {
				this.setState({
					src: reader.result,
					cropping: true
				})
			}
			// reader.addEventListener('load',(this) => this.setState({src: reader.result}), false);
			reader.readAsDataURL(event.target.files[0]);
			//invalidate the selected content once file data has been changed or added
			console.log('calling clientInvalidateEntity() from CroppableImageForm.js');
			//this.props.clientInvalidateEntity(this.props.addedEntities.contents[this.props.entitiesStateReducer.contents.selected].items),  OxiAppConstants.EntityTypes.ITEM)();
			this.props.clientInvalidateEntity([this.props.entitiesStateReducer.contents.selected], OxiAppConstants.EntityTypes.CONTENT)();
			this.props.clientInvalidateEntity([this.props.entitiesStateReducer.contents.selected], OxiAppConstants.EntityTypes.PICTURE)();
		}
	}

	_onImageLoaded(image){
		console.log(`CroppableImageForm#_onImageLoaded:  calling updateImageDimension( width:${image.width}, height:${image.height} )`)
		this.props.updateImageDimension(image.width, image.height);

		//TODO:  crop dimensions aren't being initialized
		//set crop dimensions if dimension they have not already been set by user
		if(this.state.images[this.selectedContentId].crop.height === 0 || this.state.images[this.selectedContentId].crop.width === 0 ){
			console.log('initializing crop');
			this.setState(prevState => ({	
				...prevState,
				images:{
					...prevState.images,
					[this.selectedContentId] : {
						...this.state.images[this.selectedContentId],
						crop: {
							...this.state.images[this.selectedContentId].crop,
							...makeAspectCrop({
							 	x: this.state.images[this.selectedContentId].crop.x,
							 	y: this.state.images[this.selectedContentId].crop.y,
							 	aspect: 2 / 3,
							 	width: this.state.images[this.selectedContentId].crop.width,
							 	height: this.state.images[this.selectedContentId].crop.height
							}, image.width / image.height)
						}
					}
				},
			}));
		}
	}

	_onCropComplete(crop){
	 	console.log('onCropComplete', crop);
		//May be fine with having this called made in _onSelectFile only depending on the crop initiation logic 
	}

	_onCropChange(crop){
	 	//this.setState({ crop });
		this.setState(prevState => ({	
			...prevState,
			images:{
				...prevState.images,
				[this.selectedContentId] : {
					...this.state.images[this.selectedContentId],
					crop
				}
			},
		}));
	}

	_handleImageLoad(event){
		//this.setState({
		//	imageX: event.target.getBoundingClientRect().left,
		//	imageY: event.target.getBoundingClientRect().top,
		//	imageWidth: event.target.width,
		//	imageHeight: event.target.height,
		//})
		this.setState(prevState => ({	
			...prevState,
			images:{
				...prevState.images,
				[this.selectedContentId] : {
					...this.state.images[this.selectedContentId],
					imageX: event.target.getBoundingClientRect().left,
					imageY: event.target.getBoundingClientRect().top,
					imageWidth: event.target.width,
					imageHeight: event.target.height,
				}
			},
		}));
	}

	_handleIconHover(event, icon, hovering){
		switch(icon){
			case 'file':
				this.setState({
					fileUploadHovering: hovering,
				})
				break;
			case 'submit':
				this.setState({
					submitHovering: hovering,
				})
				break;
			case 'crop':
				this.setState({
					cropHovering: hovering,
				})
				break;
			case 'discard':
				this.setState({
					discardHovering: hovering,
				})
				break;
			default:
				break;
		}
	}

	setupCropImgRoot(div){
		this.cropImgRoot = div;
	}

	getImageSrc(){
		let imageSource = 
			(this.state.images[this.selectedContentId].src || this.props.src) || 
			("https://www.oxisalechannel.com/" + OxiAppConstants.ContentDirectories.IMAGES + "/no_image_optimized.svg");

		//if(this.state.images[this.selectedContentId].srcFileRef !== null && 
		//	this.state.images[this.selectedContentId].src === null &&
		//	typeof this.selectedContentId === 'number'){ 
		//	//Must assign src to the result of processing srcFileRef reference through a FileReader	
		//	const reader = new FileReader();
		//	reader.onloadend = () => {
		//		this.setState(prevState => ({
		//			...prevState,
		//			images:{
		//				...prevState.images,
		//				[this.selectedContentId]:{
		//					...prevState.images[this.selectedContentId],
		//					src: reader.result,
		//					//cropping: true
		//				}
		//			}
		//		}))
		//	}
		//	reader.readAsDataURL(this.fileRefs[this.state.images[this.selectedContentId].srcFileRef]);
		//}

		return imageSource;
	}

	render(){
		this.selectedContentId = this.props.entitiesStateReducer.contents.selected;
		let submitButton = (this.state.submittable ? (<button id="submitButton" type="submit" onClick={this._handleSubmit} style={{display:'none'}}>Upload Image</button>) : null);
		let content = null;
		let {imageElement} = this.props

		if(this.state.images[this.selectedContentId]){
			if(this.state.images[this.selectedContentId].cropping){
				content = (
					<ReactCrop
						className={ReactCropStyles}
						/*additionalStyles={(
							imageElement.naturalWidth > imageElement.naturalHeight ? 
								({
									height: `${imageElement.height}px`,
									'margin-top': `calc(50% - ${imageElement.height}px/4)`,
								}) : 
								({})
						)}*/
						cropImgRoot={this.cropImgRoot}
						src={this.getImageSrc()}//{(this.state.images[this.selectedContentId].src || this.props.src) || ("https://www.oxisalechannel.com/" + OxiAppConstants.ContentDirectories.IMAGES + "/no_image_optimized.svg")}
						crop={this.state.images[this.selectedContentId].crop}
						onImageLoaded={this._onImageLoaded}
						onComplete={this._onCropComplete}
						onChange={this._onCropChange}
						setupImageRef={this.props.setupImageRef}
						//setupCropImgContainerRef={this.setupCropImgContainerRef}
					/>
				)
			}else{
				this.state.images[this.selectedContentId].crop.height
				content = (
					<img 
						style={Object.assign({}, this.props.imgStyle)} 
						src={this.getImageSrc()}//{(this.state.src || this.props.src) || ("https://www.oxisalechannel.com/" + OxiAppConstants.ContentDirectories.IMAGES + "/no_image_optimized.svg")} 
						onClick={this.props.onImageClick} 
						onLoad={this._handleImageLoad} 
						ref={this.props.setupImageRef}/>
				)
			}
		}		
		let validImageElement = (this.props.imageElement !== null && this.props.imageElement !== undefined);
		return (
			<div style={this.props.imgFormStyle}>
				<div
					className={FormStyles.controlContainerStyle} 
					style={{
						width:`${validImageElement ? this.props.imageElement.clientWidth : 0}px`,
						display: (validImageElement && this.props.imageElement.clientWidth > 0) ? 'inline-flex' :  'none'
					}} >
					<label 
						for="fileInput" 
						style={{
							'margin-right':'5%',
							'width':'7%'
						}}>
						<div 
							className={this.props.imgFormControlStyle} 
							style={{width:'100%'}}
							onMouseOver={(event) => this._handleIconHover(event, 'file', true)}
							onMouseLeave={(event) => this._handleIconHover(event, 'file', false)}>
								<SvgIcon name={'FileUploadIcon'} hovered={this.state.fileUploadHovering}/>
						</div>
					</label>				
					<div 
						className={this.props.imgFormControlStyle} 
						style={{
							//width:'5%',
							'padding-left':'1%',
							'padding-right':'1%',
						}}
						onClick={this._handleAcceptCrop}>						
						<SvgIcon name={'CropIcon'} />
					</div>
					<div 
						className={this.props.imgFormControlStyle} 
						onClick={this.props.discardChanges}
						onMouseOver={(event) => this._handleIconHover(event, 'discard', true)}
						onMouseLeave={(event) => this._handleIconHover(event, 'discard', false)}>							
						<SvgIcon name={'DiscardIcon'} hovered={this.state.discardHovering}/>
					</div>
					<label 
						for="submitButton" 
						style={{
							'width':'20%',
							position: 'absolute',
							right: '0px'
						}}>
						<div 
							className={this.props.imgFormControlStyle}
							style={{width:'100%'}}
							onMouseOver={(event) => this._handleIconHover(event, 'submit', true)}
							onMouseLeave={(event) => this._handleIconHover(event, 'submit', false)}>							
							<SvgIcon name={'OkIcon'} hovered={this.state.submitHovering}/>
						</div>	
					</label>
				</div>

				<form enctype="multipart/form-data" style={{positon:'absolute','text-align':'center',display:'inline'}}>
					<input id="fileInput" type="file" multiple name="imageFile" onChange={this._onSelectMultipleFiles/*this._onSelectFile*/} style={{display:'none'}} />
					<button id="submitButton" type="submit" onClick={this._handleSubmit} style={{display:'none'}}>
						Upload Image
					</button>
				</form>

				<div style={{'text-align':'center', 'height':'calc(100% - 5vh - 25px)'}} >
					<div id="imgAndItemMapdiv" /*ref={this.props.setupContentViewRef}*/ref={this.setupCropImgRoot} style={{
						'position':'relative',
						width:'auto',
						height:'100%',
						///padding:'0px 10% 0px 10%',
						'text-align':'center', 
						///background-color':'#ececec',
						'max-height':'100%',
						'float':'right',
						//'height':'calc(100vh - 200px * (3/2))',
						//'height':'calc((100vh - 300px))',
						'background-color': '#39372f'
					}}>
						{content}
						{
							this.state.images[this.selectedContentId] === undefined ?
								null/*(this.state.images.PromiseStatus === 'pending' ? 
									null : 
									this.state.images.PromiseValue[this.selectedContentId].cropping ?
										null :
										(this.props.itemLocationMap(this.props.itemMapDimension) || null)
								)*/ :
								this.state.images[this.selectedContentId].cropping ? 
									null : 
									(this.props.itemLocationMap(this.props.itemMapDimension) || null)
						}
					</div>
				</div>
			</div>
		)
	}
}

export default CroppableImageForm;