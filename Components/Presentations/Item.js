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

const parseVariants = (variants) => {
	var availableSizes = [];
	var availableColors = [];

	variants !== undefined ?
		variants.edges.map(variant => {
			var variantInfo = variant.node.displayName.trim().split('-')[1].split('/');

			availableSizes = variantInfo[1] ? [...availableSizes, variantInfo[1]] : availableSizes;

			availableColors = variantInfo[2] ? [...availableColors, variantInfo[2]] : availableColors;
		}):
		null;

	return {availableSizes, availableColors};
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
			isExpanded,
		} = this.props;

		return(
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
		} = item !== undefined ? item : {};

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
		} = product !== undefined ? product : {};

		var { availableSizes, availableColors } = parseVariants(variants);

		var isSelected = item !== undefined ? selectedAllIds.includes(item.id) : [];

		return(		
			<React.Fragment>
  				<div 
  					className={ItemLiteStyles.itemLite_div}
  					style={{
						'margin-bottom': '15px',
						height:'125px',
  					}}
  					onMouseOver={(event) => onSizeHover(event)}
					onClick={(event) => {
						removeContentEntities();
						getContentsByItemId();
						//onDeselect(selectedAllIds.filter(id => id != item.id)[0]);
						if(isSelected === true){
							onDeselect(item.id)
						}else{
							clearSelectMultipleEntity(); 
							onSelect(item.id);
						}
					}} >

  					<div className={ItemLiteStyles.itemContentContainer_div}>
  						<div
  							style={{
  								position:'absolute',
  								height:'100%',
  								//width:'100%',
  								right:'0px',
  								padding:'5px',
  							}}
  						>
  							<img 
  								src={
  									featuredImage !== undefined ? 
  										featuredImage.originalSrc :   										
										this.state.base64Image === null ? 
											(OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : 
											(this.state.base64Image)
  								}
								style={{
									//'position':'absolute',
									'height':'100%',
									'left':'0%',
									'vertical-align':'middle',
									'border-radius':'4px',
								}} 
							/>
  						</div>
  						<div className={ItemLiteStyles.itemRetailerContainer_div}>
  							<div className={ItemLiteStyles.itemRetailer_div}>
  								{ vendor || udr }
  							</div>
  						</div>
  						
  						<div className={ItemLiteStyles.itemHandle_div}>
  							{ handle }
  						</div>
  						
  						<div className={ItemLiteStyles.itemControlsContainer_div}>
  							<div style={{positionr:'relative',width:'100%'}}>
  								<div 
  									id="bookmark" 
  									className={ItemLiteStyles.bookmarkIcon_div}
  									onClick={(event) => {
  										event.stopPropagation();
  										onBookmarkClicked(event)
  									}} >
  									<SvgIcon 
  										name="BookmarkIcon" 
  										stroke="var(--button-icon-stroke)"
  										//fill = {isSaved ? "var(--button-icon-stroke)" : null} 
  									/>
  								</div>
  								{
  									//isActive ? 
  									(<div 
  										id="dropdown" 
  										className={ItemLiteStyles.dropdownIcon_div}
  										//style={this.props.isExpanded ? ({transform:'scaleY(-1)'}) : ({}) }
  										//onClick={(event) => {
										//	event.stopPropagation();
										//	isExpanded ?
										//		collapseItem() :
										//		expandItem(id.toLowerCase());
										//}}
  										>
  									 	<SvgIcon name="DropdownIcon2" stokeWidth="2" stroke="var(--color1)" fill="var(--color1)" />
  									 </div>) /*:
  									null*/
  								}
  							</div>
  						</div>
  						
  						<div>
  						</div>
		
  					</div>
  					{
  					//<div 
  					//	className={ItemLiteStyles.apparelIconContainer_div}
  					//	style={/*isActive ? */({'background-color':'var(--color4)'})/* : ({})*/} >
  					//	
  					//	<div id="apparelTypeIcon" className={ItemLiteStyles.apparelTypeIcon_div}>
  					//			{/*<SvgIcon name={apparelTypeIcon} stroke="var(--color1)"/>*/}
  					//	</div>
  					//	
  					//	<div 
  					//		id="selectedSizeIcon" 
  					//		className={ItemLiteStyles.selectedSize_div} >
  					//		<span> XX </span>
  					//	</div>
		//
  					//</div>
  					}
  				</div>
  				{
					isSelected ?
						( <VisibleItemAsSeenOnList selectedItemId={ item.id } /> ) :
						null
  				}
  				
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
			compareMetrics
		} = this.props;

		var {
			isSaved,
			item,
			isExpanded,
			imageHeight,
			apparelTypeByIds,
		} = this.props;

		var {
			product, 
			platform, 
			sizeGroupId,		//Note:  sizeGroupId is only defined in Retailer retailer
			apparelType,
		} = this.props.item;
		
		if(product === undefined || product === null) return null;

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
		} = product;

		//Note:  sizes will only be defined in Retailer Items
		var size = this.props.sizeGroups[sizeGroupId];
		var isActive = platform !== OxiAppConstants.PLATFORM;



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

				//itemContainerStyles = isExpanded ?
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

		return(
			<CSSTransition
			    tiemout={200}
			    classNames="itemContainer_div"
			    in={this.props.expandedViewState && !isExpanded}
			>
				<div 
					className={itemContainerStyles}
					onMouseOver={this.props._handleMouseOver.bind(this)}
					onMouseLeave={this.props._handleMouseLeave.bind(null)} 
					style={
						!isProfileView ? 
						{} : 
						isExpanded ? 
							({
								//width: '100%', 
								transform: `translateY(calc(-${this.props.index}*(var(--item-height) )))`,	//18px is the margin-bottom for item 
								position: 'absolute', 
								//top: '0px', 
								'z-index':'100'
							}) : ({})
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

					<ItemLite 
						id={item.id}
						isProfileView={isProfileView}
						handleOnClick={null}
						retailerName={ vendor || udr}
						handle={handle || 'custom item'}
						sizeLabel={isActive ? size.sizeLabel : uds}
						metric={size.metric}
						isActive={isActive}
						isSaved={isSaved}
						isExpanded={isExpanded}
						collapseItem={collapseItem}
						expandItem={expandItem}
						apparelTypeIcon={
							apparelTypeByIds !== undefined && platform === OxiAppConstants.PLATFORM ? 
								apparelTypeByIds[apparelType].iconName : 
								null
						}
						onBookmarkClicked={(event) => {
							event.stopPropagation();
							!isSaved ? 
								(saveItem !== undefined ? saveItem(item.id) : null) :
								(unsaveItem !== undefined ? unsaveItem(item.id) : null);
						}}
						onSizeHover={(event) => {
							platform !== OxiAppConstants.PLATFORM ? 
								compareMetrics(size.metric) :
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
									height={imageHeight} />
							) : 
							() => (null)
						} />
	
					{
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
					}
				</div>	
			</CSSTransition>	
		);	
	}
}