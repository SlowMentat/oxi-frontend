import React from 'react';
import PropTypes from 'prop-types';
import ContentStyles from '../../content.css';
import {hextToBase64} from '../../Util/DataFormatConverter.js'
import {OxiAppConstants} from '../../Util/OxiAppConstants.js'


export class Content extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			thumbnail: null,
			base64Image:null
		};

		this._handleOnClick = this._handleOnClick.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
	}

	componentDidMount(){
		//if thumbnail filename exists, call get request for content coverpic data
		console.log("thumbnail = ", this.props.thumbnail)
		if(this.props.thumbnail !== null && this.props.thumbnail !== undefined) this.props.getCoverPic(this.props.thumbnail, this._handleImageReceived);
	}

	_handleOnClick(event){
		console.log("control click event in Content div");
		console.log(this.props.id);
		this.props.onClick(this.props.id);
	}

	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	render(){
		/*console.log("isControl: ", this.props.isControl)
		console.log("selectedId: ", this.props.selectedId);
		//Apply logic only on added content entities
		if(this.props.selectedId != false && 
			this.props.addedContents != undefined){										//note that new items added will only be added to the currently selected content entity
			let items = this.props.addedContents[this.props.selectedId].items;			//get a reference to the selected content's "items" branch
			console.log("this.props.addedItemIds", this.props.addedItemIds);
			console.log("this.props.modifyContentItems", this.props.modifyContentItems);
			console.log("items", items);
			if(this.props.addedItemIds != undefined && 									//addedItemIds are the allIds branch of the items node
				this.props.modifyContentItems != undefined &&							//This will modify the selected content entiy's "items" branch with the array of items updated from the items reducer.  
				items != undefined){
				console.log("items.length = ",items.length);
				console.log("this.props.addedItemIds.length = ",this.props.addedItemIds.length);
				if(this.props.addedItemIds.length != items.length){
					this.props.modifyContentItems(this.props.selectedId, this.props.addedItemIds);
				}
			}
		}*/
		let contentBlockStyle = null;
		/*if(this.props.isControl){
			contentBlockStyle = ContentStyles.addContentButton;
		}else */if(this.props.selectedId === this.props.id){
			contentBlockStyle = ContentStyles.selectedContentBlock;
		}else{
			contentBlockStyle = ContentStyles.stdContentBlock;
		}
		return(		
			<div className={contentBlockStyle} onClick={this._handleOnClick}>
				<img src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} style={{width:'calc(2/3 * 100%)', 'height':'100%', 'margin':'auto', 'max-height':'inherit'}}/>
			</div>		
		);
	}
}

export default Content;