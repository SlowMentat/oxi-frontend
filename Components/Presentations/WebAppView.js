import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';


//Container Components
import ModalContentSelection from '../../Components/Containers/SelectModalContent.js';
import VisibleItemList from '../../Components/Containers/VisibleItemList.js';
import VisibleItemListBrowse from '../../Components/Containers/VisibleItemListBrowse.js';
import VisibleOutfitList from '../../Components/Containers/VisibleOutfitList.js';
import ContentContainer from '../../Components/Containers/ContentContainer.js';
import OutfitPanelContainer from '../../Components/Containers/OutfitPanelContainer.js'
import VisibleMetricList from '../../Components/Containers/VisibleMetricList.js'
import MetricTitleContainer from '../../Components/Containers/MetricTitleContainer.js';
import LandingPageContainer from '../../Components/Containers/LandingPageContainer.js';
import BrowseControlContainer from '../../Components/Containers/BrowseControlContainer.js';
import ProfileControlContainer from '../../Components/Containers/ProfileControlContainer.js';
import {SvgIcon} from '../../Components/SvgAssets/SvgIcon.js';

//Presentation Component 
//Constants
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//CSS Styles
import OutfitNavStyles from '../../outfitNav.css';
import Styles from '../../root.css';
import NavStyles from '../../nav.css';

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
	'position':' absolute',
    'width':' auto',
    'height':' 100%',
    'margin-left':' 300px',
    'padding-top':' 12.5px',
    'padding-bottom':' 12.5px',
}

