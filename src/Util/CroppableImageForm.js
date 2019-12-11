import React from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
//import {ReactCropStyles} from 'react-image-crop/dist/reactCrop.scss';
import {ReactCropStyles} from '../reactCrop.scss';
import Styles from '../root.scss';
import FormStyles from '../forms.scss';

import {OxiAppConstants} from './OxiAppConstants.js';
import {FileUploadIcon} from '../Components/SvgAssets/Icons/FileUploadIcon.js';
//import DiscardIcon from '../Components/SvgAssets/Icons/DiscardIcon.js';
//import CropIcon from '../Components/SvgAssets/Icons/CropIcon.js';
//import OkIcon from '../Components/SvgAssets/Icons/OkIcon.js';
import {SvgIcon} from '../Components/SvgAssets/SvgIcon.js';
import {Button} from '../Components/Presentations/Controls.js';

import { arrayBufferToDataURL } from '../Util/Misc.js';

//const loadImage = require("blueimp-load-image");


class CroppableImageForm extends React.Component{
	constructor(props){
		super(props);
		this.fileRefs=[];

  		this.frStateNames = {
  			[FileReader.EMPTY]   : 'EMPTY',
  			[FileReader.LOADING] : 'LOADING',
  			[FileReader.DONE]    : 'DONE',
  		}
  		console.log(this.props.imageElement);

  		//TODO:  duplicated declared in PicturePreview. 
		this.imageDataTemplate = {
			cropping:true,
			src: null,
			srcFileRef: null,
			maxHeight: 600,
			maxWidth: 600 * OxiAppConstants.aspectRatio,

			maxHeight: 'unset',
			minYPercent: 0,
			minYPixel: 0,

			imageX: 0,
			imageY: 0,
			imageWidth: 0,
			imageHeight: 0,
			rotation: 0,
			crop: {
				unit: '%',
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				aspect: OxiAppConstants.aspectRatio
			}
		};

		let existingContents = {};
		Object.keys(this.props.addedContents.byIds).map(id => Object.assign( existingContents, {[id]:this.imageDataTemplate} ) );

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


		this.rotatedAspectRatio = OxiAppConstants.aspectRatio;// this.props.imageElement.clientWidth / this.props.imageElement.clientHeigh;
		this.maxHeight = null;
		this.minYPercent = null;
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
		this.scaleToClientView = this.scaleToClientView.bind(this);
		this.orientImage = this.orientImage.bind(this);
		this.getAspectRactio = this.getAspectRactio.bind(this);
		this.getCroppedImg = this.getCroppedImg.bind(this);
		this.rotateImage = this.rotateImage.bind(this);
	}

