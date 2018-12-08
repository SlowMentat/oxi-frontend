import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

//Container Components
import ModalContentSelection from '../../Components/Containers/SelectModalContent.js'
import VisibleItemList from '../../Components/Containers/VisibleItemList.js';
import VisibleOutfitList from '../../Components/Containers/VisibleOutfitList.js';
import ContentContainer from '../../Components/Containers/ContentContainer.js';
import OutfitPanelContainer from '../../Components/Containers/OutfitPanelContainer.js'
import VisibleMetricList from '../../Components/Containers/VisibleMetricList.js'
import MetricTitleContainer from '../../Components/Containers/MetricTitleContainer.js';

//Presentation Component 
import LandingPageContainer from '../../Components/Containers/LandingPageContainer.js'

//Constants
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//CSS Styles
import OutfitNavStyles from '../../outfitNav.css';
import Styles from '../../root.css';
import NavStyles from '../../nav.css';

//Third pary
import isEqual from 'lodash.isequal';


const bannerTitleImg = {
	'position': 'fixed',
    'width': '200px',
    'margin-left': '45px',
    'margin-top': '10px'
}

function SiteNav(navEventCallbacks){		
    return(
    	<div className={Styles.headerBlock}>
    		<img src="Graphics/banner_title.svg" style={bannerTitleImg}/>
    		<Nav blocks={Object.keys(OxiAppConstants.navRequestMap)} callBacks={navEventCallbacks}/>
    	</div>
	);
}

class Nav extends React.Component{
	constructor(props){
		super(props);
		const blocks = this.props.blocks;
		this.state = {
			blockList: []
		};

		this.__handleClick  = this.__handleClick.bind(this);

		let percentWidth = 100 / this.state.blockList.length;
		this.state.blockList = blocks.map((block) => {
			return(
				<div key={block.toString()} className={NavStyles.stdNavButtonBlock} style={{width:'20%','padding-top':'45px'}} onClick={this.props.callBacks.navEventCallbacks[block.toString()]}>
					{OxiAppConstants.navRequestMap[block.toString()]} 
				</div>
			)
		});
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
		console.log("navEventCallbacks");
		console.log(this.props.callBacks);
		return(
			<div className={NavStyles.navContainer}>
				<div className={NavStyles.center}>
					{this.state.blockList}
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
		return(
    		<div className={Styles.outfitBlock}>
    			<div className={OutfitNavStyles.outfitNavContainer}>
	    			<div className={OutfitNavStyles.outfitCtrlContainer}>
						<OutfitPanelContainer webAppView={this.props.webAppView}/>
	    			</div>
	    			<div className={OutfitNavStyles.previewContainer}>
	    				<VisibleOutfitList  webAppView={this.props.webAppView}/>
	    			</div>
    			</div>
    		</div>
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
				<MetricTitleContainer />
				<VisibleMetricList />
			</div>
		);
	}
}

export default class webAppView extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			enableAddOutfitButton: true,
			visibleItems: {
				visibleItemsByIds: {}
			},
			itemIdHovered: null,
		};

		this._handleItemsListUpdated = this._handleItemsListUpdated.bind(this);
		this._handleItemHovered = this._handleItemHovered.bind(this);
	}

	/*shouldComponentUpdate(nextProps, nextState) {
        const differentView = this.props.webAppView !== nextProps.webAppView;
        console.log('differentView = ',differentView);
        return differentView;
    }*/

	_removeOutfitForm(){
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
		if(Object.keys(this.state.visibleItems.visibleItemsByIds).length != Object.keys(visibleItemsByIds).length){
			console.log('>> Update forced due to different key count')
			console.log('>> state = ', this.state.visibleItems.visibleItemsByIds);
			console.log('>> parameter = ', visibleItemsByIds)
			this.setState(prevState => ({
				visibleItems: {
					//...prevState.visibleItems,
					visibleItemsByIds
				}
			}));
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

	render() {
		console.log("webAppView = ")
		console.log(this.props.webAppView)
		switch(this.props.webAppView){
			case "landing":
				return(
					<div>
						<SiteNav navEventCallbacks={this.props.navEventCallbacks}/>
						<LandingPageContainer/>
					</div>
				);
			case "home":
				return(
					<div>
						<SiteNav navEventCallbacks={this.props.navEventCallbacks}/>
						<div style={{'margin-top':'80px','height':'calc(100vh - 80px)'}}>
							<div className={Styles.containerBrowse}>
								<MetricPanel />
								<OutfitNav 	webAppView={this.props.webAppView}/>
								<ModalContentSelection/>
								<Admin/>
							</div>
						</div>
					</div>
				);
			case "profile":
				return(
					<div>
						<SiteNav navEventCallbacks={this.props.navEventCallbacks}/>
						<div style={{'margin-top':'80px','height':'calc(100vh - 80px)'}}>
							<div className={Styles.containerProfile}>								
								<MetricPanel />
								<OutfitNav 	webAppView={this.props.webAppView}/>
								<ContentContainer 
									visibleItemsMap={this.state.visibleItems !== undefined ? this.state.visibleItems : {}}
									populateItemsMap={(visibleItemsByIds) => this._handleItemsListUpdated(visibleItemsByIds)}
									itemIdHovered={this.state.itemIdHovered}
									changeItemHovered={(itemId) => this._handleItemHovered(itemId)}/>
								<VisibleItemList 
									visibleItemsMap={this.state.visibleItems !== undefined ? this.state.visibleItems : {}}
									populateItemsMap={(visibleItemsByIds) => this._handleItemsListUpdated(visibleItemsByIds)} 
									itemIdHovered={this.state.itemIdHovered}
									changeItemHovered={(itemId) => this._handleItemHovered(itemId)}/>
								<Admin/>
							</div>
						</div>
						<ModalContentSelection/>
					</div>
				);
			default:
				console.log("returning null view satat")
				return null;
		}
	}
}