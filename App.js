import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import fetch from 'cross-fetch';
import axios from 'axios';

//CSS Components
import Styles from './root.css';
import ItemStyles from './item.css';
import NavStyles from './nav.css';
import OutfitNavStyles from './outfitNav.css';
import FormStyles from './forms.css';
import 'react-image-crop/dist/ReactCrop.css';

//Display Components
import FormDeck from './Components/Presentations/Forms.js';
import FilledModal from './Components/Presentations/Modal.js';

//Container Components
import ModalContentSelection from './Components/Containers/SelectModalContent.js'
import VisibleItemList from './Components/Containers/VisibleItemList.js'
import VisibleOutfitList from './Components/Containers/VisibleOutfitList.js'
import ContentContainer from './Components/Containers/ContentContainer.js'
import WebAppView from './Components/Containers/WebAppViewContainer.js'

//Reducers
import _OxiApp from './Components/Reducers/indexReducers.js';
import {showModal, setFormVisibility, setXcsrfToken, fetchEntities, handleUnauthorizedRequest, insertCsrfToken} from './Components/Actions/indexActions.js';

//See instructions when adding enhancers and middlewares
import { devToolsEnhancer } from 'redux-devtools-extension';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();
const middleware = [thunkMiddleware, loggerMiddleware];
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
//log initial store state
//subscribe logging callback to store state change
const store = createStore(_OxiApp,
	{
		toggleModal : {
			'modal':'HIDDEN',
			'isModalVisible':true,
			'prevRequestUrl':null,
			'prevRequestType':null,
			'otherData':{}
		},
		saveToken : {},
		entitiesReducer : {
		}
	}, composeEnhancers(applyMiddleware(...middleware), /*other store enhancers if any*/) 
	//devToolsEnhancer(/*Specify name here, actionsBlacklist, actionsCreators and other options if needed*/)
);
console.log("Initialized Store")
console.log(store.getState());
const unsubscribeStore = store.subscribe(() => console.log(store.getState()));
const cookies = new Cookies();

//Constant global variables
//TODO:  Thios was moved to .../Util/OxiAppConstants.  Replace references to this definition in other modules with new location.
export const OxiAppConstants = Object.freeze({	
	debug : false,
	HttpStatus : {
		OK: 200,
		CREATED:201,
		REDIRECT:302,
		UNAUTHORIZED:401,
		NOT_FOUND:404,
		CUSTOM_REDIRECT:902
	},
	outfitFormRoot : document.getElementById('outfitForm'),
	modalRoot : document.getElementById('modalRoot'),
	apiBaseUrl : 'http://72.14.177.220/gs-convert-jar-to-war-0.1.0',
	navRequestMap : {
		home : () => store.dispatch(setWebAppView("home")),
		profile : () => store.dispatch(setWebAppView("home")),
		settings : () => store.dispatch(setWebAppView("home")),
		search : () => store.dispatch(setWebAppView("home")),
		logout : () => sendAsyncRequest({}, {}, 'POST', 'http://72.14.177.220/gs-convert-jar-to-war-0.1.0/logout', null)
	},
	EntityTypes : {
		PROFILE : "PROFILE",
		OUTFIT : "OUTFIT",
		CONTENT: "CONTENT",
		ITEM : "ITEM",
		ITEM_CONTENT : "ITEMCONTENT",
		PICTURE : "PICTURE"
	}
});

//set axios defult headers
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

//Set interceptor for responses with unauthorized status.
//This will save the provided csrf token dispatch the login Form for authentication.
axios.interceptors.response.use((response) => store.dispatch(handleUnauthorizedRequest(response)));

//include the csrf_token from cookies in the X-CSRF-TOJEN header for each request.
axios.interceptors.request.use(insertCsrfToken);


function navButton(props){
	return(
		<div className={Styles.navButton}>

		</div>
	);
}


function OutfitFormContent(props){
	return(
		<div>
			<p>Outfit Form Content</p>
		</div>
	);
}

function uploadImage(imageFile){
	let headers = {};
	let imageFormData = new FormData();
	imageFormData.append('imageFile', imageFile);
	sendAsyncRequest(
					headers, 
					imageFormData, 
					'POST', 
					OxiAppConstants.apiBaseURL+'/upload',
					null);	
}

