import Cookies from 'universal-cookie';
import {OxiAppConstants} from '../Util/OxiAppConstants.js';



const cookies = new Cookies();
//constructs and sends a custom XMLHttpRequest
//parameters:
//	headers:		associative array of header desired header values to be sent with this request
//	data:			associative array of data being sent
//	reqMethod: 		string indicating the request type (ie: GET, POST, etc)
//	url:			string indicating the url for the request 
//	_handleOnLoad: 	function for handling additional user defined tasks after onload event
export default function sendAsyncRequest(headers, 
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

		xhr.onload = function(_handleOnSuccess){
			switch (this.status){
				/*
				Handle SUCCESS status with custom function 
				*/
				case OxiAppConstants.HttpStatus.SUCCESS:
					//custom event handler on success
					if(	_handleOnSuccess != NaN && _handleOnSuccess != null && _handleOnSuccess != ""){
						_handleOnSuccess();
					}
					resolve(this.status);
					break;
				/*
				*Handle REDIRECT response status.  
				*/
				case OxiAppConstants.HttpStatus.NOT_FOUND:
					if(_handleOnSuccess != null){
						_handleOnSuccess();
					}
					resolve(this.status);
					break;
				/*
				*handle custom redirect here.  Custom redirect used to prevent browser from navigating
				*to the redirect url in the same async request.  This allows for the client to do its necessary
				*house work for establishing a token with the server.  
				*/
				case OxiAppConstants.HttpStatus.UNAUTHORIZED:
					//Save X-CSRF-TOKEN returned by server to the application store
					//store.dispatch(setXcsrfToken(xhr.getResponseHeader('X-CSRF-TOKEN')));
					cookies.set('csrf_token', xhr.getResponseHeader('X-CSRF-TOKEN'));
					//Present Login form
					store.dispatch(setFormVisibility("Login"));
					resolve(this.status);
					break;
				default:
					reject(this.statusText);
			}		
		}
		xhr.send(data);
	});
}