import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.scss';
import Styles from '../../root.scss';
//import {sendAsyncRequest/*, OxiAppConstants*/} from '../../App.js';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {
	handleUnauthorizedRequest, 
	requestInterceptor, 
	loginConfig,
	cookies
} from '../../Components/Actions/indexActions.js';

import { OxiAppConstants } from '../../Util/OxiAppConstants.js';
import { denormalizeOutfit } from '../../Util/Schema.js';
import VisibleFieldDropdownList from '../../Components/Containers/VisibleFieldDropdownList.js'
import FormLoginContainer from '../../Components/Containers/FormLoginContainer.js'
import { 
	//InputTextField, 
	InputTextFieldAccount 
} from '../../Components/Presentations/CommonElements.js';

import { ItemTextField, TextField } from '../../Components/Presentations/FitseeUI/InputsAndControls/TextField.js'

import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import CreateAccountStyles from '../../createAccount.scss';

import { Route, Switch, Redirect } from 'react-router-dom';
import {logout} from '../../Components/Actions/indexActions.js';
//import {Button} from './Controls.js';

import CroppableImageForm from '../../Util/CroppableImageForm.js';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import {ReactCropStyles} from '../../reactCrop.scss';
import { usePrevious } from '../../Util/Misc.js';
import Comments from '../../Components/Presentations/Comments.js';

import { 
	Dialog,
	DialogTitle, 
	DialogContent,
	DialogActions,
	DialogButton,
} from '@rmwc/dialog';
import '@rmwc/dialog/styles';

import '@rmwc/tabs/styles';
import { Tab, TabBar } from '@rmwc/tabs';
import { Theme } from '@rmwc/theme';
/*import { Button } from '@rmwc/button';
import '@rmwc/button/styles';*/
import { Button, IconButton } from '../../Components/Presentations/FitseeUI/Buttons/index.js'; 
//import { MenuSurfaceAnchor, MenuSurface } from '@rmwc/menu';
import { Elevation } from '@rmwc/elevation';
import '@rmwc/elevation/styles';
//import '@rmwc/button/styles'; 


//=========Form selection switch block//=========

const testComments = [
	"This is a bangarang outfit. So bangarang, in fact, that I became pan the womaaaan and defeated captian hook... He said my form was goooood.",
	"Just came here to say SWAG!",
	"O..M..G... love EEEEEHT"
]

function FormDeck(props){
	const [isCommentsShown, setIsCommentsShown] = useState(false);
	const [keyboardShown, setKeyboardShown] = useState(false);

	const {
		iniOutfitPreview,
		closeModal,
		deselectAndPropogate,
	} = props;
	
	const {
		formType,
		content,
		overlayModal,
		entitiesStateReducer,
	} = props;

	console.log('props.formType = ', formType);

	const [iniOP, setIniOP] = useState(() => iniOutfitPreview);
	var overlayForm = null;
	var form = null;

	switch(true){
		case overlayModal === OxiAppConstants.FormType.DISCARD_EDITS:
			overlayForm = (
				<DiscardForm 
					requestedNav={props.requestedNav}
					cancelAction={props.cancelAction}
					submitAction={props.confirmDiscardSubmitAction}
					outfits={props.outfits}
					contents={props.contents}
					items={props.items}
					clearUpdates={props.clearUpdates}
					clearInvalidations={props.clearInvalidations}
					match={props.match}
					history={props.history}
					isOverlay={true}
					customStyles={{
						'background-color':'unset'
					}}
				/>		
			);
			break;

		default:
			break;
	}

	switch(true){
		case formType === OxiAppConstants.FormType.LOGIN:
			console.log('login hit')
			form = (
				<FormLoginContainer isModal={true}/>
			)
			break;

		/*case formType === OxiAppConstants.FormType.ADD_ITEM:
			return (
				<ItemForm 
					{
						...{
							...props,
							submitContext: "Add",
						}
					}			
				/>
			)*/

		case formType === OxiAppConstants.FormType.UPDATE_ITEM:
			form = (
				<ItemForm 
					cancelAction={props.cancelAction} 
					submitAction={props.submitAction} 
					submitContext="Update"

					match={props.match}
					history={props.history}

					getSuggestion={props.getSuggestion}
					getApparelTypes={props.getApparelTypes}

					allApparelTypes={props.allApparelTypes}
				/>
			)
			break;

		case formType === OxiAppConstants.FormType.DISCARD_EDITS:
			form = (
				<DiscardForm 
					requestedNav={props.requestedNav}
					cancelAction={props.cancelAction}
					submitAction={props.confirmDiscardSubmitAction}
					outfits={props.outfits}
					contents={props.contents}
					items={props.items}
					clearUpdates={props.clearUpdates}
					clearInvalidations={props.clearInvalidations}
					match={props.match}
					history={props.history}
					isOverlay={false}
					message="You are leaving edit mode.  Any changes made will be lost!"
				/>
			)
			break;

		case formType === OxiAppConstants.FormType.DELETE_OUTFITS:
			form = (
				<DiscardForm
					requestedNav={props.requestedNav}
					cancelAction={props.cancelAction}
					submitAction={
						() => props.confirmDeleteOutfits(entitiesStateReducer.outfits.multipleSelected)
					}
					outfits={props.outfits}
					contents={props.contents}
					items={props.items}
					clearUpdates={props.clearUpdates}
					clearInvalidations={props.clearInvalidations}
					match={props.match}
					history={props.history}
					isOverlay={false}
					message="You are about to delete the selected outfits."				
				/>
			)
			break;

		case formType === OxiAppConstants.FormType.PROFILE_PIC:
			form = (
				<ProfilePicForm
					cancelAction={props.cancelAction} 
					submitAction={props.submitAction} 
					//profile={props.profile}
					owner={props.owner}
					getCoverPic={props.getCoverPic}
					addProfilePic={props.addProfilePic}
					cropProfilePic={props.cropProfilePic}
					//username={props.profile.username}}
				/>
			)
			break;

		case (
			formType === OxiAppConstants.FormType.OUTFIT_PREVIEW || 
			formType === OxiAppConstants.FormType.ADD_ITEM ||
			formType !== OxiAppConstants.FormType.OUTFIT_PREVIEW
		):
			console.log('formType = ', formType);

			const compoundOPStyles = formType !== OxiAppConstants.FormType.OUTFIT_PREVIEW ? 
				({
					opacity: 1,
				}) : 
				({
					opacity: 1,
				});

			const compoundAIStyles = formType !== OxiAppConstants.FormType.ADD_ITEM ? 
				({
					left:'-100vw', 
					'z-index': -1,
					opacity: 0,
				}) : 
				({
					opacity: 1,
					'z-index': 100,
					left:'0px',
				});

			form = (
				<div 
					className={Styles.modal}
					style={ initialInnerHeight > 0 ? ({height: `${initialInnerHeight}px`}) : ({}) }
				>
					<div 
						className={FormStyles.outfitPreview_div}
						style={{ 
							...(keyboardShown && initialInnerHeight > 0 ? 
								({
									height: `100%`,
									'overflow-y':'scroll',
								}) : 
								({})),
							...(isCommentsShown ? ({transform: 'translateX(-85vw)'}) : ({})),
						}}
					>
						{ isDevice ? null : <Comments comments={testComments}/> }
						{ 
							iniOP ? 
								iniOP(
									compoundOPStyles, 
									() => {
										closeModal();
										deselectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT);
									},
									setIsCommentsShown,
									isCommentsShown,
								) : 
								null 
						}
						{
							/*isDevice*/false ? 
								<Comments comments={testComments}/> :
								<ItemForm
									{
										...{
											...props,
											compoundAIStyles: compoundAIStyles,
											submitContext: "Add",
											setKeyboardShown: val => setKeyboardShown(val),										
										}
									}	 
								/>
						}
					</div>
				</div>
			)
			break;

		default:
			break;
	} 

	return (
		<React.Fragment>
			{form}
			{overlayForm}
		</React.Fragment>
	);
}



