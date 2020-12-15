import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.scss';
import Styles from '../../root.scss';
//import {sendAsyncRequest/*, OxiAppConstants*/} from '../../App.js';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { handleUnauthorizedRequest, requestInterceptor, loginConfig, cookies } from '../../Components/Actions/indexActions.js';
import { OxiAppConstants } from '../../Util/OxiAppConstants.js';
import { denormalizeOutfit } from '../../Util/Schema.js';
/*import TypeJacket from '../SvgAssets/Icons/TypeJacket.js';
import TypePants from '../SvgAssets/Icons/TypePants.js';
import TypeShirtLong from '../SvgAssets/Icons/TypeShirtLong.js';
import TypeShirtT from '../SvgAssets/Icons/TypeShirtT.js';
import TypeShorts from '../SvgAssets/Icons/TypeShorts.js';*/
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

import { Route, Switch, Redirect } from 'react-router-dom';

import { ItemSearch } from './Item.js';
import { Button, IconButton } from '../../Components/Presentations/FitseeUI/Buttons/index.js'; 
import { 
	Badge,
	BadgeAnchor,
} from '@rmwc/badge';
import '@rmwc/badge/styles';


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

const isTagFound = (resultLength, inputValue) => (
	resultLength.length == 0 && inputValue.length ? 
		<TagNotFoundMessage/> :
		null
);

const TagNotFoundMessage = () => (
	<div
		style={{
			'width': '240px',
    		'border-radius': '4px',
    		'background-color': 'var(--color-01-tint-02)',
    		'padding': '10px',
    		'text-align': 'right',
		}}
	>
		<div
			style={{
				'font-size': '1.4rem',
    			'color': 'white',
    			'text-align': 'left',
    			'margin-bottom': '5px',
			}}
		>
			No Smart Tag found.  Try creating a User Tag instead.
		</div>
		<IconButton
			icon="help_outline"
			//onClick={e => ()}
		/>
	</div>
)

const RetailerNameDropDownList = ({props}) => {
	return(
		<React.Fragment>
			<TransitionGroupWrapper 
				props={{
					'contentList': props.retailerNames,
					'contentWrapper': (searchResult) => (
						<div 
							className={FormStyles.ddRetailerSlot_div}
							onMouseDown={(event) => props.dropdownOptionSelected(event, searchResult.data)} 
						>
							{/*<div className={FormStyles.ddRetailerLogo_div}>
								{
									logoUrlExists(searchResult.data.logo_url) ? 
										(<img src={searchResult.data.logo_url} alt="Retailer's logo"/>) :
										(<SvgIcon style={{width:'100%', height:'100%'}} name="RetailerIcon"/>)
								}
							</div>*/}
							<div className={FormStyles.ddRetailerName_div}>
								{searchResult.data.name}
							</div>
						</div>),
				}}
			/>
			{
				isTagFound(props.retailerNames, props.inputValue)
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
			{
				isTagFound(props.retailerItems, props.inputValue)
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
			</div>
		))
	);
}

const UserDefinedItemList = ({props}) => {
	return(
		props.uDItemResults.map(uDItem => (
			<ItemSearch
				id={uDItem.id}
				retailerName={uDItem.itemSnippet.product.udr}
				sizeLabel={uDItem.itemSnippet.product.uds}
				apparelTypeIcon={props.apparelTypes[uDItem.itemSnippet.apparel_type_id].iconName}
				handle={uDItem.itemSnippet.product.handle}
				onClick={
					e => props.dropdownOptionSelected(e, {
						id: uDItem.id,
						handle : uDItem.itemSnippet.product.handle,
					})
				}
			/>
		))
	);
}

const UdsLabelDropDownList = ({props}) => {
	return(
		<React.Fragment>
		{
			//props.udsLabelResults === 'retailerName' ? 
				props.udsLabelResults.map(searchResult => (
					<div 
						className={FormStyles.ddUdrSlot_div}
						onMouseDown = {(event) => props.dropdownOptionSelected(event, searchResult.data)} >
						<div className={FormStyles.ddRetailerName_div}>
							{searchResult.data.name}
						</div>
					</div>
				)) /*:
				null*/
		}	
		</React.Fragment>
	);
}

