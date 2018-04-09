

//constructs and sends a custom XMLHttpRequest
//parameters:
//	headers:		associative array of header desired header values to be sent with this request
//	data:			associative array of data being sent
//	reqMethod: 		string indicating the request type (ie: GET, POST, etc)
//	url:			string indicating the url for the request 
//	_handleOnLoad: 	function for handling additional user defined tasks after onload event
export const sendAsyncRequest(	state,
								headers, 
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
						//DoTo:  Throw exception
						resolve(this.status);
						break;
					}

				/*
				Handle REDIRECT response status.  
				*/
				case OxiAppConstants.HttpStatus.REDIRECT:
					//handle redirect login here:

					//Check if login is required
					if(xhr.getResponseHeader('loginRequired') === 'True'){
						//show the login for
						resolve(this.status);
					}else{
						return;
					}
					resolve(this.status);
					break;

				/*
				handle custom redirect here.  Custom redirect used to prevent browser from navigating
				to the redirect url in the same async request.  This allows for the client to do its necessary
				house work for establishing a token with the server.  
				*/
				case OxiAppConstants.HttpStatus.CUSTOM_REDIRECT:

					//Save X-CSRF-TOKEN returned by server to the application store
					store.dispatch(setXcsrfToken(xhr.getResponseHeader('X-CSRF-TOKEN')));
					//Present Login form
					store.dispatch(setFormVisibility("Login"));

					//send GET request for login form
					////sendAsyncRequest({}, '', 'GET', xhr.getResponseHeader(locationHeader), (resolve, reject, xhr) => {
						//Load login html in modal
						//if (store.getState(debug)) console.log('status: ' + xhr.status);
						/*let content = <loginForm actionUrl={OxiAppConstants.apiBaseUrl+'/login'} closeForm={OxiAppConstants.widgets.hideModal}/>;
						loadLoginModal(content);*/
						/*store.dispatch(setFormVisibility("Login"));
						switch (xhr.status){
							case OxiAppConstants.HttpStatus.SUCCESS:
								//build modal
								console.log("success detected");
								loadLoginModal("loginForm actionUrl={OxiAppConstants.apiBaseUrl+'/login'} closeForm={OxiAppConstants.widgets.hideModal}");
								break;
							default:
								reject(xhr.statusText);
						}
					});*/
					resolve(this.status);
					break;
				default:
					reject(this.statusText);
			}		
		}
		xhr.send();
	});
}