/*export const InputTextField = ({context, type, name, onChange, toggleFocus, toggleBlur, textValue}) => {
	let backgroundColorStyle = context === 0 ? 
		({'background-color':'var(--retailer-dd-field-color)'}) : 
		({'background-color':'var(--user-dd-field-color)'});
	return(
		<div 
			className={FormStyles.nameField} 
			style={backgroundColorStyle}
		>
			<input 
				value={textValue} 
				type="text" 
				name={name} 
				placeholder={name} 
				onChange={onChange} 
				onFocus={toggleFocus} 
				onBlur={toggleBlur}
				style={backgroundColorStyle}
			/>
		</div>	
	)
}*/


const DropDownTypeContent = (props) => {
	console.log('dropDownType = ',props.type);
	return(
		<React.Fragment>
			<div style={{
				display: 'inline-block',
				width: '60px',
				height: '100%',
				'margin-left': '-25px',
			}}>
				<SvgIcon name={props.type}/>
			</div> 
			<div style={{
				display: 'inline-block',
				position: 'relative',
				height: '100%',
				width: 'calc(100% - 50px)',
				'margin-left': '10px'
			}}>
				<div style={{
					position: 'absolute',
					width: '100%',
					top: '12px',
				}}>
					{OxiAppConstants.ItemTypesByIconName[props.type].label}
				</div>
			</div>
		</React.Fragment>
	)
};

const DropDownItem = (props) => {
	return(
		<React.Fragment>
			<div className={FormStyles.ddItemPreviewPic_div}>
			</div>
			<div className={FormStyles.ddItemContent_div}>
				<div className={FormStyles.ddItemTitle_div}>
				</div>
				<div className={FormStyles.ddItemDescription_div}>
				</div>
			</div>
		</React.Fragment>
	);
}

class DropDownField extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isDown: false
		}
		this._handleOnInputFocus = this._handleOnInputFocus.bind(this);
		this._handleOnInputBlur = this._handleOnInputBlur.bind(this);
	}

	_handleOnInputFocus(event){
		//set global
		this.props.setKeyboardShown(true);
		this.setState(prevState => ({
				isDown: !prevState.isDown
			})
		);
		//Delete what any text existing in the text input
		this.props.dropdownSelected(event, '');
		this.props.hydrateTask();
	}

	_handleOnInputBlur(event){
		this.props.setKeyboardShown(false);
		this.setState(prevState => ({
				isDown: !prevState.isDown
			})
		);
	}


	render(){
		console.log('dropdownNames for ' + this.props.apparelType + ' = ', this.props.dropdownNames)
		let dropDownList = null;

		return(
			<div
				className={FormStyles.nameFieldContainer_div}
			>
				{/*<InputTextField */}
				<ItemTextField
					context={this.props.context}
					textValue={this.props.inputValue}
					fieldType={this.props.fieldType} 
					label={this.props.fieldType.toLowerCase()}
					onChange={(e) => {this.props.onInputChange(e)}} 
					toggleFocus={(e) => this._handleOnInputFocus(e)}
					toggleBlur={(e) => this._handleOnInputBlur(e)}
					style={{'margin-top':'10px', width:'100%'}}
				/>
				<div
					className={this.state.isDown ? FormStyles.dropDownContainer : FormStyles['dropDownContainer--hidden']}
					style={(this.state.isDown && initialInnerHeight > 0) ? ({height: `calc(${initialInnerHeight}px/2 - 80px)`}) : ({})}
					//style={borderColor}
				>
					<div style={{'margin-left':'10px','margin-right':'10px','margin-top':'10px'}}>
						{
							<VisibleFieldDropdownList 
								fieldType={this.props.fieldType} 
								context={this.props.context} 
								filteredApparelTypes={this.props.filteredApparelTypes}
								dropdownOptionSelected={this.props.dropdownOptionSelected} 
							/>
						}
					</div>
				</div>
			</div>
		);
	}
}


export class ProfilePicForm extends React.Component{
	constructor(props){
		super(props);

		const {
			crop,			
		} = props.owner ? props.owner.pictureDto : ({});

		this.state = {
			isEditing: false,
			isNewImage: false,
			src: null,
			filename:null,
			base64Image: null,
			imgAspectRatio: null,
			crop: (
				crop ? 
					crop : 
					({
						unit: '%',
						x: 0,
						y: 0,
						width: 0,
						height: 0,
						aspect: 1,
					})
			),
			ctrlsTransition:0,
		};

		this.ctrlsPageLeft = 50;
		this.ctrlsPageRight = -50;

		this._editPicture = this._editPicture.bind(this);
		this._addNewPicture = this._addNewPicture.bind(this);
		this._onCropChange = this._onCropChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this.setupCropImgRoot = this.setupCropImgRoot.bind(this);
		this._onSelectFile = this._onSelectFile.bind(this);
		this.pageLeft = this.pageLeft.bind(this);
		this.pageRight = this.pageRight.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
		this._handleImageLoad = this._handleImageLoad.bind(this);
		this.iniDimensions = this.iniDimensions.bind(this);
	}

	componentDidMount(){
		const {
			owner
		} = this.props;

		const {
			originaluri
		} = owner ? owner.pictureDto : ({});

		if(originaluri) this.props.getCoverPic(originaluri, this._handleImageReceived, 'original');
		else console.log('originaluri is null or undefined');
	}

	componentDidUpdate(prevProps){
		const {
			owner
		} = this.props;

		const {
			originaluri
		} = owner ? owner.pictureDto : ({});

		if(this.state.src !== originaluri){
			this.props.getCoverPic(originaluri, this._handleImageReceived, 'original');
		}
	}

	_handleImageReceived(event, data){
		console.log('setting profile img data')
		console.log('originaluri = ', this.props.owner.pictureDto.originaluri);
		console.log('is data null or undefined', (data == null || data == undefined));
		this.setState(prevState => ({
			...prevState,
			base64Image: 'data:image/jpeg;base64,' + data,
			src: this.props.owner.pictureDto.originaluri,
		}));
	}

	_editPicture(event){
		this.setState(prevState => ({
			...prevState,
			isEditing: true,
		}));
	}

