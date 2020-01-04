import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import test from '../../test.scss';
//Container Components
import ModalContentSelection from '../../Components/Containers/SelectModalContent.js';
import VisibleItemList from '../../Components/Containers/VisibleItemList.js';
import VisibleItemListBrowse from '../../Components/Containers/VisibleItemListBrowse.js';
import VisibleOutfitList from '../../Components/Containers/VisibleOutfitList.js';
import PicturePreviewContainer from '../../Components/Containers/PicturePreviewContainer.js';
import OutfitPanelContainer from '../../Components/Containers/OutfitPanelContainer.js'
import VisibleMetricList from '../../Components/Containers/VisibleMetricList.js'
import ProfileTitleContainer from '../../Components/Containers/ProfileTitleContainer.js';
import LandingPageContainer from '../../Components/Containers/LandingPageContainer.js';
import BrowseControlContainer from '../../Components/Containers/BrowseControlContainer.js';
import ProfileControlContainer from '../../Components/Containers/ProfileControlContainer.js';
import ProfileMenuContainer from '../../Components/Containers/ProfileMenuContainer.js';
import { MetricPanel } from '../../Components/Presentations/MetricPanel.js'
import ProfileViewControlsContainer from '../../Components/Containers/ProfileViewControlsContainer.js';

import {SvgIcon} from '../../Components/SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {Button} from '../../Components/Presentations/Controls.js';

//Presentation Component 
//Constants
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//CSS Styles
import OutfitNavStyles from '../../outfitnav.scss'; 
import Styles from '../../root.scss';
import NavStyles from '../../nav.scss';
import MetricStyles from '../../metric.scss';
import OutfitCoverBtnStyle from '../../makeOutfitCoverBtn.css';

//Third pary
import isEqual from 'lodash.isequal';
import { Route, Switch, Redirect, Link } from 'react-router-dom';


const bannerTitleImg = {
	'position': 'fixed',
    'width': '200px',
    'margin-left': '45px',
    'margin-top': '10px'
}

const logo_svg = {
	'--logo-height': '45px',
	'position':' absolute',
    /*'width':' auto',
    'height':' 100%',
    'margin-left':' 300px',
    'padding-top':' 12.5px',
    'padding-bottom':' 12.5px',*/
    left:'227px',
    top:'50%',
    'margin-top':'calc(-1*var(--logo-height)/2)',
    height:'var(--logo-height)',
    width: 'calc(var(--logo-height) + 20px)',
    'z-ingex':'-1',
}

export function SiteNav(props){		
    return(
    	<div className={Styles.headerBlock}>
    		{/*<img src="Graphics/banner_title.svg" style={bannerTitleImg}/>*/}
    		{
    			/*props.webAppView !== 'landing' ?*/
    				(
    					<React.Fragment>
    						<div className={Styles.logoContainer_div}>
    							<SvgIcon 
    								name='LogoIconFitsee' 
    								className={Styles.logo_svg}
    								//style={logo_svg}
    							/>
    						</div>
    						<div className={NavStyles.navBanner_div}>
    							{
    								props.webAppView === 'landing' ?
    									(
    										<div style={{float:'right', width:'0px'}}>
    											<div className={NavStyles.landingCtrl_div}>
    												<div className={NavStyles.landingBtnContainer_div}>
    													<div 
    														className={NavStyles.landingBtn_div}
    														onClick={(e) => {props.history.push('/shop/browse')}}
    													>
    														Login
    													</div>
    												</div>
    											</div>
    										</div>
    									):(
    										<Nav 
    											blocks={Object.keys(OxiAppConstants.navRequestMap)} 
    											{...props}
    										/>
    									)
    							}
    						</div>
    					</React.Fragment>
    				)
    		}
    	</div>
	);
}