export function SiteNav(props){		
    return(
    	<div className={Styles.headerBlock}>
    		{/*<img src="Graphics/banner_title.svg" style={bannerTitleImg}/>*/}
    		{
    			props.webAppView !== 'landing' ?
    				(
    					<React.Fragment>
    						<SvgIcon 
    							name='LogoIcon' 
    							style={logo_svg}
    						/>
    						<div className={NavStyles.navBanner_div}>
    							<Nav 
    								blocks={Object.keys(OxiAppConstants.navRequestMap)} 
    								callBacks={props.navEventCallbacks} 
    								webAppView={props.webAppView} 
    								match={props.match}
    								ownerUsernamePath={props.ownerUsernamePath}/>
    						</div>
    					</React.Fragment>
    				) : (
    					<React.Fragment>
    						<div className={NavStyles.landingLogoContainer_div}>
    							<div className={NavStyles.landingLogo_div}>
    								<SvgIcon 
    									name='LogoIcon' 
    									style={Object.assign( {}, logo_svg, {
    										width:'100%', 
    										height:'75%', 
    										position:'absolute', 
    										'margin-left':'0px',
    										'padding-top':'0px',
    										'padding-bottom':'0px'
    									})}
    								/>
    							</div>
    						</div>
    						<div style={{float:'right', width:'0px'}}>
    							<div className={NavStyles.landingCtrl_div}>
    								<div className={NavStyles.landingBtnContainer_div}>
    									<div className={NavStyles.landingBtn_div}>
    										Login
    									</div>
    								</div>
    							</div>
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

		this.__handleClick  = this.__handleClick.bind(this);
	}

	componentDidMount(){
		 
	}

	componentWillUnmount(){

	}

	__handleClick(callback){
		callback();
	}

	render(){
		/*return(
			<div className={Styles.headerBlock}>
    			<BlockList blocks={['home', 'profile', 'settings', 'search', 'logout']} containerClass={NavStyles.navContainer}/>
			</div>
		);*/
		let blockList = [];
		blockList = (
			<div className={NavStyles.stdNavButtonContiner_div}>
				{
					this.props.blocks.map((block) => {
					console.log('block = ', block);
					console.log('selected = ', this.state.selected);
					let navHeader = block.toString();
					let selectionPath = '';
					
					if(navHeader === 'profile'){
						selectionPath = `/${OxiAppConstants.navRequestMap[navHeader].toLowerCase()}${this.props.ownerUsernamePath}`;
					}else if(navHeader !== ''){
						selectionPath = `/${OxiAppConstants.navRequestMap[navHeader].toLowerCase()}`;
					}

					return(
						<Link to={`${this.props.match.url}${selectionPath}`}>
							<div 
								key={navHeader} 
								className={NavStyles.stdNavButtonBlock} 
								onClick={() => {
									this.setState(prevState => ({
										selected: navHeader
									}));
									//call back to webappview component to change child component to reflect navHeader selection
									this.props.callBacks[navHeader]();
								}}
							>
								{/*
									this.state.selected !== navHeader ? 
										null :
											this.props.match.path.includes('/shop/profile') ? 
												<Redirect push={true} to={`/${this.props.match.path.split('/')[1]}/${OxiAppConstants.navRequestMap[navHeader].toLowerCase()}${this.props.ownerUsernamePath}`} /> : 
												<Redirect push={true} to={`/${this.props.match.path.split('/')[1]}/${OxiAppConstants.navRequestMap[navHeader].toLowerCase()}`} /> 
								*/}
								<div className={this.props.webAppView !== this.state.selected ? NavStyles.navButtonText_div : NavStyles['navButtonText_div--selected']}>
									{ OxiAppConstants.navRequestMap[navHeader] } 
								</div>
							</div>
						</Link>)
					})
				}
			</div>
		);
		let percentWidth = 100 / blockList.length;
		console.log("navEventCallbacks");
		console.log(this.props.callBacks);
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
		let browseContent = null;
		let browseNavStyle = null;
		let containerHeight = this.props.imageHeight;
		let containerWidth = this.props.imageWidth*(2/3);
		let browseWrapper = (wrappedStuff) => (
			this.props.webAppView === OxiAppConstants.navRequestMap.profile.toLowerCase() ?			
				( <div style={{'grid-area':'browse'}}>
					<OutfitPanelContainer 
						style={{
							width:`calc(${this.props.containerWidth !== 0 ? containerWidth : 350}px)`,
							height:'calc(5vh + 25px)',
							'text-align':'center',
							'padding-top':'5px',
							'padding-bottom':'5px',
							'margin-left': '0px',
    						'background-color': '#ffffff00',
						}} />
					{wrappedStuff}
				</div>) :
				wrappedStuff 
		);

		switch(this.props.browseSelection){
			case 'outfits':
				browseContent = () => (
						<VisibleOutfitList 
							view={this.props.webAppView} 
							scrollContainerStyle={OutfitNavStyles.previewContainer}
							containerHeight={containerHeight !== 0 ? containerHeight : null}
							containerWidth={containerWidth !== 0 ? containerWidth : null}
							/*routeToHostProfile={this.props.routeToHostProfile}*/ />);
				break;
			case 'apparel':
				browseContent = () => (<VisibleItemListBrowse changeItemHovered={()=>{}} scrollContainerStyle={OutfitNavStyles.previewContainer} />);
				break
			default:
				browseContent = null;
				break;
		}

		return(
			<React.Fragment>
				{
					browseWrapper(
    					(<div 
    						className={this.props.webAppView === OxiAppConstants.navRequestMap.profile.toLowerCase() ? Styles['outfitBlock_div--profileView'] : Styles.outfitBlock} 
    						style={this.props.webAppView === OxiAppConstants.navRequestMap.profile.toLowerCase() ? 
    							({
    								height:`calc(${this.props.imageHeight}px)`,
    								width: `calc(${this.props.containerWidth !== 0 ? containerWidth : 350}px)`
    							}) : ({})
    						}>
    						{browseContent !== null ? browseContent() : null}
    					</div>) )
				}
    		</React.Fragment>
		);
	}
}

class MetricPanel extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className={Styles.metricBlock}>
				<div className={Styles.metricContainer_div}>
					<div 
						style={{
							'padding-top': '15px',
    						'padding-bottom': '15px',
    						'height': '165px',
    						'border-bottom-style': 'solid',
    						'border-width': '20px',
    						'border-color': '#6d6d6d',
    						'margin-right':'-1px',
    						'position':'relative',
						}}
					>
						{this.props.webAppView === OxiAppConstants.navRequestMap.profile.toLowerCase() ? 
							<ProfileControlContainer /> :
							<BrowseControlContainer />
						}
	
					</div>
					<MetricTitleContainer />
					<VisibleMetricList />
				</div>
			</div>
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
		}

		this._handleItemsListUpdated = this._handleItemsListUpdated.bind(this);
		this._handleItemHovered = this._handleItemHovered.bind(this);
		this._handleImageResized = this._handleImageResized.bind(this);
		this._handleNavBtnSelected = this._handleNavBtnSelected.bind(this);

		this.previousLocation = props.location;
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

	componentWillUpdate(nextProps){
		// set previousLocation if props.location is not modal
		if(nextProps.history.action !== "POP" && (!location.state || !location.state.modal)){
			this.previousLocation = this.props.location;
		}
	}

	render() {
		const { location } =  this.props;
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
		console.log('this.props.location = ', location);
		console.log('this.props.owner = ', this.props.owner);
		/*switch(this.state.navDestination){
			case 'profile'
				<Redirect push={true} to={`${this.props.match.url}/profile${}`}/>
				<Route path={this.props.match.url + 'profile'}/>
		}*/
		let ownerUsernamePath = this.props.owner ? `/${this.props.owner.username}` : '';
		return(
			<React.Fragment>
				<Switch location={isModal ? this.previousLocation : location}>
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
						path={`${this.props.match.url}/browse`}
						render={(props) => (	
							<div>
								<SiteNav 
									navEventCallbacks={this.props.navEventCallbacks} 
									webAppView={this.props.webAppView} 
									match={this.props.match}
									ownerUsernamePath={ownerUsernamePath} />
								<div style={{'margin-top':'80px','height':'calc(100vh - 80px)'}}>
									<div className={Styles.containerBrowse}>
										{/*<div className={Styles.metricsContainer_div}>
											<MetricPanel />
										</div>*/}
										<MetricPanel/>
										<OutfitNav 
											webAppView={this.props.webAppView}
											browseSelection={this.props.browseSelection}
											/*routeToHostProfile={(usernameUri) => this._handleNavBtnSelected(`/profile${usernameUri}`)}*/ />
										{/*(this.props.location.state && this.props.location.state.modal) ? <ModalContentSelection/> : null*/}
										<Admin/>
									</div>
								</div>
							</div>
						)}
					/>
					<Route
						path={`${this.props.match.url}/profile/:username`}
						render={(props) => (
							<div>
								<SiteNav 
									navEventCallbacks={this.props.navEventCallbacks} 
									webAppView={this.props.webAppView} 
									match={this.props.match}
									ownerUsernamePath={ownerUsernamePath}/>
								<div style={{'margin-top':'80px','height':'calc(100vh - 80px)'}}>
									<div 
										className={Styles.containerProfile} 
										style={
											(this.state.imageWidth !== 0 && this.state.imageHeight !== 0) ? 
												({'grid-template-columns': `300px 24.579% ${this.state.imageWidth + 50}px auto`}) : 
												null
										}
									>								
										<MetricPanel webAppView={this.props.webAppView}/>
										<VisibleItemList 
											visibleItemsMap={this.state.visibleItems !== undefined ? this.state.visibleItems : {}}
											populateItemsMap={(visibleItemsByIds) => this._handleItemsListUpdated(visibleItemsByIds)} 
											itemIdHovered={this.state.itemIdHovered}
											changeItemHovered={(itemId) => this._handleItemHovered(itemId)} />
										<ContentContainer 
											imageWidth={this.state.imageWidth}
											imageHeight={this.state.imageHeight}									
											imageResized={this._handleImageResized}
											visibleItemsMap={this.state.visibleItems !== undefined ? this.state.visibleItems : {}}
											populateItemsMap={(visibleItemsByIds) => this._handleItemsListUpdated(visibleItemsByIds)}
											itemIdHovered={this.state.itemIdHovered}
											changeItemHovered={(itemId) => this._handleItemHovered(itemId)} />
										<OutfitNav 	
											imageWidth={this.state.imageWidth}
											imageHeight={this.state.imageHeight}
											webAppView={this.props.webAppView}
											browseSelection="outfits"/> 
										<Admin/>
									</div>
								</div>
								{/*(this.props.location.state && this.props.location.state.modal) ? <ModalContentSelection/> : null*/}
							</div>
						)}
					/>
					<Route render={props => <div>This URI does not exist</div>} />
				</Switch>
				{this.props.formType !== 'HIDDEN' ? modalContent : null}
			</React.Fragment>
		)
	}
}