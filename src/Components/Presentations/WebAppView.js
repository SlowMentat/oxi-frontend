import "core-js";
import "regenerator-runtime/runtime";
import React, { useState } from 'react';
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
import BrowseFilterMenuContainer from '../../Components/Containers/BrowseFilterMenuContainer.js';
import ProfileMenuContainer from '../../Components/Containers/ProfileMenuContainer.js';
import { MetricPanel } from '../../Components/Presentations/MetricPanel.js'
import ProfileViewControlsContainer from '../../Components/Containers/ProfileViewControlsContainer.js';
import MenusContainer from '../../Components/Containers/MenusContainer.js';

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

import '@rmwc/fab/styles';
import { Fab } from '@rmwc/fab';
import '@rmwc/tabs/styles';
import { Tab, TabBar } from '../../Components/Presentations/FitseeUI/Tabs.js';//@rmwc/tabs';
import { IconButton } from '../../Components/Presentations/FitseeUI/Buttons/index.js';
import { Tooltip } from '../../Components/Presentations/FitseeUI/Tooltip.js';
import '@rmwc/tooltip/styles';
import { MenuSurfaceAnchor, Menu, MenuItem } from '../../Components/Presentations/FitseeUI/Menu.js';
import '@rmwc/menu/styles';

import { logout } from '../../Components/Actions/indexActions.js';

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
    //left:'227px',
    left:'0px',
    top:'50%',
    'margin-top':'calc(-1*var(--logo-height)/2)',
    height:'var(--logo-height)',
    width: 'calc(var(--logo-height) + 20px)',
    'z-ingex':'-1',
}

const ligatureManagementStyles = {
	color: 'var(--color-01)',
}

const customMngmtCotnianerStyles = {
	//'margin-right':'20px',
	//display: 'inline-block',
	//'vertical-align': 'top',
}