	componentDidUpdate(prevProps){
		//methods
		const {
			updateImageState
		} = this.props;

		//variables
		const {
			addedContents,
			contentState,
			images,
		} = this.props;

		//Single addition 
		//Multiple addition
		//Single removal (multiple removal not allowed)
		//picture added from adding outfit
		if(
			Object.keys(addedContents.allIds).length !== 0
			&& ( prevProps.addedContents.allIds.length !== addedContents.allIds.length 
				|| prevProps.addedContents.byIds[addedContents.allIds[0]].coverpicuri !== addedContents.byIds[addedContents.allIds[0]].coverpicuri )){

			//console.log('CroppableImageForm#componentDidUpdate:  Changing state');		

			const loadAllImages = async (this1) => {
				//variables
				const {
					contentState,
					addedContents,
					viewState,
				} = this1.props;

				var postLoadTasks = [];
				var taskInd = 0;
				//make copy of images from parent state
				let images = Object.assign({}, this1.props.images);
				let imagesKeys = Object.keys(images);
				var readers = [];

				//build array of recently added Ids
				const recentIds = addedContents.allIds.filter(id => {

					for(let prevId of prevProps.addedContents.allIds){
						if(id === prevId){
							// When a user adds an outfit, a content entity with id=1 is already provisioned in addedEntitiesReducer. 
							// As such, when loadAllImages is invoked, this content entiy id will be filterd and the image data will not be loaded.
							// To prevent this, do not filter if user is in "add" viewstate and if prop.images only contains 1 object (default) and src is an empyt string.
							if(viewState === OxiAppConstants.viewState.ADD && Object.keys(images).length < 2 && images[imagesKeys[0]].src === undefined/*addedContents.allIds.length === 1*/){
								return true;
							}
							return false;
						}
					}

					return true;
				})

				for(let id of recentIds){
					this1.currentId = id;
	
					if(typeof id === 'number'){
						readers[taskInd] = new FileReader();
	
						let getOnloadHandler = (contentId, this3, images, ti) => {

							return( async (event) => {

								const headerOffsets ={
									APP1_MARKER: 2,
									APP1_DATA_SIZE: 2,
									EXIF_HEADER: 6,
									TIFF_HEADER: 8,
								}

								const totalHeaderoffset = Object.keys(headerOffsets).reduce((accum, key) => (accum + headerOffsets[key]), 0);

								let exifData = {};
								let subIFDData = {};
								let view = new DataView(readers[ti].result); // ?
								
								if(view.getUint16(0, false) !== 0xFFD8){
									console.log('error -2: Not a JPEG format')
								}

								var length = view.byteLength;
								// Skip SOI Marker and set offset on APP1 Marker
								let offset = 2;
								// Stores the value of the exifOffset directory.
								let subIFDOffset = null;
								// Stores the adx of the exifOffset directory value.
								var exifOffsetAdx = null;

								// Extracts the IFD value given the entry number.  This is invoked while looping through tags below.
								// Each tag entry is 12 bytes.
								// [ Tag Number ] [ data format ] [ # of components ] [ data value or offset to data value]
								//     2 bytes        2 bytes          4 bytes                     4 bytes 
								const getIFDValueFromEntry = (entry, tagLUT, ifdOffset) => {

									// Note: entry initially 0
									let tagNumber = view.getUint16(ifdOffset + (entry * 12), little);
									let dataFormat = view.getUint16(ifdOffset + (entry * 12) + 2, little);
									let componentCount = view.getUint32(ifdOffset + (entry * 12) + 4, little);
									let bytesPerComponent = OxiAppConstants.exifDataFormats[dataFormat];

									let tagName = tagLUT[tagNumber] ? tagLUT[tagNumber].name : tagLUT[tagNumber];
									tagName ? console.log('tagNumber = ', tagNumber, ', tagName = ', tagName, ', dataFormat = ', dataFormat, ', bytesPerComponent = ', bytesPerComponent, ', componentCount = ', componentCount) : null;
									//Determine if the data value is gt. 4 bytes and is instead referenced by an ifdOffset value.
									let sizeOfValue = bytesPerComponent * componentCount;
									let isValueOffset = sizeOfValue > 4;

									if(tagName){												
										var value = null;
										//if entry value is too large, store its ifdOffset
										var offsetToValue = null;
										var entryOffset = ifdOffset + (entry * 12) + 8;

										//Don't know why 12 is added.  It just works.
										offsetToValue = isValueOffset ? (view.getUint32(entryOffset, little) + 12) : entryOffset;

										//const getNextAdx = (cc) => (offsetToValue + 12 + (bytesPerComponent * cc));
										const getNextAdx = (cc) => (offsetToValue + (bytesPerComponent * cc));
	
										for(var c = 0; c < componentCount; c++){
											
											//unsigned formats
											if(dataFormat < 6){
												switch(dataFormat){
	
													//unsigned byte
													case 1:
	
													//ascii strings
													case 2:
														value = (value || '') + String.fromCharCode( view.getUint8( getNextAdx(c), little ));
														break;	
													
													//unsigned short
													case 3:
														value = (value << (bytesPerComponent * 8)) | view.getUint16( getNextAdx(c), little);
														//value = view.getUint16( getNextAdx(c), little);
														break;
													
													//unsigned long
													case 4:
														value = (value << (bytesPerComponent * 8)) | view.getUint32( getNextAdx(c), little);
														//value = view.getUint32( getNextAdx(c), little);
														break;
													
													// Unsigned rational
													// Special case where value is 8 bytes; first 4bytes represent numerator, and last 4 bytes represent denominator
													case 5:
														var numerator = view.getUint32( getNextAdx(c), little);
														var denominator = view.getUint32( getNextAdx(c+0.5), little);
														value = `${numerator}/${denominator}`;
														break;
		
													default:
														value = (value << (bytesPerComponent * 8)) | view.getUint16( getNextAdx(c), little);
														break;
												}
											}
	
											//signed formats
											else{
												switch(dataFormat){	
	
													//signed Byte
													case 6:
													
													//undefined
													case 7:
														break;
	
													//signed short
													case 8:
														value = (value << (bytesPerComponent * 8)) | view.getInt16( getNextAdx(c), little);
														break;
													
													//signed long
													case 9:
														value = (value << (bytesPerComponent * 8)) | view.getInt32( getNextAdx(c), little);
														break;
			
													// Signed rational
													// Special case where value is 8 bytes; first 4bytes represent numerator, and last 4 bytes represent denominator
													case 10:
														var numerator = view.getInt32( getNextAdx(c), little);
														var denominator = view.getInt32( getNextAdx(c+0.5), little);
														value = `${numerator}/${denominator}`;
														break;
			
													//single float
													case 11:
														value = (value << (bytesPerComponent * 8)) | view.getFloat32( getNextAdx(c), little);
														break;
													
													//double float
													case 12:
														value = (value << (bytesPerComponent * 8)) | view.getFloat64( getNextAdx(c), little);
														break;
			
													default:
														value = (value << (bytesPerComponent * 8)) | view.getInt16( getNextAdx(c), little);
														break;
												}
											}
										}

										//get the address to the Exif SubIFD (exifOffset will be <= 4 bytes)
										if(tagName === 'exifOffset'){
											//exifOffsetAdx = ifdOffset + (entry * 12) + 8;
											subIFDOffset = value + 12;//totalHeaderoffset + 2 + 4;
										}

										return ({[tagName] : value});
									}

									return ({});
								}

								while(offset < length){
									if(view.getUint16(offset + 2, false) <= 8){
										console.log('undefined');// ?
										break;//return;
									}

									var marker = view.getUint16(offset, false);
									offset += 2; 

									if(marker == 0xFFE1){
										// Look ahead up to the first 2 bytes of Exif Header to check if Exif or Ascii data type
										if(view.getUint32(offset += 2, false) != 0x45786966){
											console.log('Exif header not defined');
											break;//return;
										}

										// Determine Intel or Motorola byte alignment 
										// Note:  Exif Header end with 2 bytes 0x00
										var little = view.getUint16(offset += 6, false) == 0x4949;

										// Set offset to the start of IFD (Image File directory).
										offset += view.getUint32(offset + 4, little);
										var ifdStart = offset;
										var tagCount = view.getUint16(offset, little);

										// Skip first 2 bytes in IFD (inidcating number of entries in the IFD).
										offset += 2; 


										// Loop through tags in IFD.
										for(var i = 0; i < tagCount; i++){

											var entry = getIFDValueFromEntry(i, OxiAppConstants.exifTags, offset);

											exifData = {
												...exifData, 
												...{
													//[tagName]: (view.getUint16(offset + (i * 12) + 8, little)) 
													...entry
												}
											}											
										}

										// Build subIFD (digitizer data) object
										// Note: this block will update subIFDOffset to jump to sub IDF, so all directory entries should be processed.
										if(subIFDOffset){
											//subIFDOffset = subIFDOffset == 238 ? 226 : subIFDOffset; 
											// Position subIFDOffset to the beginning of subIFD.
											//subIFDOffset += (12 * exifOffsetAdx) + subIFDOffset;
											//offset = subIFDOffset;
											// Get the directory entry count of the subIFD
											var ifdTagCount = view.getUint16(subIFDOffset, little);
											// Skip first 2 bytes in subIFD (inidcating number of entries in the IFD).
											subIFDOffset += 2;

											for(var i = 0; i < ifdTagCount; i++){

												var entry = getIFDValueFromEntry(i, OxiAppConstants.subIFDTags, subIFDOffset);
												
												subIFDData = {
													...subIFDData, 
													...{
														//[tagName]: (view.getUint16(subIFDOffset + (i * 12) + 8, little))														
														...entry 
													}
												}	
											}

											subIFDOffset = null;
										}
									}

									else if((marker & 0xFF00) != 0xFF00){
										//
										break;
									}

									else{
										offset += view.getUint16(offset, false);
									}
								}

								exifData = {
									...exifData,
									subIFDData,
								}

								console.log('exifData = ', exifData);
								var rotation = 0;
								var image = new Image();
								var imgData = arrayBufferToDataURL(readers[ti].result, 'image/jpeg');

								var isPortrait = exifData.subIFDData.exifImageHeight > exifData.subIFDData.exifImageWidth ? 
									(true) : 
									exifData.subIFDData.exifImageHeight = exifData.subIFDData.exifImageWidth ? 
										(undefined) : 
										(false) ;


								// Rotate image based on EXIF orientation.
								// Camera Orientation	correction (degrees clockwise rotation).
								// 1 : ┴ 				0
								// 8 : ├				270
								// 3 : ┬				180
								// 6 : ┤				90

								//Portrait is the default orientation
								if(isPortrait){
									switch(true){
										case exifData.orientation === 1:
											rotation = 0; //for testing
											break;
	
										case exifData.orientation === 8:
											rotation = 270;
											break;
	
										case exifData.orientation === 3:
											rotation = 180;
											break;
	
										case exifData.orientation === 6:
											rotation = 90;
											break;
	
										default:
											break;
									}
								}

								//Landscape is the default orientation
								else if(!isPortrait || isPortrait === undefined){
									switch(true){
										case exifData.orientation === 1:
											rotation = 0; //for testing
											break;
	
										case exifData.orientation === 8:
											rotation = 270;
											break;
	
										case exifData.orientation === 3:
											rotation = 180;
											break;
	
										case exifData.orientation === 6:
											rotation = 90;
											break;
	
										default:
											break;
									}								
								}

								// Rotate image
								if(rotation !== 0){
									imgData = await new Promise((resolve, reject) => {
										image.onload = async function(){
											var rotImgData = await this3.orientImage(image, rotation);
											resolve(rotImgData);
										}

										image.src = imgData;
									})
								}

								return({
									[`${contentId}`]:{
										...this3.imageDataTemplate,
										srcFileRef: this3.props.addedContents.byIds[contentId].coverpicuri,
										src: imgData,
										cropping: true,
										rotation: rotation,
										exifData:{
											...exifData
										}							
									}
								});
							});
						};
	
						postLoadTasks[taskInd] = new Promise((resolve, reject) => {

							// Pass a copy of taskInd as ti so that the proper value is used when invoking getOnloadHandler
							readers[taskInd].onload = ((ti) => (event) => {
								resolve(getOnloadHandler(id, this1, images, ti)(event));
							})(taskInd);

							readers[taskInd].onerror = ((ti) => (event) => {
								reject(new DOMException("Problem parsing input file."));
							})(taskInd)

							readers[taskInd].readAsArrayBuffer(this1.fileRefs[addedContents.byIds[`${id}`].coverpicuri]);
						});

					}else{

					}

					taskInd++;
				}

				// Wait until all images have been loaded and processed
				// Then recompose images object with results
				let result = await Promise.all(postLoadTasks).then(values => (
					values.reduce((accum, value) => ({
						...accum,
						...value,
					}), images)
				));

				return result;
			};
			
			loadAllImages(this).then(result => {

				//console.log('*about to update state');
				//console.log('		this.state.images =', this.state.images);
				//let images = Object.assign(result, this.state.images);
				//console.log(images);

				updateImageState(result);
				//this.setState(prevState => ({
				//	...prevState,
				//	images
				//	//images: {
				//	//	...prevState.images,
				//	//	...result
				//	//}
				//}));
			});//
			
			//invalidate newly added content entity/ies		
			if(prevProps.addedContents.allIds.length < addedContents.allIds.length){
				this.props.clientInvalidateEntity(addedContents.allIds.filter(id => typeof id === 'number'), OxiAppConstants.EntityTypes.CONTENT)();
			}
		}
		//Single modification (multiple modification not allowed)
		else{

			//check coverpicuri of each addedContent entity to see if any filenames have changed, which would indicate file has changed
			for(let id of addedContents.allIds){
				if(addedContents.byIds[id].coverpicuri !== prevProps.addedContents.byIds[id].coverpicuri){

				}
			}
		}
	}

