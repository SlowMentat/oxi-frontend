import React from 'react';
import { connect } from 'react-redux';
import { setFormVisibility, createItem } from '../../Components/Actions/indexActions.js';
import FormStyles from '../../forms.css';
import Styles from '../../root.css';
import ContentStyles from '../../content.css';
import VisibleContentList from '../Containers/VisibleContentList';

const imgStyle = {
	width: '100%',
	'max-height': 'inherit',
	height: 'auto',
	display: 'block',
	'border-radius': '4px',
	'object-fit': 'cover',
    /*'margin-top': '31%'		/*This is the heigt of the previes row (55%) divided by 2 and added to the height of the header (5%)*/
}

const imgFormStyle = {
	display:'inline-block',
	margin:'auto',
	height:'100%', 
	'max-width': '50%',
	padding: '0px 5% 0px 5%',
	'background-color':'#212121'
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


const ShowContentView = ({context, onImgClick}) => {
	console.log("in showContentView");
	switch(context){
		case "edit":
			return(
				<div className={FormStyles.formContentContainer}>
					<div className={FormStyles.imageUploadPreview}>			
						<VisibleContentList />	
						<ImageUpload onClick={onImgClick}/>
					</div>
				</div>
			);
		case "view":
			return(				
				<div className={FormStyles.formContentContainer}>		
					<div className={FormStyles.imageUploadPreview}>				
						<VisibleContentList />
					</div>
				</div>
			)
		default:
			console.log("nothing selected")
			return
	}
}

class ImageUpload extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			imagePreviewUrl: ''
		};
		this._handleImgChange = this._handleImgChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleImgMouseOver = this._handleImgMouseOver.bind(this);
		this._handleImgClick = this._handleImgClick.bind(this);
	}

	_handleSubmit(event) {
		// TODO: do something with -> this.state.file
		uploadImage(this.state.file);
		event.preventDefault();
	}

	_handleImgChange(event) {
		//event.preventDefault();

		let reader = new FileReader();
		let file = event.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			});
		}

		reader.readAsDataURL(file)
	}

	_handleImgMouseOver(event) {

	}

	_handleImgClick(event) {
		event.stopPropagation();
		console.log("image clicked!!");
		//store clicked location
		//call item form
		this.props.onClick();
		//store.dispatch(setFormVisibility("AddItem"));
		//event.preventDefault();//maybe event.stopPropagation
	}
	_handleOpenFile(event){
		this.props.confirmDiscard
	}

	render() {
		let {imagePreviewUrl} = this.state;
		let $imagePreview = null;
		let defaultImage = "Graphics/photo_upload_icon.svg"
		if (imagePreviewUrl) {
			$imagePreview = (
				<img style={imgStyle} 
					onmouseover={this._handleImgMouseOver} 
					onClick={this._handleImgClick} 
					src={imagePreviewUrl} 
				/>
			);
		}else{
			console.log("no img URI detected")
			$imagePreview = (
				<label for="fileInput">
					<img style={imgStyle} src={defaultImage}/>
				</label>
			);			
		}
		return (
			<div style={imgFormStyle}>	
				<div style={controlContainerStyle}>
					<label for="fileInput">
						<div style={imgFormControlStyle} onClick={this._handleOpenFile}>File</div>
					</label>
					<div style={imgFormControlStyle}>Discard</div>
					<div style={imgFormControlStyle}>Submit</div>
				</div>
				<form onSubmit={this._handleSubmit} style={{positon:'absolute','text-align':'center',display:'inline'}}>
					<input id="fileInput" type="file" onChange={this._handleImgChange} style={{display:'none'}} />
					<button type="submit" onClick={this._handleSubmit} style={{display:'none'}}>Upload Image</button>
				</form>
				<div style={{width:'auto',padding:'0px 10% 0px 10%','background-color':'#000000','max-height':'100%'}}>
					{$imagePreview}
				</div>
			</div>
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
		console.log("isVisible = " + this.props.isVisible +", editView = " + this.props.editView)
		if(this.props.isVisible){
			if(this.props.editView){
				viewContext = "edit"
			}else{
				viewContext = "view"
			}
		}		
		return(
    		<div className={Styles.previewBlock}>    			
				<ShowContentView  context={viewContext} onImgClick={this.props.onImgClick}/>
    		</div>
		);
	}
}

export default ContentView;