export function SiteNav(props){
	const {
		showMenu,
		hideMenu,
		positionMenu,
		handleAddOutfitClicked,
	} = props;

	const {
		isMenu,
		popupMenuType,
		owner,
		URI,
		webAppView
	} = props;

	const [ isSettingsOpen, setIsSettingsOpen ] = useState(false);

	const getMenuPosition = (menuType) => {
		var position = {};
		switch(menuType){
			case OxiAppConstants.MenuType.a:
				position = {
					right: `calc(-5px)`,					
				};
				break;

			case OxiAppConstants.MenuType.c:
				position = {
					right: `calc(64px - 25px)`,					
				};
				break;

			default:
				break;
		}

		return position;
	} 

	var viewControls = null;

	switch(true){
		case props.webAppView === 'landing' :
			viewControls = <div style={{float:'right', width:'0px'}}>
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
			break;

		case isDevice && webAppView == OxiAppConstants.navRequestMap.a.toLowerCase():
			viewControls = <BrowseControlContainer isMobile={true} />
			break;

		case isDevice && webAppView == OxiAppConstants.navRequestMap.b.toLowerCase():
			viewControls = <div 
				style={{
					display:'flex',
					'justify-content': 'flex-end',
					color: 'var(--color-02-shade-01)',
				}}
				className={Styles.profileViewControls}
			>
				{
					owner && owner.username === URI[URI.length - 1] ?
						<React.Fragment>
							<IconButton
								icon="search"
								style={{color: 'var(--color-01-tint-02)'}}
								onClick={e => console.log(e)}
							/>
							<IconButton
								icon="edit"
								style={{color: 'var(--color-02)'}}
								onClick={e => console.log(e)}
							/>
							<IconButton
								icon="add"
								style={{color: 'var(--color-02)'}}
								onClick={handleAddOutfitClicked}
							/>
						</React.Fragment> :
						null
				}
			</div>
			break;

		case isDevice && webAppView == OxiAppConstants.navRequestMap.c.toLowerCase():
			viewControls = null;
			break;

		case !isDevice:
			viewControls = <Nav blocks={Object.keys(OxiAppConstants.navRequestMap)} {...props} />
			break;

		default:
			break;
	}

    return(
    	<div className={props.isHeaderHidden ? Styles['headerBlock--hidden'] : Styles.headerBlock}>
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
    							{ viewControls }
    						</div>

    						<div className={NavStyles.managementContainer_div}>
    							<div 
    								style={{
    									height:'100%',
    									position:'relative', 
    									display: 'flex',
    									'justify-content':'space-evenly',
    									'align-items':'center',
    								}}
    							>
    								<Tooltip content="coming soon" showArrow>
										<IconButton
											onClick={e => hideMenu('')}
											icon="shopping_cart"
											style={customMngmtCotnianerStyles}
											class="material-icons material-icons--outline"
										/>
									</Tooltip>

									<MenuSurfaceAnchor>
										<Menu 
											open={isMenu && popupMenuType === OxiAppConstants.MenuType.c} 
											style={{top:'60px', width: '200px'}}
										>
											{/* get notifcation list <MenuItem>Logout</MenuItem>*/}
										</Menu>
										<IconButton
											onClick={() => {
												if(isMenu){
													console.log('popupMenuType = ', popupMenuType);
													popupMenuType === OxiAppConstants.MenuType.c ? hideMenu('') : showMenu(OxiAppConstants.MenuType.c);
												}
												else{
													//positionMenu(50, 50);
													showMenu(OxiAppConstants.MenuType.c);
												}
											}}
											style={customMngmtCotnianerStyles}
											icon="notifications_none"
										/>
									</MenuSurfaceAnchor>

									<MenuSurfaceAnchor>
										<Menu 
											open={isMenu && popupMenuType === OxiAppConstants.MenuType.a}
											style={{top:'60px', width:'200px'}}
										>
											{
												["Account", "Logout"].map(option => {
													return(<MenuItem onClick={e => logout()}>{option}</MenuItem>);
												})
											}
										</Menu>
										<IconButton 
											onClick={() => {
												if(isMenu){
													popupMenuType === OxiAppConstants.MenuType.a ? hideMenu('') : showMenu(OxiAppConstants.MenuType.a);
												}
												else{
													//positionMenu(50, 50);
													showMenu(OxiAppConstants.MenuType.a);
												}
											}}
											icon="settings"
											style={customMngmtCotnianerStyles}
										/>
									</MenuSurfaceAnchor>

								</div>
								{ /*
									isMenu ? 
										<MenusContainer 
											menuType={popupMenuType} 
											position={{
												top: '65px',
												bottom: 'unset',
												left: 'unset',
												...getMenuPosition(popupMenuType)
											}}
										/> : 
										null 
								*/}
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
				className={NavStyles.stdNavButtonContainer_div}
			>
				{
					webAppView !== 'landing' ?
					(
						<TabBar style={{height: '100%'}}>
							{
								this.props.blocks.map((block) => {
									console.log('block = ', block);
									console.log('selected = ', this.state.selected);
									let navHeader = block.toString();
									let selectionPath = '';
									
									if(navHeader === 'b' || navHeader === 'c'){
										selectionPath = `/${OxiAppConstants.navRequestMap[navHeader].toLowerCase()}${ownerUsernamePath}`;
									}
									else if(navHeader !== ''){
										selectionPath = `/${OxiAppConstants.navRequestMap[navHeader].toLowerCase()}`;
									}
				
									return(
										<Link
											style={{
												width:'33%',
												height:'100%',
											}} 
											to={`${match.url}${selectionPath}`}>
											<Tab
												underline={!isDevice}
												style={{
													...(isDevice ? ({height:'var(--mobile-page-header-height)'}) : ({height: 'var(--page-header-height)'})),
													width:'100%',
													'font-size':'12px',
												}}
												onClick={() => {
													this.setState(prevState => ({
														selected: navHeader
													}));
													//call back to webAppView component to change child component to reflect navHeader selection
													navEventCallbacks[navHeader]();
												}}
												label={ OxiAppConstants.navRequestMap[navHeader] }
											>
												 
												{/*<div 
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
												</div>*/}
											</Tab> 
										</Link>
									);
								})
							}
						</TabBar>
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
		//const {
		//	setPreviewedOutfit,
		//} = this.props;

		const {
			owner,
			pathname,
			webAppView,
			imageHeight,
			imageWidth,
			previewedOutfitId,
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
						(<Fab
							icon="add"
							style={{
								'background-color':'var(--color-05-tint-01)',
								'color':'white',
							}}
							ripple={true}
							onClick={this.props.handleAddOutfitClicked}
						/>) :
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
						<VisibleOutfitList 
							view={this.props.webAppView} 
							scrollContainerStyle={
								this.props.webAppView === OxiAppConstants.navRequestMap.a.toLowerCase() ?
									OutfitNavStyles.previewBrowseContainer : 
									OutfitNavStyles.previewContainer
							}
							containerHeight={containerHeight !== 0 ? containerHeight : null}
							containerWidth={containerWidth !== 0 ? containerWidth : null}
							setPreviewFocus={this.props.setPreviewFocus}
							toggleMetricPanel={this.props.toggleMetricPanel}
							//setPreviewedOutfit={setPreviewedOutfit}
							previewedOutfitId={previewedOutfitId}
							/*routeToHostProfile={this.props.routeToHostProfile}*/ 
						/>
						{
							this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? controls : null
						}
					</React.Fragment>
				);
				break;
			case 'apparel':
				browseContent = (controls) => (
						<VisibleItemListBrowse 
							changeItemHovered={()=>{}} 
							scrollContainerStyle={OutfitNavStyles.previewContainer} 
							//setPreviewedOutfit={setPreviewedOutfit}
							previewedOutfitId={previewedOutfitId}
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
    								//style={{'border-radius': '0px'}}
    								style={ webAppView === OxiAppConstants.navRequestMap.a ? ({'border-radius': '0px', 'margin-top':'var(--page-header-height)'}) : ({'border-radius': '0px'}) }
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
    							{
    								isDevice && this.props.formType == OxiAppConstants.FormType.ADD_ITEM ?
    									null :
    									<div 
    										className={Styles.browseControls}
    										style={
    											(!isDevice && this.props.webAppView !== OxiAppConstants.navRequestMap.a.toLowerCase()) || 
    											(isDevice && this.props.formType === OxiAppConstants.FormType.OUTFIT_PREVIEW) ? 
    												({display:'none'}) : 
    												({}) 
    										}
    									>
    										{
    											isDevice ? 
    												<Nav blocks={Object.keys(OxiAppConstants.navRequestMap)} {...this.props} /> : 
													<BrowseControlContainer isMobile={true}/>
											}
    									</div>
    							}
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
			isHeaderHidden: false,
			isControlsHidden: false,
			base64HostImage: null,
			base64OwnerImage: null,
			previewedOutfitId: null,
		}

		this._handleItemsListUpdated = this._handleItemsListUpdated.bind(this);
		this._handleItemHovered = this._handleItemHovered.bind(this);
		this._handleImageResized = this._handleImageResized.bind(this);
		this._handleNavBtnSelected = this._handleNavBtnSelected.bind(this);
		this.setPreviewFocus = this.setPreviewFocus.bind(this);
		this._handleAddOutfitClicked = this._handleAddOutfitClicked.bind(this);
		this.toggleMetricPanel = this.toggleMetricPanel.bind(this);
		this._handleOwnerImageReceived = this._handleOwnerImageReceived.bind(this);
		this._handleHostImageReceived = this._handleHostImageReceived.bind(this);
		//this.setPreviewedOutfit = this.setPreviewedOutfit.bind(this);
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

	async componentDidMount(){
		var { ownerpicuri, hostpicuri } = this.props;

		//if coverpic filename exists, call get request for content coverpic data
		console.log("ownerpicuri = ", ownerpicuri)
		if(hostpicuri) await this.props.getCoverPic(hostpicuri, this._handleHostImageReceived, 'small');
		if(ownerpicuri) await this.props.getCoverPic(ownerpicuri, this._handleOwnerImageReceived, 'small');

	}

	async componentDidUpdate(prevProps){
		var { ownerpicuri, hostpicuri } = this.props;
		if(hostpicuri !== prevProps.hostpicuri) await this.props.getCoverPic(hostpicuri, this._handleHostImageReceived, 'small');
		if(ownerpicuri !== prevProps.ownerpicuri) await this.props.getCoverPic(ownerpicuri, this._handleOwnerImageReceived, 'small');
		
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

	_handleOwnerImageReceived(event, data){
		this.setState({
			base64OwnerImage: 'data:image/jpeg;base64,' + data
		});
	}

	_handleHostImageReceived(event, data){
		this.setState({
			base64HostImage: 'data:image/jpeg;base64,' + data
		});
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

	// Needed to refresh OutfitPreview Modal with the complete outfit entity (containing child contents array) returned from http request
	//setPreviewedOutfit(id){
	//	this.setState(prevState => ({
	//		...prevState,
	//		previewedOutfitId: id,
	//	}))
	//}

	render() {
		const {
			navEventCallbacks,
			setPreviewFocus,
			unsetPreviewFocus,
			showMenu,
			hideMenu,
			positionMenu,
		} = this.props;

		var { 
			location,
			pathname,
			match,
			owner,
			viewState,
			formType,
			isFocusedPreview,
			isMenu,
			popupMenuType,
			webAppView,
		} =  this.props;

		const isModal = !!(location.state && location.state.modal && this.previousLocation !== location)// not initial render
		console.log('isModal = ', isModal, ', this.props.formType = ', this.props.formType);
		let modalContent = null;
		var URI = pathname ? pathname.split('/') : '';

		const createModalFragment = (pathname, iniOutfitPreview) => (
			<React.Fragment>
				{/*
					<Redirect push={true} to={{
						pathname:pathname, 
						state:{modal: true}
					}}/>
					<Route path={pathname} component={ModalContentSelection} />
				*/}
				<ModalContentSelection owner={owner} iniOutfitPreview={iniOutfitPreview}/>
			</React.Fragment>
		);

		const getSiteNav = () => (
			<SiteNav 
				navEventCallbacks={navEventCallbacks} 
				webAppView={webAppView} 
				match={match}
				ownerUsernamePath={ownerUsernamePath} 
				showMenu={showMenu}
				hideMenu={hideMenu}
				positionMenu={positionMenu}
				isMenu={isMenu}
				popupMenuType={popupMenuType}
				handleAddOutfitClicked={this._handleAddOutfitClicked}
				owner={owner}
				URI={URI}
			/>
		);

		const getOutfitPreviewModal = (props) => {

			const {
				showComments,
			} = props;

			const {
				compoundStyles,
				overrideOnExit,
				isCommentsShown,
			} = props;

			return(
				<div 
					className={Styles.contentContainerFocused}
					style={{
						padding:'0px',
						margin:'0px',
						display: 'inline-block',
						//height:'calc(100% - 20px)',
						...compoundStyles,
					}}
				>
	
					<PicturePreviewContainer 
						imageWidth={this.state.imageWidth}
						imageHeight={this.state.imageHeight}									
						imageResized={this._handleImageResized}
						visibleItemsMap={this.state.visibleItems !== undefined ? this.state.visibleItems : {}}
						populateItemsMap={(visibleItemsByIds) => this._handleItemsListUpdated(visibleItemsByIds)}
						itemIdHovered={this.state.itemIdHovered}
						changeItemHovered={(itemId) => this._handleItemHovered(itemId)}
						unsetPreviewFocus={unsetPreviewFocus}
						isCommentsShown={isCommentsShown}
					/>
	
					<VisibleItemList 
						visibleItemsMap={this.state.visibleItems !== undefined ? this.state.visibleItems : {}}
						populateItemsMap={(visibleItemsByIds) => this._handleItemsListUpdated(visibleItemsByIds)} 
						itemIdHovered={this.state.itemIdHovered}
						changeItemHovered={(itemId) => this._handleItemHovered(itemId)}
						imageHeight={this.state.imageHeight} 
						toggleMetricPanel={this.toggleMetricPanel}
						hideHeader={
							(isHidden) => this.setState(prevState => ({
								isHeaderHidden: isHidden,
							}))
						}
						hideControls={
							(isHidden) => this.setState(prevState => ({
								isControlsHidden: isHidden,
							}))
						} />
	
					<ProfileViewControlsContainer 
						unsetPreviewFocus={unsetPreviewFocus}
						isControlsHidden={this.state.isControlsHidden} 
						overrideOnExit={overrideOnExit}
						isCommentsShown={isCommentsShown}
						showComments={(event, isShown) => {
							showComments(isShown);
						}}
					/>
	
				</div>
			);
		}

		//Get the users saved items if not already exists
		Object.keys(this.props.savedItemMap).length === 0 ? this.props.getSavedItems() : null;

		// TODO make this switch statement depend on OxiAppConstants FormTypes
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
			case this.props.formType === OxiAppConstants.FormType.PROFILE_PIC:
				modalContent = createModalFragment(`${this.props.match.url}/edit-profile-pic`);
				break;
			case this.props.formType === OxiAppConstants.FormType.OUTFIT_PREVIEW:
				modalContent = createModalFragment(`${this.props.match.url}/outfit_preview`, (compoundStyles, overrideOnExit, showComments, isCommentsShown) => getOutfitPreviewModal({compoundStyles, overrideOnExit, showComments, isCommentsShown}));
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
								{getSiteNav()}
								<div className={Styles.contentBlock}>
									<div className={Styles.containerBrowse}>
										{/*<div className={Styles.metricsContainer_div}>
											<MetricPanel />
										</div>*/}
										<MetricPanel
											isOpen={this.state.isMetricPanelOpen}
											toggleMetricPanel={this.toggleMetricPanel}
											isFocusedPreview={isFocusedPreview}
											base64OwnerImage={this.state.base64OwnerImage}
											base64HostImage={this.state.base64HostImage}											
										/>
										<OutfitNav 
											webAppView={this.props.webAppView}
											browseSelection={this.props.browseSelection}
											navEventCallbacks={this.props.navEventCallbacks}
											toggleMetricPanel={this.toggleMetricPanel}
											handleAddOutfitClicked={this._handleAddOutfitClicked}
											pathname={pathname}
											match={match}
											owner={owner}
											formType={formType}
											ownerUsernamePath={ownerUsernamePath}
											//setPreviewedOutfit={this.setPreviewedOutfit}
											previewedOutfitId={this.state.previewedOutfitId}
										/>
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
								{getSiteNav()}
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
											base64OwnerImage={this.state.base64OwnerImage}
											base64HostImage={this.state.base64HostImage}
										/>

										{
											false/*isDevice && isFocusedPreview*/ ?
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
															toggleMetricPanel={this.toggleMetricPanel}
															hideHeader={
																(isHidden) => this.setState(prevState => ({
																	isHeaderHidden: isHidden,
																}))
															}
															hideControls={
																(isHidden) => this.setState(prevState => ({
																	isControlsHidden: isHidden,
																}))
															} />

														<ProfileViewControlsContainer 
															unsetPreviewFocus={unsetPreviewFocus}
															isControlsHidden={this.state.isControlsHidden} />

													</div>
												) : (
													<div className={Styles.contentContainer}>
														<OutfitNav 	
															imageWidth={163.11 || this.state.imageWidth}
															imageHeight={244.66 || this.state.imageHeight}
															webAppView={this.props.webAppView}
															navEventCallbacks={this.props.navEventCallbacks}
															browseSelection="outfits"
															setPreviewFocus={setPreviewFocus} 
															toggleMetricPanel={this.toggleMetricPanel}
															handleAddOutfitClicked={this._handleAddOutfitClicked}
															pathname={pathname}
															match={match}
															owner={owner}
															formType={formType}
															ownerUsernamePath={ownerUsernamePath}
															//setPreviewedOutfit={this.setPreviewedOutfit}
															previewedOutfitId={this.state.previewedOutfitId}
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
								{getSiteNav()}
								{/*this.props.webAppView !== 'measurements' ? this.props.navEventCallbacks.c(this.props.match.params.username) : null*/}
								<ProfileMenuContainer
									//profile={this.props.addedProfile !== undefined ? this.props.addedProfile : this.props.profile} 
									test={false}
									//toggleRadio={this.props.toggleRadio} 
									//postProfile={this.props.postProfile} 
									//modifyProfile={this.props.modifyProfile}
									//profileId={this.props.addedProfileId}
								/>
								<OutfitNav 
									webAppView={this.props.webAppView}
									browseSelection={this.props.browseSelection}
									navEventCallbacks={this.props.navEventCallbacks}
									toggleMetricPanel={this.toggleMetricPanel}
									handleAddOutfitClicked={this._handleAddOutfitClicked}
									pathname={pathname}
									match={match}
									owner={owner}
									formType={formType}
									ownerUsernamePath={ownerUsernamePath}
									//setPreviewedOutfit={this.setPreviewedOutfit}
									previewedOutfitId={this.state.previewedOutfitId}
								/>
								{/*									
    								isDevice ? 
    									<Nav blocks={Object.keys(OxiAppConstants.navRequestMap)} {...this.props} /> : 
										null
								*/}
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