	_addNewPicture(event){
		this.setState(prevState => ({
			...prevState,
			isEditing: true,
		}));
	}

	_onCropChange(pixelCrop, percentCrop){
		this.setState(prevState => ({
			...prevState,
			crop:{
				...prevState.crop,
				...percentCrop,
			}
		}));
	}

	_handleSubmit(event) {
		event.preventDefault();

		//methods
		const {
			addProfilePic,
			cropProfilePic,
		} = this.props;

		//variables
		const {
			images,
		} = this.props;

		let isCropping = false;


		
		this.state.isNewImage ? 
			addProfilePic(this.state.base64Image, JSON.stringify(this.state.crop)) :
			cropProfilePic(JSON.stringify(this.state.crop));
			//reaload images
			//this.forceUpdate();
		

		//event.preventDefault();
	}

	_handleImageLoad(img){
		this.setState({
			imgAspectRatio: img.naturalWidth / img.naturalHeight,
		});
	}

	iniDimensions(aspectRatio, isRootPortrait){
		var result = {};
		const frameAspectRatio = this.cropImgRoot.clientWidth / this.cropImgRoot.clientHeight;

		if(isRootPortrait){
			switch(true){
				// Landsape or square image
				case aspectRatio >= 1:
					result = {height: 'auto', width: '100%'};
					break;
	
				// Image height is less than the crop root when both widths are equal
				case aspectRatio < 1 && aspectRatio >= frameAspectRatio:
					result = {height: 'auto', width: '100%'};
					break;
	
				// Image height is greater than the crop root when both widths are equal
				case aspectRatio < frameAspectRatio:
					result = {height: '100%', width: 'auto'};
					break;
	
				default:
					break;
			}
		}
		else{
			switch(true){
				// portrait or square image
				case aspectRatio <= 1:
					result = {height: '100%', width: 'auto'};
					break;
	
				// Image width is less than the crop root when both heights are equal
				case aspectRatio > 1 && aspectRatio <= frameAspectRatio:
					result = {height: '100%', width: 'auto'};
					break;
	
				// Image width is greater than the crop root when both heights are equal
				case aspectRatio > frameAspectRatio:
					result = {height: 'auto', width: '100%'};
					break;
	
				default:
					break;
			}
		}

		//if(isRootPortrait){
		//	result = (aspectRatio > 1 ? {height: '100%', width: 'auto'} : {height: 'auto', width: '100%'});
		//}
		//else{
		//	result = (aspectRatio > 1 ? {height: 'auto', width: '100%'} : {height: '100%', width: 'auto'});
		//}

		return result;
	}

	setupCropImgRoot(div){
		//div ? div.className = FormStyles.imgEditContainer_div : null;  //Don't do this
		div ? div.style.cssText =  'display: flex; justify-content: center; align-items: center; background-color: var(--color-02)' : null;
		this.cropImgRoot = div;

		//if(div && this.state.crop.width == 0 && this.state.crop.height == 0 && div.naturalHeight && div.naturalWidth){
		//	var cropDim = .8 * (div.naturalHeight > div.naturalWidth ? div.naturalHeight : div.naturalWidth);

		//	this.setState(prevState => ({
		//		...prevState,
		//		crop:{
		//			...prevState.crop,
		//			width: cropDim,
		//			height: cropDim,
		//		}
		//	}));
		//}
	}

