import React from 'react';
import PropTypes from 'prop-types';

/*DEPRECATED*/

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
		this.setupRootRef = this.setupRootRef.bind(this);
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

	setupRootRef(el){
		const { innerRootRef } = this.props;
		//invokes innerRootRef callback passing reference to root eleement
		innerRootRef ? innerRootRef(el) : null;
	}

	render(){

		var { 
			ligature,
			ligatureStyles,
			ligatureContainerStyles,
			iconOutlined,
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
				ref={this.setupRootRef}
				onClick={(event) => this.props.onClickHandler(event)}
				onMouseOver={(event) => this._handleMouseOver(event)}
				onMouseLeave={(event) => this._handleMouseLeave(event)} >
				{
					ligature.length > 0 ? 
						(
							<div className={ControlStyles.ligatureContainer_div} style={ligatureContainerStyles} >
								<i class={(iconOutlined ? "material-icons-outlined" : "material-icons")} style={ligatureStyles}>{ligature}</i>
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
	iconOutlined: PropTypes.bool,
	innerRootRef: PropTypes.func,
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
	ligatureContainerStyles: {},
	iconOutlined: false,
	innerRootRef: (el) => null,
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
	//toggleStateCallback: PropTypes.func,
}

StaticIconToggle.defaultProps = {
	...StaticIconButton.defaultProps,
	toggleActiveTitle: 'toggle',
	toggleInactiveTitle: '!toggle',
	isToggleActive: false,
	//toggleStateCallback: undefined //if toggleStateCallback is provided this means the toggle state will be handled externally, otherwise manage toggle state within this component
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



const defaultProps ={

}

function _handleTouchStart(event, onAction){
	//record position of first touch

	event.preventDefault();
	console.log('touchstart.');
	var touches = event.changedTouches;

	for(let i = 0; i < touches.length; i++){
		console.log('touchstart: " + i + ".."');
		this.ongoingTouches.push(copyTouch(touches[i]));
		console.log('touchstart: ' + i + '.');
	}

	//save the initial touch info
	this.setState(prevState => ({
		initialTouches : [...this.ongoingTouches],
	}));
}

function _handleTouchMove(event){
	//update net change in x position of touch

	event.preventDefault();
	var touches = event.changedTouches;
	var index = ongoingTouchIndexById(touches[0].identifier);
	var deltaX = this.ongoingTouches[index].pageX - this.state.ongoingTouches[index];

	//If net change in x is above startThreshold, 
	//then begin translating element in the direction and magnitude current change in x
	if(Math.abs(deltaX) >  this.minSwipeX && Math.abs(deltaX) < this.maxSwipeX && Math.abs(deltaX) < this.maxVelocityX){
		//x translate the target element
		//NOTE:  	not sure how to do this without triggering component re-render on everysingle touchMove, which seems like it would be overkill
		//			doing nothing for now
	}

	//if net change in x is above slideStick threshold,
	//then slide element completely and force touchCancel
	else{
		//make sure the user is swiping in the correct direction wrt. current view
		if((this.state.isMeasurement && deltaX > 0) || (!this.state.isMeasurement && deltaX < 0)){
			this.setState(prevState => ({
				...prevState,
				isMeasurement: !prevState.isMeasurement,
			}));
		}
	}

	//for(let i = 0; i < touches.length; i++){
	//	var index = ongoingTouchIndexById(touches[i].identifier);
	//}
}

function _handleTouchCancel(event){
	event.preventDefault();
	console.log('canceling touch');
	var touches = event.changedTouches;

	for(let i = 0; i < touches.length; i++){
		var index = ongoingTouchIndexById(touches[i].identifier, this.ongoingTouches);
		this.ongoingTouches.splice(index);
	}
}

function _handleTouchEnd(event){
	event.preventDefault();

}


/*
*	Description:		getHandlers taken from dogfessional/react-swipeable
*	initial Author: 	Brian Emil Hartz
*	Modifiing Author: 	Deven Bryant
*	link: 				https://github.com/dogfessional/react-swipeable/blob/master/src/index.js
*/
function getHandlers(set, handlerProps) {
	const onStart = event => {
		// if more than a single touch don't track, for now...
		if (event.touches && event.touches.length > 1) return

		set((state, props) => {
			// setup mouse listeners on document to track swipe since swipe can leave container
			if (props.trackMouse) {
				document.addEventListener(mouseMove, onMove)
				document.addEventListener(mouseUp, onUp)
			}
			const { clientX, clientY } = event.touches ? event.touches[0] : event
			const xy = rotateXYByAngle([clientX, clientY], props.rotationAngle)
			return {
				...state,
				...initialState,
				eventData: { initial: [...xy] },
				xy,
				start: event.timeStamp || 0
			}
		})
	}

	const onMove = event => {
		set((state, props) => {
			if (!state.xy[0] || !state.xy[1] || (event.touches && event.touches.length > 1)) {
				return state
			}
			const { clientX, clientY } = event.touches ? event.touches[0] : event
			const [x, y] = rotateXYByAngle([clientX, clientY], props.rotationAngle)
			const deltaX = state.xy[0] - x
			const deltaY = state.xy[1] - y
			const absX = Math.abs(deltaX)
			const absY = Math.abs(deltaY)
			const time = (event.timeStamp || 0) - state.start
			const velocity = Math.sqrt(absX * absX + absY * absY) / (time || 1)

			// if swipe is under delta and we have not started to track a swipe: skip update
			if (absX < props.delta && absY < props.delta && !state.swiping) return state

			const dir = getDirection(absX, absY, deltaX, deltaY)
			const eventData = { ...state.eventData, event, absX, absY, deltaX, deltaY, velocity, dir }

			props.onSwiping && props.onSwiping(eventData)

			// track if a swipe is cancelable(handler for swiping or swiped(dir) exists)
			// so we can call preventDefault if needed
			let cancelablePageSwipe = false
			if (props.onSwiping || props.onSwiped || props[`onSwiped${dir}`]) {
				cancelablePageSwipe = true
			}

			if (
				cancelablePageSwipe &&
				props.preventDefaultTouchmoveEvent &&
				props.trackTouch &&
				event.cancelable
			)
				event.preventDefault()

			return { ...state, eventData, swiping: true }
		})
	}

	const onEnd = event => {
		set((state, props) => {
			let eventData
			if (state.swiping) {
				eventData = { ...state.eventData, event }

				props.onSwiped && props.onSwiped(eventData)

				props[`onSwiped${eventData.dir}`] && props[`onSwiped${eventData.dir}`](eventData)
			}
			return { ...state, ...initialState, eventData }
		})
	}

	const cleanUpMouse = () => {
		// safe to just call removeEventListener
		document.removeEventListener(mouseMove, onMove)
		document.removeEventListener(mouseUp, onUp)
	}

	const onUp = e => {
		cleanUpMouse()
		onEnd(e)
	}

	const attachTouch = el => {
		if (el && el.addEventListener) {
			// attach touch event listeners and handlers
			const tls = [[touchStart, onStart], [touchMove, onMove], [touchEnd, onEnd]]
			tls.forEach(([e, h]) => el.addEventListener(e, h))
			// return properly scoped cleanup method for removing listeners
			return () => tls.forEach(([e, h]) => el.removeEventListener(e, h))
		}
	}

	const onRef = el => {
		// "inline" ref functions are called twice on render, once with null then again with DOM element
		// ignore null here
		if (el === null) return
		set((state, props) => {
			// if the same DOM el as previous just return state
			if (state.el === el) return state

			let addState = {}
			// if new DOM el clean up old DOM and reset cleanUpTouch
			if (state.el && state.el !== el && state.cleanUpTouch) {
				state.cleanUpTouch()
				addState.cleanUpTouch = null
			}
			// only attach if we want to track touch
			if (props.trackTouch && el) {
				addState.cleanUpTouch = attachTouch(el)
			}

			// store event attached DOM el for comparison, clean up, and re-attachment
			return { ...state, el, ...addState }
		})
	}

	// set ref callback to attach touch event listeners
	const output = { ref: onRef }

	// if track mouse attach mouse down listener
	if (handlerProps.trackMouse) {
		output.onMouseDown = onStart
	}

	return [output, attachTouch]
}

export class Touchable extends React.PureComponent{
	static propTypes ={

	};

	static defaultPRops = defaultProps;


	constructor(props){
		super(props);
	}

	render(){
	}
}
