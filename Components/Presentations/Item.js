import React from 'react';
import ItemStyles from '../../item.css';
//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js';
//import EditIcon from '../SvgAssets/Icons/EditIcon.js';
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
	'height': '75px',
	'margin-bottom':'8px',	
};

const itemContainerSelected = {
	'height': '75px',
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
	position: 'absolute',
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
	/*
	console.log('+++++++++++++++++++++++++++++++++');
	console.log('props.brands', props.brands);
	console.log('props.retailers', props.retailers);
	console.log('++++++++++++++++++++++++++++++++++');
	console.log('props.item', props.item);
	*/
	if(props.item !== undefined){
		if(props.brands !== undefined && props.brands !== null && props.item.brand){
			/*console.log("brand id = ", props.brands)
			console.log('props.item.brand = ', props.item.brand)
			console.log('brand[props.item.brand] = ', props.brands[`${props.item.brand}`])*/
			brandName = props.brands[props.item.brand].name;
			brandLink = props.brands[props.item.brand].link;
			brandColorStyle = {
				'background-image': `linear-gradient(to right, black, black, rgb(${props.brands[props.item.brand].red},${props.brands[props.item.brand].green},${props.brands[props.item.brand].blue}))`
			};
		}
		if(props.retailers !== undefined && props.retailers !== null && props.item.retailer){
			/*console.log("brand id = ", Object.keys(props.brands))
			console.log('props.item.brand = ', props.item.brand)*/
			retailerName = props.retailers[props.item.retailer].name;
			retailerLink = props.retailers[props.item.retailer].link
		}
	}else{
		return null;
	}
	/*
	console.log('brandName = ', brandName);
	console.log('brandLink = ', brandLink);
	console.log('retailerName = ', retailerName);
	console.log('retailerLink = ', retailerLink);
	*/
	//console.log('itemContainer = ', itemContainer);
	let fill = "#FFF";
	let stroke = "#FFF";
	let isSelected = props.selectedAllIds.includes(props.item.id);
	return(			
		<div 
			//style={props.item.id === props.itemIdHovered ? itemContainerHovered : itemContainer}
			style={!isSelected ? itemContainer : props.viewState === OxiAppConstants.viewState.PREVIEW ? itemContainerSelectedPrev : itemContainerSelected }
			onMouseOver={props._handleMouseOver.bind(this)}
			onMouseLeave={props._handleMouseLeave.bind(null)} 
			onClick={(isSelected === true) ? props.onDeselect : props.onSelect} >
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
			<a className={ItemStyles.itemRetailerBlock} href={retailerLink} target="_blank">
				<div style={itemCellContainer}>
					<div>	
						{retailerName}
					</div>
				</div>
			</a>
			<a 
				className={ItemStyles.itemBrandBlock} 
				//style={brandColorStyle} 
				href={brandLink} 
				target="_blank" >
				<div style={itemCellContainer}>
					<div>	
						{brandName}
					</div>
				</div>
			</a>
		</div>		
	);	
}