	_onSelectFile(event){
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			
			reader.onloadend = () => {
				this.setState(prevState => ({
					...prevState,
					base64Image: reader.result,
					isEditing: true,
					ctrlsTransition: prevState.ctrlsTransition + this.ctrlsPageRight,
					isNewImage: true,
				}));
			}
			// reader.addEventListener('load',(this) => this.setState({src: reader.result}), false);
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	pageLeft(){
		this.setState(prevState => ({
			...prevState,
			ctrlsTransition: 0,//prevState.ctrlsTransition + this.ctrlsPageLeft,
		}))
	}

	pageRight(){
		this.setState(prevState => ({
			...prevState,
			ctrlsTransition:-50,//prevState.ctrlsTransition + this.ctrlsPageRight,
		}))
	}

	render(){
		const {
			cancelAction,
		} = this.props;

		const {
			currentImage,
		} = this.props;

		const eppCtrl_div = {
    		'display': 'inline-block',
    		'vertical-align': 'top',
    		'font-size': '24px',
    		'width': '48%',
    		'height': 'inherit',
    		'line-height': '40px',
    		'text-align': 'center',
		}

		const page1ButtonStyles = this.state.base64Image ? 
			({
				width: '33%',
			}) :
			({});

		const setupRef = (element, reference) => {
			this[reference] ? null : this.setState(this.state);
			this[reference] = element ? element : this[reference];
		}

		const deviceImageSizing = {
    		width: '100%',
    		height: 'auto',
		}

		const desktopImageSizing = {
			width: 'auto',
			height: '100%',
		}

		var content = null;

		if(this.state.isEditing){ 
			content = (
				<ReactCrop
					//className={ReactCropStyles}
					//rotation={images[contentState.selected].rotation}
					//This is a percentage of actual image height wrp <img> tag height
					//maxHeight={this.maxHeight}
					//maxWidth={100}
					//minY={this.minYPercent}
					style={{
						'max-height': '100%',
						'max-width': '100%',
						height:  'auto',
						width: 'auto',
						//...(
						//	isDevice ? 
						//	{
						//		...deviceImageSizing
						//	} :
						//	{
						//		...desktopImageSizing				
						//	}
						//)
					}}
					imageStyle={{
						'max-height': this.cropImgRoot.clientHeight,
						'max-width': this.cropImgRoot.clientWidth,
						...(this.iniDimensions(this.state.imgAspectRatio, isDevice))
					}}
					cropImgRoot={this.cropImgRoot}
					src={this.state.base64Image}
					crop={this.state.crop}
					onImageLoaded={(imageElement) => {this._handleImageLoad(imageElement)} }
					//onComplete={this._onCropComplete}
					onChange={this._onCropChange}
					//setupImageRef={this.props.setupImageRef}
					//flag={this.state.flag}
					ruleOfThirds={true}
					circularCrop={true}
					//renderComponent={
					//	<div
					//		style={{
					//			display: 'flex',
					//			'justify-content': 'center',
					//			'align-items': 'center',
					//			height: 'inherit',
					//			width: 'inherit,'
					//		}}
					//	>
					//		<img 
					//			style={{
					//				float: 'unset',
    				//				'max-width': 'unset',
    				//				'object-fit': 'cover',
    				//				display: 'inline',
    				//				...(
    				//					isDevice  ?
    				//						{
    				//							...(this.iniDimensions(this.state.imgAspectRatio, isDevice))
    				//							//width: '100%',
    				//							//height: 'auto',
    				//							//float: 'unset',
    				//						} : 
    				//						{}
    				//				)
					//			}}
					//			className={FormStyles.imgEdit_img}
					//			src={this.state.base64Image}
					//			onClick={this.props.onImageClick} 
					//			onLoad={(imgRef) => this._handleImageLoad(this.props.imageElement)} 
					//			//ref={this.props.setupImageRef}
					//			loading="lazy" 
					//		/>	
					//	</div>
					//}
				/>
			)
		}
		else{			
			content = (
				<img 
					style={{
						float: 'unset',
    					'max-width': 'unset',
    					'object-fit': 'cover',
    					display: 'inline',
    					...(
    						isDevice  ?
    							{
    								width: '100%',
    								height: 'auto',
    								float: 'unset',
    							} : 
    							{}
    					)
					}}
					className={FormStyles.imgEdit_img}
					src={this.state.base64Image}
					onClick={this.props.onImageClick} 
					onLoad={(imgRef) => this._handleImageLoad(imgRef)} 
					//ref={this.props.setupImageRef}
					loading="lazy" 
				/>	
			)
		}

		return(
			<div 
				className={Styles.modal}
				style={{
					...(
						isDevice ? 
							{} : 
							{
								position: 'relative',
								width: '500px',
							}
					)
				}}
				onClick={(event) => {
					event.stopPropagation();
					//cancelAction();
				}}
			>
				<form enctype="multipart/form-data" style={{positon:'absolute','text-align':'center',display:'inline'}}>
					<input 
						id="fileInput" 
						ref={input => {
							setupRef(input, 'fileInput');
							//this.fileInput ? null : this.setState(this.state);
							//this.fileInput = input ? input : this.fileInput;
						}}
						type="file" 
						//multiple name="imageFile" 
						//onChange={this._onSelectMultipleFiles/*this._onSelectFile*/} 
						onChange={this._onSelectFile}
						style={{display:'none'}} 
					/>
					<Button 
						id="submitButton" 
						style={{

						}}
						label="submit" 
						ref={button => {
							setupRef(button, 'button');
						}}
						onClick={e => this._handleSubmit(e)} style={{display:'none'}}
					/>
				</form>
				<div 
					className={FormStyles.editProfilePic_div}
					onClick={event => {event.stopPropagation()}}
				>
					<div 
						className={FormStyles.eppHeader_div}
					>
						<div
							style={{
								display: 'flex',
								//'justify-content': 'center',
								'padding-left':'18px',
								'align-items': 'center',
								height: '100%',
								width: '100%',
								'font-size': '2.4rem',
								'font-weight': 'bolder',
								color: 'var(--color-02-shade-02)',
							}}
						>
							Profile Picture
						</div>
						<IconButton
							onClick={(event) => cancelAction(event)}
							icon="cancel"
							style={{
								...(
									isDevice ? 
										{} :
										{
											position:'absolute',
											top:'0px',
											right:'0px',
										}
								)
							}}
						/>
					</div>
					<div 
						className={FormStyles.eppPicture_div}
						style={{
							'max-width': 'unset',
							...(
								isDevice ?
									{
										iwdth: '100%',
										height: 'auto',
										'border-radius': 'unset',
									} : 
									{}
							)							
						}}
						ref={div => this.setupCropImgRoot(div)} 						
					>
						{
							content ? 
								content : 
								<i class="material-icons" style={{'font-size': 'calc(.90*500px)', color: 'var(--color2)'}}> account_circle </i> 
						}
					</div>
					<div className={FormStyles.editProfilePicCtrls_div}>
						<div 
							className={FormStyles.buttonHorizontalSlider_div}
							style={{transform: `translateX(${this.state.ctrlsTransition}%)`}}
						>

							<div 
								id="ctrlPage1"
								className={FormStyles.eppDisplayedControls_div} 
								style={this.state.ctrlsTransition === 0 ? ({opacity: 1}) : ({opacity: 0})}
							>
								<IconButton
									onClick={this._editPicture}
									icon="edit"
									//style={{...eppCtrl_div, ...page1ButtonStyles}} 
								/>
								<label 
									for="fileInput" 
									style={{
										//'margin-right':'5%',
										'width':'auto'
									}}>
									<IconButton
										//onClick={this._addNewPicture}
										icon="add_a_photo"
										onClick={this.fileInput ? (e) => this.fileInput.click(e) : null}
										//style={{...eppCtrl_div, ...page1ButtonStyles}}
									/>
								</label>
		
  								{
  									// If image is already loaded in browser
  									this.state.base64Image ? 
  										<IconButton
											onClick={(event) => {
												this.pageRight();
												//this.forceUpdate();
											}}
											icon="arrow_forward"
											iconName={null}
											//style={{display:buttonDisplay, 'margin-top':'8px'}} 
											//style={{...eppCtrl_div, ...page1ButtonStyles}}
										/> : 
										null
  								}
  							</div>	

							<div 
								id="ctrlPage2"
								className={FormStyles.eppDisplayedControls_div} 
								style={this.state.ctrlsTransition === 0 ? ({opacity: 0}) : ({opacity: 1})}
							>
								<IconButton
									onClick={(event) => {
										this.pageLeft();
										//this.forceUpdate();
									}}
									icon="arrow_back"
									//iconName={null}
									//style={eppCtrl_div}
								/>
								<label 
									for="submitButton" 
									style={{
										'display': 'flex',
										'flex-direction': 'column',
										'justify-content': 'center',
									}}
								>
									{/*<div 
										className={this.props.imgFormControlStyle}
										style={{width:'100%'}}
										onMouseOver={(event) => this._handleIconHover(event, 'submit', true)}
										onMouseLeave={(event) => this._handleIconHover(event, 'submit', false)}>							
										<SvgIcon name={'OkIcon'} hovered={this.state.submitHovering}/>
									</div>*/}
									<Button
										//icon="cloud_upload"
										theme={["textPrimaryOnDark", "primaryBg"]}
										label='save'
										labelSize='12px'
										raised
										onClick={this.button ? e => this.button.click(e) : null}
										//style={eppCtrl_div} 
									/>
								</label>
  							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export class ItemForm extends React.Component{
	constructor(props){
		super(props);
		this.formType = {
			type1:'RETAILER TAGS',
			type2:'USER TAGS'
		}
		this.state = {
			selectedFormType:this.formType.type1,

			type1Entry:{
				retailer:'',
				item:'',
				size:'',
			},
			type1SearchSelection:{
				retailer:{},
				item:{},
				size:{},			
			},

			type2Entry:{
				retailer:'',
				apparelType:'',
				size:'',
			},
			type2SearchSelection:{
				retailer:{},
				apparelType:{},
				size:{},			
			},

			'types':[],
			'size':'',
			'retailer':'',
			'brand':'',
			'iconName':'',
		};
		this.type1EntryKeys = Object.keys(this.state.type1Entry);
		this.type2EntryKeys = Object.keys(this.state.type2Entry);
		this.prevAddedItemIds = [];

		this.hydrateType1Tasks = {
			[this.type1EntryKeys[0]]: () => ('retailer dropdown'),
			[this.type1EntryKeys[1]]: () => ('item dropdown'),
			[this.type1EntryKeys[2]]: () => ('size dropdown'),
		};
		this.hydrateType2Tasks = {
			[this.type2EntryKeys[0]]: () => ('retailer dropdown'),
			[this.type2EntryKeys[1]]: () => ('apparelType dropdown'),
			[this.type2EntryKeys[2]]: () => ('size dropdown'),
		};

		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._handleOnSubmit = this._handleOnSubmit.bind(this);
		this._handleDropdownSelected = this._handleDropdownSelected.bind(this);
		this._handleDropDownOptionSelected = this._handleDropDownOptionSelected.bind(this);
	}

	componentDidUpdate(prevProps){
		this.prevAddedItemIds = [];

		// Assuming anything added to itemAllIds are appended, so the new ids are determined from the diff in lengths
		// Extract only number type ids which represent added unpersisted items
		this.prevAddedItemIds = this.props.itemAllIds.slice(prevProps.itemAllIds.length, this.props.itemAllIds.length).filter(id => typeof id === 'number');
		this.prevAddedItemIds.length > 0 && this.props.clientInvalidateAddedItems(this.prevAddedItemIds);
	}

	_handleInputFieldChange(event, entryType='', entryObj={}, searchResultType='', searchResultObj={}){
		const entryObjKey = Object.keys(entryObj)[0];

		this.setState(prevState => {
			var entryObjectKey = Object.keys(entryObj)[0];
			prevState[entryType][entryObjectKey] = entryObj[entryObjectKey];
			
			const result = {
				...prevState,
				[entryType]:{
					...prevState[entryType],
					//...entryObj,
				},
				/**
				* Have to detect when entryObj contains retailer property because retailer
				* name in type2SearchSelection.retailer object is saved as name property.
				*/
				...(
					(/^(type2)/).test(entryType) ? 
						// Update state with entered value
						{
							type2SearchSelection: {
								...prevState.type2SearchSelection,
								[entryObjKey]: {
									...prevState.type2SearchSelection[entryObjKey],
									[(entryObjKey === 'retailer' ? 'name' : entryObjKey)]: entryObj[entryObjKey],
								}
							}
						} :
						// Clear previously selected value if input changes
						{
							type1SearchSelection: {
								...prevState.type1SearchSelection,
								[entryObjKey]: {},
							}						
						}
				),
				[searchResultType]:{
					...prevState[searchResultType],
					...searchResultObj
				}
			};

			return result;
		});
	}

	_handleOnSubmit(event){
		let matchedBrand = Object.values(this.props.brands).filter((brand) => brand.name.toLowerCase().includes(this.state.brand.toLowerCase()));
		let matchedRetailers = Object.values(this.props.retailers).filter((retailer) => retailer.name.toLowerCase().includes(this.state.retailer.toLowerCase()));
		
		let itemEntity = null;

		if(this.state.selectedFormType === "USER TAGS"){
			//Build custome user defined tag
			itemEntity = Object.assign(
				{}, 
				OxiAppConstants.EntityTemplates.ITEM, 
				{
					positionx: this.props.itemLocation.positionx,
					positiony: this.props.itemLocation.positiony,
					product: {
						...OxiAppConstants.EntityTemplates.CUSTOM_PRODUCT_TEMPLATE,
						handle: 'Custom Tag',
						udr: this.state.type2SearchSelection.retailer.name,
						uds: this.state.type2SearchSelection.size.size,
						onlineStoreUrl: 'tbd',
					},
					apparelType: this.state.type2SearchSelection.apparelType.id,
					platform:OxiAppConstants.PLATFORM,
				}
			)
		}

		else{
			let {item, size, retailer} = this.state.type1SearchSelection;
			//Build existing tag
			this.props.createSizeGroup({ [size.id]: size} );
			itemEntity = Object.assign(
				{}, 
				OxiAppConstants.EntityTemplates.ITEM, 
				{
					id: item.id,
					positionx: this.props.itemLocation.positionx,
					positiony: this.props.itemLocation.positiony,
					product: {
						...OxiAppConstants.EntityTemplates.STANDARD_PRODUCT_TEMPLATE,
						...item.itemSnippet.product,
						//size: size,
						retailer: retailer,
					},
					////Note we store size in this way rather than adding it to the product object
					////This is done to be consistent in the way that size information is read from item entities
					////in both preview and edit modes
					////sizeChartDto:{
					//	...OxiAppConstants.EntityTemplates.ITEM.sizeChartDto,
					//	sizeGroupDtos: [{
					//		...OxiAppConstants.EntityTemplates.SIZE_GROUP,
					//		...size
					//	}]
					//}
					sizeChartDto: null,
					sizeGroupId: size.id,
					//platform: item.platform,
				}
			)
		}

		console.log('itemEntity = ', itemEntity);
		this.props.submitAction(itemEntity);		
		//var isItemInvalidated = false;

		//for(let id of this.props.entitiesStateReducer.items.clientInvalidated){
		//	if(id == item.id){
		//		isItemInvalidated = true;
		//		break;
		//	}
		//}

		//if(!isItemInvalidated){
		//	console.log("item.id = " + item.id)
		//	this.props.clientInvalidateAddedItems([item.id]);
		//}

		//TODO:  	commenting out line below, but there is a need to handle the ids of server persisted items as UUID
		// 			and any newly created item id as incremented integer... maybe calling edittingItem is not needed here
		//this.props.editingItem(this.props.itemAllIds);
		
		//this.props.cancelAction();
		this.props.navToOutfitPreviewModal();
	}

	//_handleDropdownSelected(event, selectionType, valueSelected){	
	_handleDropdownSelected(event, entryType, entryObj){
		
		event.stopPropagation();
		//let {size} = entryObj;
		//size !== undefined && this.state.type1SearchSelection.item.id !== undefined ? 
		//	this.props.getSizeChartByItemId(this.state.type1SearchSelection.item.id) : 
		//	null;
	}

	_handleDropDownOptionSelected(event, selectionType='', valueObj){
		
		event.stopPropagation();		
		let {item} = valueObj;
		item !== undefined ? this.props.getSizeChartByItemId(item.id) : null

		this.setState(prevState => ({
			...prevState,
			[selectionType]:{
				...this.state[selectionType],
				...valueObj
			}
		}));
	}

	_updateApparelTypes(event, data){
		this.setState(prevState => ({
			...prevState,
			types: data
		}))
	}

	render(){
		let retailerNames = [];	
		let brandNames = [];

		const itemFormButtons = {
			position: 'relative',
			display:'inline-block',
			width:'50%',
			'vertical-align':'top',			
		}

		if(this.props.brands !== undefined && this.props.brands !== null){
			//create and array of names from the the byIds object to pass to DropDownField component
			brandNames = Object.values(this.props.brands).map((brand, ind) => {
				return (brand.name)
			});
		}

		if(this.props.retailers !== undefined && this.props.retailers !== null){
			//create and array of names from the the byIds object to pass to DropDownField component
			retailerNames = Object.values(this.props.retailers).map((retailer, ind) => {
				return (retailer.name)
			});
		}
		return(
				<CSSTransition 
					timeout={300}
					classNames="formViewContainer_div"
					in={true}
					unmountOnExit>
					<div 
						id="form_container_add_item"
						className={FormStyles.formViewContainer_div}
						style={this.props.compoundAIStyles}
					>
						<Theme use="secondary">
						<TabBar 
							style={{
								'text-align':'center', 
								height:'50px'
							}}
						> 
							<Tab			
								//className={this.state.selectedFormType === this.formType.type1 ? FormStyles['bangTab_div--selected'] : FormStyles.bangTab_div}
								onClick={event => this.setState({selectedFormType:this.formType.type1})}
								label={this.formType.type1}
								style={{height:'50px'}}
							>
							</Tab>
							<Tab
								theme="secondary"
								//className={this.state.selectedFormType === this.formType.type2 ? FormStyles['bangTab_div--selected'] : FormStyles.bangTab_div}
								onClick={event => this.setState({selectedFormType:this.formType.type2})}
								label={this.formType.type2}
								style={{height:'50px'}}
							>
							</Tab>
						</TabBar>
						</Theme>
						<CSSTransition
						    timeout={200}
						    classNames="retailerItemFormContainer"
						    in={this.state.selectedFormType === this.formType.type1}
						    unmountOnExit>	
							<ExistingItems 
								allApparelTypes={this.props.allApparelTypes}
								getSuggestion={(uri) => this.props.getSuggestion(uri)}
								fieldsObj={this.state.type1Entry} 
								hydrateTasks={this.hydrateType1Tasks}
								handleInputFieldChange={(event, entryObj, searchResultObj) => this._handleInputFieldChange(event, 'type1Entry', entryObj, 'type1SearchPromise', searchResultObj)}
								handleDropdownSelected={(event, entryObj, searchResultObj) => this._handleDropdownSelected(event, 'type1Entry', entryObj, 'type1SearchPromise', searchResultObj)}
								handleDropdownOptionSelected={(event, valueObj) => this._handleDropDownOptionSelected(event, 'type1SearchSelection', valueObj) } 
								setKeyboardShown={this.props.setKeyboardShown}
							/>
						</CSSTransition>
						<CSSTransition
						    timeout={200}
						    classNames="userItemFormContainer"
						    in={this.state.selectedFormType === this.formType.type2}
						    unmountOnExit>	
							<CustomItems 
								allApparelTypes={this.props.allApparelTypes}
								updateApparelTypes ={(data) => this._updateApparelTypes(data)}
								getApparelTypes={(uri) => this.props.getApparelTypes(uri)}
								getSuggestion={(uri) => this.props.getSuggestion(uri)}
								fieldsObj={this.state.type2Entry}
								hydrateTasks={this.hydrateType2Tasks}
								handleInputFieldChange={(event, entryObj, searchResultObj) => this._handleInputFieldChange(event, 'type2Entry', entryObj, 'type2SearchPromise', searchResultObj)}
								handleDropdownSelected={(event, entryObj, searchResultObj) => this._handleDropdownSelected(event, 'type2Entry', entryObj, 'type2SearchPromise', searchResultObj)}
								handleDropdownOptionSelected={(event, valueObj) => this._handleDropDownOptionSelected(event, 'type2SearchSelection', valueObj) }
								setKeyboardShown={this.props.setKeyboardShown}
							/>
						</CSSTransition>
						<div className={FormStyles.addItemCtrlContainer_div}>

							{/*<div className={FormStyles.addItem_div}>
								<div className={FormStyles.formL3Button} onClick={(event) => {this._handleOnSubmit(event)}}>
									{this.props.submitContext}
								</div>
							</div>*/}
							<Button
								theme="primary"
	 							icon="arrow_back"
								label="back"
								onClick={(event) => this.props.navToOutfitPreviewModal()}
							/>
							<Button
								theme={["textPrimaryOnDark", "primaryBg"]}
								unelevated
								trailingIcon="arrow_forward"
								label="add"
								onClick={(event) => this._handleOnSubmit(event)}								
							/>

							{/*<div style={{width:'100%'}}>
								<div className={FormStyles.cancelSelection_div}>
									<div 
										className={FormStyles.l1Button_div}
										style={{
											'text-align': 'right', 
											right: '17px'
										}}
										onClick={(event) => {
											//this.props.cancelAction;
											this.props.navToOutfitPreviewModal();
										}}
									>
										cancel
									</div>
								</div>
							</div>*/}
						</div>
					</div>
				</CSSTransition>
		);
	}
}

class ExistingItems extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		};
	}

	render(){
		const onInputChange = (event, key) => {
			this.props.handleInputFieldChange(event, {[key]: event.target.value}, null);
		
			if(key === 'item'){ this.props.getSuggestion(encodeURI(`${OxiAppConstants.routeURIs.search.a}?retailer=${this.props.fieldsObj['retailer']}&term=${event.target.value}`)); }
			else if(key === "retailer"){ this.props.getSuggestion(encodeURI(`${OxiAppConstants.routeURIs.search.b}?term=${event.target.value}`)); }
			else if(key === "size"){  }							
		}

		return(
				<form className={FormStyles.addItemForm} action="" method="POST" autocomplete="off">
					{
						Object.keys(this.props.fieldsObj).map((key, ind) => {
							console.log('key = ', key, ', fieldsObj = ', this.props.fieldsObj);
							return(
								<DropDownField 
									key={key}
									context={0}
									fieldType={key} 
									onInputChange={(event) => {
										onInputChange(event, key);
									}} 
									inputValue={this.props.fieldsObj[key]}
									dropdownItemIds={null}
									allApparelTypes={this.props.allApparelTypes}
									dropdownSelected={(event, value) => this.props.handleDropdownSelected(event, {[key]: value})}
									dropdownOptionSelected = {(event, value) => this.props.handleDropdownOptionSelected(event, {[key]: value})}
									hydrateTask={this.props.hydrateTasks[key]}
									style={{height:'50px'}}
									setKeyboardShown={this.props.setKeyboardShown}				
								/>
							);
						})
					}
				</form>
		);
	}
}

class CustomItems extends React.Component{
	constructor(props){
		super(props);
		this._getSuggestion = this._getSuggestion.bind(this);
		this.state = {
			filteredApparelTypes: null
		}
	}

