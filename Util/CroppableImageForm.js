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
		this.state = {
			cropping:true,
			src: null,
			maxHeight: 600,
			maxWidth: this.maxHeight * OxiAppConstants.aspectRatio,
			imageX: 0,
			imageY: 0,
			imageWidth: 0,
			imageHeight: 0,
			crop: {
				x: 25,
				y: 0,
				width: 0,
				height: 0,
				aspect: this.height * OxiAppConstants.aspectRatio
			},
			fileUploadHovering: false,
			submitHovering: false,
			cropHovering:false,
			discardHovering:false,
		}

		this._handleSubmit = this._handleSubmit.bind(this);
		this._onSelectFile = this._onSelectFile.bind(this);
		this._onImageLoaded = this._onImageLoaded.bind(this);
		this._onCropComplete = this._onCropComplete.bind(this);
		this._onCropChange = this._onCropChange.bind(this);
		this._handleAcceptCrop = this._handleAcceptCrop.bind(this);
		this._handleImageLoad = this._handleImageLoad.bind(this);
		//this.simulateImageClick = this.simulateImageClick.bind(this);
		this._handleIconHover = this._handleIconHover.bind(this);
		this.setupCropImgRoot = this.setupCropImgRoot.bind(this);
	}

	_handleSubmit(e) {
		e.preventDefault();
		console.log('addedEntities from _handleSubmit in CroppableImageForm = ', this.props.addedEntities);
		// TODO: do something with -> this.state.file 
		//postAddedOutfit(this.state.file);
		this.state.cropping ?  
			console.log('please finish cropping before submiting image') : 
			(this.props.entitiesStateReducer.pictures.clientInvalidated.length > 0) ? //TODO:  should be ... > 0
				this.props.postAddedOutfit(this.state.src) :
				this.props.postAddedOutfit(null);
		//event.preventDefault();
	}

	_handleAcceptCrop(event){
		console.log('addedEntities from _handleAcceptCrop in CroppableImageForm = ', this.props.addedEntities);
		if(this.state.cropping){
			getCroppedImg((this.state.src || this.props.src), this.state.crop, 'croppedResult', this.state.maxWidth, this.state.maxHeight)
			.then(croppedFile => {				
				this.setState({
					src: croppedFile,
					cropping: !this.state.cropping
				});
			})
		}else{
			this.setState({
				cropping: !this.state.cropping
			})
		}
		console.log('addedEntities from _handleAcceptCrop in CroppableImageForm AFTER CROP = ', this.props.addedEntities);
	}

	_onSelectFile(e){
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.onloadend = () => {
				this.setState({
					src: reader.result,
					cropping: true
				})
			}
			// reader.addEventListener('load',(this) => this.setState({src: reader.result}), false);
			reader.readAsDataURL(e.target.files[0]);
			//invalidate the selected content once file data has been changed or added
			console.log('calling clientInvalidateEntity() from CroppableImageForm.js');
			//this.props.clientInvalidateEntity(this.props.addedEntities.contents[this.props.entitiesStateReducer.contents.selected].items),  OxiAppConstants.EntityTypes.ITEM)();
			this.props.clientInvalidateEntity([this.props.entitiesStateReducer.contents.selected], OxiAppConstants.EntityTypes.CONTENT)();
			this.props.clientInvalidateEntity([this.props.entitiesStateReducer.contents.selected], OxiAppConstants.EntityTypes.PICTURE)();
		}
	}

	_onImageLoaded(image){
		this.props.updateImageDimension(image.width, image.height);
		this.setState({	
			crop: makeAspectCrop({
			 	x: 0,
			 	y: 0,
			 	aspect: 2 / 3,
			 	width: 100,
			}, image.width / image.height),
		});	
	}

	_onCropComplete(crop){
	 	console.log('onCropComplete', crop);
		//May be fine with having this called made in _onSelectFile only depending on the crop initiation logic 
	}

	_onCropChange(crop){
	  this.setState({ crop });
	}

	_handleImageLoad(event){
		this.setState({
			imageX: event.target.getBoundingClientRect().left,
			imageY: event.target.getBoundingClientRect().top,
			imageWidth: event.target.width,
			imageHeight: event.target.height,
		})
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

	render(){
		console.log('addedEntities from CroppableImageForm render function = ', this.props.addedEntities);
		let submitButton = (this.state.submittable ? (<button id="submitButton" type="submit" onClick={this._handleSubmit} style={{display:'none'}}>Upload Image</button>) : null);
		let content = null;
		let {imageElement} = this.props
		if(this.state.cropping){
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
					src={(this.state.src || this.props.src) || (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg")}
					crop={this.state.crop}
					onImageLoaded={this._onImageLoaded}
					onComplete={this._onCropComplete}
					onChange={this._onCropChange}
					setupImageRef={this.props.setupImageRef}
					//setupCropImgContainerRef={this.setupCropImgContainerRef}
				/>
			)
		}else{
			this.state.crop.height
			content = (
				<img 
					style={Object.assign({}, this.props.imgStyle)} 
					src={(this.state.src || this.props.src) || (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg")} 
					onClick={this.props.onImageClick} 
					onLoad={this._handleImageLoad} 
					ref={this.props.setupImageRef}/>
			)
		}
		return (
			<div style={this.props.imgFormStyle}>
				<div
					className={FormStyles.controlContainerStyle} 
					style={{
						width:`${this.props.imageElement.clientWidth}px`,
						display: this.props.imageElement.clientWidth > 0 ? 'inline-flex' :  'none'
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
					<input id="fileInput" type="file" multiple name="imageFile" onChange={this._onSelectFile} style={{display:'none'}} />
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
						{this.state.cropping ? null : (this.props.itemLocationMap(this.props.itemMapDimension) || null)}
					</div>
				</div>
			</div>
		)
	}
}

export default CroppableImageForm;