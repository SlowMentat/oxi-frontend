import React from 'react';
import ItemStyles from '../../item.scss';
import PropTypes from 'prop-types';
import ItemLiteStyles from '../../itemLite.scss';
import Styles from '../../root.scss';
//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js';
//import EditIcon from '../SvgAssets/Icons/EditIcon.js';
import VisibleItemAsSeenOnList from '../../Components/Containers/VisibleItemAsSeenOnList.js';
import { SvgIcon } from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import { Button } from '../../Components/Presentations/Controls.js';
import { camelize } from '../../Util/Misc.js';
import Rating from '../../Components/Presentations/Rating.js';
import { Tooltip } from '@rmwc/tooltip';
import '@rmwc/tooltip/tooltip.css';

//import { 
//	Card, 
//	CardPrimaryAction, 
//	CardActions, 
//	CardMedia, 
//	CardActionButton, 
//	CardActionButtons,
//	CardActionIcon,
//	CardActionIcons,
//
//	CollapsibleList, 
//} from '@rmwc/list';
import {
	Typography
} from '@rmwc/typography';

import '@rmwc/list/styles';
import {
	CollapsibleList,
	List,
	SimpleListItem,
} from '@rmwc/list';

import '@rmwc/grid-list/styles';
import {
	GridList,
	GridTile,
	GridTilePrimary,
	GridTilePrimaryContent,
	GridTileSecondary,
	GridTileIcon,
	GridTileTitle, 
} from '@rmwc/grid-list';

import '@rmwc/card/styles';
import {
	Card, 
	CardPrimaryAction, 
	CardActions, 
	CardMedia, 
	CardActionButton, 
	CardActionButtons,
	CardActionIcon,
	CardActionIcons,
} from '@rmwc/card';

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
	'margin-top':'15px',
	width:'100%',
}
const itemCellContentContainer = {
	position: 'relative',
}

//Compatible only for variant data returned by Shopity API
export const parseVariants = (variants) => {
	var availableSizes = [];
	var availableColors = [];

	variants !== undefined ?
		variants.edges.map(variant => {
			var variantInfo = variant.node.displayName.trim().split('-')[1].split('/').map(val => val.trim());

			switch(true){
				//size and color is available (size comes in both uppercase and lowercase. ['xs', 'XS'])
				case variantInfo.length === 3:
					availableSizes = variantInfo[1] ? [...(availableSizes.filter(size => (size != variantInfo[1]))), variantInfo[1]] : availableSizes;
					availableColors = variantInfo[2] ? [...(availableColors.filter(color => (color != variantInfo[2]))), variantInfo[2]] : availableColors;
					break;
				//size is available (size comes in just lowercase ['xs'])
				case variantInfo.length === 1:
					availableSizes = variantInfo[0] ? [...(availableSizes.filter(size => (size != variantInfo[0]))), variantInfo[0]] : availableSizes;
			}

		}):
		null;

	return {availableSizes, availableColors};
}

parseVariants.propTypes = {
	variants: PropTypes.Object,
}

parseVariants.defaultProps = {
	variants: undefined,
}

