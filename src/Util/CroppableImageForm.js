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
//import {Button} from '../Components/Presentations/Controls.js';
import { IconButton, Button } from '../Components/Presentations/FitseeUI/Buttons/index.js'; 
import { FormField } from '@rmwc/formfield'; 
import '@rmwc/formfield/styles';
import { Switch } from '@rmwc/switch';
import '@rmwc/switch/styles';

//import { 
//	Dialog, 
//	DialogContent,
//	DialogActions,
//	DialogButton,
//	DialogTitle 
//} from '../Components/Presentations/FitseeUI/Dialogs/index.js';

import { 
	MenuSurfaceAnchor, 
	Menu, 
	MenuItem 
} from '../Components/Presentations/FitseeUI/Menu.js';

import { SimpleListItem } from '@rmwc/list';
import '@rmwc/list/styles';

import { arrayBufferToDataURL } from '../Util/Misc.js';
import { Carousel } from '../Components/Presentations/Carousel.js';
import styled from 'styled-components';

//const loadImage = require("blueimp-load-image");

const PictureEditCarousel = styled( props => (
	<Carousel {...props} />
))`
	margin: auto;
	height: 100%;
	overflow: hidden;
`

class CroppableImageForm extends React.Component{
	constructor(props){
		super(props);
		//this.fileRefs=[];

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
				aspect: OxiAppConstants.aspectRatio,
				savedMaxHeight: 0,
			}
		};

		//let existingContents = {};
		//Object.keys(this.props.addedContents.byIds).map(id => Object.assign( existingContents, {[id]:this.imageDataTemplate} ) );
		var existingContents = this.props.addedContents.allIds.reduce((accum, id) => ({
			...accum,
			[id]: {
				//...existingContents, 
				...this.imageDataTemplate 
			}
		}), {});

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
			showSourceDialog:false,
		}


		this.rotatedAspectRatio = OxiAppConstants.aspectRatio;// this.props.imageElement.clientWidth / this.props.imageElement.clientHeigh;
		this.maxHeight = null;
		this.minYPercent = null;
		this.fileRefs=[];
		this.fileInput = null;

		this._handleSubmit = this._handleSubmit.bind(this);
		this._onSelectFile = this._onSelectFile.bind(this);
		this._onCropImageLoaded = this._onCropImageLoaded.bind(this);
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
		this.getCropBounds = this.getCropBounds.bind(this);
		this.getDimScaledToClientView = this.getDimScaledToClientView.bind(this);
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
			addedContents.allIds.length !== 0
			&& ( prevProps.addedContents.allIds.length !== addedContents.allIds.length 
				|| prevProps.addedContents.byIds[addedContents.allIds[0]].picture !== addedContents.byIds[addedContents.allIds[0]].picture )){

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
							if(viewState === OxiAppConstants.viewState.ADD && Object.keys(images).length < 2 && !images[imagesKeys[0]].src/*addedContents.allIds.length === 1*/){
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
								image.crossOrigin = "Anonymous";
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
								//if(rotation !== 0){
								imgData = await new Promise((resolve, reject) => {		
									var rotImgData = imgData;								

									image.onload = async function(){											
										if(rotation !== 0){
											var rotImgData = await this3.orientImage(image, rotation);
											resolve(rotImgData);
										}
									}

									image.src = rotImgData;
									resolve(rotImgData);
								});
								//}

								console.log(`image object {contentId:${contentId}} = `, image)
								return({
									[`${contentId}`]:{
										...this3.imageDataTemplate,
										srcFileRef: this3.props.addedContents.byIds[contentId].picture,
										src: imgData,
										cropping: true,
										rotation: rotation,
										crop:{
											...this3.imageDataTemplate.crop,
											rotation: rotation,
										},
										//crop: (image.width / image.height <= this3.imageDataTemplate.crop.aspect ? 
										//	({
										//		...this3.imageDataTemplate.crop,
										//		width: 100,
										//		height: (100 * (image.width / this3.imageDataTemplate.crop.aspect) / image.height),
										//	}) :
										//	({
										//		...this3.imageDataTemplate.crop,
										//		height: 100,
										//		width: (100 * (image.height * this3.imageDataTemplate.crop.aspect) / image.width),
										//	})),
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

							// Test for

							readers[taskInd].readAsArrayBuffer(this1.fileRefs[addedContents.byIds[`${id}`].picture]);
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
				console.trace("calling updateImageState. images = ", result)
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
				const addedContentIds = addedContents.allIds.filter(id => typeof id === 'number');
				this.props.clientInvalidateEntity(addedContentIds, OxiAppConstants.EntityTypes.CONTENT)();
				this.props.clientInvalidateEntity(addedContentIds, OxiAppConstants.EntityTypes.PICTURE)();
			}
		}
		//Single modification (multiple modification not allowed)
		else{

			//check picture of each addedContent entity to see if any filenames have changed, which would indicate file has changed
			for(let id of addedContents.allIds){
				if(addedContents.byIds[id].picture !== prevProps.addedContents.byIds[id].picture){

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
			image.crossOrigin = "Anonymous";
	
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
			entitiesStateReducer,
			addedContents,
		} = this.props;

		//const filterOutInvalidEntities = (sample: any[], test: any[]) => {			
		//	var validContentIds = addedContents.allIds.filter(id => {
		//		var keepId = true;
//
		//		for(let invContentId of entitiesStateReducer.content.clientInvalidated){
		//			if(invContentId === id){
		//				keepId = false;
		//				break;
		//			};
		//		}
//
		//		return keepId;
		//	});
		//}

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
			let crops = [];
			
			//// Build a list of content ids that represent content entities that are invalidated, or that reference invalidated picture entities
			//var targetContentIds = [...clientInvalidateEntity]
//
			//// Filter out content ids referencing invalid content entites.
			//var validContentIds = filterOutInvalidEntities(addedContents.allIds, entitiesStateReducer.content.clientInvalidated);
			//// Filter out content ids referencing content entites that contain a picture propery referencing an invalidated picture entity.
			//var validContentIdsWithValidPicture = filterOutInvalidEntities(validContentIds, entitiesStateReducer.pictures.clientInvalidated);
			//// Filter valid content entities with valid picture from editting contents
			//var targetContentIds = addedContents.allIds.filter(id => {
//
			//})

			//var targetContentIds = addedContents.allIds.filter(id => {
			//	for(let picId of entitiesStateReducer.pictures.clientInvalidated){
			//		if(addedContents.byIds[id].picture === picId){
			//			return true	;
			//		}
			//	}
//
			//	return false;
			//});

			for(let id of this.props.entitiesStateReducer.contents.clientInvalidated){
			//for(let id of targetContentIds){
				//if(typeof this.props.addedContents.byIds[id].picture === 'number' || this.props.addedContents.byIds[id].picture.length === 0){

					// Note for newly added content, the coverpicuri contains the file name.  
					// From each content entity, coverpicuri is used to reference the corresponding file in files object to send the orrect image data to the server
					files = {
						...files,
						//[ this.props.addedContents.byIds[id].coverpicuri]: {
						[id]:{
							fileData: images[id].src,
							contentId: id, 
						}
					};

					crops = [
						...crops,
						// Set savedMaxHeight to 0, so that it is not persisted server side and reused on another device, which causes problems on devices with different screen dimensions.
						{ 
							...images[id].crop, 
							savedMaxHeight: 0 
						},
					];
					//  (this.props.entitiesStateReducer.pictures.clientInvalidated.length > 0) ? //TODO:  should be ... > 0
					//  this.props._handleSubmit(this.state.images[this.selectedContentId].src) :
					//	this.props._handleSubmit(null);
				//}else{
//
				//}
			}
			new Promise((resolve, reject) => resolve(this.props._handleSubmit(files, crops)))
			.then(response => this.forceUpdate());
			//reaload images
			//this.forceUpdate();
		}

		//event.preventDefault();
	}

	async _handleAcceptCrop(event, ids){
		//methods
		const {
			setupImageRef,
			updateImageState,
			clientInvalidateEntity,
		} = this.props;

		//variables
		const {
			contentState,
			contents,
			addedContents,
			images,
			entitiesStateReducer,
			pictures,
		} = this.props;

		var croppedImages = {};
		var cropTasks = [];

		const getCroppedImages = async (this2, id) => {
			const {
				images,
				src
			} = this2.props;

			if(images[id].cropping){
				const canvas = await this2.getCroppedImg(
					(images[id].src || src), 
					images[id].crop, 					// % crop
					'croppedResult', 

					//imageWidth and imageHeight not being used in method
					images[id].imageWidth,//.maxWidth, 
					images[id].imageHeight,//.maxHeight,

					0/*images[id].rotation*/,
					images[id].maxHeight,
					images[id].minYPercent
				);

				const croppedImage = canvas.toDataURL('image/jpeg', 0.8);

				return({				
					[id]:{
						imageWidth: canvas.width,
						imageHeight: canvas.height,
						maxHeight: 'unset',
						minYPercent: 0,
						minYPixel: 0,
						//src:croppedImage,
						croppedSrc: croppedImage,
						cropping: false,
					}
				})
			}
		}

		for(let id of ids){
			cropTasks = [
				...cropTasks,
				getCroppedImages(this, id),
			];
		}

		croppedImages = await Promise.all(cropTasks)
		.then(results => {
			return results.reduce((accum, image) => ({...accum, ...image}), {});
		});

		setupImageRef(croppedImages[contentState.selected].croppedSrc);
		console.trace("calling updateImageState. images = ", croppedImages)
		updateImageState(croppedImages);


		// The crop switch acts on all images. This means that certain images may be cropped with unaltered crop data.  
		// To avoid resending the same image data for files with unaltered crops, the crop x, y, width, and height 
		// properties are delta chaecked before invalidating picture id.
		var invalidatedPictureIds = ids.reduce((accum, id, ind, ids) => {
			var pictureId = addedContents.byIds[id].picture;
			var result = accum;

			// Check if picture exists then compare picture.crop against imgages.crop
			if(pictures.byIds[pictureId]){
				// If crop postions and size are the same do not invalidate
				const existingCrop = pictures.byIds[pictureId].crop;
				const updatedCrop = images[id].crop;
				const hasChanged = 
					existingCrop.x != updatedCrop.x || 
					existingCrop.y != updatedCrop.y || 
					existingCrop.width != updatedCrop.width || 
					existingCrop.height != updatedCrop.height; 

				if(hasChanged) result = [...accum, pictureId]; 
			}

			return result;
		}, []);

		// Collect the content ids referencing with invalid picture property		
		var invalidContentIds = addedContents.allIds.filter(id => {
			for(let picId of invalidatedPictureIds){
				if(addedContents.byIds[id].picture === picId){
					return true	;
				}
			}

			return false;
		});

		if(invalidatedPictureIds.length > 0) clientInvalidateEntity(invalidatedPictureIds, OxiAppConstants.EntityTypes.PICTURE)();
		if(invalidContentIds.length > 0) clientInvalidateEntity(invalidContentIds, OxiAppConstants.EntityTypes.CONTENT)();
	}

	/*
	* creates references to all selected images (up to max allowned content entities) 
	* Then adds content entites to addedEntitiesReducer with contet.coverpicuri set to a corresponding image file reference
	*/
	_onSelectMultipleFiles(event, cameraFile){

		let newFileRefs = {}		
		let currentCount = Object.keys(this.fileRefs).length;
		let addCount = 1;

		// build new fileRef object from the parameter of type File.
		const buildNewFileRefs = (file) => {
			newFileRefs = {
				...newFileRefs, 
				...{[file.name]: file} 
			};
		}

		// Image added from camera snapshot
		if(cameraFile){
			buildNewFileRefs(cameraFile);
		}
		// Image added from folder
		else{
			for(var i=0; i < event.target.files.length; i++){
				
				if(currentCount + addCount < (OxiAppConstants.maxContentCount + 1)){
					//make sure file reference does not already exist in this.fileRefs
					if (this.fileRefs[event.target.files[i].name] === undefined){
						buildNewFileRefs(event.target.files[i]);
						//newFileRefs = {
						//	...newFileRefs, 
						//	...{[event.target.files[i].name]: event.target.files[i]} 
						//};				
					}else{
						console.log('Image is already being editted.  Remove image from editor before adding again')
					}
				}else{
					console.log("image count limit reached")
					break;
				}
				addCount++;
			}
		}

		this.fileRefs = {
			...this.fileRefs, 
			...newFileRefs 
		};

		if(Object.keys(newFileRefs).length > 0){
			this.props.addContentFromImages(newFileRefs, this.props.viewState, this.props.addedContents, this.props.pictures);
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

	_onCropImageLoaded(img, id){
		//methods
		const {
			updateImageState,
			setupImageRef,
			isCropReused,
		} = this.props;

		//variables
		const {
			images,
			contentState,
			contents,
		} = this.props;

		console.log('calling updateImageDimension with parameters: width=%d, height=%d', img.width, img.height);
		this.props.updateImageDimension(img.width, img.height);
		this.props.setupImageRef(img);

		//var isAspectRatioInverted = images[contentState.selected].rotation === 90 || images[contentState.selected].rotation === 270;
		var isAspectRatioInverted = images[id].rotation === 90 || images[id].rotation === 270;

		let {
			maxHeight,
			minYPercent,
			minYPixel,			
		} = this.getCropBounds(isAspectRatioInverted, img, id);

		console.log("getBoundingClientRect width = ", img.getBoundingClientRect().width);
		console.log("getBoundingClientRect height = ", img.getBoundingClientRect().height);

		let selected = contentState.selected;

		var result = {
			[id] : {
				imageRef:img,
				imageHeight: img.width * (
					images[id].imageHeight !== 0 && images[id].imageHeight !== 0 ? 
						this.getAspectRactio(images[id].imageWidth, images[id].imageHeight, isAspectRatioInverted) : 
						this.getAspectRactio(img.naturalWidth, img.naturalHeight, isAspectRatioInverted)
				),

				// determine cropping limits
				maxHeight: ((maxHeight && maxHeight != 0) ? maxHeight : 'unset'),
				minYPercent: (minYPercent ? minYPercent : 0),
				minYPixel: (minYPixel ? minYPixel : 0),

				imageWidth: img.width,
				// Determin if crop object is new.  If so initialize, otherwise use what exists.
				crop: isCropReused(images[id].crop) ? 
					images[id].crop :
					{
						rotation: images[id].crop.rotation,
						x: 0,
						y: minYPercent,
						aspect: OxiAppConstants.aspectRatio,
						...(
							img.width / maxHeight <= OxiAppConstants.aspectRatio ? 
								{
									width: 100,
									height: (100 * (img.width / OxiAppConstants.aspectRatio) / maxHeight),
								} :
								{
									height: 100,
									width: (100 * (maxHeight * OxiAppConstants.aspectRatio) / img.width),
								}
						),
						//height: 0,
						//width: 0,
						unit: '%',
						// If maxHeight exists overwrite savedMaxHeight with its value here.  
						// Otherwise have savedMaxHeight retain its previous value during call to updateImageState 
						...(maxHeight ? ({savedMaxHeight: maxHeight}) : ({}) ),
					}				
			}
		};

		console.trace("calling updateImageState. images = ", result);
		updateImageState(result);
		return false;
	}

	_onCropComplete(pixelCrop, percentCrop){
	 	console.log('onCropComplete', percentCrop);
		//May be fine with having this called made in _onSelectFile only depending on the crop initiation logic 
	}

	_onCropChange(pixelCrop, percentCrop, id){
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

		console.trace("calling updateImageState. images = ", percentCrop)
	 	updateImageState({
	 		[id] : {
	 			crop:{
	 				...images[id].crop,
	 				...percentCrop,
	 			}
	 		}
	 	});
	}

	_handleImageLoad(imgRef, id){
		this.props.setupImageRef(imgRef, id);
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
	// curretnly the client width will adjust accordingly. This is a simple solution, but produces a jaring
	// user experience.
	getCropBounds(isAspectRatioInverted, img, id){
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
			//console.log(`getCropBounds:  maxHeight = ${this.maxHeight}, maxWidth = ${this.maxWidth}`);
		}

		else if(img){
			let imgAspectRatio = this.getAspectRactio(img.naturalWidth, img.naturalHeight, isAspectRatioInverted);

			const {
				scaledHeight,
				scaledWidth,
			} = this.getDimScaledToClientView(img, isAspectRatioInverted);

			switch(true){	
				//case for square or vertical image where intrinsic height scaled to client is less than client height,
				//and where selected image height is not already set.  The latter case is necessary to avoid recalculating 
				//maxHeight and marign-top values on an already calculated image object.
				case imgAspectRatio >= OxiAppConstants.aspectRatio && typeof images[id].maxHeight !== 'number' /*|| images[id].maxHeight === 0*/ :
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

		maxHeight 	= maxHeight || images[id].maxHeight;
		//maxWidth	= maxWidth || images[id].maxWidth

		minYPercent = minYPercent || images[id].minYPercent;
		//minXPercent = minXPercent || images[id].minXPercent;

		minYPixel 	= minYPixel || images[id].minYPixel;
		//minXPixel 	= minXPixel || images[id].minXPixel;

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
		this.getCropBounds(this.state.images[this.selectedContentId].rotation + 90);
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

	getDimScaledToClientView(img, isAspectRatioInverted){

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

		var scaledHeight = img ? ((img.clientWidth / naturalWidth) * naturalHeight) : undefined;
		var scaledWidth = img ? ((img.clientHeight / naturalHeight) * naturalWidth) : undefined;

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
			updateImageState,
			contentSelected,
			pictures,
			contents,
			selectedContentId,
			contentIdsToInd,
			contentState,
			src,
			images,
			entitiesStateReducer,
			indLength,
			swipeCallback,
		} = this.props;

		//const {
		//	imageHeight
		//} = Object.keys(images).length > 0 ? images[contentState.selected] : ({});
		
		const customButtonStyles = {
			//'margin-left':'5%',
			//'vertical-align':'top',
			//display:'inline-block',
		}

		// Async method invoked when adding photos on mobile device.
		// Either sources photos from device files or camera depending on user selection.
		const sourceMobilePhoto = (e, sourceType) => {
			console.log('event detail index = ', e.detail.index);
		
			//navigator.camera.sourceType = sourceType;

			if(sourceType != null && sourceType != undefined){			
				const onCameraSuccess = (imgURL) => {
					// resolveLocalFileSystemURL from cordova-plugin-file
					window.resolveLocalFileSystemURL(imgURL, (entry) => {
						const onFileSuccess = (file) => this._onSelectMultipleFiles(e, file);
						const onFileFail = (error) => console.error(error);
						entry.file(onFileSuccess, onFileFail);
					});
				
					console.log("picture retreived successfully");
				};
				
				const onCameraFail = () => {
					console.log("pictrue retreival failed");
				};
				
				navigator.camera.getPicture(onCameraSuccess, onCameraFail, {
					quality: 100, 
					destinationType: navigator.camera.DestinationType.FILE_URI,
					sourceType: sourceType, 
				});
			}

			this.setState(prevState => ({
				...prevState, 
				showSourceDialog: false
			}))

		}

		contentState.selected = entitiesStateReducer.contents ?  entitiesStateReducer.contents.selected : undefined;
		let submitButton = (this.state.submittable ? (<button id="submitButton" type="submit" onClick={this._handleSubmit} style={{display:'none'}}>Upload Image</button>) : null);
		let content = null;
		let validImageElement = (this.props.imageElement !== null && this.props.imageElement !== undefined);

		const getContent = (id) => {
			if(id && images[id]){
				if(this.props.images[id].cropping){
					return (
						//<ReactCrop
						//	className={ReactCropStyles}
						//	rotation={this.state.images[contentState.selected].rotation}
						//	//This is a percentage of actual image height wrp <img> tag height
						//	maxHeight={this.maxHeight}
						//	maxWidth={this.maxWidth}
						//	minY={this.minYPercent}
						//	style={{
						//		height:'100%',
						//		'max-height': `${this.state.images[contentState.selected].maxHeight}${this.state.images[contentState.selected].maxHeight === 'unset' ? '' : 'px'}`,//`${maxHeightVal}px`,
						//		'margin-top': `${this.state.images[contentState.selected].minYPixel}px`,//`${this.minYPixel}px`//`calc(${this.maxHeight}px/2 - ${imageHeight}px/2)`
						//		width: 'auto',
						//		'background-color':'unset',
						//	}}
						//	cropImgRoot={this.cropImgRoot}
						//	src={src}
						//	crop={this.state.images[contentState.selected].crop}
						//	onImageLoaded={(imageElement) => {this._onCropImageLoaded(imageElement)} }
						//	onComplete={this._onCropComplete}
						//	onChange={this._onCropChange}
						//	setupImageRef={this.props.setupImageRef}
						//	flag={this.state.flag}
						//	ruleOfT hirds={true}
						///>
	
						<ReactCrop
							className={ReactCropStyles}
							rotation={this.props.images[id].rotation}
							//This is a percentage of actual image height wrp <img> tag height
							maxHeight={this.maxHeight}
							maxWidth={this.maxWidth}
							minY={this.minYPercent}
							style={{
								height:'100%',
								'max-height': `${this.props.images[id].maxHeight}${this.props.images[id].maxHeight === 'unset' ? '' : 'px'}`,//`${maxHeightVal}px`,
								//'margin-top': `${this.props.images[id].minYPixel}px`,//`${this.minYPixel}px`//`calc(${this.maxHeight}px/2 - ${imageHeight}px/2)`
								//width: 'auto',
								width: '100%',
								'background-color':'unset',
							}}
							//imageStyle={{ height:'100%', width:'100%' }}
							cropImgRoot={this.cropImgRoot}
							src={images[id].src}
							crop={this.props.images[id].crop}
							onImageLoaded={(img) => this._onCropImageLoaded(img, id)}
							onComplete={this._onCropComplete}
							onChange={(pixelCrop, percentCrop) => this._onCropChange(pixelCrop, percentCrop, id)}
							setupImageRef={(img) => this.props.setupImageRef(img, id)}
							flag={this.state.flag}
							ruleOfThirds={true}
						/>	
					);
				}
				else{
					
					return(
						<img 
							//style={this.props.imgStyle} 
							className={FormStyles.imgEdit_img}
							src={images[id].croppedSrc}
							// alkjdf
							onClick={e => this.props.onImageClick(e)} 
							onLoad={(img) => this._handleImageLoad(this.props.images[id].imageRef, id)} 
							ref={(img) => this.props.setupImageRef(img, id)}
							loading="lazy" 
							crossOrigin="Anonymous"
						/>	
					);
				}
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
						type="file" 
						multiple name="imageFile" 
						onChange={this._onSelectMultipleFiles/*this._onSelectFile*/} 
						style={{display:'none'}} 
						ref={input => this.fileInput = input}
					/>
					<button 
						id="submitButton" 
						type="submit" 
						ref={button => this.submitButton = button}
						onClick={this._handleSubmit} 
						style={{display:'none'}} 
					/>
				</form>

				<div className={FormStyles.imgEditAndCtrlContainer_div} >

					<div className={FormStyles.imgEditControls_div} >
						<Button
							theme="textPrimaryOnLight"
							class=""
							label="discard"
							labelSize="1.2rem"
							onClick={this.props.discardChanges}
							icon="cancel"
							class="material-icons-outlined"
							style={customButtonStyles}
						/>
						{
							isDevice ? 
							<React.Fragment>
								<MenuSurfaceAnchor >
									<Menu
										style={{
											bottom:'48px',
											width:'auto',
											'background-color':'var(--color-02-tint-01)',
										}}
										horizontal={true}
										open={this.state.showSourceDialog}
										renderToPortal
										//onSelect={e => {console.log(e.detail.index); sourceMobilePhoto(e);}}
										onClose={e => { 
											this.setState(prevState => ({
												...prevState, 
												showSourceDialog: false
											}))
										}}
									>
										{/*<MenuItem fontSize="1.8rem">Camera</MenuItem>
										<MenuItem fontSize="1.8rem">File</MenuItem>*/}
										<SimpleListItem 
											role="menuitem" 
											tabindex="0" 
											text="Camera"
											graphic="add_a_photo" 
											onClick={e => sourceMobilePhoto(e, Camera.PictureSourceType.CAMERA)}
										/>
										<SimpleListItem 
											role="menuitem" 
											tabindex="0" 
											text="Storage"
											graphic="folder_open" 
											onClick={e => sourceMobilePhoto(e, Camera.PictureSourceType.PHOTOLIBRARY)}
										/>
									</Menu>
								</MenuSurfaceAnchor>
								<Button
									theme="textPrimaryOnLight"
									labelSize="1.2rem"
									onClick={(e) => {
										e.stopPropagation();
										this.setState(prevState => ({
											...prevState, 
											showSourceDialog: true
										}));
									}}
									icon="insert_photo"
								/> 
							</React.Fragment> :
							<Button
								theme="textPrimaryOnLight"								
								label="file"
								labelSize="1.2rem"
								icon="folder_shared"
								style={customButtonStyles}
								onClick={this.fileInput ? (e) => this.fileInput.click(e) : null}
							/>
						}
						<Switch
							theme="textPrimaryOnLight"							
							label="Crop / Tag"
							labelSize="1.2rem"
							checked={images[contentState.selected] ? !images[contentState.selected].cropping : true}
							onChange={(e) => {
								// Transition from cropping to tagging
								if(e.currentTarget.checked){
									this._handleAcceptCrop(e, Object.keys(images));
								}
								// Transition from tagging to cropping
								else{
									var updates = {};
									
									for(var id in images){
										updates = {
											...updates,
											[id]: {
												cropping: true,
												// If the crop width in component state has not been set (0), then use the crop data from redux state.
												crop:{
													...(images[id].crop.width == 0 ? pictures.byIds[addedContents.byIds[id].picture].crop : ({}) ),
												},
												// Added (but unpersisted) image will have integer id.  
												// The src will already have been set in the state's image object
												...(
													pictures.byIds[addedContents.byIds[id].picture] ? 
														{src: OxiAppConstants.getImageURL(pictures.byIds[addedContents.byIds[id].picture].originaluri, 4)} : 
														{}
												),
											}
										}
									}		

									console.trace("calling updateImageState. images = ", updates)
									updateImageState(updates);															
								}
							}}
							//icon="crop"
							//style={customButtonStyles} 
						/>
						<Button
							//icon="cloud_upload"
							theme="textPrimaryOnDark"
							raised
							label="save"
							labelSize="1.2rem"
							icon="cloud_upload"
							style={customButtonStyles} 
							onClick={this.submitButton ? (e) => this.submitButton.click(e) : null}
						/>
					</div>

					<PictureEditCarousel 
						index={contentIdsToInd[selectedContentId] ? contentIdsToInd[selectedContentId].ind : 0} 
						size={indLength}
						swipeableRef={(div) => {
							if(div){
								div.style.height = '100%';
								isDevice ? null : div.style.maxWidth = 'calc(75vh - 20px)';
							}					
						}}
						swipeCallback={swipeCallback}
						//ref={this.setupCropImgRoot} 
					>
						{
							Object.keys(this.props.images).map(id => (
								<div 
									id="imgAndItemMapdiv" /*ref={this.props.setupContentViewRef}*/
									//ref={this.setupCropImgRoot} 
									className={FormStyles.imgEditContainer_div}
									style={{
										display:'flex',
										'align-items':'center',
										...(images[id].cropping ? 
												{
													//margin: 'auto',
													//'max-width': images[id].imageRef ? images[id].imageRef.naturalWidth : 'unset',
												} : 
												{

												})
									}}
								>
									<div
										id="cropContainer"
										ref={this.setupCropImgRoot}
										style={{
											height: '100%',
											width: 'auto',
											margin: 'auto',
											display:'flex',
											'align-items':'center',
										}}
									>
										{ getContent(id) }				
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
							))
						}
					</PictureEditCarousel>	
				</div>
			</div>
		)
	}
}

export default CroppableImageForm;