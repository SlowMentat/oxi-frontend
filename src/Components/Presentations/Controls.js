import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.css';
import ControlStyles from '../../controls.css';
import Styles from '../../root.css';
//import {sendAsyncRequest/*, OxiAppConstants*/} from '../../App.js';
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


/*
* This is an outlined form control button with a graphic icon adjacent to the button's title.  
* Unlike the DynamicIconButton, this button shows its title regardles of its hover state.
*/
class StaticIconButton extends React.Component{
	constructor(props){
		super(props);

		this.state={
			isHovered: false,
		}

		this._handleMouseLeave = this._handleMouseLeave.bind(this);
		this._handleMouseOver = this._handleMouseOver.bind(this);
	}

	_handleMouseLeave(event){
		this.setState(prevState => ({
			...prevState,
			isHovered: false
		}))
	}

	_handleMouseOver(event){
		this.setState(prevState => ({
			...prevState,
			isHovered: true
		}))
	}

	render(){
		var { 
			ligature,
			ligatureStyles,
			ligatureContainerStyles,
		} = this.props;
		return(
			<div
				className={ControlStyles.sib_div}
				style={
					Object.assign({
						//color:'unset',
						color: '#565656',
						//'border':`solid ${this.props.borderWidth}px ${this.props.borderColor}`,
						'--button-height':`${this.props.buttonHeight}px`,
						//'width':'unset',
					}, this.props.customButtonStyles)
				}
				onClick={(event) => this.props.onClickHandler(event)}
				onMouseOver={(event) => this._handleMouseOver(event)}
				onMouseLeave={(event) => this._handleMouseLeave(event)} >
				{
					ligature.length > 0 ? 
						(
							<div className={ControlStyles.ligatureContainer_div} style={ligatureContainerStyles} >
								<i class="material-icons" style={ligatureStyles}>{ligature}</i>
							</div>
						) :
						(<SvgIcon 
							className={ControlStyles.sibIcon_svg}
							style={this.props.iconStyles}
							name={this.props.iconName} 
							hovered={null/*this.state.discardHovering*/}/>)
				}
				<div 
					className={ControlStyles.sibTitle_div} 
				>
					{this.props.title}
				</div>
			</div>
		);
	}
}

StaticIconButton.propTypes = {
	title: PropTypes.string,
	iconName: PropTypes.string,
	borderColor: PropTypes.string,
	borderWidth: PropTypes.oneOfType([
		PropTypes.number, 
		PropTypes.string
	]),
	buttonHeight: PropTypes.number,
	onClickHandler: PropTypes.func,
	//onHoverHandler: PropTypes.func,
	customButtonStyles: PropTypes.Object,
	iconStyles: PropTypes.Object,
	buttonPadding: PropTypes.number,
	ligature: PropTypes.string,
	ligatureStyles: PropTypes.Object,
	ligatureContainerStyles: PropTypes.Object,
}

StaticIconButton.defaultProps = {
	title: 'unset',
	iconName: '',
	borderColor: '#969696',
	borderWidth: 0,
	buttonHeight: 24,
	onClickHandler: (event) => console.log('non onClick event handler provided'),
	//onHoverHandler: (event) => console.log('non onHover event handler provided'),
	customButtonStyles: {},
	iconStyles: {
		display:'inline-block',
   		width: 'var(--button-line-height)',
   		//'padding-bottom': '4px',
   		height: 'var(--button-line-height)',
	},
	buttonPadding: 0,
	ligature:'',
	ligatureStyles: {color: 'black'},
	ligatureContainerStyles: {}
}


/*
* This is an outlined form control button with a graphic icon initially shown.  
* On hover, the button's width expands to show the button title indicating it's function.
*/
class DynamicIconButton extends React.Component{
	constructor(props){
		super(props);

		this.state={
			isHovered: false,
		}

		this._handleMouseLeave = this._handleMouseLeave.bind(this);
		this._handleMouseOver = this._handleMouseOver.bind(this);
	}

	_handleMouseLeave(event){
		this.setState(prevState => ({
			...prevState,
			isHovered: false
		}))
	}

	_handleMouseOver(event){
		this.setState(prevState => ({
			...prevState,
			isHovered: true
		}))
	}