class Nav extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			blockList: [],
			selected: null
		};

		this._handleClick  = this._handleClick.bind(this);
	}

	componentDidMount(){
		 
	}

	componentWillUnmount(){

	}

	_handleClick(callback){
		callback();
	}


	render(){
		const {
			navEventCallbacks,
		} = this.props;

		const {
			webAppView,
			pathname,
			ownerUsernamePath,
			match,
		} = this.props;
		/*return(
			<div className={Styles.headerBlock}>
    			<BlockList blocks={['home', 'profile', 'settings', 'search', 'logout']} containerClass={NavStyles.navContainer}/>
			</div>
		);*/
		let blockList = [];
		blockList = (
			<div 
				//style={
				//	webAppView === 'landing' ? 
				//		//user is on the home page; hide all header nav options
				//		({
				//			display: 'none',
				//		}) : 
				//		({})
				//}
				className={NavStyles.stdNavButtonContainer_div}
			>
				{

					webAppView !== 'landing' ?
					(
						this.props.blocks.map((block) => {
							console.log('block = ', block);
							console.log('selected = ', this.state.selected);
							let navHeader = block.toString();
							let selectionPath = '';
							
							if(navHeader === 'b' || navHeader === 'c'){
								selectionPath = `/${OxiAppConstants.navRequestMap[navHeader].toLowerCase()}${ownerUsernamePath}`;
							}else if(navHeader !== ''){
								selectionPath = `/${OxiAppConstants.navRequestMap[navHeader].toLowerCase()}`;
							}
		
							return(
								<Link to={`${match.url}${selectionPath}`}>
									<div 
										key={navHeader} 
										className={NavStyles.stdNavButtonBlock} 
										onClick={() => {
											this.setState(prevState => ({
												selected: navHeader
											}));
											//call back to webAppView component to change child component to reflect navHeader selection
											navEventCallbacks[navHeader]();
										}}
									>
										{/*
											this.state.selected !== navHeader ? 
												null :
													this.props.match.path.includes('/shop/profile') ? 
														<Redirect push={true} to={`/${this.props.match.path.split('/')[1]}/${OxiAppConstants.navRequestMap[navHeader].toLowerCase()}${this.props.ownerUsernamePath}`} /> : 
														<Redirect push={true} to={`/${this.props.match.path.split('/')[1]}/${OxiAppConstants.navRequestMap[navHeader].toLowerCase()}`} /> 
										*/}
										<div className={
											this.state.selected === null ? 
												NavStyles.navButtonText_div :
												//this.props.webAppView === OxiAppConstants.navRequestMap[this.state.selected].toLowerCase() ? 
												navHeader === this.state.selected ?
													NavStyles['navButtonText_div--selected'] : 
													NavStyles.navButtonText_div  
											}
										>
											{ OxiAppConstants.navRequestMap[navHeader] } 
										</div>
									</div>
								</Link>)
						})
					) :
					null
				}
			</div>
		);
		let percentWidth = 100 / blockList.length;
		console.log("navEventCallbacks");
		console.log(navEventCallbacks);
		return(
			<div style={{height:'100%'}}>
				<div style={{height:'100%'}}>
					{blockList}
				</div>
			</div>			
		);
	}
}

function Admin(props){		
    return(
    	<div className={Styles.footerBlock}>
    		Administration Footer
    	</div>
	);
}