//constructs and sends a custom XMLHttpRequest
//parameters:
//	headers:		associative array of header desired header values to be sent with this request
//	data:			associative array of data being sent
//	reqMethod: 		string indicating the request type (ie: GET, POST, etc)
//	url:			string indicating the url for the request 
//	_handleOnLoad: 	function for handling additional user defined tasks after onload event
export function sendAsyncRequest(headers, 
							data,
							reqMethod, 
							url, 
							_handleOnSuccess){
	return new Promise((resolve, reject) => {
		const locationHeader = 'location';
		var xhr = new XMLHttpRequest();
		xhr.open(reqMethod, url, true);

		//X-Request-With added to flag server response with loginRequired custom response header on authenticaiton failure
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		//Set the X-CSRF-TOKEN header with 'xCsrfToken' value from store
		xhr.setRequestHeader('X-CSRF-TOKEN', cookies.get('csrf_token'));
		
		//assign headers for the XMLHttpRequest object		
		for(let [key, value] of Object.entries(headers)){
			xhr.setRequestHeader(key, value);
		}

		//Default contentType header.  Added if contentTyp is not specified in headers parameter
		'contentType' in headers ? null : xhr.setRequestHeader('conentType', 'application/x-www-form-urlencoded; charset=UTF-8');
		
		//set onload event handler if provided.

		xhr.onload = function(e, _handleOnSuccess){
			/*
			Handle SUCCESS status with custom function 
			*/
			if(this.status === OxiAppConstants.HttpStatus.OK ||
				this.status === OxiAppConstants.HttpStatus.CREATED){
				//custom event handler on success
				if(	_handleOnSuccess != NaN && _handleOnSuccess != null && _handleOnSuccess != ""){
					_handleOnSuccess();
				}
				resolve(this.responseText);
			}
			else if(this.status === OxiAppConstants.HttpStatus.NOT_FOUND){
				if(_handleOnSuccess != null){
					_handleOnSuccess();
				}
				resolve(this);
			}				
			/*
			*handle custom redirect here.  Custom redirect used to prevent browser from navigating
			*to the redirect url in the same async request.  This allows for the client to do its necessary
			*house work for establishing a token with the server.  
			*/
			else if(this.status === OxiAppConstants.HttpStatus.UNAUTHORIZED){
				//Save X-CSRF-TOKEN returned by server to the application store
				//store.dispatch(setXcsrfToken(xhr.getResponseHeader('X-CSRF-TOKEN')));
				cookies.set('csrf_token', xhr.getResponseHeader('X-CSRF-TOKEN'));
				//Present Login form
				store.dispatch(setFormVisibility("Login"));
				resolve(this);
			}
			else{
				reject(this);
			}		
		}
		xhr.send(data);
	});
}

//TESTING
class Child extends React.Component{
	constructor(props){
		super(props);
		this._handleSubmit = this._handleSubmit.bind(this);
	}
	_handleSubmit(){
		this.props.handleSubmit;
	}
	// The click event on this button will bubble up to parent,
	// because there is no 'onClick' attribute defined
	render(){
		return (
			<div className={Styles.modal}>
				<FormDeck form="Login" onClick={this._handleSubmit}/>
			</div>
		);
	}
}

class ImageUpload extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			imagePreviewUrl: ''
		};
		this._handleImageChange = this._handleImageChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleMouseOver = this._handleMouseOver.bind(this);
		this._handleOnClick = this._handleOnClick.bind(this);
	}

	_handleSubmit(e) {
		e.preventDefault();
		// TODO: do something with -> this.state.file
		uploadImage(this.state.file);
	}

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			});
		}

		reader.readAsDataURL(file)
	}

	_handleMouseOver(e) {

	}

	_handleOnClick(e) {
		e.preventDefault();
		console.log("image clicked!!");
		//store clicked location
		//call item form
		store.dispatch(setFormVisibility("AddItem"));
	}

	render() {
		let {imagePreviewUrl} = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = (<img style={{width:'auto',height:'95%',display:'block',margin:'auto','margin-top':'12px','border-radius':'4px'}} onmouseover={this._handleMouseOver} onClick={this._handleOnClick}	src={imagePreviewUrl} />);
		}
		return (
			<div style={{margin:'auto',height:'500px'}}>
				<form onSubmit={this._handleSubmit} style={{positon:'absolute','text-align':'center',display:'inline'}}>
					<input type="file" onChange={this._handleImageChange} />
					<button type="submit" onClick={this._handleSubmit}>Upload Image</button>
				</form>
				{$imagePreview}
			</div>
		)
	}
}



class OutfitForm extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
	}

	componentWillUnmount(){
	}

	render(){
		return(
			<div className={FormStyles.formContentContainer}>	
				<div className={FormStyles.outfitFormControl}>
						Cancel
				</div>			
				<div className={FormStyles.imageUploadPreview}>
						<ImageUpload />
				</div>
			</div>
		);
	}
}

class ContentNav extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		 
	}

	componentWillUnmount(){

	}

	handleAddOutfitClick(){

	}

	render(){
		const containerLabel = "Content Navigation"
		//constructs null or OutfitForm component depending on the state of showOutfitForm
		const outfitForm = this.props.showOutfitForm ? (
			<OutfitForm />
		) :	containerLabel;
		return(
    		<div className={Styles.previewBlock}>
    			{outfitForm}
    		</div>
		);
	}
}



class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			enableAddOutfitButton: true
		};
	}

	render() {
		//const formContent = this.state.showModal ? <Child actionUrl="" handleSubmit={this._hideModal}/> : null;
	    return(
	    	<WebAppView />
		);
	}
}

ReactDOM.render(
	<Provider store={store}>
		<App name="item menu"/>
	</Provider>,
	document.getElementById('root')
);