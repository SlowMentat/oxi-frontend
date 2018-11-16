import React from 'react';


const containerStyle = {
    'position': 'absolute',
    'height': '100%',
    'max-height': 'calc(100vh - 200px - 5vh - 25px - 2vh - 6px)',
    'width': '100%',
    'text-align': 'center',
    'top': '0px',
    'margin-top': 'calc(5vh + 25px)'
}

const svgContainerStyle = {
    'max-height': 'calc(100vh - 200px - 80px )',
    'height': '100%',
    'width': 'calc((((((100vh - 200px) - 7vh) - 25px) - 6px) * 2) / 3)',
    'max-height': 'calc(100% * 3/2)',
    /*'width': 'calc((100vw - 250px)*.45)',
    'width': 'calc((100vh - 200px - 7vh - 25px - 6px)*2/3)',*/
    'margin': 'auto',
    'background-color': '#e91e6300'
}

export default class ItemLocationMap extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log('this.props.visibleItemsMap = ', this.props.visibleItemsMap)
		return(			
			<div style={containerStyle}>
				<div style={svgContainerStyle}>
					<svg style={{height:'100%',width:'100%',left:'0px',top:'0px'}}>
						{this.props.visibleItemsMap.visibleItemsByIds !== undefined ? Object.keys(this.props.visibleItemsMap.visibleItemsByIds).map(itemId => {
							console.log('itemId = ', itemId);
							console.log('this.props.visibleItemsMap.visibleItemsByIds = ', this.props.visibleItemsMap.visibleItemsByIds);
							//do not return object owned properties
							//if(this.props.visibleItemsMap.visibleItemsByIds.hasOwnProperty(itemId)){
							if(typeof itemId !== 'object' && this.props.visibleItemsMap.visibleItemsByIds[itemId] !== undefined){
								return(
									<circle 
										id={itemId}
										stroke-width='2px' 
										stroke='black' 
										fill='#ececec' 
										r='2%' 
										cy={`${100*this.props.visibleItemsMap.visibleItemsByIds[itemId]['positiony']}%`} 
										cx={`${100*this.props.visibleItemsMap.visibleItemsByIds[itemId]['positionx']}%`}>
									</circle>
								);
							}else{
								return null;
							}
						}) : null }
					</svg>
				</div>
			</div>		
		);
	}
}