export class ItemLite extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isExpanded: this.props.isExpanded,
		}
	}

	render(){

		const { 
			handleMouseOver, 
			handleMouseLeave,
			collapseItem, 
			expandItem,
			onBookmarkClicked,
			onSizeHover,
		} = this.props;

		var { 
			id,
			isProfileView,
			handleOnClick,
			retailerName,
			handle,
			sizeLabel,
			metric,
			isActive,
			isSaved,
			infoComponent,
			toggleInfoExpand,
			isExpanded,			
			apparelTypeIcon,
		} = this.props;

		return(  		
			<React.Fragment>


  				<div 
  					className={ItemLiteStyles.itemLite_div}
  					onMouseOver={(event) => onSizeHover(event)} >

  					<Card style={{height:'100%'}}>
						<CardPrimaryAction style={{height:'66.7px'}}>
							<CardMedia
								sixteenByNine
								style={{
									width:'50%',
									height: '100%',
									'margin-left':'50%',
									'border-radius':'0px',
								}}
							>
								{/*<div
									style={{
										position:'absolute',
										top: '0px',
										right: '35%',
										width: '35%',
										height: 'calc(100% - 2*7px)',
										'margin-top': '7px',
									}}
								>									
									<SvgIcon name={apparelTypeIcon} stroke="var(--color1)"/>
								</div>*/}

  								<div 
  									id="selectedSizeIcon" 
  									className={ItemLiteStyles.selectedSize_div} 
  								>
  									<span> { sizeLabel } </span>
  								</div>
								<div
									style={{
										position: 'absolute',
										top: '0px',
										right:'0px',
										width: '35%',
										height: 'calc(100% - 2*7px)',
										'margin-top': '7px',
									}}
								>
									<SvgIcon 
										name={apparelTypeIcon} 
										stroke="var(--color1)"
									/>
								</div>
							</CardMedia>
							<div
								style={{
									position:'absolute',
									width:'calc(50% - 1rem)',
									padding: '0 1rem 1rem 1rem',
									'text-align':'left',
								}}
							>
								<Typography
									use="headline6"
									tag="h2"
								>
  									{ retailerName }
								</Typography>
								<Typography
									use="subtitle2"
									tag="h3"
									theme="textSecondaryOnBackground"
									style={{marginTop: '-1rem'}}
								>
									{}
								</Typography>
								<Typography
									use="body1"
									tag="div"
									theme="textSecondaryOnBackground"
								>
									{handle}
								</Typography>
							</div>
						</CardPrimaryAction>

						<CardActions>
							<Rating value={3} />
							<CardActionButtons>
								<CardActionButton>
									{`${758} Reviews`}
								</CardActionButton>
							</CardActionButtons>
							<CardActionIcons>
								<CardActionIcon 
									icon={isSaved ? "bookmark" : "bookmark_border" } 
									//onIcon={isSaved ? "bookmark_border" : "bookmark"} 
									onClick={(event) => onBookmarkClicked(event)} 
								/>
								<CardActionIcon icon="share" />
								<Tooltip 
									showArrow
									content="coming soon"
								>
									<CardActionIcon 
										icon={
											<div
												style={{
													width:'24px',
													height:'24px',
													'border-radius':'50%',
												}}
											>
												<SvgIcon 
													className={Styles.btn_svg} 
													name="ShopIcon" 
													strokeWidth="2"
												/>
											</div>
										} 
									/>
								</Tooltip>
							</CardActionIcons>
						</CardActions>
						{
							isActive ? 
								(<CollapsibleList
									handle={
										<SimpleListItem
											text="See more"
											graphic=""
											metaIcon="expand_more"
										/>
									}
									//defaultOpen={ isSelected }
									onOpen={ () => expandItem(id.toLowerCase()) }
									onClose={ () => collapseItem() }
								>
									<List style={{maxHeight: '100%', overflow:'auto'}} >
										{ infoComponent ? infoComponent(isExpanded) : null }
									</List>
								</CollapsibleList>) :
								null
						}

					</Card>
				</div>

			{/*}
  				<div 
  					className={ItemLiteStyles.itemLite_div}
  					onMouseOver={(event) => onSizeHover(event)} >

  					<div className={ItemLiteStyles.itemContentContainer_div}>
  						
  						<div className={ItemLiteStyles.itemRetailerContainer_div}>
  							<div className={ItemLiteStyles.itemRetailer_div}>
  								{ retailerName }
  							</div>
  						</div>
  						
  						<div className={ItemLiteStyles.itemHandle_div}>
  							{ handle}
  						</div>
  						
  						<div className={ItemLiteStyles.itemControlsContainer_div}>
  							<div style={{positionr:'relative',width:'100%'}}>
  								<div 
  									id="bookmark" 
  									className={ItemLiteStyles.bookmarkIcon_div}
  									onClick={(event) => onBookmarkClicked(event)} >
  									<SvgIcon 
  										name="BookmarkIcon" 
  										stroke="var(--button-icon-stroke)"
  										fill = {isSaved ? "var(--button-icon-stroke)" : null} />
  								</div>
  								{
  									isActive ? 
  									(<div 
  										id="dropdown" 
  										className={ItemLiteStyles.dropdownIcon_div}
  										style={this.props.isExpanded ? ({transform:'scaleY(-1)'}) : ({}) }
  										onClick={(event) => {
											event.stopPropagation();
											isExpanded ?
												collapseItem() :
												expandItem(id.toLowerCase());
										}}
  										//onClick={(event) => this.setState(prevState => ({
  										//	isExpanded: !prevState.isExpanded,
  										//}))} 
  										>
  									 	<SvgIcon name="DropdownIcon2" stokeWidth="2" stroke="var(--color1)" fill="var(--color1)" />
  									 </div>) :
  									null
  								}
  							</div>
  						</div>
  						
  						<div>
  						</div>
		
  					</div>
  					<div 
  						className={ItemLiteStyles.apparelIconContainer_div}
  						style={isActive ? ({'background-color':'var(--color4)'}) : ({})} >
  						
  						<div id="apparelTypeIcon" className={ItemLiteStyles.apparelTypeIcon_div}>
  								<SvgIcon name={apparelTypeIcon} stroke="var(--color1)"/>
  						</div>
  						
  						<div 
  							id="selectedSizeIcon" 
  							className={ItemLiteStyles.selectedSize_div} >
  							<span> { sizeLabel } </span>
  						</div>
		
  					</div>
  				</div>
  				{
  					infoComponent ? infoComponent(isExpanded) : null
  				}
  			*/}
  			</React.Fragment>
		);
	}
}