	_getSuggestion(event, term){
		let filteredApparelTypes = (term !== null || term !== undefined) ? 
			this.props.allApparelTypes.filter((apparelType) => apparelType.name.toLowerCase().includes(term.toLowerCase())) : 
			null;

		this.setState(prevState => ({
			...prevState,
			filteredApparelTypes: filteredApparelTypes,
		}))
	}

	render(){
		return(
				<form className={FormStyles.addItemForm} action="" method="POST" autocomplete="off">

					{
						Object.keys(this.props.fieldsObj).map((key, ind) => (
							<DropDownField 
								key={ind}
								context={1}
								fieldType={key} 
								filteredApparelTypes={this.state.filteredApparelTypes === null ? (this.props.allApparelTypes) : (this.state.filteredApparelTypes)}
								onInputChange={(event) => {
									if(key === 'retailer'){ this.props.getSuggestion(encodeURI(`${OxiAppConstants.routeURIs.search.c}?retailer=${event.target.value}`)); }
									else if(key === "apparelType"){/*this.props.apparelTypes.values/* this._getSuggestion(event, event.target.value);*/ }
									else if(key === "size"){ this.props.getSuggestion(encodeURI(`${OxiAppConstants.routeURIs.search.d}?size=${event.target.value}`)); }
									this.props.handleInputFieldChange(event, {[key]: event.target.value}, null);
								}} 
								inputValue={this.props.fieldsObj[key]}
								dropdownItemIds={null}
								dropdownNames={Object.keys(OxiAppConstants.ItemTypesByIconName)}
								dropdownSelected={(value) => {
									if(key === 'apparelType' && this.props.allApparelTypes.length === 0){
										this.props.getApparelTypes(encodeURI(`${OxiAppConstants.appUris.a}`));
									}
									this.props.handleDropdownSelected(event, {[key]: value})
								}}								
								dropdownOptionSelected = {(event, value) => this.props.handleDropdownOptionSelected(event, {[key]: value})}
								hydrateTask={this.props.hydrateTasks[key]}
								style={{height:'50px'}}
								setKeyboardShown={this.props.setKeyboardShown}					
							/>
						))
					}
				</form>
		)
	}
}


export class DiscardForm extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let denormOutfit = null;
		console.log('denormOutfit = ', denormOutfit)

