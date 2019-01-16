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
	//position: 'absolute',
}
const itemCellContentContainer = {
	position: 'relative',
}

export const Item = (props) => {
	//const linkFavicon = "https://www.google.com/s2/favicons?domain=" + link;
	//console.log(linkFavicon);
	
	let brandColorStyle = null;
	let brandName = null;
	let brandLink = null;
	let retailerName = null;
	let retailerLink = null;

	if(props.item !== undefined){
		if(props.brands !== undefined && props.brands !== null && props.item.brand){
			brandName = props.brands[props.item.brand].name;
			brandLink = props.brands[props.item.brand].link;
			brandColorStyle = {
				'background-image': `linear-gradient(to right, black, black, rgb(${props.brands[props.item.brand].red},${props.brands[props.item.brand].green},${props.brands[props.item.brand].blue}))`
			};
		}
		if(props.retailers !== undefined && props.retailers !== null && props.item.retailer){
			retailerName = props.retailers[props.item.retailer].name;
			retailerLink = props.retailers[props.item.retailer].link
		}
	}else{
		return null;
	}

	let fill = "#FFF";
	let stroke = "#FFF";
	let isSelected = props.selectedAllIds.includes(props.item.id);
	let itemContainerStyles = null;

	switch(true){
		case props.webAppView === OxiAppConstants.navRequestMap.profile.toLowerCase():
			itemContainerStyles = !isSelected ?
							ItemStyles.itemContainer_div :
							props.viewState === OxiAppConstants.viewState.PREVIEW ? 
								ItemStyles['itemContainerPreview_div--selected'] : 
								ItemStyles['itemContainerEdit_div--selected'];
			break;
		case props.webAppView === OxiAppConstants.navRequestMap.home.toLowerCase():
			itemContainerStyles = !isSelected ? 
							ItemStyles.itemContainer_div :
							props.browseSelection === 'apparel' ?
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
			onMouseOver={props._handleMouseOver.bind(this)}
			onMouseLeave={props._handleMouseLeave.bind(null)} 
			onClick={() => {
				if(props.webAppView === 'home' && props.browseSelection === 'apparel'){
					props.getContentsByItemId();
					props.onDeselect(props.selectedAllIds.filter(id => id != props.item.id)[0]);
				}
				(isSelected === true) ? props.onDeselect(props.item.id) : props.onSelect(props.item.id);
			}} >
			<CSSTransition
			    tiemout={200}
			    classNames="itemMenuContainer"
			    in={props.itemIdHovered === props.item.id}
			    unmountOnExit >
				<div id="itemMenuContainer" className="itemMenuContainer">
					{
						props.viewState !== OxiAppConstants.viewState.PREVIEW ? 
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
						)
					}
				</div>
			</CSSTransition>
			<a className={ItemStyles.itemSizeBlock}>
				<SvgIcon 
					name={OxiAppConstants.ItemTypesByLabel[props.item.type] !== undefined ? OxiAppConstants.ItemTypesByLabel[props.item.type].iconName : null}
					fill={fill}
					stroke={stroke}/>
			</a>
			<a className={ItemStyles.itemTypeBlock}>
				<div style={itemCellContainer}>
					<div>	
						{props.item.size}
					</div>
				</div>
			</a>

			<div style={{
				'display': 'inline-block',
    			'width': 'calc((100% - 100px))',
    			'vertical-align': 'top',
    			'height': '100%',
    			'border-left-style': 'solid',
    			'border-left-color': '#fdfdfd',
    			'border-left-width': '8px',
			}}>
				<div className={ItemStyles.itemBrandBlock} href={brandLink} target="_blank">
					<div style={itemCellContainer}>
						<div style={{'font-family': '\'Archivo Black\', sans-serif'}}>	
							{brandName}
						</div>
					</div>
				</div>
				<div className={ItemStyles.itemRetailerBlock} href={retailerLink} target="_blank">
					<div style={itemCellContainer}>
						<div>	
							{retailerName}
						</div>
					</div>
				</div>
			</div>
			{
				props.webAppView !== 'home' ?
					null :
					props.browseSelection !== 'apparel' ?
						null : 
						isSelected ?
							(
								<VisibleItemAsSeenOnList selectedItemId={props.item.id}/>
							) :
							null
			}
		</div>		
	);	
}