import React from 'react';
import ItemStyles from '../../item.css';
//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js';
//import EditIcon from '../SvgAssets/Icons/EditIcon.js';
import VisibleItemAsSeenOnList from '../../Components/Containers/VisibleItemAsSeenOnList.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

const itemContainerHovered = {
	'height': '75px',
	'margin-bottom':'8px',
	'margin-left': '-75px', 
	'padding-left': '75px', 
	'background-color': '#bfbfbf48', 
	'border-top-left-radius': '15px', 
	'border-bottom-left-radius': '15px',
	//'border-style':'solid',
	//'border-width':'2px',
};

const itemContainer = {
	'height': '100px',
	'margin-bottom':'8px',	
	'border-radius': '3px',
};

const itemContainerSelected = {
	'height': '100px',
	'margin-bottom':'8px',
    'border-style':'solid',
    'border-color':'#6dd7b4',
    'border-width':'3px',
    'border-top-left-radius':'18px',
    'border-bottom-left-radius':'18px',
    'border-right':'none',
    'margin-left':'-3px',
}

const itemContainerSelectedPrev = Object.assign({}, itemContainerSelected, {'border-color':'red'});

const defualtItemMenuContainer = {
	position:'absolute',
}

const itemCellContainer = {
	'margin-top':'25px',
	width:'100%',
}
const itemCellContentContainer = {
	position: 'relative',
}

export class Item extends React.Component{
	constructor(props){
		super(props)		
		this.state = {
			coverpicuri: null,
			base64Image:null
		};

		this._handleImageReceived = this._handleImageReceived.bind(this);
	}
	//const linkFavicon = "https://www.google.com/s2/favicons?domain=" + link;
	//console.log(linkFavicon);


