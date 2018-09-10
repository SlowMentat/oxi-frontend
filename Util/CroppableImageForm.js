import React from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
//import {ReactCropStyles} from 'react-image-crop/dist/ReactCrop.css';
import {ReactCropStyles} from '../reactCrop.css';
import {OxiAppConstants} from './OxiAppConstants.js';


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
				canvas.width,	//The width of the sub-rectangle of the source image to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by sx and sy to the bottom-right corner of the image is used.
				canvas.height,	//The height of the sub-rectangle of the source image to draw into the destination context.
				0,				//The X coordinate in the destination canvas at which to place the top-left corner of the source image.
				0,				//The Y coordinate in the destination canvas at which to place the top-left corner of the source image.
				canvas.width,	//The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
				canvas.height 	//The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
			);
			resolve(canvas.toDataURL('image/jpeg'));
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
			crop: {
				x: 25,
				y: 0,
				width: 0,
				height: 0,
				aspect: this.height * OxiAppConstants.aspectRatio
			}
		}

		this._handleSubmit = this._handleSubmit.bind(this);
		this._onSelectFile = this._onSelectFile.bind(this);
		this._onImageLoaded = this._onImageLoaded.bind(this);
		this._onCropComplete = this._onCropComplete.bind(this);
		this._onCropChange = this._onCropChange.bind(this);
		this._handleAcceptCrop = this._handleAcceptCrop.bind(this);
	}

	_handleSubmit(e) {
		e.preventDefault();
		// TODO: do something with -> this.state.file
		//postChanges(this.state.file);
		this.state.cropping === false ? this.props.postChanges(this.state.src) : console.log('please finish cropping befor submiting image');
		//event.preventDefault();
	}

	_handleAcceptCrop(event){
		if(this.state.cropping){
			getCroppedImg(this.state.src, this.state.crop, 'croppedResult', this.state.maxWidth, this.state.maxHeight)
			.then(croppedFile => {				
				this.setState({
					src: croppedFile,
					cropping: false
				});
			})
		}
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
		}
	}

	_onImageLoaded(image){		
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
	}

	_onCropChange(crop){
	  this.setState({ crop });
	}

	render(){
		let submitButton = (this.state.submittable ? (<button id="submitButton" type="submit" onClick={this._handleSubmit} style={{display:'none'}}>Upload Image</button>) : null);
		let content = null;
		if(this.state.cropping){
			content = (
				<ReactCrop
					className={ReactCropStyles}
					src={this.state.src}
					crop={this.state.crop}
					onImageLoaded={this._onImageLoaded}
					onComplete={this._onCropComplete}
					onChange={this._onCropChange}
				/>
			)
		}else{
			content = (
				<img style={this.props.imgStyle} src={this.state.src} onClick={this.props.onImageClick}/>
			)
		}
		return (
			<div style={this.props.imgFormStyle}>
				<div style={this.props.controlContainerStyle}>
					<label for="fileInput">
						<div style={this.props.imgFormControlStyle}>File</div>
					</label>
					<div style={this.props.imgFormControlStyle} onClick={this.props.discardChanges}>Discard</div>
					<label for="submitButton">
						<div style={this.props.imgFormControlStyle}>Submit</div>	
					</label>				
					<div style={this.props.imgFormControlStyle} onClick={this._handleAcceptCrop}>Crop</div>
				</div>
				<form enctype="multipart/form-data" style={{positon:'absolute','text-align':'center',display:'inline'}}>
					<input id="fileInput" type="file" name="imageFile" onChange={this._onSelectFile} style={{display:'none'}} />
					<button id="submitButton" type="submit" onClick={this._handleSubmit} style={{display:'none'}}>Upload Image</button>
				</form>
				<div style={{width:'auto',padding:'0px 10% 0px 10%','padding-top':'calc(5vh + 25px)', 'background-color':'#ececec','max-height':'100%'}}>
					{content}
				</div>
			</div>
		)
	}
}

export default CroppableImageForm;