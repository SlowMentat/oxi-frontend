import React from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
//import {ReactCropStyles} from 'react-image-crop/dist/ReactCrop.css';
import {ReactCropStyles} from '../reactCrop.css';
import Styles from '../root.css';
import FormStyles from '../forms.css';

import {OxiAppConstants} from './OxiAppConstants.js';
import {FileUploadIcon} from '../Components/SvgAssets/Icons/FileUploadIcon.js';
//import DiscardIcon from '../Components/SvgAssets/Icons/DiscardIcon.js';
//import CropIcon from '../Components/SvgAssets/Icons/CropIcon.js';
//import OkIcon from '../Components/SvgAssets/Icons/OkIcon.js';
import {SvgIcon} from '../Components/SvgAssets/SvgIcon.js';
import {Button} from '../Components/Presentations/Controls.js';

/**
 * @param {File} image - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
 * @param {String} fileName - Name of the returned file in Promise
 */

//rotation transformation
//function clockRotTransform([{xTl:0, yTl:0}, {xBr:0, yBr}], rotation){
//	const clockWiseRotationMatrix = [
//		{xTl: Math.cos(rotation), yTl: }, 
//		{}
//	];
//}

function getCroppedImg(data, pixelCrop, fileName, imageWidth, imageHeight, rotation, maxHeight, minY) {
	return new Promise((resolve, reject) => {
		var image = new Image();
		image.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = pixelCrop.width*image.width/100;
			canvas.height = pixelCrop.height * 100 / maxHeight * image.height/100;
			const ctx = canvas.getContext('2d');
			//console.log('image width');
			//console.log(image.width);
			//console.log('image height');
			//console.log(image.height);
			ctx.drawImage(
				image,
				pixelCrop.x*image.width/100,	//x coordinate of the top left corner of the sub-rectagle of the source image to draw into the destination context
				((pixelCrop.y - minY) * (100/maxHeight)) * image.height/100,	//The Y coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
				canvas.width,					//The width of the sub-rectangle of the source image to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by sx and sy to the bottom-right corner of the image is used.
				canvas.height,					//The height of the sub-rectangle of the source image to draw into the destination context.
				0,								//The X coordinate in the destination canvas at which to place the top-left corner of the source image.
				0,								//The Y coordinate in the destination canvas at which to place the top-left corner of the source image.
				/*imageWidth,*/canvas.width,					//The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
				/*imageHeight,*/canvas.height 				//The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
			);
			ctx.rotate(rotation * Math.PI/180);
			resolve(canvas.toDataURL('image/jpeg', 0.7));
			//this.setState
		};

		image.src = data;
		//return image;
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
			rotation: 0,
			crop: {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				aspect: OxiAppConstants.aspectRatio
			}
		};

		let existingContents = {};
		Object.keys(this.props.addedContents).map(id => Object.assign( existingContents, {[id]:this.imageDataTemplate} ) );

		this.state = {
			flag:true,
			images:{
				...existingContents
				//[this.props.entitiesStateReducer.contents.selected]: {...this.imageDataTemplate}
			},
			fileUploadHovering: false,
			submitHovering: false,
			cropHovering:false,
			discardHovering:false,
		}


		this.rotatedAspectRatio = this.props.imageElement.clientWidth / this.props.imageElement.clientHeigh;
		this.maxHeight = null;
		this.minY = null;
		this.fileRefs=[];
		this.fileInput = null;

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
		this.rotateImageClockwise = this.rotateImageClockwise.bind(this);
		this.reloadImageRef = this.reloadImageRef.bind(this);
		this.setCropBounds = this.setCropBounds.bind(this);
	}

	componentDidUpdate(prevProps){

		//Single addition 
		//Multiple addition
		//Single removal (multiple removal not allowed)
		//picture added from adding outfit
		if(
			Object.keys(this.props.addedContents).length !== 0 && 
			(prevProps.addedContentIds.length !== this.props.addedContentIds.length || 
			prevProps.addedContents[this.props.addedContentIds[0]].coverpicuri !== this.props.addedContents[this.props.addedContentIds[0]].coverpicuri) ){

			//console.log('CroppableImageForm#componentDidUpdate:  Changing state');		

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
							//console.log(`image loaded for content id: ${contentId}`);
							postLoadTasks[ti] = new Promise((resolve, reject) => {
								//console.log(`int post-loading task #${ti}`);
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
								//console.log(`post-loading task #${ti}: images updated`, images);
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
					//		//console.log('reader.readyState = ', this1.frStateNames[reader.readyState]);
					//	}
					//}catch(e){
					//	//console.log('during multifile upload', e);
					//	break;
					//}
				}

				await Promise.all(postLoadTasks);
				return images;
			};
			
			loadAllImages(this).then(result => {

				//console.log('*about to update state');
				//console.log('		this.state.images =', this.state.images);
				let images = Object.assign(result, this.state.images);
				//console.log(images);
				this.setState(prevState => ({
					...prevState,
					images
					//images: {
					//	...prevState.images,
					//	...result
					//}
				}));
			});
			
			//invalidate newly added content entity/ies		
			if(prevProps.addedContentIds.length < this.props.addedContentIds.length){
				this.props.clientInvalidateEntity(this.props.addedContentIds.filter(id => typeof id === 'number'), OxiAppConstants.EntityTypes.CONTENT)();
			}
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

	componentDidMount(){
		window.addEventListener('resize', this.reloadImageRef);

		//force click of fileInput button when user clicks add outfit button.
		this.props.viewState === OxiAppConstants.viewState.ADD ? this.fileInput.click() : null;
	}

	componentDidUnmount(){
		window.removeEventListener('resize', this.reloadImageRef);
	}

	reloadImageRef(){
		//const displayedImage = new Image();
		//displayedImage.onLoad = () => {
		//	//console.log(`Image data from state.images[${this.props.selectedContentId}].src loaded`)
		//}	
//
		//displayedImage.src = this.state.images[this.props.selectedContentId].src
		////console.log('handleForceUpdate')
		this.setState(prevState => ({
			...prevState,
			flag: (!prevState.flag)
		}))
		//this.forceUpdate();
	}

	_handleSubmit(event) {
		event.preventDefault();
		let isCropping = false;

		for(let image of Object.values(this.state.images)){
			if(image.cropping){
				isCropping = false;
				break;
			}
		}

		if(isCropping){
			console.log('please finish cropping before submiting image')
		}else{
			let files = {};
			for(let invalidatedContentId of this.props.entitiesStateReducer.contents.clientInvalidated){
				if(typeof this.props.addedContents[invalidatedContentId].picture === 'number' || this.props.addedContents[invalidatedContentId].picture.length === 0){

					//Note for newly added content, the coverpicuri contains the file name.  
					//Coverpicuri is used from each content entity to reference the corresponding file in files object when sending image data to the server
					files = Object.assign({...files}, {
						[this.props.addedContents[invalidatedContentId].coverpicuri]: this.state.images[invalidatedContentId].src
					});
					//(this.props.entitiesStateReducer.pictures.clientInvalidated.length > 0) ? //TODO:  should be ... > 0
					//	this.props._handleSubmit(this.state.images[this.selectedContentId].src) :
					//	this.props._handleSubmit(null);
				}else{

				}
			}
			this.props._handleSubmit(files);
		}

		//event.preventDefault();
	}

	_handleAcceptCrop(event){
		if(this.state.images[this.selectedContentId].cropping){
			getCroppedImg(
				(this.state.images[this.selectedContentId].src || this.props.src), 
				this.state.images[this.selectedContentId].crop, 
				'croppedResult', 
				/*this.props.imageElement.clientWidth,*/this.state.images[this.selectedContentId].imageWidth,//.maxWidth, 
				/*this.props.imageElement.clientHeight,*/this.state.images[this.selectedContentId].imageHeight,//.maxHeight,
				this.state.images[this.selectedContentId].rotation,
				this.maxHeight,
				this.minY
			)
			.then(croppedImage => {	
				this.props.setupImageRef(croppedImage);			
				this.setState(prevState => ({
					...prevState,
					images:{
						...prevState.images,
						[this.selectedContentId]:{
							...prevState.images[this.selectedContentId],
							//imageHeight: croppedImage.width * (prevState.images[this.selectedContentId].imageHeight !== 0 && prevState.images[this.selectedContentId].imageHeight !== 0 ? 
							//	(prevState.images[this.selectedContentId].imageHeight / prevState.images[this.selectedContentId].imageWidth) : 
							//	(croppedImage.naturalHeight / croppedImage.naturalWidth)
							//),
							//imageWidth: croppedImage.width,
							src: croppedImage,
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
						...prevState.images[this.selectedContentId],
						cropping: !this.state.images[this.selectedContentId].cropping
					}
				}
			}));
		}


		this.props.clientInvalidateEntity([this.props.entitiesStateReducer.contents.selected].picture, OxiAppConstants.EntityTypes.PICTURE)();
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
			
			if(currentCount + addCount < (OxiAppConstants.maxContentCount + 1)){
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
		if(Object.keys(newFileRefs).length > 0){
			//const loadFiles = new Promise((resolve, reject) => resolve(this.props.addContentFromImages(newFileRefs, this.props.viewState, this.props.addedContents)));
			//loadFiles.then(result => this.forceUpdate());
			this.props.addContentFromImages(newFileRefs, this.props.viewState, this.props.addedContents);
		}
		if(this.props.entitiesStateReducer.outfits.clientInvalidated.length === 0){
			//this.props.clientInvalidateEntity([this.props.entitiesStateReducer.outfits.selected], OxiAppConstants.EntityTypes.OUTFIT)();
		}
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
		//console.log(`CroppableImageForm#_onImageLoaded:  calling updateImageDimension( width:${image.width}, height:${image.height} )`)
		this.props.updateImageDimension(image.width, image.height);

		//TODO:  crop dimensions aren't being initialized
		//set crop dimensions if dimension they have not already been set by user
		//if(this.state.images[this.selectedContentId].crop.height === 0 || this.state.images[this.selectedContentId].crop.width === 0 ){
			this.setCropBounds(this.state.images[this.selectedContentId].rotation);
			//console.log('initializing crop');
			this.setState(prevState => ({	
				...prevState,
				images:{
					...prevState.images,
					[this.selectedContentId] : {
						...this.state.images[this.selectedContentId],
						imageHeight: image.width * (prevState.images[this.selectedContentId].imageHeight !== 0 && prevState.images[this.selectedContentId].imageHeight !== 0 ? 
							(prevState.images[this.selectedContentId].imageHeight / prevState.images[this.selectedContentId].imageWidth) : 
							(image.naturalHeight / image.naturalWidth)
						),
						imageWidth: image.width,
						crop: {
							...this.state.images[this.selectedContentId].crop,
							...makeAspectCrop({
							 	x: this.state.images[this.selectedContentId].crop.x,

							 	y: this.state.images[this.selectedContentId].crop.y === 0 ?
							 		this.minY : 
							 		this.state.images[this.selectedContentId].crop.y,

							 	aspect: OxiAppConstants.aspectRatio,

							 	width: this.state.images[this.selectedContentId].crop.width === 0 ? 
							 		this.maxHeight * OxiAppConstants.aspectRatio * this.rotatedAspectRatio : 
							 		this.state.images[this.selectedContentId].crop.width,

							 	height: this.state.images[this.selectedContentId].crop.height === 0 ? 
							 		this.maxHeight : 
							 		this.state.images[this.selectedContentId].crop.height,

							}, image.width / image.height)
						}
					}
				},
			}));
		//}
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

	_handleImageLoad(imgRef){
		//this.setState({
		//	imageX: imgRef.getBoundingClientRect().left,
		//	imageY: imgRef.getBoundingClientRect().top,
		//	imageWidth: imgRef.width,
		//	imageHeight: imgRef.height,
		//})
		this.props.setupImageRef(imgRef);
		this.setState(prevState => ({	
			...prevState,
			images:{
				...prevState.images,
				[this.selectedContentId] : {
					...this.state.images[this.selectedContentId],
					//imageX: imgRef.getBoundingClientRect().left,
					//imageY: imgRef.getBoundingClientRect().top,
					//imageWidth: imgRef.width,
					//imageHeight: imgRef.height,
					imageX: imgRef.clientLeft,
					imageY: imgRef.clientTop,
					imageWidth: imgRef.clientWidth,
					imageHeight: imgRef.clientHeight,
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
		//console.log('*about to get image source');
		//console.log('this.state.images = ', this.state.images);
		let imageSource = 
			(this.state.images[this.selectedContentId].src || this.props.src) || 
			("https://www.oxisalechannel.com/" + OxiAppConstants.ContentDirectories.IMAGES + "/no_image_optimized.svg");
		//console.log('this.selectedContentId = ', this.selectedContentId);
		//console.log('imageSource = ', imageSource);

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

	setCropBounds(finalRotation){		
		//this.rotatedAspectRatio = this.props.imageElement.clientWidth / this.props.imageElement.clientHeight
		let rotatedImageHeight = null;
		switch(true){
			//originally image aspect > crop aspect about to be rotated 90 or 270 degrees
			case ((this.props.imageElement.naturalWidth / this.props.imageElement.naturalHeight > OxiAppConstants.aspectRatio) && 
			(finalRotation === 90 || finalRotation === 270) ):

				rotatedImageHeight = this.props.imageElement.clientWidth * (this.props.imageElement.naturalWidth / this.props.imageElement.naturalHeight);

				this.maxHeight= 100 * rotatedImageHeight / this.props.imageElement.clientHeight;
				this.minY = 50 - (0.5 * 100 * rotatedImageHeight / this.props.imageElement.clientHeight);
				this.rotatedAspectRatio = this.props.imageElement.clientHeight / this.props.imageElement.clientWidth;
				//this.rotatedAspectRatio = this.props.imageElement.naturalHeight / this.props.imageElement.naturalWidth;
				break;

			//originally image aspect > crop aspect rotated 0(360) or 180 degrees
			case ((this.props.imageElement.naturalWidth / this.props.imageElement.naturalHeight > OxiAppConstants.aspectRatio) && 
			(finalRotation === 180 || finalRotation === 360 || finalRotation === 0) ):

				rotatedImageHeight = 
					this.state.images[this.selectedContentId].imageHeight ||
					(this.props.imageElement.clientWidth * (this.props.imageElement.naturalHeight / this.props.imageElement.naturalWidth));

				this.maxHeight = 100 * rotatedImageHeight / this.props.imageElement.clientHeight;
				//this.maxHeight= 100 * this.state.images[this.selectedContentId].imageHeight / this.props.imageElement.clientHeight;
				this.minY = 50 - (0.5 * 100 * rotatedImageHeight / this.props.imageElement.clientHeight);
				//this.rotatedAspectRatio = this.props.imageElement.clientWidth / this.props.imageElement.clientHeight;
				this.rotatedAspectRatio = this.props.imageElement.naturalWidth / this.props.imageElement.naturalHeight;
				break;

			//originally image aspect <= crop aspect about to be rotated 90 or 270 degrees
			case ((this.props.imageElement.naturalWidth / this.props.imageElement.naturalHeight <= OxiAppConstants.aspectRatio) && 
			(finalRotation === 90 || finalRotation === 270) ):

				rotatedImageHeight = this.props.imageElement.clientWidth * (this.props.imageElement.naturalWidth / this.props.imageElement.naturalHeight);

				this.maxHeight= 100 * rotatedImageHeight / this.props.imageElement.clientHeight;
				this.minY = 50 - (0.5 * 100 * rotatedImageHeight / this.props.imageElement.clientHeight);
				this.rotatedAspectRatio = this.props.imageElement.clientHeight / this.props.imageElement.clientWidth;
				//this.rotatedAspectRatio = this.props.imageElement.naturalHeight / this.props.imageElement.naturalWidth;
				break;

			//originally image aspect <= crop aspect rotated 0(360) or 180 degrees
			case ((this.props.imageElement.naturalWidth / this.props.imageElement.naturalHeight <= OxiAppConstants.aspectRatio) && 
			(finalRotation === 180 || finalRotation === 360 || finalRotation === 0) ):

				rotatedImageHeight = 
					this.state.images[this.selectedContentId].imageHeight ||
					(this.props.imageElement.clientWidth * (this.props.imageElement.naturalHeight / this.props.imageElement.naturalWidth));

				this.maxHeight = 100 * rotatedImageHeight / this.props.imageElement.clientHeight;
				//this.maxHeight= 100 * this.state.images[this.selectedContentId].imageHeight / this.props.imageElement.clientHeight;
				this.minY = 50 - (0.5 * 100 * rotatedImageHeight / this.props.imageElement.clientHeight);
				//this.rotatedAspectRatio = this.props.imageElement.clientWidth / this.props.imageElement.clientHeight;
				this.rotatedAspectRatio = this.props.imageElement.naturalHeight / this.props.imageElement.naturalWidth;
				break;
		}
	}

	getMinY(){

	}

	rotateImageClockwise(){
		//swap width and height dimensions
		//this.props.updateImageDimension(this.props.imageElement.clientHeight, this.props.imageElement.clientWidth)

		//this.rotatedAspectRatio = this.props.imageElement.clientWidth / this.props.imageElement.clientHeight
		//switch(true){
		//	//originally wide image about to be rotated 90 or 270 degrees
		//	case ((this.props.imageElement.clientWidth / this.props.imageElement.clientHeight > OxiAppConstants.aspectRatio) && 
		//	(this.state.images[this.selectedContentId].rotation+90 === 90 || this.state.images[this.selectedContentId].rotation+90 === 270) ):
//
		//		let rotatedImageHeight = this.props.imageElement.clientWidth * (this.props.imageElement.naturalWidth / this.props.imageElement.naturalHeight);
		//		this.maxHeight= 100 * rotatedImageHeight / this.props.imageElement.clientHeight;
		//		this.minY = 50 - (0.5 * 100 * rotatedImageHeight / this.props.imageElement.clientHeight);
		//		this.rotatedAspectRatio = 1 / this.rotatedAspectRatio;
		//		break;
//
		//	//originally wide image rotated 0(360) or 180 degrees
		//	case ((this.props.imageElement.clientWidth / this.props.imageElement.clientHeight > OxiAppConstants.aspectRatio) && 
		//	(this.state.images[this.selectedContentId].rotation+90 === 180 || this.state.images[this.selectedContentId].rotation+90 === 360) ):
//
		//		this.maxHeight= 100 * this.state.images[this.selectedContentId].imageHeight / this.props.imageElement.clientHeight;
		//		this.minY = 50 - (0.5 * 100 * this.state.images[this.selectedContentId].imageHeight / this.props.imageElement.clientHeight);
		//		this.rotatedAspectRatio = 1 / this.rotatedAspectRatio;
		//		break;
		//}
		this.setCropBounds(this.state.images[this.selectedContentId].rotation + 90);

		this.setState(prevState => ({
			...prevState,
			images:{
				...prevState.images,
				[this.selectedContentId] : {
					...prevState.images[this.selectedContentId],
					crop:{
						...prevState.images[this.selectedContentId].crop,
						height: this.maxHeight,
						width: (this.maxHeight * OxiAppConstants.aspectRatio * this.rotatedAspectRatio),
						x:0,
						y:this.minY
					},
					//(this.state.images[this.selectedContentId].rotation === 90 || this.state.images[this.selectedContentId].rotation === 270 ?
					//	(...{imageHeight: this.props.imageElement.clientWidth, imageWidth: this.props.imageElement.clientHeight}) : 
					//	(...{imageHeight: this.props.itemMapDimension.imag.clientWidth, imageWidth: this.props.imageElement.clientHeight}) ),
					//imageHeight: prevState.images[this.selectedContentId].imageWidth,
					//imageWidth: prevState.images[this.selectedContentId].imageHeight,

					//imageHeight: image.width * (prevState.images[this.selectedContentId].imageHeight !== 0 && prevState.images[this.selectedContentId].imageHeight !== 0 ? 
					//	(prevState.images[this.selectedContentId].imageHeight / prevState.images[this.selectedContentId].imageWidth) : 
					//	(image.naturalHeight / image.naturalWidth)
					//),
					//imageWidth: image.width,
					rotation: prevState.images[this.selectedContentId].rotation !== 270 ? (prevState.images[this.selectedContentId].rotation + 90) : 0,

				}
			}
		}));
	}

	render(){
		this.selectedContentId = this.props.entitiesStateReducer.contents.selected;
		let submitButton = (this.state.submittable ? (<button id="submitButton" type="submit" onClick={this._handleSubmit} style={{display:'none'}}>Upload Image</button>) : null);
		let content = null;
		let src = this.getImageSrc();
		//let {imageElement} = this.props
		let validImageElement = (this.props.imageElement !== null && this.props.imageElement !== undefined);
		//console.log('rerendering');
		//console.log('imageElementHeight = ', this.props.imageElement.clientHeight);
		//console.log('imageElementWidth = ', this.props.imageElement.clientWidth);
		let customButtonStyles = {
			//'margin-top':'calc((5vh + 25px) / 4)',
			'margin-top':'8px',
			//'margin-right':'5%',			
		}
		if(this.state.images[this.selectedContentId]){
			if(this.state.images[this.selectedContentId].cropping){
				content = (
					<ReactCrop
						className={ReactCropStyles}
						rotation={this.state.images[this.selectedContentId].rotation}
						//This is a percentage of actual image height wrp <img> tag height
						maxHeight={this.maxHeight}//{100 * this.state.images[this.selectedContentId].imageHeight / this.props.imageElement.clientHeight}
						minY={this.minY}//{50 - (0.5 * 100 * this.state.images[this.selectedContentId].imageHeight / this.props.imageElement.clientHeight)}
						
						/*additionalStyles={(
							imageElement.naturalWidth > imageElement.naturalHeight ? 
								({
									height: `${imageElement.height}px`,
									'margin-top': `calc(50% - ${imageElement.height}px/4)`,
								}) : 
								({})
						)}*/
						cropImgRoot={this.cropImgRoot}
						src={src}//{(this.state.images[this.selectedContentId].src || this.props.src) || ("https://www.oxisalechannel.com/" + OxiAppConstants.ContentDirectories.IMAGES + "/no_image_optimized.svg")}
						crop={this.state.images[this.selectedContentId].crop}
						imageElementHeight={this.props.imageElement.clientHeight}
						imageElementWidth={this.props.imageElement.clientWidth}
						//imageHeight={this.state.images[this.selectedContentId].imageHeight}
						//imageWidth={this.state.images[this.selectedContentId].imageWidth}
						onImageLoaded={this._onImageLoaded}
						onComplete={this._onCropComplete}
						onChange={this._onCropChange}
						setupImageRef={this.props.setupImageRef}
						flag={this.state.flag}
						//setupCropImgContainerRef={this.setupCropImgContainerRef}
					/>
				)
			}else{
				this.state.images[this.selectedContentId].crop.height
				content = (
					<img 
						style={Object.assign({transform:`rotate(${this.state.images[this.selectedContentId].rotation}deg)`}, this.props.imgStyle)} 
						src={src}//{(this.state.src || this.props.src) || ("https://www.oxisalechannel.com/" + OxiAppConstants.ContentDirectories.IMAGES + "/no_image_optimized.svg")} 
						onClick={this.props.onImageClick} 
						onLoad={(imgRef) => this._handleImageLoad(this.props.imageElement)/*(this.props.imageElement)*/} 
						ref={this.props.setupImageRef}/>	
				)
			}
		}		
		return (
			<div style={this.props.imgFormStyle}>
				
				<div
					className={FormStyles.controlContainerStyle} 
					style={{
						width:`${validImageElement ? this.props.imageElement.clientWidth : 0}px`,
						display: (validImageElement && this.props.imageElement.clientWidth > 0) ? 'inline-flex' :  'none'
					}} >
				</div>

				<form enctype="multipart/form-data" style={{positon:'absolute','text-align':'center',display:'inline'}}>
					<input 
						id="fileInput" 
						ref={input => this.fileInput = input}
						type="file" 
						multiple name="imageFile" 
						onChange={this._onSelectMultipleFiles/*this._onSelectFile*/} 
						style={{display:'none'}} />
					<button id="submitButton" type="submit" onClick={this._handleSubmit} style={{display:'none'}}>
						Upload Image
					</button>
				</form>

				<div style={{
					'text-align':'center', 
					//'height':'calc(100% - 5vh - 25px)',
					height:'calc(100% - 80px)'
				}} >

					<div
						//className={FormStyles.controlContainerStyle} 
						style={{
							position:'absolute',
							left: '275px',
    						//top: 'calc(25px + 5vh + 3*(24px + 8px))',
    						top: 'calc(25px + 5vh)',
							'text-align':'center', 
							'z-index':'100',
							//width:`${validImageElement ? this.props.imageElement.clientWidth : 0}px`,
							//display: (validImageElement && this.props.imageElement.clientWidth > 0) ? 'inline-flex' :  'none'
						}} >
						<Button
							buttonType={OxiAppConstants.ControlConstants.ButtonTypes.e} //dynamic icon button
							onClickHandler={this.props.discardChanges}
							title='discard'
							iconName='DiscardIcon'
							ligature="cancel"
							customButtonStyles={customButtonStyles}
							puDirection='SOUTH' />
						<label 
							for="fileInput" 
							style={{
								//'margin-right':'5%',
								'width':'auto'
							}}>
							<Button
								buttonType={OxiAppConstants.ControlConstants.ButtonTypes.e} //dynamic icon button
								//onClickHandler={this.rotateImageClockwise}
								title='photos'
								iconName='FileUploadIcon'
								ligature="add_a_photo"
								customButtonStyles={customButtonStyles}
								puDirection='SOUTH'
								textHeight={17} />
						</label>	
						<Button
							buttonType={OxiAppConstants.ControlConstants.ButtonTypes.e} //dynamic icon button
							onClickHandler={this.rotateImageClockwise}
							title='rotate'
							ligature="rotate_right"
							iconName='RotateClockwiseIcon'
							customButtonStyles={customButtonStyles}
							iconStyls={{
								'padding-top':'1px',
								'padding-bottom':'4px',
							}} />
						<Button
							buttonType={OxiAppConstants.ControlConstants.ButtonTypes.c} //static icon toggle
							onClickHandler={this._handleAcceptCrop}
							toggleActiveTitle='accept crop'
							toggleInactiveTitle='start crop'
							isToggleActive={this.state.images[this.selectedContentId].cropping}
							iconName='CropIcon'
							ligature="crop"
							customButtonStyles={customButtonStyles} />
						<label 
							for="submitButton" 
							style={{
								//'width':'20%',
								//position: 'absolute',
								//right: '0px'
							}}>
							{/*<div 
								className={this.props.imgFormControlStyle}
								style={{width:'100%'}}
								onMouseOver={(event) => this._handleIconHover(event, 'submit', true)}
								onMouseLeave={(event) => this._handleIconHover(event, 'submit', false)}>							
								<SvgIcon name={'OkIcon'} hovered={this.state.submitHovering}/>
							</div>*/}
							<Button
								buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a}
								//title='submit'
								ligature="cloud_upload"
								customButtonStyles={customButtonStyles} />
						</label>
					</div>

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