	componentDidMount(){
		//if coverpicuri filename exists, call get request for content coverpic data
		console.log("coverpicuri = ", this.props.item.coverpicuri)
		if(this.props.item.coverpicuri !== null && this.props.item.coverpicuri !== undefined) this.props.getCoverPic(this.props.item.coverpicuri, this._handleImageReceived);
	}

	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	render(){
		let brandColorStyle = null;
		let retailerName = null;
		let retailerLink = null;
		let description = '';
		let userDefinedSize = null;
		//let retailerName = null;
		//let retailerLink = null;

		if(this.props.item !== undefined){
			//if(this.props.item.retailer !== null && this.props.item.retailer !== undefined){
			if(this.props.item.product !== null && this.props.item.product !== undefined){
				//retailerName = this.props.item.retailer.name;//this.props.brands[this.props.item.brand].name;
				//retailerLink = this.props.item.retailer.home_page_url;//this.props.brands[this.props.item.brand].link;
				retailerName = this.props.item.product.udr  //User defined retailer
				retailerLink = this.props.item.product.onlineStoreUrl;
				userDefinedSize = this.props.item.product.uds;  //User defined size
				description = this.props.item.product.handle;
			}
			/*if(this.props.retailers !== undefined && this.props.retailers !== null && this.props.item.retailer){
				retailerName = this.props.retailers[this.props.item.retailer].name;
				retailerLink = this.props.retailers[this.props.item.retailer].link
			}*/
		}else{
			return null;
		}
		console.log('description = ', description);
		let fill = "#FFF";
		let stroke = "#FFF";
		let isSelected = this.props.selectedAllIds.includes(this.props.item.id);
		let itemContainerStyles = null;
		let isProfileView = (this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase());
	
		switch(true){
			case this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase():
				itemContainerStyles = !isSelected ?
								ItemStyles.itemContainer_div :
								this.props.viewState === OxiAppConstants.viewState.PREVIEW ? 
									ItemStyles['itemContainerPreview_div--selected'] : 
									ItemStyles['itemContainerEdit_div--selected'];
				break;
			case this.props.webAppView === OxiAppConstants.navRequestMap.a.toLowerCase():
				itemContainerStyles = !isSelected ? 
								ItemStyles.itemContainer_div :
								this.props.browseSelection === 'apparel' ?
									ItemStyles['itemContainerBrowse_div--selected'] :
									null;
				break;
			default:
				break;
		}
		console.log('itemContainerStyles = ', itemContainerStyles);

		return(			
			<div 
				className={itemContainerStyles}
				onMouseOver={this.props._handleMouseOver.bind(this)}
				onMouseLeave={this.props._handleMouseLeave.bind(null)} 
				style={isProfileView ? {width: '100%', 'height':'calc(((100vh - 40px - 40px - 80px - 80px - 25px - 5vh - 12px)/6) - 1px)'} : {}}
				onClick={() => {
					if(this.props.webAppView === OxiAppConstants.navRequestMap.a.toLowerCase() && this.props.browseSelection === 'apparel'){
						this.props.removeContentEntities();
						this.props.getContentsByItemId();
						this.props.onDeselect(this.props.selectedAllIds.filter(id => id != this.props.item.id)[0]);
					}
					(isSelected === true) ? this.props.onDeselect(this.props.item.id) : this.props.onSelect(this.props.item.id);
				}} >
				<CSSTransition
				    tiemout={200}
				    classNames="itemMenuContainer"
				    in={this.props.itemIdHovered === this.props.item.id}
				    unmountOnExit >
					<div id="itemMenuContainer" className="itemMenuContainer">
						{
							/*this.props.viewState !== OxiAppConstants.viewState.PREVIEW ? 
							(
								<React.Fragment>
									<div style={{
										'margin-top':'5px',
   										'margin-left': '-20px',
   										'width': '15px',
   										'position': 'absolute',
									}}>
										<SvgIcon name="DeleteIcon" />
									</div>
									<div style={{
										position: 'relative',
   										'width': '30px',
   										'top': '32.5%',
									}}>
										<SvgIcon name="EditIcon" />
									</div>
								</React.Fragment>
							) :
							(
								<div style={{
									position: 'relative',
   									'width': '45px',
   									'top': '15px',
   									'margin-left': '-12px',
								}}>
									<SvgIcon name="WardrobeIcon" />
								</div>
							)*/
						}
					</div>
				</CSSTransition>
				<a className={ItemStyles.itemTypeBlock}>
					<SvgIcon 
						//name={this.props.item.apparelType.iconName !== undefined ? this.props.item.apparelType.iconName : null}
						name={this.props.apparelTypeByIds !== undefined ? this.props.apparelTypeByIds[this.props.item.apparelType].iconName : null}
						fill={fill}
						stroke={stroke}/>
				</a>
				<a 
					className={ItemStyles.itemSizeBlock} 
					style={{
						'border-top-right-radius': '4px',
						'border-bottom-right-radius': '4px',
					}}
				>
					<div style={itemCellContainer}>
						<div className={ItemStyles.itemSize_div}>	
							{userDefinedSize}
						</div>
					</div>
				</a>
				{
					(this.props.webAppView === OxiAppConstants.navRequestMap.a.toLowerCase() && this.props.browseSelection === 'apparel') ?
						(
							<div style={{
								display: 'inline-block',
								'vertical-align':'top',
								width:'calc(75px + 6px)',
								'border-left':'6px solid #fdfdfd',
							}}>
								<img src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} style={{width:'75px',height:'112.5px'}}/>
							</div>
						) : 
						null
				}

				<div className={isProfileView ? ItemStyles.sourceInfoProfile_div : ItemStyles.sourceInfo}>
					<div className={ItemStyles.itemInfoBlock_div} href={retailerLink} target="_blank">
						<div style={{}}>
							<div className={ItemStyles.itemRetailerHomeGradientContainer_div}>
								<div className={ItemStyles.itemRetailerHomeGradient_div}>
								</div>
							</div>
							<div className={ItemStyles.retailerName_div}>	
								{retailerName}
							</div>
							<div className={ItemStyles.itemRetailerEndGradientContainer_div}>
								<div 
									className={ItemStyles.itemRetailerEndGradient_div}
									style={isProfileView ? ({width:'65px'}) : ({})}>
									<div className={ItemStyles.ellipsisContainer_div}>
										<div className={ItemStyles.ellipsis_div}>
											...
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={ItemStyles.itemDescriptionBlock} href={retailerLink} target="_blank">
						<div style={itemCellContainer}>
							<div>	
								{description}
							</div>
						</div>
					</div>
				</div>
				{
					isProfileView ?
						(<div className={ItemStyles.shopBtnContainer_div}>
							<div className={ItemStyles.shopBtn_div}>
								<SvgIcon name="ShopIcon" strokWidth='1.5'/>
								<div className={ItemStyles.shopMask_div}>
								</div>
							</div>
						</div>) : 
						null
				}
				{
					this.props.webAppView !== OxiAppConstants.navRequestMap.a.toLowerCase() ?
						null :
						this.props.browseSelection !== 'apparel' ?
							null : 
							isSelected ?
								(
									<VisibleItemAsSeenOnList selectedItemId={this.props.item.id} />
								) :
								null
				}
			</div>		
		);	
	}
}