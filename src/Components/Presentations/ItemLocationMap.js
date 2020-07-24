import React from 'react';
import Draggable, {DraggableCore} from 'react-draggable';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//CSS
import ItemStyles from '../../item.scss';
import FormStyles from '../../forms.scss';

const containerStyle = {
    'position': 'absolute',
    'height': '100%',
    'max-height': 'calc(100vh - 200px - 5vh - 25px - 2vh - 6px)',
    'width': '100%',
    'text-align': 'center',
    'top': '0px',
    'left':'0px',
    'margin-top': 'calc(5vh + 25px)',
    
}

const svgContainerStyle = {
    'max-height': 'calc(100vh - 200px - 80px )',
    'height': '100%',
    'width': 'calc(((((100vh - 200px) - 7vh) - 25px) - 6px) * var(--img-aspect-ratio))',
    'max-height': 'calc(100% * 1/var(--img-aspect-ratio))',
    'margin': 'auto',
    'background-color': '#e91e6300',
    'float':'right'
}

export default class ItemLocationMap extends React.Component{
	constructor(props){
		super(props);
		this._handleOnMouseOver = this._handleOnMouseOver.bind(this);
		this._handleOnMouseUp = this._handleOnMouseUp.bind(this);
		this._onStart = this._onStart.bind(this);
		this._onStop = this._onStop.bind(this);
		this._handleDrag = this._handleDrag.bind(this);
		this.state = {
			activeDrags: 0,
			draggedItemId: null,
			deltaPosition: {
				x: 0, y: 0
			},
			controlledPosition: {
				x: 0, y: 0
			}
		}
	}

	_handleOnMouseOver(event, itemId){
		console.log('hovering over: ', itemId);
		if(this.state.activeDrags == 0) this.props.changeItemHovered(itemId);
	}

	_handleOnMouseLeave(event, itemId){
		console.log('left hover: ', itemId);
		if(this.state.activeDrags == 0) this.props.changeItemHovered(null);
	}

	_handleOnMouseDown(event, itemId){

	}

	_handleOnMouseUp(event, itemId){
		event.stopPropagation();
		let delXPercent = (this.state.deltaPosition.x / this.props.itemMapDimension.width);
		let delYPercent = (this.state.deltaPosition.y / this.props.itemMapDimension.height);
		let xCoordPercentUpdate = this.props.visibleItemsMap.visibleItemsByIds[itemId].positionx + delXPercent;
		let yCoordPercentUpdate = this.props.visibleItemsMap.visibleItemsByIds[itemId].positiony + delYPercent;

		xCoordPercentUpdate = xCoordPercentUpdate < 0 ? 0 : xCoordPercentUpdate > 1 ? 1 : xCoordPercentUpdate; 
		yCoordPercentUpdate = yCoordPercentUpdate < 0 ? 0 : yCoordPercentUpdate > 1 ? 1 : yCoordPercentUpdate;
		console.log('xCoordPercent = ', xCoordPercentUpdate);
		console.log('yCoordPercent = ', yCoordPercentUpdate);
		console.log();
		
		//remvove the transorm style
		event.target.style.transform = '';
		//invalidate the modified item
		this.props.modifyItemStatePosition(itemId, xCoordPercentUpdate, yCoordPercentUpdate);
		if(!this.props.clientInvalidatedItems.includes(itemId)){
			this.props.clientInvalidateItem(itemId);
		}

		this.props.populateItemsMap(Object.assign({}, this.props.visibleItemsMap, {
			visibleItemsByIds:{
				...this.props.visibleItemsMap.visibleItemsByIds,
				[itemId]: {
					...this.props.visibleItemsMap.visibleItemsByIds[itemId],
					positionx: xCoordPercentUpdate, 
					positiony: yCoordPercentUpdate
				}
			}
		}));
		this.setState({
			deltaPosition:{
				x: 0,
				y: 0,
			}
		});
		//event.stopPropagation();
	}

	_handleDrag(event, ui){
		const {x,y} = this.state.deltaPosition;
		this.setState({
			deltaPosition:{
				x: x + ui.deltaX,
				y: y + ui.deltaY,
			}
		});
	}

	_onStart(event, itemId){
		this.setState({
			activeDrags: ++this.state.activeDrags,
			draggedItemId: itemId
		});
	}

	_onStop(event, itemId){
		this.setState({
			activeDrags: --this.state.activeDrags,
			draggedItemId: null
		});
		this._handleOnMouseUp(event, itemId);
	}

