import React from 'react';
import ItemStyles from '../../item.css';
import ItemLiteStyles from '../../itemLite.css';
//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js';
//import EditIcon from '../SvgAssets/Icons/EditIcon.js';
import VisibleItemAsSeenOnList from '../../Components/Containers/VisibleItemAsSeenOnList.js';
import { SvgIcon } from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {Button} from '../../Components/Presentations/Controls.js';

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

export class ItemLite extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isExpanded: this.props.isExpanded,
		}
	}

	render(){

		const { handleMouseOver, handleMouseLeave } = this.props;
		var { 
			isProfileView,
			handleOnClick,
			retailerName,
			handle,
			size,	
			isActive,
			infoComponent,
			toggleInfoExpand
		} = this.props;

		return(  		
			<React.Fragment>
  				<div className={ItemLiteStyles.itemLite_div}>
  					<div className={ItemLiteStyles.itemContentContainer_div}>
  						
  						<div className={ItemLiteStyles.itemRetailerContainer_div}>
  							<div className={ItemLiteStyles.itemRetailer_div}>
  								{ retailerName }
  							</div>
  						</div>
  						
  						<div className={ItemLiteStyles.itemHandle_div}>
  							{ handle }
  						</div>
  						
  						<div className={ItemLiteStyles.itemControlsContainer_div}>
  							<div style={{positionr:'relative',width:'100%'}}>
  								<div id="bookmark" className={ItemLiteStyles.bookmarkIcon_div}>
  									<SvgIcon name="BookmarkIcon" stroke="black"/>
  								</div>
  								{
  									isActive ? 
  									(<div 
  										id="dropdown" 
  										className={ItemLiteStyles.dropdownIcon_div}
  										style={this.state.isExpanded ? ({transform:'scaleY(-1)'}) : ({}) }
  										onClick={(event) => this.setState(prevState => ({
  											isExpanded: !prevState.isExpanded,
  										}))} >
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
  								<SvgIcon name="TypeShirtT" stroke="var(--color1)"/>
  						</div>
  						
  						<div id="selectedSizeIcon" className={ItemLiteStyles.selectedSize_div}>
  							<span> {size} </span>
  						</div>
		
  					</div>
  				</div>
  				{
  					infoComponent ? infoComponent(this.state.isExpanded) : null
  				}
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
	}

	render(){
		var { 
			availableSizes, 
			availableColors,
			imgSrc,
			description,
			isOpen,
		} = this.props;

		return(
			<CSSTransition
				    tiemout={400}
				    classNames="expandedItemInfoContainer_div"
				    in={isOpen}
				   	unmountOnExit >

				<div className={ItemStyles.expandedItemInfoContainer_div}>
					<CSSTransition
							//timeout={}
							classNames="expandedItemInfo_div"
							in={isOpen} 
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
										style={ this.state.isColorOptionsOpen ? {display:'block'} : {display:'none'}} >
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
		);
	}
}

export class Item extends React.Component{
	constructor(props){
		super(props)		
		this.state = {
			coverpicuri: null,
			base64Image:null,
			isColorOptionsOpen:false,
			selectedColor:null,
			selectedSize:null,
		};

		this._handleImageReceived = this._handleImageReceived.bind(this);
		this.setupSaveIconRef = this.setupSaveIconRef.bind(this);
	}
	//const linkFavicon = "https://www.google.com/s2/favicons?domain=" + link;
	//console.log(linkFavicon);


	componentDidMount(){
		//if coverpicuri filename exists, call get request for content coverpic data
		//console.log("coverpicuri = ", this.props.item.coverpicuri)
		if(this.props.item.coverpicuri !== null && this.props.item.coverpicuri !== undefined) this.props.getCoverPic(this.props.item.coverpicuri, this._handleImageReceived);
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

		let {
			product, 
			platform, 
			sizeGroupId		//Note:  sizeGroupId is only defined in Retailer retailer
		} = this.props.item;
		
		if(product === undefined || product === null) return null;

		let {
			udr, 			//platform = wearsit
			onlineStoreUrl, //platform = wearsit
			uds, 			//platform = wearsit
			handle,			//platform = wearsit
			description,	//platform = wearsit || anything
			featuredImage,	//platform != wearsit 
			//size,			//platform != wearsit
			retailer, 		//platform != wearsit
			variants,		//platform != wearsit
		} = product;

		//Note:  sizes will only be defined in Retailer Items
		//let sizes = this.props.item.sizeChartDto.sizeGroupDtos;
		let size = this.props.sizeGroups[sizeGroupId];

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
		let isSelected = this.props.selectedAllIds.includes(this.props.item.id);
		var itemContainerStyles = null;
		let isProfileView = (this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase());
	
		switch(true){
			//Profile webAppView
			case this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase():
				//itemContainerStyles = !isSelected ?
				//	ItemStyles.itemContainer_div :
				//	this.props.viewState === OxiAppConstants.viewState.PREVIEW ? 
				//		ItemStyles['itemContainerPreview_div--selected'] : 
				//		ItemStyles['itemContainerEdit_div--selected'];

				//itemContainerStyles = this.props.isExpanded ?
				//	ItemStyles.expandedItemContainer_div : 
					itemContainerStyles = ItemStyles.itemContainer_div
				break;
			//Browse webAppView
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

		var availableSizes = [];
		var availableColors = [];

		variants !== undefined ?
			variants.edges.map(variant => {
				var variantInfo = variant.node.displayName.trim().split('-')[1].split('/');

				availableSizes = variantInfo[1] ? 
					[
						...availableSizes, 
						(<div 
							className={ItemStyles.sizeVariant_div}
							onClick={(event) => {
								event.stopPropagation();
								this.setState(prevState => ({
									...prevState,
									selectedSize: variantInfo[1],
								}))
							}}> 
							{variantInfo[1]} 
						</div>)
					] :
					availableSizes;

				availableColors = variantInfo[2] ?
					[
						...availableColors, 
						(<div 
							className={ItemStyles.colorVariant_div} 
							onClick={(event) => {
								event.stopPropagation();
								this.setState(prevState => ({
									...prevState,
									selectedColor: variantInfo[2],
								}))
							}}> 
							{variantInfo[2]} 
						</div>)
					] :
					availableColors;
			}):
			null

		return(
			<CSSTransition
			    tiemout={200}
			    classNames="itemContainer_div"
			    in={this.props.expandedViewState && !this.props.isExpanded}
			>
				<div 
				className={itemContainerStyles}
				onMouseOver={this.props._handleMouseOver.bind(this)}
				onMouseLeave={this.props._handleMouseLeave.bind(null)} 
				style={
					!isProfileView ? 
					{} : 
					this.props.isExpanded ? 
						{
							//width: '100%', 
							transform: `translateY(calc(-${this.props.index}*(var(--item-height) + 12px)))`,	//18px is the margin-bottom for item 
							position: 'absolute', 
							//top: '0px', 
							'z-index':'100'
						} : ({})
						//this.props.expandedViewState ?
						//	{
						//		opacity: 0,
						//		transition:'transition opacity 100ms linear'
						//	} :
						//	{
						//		opacity: 1,
						//		transition:'transition opacity 100ms linear 500ms'
						//	} 
				}
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
				<a 
					className={ItemStyles.itemTypeBlock}
					style={platform !== OxiAppConstants.PLATFORM ? ({'background-color':'#54c2f1'}) : ({})}>
					<SvgIcon 
						//name={this.props.item.apparelType.iconName !== undefined ? this.props.item.apparelType.iconName : null}
						name={this.props.apparelTypeByIds !== undefined && platform === OxiAppConstants.PLATFORM ? this.props.apparelTypeByIds[this.props.item.apparelType].iconName : null}
						fill={fill}
						stroke={stroke}/>
				</a>
				<a 
					className={ItemStyles.itemSizeBlock} 
					style={platform !== OxiAppConstants.PLATFORM ? ({
							'border-top-right-radius': '4px',
							'border-bottom-right-radius': '4px',
							'background-color':'#54c2f1'
						}) : ({
							'border-top-right-radius': '4px',
							'border-bottom-right-radius': '4px',
						})
					}
					onMouseOver={(event) => {
						platform !== OxiAppConstants.PLATFORM ? 
							this.props.compareMetrics(size.metric) :
							null;
					}}
				>
						<div style={{...itemCellContainer, 'margin-top': 'calc(50% - 4px)'}}>
						<div className={ItemStyles.itemSize_div}>	
							{
								platform === OxiAppConstants.PLATFORM ? 
									uds : 
									size.sizeLabel
							}
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
					<div className={ItemStyles.itemInfoBlock_div} href={onlineStoreUrl} target="_blank">
						<div style={{}}>
							<div className={ItemStyles.itemRetailerHomeGradientContainer_div}>
								<div className={ItemStyles.itemRetailerHomeGradient_div}>
								</div>
							</div>
							<div className={ItemStyles.retailerName_div}>	
								{platform === OxiAppConstants.PLATFORM ? udr : "retailer"/*retailer*/}
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
					<div className={ItemStyles.itemHandleBlock} href={onlineStoreUrl} target="_blank">
						<div style={itemCellContainer}>
							<div>	
								{handle}
							</div>
						</div>
					</div>
					<div className={ItemStyles.itemControlsContainer_div}>
						<div>
							<div className={ItemStyles.itemButtonContainer_div}>
								{
									this.props.viewState === OxiAppConstants.viewState.PREVIEW ? 
									(
										<div 
											className={ItemStyles.itemButton_div}
											onClick={(event) => {
												event.stopPropagation();
												!this.props.isSaved ? 
													(this.props.saveItem !== undefined ? this.props.saveItem(this.props.item.id) : null) :
													(this.props.unsaveItem !== undefined ? this.props.unsaveItem(this.props.item.id) : null);
											}} >
													<SvgIcon 
														name="BookmarkIcon" 
														fill = {this.props.isSaved ? "var(--button-icon-stroke)" : null}
														stroke="var(--button-icon-stroke)" />
										</div>
									) : 
									null
								}{
									platform !== OxiAppConstants.PLATFORM ? 
										(
											<div 
												className={ItemStyles.itemButton_div}
												style={{
													position:'absolute', 
													right:'1px', 
													top:'0px',
													transform: `rotation(${this.props.isExpanded ? '180' : '0'}deg)`,
												}}>
												<Button
													buttonType={OxiAppConstants.ControlConstants.ButtonTypes.e} //popup icon button
													onClickHandler={(event) => {
														event.stopPropagation();
														this.props.isExpanded ?
															this.props.collapseItem() :
															this.props.expandItem(this.props.item.id.toLowerCase());
													}}
													buttonHeight={26}
													//textHeight={26}
													buttonPadding={0}
													title='more'
													iconName='DropdownIcon'
													iconStyles={{
														width:'100%', 
														height:'100%'
													}}
													customButtonStyles={{'border-width':'0px'}}
													puDirection='WEST' />
											</div>
										) : 
										null
								}
							</div>
						</div>
					</div>
				</div>
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
				{
					(platform !== OxiAppConstants.PLATFORM /*&& this.props.isExpanded*/) ? 
						(

							<CSSTransition
							    tiemout={400}
							    classNames="expandedItemInfoContainer_div"
							    in={this.props.isExpanded}
							   	unmountOnExit 
							>
								<div className={ItemStyles.expandedItemInfoContainer_div}>
									<CSSTransition
											//timeout={}
											classNames="expandedItemInfo_div"
											in={this.props.isExpanded} 
											unmountOnExit
									>
										<div className={ItemStyles.expandedItemInfo_div}>
										<div className={ItemStyles.variantOptionsContainer_div}>
											<div className={ItemStyles.variantSizeOptionsContainer_div}>
												<div className={ItemStyles.variantTitle_div}>
													Size
												</div>
												<div className={ItemStyles.variantSizeOptions_div}>
													{
														//variants.edges !== undefined ?
														//	variants.edges.map(variant => {
														//		var variantInfo = variant.node.displayName.trim().split('-')[1].split('/');
														//		var vSize = variantInfo[1];
														//		var vColor = variantInfo[2];
														//		return(
														//			<div className={ItemStyles.sizeVariant_div}>
														//				{vSize}
														//			</div>
														//		);
														//	}):
														//	null
														availableSizes.length > 0 ? availableSizes : "no sizes"
													}
												</div>
											</div>
											<div className={ItemStyles.variantColorOptionsContainer_div}>
												<div className={ItemStyles.variantTitle_div}>
													Color
												</div>
												<div style={{position:'relative'}}>
													<div 
														className={ItemStyles.colorVariantDropDown_div}
														onClick={(event) => {
															event.stopPropagation();
															this.setState(prevState => ({
																...prevState,
																isColorOptionsOpen: !this.state.isColorOptionsOpen
															}))
														}}>
														{this.state.selectedColor || 'select color' || "no colors"}
													</div>
													<div 
														className={ItemStyles.variantColorOptions_div}
														style={ this.state.isColorOptionsOpen ? {display:'block'} : {display:'none'} }>
														{ availableColors.length > 0 ? availableColors : null }
													</div>
												</div>
											</div>									
										</div>
										<div className={ItemStyles.retailerImageContainer_div}>
											{
												//this.props.isExpanded ?
												(<img 
													src={featuredImage.originalSrc}
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
						) : 
						null
				}
				</div>	
			</CSSTransition>	
		);	
	}
}