		return(
			<div className={Styles.modal} style={this.props.customStyles}>
				<Elevation 
					z={10}
					style={{
						width: 'auto',
    					display: 'flex',
    					'align-items': 'center',
    					'justify-content': 'center',
    					height: 'auto',
					}}
				>
					<div 
						id="form_container_add_item" 
						className={FormStyles.discardFormViewContainer_div}
					>
						<div id="prompt">
							<div style={{'text-align':'center','width':'75%','margin':'auto','margin-bottom':'60px'}}>
								<div style={{'text-align':'left'}}>
									<p style={{color: '#353535'}}> { this.props.message } </p>
								</div>
							</div>
							<div style={{
								width:'75%',
								margin: 'auto',
								position: 'relative',
								height: '36px'
							}}>
								<Button 
									//className={FormStyles.formL3Button} 
									style={{position:'absolute', left:'0px', top:'0px'}} 
									label="continue"
									unelevated
									onClick={() => {
										this.props.submitAction(this.props.requestedNav, this.props.isOverlay);
										this.props.clearUpdates();
										this.props.clearInvalidations();
									}}
								/>
								<Button 
									//className={FormStyles.formL3Button} 
									style={{position:'absolute', right:'0px', top:'0px'}} 
									label="cancel"
									outlined
									onClick={(event) => {
										event.stopPropagation();
										this.props.cancelAction(OxiAppConstants.FormType.DISCARD_EDITS, this.props.isOverlay);
									}}
								/>
							</div>
						</div>
					</div>
				</Elevation> 
			</div>
		);
	}
}