	render(){
		const dragHandlers = {
			onStart: this._onStart, 
			onStop: this._onStop
		};

		const {
			selectItem,
			deselectItem,
			deselectAllItems,
			simulateImageClick,
		} = this.props;

		const {
			contents,
			addedContents,
			selectedContentId,
			viewState,
			selectedItemId
		} = this.props;

		console.log('this.props.visibleItemsMap = ', this.props.visibleItemsMap)
		return(			
			<div 
				className={viewState != OxiAppConstants.viewState.PREVIEW ? FormStyles.itemLocationMapContainerPreview_div : FormStyles.itemLocationMapContainer_div}
				//style={viewState != OxiAppConstants.viewState.PREVIEW ? Object.assign({}, containerStyle, {'margin-top': '0px'}) : containerStyle}
			>
				<div 
					//style={Object.assign({}, svgContainerStyle, this.props.itemMapDimension)}
					className={FormStyles.itemMapSvgContainer_div}
					style={{
						...(isDevice ? {} : this.props.itemMapDimension)
					}}
				>
					<svg 
						onClick={(event) => {
							simulateImageClick ? simulateImageClick(event.pageX, event.pageY) : null;
							//deselect all items
							selectedItemId != false ? deselectAllItems() : null;
						}} 
						style={{height:'100%',width:'100%',left:'0px',top:'0px'}}
					>
						{
							this.props.visibleItemsMap.visibleItemsByIds !== undefined ? Object.keys(this.props.visibleItemsMap.visibleItemsByIds)
								.filter(itemId => {

									var result = false;
									
									switch(true){

										case selectedContentId === undefined || selectedContentId === null || selectedContentId === false:
											break;

										//check existing items
										case viewState === OxiAppConstants.viewState.PREVIEW && contents.byIds[selectedContentId] !== undefined:
											result = contents.byIds[selectedContentId].items.includes(itemId);
											break;

										//check added items
										case viewState !== OxiAppConstants.viewState.PREVIEW && addedContents !== undefined && addedContents.byIds[selectedContentId] !== undefined:
											//Added entity keys are stored as numbers, which is incorrect.  Conversion to string is needed to perform search with itemId
											var itemIdsAsString = addedContents.byIds[selectedContentId].items.map(id => typeof id === 'number' ? id.toString(10) : id);
											result = result === false ? itemIdsAsString.includes(itemId) : result;
											break;

										default:
											break;
									}

									return result;
									
									/*return selectedContentId === undefined || selectedContentId === false ? //redux state not yet instantiated for entities
										([]) :
										viewState === OxiAppConstants.viewState.PREVIEW ? 
											contents.byIds[ selectedContentId ] === undefined ?
												([]) :
												contents.byIds[ selectedContentId ].items.includes(itemId) :
													addedContents.byIds[ selectedContentId ] ?
														addedContents.byIds[ selectedContentId ].items.includes(itemId) :
														([])*/
								})
								.map((itemId, ind, srcArray) => {
									console.log('srcArray = ', srcArray);
									//console.log('itemId = ', itemId);
									//console.log('this.props.visibleItemsMap.visibleItemsByIds = ', this.props.visibleItemsMap.visibleItemsByIds);
									//do not return object owned properties
									//if(this.props.visibleItemsMap.visibleItemsByIds.hasOwnProperty(itemId)){
									//if(this.props.itemIdHovered === itemId) console.log('itemIdHovered equals itemId: ', itemId)
									if(typeof itemId !== 'object' && this.props.visibleItemsMap.visibleItemsByIds[itemId] !== undefined){
										return(
											viewState != OxiAppConstants.viewState.PREVIEW ? 
											(
												<DraggableCore
													key={itemId}
													onStop={() => this._onStop(event, itemId)}
													onStart={() => this._onStart(event, itemId)}
													onDrag={this._handleDrag}
													bounds="div"
													//{...dragHandlers}
												>
													<circle 
														onMouseOver={() => this._handleOnMouseOver(event, itemId)}
														onMouseLeave={() => this._handleOnMouseLeave(event)}
														onMouseUp={() => this._handleOnMouseUp(event, itemId)}
														onClick={(event) => {
															event.stopPropagation();
														}}
														id={itemId}
														stroke-width='2px' 
														stroke='black' 
														fill={this.props.itemIdHovered === itemId ? '#6dd7b4' : '#ececec'} 
														r='2%' 
														cy={`${100*this.props.visibleItemsMap.visibleItemsByIds[itemId]['positiony']}%`} 
														cx={`${100*this.props.visibleItemsMap.visibleItemsByIds[itemId]['positionx']}%`}
														className={ItemStyles.itemPin}
														transform={this.state.draggedItemId === itemId ? `translate(${this.state.deltaPosition.x}, ${this.state.deltaPosition.y})` : 'translate(0,0)'}
														>
													</circle>
												</DraggableCore>
											) : (
												<circle 
													key={itemId}
													onMouseOver={() => this._handleOnMouseOver(event, itemId)}
													onMouseLeave={() => this._handleOnMouseLeave(event)}
													onClick={(event) => {
														selectedItemId === itemId ? deselectItem(itemId) : selectItem(itemId);
														event.stopPropagation();
													}}
													id={itemId}
													stroke-width='2px' 
													stroke='black' 
													fill={this.props.itemIdHovered === itemId ? '#6dd7b4' : '#ececec'}  
													r='2%' 
													cy={`${100*this.props.visibleItemsMap.visibleItemsByIds[itemId]['positiony']}%`} 
													cx={`${100*this.props.visibleItemsMap.visibleItemsByIds[itemId]['positionx']}%`}
													>
												</circle>
											)
										);
									}else{
										return null;
									}
								}
							) : null 
						}
					</svg>
				</div>
			</div>		
		);
	}
}