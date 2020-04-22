/*import "core-js";
import "regenerator-runtime/runtime";*/

// !Must be imported before any other stylesheet
import '@rmwc/typography/styles';
import '@rmwc/theme/styles';
import { RMWCProvider } from '@rmwc/provider';
import { ThemeProvider } from '@rmwc/theme';


import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { Provider, ReactReduxContext  } from 'react-redux';
//import Cookies from 'universal-cookie';
//import fetch from 'cross-fetch';
import axios from 'axios';
import { 
	//BrowserRouter, 
	Route, 
	Switch, 
	Redirect 
} from 'react-router-dom';

//import {MDCRipple} from '@material/ripple';
//const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

//CSS Components
//import 'react-image-crop/dist/ReactCrop.css';

//Display Components
const PageLogin = lazy(() => import('./Components/Presentations/PageLogin.js'));
const PageUpdatePassword = lazy(() => import('./Components/Presentations/PageUpdatePassword.js'));

//Container Components
const ModalContentSelection = lazy(() => import('./Components/Containers/SelectModalContent.js'));
const VisibleItemList = lazy(() => import('./Components/Containers/VisibleItemList.js'));
const VisibleOutfitList = lazy(() => import('./Components/Containers/VisibleOutfitList.js'));
const PicturePreviewContainer = lazy(() => import('./Components/Containers/PicturePreviewContainer.js'));
const WebAppView = lazy(() => import('./Components/Containers/WebAppViewContainer.js'));
const LandingPageContainer = lazy(() => import('./Components/Containers/LandingPageContainer.js'));
//import { SiteNav } from './Components/Presentations/WebAppView.js';

//Reducers
//import _OxiApp from './Components/Reducers/indexReducers.js';
import createRootReducer from './Components/Reducers/indexReducers.js';

//Actions
import {
	//showModal, 
	//setFormVisibility, 
	//setXcsrfToken, 
	//fetchEntities, 
	handleUnauthorizedRequest, 
	insertCsrfToken, 
	cookies,
} from './Components/Actions/indexActions.js';

//See instructions when adding enhancers and middlewares
import { devToolsEnhancer } from 'redux-devtools-extension';
import { composeWithDevTools } from 'redux-devtools-extension';
//import devTools from 'remote-redux-devtools';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { ConnectedRouter } from 'connected-react-router'

//Constants
import {OxiAppConstants} from './Util/OxiAppConstants.js';


export const history = createBrowserHistory();

const loggerMiddleware = createLogger();

const middleware = [
	routerMiddleware(history), //for dispatching history actions
	thunkMiddleware, 
	loggerMiddleware,
];

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
//log initial store state
//subscribe logging callback to store state change
const store = createStore(
	createRootReducer(history), //root reducer with router state
	//_OxiApp,
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
	}, composeEnhancers(applyMiddleware(...middleware),/*other store enhancers if any*/) 
	//devToolsEnhancer(/*Specify name here, actionsBlacklist, actionsCreators and other options if needed*/)
);

console.log("Initialized Store")
console.log(store.getState());
const unsubscribeStore = store.subscribe(() => console.log(store.getState()));

//set axios defult headers
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

if(cookies.get('authorization')){
	axios.defaults.headers.common['authorization'] = cookies.get('authorization');
}

//axios.defaults.headers.common['Authorization'] = 'Bearer';
//axios.defaults.headers.common['Origin'] = 'https://'

//Set interceptor for responses with unauthorized status.
//This will save the provided csrf token dispatch the login Form for authentication.
axios.interceptors.response.use((response) => store.dispatch(handleUnauthorizedRequest(response)));

