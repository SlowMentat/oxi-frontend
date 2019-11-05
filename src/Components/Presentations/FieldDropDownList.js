import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.scss';
import Styles from '../../root.scss';
import {sendAsyncRequest/*, OxiAppConstants*/} from '../../App.js';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {handleUnauthorizedRequest, requestInterceptor, loginConfig, cookies} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {denormalizeOutfit} from '../../Util/Schema.js';
/*import TypeJacket from '../SvgAssets/Icons/TypeJacket.js';
import TypePants from '../SvgAssets/Icons/TypePants.js';
import TypeShirtLong from '../SvgAssets/Icons/TypeShirtLong.js';
import TypeShirtT from '../SvgAssets/Icons/TypeShirtT.js';
import TypeShorts from '../SvgAssets/Icons/TypeShorts.js';*/
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

import { Route, Switch, Redirect } from 'react-router-dom';


const logoUrlExists = (logoUrl, callback) => {
	let img = new Image();
	img.onload = () => {
		console.log("logoUrl img not found");
		//return callback(true, logoUrl);
		return true;
	};
	img.onerror = () => {
		console.log("logoUrl img found");
		//return callback(false, logoUrl);
		return false;
	};
	img.src = logoUrl;
}

const RetailerNameDropDownList = ({props}) => {
	return(
		<React.Fragment>
		{
			<TransitionGroupWrapper 
				props={{
					'contentList': props.retailerNames,
					'contentWrapper': (searchResult) => (
						<div 
							className = {FormStyles.ddRetailerSlot_div}
							onMouseDown = {(event) => props.dropdownOptionSelected(event, searchResult.data)} >
							<div className={FormStyles.ddRetailerLogo_div}>
								{
									logoUrlExists(searchResult.data.logo_url) ? 
										(<img src={searchResult.data.logo_url} alt="Retailer's logo"/>) :
										(<SvgIcon style={{width:'100%', height:'100%'}} name="RetailerIcon"/>)
								}
							</div>
							<div className={FormStyles.ddRetailerName_div}>
								{searchResult.data.name}
							</div>
						</div>),
				}}
			/>
		}	
		</React.Fragment>
	);
}

const RetailerItemDropDownList = ({props}) => {
	return(
		<React.Fragment>
			{					
				//props.retailerItems === 'item' ?
					props.retailerItems.map(searchResult => (
						<div 
							className={FormStyles.ddItemSlot_div}							
							onMouseDown = {(event) => props.dropdownOptionSelected(event, {...searchResult, id: searchResult.id.toLowerCase()})}>
							<div className={FormStyles.ddItemPreviewPicContainer_div} >
								{/*<div className{FormStyles.ddItemPreviewPicGhost_div}>
								</div>*/}
								<div className={FormStyles.ddItemPreviewPic_div}>
									<img style={{width:'100%'}} src={searchResult.itemSnippet.product.featuredImage.originalSrc}/>
								</div>
							</div>
							<div 
								className={FormStyles.ddItemContent_div}>
								<div className={FormStyles.ddItemTitle_div}>
									{searchResult.itemSnippet.product.handle}
								</div>
								<div className={FormStyles.ddItemDescription_div}>
									{searchResult.itemSnippet.product.description}
									<div className={FormStyles.ddTextOverflow_div}>
										{("...")}
									</div>
								</div>
							</div>
						</div>
					)) /*:
					null*/
			}
		</React.Fragment>
	);
}

const ApparelTypeDropDownList = ({props}) => {
	return(
		props.filteredApparelTypes.map((apparelType) => (
			<div 
				className={FormStyles.ddApparelTypeSlot_div} 
				style={props.style} 
				//onMouseDown={() => props.dropdownSelected(apparelType.id)}
				onMouseDown = {(event) => props.dropdownOptionSelected(event, apparelType)}>
				{
					apparelType.iconName !== undefined ? 
						(
							<React.Fragment>
								<div className={FormStyles.ddApparelTypeIcon_div}>
									<SvgIcon className={FormStyles.ddApparelTypeIcon_svg} name={apparelType.iconName}/>
								</div> 
								<div className={FormStyles.ddApparelTypeNameContainer_div} >
									<div className={FormStyles.ddApparelTypeName_div} >
										{apparelType.name}
									</div>
								</div>
							</React.Fragment>
						) : 
						apparelType								
				}
			</div>)
		)
	);
}

const UdsLabelDropDownList = ({props}) => {
	return(
		<React.Fragment>
		{
			//props.udsLabelResults === 'retailerName' ? 
				props.udsLabelResults.map(searchResult => (
					<div 
						className={FormStyles.ddRetailerSlot_div}
						onMouseDown = {(event) => props.dropdownOptionSelected(event, searchResult.data)} >
						<div className={FormStyles.ddRetailerName_div}>
							{searchResult.data.size}
						</div>
					</div>
				)) /*:
				null*/
		}	
		</React.Fragment>
	);
}

const UdrNameDropDownList = ({props}) => {
	return(
		<React.Fragment>
		{
			<TransitionGroupWrapper 
				props={{
					'contentList': props.udrNameResults,
					'contentWrapper': (searchResult) => (
						<div 
							className={FormStyles.ddUdrNameContainer_div}
							onMouseDown = {(event) => props.dropdownOptionSelected(event, searchResult.data)}>
							<div className={FormStyles.ddUdrName_div}>
								{searchResult.data.name}
							</div>
						</div>),
				}}
			/>
		}	
		</React.Fragment>
	);
}

const SizeLabelDropDownList = ({props}) => {
	return(
		<React.Fragment>
		{
			//props.type === 'retailerName' ? 
				props.retailerSize.map(sizeGroup => (
					<div 
						className={FormStyles.ddRetailerSlot_div}
						onMouseDown = {(event) => props.dropdownOptionSelected(event, sizeGroup)}>
						<div className={FormStyles.ddRetailerName_div}>
							{sizeGroup.sizeLabel}
						</div>
					</div>
				)) /*:
				null*/
		}	
		</React.Fragment>
	);
}

const TransitionGroupWrapper = ({props}) => {
	return(
		<TransitionGroup>
			{
				props.contentList.map((content, index) => (
					<CSSTransition
			    		key={index}
			    		tiemout={200}
			    		classNames="ddUdrNameContainer"
			    		
			    		unmountOnExit>
						
						{props.contentWrapper(content)}

					</CSSTransition>
				))
			}
		</TransitionGroup>
	);
}

export class FieldDropDownList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let display = null
		switch(this.props.fieldType){
			case 'item':
				display = <RetailerItemDropDownList props={this.props}/>
				break;
			case 'retailer':
				//retailer field from "Retailer Tags" tab
				if(this.props.context === 0){
					display = <RetailerNameDropDownList props={this.props}/>
				}				
				//retailer field from "User Tags" tab
				else if(this.props.context === 1){
					display = <UdrNameDropDownList props={this.props}/>					
				}
				break;
			case 'size':
				//size field from "Retailer Tags" tab
				if(this.props.context === 0){
					display = <SizeLabelDropDownList props={this.props}/>
				}				
				//size field from "User Tags" tab
				else if(this.props.context === 1){
					display = <UdsLabelDropDownList props={this.props}/>					
				}
				break;
			case 'apparelType':
				display = <ApparelTypeDropDownList props={this.props}/>
				break;
			default:
				break;
		}
		return(display);
	}
}
