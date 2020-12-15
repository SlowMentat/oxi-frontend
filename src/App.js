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
import { Provider, ReactReduxContext, batch } from 'react-redux';
//import Cookies from 'universal-cookie';
//import fetch from 'cross-fetch';
import axios from 'axios';
import { 
	//BrowserRouter, 
	Route, 
	Switch, 
	Redirect 
} from 'react-router-dom';
// Re-export with a default theme
import { StylesProvider } from '@material-ui/core/styles';


//import {MDCRipple} from '@material/ripple';
//const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

//CSS Components
//import 'react-image-crop/dist/ReactCrop.css';

//Display Components
/*const PageLogin = lazy(() => import('./Components/Presentations/PageLogin.js'));
const PageUpdatePassword = lazy(() => import('./Components/Presentations/PageUpdatePassword.js'));

//Container Components
const ModalContentSelection = lazy(() => import('./Components/Containers/SelectModalContent.js'));
const VisibleItemList = lazy(() => import('./Components/Containers/VisibleItemList.js'));
const VisibleOutfitList = lazy(() => import('./Components/Containers/VisibleOutfitList.js'));
const PicturePreviewContainer = lazy(() => import('./Components/Containers/PicturePreviewContainer.js'));
const WebAppView = lazy(() => import('./Components/Containers/WebAppViewContainer.js'));
const LandingPageContainer = lazy(() => import('./Components/Containers/LandingPageContainer.js'));*/
//import { SiteNav } from './Components/Presentations/WebAppView.js';

import PageLogin from './Components/Presentations/PageLogin.js';
import PageUpdatePassword from './Components/Presentations/PageUpdatePassword.js';

//Container Components
import ModalContentSelection from './Components/Containers/SelectModalContent.js';
import VisibleItemList from './Components/Containers/VisibleItemList.js';
import VisibleOutfitList from './Components/Containers/VisibleOutfitList.js';
import PicturePreviewContainer from './Components/Containers/PicturePreviewContainer.js';
import WebAppView from './Components/Containers/WebAppViewContainer.js';
import LandingPageContainer from './Components/Containers/LandingPageContainer.js';


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

import { createBrowserHistory, createHashHistory } from 'history';
//import createHashHistory from 'history/createHashHistory';

import { routerMiddleware } from 'connected-react-router';
import { ConnectedRouter } from 'connected-react-router'

import { Portal } from '@rmwc/base';

//Constants
import {OxiAppConstants} from './Util/OxiAppConstants.js';


//export const history = createBrowserHistory();
//export const history = isDevice ? createHashHistory() : createBrowserHistory();
Object.defineProperty(window, 'history', { 
	value: isDevice ? createHashHistory() : createBrowserHistory(),
	configurable:true,
	enumerable:true,
	writable:true 
});

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
//const store = createStoreWithBatching(
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

axios.interceptors.response.use((response) => store.dispatch(handleUnauthorizedRequest(response)));
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
							// /account/user/register and anything else not caught above
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
	}
}

export const WrapMuiProviders = (children) => (

	<RMWCProvider
		// Set global configuration options for RMWC here
		// ex:
		// 		ripple={false}
		// 		typography={{ defaultTag:'div' }}
		typography={{
			button: ({ children, ...rest }) => (
				<span style={{font: '12px'}}>
					{ children }
				</span>
			),
			headline4: ({ children, ...rest }) => (
				<div 
					id="headline4" 
					style={{
						'font-family': 'Roboto',
   						color: 'var(--color1)',
   						'font-size': '1.8rem',
   						'font-weight': 'bold',
   						'letter-spacing': '.1rem',
					}}
				>
					{children}
				</div>
			),
			headline5: ({ children, otherStyles, ...rest }) => (
				<div 
					id="headline5" 
					style={{
						'font-family': 'Roboto',
   						color: 'var(--color1)',
   						'font-size': '1.6rem',
   						'font-weight': 'bold',
   						'letter-spacing': '.1rem',
   						...otherStyles,
					}}
				>
					{children}
				</div>
			),
			headline6: ({ children, ...rest }) => (
				<div 
					id="headline6" 
					style={{
						'font-family': 'Roboto',
   						color: 'var(--color1)',
   						'font-size': '1.4rem',
   						'font-weight': 'bold',
   						'letter-spacing': '.1rem',
					}}
				>
					{children}
				</div>
			),
			subtitle2: ({ children, otherStyles, ...rest }) => (
				<span 
					id="subtitle2" 
					style={{
						'font-family':'Roboto',
   						'font-size': '1.2rem',
   						color:'gray',
   						...otherStyles,
					}}
				>
					{children}
				</span>
			),
			subtitle3: ({ children, ...rest }) => (
				<span 
					id="subtitle3" 
					style={{
						'font-family':'Roboto',
   						'font-size': '1.4rem',
   						color:'gray',
					}}
				>
					{children}
				</span>
			),
			subtitle4: ({ children, ...rest }) => (
				<span 
					id="subtitle4" 
					style={{
						'font-family':'Roboto',
   						'font-size': '1.6rem',
   						color:'gray',
					}}
				>
					{children}
				</span>
			)
		}}
	>	
		<ThemeProvider
			options={{
				primary: 'var(--color-01)',
				secondary: 'var(--color-05-tint-02)',
			}}
		>
			{ children }
		</ThemeProvider>
	</RMWCProvider>
);

const startApp = () => {
	/*if(window.device && device.platform === 'iOS'){
		styles.base.paddingTop = '20px';
	}*/

	ReactDOM.render(
		<Provider store={store} context={ReactReduxContext}>
			<StylesProvider injectFirst>
				<ConnectedRouter history={history}  context={ReactReduxContext}>
					{ WrapMuiProviders(<Route path="/" component={App}/>) }
				</ConnectedRouter>
				<Portal />
			</StylesProvider>
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