export class ItemInfo extends React.Component {
	constructor(props){
		super(props);
		this.state={
			isColorOptionsOpen:false,
			selectedColor:null,
			selectedSize:null,			
		};

		this._handleSizeSelected = this._handleSizeSelected.bind(this);
	}

	_handleSizeSelected(sizeGroups, size, compareMetrics){
		this.setState(prevState => ({
			...prevState,
			selectedSize: size,
		}));

		let sizeGroup = {};

		for(let sg of Object.values(sizeGroups)){
			if(sg.sizeLabel === size){
				sizeGroup = sg;
				break;
			}
		}

		let camelizedMetric = Object.keys(sizeGroup.metric).reduce((accum, meas) => {
			return({
				...accum, 
				[camelize(meas)]: sizeGroup.metric[meas],
			});
		}, {});

		compareMetrics(camelizedMetric);
	}

	render(){
		const {
			compareMetrics,
			toggleMetricPanel,
		} = this.props;

		var { 
			availableSizes, 
			availableColors,
			imgSrc,
			description,
			isExpanded,
			sizeGroups,
		} = this.props;

		return(
			<CSSTransition
				//tiemout={1000}
				timeout={{enter:400, exit:400}}
				classNames="expandedItemInfoContainer_div"
				in={isExpanded}
				unmountOnExit={false} 
			>
				<div 
					className={ItemStyles.expandedItemInfoContainer__div} 
					style={{
						...this.props.styles, 
						...(isExpanded ? 
							({opacity: 1}) : 
							({opacity: 0, transition: 'transform var(--item-info-transition-period) linear 70ms, opacity 0ms linear var(--item-transition-total)'}))
					}}
				>
					<CSSTransition
						timeout={{enter:400, exit:400}}
						classNames="expandedItemInfo_div"
						in={isExpanded} 
						unmountOnExit={false} 
					>
						<div 
							className={ItemStyles.expandedItemInfo__div}
						>
							<div className={ItemStyles.variantOptionsContainer_div}>
								<div className={ItemStyles.variantSizeOptionsContainer_div}>
									<div className={ItemStyles.variantTitle_div}>
										Size
									</div>
									<div className={ItemStyles.variantSizeOptions_div}>
										{
											availableSizes.length > 0 ? 
												availableSizes.map(size => (
													<div 
														className={ItemStyles.sizeVariant_div}
														style={size === this.state.selectedSize ? ({'background-color':'var(--color-mobile-icon-bg)',color:'white'}) : ({})}
														onTouchStart={(event) => {
															event.stopPropagation();
															toggleMetricPanel(event, true); 
															this._handleSizeSelected(sizeGroups, size, compareMetrics);
														}}
														onClick={(event) => {
															event.stopPropagation();
															this._handleSizeSelected(sizeGroups, size, compareMetrics);
														}}> 
														{size} 
													</div>)
												) :
												"No sizes available"
										}
									</div>
								</div>
								<div className={ItemStyles.variantColorOptionsContainer_div}>
									<div className={ItemStyles.variantTitle_div}>
										Color
									</div>
									<div 
										className={ItemStyles.colorVariantDropDown_div}
										onClick={(event) => {
											event.stopPropagation();
											this.setState(prevState => ({
												...prevState,
												isColorOptionsOpen: !this.state.isColorOptionsOpen
											}))
										}} >
										{this.state.selectedColor || 'select color' || "no colors"}
									</div>
									<div 
										className={ItemStyles.variantColorOptions_div}
										style={ 
											this.state.isColorOptionsOpen ? 
											{
												height:'95px'
											} : 
											{
												height:'0px',
												padding: '0px',
												border: 'none',
											}
										} 
									>
										{
											availableColors.length > 0 ? 
												availableColors.map(color => (
													<div 
														className={ItemStyles.colorVariant_div}
														onClick={(event) => {
															event.stopPropagation();
															this.setState(prevState => ({
																...prevState,
																selectedColor: color,
																isColorOptionsOpen: false,
															}))
														}}> 
														{color} 
													</div>)
												) :
												null
										}
									</div>
								</div>									
							</div>
							<div className={ItemStyles.retailerImageContainer_div}>
								{
									//this.props.isExpanded ?
									(<img 
										src={imgSrc}
										style={{
											'width':'100%',
											'vertical-align':'middle',
											'border-radius':'4px',
										}} />) //:
									//null
								}
							</div>
							<div className={ItemStyles.descriptionContainer_div}>
								<div className={ItemStyles.description_div}>
									{description}
								</div>
							</div>
							{/*
							<div className={ItemStyles.shopBtn_div}>
								<Button
									buttonType={OxiAppConstants.ControlConstants.ButtonTypes.e} //dynamic icon button
									onClickHandler={null}
									title='add'
									iconName='ShopIcon'
									iconStyles={{width:'100%',height:'100%',padding:'0px'}}
									buttonHeight={26}
									customButtonStyles={{'border-width':'0px'}}
									puDirection='WEST' 
								/>
							</div>
							*/}
						</div>
					</CSSTransition>
				</div>
			</CSSTransition>
		);
	}
}