class OutfitNav extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {
			owner,
			pathname,
			webAppView,
			imageHeight,
			imageWidth,
		} = this.props;

		var URI = pathname ? pathname.split('/') : '';
		var browseContent = null;
		var browseNavStyle = null;
		var containerHeight = imageHeight;
		var containerWidth = imageWidth*(OxiAppConstants.aspectRatio);		

		const controls = (
			<div 
				//className={Styles.controlsContainer}
				className={Styles.addOutfitControlsContainer}
			>
				{
					owner && owner.username === URI[URI.length - 1] ?
						(<div 
							className={OutfitNavStyles.outfitCtrlBtn_div}
							style={{
							}}>
							{/*<div
									className={OutfitNavStyles.outfitCtrlBtnContent_div}
									style={{
									}}>
									+
								</div>*/}
							<Button
								buttonType={OxiAppConstants.ControlConstants.ButtonTypes.b} //dynamic icon button
								onClickHandler={this.props.handleAddOutfitClicked}
								title='add new outfit'
								iconName='AddOutfitIcon'
								expandedWidth={150}
								buttonHeight={40}
								customButtonStyles={{
									color:'white',
									'margin':'auto',		
								}} />
						</div>) :
						null
				}
			</div> 
		);

		const browseWrapper = (wrappedStuff) => (
			webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ?			
				( 
					//add editional html here
					wrappedStuff
				) :
				wrappedStuff 
		);

		switch(this.props.browseSelection){
			case 'outfits':
				browseContent = (controls) => (
					<React.Fragment>
						{
							this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? controls : null
						}
						<VisibleOutfitList 
							view={this.props.webAppView} 
							scrollContainerStyle={
								this.props.webAppView === OxiAppConstants.navRequestMap.a ?
									OutfitNavStyles.previewContainer : 
									OutfitNavStyles.previewBrowseContainer
							}
							containerHeight={containerHeight !== 0 ? containerHeight : null}
							containerWidth={containerWidth !== 0 ? containerWidth : null}
							setPreviewFocus={this.props.setPreviewFocus}
							toggleMetricPanel={this.props.toggleMetricPanel}
							/*routeToHostProfile={this.props.routeToHostProfile}*/ 
						/>
					</React.Fragment>
				);
				break;
			case 'apparel':
				browseContent = (controls) => (
						<VisibleItemListBrowse 
							changeItemHovered={()=>{}} 
							scrollContainerStyle={OutfitNavStyles.previewContainer} 
						/>
				);
				break
			default:
				browseContent = null;
				break;
		}

		return(
			<React.Fragment>
				{
					browseWrapper(
    					(
    						<React.Fragment>
    							<div 
    								style={{'border-radius': '0px'}}
    								className={
    									this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? 
    										Styles.outfitBlock/*Styles['outfitBlock_div--profileView']*/ : 
    										Styles.outfitBlock
    								} 
    								//style={
    								//	this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? 
    								//		({
    								//			height: (imageHeight > imageWidth ? `calc(${imageHeight}px)` : `calc(100% - 80px - 80px)`),
    								//			width: `calc(${containerWidth !== 0 ? containerWidth : 350}px)`,
    								//		}) : 
    								//		({})
    								//}
    							>
    								{browseContent !== null ? browseContent(controls) : null}
    							</div>
    							<div 
    								className={Styles.browseControls}
    								style={this.props.webAppView !== OxiAppConstants.navRequestMap.a.toLowerCase() ? ({display:'none'}) : ({}) }
    							>
									<BrowseControlContainer 
										isMobile={true}
									/>
    							</div>
    						</React.Fragment>
    					) 
    				)
				}
    		</React.Fragment>
		);
	}
}

