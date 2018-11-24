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
			visibleItems: {}
		};

		this._handleItemsListUpdated = this._handleItemsListUpdated.bind(this);
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
		console.log('in _handleItemsListUpdated.  this.state.visibleItems.visibleItemsByIds = ', this.state.visibleItems.visibleItemsByIds)
		console.log('in _handleItemsListUpdated.  visibleItemsByIds = ', visibleItemsByIds)
		if(this.state.visibleItems.visibleItemsByIds != visibleItemsByIds){
			this.setState(prevState => ({
				visibleItems: {
					//...prevState.visibleItems,
					visibleItemsByIds
				}
			}));
		}
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
								<ContentContainer visibleItemsMap={this.state.visibleItems !== undefined ? this.state.visibleItems : {}} populateItemsMap={(visibleItemsByIds) => this._handleItemsListUpdated(visibleItemsByIds)}/>
								<VisibleItemList populateItemsMap={this._handleItemsListUpdated}/>
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