	render(){

		var { 
			ligature,
			ligatureStyles
		} = this.props;

		return(
			<CSSTransition
			    tiemout={600}
			    classNames="dib_div"
			    in={this.state.isHovered}
			     >
				<div
					className={ControlStyles.dib_div}
					style={
						Object.assign({
							'--button-border-width': `${this.props.borderWidth}px`,
							'--button-border-color': `${this.props.borderColor}`,
							//'border':`solid  ${this.props.borderColor}`,
							'--button-height':`${this.props.buttonHeight}px`,
							'--expanded-width': `${this.props.expandedWidth}px`
						}, this.props.customButtonStyles)
					}
					onClick={(event) => this.props.onClickHandler(event)}
					onMouseOver={(event) => this._handleMouseOver(event)}
					onMouseLeave={(event) => this._handleMouseLeave(event)} >	
					{
						ligature.length > 0 ? 
							(<i class="material-icons" style={ligatureStyles}>{ligature}</i>) :
							(<SvgIcon 
								className={ControlStyles.dibIcon_svg}
								style={this.props.iconStyles}
								name={this.props.iconName} 
								hovered={null/*this.state.discardHovering*/}/>)
					}
					<div 
						className={ControlStyles.dibTitle_div} 
					>
						{this.props.title}
					</div>
				</div>
			</CSSTransition>
		);
	}
}

DynamicIconButton.propTypes = {
	...StaticIconButton.propTypes,
	expandedWidth: PropTypes.number,
}

DynamicIconButton.defaultProps = {
	...StaticIconButton.defaultProps,
	borderColor: '#cacaca',
	borderWidth: 1,
	expandedWidth: 100,
}



/*
* This is an outlined form control button with a graphic icon initially shown.  
* On hover, the button's title (indicating it's function) will appeare above (NORTH), below (SOUTH), to the left of (WEST), or to the right of (EAST) the button.
*/
class PopupIconButton extends React.Component{
	constructor(props){
		super(props);

		this.state={
		}

		this.leftAlign = '0px';
		this.topAlign = '0px';
		this.adjust = ((this.props.buttonHeight - this.props.textHeight) / 4);

		switch(this.props.puDirection){
			case 'NORTH':
				this.topAlign = `calc(${-1*this.props.buttonHeight}px - ${this.adjust}px + ${(this.props.customButtonStyles['margin-top'] ? this.props.customButtonStyles['margin-top'] : 0)})`; //Last term is needed to account for margin-top styling on parent element
				break;
			case 'SOUTH':
				this.topAlign = `calc(${this.props.buttonHeight}px + ${this.adjust}px)`;
				break;
			case 'WEST':
				this.leftAlign = `calc(-100% - ${this.props.buttonHeight}px - ${this.adjust}px)`; //button height = button width here
				break;
			case 'EAST':
				this.leftAlign = `calc(100% + ${this.adjust}px)`
				break;
			default:
				break;
		}

		this._handleMouseLeave = this._handleMouseLeave.bind(this);
		this._handleMouseOver = this._handleMouseOver.bind(this);
	}

	_handleMouseLeave(event){
		//event.stopPropagation();
		this.setState(prevState => ({
			...prevState,
			isHovered: false
		}))
	}

	_handleMouseOver(event){
		//event.stopPropagation();
		this.setState(prevState => ({
			...prevState,
			isHovered: true
		}))
	}

	render(){

		var { ligature, ligatureStyles } = this.props;

		return(
			<div
				className={ControlStyles.pib_div}
				style={
					Object.assign({
						//'border':`solid ${this.props.borderWidth}px ${this.props.borderColor}`,
						'--button-height':`${this.props.buttonHeight}px`,
						'--button-padding':`${this.props.buttonPadding}px`,
						'--pu-text-left-align-hover': this.leftAlign,
						'--pu-text-top-align-hover': this.topAlign,
						'--pu-text-height': `${this.props.textHeight}px`,
						'--pu-text-padding': `${this.props.textPadding}px`,
					}, this.props.customButtonStyles)
				}
				onClick={(event) => this.props.onClickHandler(event)}
				onMouseOver={(event) => this._handleMouseOver(event)}
				onMouseLeave={(event) => this._handleMouseLeave(event)} >	
				{
					ligature.length > 0 ? 
						(<i class="material-icons" style={ligatureStyles}>{ligature}</i>) :
						(<SvgIcon 
							className={ControlStyles.pibIcon_svg}
							style={this.props.iconStyles}
							name={this.props.iconName} 
							hovered={null/*this.state.discardHovering*/}/>)
				}				
				
				<CSSTransition
					tiemout={600}
					classNames="pibTitle_div"
					in={this.state.isHovered}
					 >
					<div 
						className={ControlStyles.pibTitle_div} 
						style={{
							'background-color': this.props.textBackgroundColor,
						}}
					>
						{this.props.title}
					</div>
				</CSSTransition>
			</div>
		);
	}
}