/*
*=======================================
*========== Browse Apparel  ============
*=======================================
*/
export class ItemBrowse extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			coverpicuri: null,
			base64Image:null,
		};

		this._handleImageReceived = this._handleImageReceived.bind(this);

	}

	componentDidUpdate(prevProps, prevState){
		var { coverpicuri } = this.props.item;
		if(coverpicuri !== null && coverpicuri !== undefined){
			if(coverpicuri !== prevState.coverpicuri) this.props.getCoverPic(coverpicuri, this._handleImageReceived, 'small');
		}
	}

	_handleImageReceived(event, data){
		this.setState({
			coverpicuri: this.props.item.coverpicuri,
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	render(){

		const { 
			handleMouseOver, 
			handleMouseLeave,
			collapseItem, 
			expandItem,
			onBookmarkClicked,
			onSizeHover,
			removeContentEntities,
			getContentsByItemId,
			onDeselect,
			onSelect,
			clearSelectMultipleEntity
		} = this.props;

		var { 
			id,
			item,
			isProfileView,
			handleOnClick,
			isSaved,
			toggleInfoExpand,
			isExpanded,			
			apparelTypeIcon,
			selectedAllIds,
		} = this.props;

		var {
			//retailerName,
			handle,
			sizeLabel,
			metric,
			coverpicuri,
			product
		} = item !== undefined ? item : ({});

		var {
			udr, 			//platform = wearsit
			onlineStoreUrl, //platform = wearsit
			uds, 			//platform = wearsit
			handle,			//platform = wearsit
			description,	//platform = wearsit || anything
			featuredImage,	//platform != wearsit 
			//size,			//platform != wearsit
			vendor, 		//platform != wearsit
			variants,		//platform != wearsit			
		} = product !== undefined ? product : ({});

		var { availableSizes, availableColors } = parseVariants(variants);

		var isSelected = item !== undefined ? selectedAllIds.includes(item.id) : [];

		return(		
			<React.Fragment>
				<Card 
					style={{
						width:'100%',
						'margin-bottom':'50px',
					}}
				>
					<CardPrimaryAction>
						<CardMedia
							sixteenByNine
							style={{
								width:'50%',
								'margin-left':'50%',
								'border-radius':'0px',
								backgroundImage: `url(${
  									featuredImage !== undefined ? 
  										featuredImage.originalSrc :   										
										this.state.base64Image === null ? 
											(OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : 
											(this.state.base64Image)									
								})`
							}}
						/>
						<div
							style={{
								position:'absolute',
								width:'calc(50% - 1rem)',
								padding: '0 1rem 1rem 1rem',
							}}
						>
							<Typography
								use="headline6"
								tag="h2"
							>
  								{ vendor || udr }
							</Typography>
							<Typography
								use="subtitle2"
								tag="h3"
								theme="textSecondaryOnBackground"
								style={{marginTop: '-1rem'}}
							>
								{}
							</Typography>
							<Typography
								use="body1"
								tag="div"
								theme="textSecondaryOnBackground"
							>
								{handle}
							</Typography>
						</div>
					</CardPrimaryAction>
					<CardActions>
						<Rating value={3} />
						<CardActionButtons>
							<CardActionButton>
								{`${758} Reviews`}
							</CardActionButton>
						</CardActionButtons>
						<CardActionIcons>
							<CardActionIcon onIcon="bookmark" icon="bookmark_border" />
							<CardActionIcon icon="share" />
							<CardActionIcon icon="more_vert" />
						</CardActionIcons>
					</CardActions>
					<CollapsibleList
						handle={
							<SimpleListItem
								text="Who's Wearing"
								graphic="face"
								metaIcon="chevron_right"
							/>
						}
						//defaultOpen={ isSelected }
						onOpen={() => {
							removeContentEntities();
							getContentsByItemId();
							clearSelectMultipleEntity(); 
							onSelect(item.id);
						}}
						onClose={() => {
							onDeselect(item.id)
						}}
					>
						<List
							style={{maxHeight: '100%', overflow:'auto'}}
						>
							{
								isSelected ?
									( <VisibleItemAsSeenOnList selectedItemId={ item.id } /> ) :
									null
							}
						</List>
					</CollapsibleList>
				</Card>


  			</React.Fragment>
		);
	}
}

export class ItemBrowseInfo extends React.Component {
	constructor(props){
		super(props);
		this.state={
			isColorOptionsOpen:false,
			selectedColor:null,
			selectedSize:null,			
		};
	}

	render(){

		var { 
			availableSizes, 
			availableColors,
			//imgSrc,
			description,
			isExpanded,
			//item
		} = this.props;


		return(
			<React.Fragment>
				<CSSTransition
					    tiemout={400}
					    classNames="expandedItemInfoContainer_div"
					    in={isExpanded}
					   	unmountOnExit >
	
					<div className={ItemStyles.expandedItemInfoContainer_div} style={this.props.styles}>
						<CSSTransition
								//timeout={}
								classNames="expandedItemInfo_div"
								in={isExpanded} 
								unmountOnExit >
	
							<div className={ItemStyles.expandedItemInfo_div}>
								<div className={ItemStyles.variantOptionsContainer_div}>
									<div className={ItemStyles.variantSizeOptionsContainer_div}>
										<div className={ItemStyles.variantTitle_div}>
											Size
										</div>
										<div className={ItemStyles.variantSizeOptions_div}>
											{
												availableSizes.length > 0 ? 
													availableSizes.map(size => (
														<div 
															className={ItemStyles.sizeVariant_div}
															style={size === this.state.selectedSize ? ({'background-color':'var(--color1',color:'white'}) : ({})}
															onClick={(event) => {
																event.stopPropagation();
																this.setState(prevState => ({
																	...prevState,
																	selectedSize: size,
																}))
															}}> 
															{size} 
														</div>)
													) :
													"No sizes available"
											}
										</div>
									</div>
									<div className={ItemStyles.variantColorOptionsContainer_div}>
										<div className={ItemStyles.variantTitle_div}>
											Color
										</div>
										<div 
											className={ItemStyles.colorVariantDropDown_div}
											onClick={(event) => {
												event.stopPropagation();
												this.setState(prevState => ({
													...prevState,
													isColorOptionsOpen: !this.state.isColorOptionsOpen
												}))
											}} >
											{this.state.selectedColor || 'select color' || "no colors"}
										</div>
										<div 
											className={ItemStyles.variantColorOptions_div}
											style={ 
												this.state.isColorOptionsOpen ? 
													{
														height:'95px'
													} : 
													{
														height:'0px',
														padding: '0px',
														border: 'none',
													}
											} 
										>
											{
												availableColors.length > 0 ? 
													availableColors.map(color => (
														<div 
															className={ItemStyles.colorVariant_div}
															onClick={(event) => {
																event.stopPropagation();
																this.setState(prevState => ({
																	...prevState,
																	selectedColor: color,
																	isColorOptionsOpen: false,
																}))
															}}> 
															{color} 
														</div>)
													) :
													null
											}
										</div>
									</div>									
								</div>
	
								<div className={ItemStyles.retailerImageContainer_div}>
								</div>
	
								<div className={ItemStyles.descriptionContainer_div}>
									<div className={ItemStyles.description_div}>
										{description}
									</div>
								</div>
	
								<div className={ItemStyles.shopBtn_div}>
									<Button
										buttonType={OxiAppConstants.ControlConstants.ButtonTypes.e} //dynamic icon button
										onClickHandler={null}
										title='add'
										iconName='ShopIcon'
										buttonHeight={26}
										customButtonStyles={{'border-width':'0px'}}
										puDirection='WEST' />
								</div>
	
							</div>
						</CSSTransition>
					</div>
				</CSSTransition>
				{
				}
			</React.Fragment>
		);
	}
}
/*
*=======================================
*=======================================
*=======================================
*/

export class Item extends React.Component{
	constructor(props){
		super(props)		
		this.state = {
			coverpicuri: null,
			base64Image:null,
			isColorOptionsOpen:false,
			selectedColor:null,
			selectedSize:null,
			isSaved: props.isSaved,
		};

		this._handleImageReceived = this._handleImageReceived.bind(this);
		this.setupSaveIconRef = this.setupSaveIconRef.bind(this);
	}
	//const linkFavicon = "https://www.google.com/s2/favicons?domain=" + link;
	//console.log(linkFavicon);


	componentDidMount(){
		//if coverpicuri filename exists, call get request for content coverpic data
		//console.log("coverpicuri = ", this.props.item.coverpicuri)
		if(this.props.item.coverpicuri !== null && this.props.item.coverpicuri !== undefined){
			this.props.getCoverPic(this.props.item.coverpicuri, this._handleImageReceived);
		}
	}

	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	setupSaveIconRef(saveIcon){
		this.saveIconRef = saveIcon;
		//this.simulateImageClick = this.simulateImageClickFactory(img).bind(this);
		////this.props.imageResized(image.width, image.height);
		//this.forceUpdate();
	}

	render(){
		//let brandColorStyle = null;
		//let udr = null;
		//let onlineStoreUrl = null;
		//let handle = '';
		//let uds = null;

		if(this.props.item === undefined) return null;

		const {
			expandItem,
			collapseItem,
			saveItem,
			unsaveItem,
			compareMetrics,
			selectedId,
			sizeGroups,
			toggleMetricPanel,
		} = this.props;

		const {
			//isSaved,
			item,
			isExpanded,
			imageHeight,
			apparelTypeByIds,
		} = this.props;

		const { isSaved } = this.state;

		const {
			product, 
			platform, 
			sizeGroupId,		//Note:  sizeGroupId is only defined in Retailer retailer
			apparelType,
		} = this.props.item;
		
		if(product === undefined || product === null) return null;

		const {
			udr, 			//platform = wearsit
			onlineStoreUrl, //platform = wearsit
			uds, 			//platform = wearsit
			handle,			//platform = wearsit
			description,	//platform = wearsit || anything
			featuredImage,	//platform != wearsit 
			//size,			//platform != wearsit
			vendor, 		//platform != wearsit
			variants,		//platform != wearsit
		} = product;

		var { size } = product;		

		//size = size ? size : this.props.sizeGroups[sizeGroupId];
		size = size === null ? 8 : size;

		//Note:  sizes will only be defined in Items created from retailers
		const isActive = (platform !== OxiAppConstants.PLATFORM || platform === null) /*&& size !== undefined*/;  //NOTE: this is accomodating for a bug in the server that allows platform to be null



		//if sizes is from a Retailer Item
		//if(typeof sizes !== 'string'){
		//	for(let s of sizes){
		//		//assign to size the sizeGroupDto corresponding to sizeGroupId
		//		if(s.id === sizeGroupId){
		//			size = s;
		//			break;
		//		}
		//	}
		//}

		//if(this.props.item !== undefined){
		//	if(this.props.item.product !== null && this.props.item.product !== undefined){
		//		udr = udr,//this.props.item.product.udr  //User defined retailer
		//		onlineStoreUrl = onlineStoreUrl,//this.props.item.product.onlineStoreUrl;
		//		uds = uds,//this.props.item.product.uds;  //User defined size
		//		handle = handle,//this.props.item.product.handle;
		//	}
		//}else{
		//	return null;
		//}
		//console.log('handle = ', handle);
		let fill = "#FFF";
		let stroke = "#FFF";
		let isSelected = this.props.selectedAllIds.includes(item.id);
		let isCurrentSelection = item.id === selectedId;
		var itemContainerStyles = null;
		let isProfileView = (this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase());
	
		switch(true){
			// Not Browsing apparel
			case this.props.browseSelection !== OxiAppConstants.browseSelection.b:
					itemContainerStyles = isCurrentSelection ?
						ItemStyles['itemContainerPreview_div--selected'] : 
						ItemStyles.itemContainer_div
				break;

			// webAppView is Browse and Browsing Apparel.
			case 
				this.props.browseSelection === OxiAppConstants.browseSelection.b &&
				this.props.webAppView === OxiAppConstants.navRequestMap.a.toLowerCase():
				itemContainerStyles = !isSelected ? 
					ItemStyles.itemContainer_div :
					this.props.browseSelection === 'apparel' ?
						ItemStyles['itemContainerBrowse_div--selected'] :
						null;
				break;

			default:
				break;
		}

		/*var availableSizes = [];
		var availableColors = [];

		variants !== undefined ?
			variants.edges.map(variant => {
				var variantInfo = variant.node.displayName.trim().split('-')[1].split('/');

				availableSizes = variantInfo[1] ? [...availableSizes, variantInfo[1]] : availableSizes;

				availableColors = variantInfo[2] ? [...availableColors, variantInfo[2]] : availableColors;
			}):
			null*/
		var {availableSizes, availableColors} = parseVariants(variants);
		var sizeGroup = sizeGroups[sizeGroupId] !== undefined ? sizeGroups[sizeGroupId] : {}

		const {
			sizeLabel,
			metric,
		} = sizeGroup;

		var genSizeLabel = !isActive ? 
			uds : 
			sizeLabel ? 
				(sizeLabel) : 
				'?';

		var metricFormatted = !isActive ? 
			(size) : 
			metric ? 
				Object.keys(metric).reduce((accum, meas) => {
					return({
						...accum, 
						[camelize(meas)]: sizeGroups[sizeGroupId].metric[meas]
					});
				}, {}) : 
				null;

		console.log('metric = ', metricFormatted);

		return(
			<CSSTransition
			    tiemout={200}
			    classNames="itemContainer_div"
			    in={this.props.expandedViewState && !isExpanded}
			    //in={isExpanded}
			>
				<div 
					className={isExpanded ? ItemStyles['itemContainerPreview_div--opened'] : itemContainerStyles}
					onMouseOver={this.props._handleMouseOver.bind(this)}
					onMouseLeave={this.props._handleMouseLeave.bind(null)} 
					style={{'--index':`${this.props.index}`, height:'auto'}}
					//style={
					//	!isProfileView ? 
					//	{} : 
					//	isExpanded ? 
					//		({
					//			//width: '100%', 
					//			transform: `translateY(calc(-${this.props.index}*(var(--item-height) + 6px)))`,	//18px is the margin-bottom for item 
					//			position: 'absolute', 
					//			//top: '0px', 
					//			'z-index':'100'
					//		}) : ({})
					//}
					onClick={(event) => {
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

					<ItemLite 
						id={item.id}
						isProfileView={isProfileView}
						handleOnClick={null}
						retailerName={ vendor || udr}
						handle={handle || 'custom item'}
						//sizeLabel={!isActive ? uds : size !== undefined ? size.sizeLabel : '?'}
						sizeLabel={genSizeLabel}
						//metric={size ? size.metric : null}
						metric={metricFormatted}
						isActive={isActive}
						isSaved={isSaved}
						isExpanded={isExpanded}
						collapseItem={collapseItem}
						expandItem={expandItem}
						apparelTypeIcon={
							apparelTypeByIds === undefined || platform !== OxiAppConstants.PLATFORM ? 
								null :
								apparelTypeByIds[apparelType] ? 
									apparelTypeByIds[apparelType].iconName : 
									null
						}
						onBookmarkClicked={(event) => {
							event.stopPropagation();

							this.setState(prevState => ({
								isSaved: !prevState.isSaved,
							}));

							!isSaved ? 
								(saveItem !== undefined ? saveItem(item.id) : null) :
								(unsaveItem !== undefined ? unsaveItem(item.id) : null);
						}}
						onSizeHover={(event) => {
							platform !== OxiAppConstants.PLATFORM ? 
								//compareMetrics(size ? size.metric : null) :
								compareMetrics(metricFormatted) :
								null;
						}}
						infoComponent={ isActive ? 
							(isExpanded) => (
								<ItemInfo								
									availableSizes={availableSizes}
									availableColors={availableColors}
									imgSrc={featuredImage.originalSrc }
									description={ description}
									isExpanded={isExpanded}
									height={imageHeight}
									compareMetrics={compareMetrics}
									sizeGroups={sizeGroups[sizeGroupId] ? sizeGroups : {}} 
									toggleMetricPanel={toggleMetricPanel} />
							) : 
							() => (null)
						} />
	
					{/*
						//TODO:  figure out what to do with this
						this.props.webAppView !== OxiAppConstants.navRequestMap.a.toLowerCase() ?
							null :
							this.props.browseSelection !== 'apparel' ?
								null : 
								isSelected ?
									(
										<VisibleItemAsSeenOnList selectedItemId={this.props.item.id} />
									) :
									null
					*/}
				</div>	
			</CSSTransition>	
		);	
	}
}