export const DropDownOption = ({children, otherProps, onMouseOver, onMouseOut}) => {
	const {
		dropdownOptionSelected,
	} = otherProps;

	const {
		name,
		style,
		className,
	} = otherProps;

	return(
			<div 
				className={className || FormStyles.ddUdrNameContainer_div}
				onMouseOver={e => onMouseOver(e)}
				onMouseOut={e => onMouseOut(e)}
				style={style}
				onMouseDown = {e => dropdownOptionSelected(e)}
			>
				<BadgeAnchor>
					<div className={FormStyles.ddUdrName_div}>
						{name}
					</div>
					{children}
				</BadgeAnchor>
			</div>
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
						<DropDownOption
							//dropdownOptionSelected={e => props.dropdownOptionSelected(event, searchResult.data)}
							//name={searchResult.data.name}
							otherProps={{
								...props,
								name: searchResult.data.name,
								dropdownOptionSelected: e => props.dropdownOptionSelected(e, searchResult.data)
							}}
						/>
					)
				}}
			/>
		}	
		</React.Fragment>
	);
}

const SizeLabelDropDownList = ({props}) => {
	const [overMetric, setOverMetric] =useState("")

	return(
		<React.Fragment>
			{
				//props.type === 'retailerName' ? 
				props.retailerSize.map(sizeGroup => {
					const metricKeys = Object.keys(sizeGroup.metric);
	
					const avgMetric = metricKeys.reduce((accum, metricName) => ({
						...accum,
						[metricName.toLowerCase()]: (parseInt(sizeGroup.metric[metricName].min) + parseInt(sizeGroup.metric[metricName].max)) / 2
					}), {});
	
					return(
						<div 
							className={FormStyles.ddSizeSlot_div}
							onMouseDown={e => props.dropdownOptionSelected(e, sizeGroup)}
							onMouseOver={e => {
								props.compareSize(avgMetric);
								setOverMetric(sizeGroup.sizeLabel);
							}}
							//onMouseOut={e =>{
							//	setOverMetric("");
							//}}
						>
							<div 
								className={FormStyles.ddRetailerName_div}
							>
								{sizeGroup.sizeLabel}
							</div>
							{/*<div 
								className={FormStyles.ddSizeMetrics_div}
								style={overMetric == sizeGroup.sizeLabel ? {height:`calc(${metricKeys.length}*24px)`} : {height: '0px'}}
							>
								{
									Object.keys(avgMetric).map(measurement => {
										const minToleranceKey = `min${measurement.charAt(0).toUpperCase() + measurement.slice(1)}`;
										const maxToleranceKey = `max${measurement.charAt(0).toUpperCase() + measurement.slice(1)}`;
	
										return(
											overMetric == sizeGroup.sizeLabel ?
												<div className={FormStyles.ddSizeMetricItem_div}>
													<div className={FormStyles.ddSizeMetricStatus_div}>
														{ 
															avgMetric[measurement] >= props.ownerTolerances[minToleranceKey] && avgMetric[measurement] <= props.ownerTolerances[maxToleranceKey] ?
																<div className={FormStyles.ddSizeMetricStatusIcon_div}>
																	<span 
																		class="material-icons" 
																		style={{
																			color: 'var(--color-01-tint-02)',
																			'font-size': '2.4rem',
																			'font-weight': 'bold',
																		}}
																	>
																		done
																	</span>
																</div> :
																<div className={FormStyles.ddSizeMetricStatusIcon_div}>
																	<span 
																		class="material-icons" 
																		style={{
																			color: 'var(--color-05-tint-01)',
																			'font-size': '2.4rem',
																		}}
																	>
																		not_interested
																	</span>
																</div>
														}
													</div>
													<div className={FormStyles.ddSizeMetric_div}>
														{ measurement }
													</div>
												</div>:
												null
										);
									})
								}
							</div>*/}
						</div>
					);
				}) /*:
				null*/
			}
			{			
				isTagFound(props.retailerSize, props.inputValue)
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

		this.state = {
			isNewHover: false,
		}

		this.doesSearchResultExist = this.doesSearchResultExist.bind(this);
	}	

	doesSearchResultExist(result){
		return(!!result && !!result.length);
	}



	render(){
		let display = null;
		let newResult = false;

		let newResultDisplay = 
			<DropDownOption
				onMouseOver={e => this.setState({isNewHover: true})}
				onMouseOut={e => this.setState({isNewHover: false})}
				otherProps={{
					...this.props,    				
					style: {
						'position': 'absolute',
    					'right': '20px',
    					'border': 'solid 2px var(--color-01-tint-02)',
    				},
					className: FormStyles.ddUdrNameContainerNew_div,
					name: this.props.inputValue,
					dropdownOptionSelected: e => this.props.dropdownOptionSelected(e, {[this.props.fieldType === 'uDItem' ? 'handle' : 'name']: this.props.inputValue}),
				}}
			>
				<Badge
					style={{
						'background-color': 'var(--color-05-tint-01)',
						'border': 'solid .2rem #f1f1f1',
						'height': 'calc(1.5rem + .4rem)',
					}}
					label="NEW"
					inset="-0.8rem"
					align="start"
					exited={!this.state.isNewHover}
				/>
			</DropDownOption>

		switch(this.props.fieldType){
			case 'item':
				display = <RetailerItemDropDownList props={this.props} />
				break;

			case 'retailer':
				//retailer field from "Retailer Tags" tab
				if(this.props.context === 0){
					newResult = this.doesSearchResultExist(this.props.retailerNames);
					display = <RetailerNameDropDownList props={this.props} />;
				}				
				//retailer field from "User Tags" tab
				else if(this.props.context === 1){
					newResult = this.doesSearchResultExist(this.props.udrNameResults);
					display = <UdrNameDropDownList props={this.props} />;			
				}
				break;

			case 'size':
				//size field from "Retailer Tags" tab
				if(this.props.context === 0){
					newResult = this.doesSearchResultExist(this.props.retailerSize);
					display = <SizeLabelDropDownList props={this.props} />;
				}				
				//size field from "User Tags" tab
				else if(this.props.context === 1){
					newResult = this.doesSearchResultExist(this.props.udsLabelResults);
					display = <UdsLabelDropDownList props={this.props} />;			
				}
				break;

			case 'apparelType':
				newResult = this.doesSearchResultExist(this.props.filteredApparelTypes);
				display = <ApparelTypeDropDownList props={this.props} />;
				break;

			case 'uDItem':
				newResult = this.doesSearchResultExist(this.props.uDItemResults);
				display = <UserDefinedItemList props={this.props} />;
				
				//newResultDisplay = this.props.uDItemResults && !!this.props.uDItemResults.length ?
				//	<ItemSearch
				//		id={null}
				//		retailerName={uDItem.itemSnippet.product.udr}
				//		sizeLabel={uDItem.itemSnippet.product.uds}
				//		apparelTypeIcon={props.apparelTypes[uDItem.itemSnippet.apparel_type_id].iconName}
				//		handle={uDItem.itemSnippet.product.handle}		
				//	/> :
				//	newResultDisplay
				break;

			default:
				break;
		}

		return(
			<React.Fragment>
				<div 
					style={{
						'margin-left':'10px',
						'margin-right':'10px',
						'margin-top':'10px',
						...(
							this.props.fieldType == 'size' || this.props.isExistingTag ? 
								({'width':'100%'}) : 
								({'width':'70%'})
						),
						'text-align': 'left',
					}}
				>
					{ display }
				</div>	
				<div
					style={{
						display: (
							!!this.props.inputValue && 
							(this.props.isImplicitDown || this.props.isExplicitDown) && 
							!newResult &&
							!this.props.isExistingTag ? 
								"block" : 
								"none"
					)}}
				>
					<div
						style={{
							'margin-left': '10px',
    						'margin-right': '10px',
    						'margin-top': '10px',
    						'height': 'auto',
						}}
					>
						{newResultDisplay}
					</div>
				</div>
			</React.Fragment>
		);
	}
}