PopupIconButton.propTypes = {
	...StaticIconButton.propTypes,
	puDirection: PropTypes.oneOf(['NORTH', 'SOUTH', 'EAST', 'WEST']),
	textHeight: PropTypes.number,
	textPadding: PropTypes.number,
	textBackgroundColor: PropTypes.string,
}

PopupIconButton.defaultProps = {
	...StaticIconButton.defaultProps,
	puDirection: 'SOUTH',
	borderColor: '#cacaca',
	borderWidth: 1,
	textHeight: 17,
	textPadding: 0,//3,
	textBackgroundColor: '#4a4547',
	iconStyles:{		
   		width:'100%',
   		height:'100%',
   		padding:'4px',
	},
}



/*
* This is a static icon button with toggle functionality. 
*/
class StaticIconToggle extends React.Component{
	constructor(props){
		super(props);

		this.state={
			isActive: false,
		}

		this._handleToggled = this._handleToggled.bind(this);
	}

	_handleToggled(event, overrideValue){
		this.setState(prevState => ({
			...prevState,
			isActive: (overrideValue !== null || overrideValue !== undefined) ? 
				(overrideValue) :
				(!this.state.isActive)
		}))
	}

	render(){

		var { ligature } = this.props;

		return(
			<StaticIconButton { ...Object.assign( {}, this.props, { title :(this.props.isToggleActive ? this.props.toggleActiveTitle : this.props.toggleInactiveTitle) } ) } />
		);
	}
}

StaticIconToggle.propTypes = {
	...StaticIconButton.propTypes,
	toggleActiveTitle: PropTypes.string,
	toggleInactiveTitle: PropTypes.string,
	isToggleActive: PropTypes.bool,
}

StaticIconToggle.defaultProps = {
	...StaticIconButton.defaultProps,
	toggleActiveTitle: 'toggle',
	toggleInactiveTitle: '!toggle',
	isToggleActive: false,
}



class SubmitButton extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div
				className={ControlStyles.l3Button}
				style={
					Object.assign({
						//'border':`solid ${this.props.borderWidth}px ${this.props.borderColor}`,
						'--button-height':`${this.props.buttonHeight}px`
					}, this.props.customButtonStyles)
				}
				//onClick={this.props.onClickHandler}
				//onMouseOver={(event) => this._handleMouseOver(event)}
				//onMouseLeave={(event) => this._handleMouseLeave(event)} 
				>
					{this.props.title}
			</div>
		);
	}
}


SubmitButton.propTypes = {
	...StaticIconButton.propTypes,
}

SubmitButton.defaultProps = {
	...StaticIconButton.defaultProps,
	borderColor: DynamicIconButton.defaultProps.borderColor,
	borderWidth: DynamicIconButton.defaultProps.borderWidth,
	//borderColor: '#cacaca',
	//borderWidth: 1,
}


export class Button extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		let button = null;
		switch(this.props.buttonType){
			case OxiAppConstants.ControlConstants.ButtonTypes.a:
				button = <StaticIconButton {...this.props} />
				break;
			case OxiAppConstants.ControlConstants.ButtonTypes.b:
				button = <DynamicIconButton {...this.props} />
				break;
			case OxiAppConstants.ControlConstants.ButtonTypes.c:
				button = <StaticIconToggle {...this.props} /> 
				break;
			case OxiAppConstants.ControlConstants.ButtonTypes.d:
				button = <SubmitButton {...this.props} /> 
				break;
			case OxiAppConstants.ControlConstants.ButtonTypes.e:
				button = <PopupIconButton {...this.props} /> 
				break;
			default:
				break;
		}
		return(button);
	}
}