	componentDidMount(){
		window.addEventListener('resize', this.reloadImageRef);
		//force click of fileInput button when user clicks add outfit button.
		this.props.viewState === OxiAppConstants.viewState.ADD ? this.fileInput.click() : null;
	}

	//componentDidUnmount(){
	//	window.removeEventListener('resize', this.reloadImageRef);
	//}

	componentWillUnmount(){
		window.removeEventListener('resize', this.reloadImageRef);		
	}

	/**
	 * @param {File} image - Image File Object
	 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
	 * @param {String} fileName - Name of the returned file in Promise
	 * @param {} imageWidth
	 * @param {} imageHeight
	 * @param {} rotation
	 * @param {} maxHeight
	 * @param {number} minYPercent - % of clienth hight representing min y crop bound 
	 */
	getCroppedImg(data, percentCrop, fileName, imageWidth, imageHeight, rotation=0, maxHeight, minYPercent,) {
		return new Promise((resolve, reject) => {
			var image = new Image();
	
			image.onload = () => {
				var cropXCoord = percentCrop.x/100 * image.width;
				var cropYCoord = percentCrop.y/100 * image.height;
				//var rotScale = imageHeight/imageWidth;
				var rotScale = imageWidth/imageHeight;
				const canvas = document.createElement('canvas');

				canvas.width = percentCrop.width/100 * image.width;
				canvas.height = percentCrop.height/100 * image.height;

				const ctx = canvas.getContext('2d');
	
				//Rotation 
				//var tx = 0.5 * imageWidth;
				//var ty = 0.5 * imageHeight;
				//ctx.translate(tx, ty);
				//ctx.rotate(rotation * Math.PI/180);
				//
				//if(rotation == 90 || rotation == 270){
				//	ctx.scale(rotScale, rotScale);
				//}
	//
				//ctx.translate(-tx, -ty);
	
				//Draw image to canvas
				ctx.drawImage(
					image,							//image
					cropXCoord,						//source x
					cropYCoord,						//source y
					canvas.width,					//source Width
					canvas.height,					//soruce Height
					0,								//destination x
					0,								//destination y
					canvas.width,					//destination Width
					canvas.height 					//destination Height
				);
	
				resolve(canvas);
			};
	
			image.src = data;
		});
	}

