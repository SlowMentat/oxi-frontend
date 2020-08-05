import React from 'react';
import PropTypes from 'prop-types';
import ContentStyles from '../../content.scss';
import {hextToBase64} from '../../Util/Misc.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';


export class Content extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			coverpicuri: null,
			base64Image: null,
		};

		this._handleOnClick = this._handleOnClick.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
	}

	componentDidMount(){
		const {
			coverpicuri,
			getCoverPic,
		} = this.props;

		//if thumbnail filename exists, call get request for content coverpic data
		console.log("coverpicuri = ", coverpicuri)
		if(coverpicuri && coverpicuri !== 'blob') getCoverPic(coverpicuri, this._handleImageReceived);
	}

	_handleOnClick(event){
		const {
			selectContentView
		} = this.props;

		const {
			id,
		} = this.props;

		selectContentView(id);
	}

	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	//Options for displaying content list:
	//1:  as thumbnail images
	//2:  as plain old bullet point
	render(){

		const {
			selectedId,
			id,
			isOutfitCoverpic,
			cropping,
		} = this.props;

		//Option 1 

		/*let contentBlockStyle = null;
		if(this.props.selectedId === this.props.id){
			contentBlockStyle = ContentStyles.selectedContentBlock;
		}else{
			contentBlockStyle = ContentStyles.stdContentBlock;
		}
		return(		
			<div className={contentBlockStyle} onClick={this._handleOnClick}>
				<img src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} style={{width:'calc(var(--img-aspect-ratio) * 100%)', 'height':'100%', 'margin':'auto', 'max-height':'inherit'}}/>
			</div>		
		);*/


		//option 2

		let contentBulletStyle = null;

		if(selectedId === id){
			if(isOutfitCoverpic){
				contentBulletStyle = ContentStyles['contentBulletCover_div--selected'];
			}else{
				contentBulletStyle = ContentStyles['contentBullet_div--selected'];
			}
		}else{
			if(isOutfitCoverpic){
				contentBulletStyle = ContentStyles.stdContentBulletCover_div;
			}else{
				contentBulletStyle = ContentStyles.stdContentBullet_div;
			}
		}

		return(
			<div
				style={ cropping ? null : ({'border-width': '0px'}) } 
				className={ContentStyles.cropIndicator_div}
			>
				<div className={ContentStyles.stdCotnentBulletContainer_div}>
					<div className={contentBulletStyle} onClick={this._handleOnClick}>
					</div>
				</div>
			</div>
		);
	}
}

export default Content;