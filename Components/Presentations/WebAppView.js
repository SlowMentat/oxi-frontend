import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

//Container Components
import ModalContentSelection from '../../Components/Containers/SelectModalContent.js'
import VisibleItemList from '../../Components/Containers/VisibleItemList.js';
import VisibleOutfitList from '../../Components/Containers/VisibleOutfitList.js';
import ContentContainer from '../../Components/Containers/ContentContainer.js';
import OutfitPanelContainer from '../../Components/Containers/OutfitPanelContainer.js'

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
		this.handleFormCreation = this.handleFormCreation.bind(this);
		this.stateChangeFinish - this.stateChangeFinish.bind(this);
	}

	componentDidMount(){		 
	}

	componentWillUnmount(){
	}

	componentWillMount(){

	}

	stateChangeFinish(){
	}

	handleFormCreation(){
		//if(store.getState(debug)) console.log("invoking handleFormCreation()");
		this.props.parentCreateOutfitForm();
	}

	render(){
		return(
    		<div className={Styles.outfitBlock}>
    			<div className={OutfitNavStyles.outfitNavContainer}>
	    			<div className={OutfitNavStyles.outfitCtrlContainer}>
						<OutfitPanelContainer/>
	    			</div>
	    			<div className={OutfitNavStyles.previewContainer}>
	    				<VisibleOutfitList />
	    			</div>
    			</div>
    		</div>
		);
	}
}

class AddOutfitButton extends React.Component{
	constructor(props){
		super(props);
		// This binding is necessary to make `this` work in the callback
    	this._handleClick = this._handleClick.bind(this);
	}

	componentDidMount(){
		 
	}

	componentWillUnmount(){

	}

	_handleClick(){
		/*if({store}.getState(debug)){
			console.log("clicked!");
			console.log("AddOutfitButton.props.enabled = " + this.props.enabled);
		}*/
		if(this.props.enabled) this.props.handleUserClick();
	}

	render(){
		//return(null);
		return(
	    	<div className={OutfitNavStyles.outfitCtrlButton} onClick={this._handleClick}>
	    		Add Outfit
	    	</div>

		);
	}	
}

export default class webAppView extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			enableAddOutfitButton: true
		};

		this._createOutfitForm = this._createOutfitForm.bind(this);
	}

	//Add Outfit Form event handlers

	_createOutfitForm(){		
		//if(store.getState(debug)) console.log("invoking creatOutfitForm()");
		this.setState((prevState) => ({
			enableAddOutfitButton: !prevState.enableAddOutfitButton,
			showOutfitForm: !prevState.showOutfitForm
		}));

		//First add outfit entity with passing child id addedContentIds taken from state mapping above
		//Note:  this is anticipating content id of 1 since there should only 
		//be one content entity present in the addedEntitiesReducer at anygiven time.
		dispatch(addOutfit('','','','',[1], 'profileId'));
		dispatch(editContentView(true));
		//Then add outfit child entity/entiteis.
		//Note:  this is anticipating outfit id of 1 since there should only 
		//be one outfit entity present in the addedEntitiesReducer at anygiven time.
		dispatch(addContent(1, []));
	}

	_removeOutfitForm(){
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
					<div className={Styles.containerHome}>
						<SiteNav navEventCallbacks={this.props.navEventCallbacks}/>
						<div style={{'margin-top':'80px'}}>
							<OutfitNav 	parentCreateOutfitForm={this._createOutfitForm} enableAddOutfitButton={this.state.enableAddOutfitButton}/>
						</div>
						<ModalContentSelection/>
					</div>
				);
			case "profile":
				return(
					<div>
						<SiteNav navEventCallbacks={this.props.navEventCallbacks}/>
						<div style={{'margin-top':'80px','height':'calc(100vh - 80px)'}}>
							<div className={Styles.containerProfile}>
								<div className={Styles.metricBlock}>
									Metric Block
								</div>
								<OutfitNav 	parentCreateOutfitForm={this._createOutfitForm} enableAddOutfitButton={this.state.enableAddOutfitButton}/>
								<ContentContainer />
								<VisibleItemList />
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