//include the csrf_token from cookies in the X-CSRF-TOJEN header for each request.
axios.interceptors.request.use(insertCsrfToken);

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			enableAddOutfitButton: true,
			toPortal: '',
		};

		this._handlePortalSelect = this._handlePortalSelect.bind(this);
	}

	_handlePortalSelect(portal){
		this.setState(prevState => ({
			toPortal: portal,
		}));
	}

	render() {
		return(	
			<React.Fragment>
				<Suspense fallback={null}>	
					<Switch>
						<Route push={true} path={OxiAppConstants.routeURIs.shop} component={WebAppView} />
						<Route push={true} path={OxiAppConstants.routeURIs.login} component={WebAppView} />
						{/*<Route push={true} path={'/account/user/confirm/user/login'} render={props => (<LoginPage/>)} />*/}
						<Route 
							push={true} 
							path={'/verification/user/failedRegistration'} 
							render={
								props => 
									<PageLogin 
										isIntentToRegister={true}  
										requestUrl={`${OxiAppConstants.apiBaseURL}/account/user/sendVerificationEmail`}
										requestType="GET"
										{...props} 
									/>
							} 
						/>
						<Route
							push={true}
							path={'/form/user/updatePassword'}
							render={
								props => 
									<PageUpdatePassword
										requestUrl={`${OxiAppConstants.apiBaseURL}/account/edit/password`}
										requestType="POST"
										{...props}
									/>
							}
						/>
						<Route 
							path={this.props.match.url} 
							render={({match, location, history}) => (
								<div id="LandingPageContainer_div">
									{/*<SiteNav webAppView='landing'/>*/}
									<LandingPageContainer navEventCallbacks={() => (null)} handlePortalSelect={(toPortal) => this._handlePortalSelect(toPortal)}/>
								</div>
							)} 
						/>
					</Switch>
				</Suspense>
			</React.Fragment>
		);
		store.getState.router.location.pathnam
		// first route based on URIs other than / in the address border-radius

		// find route based on toPortal stat property
		//switch(this.state.toPortal){
		//	case OxiAppConstants.toPortals.consumer:
		//		return (
		//			<React.Fragment>
		//				<Redirect push={true} to={OxiAppConstants.routeURIs.browse}/>
	   	//			<Route path={this.props.match.url + 'shop'} component={ WebAppView }/>
	   	//		</React.Fragment>
		//		);
		//		break;
		//	case OxiAppConstants.toPortals.retailer:
		//		return <Redirect push to='/retailer'/>;
		//		break;
		//	case OxiAppConstants.toPortals.designer:
		//		return <Redirect push to='/designer'/>;
		//		break;
		//	default: // Default to landing page or predefined urls 
		//		return(	
		//			<React.Fragment>	
		//				<Switch>
		//					<Route push={true} path={OxiAppConstants.routeURIs.shop} component={WebAppView} />
		//					<Route push={true} path={OxiAppConstants.routeURIs.login} component={WebAppView} />
		//					<Route push={true} path={'/account/user/confirm/user/login'} render={props => (<LoginPage/>)} />
		//					<Route path={this.props.match.url} render={({match, location, history}) => (
		//						<div id="LandingPageContainer_div">
		//							{/*<SiteNav webAppView='landing'/>*/}
		//							<LandingPageContainer navEventCallbacks={() => (null)} handlePortalSelect={(toPortal) => this._handlePortalSelect(toPortal)}/>
		//						</div>
		//					)} />
		//				</Switch>
		//			</React.Fragment>
		//		);
		//}
	}
}

	//<Provider store={store}>
	//	<BrowserRouter>
	//		<Route path="/" component={App} />
	//	</BrowserRouter>
	//</Provider>,
	//document.getElementById('root')

const startApp = () => {
	/*if(window.device && device.platform === 'iOS'){
		styles.base.paddingTop = '20px';
	}*/

	ReactDOM.render(
		<Provider store={store} context={ReactReduxContext}>
			<ConnectedRouter history={history}  context={ReactReduxContext}>
				<RMWCProvider
					// Set global configuration options for RMWC here
					// ex:
					// 		ripple={false}
					// 		typography={{ defaultTag:'div' }}
				>	
					<ThemeProvider
						options={{
							primary: 'var(--color-02-shade-01)',
							secondary: 'var(--color-05-tint-01)',
						}}
					>
						<Route path="/" component={App}/>
					</ThemeProvider>
				</RMWCProvider>
			</ConnectedRouter>
		</Provider>,
		document.getElementById('root')
	);
}

if(!window.cordova){
	startApp()
}
else{
	document.addEventListener('deviceready', startApp, false);
}