export default class webAppView extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			imageHeight:0,
			imageWidth:0,
			enableAddOutfitButton: true,
			visibleItems: {
				visibleItemsByIds: {}
			},
			itemIdHovered: null,
			navDestination: props.location,
			isFocusedPreview: false,
			isMetricPanelOpen : false,
		}

		this._handleItemsListUpdated = this._handleItemsListUpdated.bind(this);
		this._handleItemHovered = this._handleItemHovered.bind(this);
		this._handleImageResized = this._handleImageResized.bind(this);
		this._handleNavBtnSelected = this._handleNavBtnSelected.bind(this);
		this.setPreviewFocus = this.setPreviewFocus.bind(this);
		this._handleAddOutfitClicked = this._handleAddOutfitClicked.bind(this);
		this.toggleMetricPanel = this.toggleMetricPanel.bind(this);
		this.previousLocation = props.location;

		var {
			pathname,
			owner,
		} = props;

		switch(true){
			//Browse
			case pathname === OxiAppConstants.routeURIs.browse || pathname === OxiAppConstants.routeURIs.shop:
				//Make request to server to initialize /browse page data
				//this.props.navEventCallbacks.a(this.props.profile !== undefined);
				this.props.navEventCallbacks.a(owner !== undefined);
				break;
			//Profile
			case RegExp(`^${OxiAppConstants.routeURIs.profile}/*`).test(pathname):
				//Make request to server to initialize /profile/* page data
				this.props.navEventCallbacks.b();
				break;
			//Fitting
			case RegExp(`^${OxiAppConstants.routeURIs.fitting}/*`).test(pathname):
				//Make request to server to initialize /profile/* page data
				this.props.navEventCallbacks.c(owner !== undefined);
				break;
			default:
				break;

		}
	}

	/*shouldComponentUpdate(nextProps, nextState) {
        const differentView = this.props.webAppView !== nextProps.webAppView;
        console.log('differentView = ',differentView);
        return differentView;
    }*/

    _handleNavChange(destination){

    }

	_removeOutfitForm(){
	}

	_handleImageResized(width, height){
		this.setState(prevState => ({
			...prevState,
			imageWidth: width,
			imageHeight: height
		}))
	}

	_handleItemsListUpdated(visibleItemsByIds){
		//visibleItemsByIds can be modified
		console.log('in _handleItemsListUpdated.  this.state.visibleItems.visibleItemsByIds = ', this.state.visibleItems.visibleItemsByIds);
		console.log('in _handleItemsListUpdated.  visibleItemsByIds = ', visibleItemsByIds);
		/*if(isEqual(visibleItemsByIds, this.state.visibleItems.visibleItemsByIds)){
			this.setState(prevState => ({
				visibleItems: {
					//...prevState.visibleItems,
					visibleItemsByIds
				}
			}));			
		}*/
		let forceStateUpdate = false;
		let itemIdExistsInState = false;
		//force update if number of properties differs
		let visibleItemsByIdsKeys = Object.keys(visibleItemsByIds);
		if(Object.keys(this.state.visibleItems.visibleItemsByIds).length != visibleItemsByIdsKeys.length  && visibleItemsByIdsKeys.length > 0){
			if(typeof visibleItemsByIdsKeys[0] === 'object'){
				console.log('keys are typeof object')
				throw new Error('Illegal key type of visibileItemsById object.');
			}else{
				console.log('typeof visibleItemsByIdsKeys = ', typeof visibleItemsByIdsKeys[0])
				console.log('>> Update forced due to different key count')
				console.log('>> state = ', this.state.visibleItems.visibleItemsByIds);
				console.log('>> parameter = ', visibleItemsByIds)
				this.setState(prevState => ({
					visibleItems: {
						//...prevState.visibleItems,
						visibleItemsByIds
					}
				}));
			}
		}else{
			//Item count is equal here. Check for item object differences
			let idsToRemove = {visibleItemsByIds:{}};
			for(let itemIdParam of Object.keys(visibleItemsByIds)){
				let itemIdExistsInState = false;
				for(let itemIdState of Object.keys(this.state.visibleItems.visibleItemsByIds)){
					if(itemIdParam === itemIdState){
						itemIdExistsInState = true;
						//check if object properities are different:
						//Frist number of properties from both objects
						if(visibleItemsByIds[itemIdParam] !== undefined){  //check if item id has bee removed
							if(Object.keys(this.state.visibleItems.visibleItemsByIds[itemIdState]).length != Object.keys(visibleItemsByIds[itemIdParam]).length){
								forceStateUpdate = true;
								break
							}else{
								//check if property values are different
								for(let itemPropKeyParam of Object.keys(visibleItemsByIds[itemIdParam])){
									for(let itemPropKeyState of Object.keys(this.state.visibleItems.visibleItemsByIds[itemIdState])){
										if(itemPropKeyState === itemPropKeyParam){
											if(itemPropKeyState == 'positionx' || itemPropKeyState == 'positiony') console.log('at position_ property key')
											if(visibleItemsByIds[itemIdParam][itemPropKeyParam] !== this.state.visibleItems.visibleItemsByIds[itemIdState][itemPropKeyState]){
												console.log('difference found at ' + itemPropKeyState);
												forceStateUpdate = true;
												break;
											}
										}
									}
									if(forceStateUpdate) break;
								}
								if(forceStateUpdate) break;
							}
						}//accumulate all non-existing ids for removal from itemIdParam from state.visibleItems.visibleItemsByIds 
						else{
							console.log('>> detected undefined property in parameter, visibleItemsByIds[', itemIdParam, ']');
							delete visibleItemsByIds[itemIdParam];
							forceStateUpdate = true;
							//idsToRemove.visibleItemsByIds[itemIdParam] = undefined;
						}
					}
				}
				//check if itemId of parameter object exists in the current state
				if(!itemIdExistsInState){
					forceStateUpdate = true;
					break;					
				}
			}
			console.log('**visibleItemsByIds = ', visibleItemsByIds)
			/*if(Object.keys(idsToRemove.visibleItemsByIds).length > 0){
				console.log('idsToRemove = ', idsToRemove);
				/*this.setState(prevState => ({
					visibleItems: {
						visibleItemsByIds:{
							...this.state.visibleItems.visibleItemsByIds,
							...idsToRemove.visibleItemsByIds
						}
					}
				}))*/
			/*}
			else*/ if(forceStateUpdate){
				console.log('>> Forced Update')
				console.log('visibleItemsByIds = ', visibleItemsByIds);
				this.setState(prevState => ({
					visibleItems: {
						//...prevState.visibleItems,
						visibleItemsByIds
					}
				}));				
			}
		}
	}

	_handleItemHovered(itemId){
		//if(itemId != this.state.itemIdHovered){
			this.setState({
				itemIdHovered: itemId
			})
		//}
	}

	//forces this component to update so Router can navigate to /profile 
	_handleNavBtnSelected(location){
		this.setState({
			navDestination: location
		})
	}

	_handleAddOutfitClicked(event){
		
		if(!this.props.buttonDisabled){
			this.props.addOutfit(1, undefined, this.props.entitiesStateReducer);
		}

		this.props.setPreviewFocus();
	}

	componentWillUpdate(nextProps){
		// set previousLocation if props.location is not modal
		if(nextProps.history.action !== "POP" && (!location.state || !location.state.modal)){
			this.previousLocation = this.props.location;
		}
	}

	setPreviewFocus(value){
		this.setState(preview => ({
			isFocusedPreview: value,
		}));
	}

	toggleMetricPanel(event, isOpen){
		this.setState(prevState => ({
			...prevState,
			isMetricPanelOpen: (isOpen !== null && isOpen !== undefined ? isOpen : !prevState.isMetricPanelOpen),
		}))
	}

	render() {
		const {
			setPreviewFocus,
			unsetPreviewFocus,
		} = this.props;

		var { 
			location,
			pathname,
			owner,
			viewState,
			isFocusedPreview,
		} =  this.props;

		const isModal = !!(location.state && location.state.modal && this.previousLocation !== location)// not initial render
		console.log('isModal = ', isModal, ', this.props.formType = ', this.props.formType);
		let modalContent = null;

		const createModalFragment = (pathname) => (
			<React.Fragment>
				{/*
					<Redirect push={true} to={{
						pathname:pathname, 
						state:{modal: true}
					}}/>
					<Route path={pathname} component={ModalContentSelection} />
				*/}
				<ModalContentSelection/>
			</React.Fragment>
		);

		//Get the users saved items if not already exists
		Object.keys(this.props.savedItemMap).length === 0 ? this.props.getSavedItems() : null;

		switch(true){
			case this.props.formType === OxiAppConstants.FormType.LOGIN:
				modalContent = createModalFragment(`${this.props.match.url}/login`);
				break;
			case this.props.formType === OxiAppConstants.FormType.ADD_ITEM:
				modalContent = createModalFragment(`${this.props.match.url}/add-item`);
				break;
			case this.props.formType === OxiAppConstants.FormType.UPDATE_ITEM:
				modalContent = createModalFragment(`${this.props.match.url}/edit-item`);
				break;
			case this.props.formType === OxiAppConstants.FormType.DISCARD_EDITS:
				modalContent = createModalFragment(`${this.props.match.url}/discard-edits`);
				break;
			default:
				break;
		}
		console.log('this.previousLocation = ', this.previousLocation);
		console.log('location = ', location);
		console.log('owner = ', owner);
		/*switch(this.state.navDestination){
			case 'profile'
				<Redirect push={true} to={`${this.props.match.url}/profile${}`}/>
				<Route path={this.props.match.url + 'profile'}/>
		}*/
		let ownerUsernamePath = owner ? `/${owner.username}` : '';
		return(
			<React.Fragment>
				<Switch pathname >{/*location={isModal ? this.previousLocation : location}>*/}
					{/*<Route 
						path="/"
						render={() => (
							<div id="LandingPageContainer_div">
								<SiteNav navEventCallbacks={this.props.navEventCallbacks} webAppView={this.props.webAppView}/>
								<LandingPageContainer navEventCallbacks={this.props.navEventCallbacks}/>
							</div>
						)} 
					/>*/}
					{/*<Redirect to={`${this.props.match.url}/${this.props.webAppView}`}/>*/}
					<Route
						push
						path={`${this.props.match.url}/${OxiAppConstants.navRequestMap.a.toLowerCase()}`}
						render={(props) => (
							//Fetch all necesary data from the api server for the /browse page
							<div>
								{ /*this.props.navEventCallbacks.a(true)*/ }
								<SiteNav 
									navEventCallbacks={this.props.navEventCallbacks} 
									webAppView={this.props.webAppView} 
									match={this.props.match}
									ownerUsernamePath={ownerUsernamePath} />
								<div className={Styles.contentBlock}>
									<div className={Styles.containerBrowse}>
										{/*<div className={Styles.metricsContainer_div}>
											<MetricPanel />
										</div>*/}
										<MetricPanel
											isOpen={this.state.isMetricPanelOpen}
											toggleMetricPanel={this.toggleMetricPanel}
											isFocusedPreview={isFocusedPreview}
										/>
										<OutfitNav 
											webAppView={this.props.webAppView}
											browseSelection={this.props.browseSelection}											
											toggleMetricPanel={this.toggleMetricPanel}
											handleAddOutfitClicked={this._handleAddOutfitClicked}
											pathname={pathname}
											owner={owner}
											/*routeToHostProfile={(usernameUri) => this._handleNavBtnSelected(`/profile${usernameUri}`)}*/ />
										{/*(location.state && location.state.modal) ? <ModalContentSelection/> : null*/}
										<Admin/>
									</div>
								</div>
							</div>
						)}
					/>
					<Route
						push
						path={`${this.props.match.url}/${OxiAppConstants.navRequestMap.b.toLowerCase()}/:username`}
						render={(props) => (
							<div>
								{/*this.props.webAppView !== 'profile' ? this.props.navEventCallbacks.b(this.props.match.params.username) : null*/}
								<SiteNav 
									navEventCallbacks={this.props.navEventCallbacks} 
									webAppView={this.props.webAppView} 
									match={this.props.match}
									ownerUsernamePath={ownerUsernamePath}/>
								<div className={Styles.contentBlock}>
									<div 
										className={Styles.containerProfile} 
										style={
											(this.state.imageWidth !== 0 && this.state.imageHeight !== 0) ? 
												({'grid-template-columns': `300px 20% ${this.state.imageWidth + 50}px auto`}) : 
												null
										}
									>								
										<MetricPanel 
											webAppView={this.props.webAppView}
											isOpen={this.state.isMetricPanelOpen}
											toggleMetricPanel={this.toggleMetricPanel}
											isFocusedPreview={isFocusedPreview}
										/>

										{
											isFocusedPreview ?
												(
													<div 
														className={Styles.contentContainerFocused}
														//style={{
														//	width:'70%', 
														//	'padding-left':'400px', 
														//	'white-space':'nowrap'
														//}} 
													>

														<PicturePreviewContainer 
															imageWidth={this.state.imageWidth}
															imageHeight={this.state.imageHeight}									
															imageResized={this._handleImageResized}
															visibleItemsMap={this.state.visibleItems !== undefined ? this.state.visibleItems : {}}
															populateItemsMap={(visibleItemsByIds) => this._handleItemsListUpdated(visibleItemsByIds)}
															itemIdHovered={this.state.itemIdHovered}
															changeItemHovered={(itemId) => this._handleItemHovered(itemId)}
															unsetPreviewFocus={unsetPreviewFocus} />

														<VisibleItemList 
															visibleItemsMap={this.state.visibleItems !== undefined ? this.state.visibleItems : {}}
															populateItemsMap={(visibleItemsByIds) => this._handleItemsListUpdated(visibleItemsByIds)} 
															itemIdHovered={this.state.itemIdHovered}
															changeItemHovered={(itemId) => this._handleItemHovered(itemId)}
															imageHeight={this.state.imageHeight} 
															toggleMetricPanel={this.toggleMetricPanel} />

														<ProfileViewControlsContainer 
															unsetPreviewFocus={unsetPreviewFocus} />

													</div>
												) : (
													<div className={Styles.contentContainer}>
														<OutfitNav 	
															imageWidth={163.11 || this.state.imageWidth}
															imageHeight={244.66 || this.state.imageHeight}
															webAppView={this.props.webAppView}
															browseSelection="outfits"
															setPreviewFocus={setPreviewFocus} 
															toggleMetricPanel={this.toggleMetricPanel}
															handleAddOutfitClicked={this._handleAddOutfitClicked}
															pathname={pathname}
															owner={owner}
														/>

														
													</div>
												) 
										}
										
										{/*<OutfitNav 	
											imageWidth={this.state.imageWidth}
											imageHeight={this.state.imageHeight}
											webAppView={this.props.webAppView}
											browseSelection="outfits"/> */}
										<Admin/>
									</div>
								</div>
								{/*(location.state && location.state.modal) ? <ModalContentSelection/> : null*/}
							</div>
						)}
					/>
					<Route
						push
						path={`${this.props.match.url}/${OxiAppConstants.navRequestMap.c.toLowerCase()}`}
						render={(props) => (
							<div>							
								{ /*this.props.navEventCallbacks.c() */}
								<SiteNav 
									navEventCallbacks={this.props.navEventCallbacks} 
									webAppView={this.props.webAppView} 
									match={this.props.match}
									ownerUsernamePath={ownerUsernamePath} />
								{/*this.props.webAppView !== 'measurements' ? this.props.navEventCallbacks.c(this.props.match.params.username) : null*/}
								<ProfileMenuContainer
									//profile={this.props.addedProfile !== undefined ? this.props.addedProfile : this.props.profile} 
									test={false}
									//toggleRadio={this.props.toggleRadio} 
									//postProfile={this.props.postProfile} 
									//modifyProfile={this.props.modifyProfile}
									//profileId={this.props.addedProfileId}
									/>
							</div>
						)} 
					/>
					<Route 
						push
						render={props => <div>This URI does not exist</div>} />
				</Switch>
				{this.props.formType !== 'HIDDEN' ? modalContent : null}
			</React.Fragment>
		)
	}
}