const InvalidPasswordPrompt = ({props}) => (
	<div className={CreateAccountStyles.invalidInputPrompt_div}>
		{
			!props.validPasswordLength ? 
				(
					<div className={CreateAccountStyles.invalidMessageContainer_div}>
						<div className={CreateAccountStyles.invalidMessage_div}>
							At least 10 characters
						</div>
					</div>
				) : 
				null
		}
		{
			!props.validPasswordUppercase ? 
				(
					<div className={CreateAccountStyles.invalidMessageContainer_div}>
						<div className={CreateAccountStyles.invalidMessage_div}>
							At least 1 uppercase character
						</div>
					</div>
				) : 
				null
		}
		{
			!props.validPasswordLowercase ? 
				(
					<div className={CreateAccountStyles.invalidMessageContainer_div}>
						<div className={CreateAccountStyles.invalidMessage_div}>
							At least 1 lowercase character
						</div>
					</div>
				) : 
				null
		}
		{
			!props.validPasswordNumber ? 
				(
					<div className={CreateAccountStyles.invalidMessageContainer_div}>
						<div className={CreateAccountStyles.invalidMessage_div}>
							At least 1 number
						</div>
					</div>
				) : 
				null
		}
	</div>
)

//TODO:  Make sure to perfom server side validation as well.
const validateEmail = (email) => {
	// TODO: this regex used as a value for rmwc TextField's pattern prop throws an error: Invalid expression... Lone quantifier brackets
    //regular expression that accepts unicode
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

export const CreateAccountField = ({props}) => {
	var isValid = true;

	const {
		onChange,
		onSelect,
	} = props;
	
	const {
		fieldCompleteness,
		name,
	} = props;
	
	for(let requirement in fieldCompleteness[name]){
		if(!fieldCompleteness[name][requirement]){
			isValid = false;
			break;
		}
	}

	return (
		<div className={CreateAccountStyles.inputContainer_div}>
			<TextField
				//style={CreateAccountStyles.inputTextContainer_div}
				style={{width: '100%'}}
				theme="secondary"
				outlined
				label={name}
				onChange={onChange}
				//invalid={Object.keys(fieldCompleteness[name]).reduce((accum, req) => (!fieldCompleteness[name][req] && accum), true)}
				invalid={!isValid}
				onFocus={onSelect}
			/>
			{/*<InputTextFieldAccount props={{
				containerStyle: CreateAccountStyles.inputTextContainer_div, 
				inputStyle: (props.selectedFieldName === props.name ? CreateAccountStyles['inputText_input--selected'] : CreateAccountStyles.inputText_input), 
				name: props.name, 
				placeholder: props.placeholder, 
				onChange: props.onChange,
				onSelect: props.onSelect,
				selectedFieldName: props.selectedFieldName
			}}/>
			<div className={CreateAccountStyles.validatorIconContainer_div}>
				<div className={CreateAccountStyles.validatorIcon_div}>
					{
						props.isValid ? 
							<SvgIcon name='OkIcon' fill='#6dd7b4'/> :
							<div style={{
								width:'10px', 
								height:'10px', 
								'border-radius':'5px', 
								'background-color':'#b46262', 
								position:'absolute', 
								top: '10px',
								left: 'calc(50% - 5px)'
							}} />
					}
				</div>
			</div>*/}
		</div>
	);
}

export class CreateAccountForm extends React.Component{
	constructor(props){
		super(props);

		let sharedState = {
			fieldValues:{
				'email':'',
				'username':'',
				'password':'',
			},
			fieldPlaceHolders:{
				'email':'Email',
				'username':'Username',
				'password':'Password',
			},
			fieldCompleteness:{
				email:{
					'validEmailSyntax': false,
				},
				username:{
					'validUsername': true,
				},
				password:{
					'validPasswordLength': false,
					'validPasswordUppercase': false,
					'validPasswordNumber': false,
					'validPasswordLowercase': false,
				},
			},
			'selectedFieldName': ''		
		};

		this.state = this.props.accountType === 'shopper' ? 
			({
				...sharedState,
			}) :
			this.props.accountType === 'retailer' ? 
				({
					...sharedState,
					fieldValues: {
						...sharedState.fieldValues,
						'country':'',
						'state':'',
						'city':'',
						'address1':'',
						'address2':'',
					},
					fieldPlaceHolders:{
						...sharedState.fieldPlaceHolders,
						'username': 'Company Name',
						'email': 'Company Email',
						'country':'Country',
						'state':'State',
						'city':'City',
						'address1':'Address 1',
						'address2':'Address 2',						
					},
					fieldCompleteness:{
						...sharedState.fieldCompleteness,
						'country':{},
						'state':{},
						'city':{},
						'address1':{},
						'address2':{},
					}
				}) :
				({
					...sharedState,
				});

		this._handleOnSubmit = this._handleOnSubmit.bind(this);
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._handleInputSelect = this._handleInputSelect.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
	}

	_handleOnSubmit(){

		const {validEmailSyntax} = this.state.fieldCompleteness.email;
		const {validPasswordLength, validPasswordLowercase, validPasswordNumber, validPasswordUppercase} = this.state.fieldCompleteness.password;
		const {validUsername} = this.state.fieldCompleteness.username;

		if(validEmailSyntax && (validPasswordLength && validPasswordLowercase && validPasswordNumber && validPasswordUppercase) && validUsername){
			if(this.props.accountType === 'shopper'){
				this.props.createUser(this.state.fieldValues);
			}
			else if (this.props.accountType === 'retailer'){
				this.props.createCompany(this.state.fieldValues);
			}
		}
		//Clear email password and username from react state
		//this.setState({
		//	'email':'',
		//	'password':'',
		//	'username':''
		//});
	}

	validatePassword(password) {
		let validPasswordLength = false;
		let validPasswordUppercase = false;
		let validPasswordNumber = false;
		let validPasswordLowercase = false;
		//At least one lowercase character
		if ((/[a-z]/g).test(password)){
			validPasswordLowercase = true
		}
		//At least one uppercase character
		if ((/[A-Z]/g).test(password)){
			validPasswordUppercase = true;
		}
		//At least one digit in password
		if ((/[0-9]/g).test(password)){
			validPasswordNumber = true
		}
		//At least 10 characters long
		if (password.length >= 10){
			validPasswordLength = true;
		}

		this.setState(prevState => ({
			...prevState,
			fieldCompleteness:{
				...prevState.fieldCompleteness,
				password:{
					...prevState.fieldCompleteness.password,
					'validPasswordLength': validPasswordLength,
					'validPasswordUppercase': validPasswordUppercase,
					'validPasswordNumber': validPasswordNumber,
					'validPasswordLowercase': validPasswordLowercase,	
				}
			}	
		}));
	}

	_handleInputFieldChange(field, value){
		this.setState(prevState => ({
			...prevState,
			fieldValues:{
				...prevState.fieldValues,
				[field]: value,
			}
		}));

		switch(field){
			case 'email':
				let isEmailValid = validateEmail(value);
				this.setState(prevState => ({
					...prevState,
					fieldCompleteness:{
						...prevState.fieldCompleteness,
						[field]:{
							validEmailSyntax: isEmailValid,
						}
					}
				}));
				break;
			case 'password':
				this.validatePassword(value);
				break;
			case 'username':
				break;
			default:
				break
		}

	}

	_handleInputSelect(name, e){
		console.log('_handleInputSelect triggered')
		this.setState(prevState => ({
			selectedFieldName: name
		}))
	}

	render(){
		return(
			<div style={{display: 'flex', 'justify-content':'center'}}>
				<div className={CreateAccountStyles.accountFormContainer_div}>
					<div>
						{
							(<form action="" method="POST">
								<div className={CreateAccountStyles.formContent_div}>
									{
										Object.keys(this.state.fieldValues).map((field, ind) => {
											const fieldValidReducer = (accumulator, currentValue) => (accumulator && this.state.fieldCompleteness[field][currentValue]);
											return(
												<React.Fragment>
													<CreateAccountField 
														props={{
															key:ind,
															name:field, 
															placeholder:this.state.fieldPlaceHolders[field], 
															onChange: (e) => this._handleInputFieldChange(field, e.target.value),
															selectedFieldName: this.state.selectedFieldName,
															onSelect: (e) => this._handleInputSelect(field, e),
															isValid: Object.keys(this.state.fieldCompleteness[field]).reduce(fieldValidReducer, true),
															fieldCompleteness: this.state.fieldCompleteness,
														}}/>
													{
														field === 'password' ? 
															(<div 
																//style={{height:'68px', 'padding-top':'10px'}}
																className={CreateAccountStyles.invalidInputPromptContainer_div}
															>
																{
																	!(this.state.fieldCompleteness[field].validPasswordLength && 
																		this.state.fieldCompleteness[field].validPasswordLowercase && 
																		this.state.fieldCompleteness[field].validPasswordNumber && 
																		this.state.fieldCompleteness[field].validPasswordUppercase) ?
																		<InvalidPasswordPrompt props={{
																			validPasswordLength: this.state.fieldCompleteness[field].validPasswordLength,
																			validPasswordUppercase: this.state.fieldCompleteness[field].validPasswordUppercase,
																			validPasswordLowercase: this.state.fieldCompleteness[field].validPasswordLowercase,
																			validPasswordNumber: this.state.fieldCompleteness[field].validPasswordNumber
																		}}/> :
																		null
																}
															</div>) : 
															null
													}
												</React.Fragment>
											);
										})
									}
									<div 
										//className={CreateAccountStyles.inputContainer_div} 
										className={CreateAccountStyles.submitContainer_div}
										//style={{
										//	'margin-top':'35px', 'height':'30px',

										//}}
									>
										<div className={CreateAccountStyles.termsTextContainer_div}>
											{/*<div className={CreateAccountStyles.inputAcceptTermsContainer_div}>
												<div className={CreateAccountStyles.inputAcceptTerms_div}>
													<input type='checkbox' className={CreateAccountStyles.inputAcceptTerms_checkbox}>
													</input>
												</div>
											</div>*/}
											<div className={CreateAccountStyles.textAcceptTermsContainer_div}>
												<div className={CreateAccountStyles.textAcceptTerms_div}>
													<p>By clicking submit, you are agreeing to the <a style={{color:'var(--color6)'}}>Fitsee Terms of Service</a></p>
												</div>
											</div>
										</div>
										<div
											id="accountSubmitBtn_div"
											//style={{
											//	display: 'flex',
											//	'justify-content':'center',
											//	'margin-top': '15px',
											//}}
										>
											<Button
												theme={["textPrimaryOnDark", "primaryBg"]}
												label="submit"
												raised
												onClick={(e) => {
													e.preventDefault();
													logout();
													this._handleOnSubmit();
												}} 
											/>
										</div>
										{/*<div className={CreateAccountStyles.submitBtnContainer1_div}>										
											<div className={CreateAccountStyles.submitBtnContainer_div}>
												<div
													className={CreateAccountStyles.submitBtn_div} 
													onClick={
														() => {
															logout();
															this._handleOnSubmit()
														}
													} 
													style={{'text-align':'center'}}>
													SUBMIT
												</div>
											</div>
										</div>*/}
									</div>
								</div>
							</form>)
						}
					</div>
				</div>
			</div>
		);
	}
}

export default FormDeck