	rotateImage(img, rotation){
		return new Promise((resolve, reject) => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			var imageWidth = img.naturalWidth;
			var imageHeight = img.naturalHeight;
			var aspectRatio = imageWidth/imageHeight;

			canvas.width = rotation === 90 || rotation === 270 ? imageHeight : imageWidth;
			canvas.height = rotation === 90 || rotation === 270 ? imageWidth : imageHeight;
			var tx = 0.5 * canvas.width;// imageWidth;
			var ty = 0.5 * canvas.height;// imageHeight;
			var canvasAspectRatio = canvas.width / canvas.height;
			
			ctx.translate(tx, ty);
			ctx.rotate(rotation * Math.PI/180);

			//horizontal img
			//if(aspectRatio >= 1){		 
			if(canvasAspectRatio >= 1){
			 //ctx.translate(-ty, -tx);
			 ctx.translate(-tx, -ty);
			}
			//vertical img
			else{	
				ctx.translate(-ty, -tx) 
			}

			ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight);
			resolve(canvas);
		});
	}

	reloadImageRef(){
		this.setState(prevState => ({
			...prevState,
			flag: (!prevState.flag)
		}))
	}

	_handleSubmit(event) {
		event.preventDefault();

		//methods

		//variables
		const {
			images,
		} = this.props;

		let isCropping = false;

		for(let image of Object.values(images)){
			if(image.cropping){
				isCropping = true;
				break;
			}
		}

		if(isCropping){
			console.log('please finish cropping before submiting image')
		}else{
			let files = {};
			for(let invalidatedContentId of this.props.entitiesStateReducer.contents.clientInvalidated){
				if(typeof this.props.addedContents.byIds[invalidatedContentId].picture === 'number' || this.props.addedContents.byIds[invalidatedContentId].picture.length === 0){

					//Note for newly added content, the coverpicuri contains the file name.  
					//Coverpicuri is used from each content entity to reference the corresponding file in files object when sending image data to the server
					files = {
						...files,
						[this.props.addedContents.byIds[invalidatedContentId].coverpicuri]: {
							fileData: images[invalidatedContentId].src,
							contentId: invalidatedContentId,
						}
					};
					// (this.props.entitiesStateReducer.pictures.clientInvalidated.length > 0) ? //TODO:  should be ... > 0
					//	this.props._handleSubmit(this.state.images[this.selectedContentId].src) :
					//	this.props._handleSubmit(null);
				}else{

				}
			}
			this.props._handleSubmit(files);
			//reaload images
			this.forceUpdate();
		}

		//event.preventDefault();
	}

	async _handleAcceptCrop(event){
		//methods
		const {
			setupImageRef,
			updateImageState,
		} = this.props;

		//variables
		const {
			contentState,
			contents,
			images,
		} = this.props;

		if(images[contentState.selected].cropping){
			const canvas = await this.getCroppedImg(
				(images[contentState.selected].src || this.props.src), 
				images[contentState.selected].crop, 					// % crop
				'croppedResult', 

				//imageWidth and imageHeight not being used in method
				images[contentState.selected].imageWidth,//.maxWidth, 
				images[contentState.selected].imageHeight,//.maxHeight,

				0/*images[contentState.selected].rotation*/,
				images[contentState.selected].maxHeight,
				images[contentState.selected].minYPercent
			);

			const croppedImage = canvas.toDataURL('image/jpeg', 0.8);
			setupImageRef(croppedImage);		

			updateImageState({
				[contentState.selected]:{
					imageWidth: canvas.width,
					imageHeight: canvas.height,
					maxHeight: 'unset',
					minYPercent: 0,
					minYPixel: 0,
					src:croppedImage,
					cropping: false,
				}
			});

		}else{			
			this.setState(prevState => ({
				...prevState,
				images:{
					...prevState.images,
					[contentState.selected]:{
						...prevState.images[contentState.selected],
						cropping: !images[contentState.selected].cropping
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
					newFileRefs = {
						...newFileRefs, 
						...{[event.target.files[i].name]: event.target.files[i]} 
					};				
				}else{
					console.log('Image is already being editted.  Remove image from editor before adding again')
				}
			}else{
				console.log("image count limit reached")
				break;
			}
			addCount++;
		}

		this.fileRefs = {
			...this.fileRefs, 
			...newFileRefs 
		};

		if(Object.keys(newFileRefs).length > 0){
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

	_onImageLoaded(img){
		//methods
		const {
			updateImageState,
			setupImageRef,
		} = this.props;

		//variables
		const {
			images,
			contentState,
			contents,
		} = this.props;

		this.props.updateImageDimension(img.width, img.height);
		this.props.setupImageRef(img);

		var isAspectRatioInverted = images[contentState.selected].rotation === 90 || images[contentState.selected].rotation === 270;

		let {
			maxHeight,
			minYPercent,
			minYPixel,			
		} = this.setCropBounds(isAspectRatioInverted, img);

		let completeCrop = makeAspectCrop({
				x: 0,//minXPercent,
				y: minYPercent, 
				aspect: OxiAppConstants.aspectRatio,
				height: 100,
				width: 100,
				unit: '%',
			},
			img.width,
			img.height
		);

		let selected = contentState.selected;

		updateImageState({
			[selected] : {
				imageRef:img,
				imageHeight: img.width * (
					images[selected].imageHeight !== 0 && images[selected].imageHeight !== 0 ? 
						this.getAspectRactio(images[selected].imageWidth, images[selected].imageHeight, isAspectRatioInverted) : 
						this.getAspectRactio(img.naturalWidth, img.naturalHeight, isAspectRatioInverted)
				),

				//used determine cropping limits
				maxHeight: (maxHeight ? maxHeight : 'unset'),
				minYPercent: (minYPercent ? minYPercent : 0),
				minYPixel: (minYPixel ? minYPixel : 0),

				imageWidth: img.width,
				crop: {
					x: 0,
					y: minYPercent,
					aspect: OxiAppConstants.aspectRatio,
					height: 100,
					width: 100,
					unit: '%',
				}				
			}
		});
	}

	_onCropComplete(pixelCrop, percentCrop){
	 	console.log('onCropComplete', percentCrop);
		//May be fine with having this called made in _onSelectFile only depending on the crop initiation logic 
	}

	_onCropChange(pixelCrop, percentCrop){
		//methods
		const {
			updateImageState,
		} = this.props;

		//variables
		const {
			contentState,
			images,
		} = this.props;

	 	console.log('crop changed! pixelCrop = ', pixelCrop, ', percentCrop = ', percentCrop);
	 	//this.props.onCropChange(pixelCrop, percentCrop);
	 	//updateImageState({
	 	//	...images,
	 	//	[contentState.selected] : {
	 	//		...images[contentState.selected],
	 	//		crop:{
	 	//			...images[contentState.selected].crop,
	 	//			...percentCrop,
	 	//		}
	 	//	}
	 	//});

	 	updateImageState({
	 		[contentState.selected] : {
	 			crop:{
	 				...percentCrop,
	 			}
	 		}
	 	});
	}

	_handleImageLoad(imgRef){
		this.props.setupImageRef(imgRef);
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
		//div ? div.className = FormStyles.imgEditContainer_div : null;  //Don't do this
		this.cropImgRoot = div;
	}

	getImageSrc(){
		let imageSource = 
			(this.props.images[this.selectedContentId].src || this.props.src) || 
			("https://www.oxisalechannel.com/" + OxiAppConstants.ContentDirectories.IMAGES + "/no_image_optimized.svg");

		return imageSource;
	}

	getAspectRactio(width, height, isAspectRatioInverted){
		return isAspectRatioInverted ? (height / width) : (width / height);
	}


	// Todo : Handle vertical image where intrinsic height scaled to client is greater than client height
	// How do you want to handle certain images with widths that don't fill the client when scaled?
	// curretnly the client width will adjust accordingly, but this is a simple solution, but produces a jaring
	// user experience.
	setCropBounds(isAspectRatioInverted, img){
		let rotatedImageHeight = null;
		isAspectRatioInverted = false;

		//methods
		const {
			setupImageRef,
			updateImageState,
		} = this.props;

		//variables
		let {
			imageElement,
			images,
			contentState, 
		} = this.props;

		let {
			maxHeight,
			maxWidth,
			minYPercent,
			minXPercent,
			minYPixel,
			minXPixel,
		} = {};

		if((imageElement === null || imageElement === undefined) && (img === null || img === undefined)){
			//this.maxWidth = this.state.images[this.selectedContentId].maxWidth;
			//this.maxHeight = this.state.images[this.selectedContentId].maxHeight;
			//console.log(`setCropBounds:  maxHeight = ${this.maxHeight}, maxWidth = ${this.maxWidth}`);
		}

		else if(img){
			let imgAspectRatio = this.getAspectRactio(img.naturalWidth, img.naturalHeight, isAspectRatioInverted);

			const {
				scaledHeight,
				scaledWidth,
			} = this.scaleToClientView(img, isAspectRatioInverted);

			switch(true){	
				//case for square or vertical image where intrinsic height scaled to client is less than client height,
				//and where selected image height is not already set.  The later case is necessary to avoid recalculating 
				//maxHeight and marign-top values on an already calculated image object.
				case imgAspectRatio >= OxiAppConstants.aspectRatio && typeof images[contentState.selected].maxHeight !== 'number' :
					maxHeight = scaledHeight;

					minXPercent = 0;
					minYPercent = ((0.5 * (img.clientHeight - maxHeight)) / img.clientHeight);

					minXPixel = 0;
					minYPixel = (0.5 * (img.clientHeight - maxHeight));
					break;
	
				//vertical image where intrinsic height scaled to client is greater than client height
				case imgAspectRatio < OxiAppConstants.aspectRatio:
					maxWidth = scaledWidth;

					minXPercent = ((0.5 * (img.clientWidth - maxWidth)) / img.clientWidth);
					minYPercent = 0;

					minYPixel = 0;
					minXPixel = (0.5 * (img.clientWidth - maxWdith));
					break;
	
				default:
					break;
			}

		}

		else{
			maxHeight = imageElement.naturalHeight;
			minYPercent = ((0.5 * this.maxHeight - imageElement.clientHeight) / imageElement.clientHeight);
			rotatedAspectRatio = OxiAppConstants.aspectRatio;
		}

		maxHeight 	= maxHeight || images[contentState.selected].maxHeight;
		//maxWidth	= maxWidth || images[contentState.selected].maxWidth

		minYPercent = minYPercent || images[contentState.selected].minYPercent;
		//minXPercent = minXPercent || images[contentState.selected].minXPercent;

		minYPixel 	= minYPixel || images[contentState.selected].minYPixel;
		//minXPixel 	= minXPixel || images[contentState.selected].minXPixel;

		return ({
			maxHeight,
			maxWidth,
			minYPercent,
			minXPercent,
			minYPixel,
			minXPixel,
		});
	}

	getMinY(){

	}

	//currently broken
	rotateImageClockwise(){
		this.setCropBounds(this.state.images[this.selectedContentId].rotation + 90);
		this.setState(prevState => ({
			...prevState,
			images:{
				...prevState.images,
				[this.selectedContentId] : {
					...prevState.images[this.selectedContentId],

					crop:{
						...prevState.images[this.selectedContentId].crop,
						...makeAspectCrop({
							x:0,

							y:this.minYPercent,

						 	aspect: OxiAppConstants.aspectRatio,
						 	
							//height: prevState.images[this.selectedContentId].maxHeight,

							width: prevState.images[this.selectedContentId].maxHeight * OxiAppConstants.aspectRatio * this.rotatedAspectRatio,

						 	unit: prevState.images[this.selectedContentId].crop.unit,

						}, prevState.images[this.selectedContentId].imageWidth, prevState.images[this.selectedContentId].imageHeight)
					},

					//crop:{
					//	...prevState.images[this.selectedContentId].crop,
					//	height: this.maxHeight,
					//	width: (this.maxHeight * OxiAppConstants.aspectRatio * this.rotatedAspectRatio),
					//	x:0,
					//	y:this.minYPercent
					//},

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

	scaleToClientView(img, isAspectRatioInverted){

		var {
			naturalWidth,
			naturalHeight,
		} = isAspectRatioInverted ? 
			({
				naturalWidth: img.naturalHeight,
				naturalHeight: img.naturalWidth,
			}) : ({
				naturalWidth: img.naturalWidth,
				naturalHeight: img.naturalHeight,
			});

		let scaledHeight = img ? ((img.clientWidth / naturalWidth) * naturalHeight) : undefined;
		let scaledWidth = img ? ((img.clientHeight / naturalHeight) * naturalWidth) : undefined;
		return({
			scaledHeight, 
			scaledWidth,
		});
	}

	async orientImage(img, rotation){
		//methods
		const {
			setupImageRef,
			updateImageState,
		} = this.props;

		//variables
		const {
			contentState, 
		} = this.props;

		var canvas = await this.rotateImage(img, rotation);
		return canvas.toDataURL('image/jpeg', 1);
	}

	render(){
		const {
			imageElement,			
			addedContents,
			contentSelected,
			pictures,
			contents,
			selectedContentId,
			contentState,
			src,
			images,
			entitiesStateReducer,
		} = this.props;

		const {
			imageHeight
		} = Object.keys(images).length > 0 ? images[contentState.selected] : ({});

		contentState.selected = entitiesStateReducer.contents ?  entitiesStateReducer.contents.selected : undefined;
		let submitButton = (this.state.submittable ? (<button id="submitButton" type="submit" onClick={this._handleSubmit} style={{display:'none'}}>Upload Image</button>) : null);
		let content = null;
		//let src = this.getImageSrc();
		//let {imageElement} = this.props
		let validImageElement = (this.props.imageElement !== null && this.props.imageElement !== undefined);
		//let customButtonStyles = {'margin-top':'8px'}
		const customButtonStyles = {
			'margin-left':'5%',
			'vertical-align':'top',
			display:'inline-block',
		}

		if(contentState.selected && images[contentState.selected]){

			if(images[contentState.selected].cropping){
				content = (
					<ReactCrop
						//className={ReactCropStyles}
						rotation={images[contentState.selected].rotation}
						//This is a percentage of actual image height wrp <img> tag height
						maxHeight={this.maxHeight}
						maxWidth={this.maxWidth}
						minY={this.minYPercent}
						style={{
							height:'100%',
							'max-height': `${images[contentState.selected].maxHeight}${images[contentState.selected].maxHeight === 'unset' ? '' : 'px'}`,//`${maxHeightVal}px`,
							'margin-top': `${images[contentState.selected].minYPixel}px`,//`${this.minYPixel}px`//`calc(${this.maxHeight}px/2 - ${imageHeight}px/2)`
							width: 'auto',
						}}
						cropImgRoot={this.cropImgRoot}
						src={src}
						crop={images[contentState.selected].crop}
						onImageLoaded={(imageElement) => {this._onImageLoaded(imageElement)} }
						onComplete={this._onCropComplete}
						onChange={this._onCropChange}
						setupImageRef={this.props.setupImageRef}
						flag={this.state.flag}
						ruleOfThirds={true}
					/>
				)
			}else{
				
				content = (
					<img 
						//style={this.props.imgStyle} 
						className={FormStyles.imgEdit_img}
						src={src}
						onClick={this.props.onImageClick} 
						onLoad={(imgRef) => this._handleImageLoad(this.props.imageElement)} 
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
						//display: (validImageElement && this.props.imageElement.clientWidth > 0) ? 'inline-flex' :  'none'
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

				<div 
					className={FormStyles.imgEditAndCtrlContainer_div}
					//style={{
					//	'text-align':'center', 
					//	//'height':'calc(100% - 5vh - 25px)',
					//	height:'calc(100% - 80px)'
					//}}
				>

					<div
						//className={FormStyles.controlContainerStyle} 
						className={FormStyles.imgEditControls_div}
						//style={{
						//	position:'absolute',
						//	left: '275px',
    					//	//top: 'calc(25px + 5vh + 3*(24px + 8px))',
    					//	top: 'calc(25px + 5vh)',
						//	'text-align':'center', 
						//	'z-index':'100',
						//	//width:`${validImageElement ? this.props.imageElement.clientWidth : 0}px`,
						//	//display: (validImageElement && this.props.imageElement.clientWidth > 0) ? 'inline-flex' :  'none'
						//}} 
					>
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
							isToggleActive={images[contentState.selected] ? images[contentState.selected].cropping : false}
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

					<div 
						id="imgAndItemMapdiv" /*ref={this.props.setupContentViewRef}*/
						ref={this.setupCropImgRoot} 
						className={FormStyles.imgEditContainer_div}
						//style={{
						//	'position':'relative',
						//	width:'auto',
						//	height:'100%',
						//	///padding:'0px 10% 0px 10%',
						//	'text-align':'center', 
						//	///background-color':'#ececec',
						//	'max-height':'100%',
						//	'float':'right',
						//	//'height':'calc(100vh - 200px * (3/2))',
						//	//'height':'calc((100vh - 300px))',
						//	'background-color': '#39372f',
						//}}
					>
						{content}
						{
							images[contentState.selected] === undefined ?
								null/*(images.PromiseStatus === 'pending' ? 
									null : 
									images.PromiseValue[contentState.selected].cropping ?
										null :
										(this.props.itemLocationMap(this.props.itemMapDimension) || null)
								)*/ :
								images[contentState.selected].cropping ? 
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