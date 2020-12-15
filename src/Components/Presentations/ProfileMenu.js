/*import "core-js";
import "regenerator-runtime/runtime";*/
import React from 'react';
import ReactDOM from 'react-dom';
import Media from "react-media";

//Presentation Components
import LandingPageContainer from '../../Components/Containers/LandingPageContainer.js'
import { SiteNav } from '../../Components/Presentations/WebAppView.js'

//SVG Assets
import FemaleFront from '../../Components/SvgAssets/FemaleFront.js'
import FemaleSide from '../../Components/SvgAssets/FemaleSide.js'
import MaleFront from '../../Components/SvgAssets/MaleFront.js'
import MaleSide from '../../Components/SvgAssets/MaleSide.js'
import MaleSideVertMirrored from '../../Components/SvgAssets/MaleSideVertMirrored.js'
import FemaleSideVertMirrored from '../../Components/SvgAssets/FemaleSideVertMirrored.js'

//Third Party
import fetch from 'cross-fetch'
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { 
	//useSwipeable, 
	//Swipeable,
	LEFT,
	RIGHT,
	UP,
	DOWN,
} from 'react-swipeable';

import { Swipeable } from '../../Components/Presentations/FitseeUI/Swipeable.js';

//CSS Styles
import Styles from '../../root.scss';
import NavStyles from '../../nav.scss';
import FormStyles from '../../forms.scss';
import CreateAccountStyles from '../../createAccount.scss';
import ProfileMenuStyles from '../../profileMenu.scss';

//Constants
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {roundTo, ongoingTouchIndexById, copyTouch } from '../../Util/Misc.js';

//SVG
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

import { Button } from '../../Components/Presentations/FitseeUI/Buttons/index.js';




export const InputNumberField = ({props}) => (
	<div 
		className={props.containerStyle} 
		//style={props.selectedField === props.name ?  ({'border-style':'none'}) : ({})}
	>
		{null/*props.type*/} <input 
			id={`${props.name}`}
			value={props.value}

			//NOTE: React yeets away the cursor position when modifing the input value between renders (https://github.com/facebook/react/issues/955)
			//		As a result the cursor must be manually tracked with selectionStart and selectionEnd, BUT 
			//		selection is not supported for number input types... so I'm allowing prop to override type as needed.  
			//		see: 	https://stackoverflow.com/questions/21177489/selectionstart-selectionend-on-input-type-number-no-longer-allowed-in-chrome
			type={props.type || "number"}
			//step="0.5"
			maxLength="5"
			//min="0"
			//max="999.99" 
			name={props.name} 
			placeholder={props.placeholder} 
			onChange={props.onChange} 			//fires when user changes value
			//change={}							//fires when element loses focus after it value was changed, but not commited
			className={props.inputStyle}
			onFocus={props.onSelect}
			ref={props.setupInputRef}
			//style={props.selectedField === props.name ? 
			//	({
			//		'background-color': '#ffffff00',
			//		color: 'white',
			//	}):
			//	null
			//}

		/>
	</div>
);

class ProfileFieldWrapper extends React.Component{
	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps){
		const differentField = this.props.field !== nextProps.field;
		const differentCallback = this.props.callback !== nextProps.callback;
		return differentField || differentCallback;
	}

	render(){
		console.log('ProfileFieldWrapper rendering')
		const isSelected = this.props.selectedField === this.props.field;
		return(
			<div>
				<div className={ProfileMenuStyles.inputNumberContainer_div} style={this.props.style || (isSelected ? ({'border-radius': '2px'}) : null)}>
					{/*<div className={ProfileMenuStyles.selectHighlight_div} style={isSelected ? ({width: '100%'}) : ({width:'0px'})}>			
					</div>*/}
					<InputNumberField props={{
						containerStyle: ProfileMenuStyles.inputNumber_div,
						inputStyle: ProfileMenuStyles.inputNumber_input,
						name: this.props.field,
						placeholder: "",
						value: this.props.value,
						onChange:(event) => this.props.callback(event),
						onSelect:this.props.onSelect,
						selectedField: this.props.selectedField,
						setupInputRef: this.props.setupInputRef,
						type:"text",
					}}/>
					<div className={ProfileMenuStyles.displayUnits_div} style={(isSelected ? ({color: 'var(--color-01'}) : null)}>
						{(this.props.units === 'cm' ? 'cm' : 'in')}
					</div>
					<div className={ProfileMenuStyles.inputNumberLabel_div}>
						{this.props.field}
					</div>
				</div>
			</div>		
		);
	}
}

const radioListStyle = {
	'display':'inline-block',
	'text-align':'left',
	'margin-right':'10px'
};
const radioAndCheckContainerStyle = {
    'display': 'inline-block',
    'width':'40px',
    'margin-right':'10px'
}
const radioStyle = { 
	'width': '100%',
    'height': 'inherit',
    'border-style': 'solid',
    'border-width': '1px',
    'border-color': 'var(--color-01)',
};

const selectedRadioStyle = { 
	...radioStyle,
	...{
    	'background-color': 'var(--color-01)',
    }
};

const checkBoxStyle = {
	...radioStyle
};

const selectedCheckBoxStyle = {
	...checkBoxStyle,
	...{
    	'background-color': 'var(--color-01)',
	}	
};

const radioTitleStyle = {
	'font-size':'10px'
}
const bodySvgContianerStyles = {
	'width': '50%',
	'display': 'inline-block',
	'margin-top': 'calc((100vh - 80px - var(--container-height))/2)',
}
const maleContainer = {
	'height':'calc(100vh - 80px)', 
	'width':'100%',
	'margin':'auto',
	'vertical-align':'top'
}
const femaleContainer = {								
	'width': '75%',
	'display': 'block',
	'margin':'auto',
	'margin-top': '185px'	
}

const Ruler = ({props}) => (props.ticks.map((tick, ind, ticks) => (
		tick < (props.ticks.length - 1) ? //9 ? 
			(<div
				id={ (props.measurement + ((tick - props.ticks.length/2) * props.scale / 2)) }  
				className={ProfileMenuStyles.tick_div}
				style={{
					'--tick-display-cnt':(props.ticks.length - 1),
					'background-color': (ind === props.ticks.length/2 - 1 ? 'white' : null),
					'border-right-color': (ind % 2 === 0 && props.isUnitCm ? '#d9d9d9' : null)
				}}>
			</div>) : 
			null
	))
);

const TolerancePresets = ({props}) => {
	const propStyles = typeof props.style === 'object' ? props.style : ({});

	return(
		<div 
			className={ProfileMenuStyles.toleranceCheckBox_div}
			style={ props.selectedPreset === props.label ? ({ ...{'background-color': '#525252', 'color':'white'}, ...propStyles }) : ({ ...propStyles }) }
			onClick={(e) => props.handlePresetClicked(e, props.label)}
		>
			{props.label}
		</div>
	);
}

export const SlideSwitch = ({props}) => (
	<div 
		//className={ProfileMenuStyles.inputNumberContainer_div}
		className={ProfileMenuStyles.unitSwitch_div}
		//style={{
		//	position: 'absolute',
   		//	left: 'calc(var(--profile-ctrl-container-padding)/2 - var(--input-number-container-padding))',
   		//	top: '45px',
   		//	'margin-top':'0px',
		//	width: '120px',
		//}}
	>
		<div className={ProfileMenuStyles.slideSwitchLabelContainer_div}>
			<div className={ProfileMenuStyles.slideSwitchLabel_div}>
				cm.
			</div>
		</div>
		<div className={ProfileMenuStyles.slideSwitchContainer_div}>
			<div className={ProfileMenuStyles.slideSwitch_div}>
				<div 
					className={ProfileMenuStyles.slide_div} 
					style={props.units === 'in' ? ({left: 'calc(100% - 65%)'}) : null}
					onClick={(event) => props.toggleSlidSwitch(event)}>
				</div>
			</div>
		</div>
		<div className={ProfileMenuStyles.slideSwitchLabelContainer_div}>
			<div className={ProfileMenuStyles.slideSwitchLabel_div}>
				in.
			</div>
		</div>
	</div>
);



class ToleranceSettings extends React.Component{

	constructor(props){
		super(props);
		var aspect = window.innerWidth / window.innerHeight;
		console.log('window.innerWidth = ', window.innerWidth);
		//let minToleranceFields = {};
		//let maxToleranceFields = {};
		this.filteredFieldNames = Object.keys(this.props.displayedProfileData); //Object.keys(this.props.displayedProfileData).filter(field => (field !== 'id' && field !== 'country' && field !== 'username' && field !== 'bodyShape' && field !== 'mens' && field !== 'womens'));
		//this.ticks = [0,1,2,3,3,4,5,6,7,8];
		//this.scale = 0.5;
		this.slideWidth = 7.5;	//slide width in px
		//this.props.tickPixelDelta = (300 - 30)/2/this.props.ticks.length;
		
		//this.props.tickPixelDelta = (aspect > 13/9 && this.props.units == 'in') ? 33 : ((window.innerWidth - 2*30) / (this.props.ticks.length - 1));//298/(this.props.ticks.length - 1);
		
		//this.width = this.props.width;//(this.props.ticks.length  - 1) * this.props.tickPixelDelta;
		this.presets = {
			preset1: 'Tight',
			preset2: 'Fit',
			preset3: 'Loose',
		}

		/*if(Object.keys(this.props.minTolerances).length === 0 && Object.keys(this.props.maxTolerances).length === 0){
			for(let field of this.filteredFieldNames){
				//values int ticks indecese 
				minToleranceFields = Object.assign({}, minToleranceFields, {[field]: 0 });
				maxToleranceFields = Object.assign({}, maxToleranceFields, {[field]: (this.props.ticks.length-1) });
			}
		}else{
			minToleranceFields = this.props.minTolerances;
			maxToleranceFields = this.props.maxTolerances;
		}*/

		this.state={
			//minTolerances: {...minToleranceFields},
			//maxTolerances: {...maxToleranceFields},
			//selectedPreset: '',
			minGrabbedSlider: '',
			maxGrabbedSlider:'',
			startX: 0,
			deltaX: 0,
			startTick:0,
			deltaTick:0,
			sliderTransition:true,
		};

		this._handleMaxSliderMove = this._handleMaxSliderMove.bind(this);
		this._handleMinSliderMove = this._handleMinSliderMove.bind(this);
		//this._handlePresetClicked = this._handlePresetClicked.bind(this);
		this._sliderGrabbed = this._sliderGrabbed.bind(this);
		this._sliderReleasedd = this._sliderReleased.bind(this);
		this.getDeltaTick = this.getDeltaTick.bind(this);
		this.getToleranceControllerRef = this.getToleranceControllerRef.bind(this);

		//this.getToleranceValues = this.getToleranceValues.bind(this);
		//this.getUpdatedToleranceTick = this.getUpdatedToleranceTick.bind(this);
		//this.setPresetTolerances = this.setPresetTolerances.bind(this);
	}

	/*componentWillUnmount(){
		this.props.saveTickState({
			minTolerances: this.state.minTolerances,
			maxTolerances: this.state.maxTolerances,			
		})
	}*/

	getDeltaTick(field, isMinTolerance){
		const deltaTick = Math.round((this.state.deltaX)/this.props.tickPixelDelta);
		const maxTick = this.props.ticks.length - 1;
		const minTick = 0;
		const nextTick = this.state.startTick + deltaTick;

		//make sure min slider is not greater than max slider and vice versa
		if(isMinTolerance){
			if(nextTick >= this.props.maxTolerances[field]) return (this.props.maxTolerances[field] - this.state.startTick - 1);
		}else {
			if(nextTick <= this.props.minTolerances[field]) return (this.props.minTolerances[field] + 1 - this.state.startTick);
		}

		//make sure min and max slider are within the min and max tick bounds
		if(nextTick > maxTick) return maxTick - this.state.startTick;
		else if(nextTick + deltaTick < minTick) return minTick - this.state.startTick;

		return deltaTick;
	}

	/*getToleranceValues(field, isMinTolerance){
		let value = 0;
		const displayedProfileDataValue = parseInt(this.props.displayedProfileData[field], 10);
		if(isMinTolerance){
			value = displayedProfileDataValue > 4 ? 
				(displayedProfileDataValue + (this.state.minTolerances[field] - 5) * this.scale) :
				(displayedProfileDataValue + (this.state.minTolerances[field] - 4) * this.scale)
		}else{
			value = displayedProfileDataValue > 4 ? 
				(displayedProfileDataValue + (this.state.maxTolerances[field] - 5) * this.scale) :
				(displayedProfileDataValue + (this.state.maxTolerances[field] - 4) * this.scale)
		}

		return value;
	}*/

	_handleMinSliderMove(e, field){
		console.log('x = ', e.clientX);
		this.setState(prevState => {
			const pixelDelta = e.clientX - prevState.startX;
			return({
				deltaX: pixelDelta,
				deltaTick: this.getDeltaTick(field, true),
			});
		});
	}

	_handleMaxSliderMove(e, field){
		console.log('x = ', e.clientX);
		this.setState(prevState => {
			const pixelDelta = e.clientX - prevState.startX;
			return({
				deltaX: pixelDelta,
				deltaTick: this.getDeltaTick(field, false),
			});
		});
	}

	_sliderGrabbed(e, field, isMinSlider, outerRef){
		e.stopPropagation();
		console.log('e.clientX = ', e.clientX)
		const xCoord = e.clientX;
		//const adjTick = isMinSlider ? this.state.minTolerances[field] : this.state.maxTolerances[field] + 1;
		this.setState({
			[(isMinSlider ? 'minGrabbedSlider' : 'maxGrabbedSlider')]: field,
			startX: xCoord,
			startTick: this.props[(isMinSlider ? 'minTolerances' : 'maxTolerances')][field],
			sliderTransition: false
		});

		//create event handlers
		if(outerRef){
			//outerRef.style['touch-action'] = 'none';
			this.handleMinSliderMoveWrapper = (e) => this._handleMinSliderMove(e, field);
			this.handleMaxSliderMoveWrapper = (e) => this._handleMaxSliderMove(e, field);
			this.handleMinSliderReleasedWrapper = (e) => this._sliderReleased(e, true, outerRef);
			this.handleMaxSliderReleasedWrapper = (e) => this._sliderReleased(e, false, outerRef);
	
			//add handlers to event listeners
	
			/*if(isMinSlider){
				window.addEventListener('mousemove', this.handleMinSliderMoveWrapper);
				window.addEventListener('mouseup', this.handleMinSliderReleasedWrapper);
			}else{
				window.addEventListener('mousemove', this.handleMaxSliderMoveWrapper);	
				window.addEventListener('mouseup', this.handleMaxSliderReleasedWrapper);
			}*/
	
	
			if(isMinSlider){
				/*window*/outerRef.addEventListener('pointermove', this.handleMinSliderMoveWrapper);
				/*window*/outerRef.addEventListener('pointerup', this.handleMinSliderReleasedWrapper);
			}else{
				/*window*/outerRef.addEventListener('pointermove', this.handleMaxSliderMoveWrapper);	
				/*window*/outerRef.addEventListener('pointerup', this.handleMaxSliderReleasedWrapper);
			}
		}else{
			console.log('outerRef is null or not defined');
		}
	}



	_sliderReleased(e, isMinSlider, outerRef){
		const field = (isMinSlider ? this.state.minGrabbedSlider : this.state.maxGrabbedSlider);
		const toleranceObjType = (isMinSlider ? 'minTolerances' : 'maxTolerances');

		//outerRef.style['touch-action'] = 'none';

		this.props.updateTolerances(this.props.units, isMinSlider, field, (this.state.startTick + this.state.deltaTick));

		this.setState(prevState => ({
			[(isMinSlider ? 'minGrabbedSlider' : 'maxGrabbedSlider')]: '',
			deltaX: 0,
			startX: 0,
			deltaTick :0,
			/*[toleranceObjType]: {
				...this.state[toleranceObjType],
				[field]: (prevState.startTick + prevState.deltaTick),
			},*/
			sliderTransition:true
		}));

		switch(true){/*
			case isMinSlider:
				console.log('removing minSlider event handlers from window\'s mousemove and mouseup');
				if(this.handleMinSliderMoveWrapper){
					window.removeEventListener('mousemove', this.handleMinSliderMoveWrapper);
					if(this.handleMinSliderReleasedWrapper){
						window.removeEventListener('mouseup', this.handleMinSliderReleasedWrapper);
					}else{
						console.log('this.handleMinSliderReleasedWrapper is undefined')
					}
				} else {
					console.log('this.handleMinSliderMoveWrapper is undefined');
				}
				break;
			case !isMinSlider:
				console.log('removing maxSlider event handlers from window\'s mousemove and mouseup');
				if(this.handleMaxSliderMoveWrapper){
					window.removeEventListener('mousemove', this.handleMaxSliderMoveWrapper);
					if(this.handleMaxSliderReleasedWrapper){
						window.removeEventListener('mouseup', this.handleMaxSliderReleasedWrapper);
					}else{
						console.log('this.handleMaxSliderReleasedWrapper is undefined')
					}
				}else{
					console.log('this.handleMaxSliderMoveWrapper undefined');
				}
				break;
			default:
				break;
		}*/
			case isMinSlider:
				console.log('removing minSlider event handlers from outerRef\'s pointermove and pointerup');
				if(this.handleMinSliderMoveWrapper){
					outerRef.removeEventListener('pointermove', this.handleMinSliderMoveWrapper);
					if(this.handleMinSliderReleasedWrapper){
						outerRef.removeEventListener('pointerup', this.handleMinSliderReleasedWrapper);
					}else{
						console.log('this.handleMinSliderReleasedWrapper is undefined')
					}
				} else {
					console.log('this.handleMinSliderMoveWrapper is undefined');
				}
				break;
			case !isMinSlider:
				console.log('removing maxSlider event handlers from outerRef\'s pointermove and pointerup');
				if(this.handleMaxSliderMoveWrapper){
					outerRef.removeEventListener('pointermove', this.handleMaxSliderMoveWrapper);
					if(this.handleMaxSliderReleasedWrapper){
						outerRef.removeEventListener('pointerup', this.handleMaxSliderReleasedWrapper);
					}else{
						console.log('this.handleMaxSliderReleasedWrapper is undefined')
					}
				}else{
					console.log('this.handleMaxSliderMoveWrapper undefined');
				}
				break;
			default:
				break;
		}
	}

	/*_handlePresetClicked(e, label){
		console.log('_presetClicked')
		this.setState(prevState => ({
			selectedPreset: label,
			...this.setPresetTolerances(label)
		}));
	}*/

	/*setPresetTolerances(preset){		
		let minToleranceFields = {};
		let maxToleranceFields = {};
		let minToleranceValue = 0;
		let maxToleranceValue = this.props.ticks.length-1;

		switch(true){
			//Tight
			case preset === this.presets.preset1:
				minToleranceValue = 2;
				maxToleranceValue = 3;
				break;
			//Fit
			case preset === this.presets.preset2:
				minToleranceValue = 4;
				maxToleranceValue = 5;
				break;
			//Loose
			case preset === this.presets.preset3:
				minToleranceValue = 6;
				maxToleranceValue = 7;
				break;
		}

		for(let field of this.filteredFieldNames){
			//values int ticks indecese 
			minToleranceFields = Object.assign({}, minToleranceFields, {[field]: minToleranceValue });
			maxToleranceFields = Object.assign({}, maxToleranceFields, {[field]: maxToleranceValue });
		}

		return({
			minTolerances:{
				...minToleranceFields
			},
			maxTolerances:{
				...maxToleranceFields
			},
		});
	}*/

	getToleranceControllerRef(div){
		this.toleranceControllerRef = div;
	}


	render(){
		//container width = 
		//	var(--profile-ctrl-contianer-width) - 
		//	2*var(--profile-ctrl-container-padding) - 
		//	2*var(--profile-ctrl-container-border-width)

		//this.props.tickPixelDelta = 298/(this.props.ticks.length - 1);	
		this.filteredFieldNames = Object.keys(this.props.displayedProfileData);	
		var indexByFieldNames = this.filteredFieldNames.reduce((accum, field, ind) => (field != 'height' ? ({...accum, [field]: ind-1}) : accum), {});
		var calcWidth = (this.props.ticks.length  - 1) * this.props.tickPixelDelta;

		if(this.props.width !== calcWidth){
			this.props.updateWidth(calcWidth);
			//this.width = calcWidth;
		}

		//this.props.tickPixelDelta = `calc(100%/${this.props.ticks.length}`;
		return(
			<div 
				className={ProfileMenuStyles.toleranceSettingsContianer_div}
				//style={{
				//	height:'calc(100% - 110px)',
				//	'--main-height':'25px',
				//	'padding-top':'50px',
				//	'position':'relative',
				//}}
			>
				<div 
					className={ProfileMenuStyles.toleranceSettings_div}
				>
					<div className={ProfileMenuStyles.tolerancePresetContainer_div}>
						<div className={ProfileMenuStyles.tolerancePreset_div}>
							<TolerancePresets props={{
								label:'Tight',
								selectedPreset: this.props.selectedPreset,
								handlePresetClicked: this.props.handlePresetClicked,
								style: {
									'border-top-left-radius': '3px',
    								'border-bottom-left-radius': '3px',
								}
							}}/>
						</div>
					</div>
					<div 
						className={ProfileMenuStyles.tolerancePresetContainer_div}
						style={{'margin-left': '-1px'}}
					>
						<div className={ProfileMenuStyles.tolerancePreset_div}>
							<TolerancePresets props={{
								label:'Fit',
								selectedPreset: this.props.selectedPreset,
								handlePresetClicked: this.props.handlePresetClicked,
							}}/>
						</div>
					</div>
					<div 
						className={ProfileMenuStyles.tolerancePresetContainer_div}
						style={{'margin-left': '-1px'}}
					>
						<div className={ProfileMenuStyles.tolerancePreset_div}>
							<TolerancePresets props={{
								label:'Loose',
								selectedPreset: this.props.selectedPreset,
								handlePresetClicked: this.props.handlePresetClicked,
								style: {
									'border-top-right-radius': '3px',
    								'border-bottom-right-radius': '3px',
								}
							}}/>
						</div>
					</div>
					<div className={ProfileMenuStyles.toleranceUnitContainer_div}>
						<div className={ProfileMenuStyles.toleranceUnit_div}>
							{`${this.props.units}.`}
						</div>
					</div>
				</div>
				<div 
					style={{
						position: 'absolute',
						width: '100%',
						...(isDevice ? 
							{
								//bottom: '36px',
								position: 'relative', 
								'margin-top': '6.4rem',
							} : 
							{
								bottom: '0px'
							}
						),
					}}
				>
					<div style={{
						position:'relative',
						width:'100%',
						bottom:'0px',
					}}>
						<div className={ProfileMenuStyles.measurementsContainer_div}>
							{
								this.filteredFieldNames.map(field => (	
									field != 'height' ?//Skip height
										(<div 
											key={`${field}_ruler`}
											className={ProfileMenuStyles.measurements_div}
											style={(
												field === this.props.selectedField ? 
													({'background-color':'var(--color-01-tint-01)'}) :
													({})
											)}>
											<Ruler props={{
												ticks: this.props.ticks,
												scale: this.props.scale,
												measurement: this.props.displayedProfileData[field],
												isUnitCm: this.props.units === 'cm'
											}} />							
											<div 
												className={ProfileMenuStyles.measurementValue_div} 
												style={{
													width: `calc(100%/${this.props.ticks.length - 1})`,
													//width: 'var(--mvalue-width)',// `${this.props.tickPixelDelta}`,
													left: `calc(50% - 100%/${this.props.ticks.length - 1}/2 + 2*var(--tick-border-width))`,
												}}>
												{this.props.displayedProfileData[field]}
											</div>
										</div>) :
										null
								))
							}
						</div>
					</div>


					{/*TOLERANCE MIN & MAX TICKS*/
						(({minTolVal, maxTolVal}) => (
							<React.Fragment>
								<div
									className={ProfileMenuStyles.minMaxMarker_div} 
									style={{
										height: `calc(${indexByFieldNames[this.props.selectedField]} * (var(--main-height) + 4px) + 15px)`,
										...(this.state.minGrabbedSlider === this.props.selectedField ? 
											({left: `${this.props.minTolerances[this.props.selectedField]*this.props.tickPixelDelta + this.state.deltaX}px`, transition: 'none'}) : 
											({left: `${this.props.tickPixelDelta * (this.props.minTolerances[this.props.selectedField]) - this.slideWidth}px`, transition: 'left 150ms ease-in-out, height 150ms ease-in-out'}))
									}}
								>
									<div className={ProfileMenuStyles.minMaxIndicatorContainer_div} >
										<div className={ProfileMenuStyles.minMaxIndicator_div} >
											{minTolVal ? minTolVal.toFixed(2) : minTolVal}
										</div>
									</div>
								</div>
								<div
									className={ProfileMenuStyles.minMaxMarker_div} 
									style={{
										height: `calc(${indexByFieldNames[this.props.selectedField]} * (var(--main-height) + 4px) + 15px)`,
										...(this.state.maxGrabbedSlider === this.props.selectedField ? 
											({left: `${(this.props.maxTolerances[this.props.selectedField])*this.props.tickPixelDelta + this.state.deltaX}px`, transition: 'none'}) :
											({left: `${this.props.tickPixelDelta * (this.props.maxTolerances[this.props.selectedField]) - this.slideWidth}px` , transition: 'left 150ms ease-in-out, height 150ms ease-in-out'}))
									}}
								>
									<div className={ProfileMenuStyles.minMaxIndicatorContainer_div} >
										<div 
											className={ProfileMenuStyles.minMaxIndicator_div} 
										>
											{maxTolVal ? maxTolVal.toFixed(2) : maxTolVal}
										</div>
									</div>
								</div>
							</React.Fragment>
						))(this.props.getToleranceValues(this.props.selectedField, this.props.units))
					}


					<div className={ProfileMenuStyles.toleranceControllersContainer_div}>
						<div 
							style={{'touch-action': 'pan-y'}}
							className={ProfileMenuStyles.toleranceController_div}
							ref={this.getToleranceControllerRef}
						>
							{
								Object.keys(this.props.minTolerances).map(field => {

									var {minTolVal, maxTolVal} = this.props.getToleranceValues(field, this.props.units);

									return(
										<div 
											key={`${field}_slider`}
											className={ProfileMenuStyles.sliderContainer_div}
											onPointerDown={(event) => this.props.selectToleranceField(field)}
										>											
											<div className={ProfileMenuStyles.slideLabel}>
												{field}
											</div>


											{/*TOLERANCE OUT-OF-LIMITS SHADING*/}
											<div
												className={ProfileMenuStyles.rangeHighlight_div}
												style={{
													...(this.state.minGrabbedSlider === field ? 
														({
															left: '0px',
															right: `calc(${((this.props.ticks.length - 1)*this.props.tickPixelDelta) - (this.props.minTolerances[field]*this.props.tickPixelDelta + this.state.deltaX)}px - var(--range-highlight-offset))`, 
															transition: 'none',
														}) : 
														({
															left: '0px',
															right: `calc(${((this.props.ticks.length - 1)*this.props.tickPixelDelta) - (this.props.tickPixelDelta * (this.props.minTolerances[field]) - this.slideWidth)}px - var(--range-highlight-offset))`, 
															transition: 'left 150ms ease-in-out',
														})),
												}}
											>
											</div>
											<div
												className={ProfileMenuStyles.rangeHighlight_div}
												style={{
													...(this.state.maxGrabbedSlider === field ? 
														({
															right: '0px',
															left: `calc(${(this.props.maxTolerances[field])*this.props.tickPixelDelta + this.state.deltaX}px + var(--range-highlight-offset))`, 
															transition: 'none',
														}) : 
														({
															right: '0px',
															left: `calc(${this.props.tickPixelDelta * (this.props.maxTolerances[field]) - this.slideWidth}px + var(--range-highlight-offset))`, 
															transition: 'left 150ms ease-in-out',
														})),
												}}
											>
											</div> 


											{/*TOLERANCE MIN & MAX SLIDERS*/}
											<div 
												id={field} 
												className={ProfileMenuStyles.minSlider_div}
												//onMouseDown={(e) => this._sliderGrabbed(e, field, true)}
												onPointerDown={(e) => this._sliderGrabbed(e, field,  true, this.toleranceControllerRef)}
												//onTouchStart={(e) => {
												//	this.props.handleTouchStart(e, field, true);
												//	//this._sliderGrabbed(e, field, true);
												//}}
												//onMouseUp={(e) => this._sliderReleased(e, true)}
												style={
													this.state.minGrabbedSlider === field ? 
														({left: `${this.props.minTolerances[field]*this.props.tickPixelDelta + this.state.deltaX}px`, transition: 'none'}) : 
														({left: `${this.props.tickPixelDelta * (this.props.minTolerances[field]) - this.slideWidth}px`, transition: 'left 150ms ease-in-out'})
												}
											>
												<div>
													<div>
													</div>
												</div>
											</div>
											<div 
												id={field} 
												className={ProfileMenuStyles.maxSlider_div}
												//onMouseDown={(e) => this._sliderGrabbed(e, field, false)}
												onPointerDown={(e) => this._sliderGrabbed(e, field, false, this.toleranceControllerRef)}
												//onTouchStart={(e) => {
												//	this.props.handleTouchStart(e);
												//	this._sliderGrabbed(e, field, true);
												//}}
												//onMouseUp={(e) => this._sliderReleased(e, false)}
												style={
													this.state.maxGrabbedSlider === field ? 
														({left: `${(this.props.maxTolerances[field])*this.props.tickPixelDelta + this.state.deltaX}px`, transition: 'none'}) :
														({left: `${this.props.tickPixelDelta * (this.props.maxTolerances[field]) - this.slideWidth}px` , transition: 'left 150ms ease-in-out'})
												}
											>
												<div>
													<div>
														
													</div>
												</div>
											</div>

											
											{/*TOLERANCE MIN & MAX VALUES (displayed on desktop)*/}
											<div className={ProfileMenuStyles.slideValueRange_div}>
												<div className={ProfileMenuStyles.slideValueMin_div}>
													{minTolVal ? minTolVal.toFixed(2) : minTolVal}
												</div>
												<div className={ProfileMenuStyles.slideValueTo_div}> 
													- 
												</div>
												<div className={ProfileMenuStyles.slideValueMax_div}>
													{maxTolVal ? maxTolVal.toFixed(2) : maxTolVal}
												</div>
											</div>
										</div>
									)}
								)
							}
						</div>
					</div>

					<div className={ProfileMenuStyles.btnsContainer_div}>
						<Button
							theme={["textPrimaryOnDark", "primaryBg"]}
							elevated
							label="submit"
							onClick={(event) => this.props.handleOnSubmit()}
						/>
						{/*<div className={ProfileMenuStyles.btns_div}>
							<div 
								onClick={(event) => this.props.handleOnSubmit()} 
								className={ProfileMenuStyles.submitBtnText_div}
								//style={{left:'0px'}} 
							>
								Submit
							</div>
						</div>*/}
					</div>

				</div>
			</div>
		);
	}
}

export function camelize(str){
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	})
}


/*
* Returns the min and max tolerances in ticks
*/
//
//function getMinAndMaxToleranceTicks(minPrefix, maxPrefix, toleranceKeys, scale, ticks, toleranceObj, userMetricObj, decimals){
//	let minToleranceFields = {};
//	let maxToleranceFields = {};
//	let minPrefixLength = minPrefix.length;
//	let maxPrefixLength = maxPrefix.length;
//
//	const calcTicks = (deltaTick, originTick) => {
//		var result;
//
//		if(){
//			delta <= 0 ? (delta + origin / 2 - 1) : (delta + origin / 2);
//		}else{
//			delta >= 0 ? (delta + origin / 2 - 1) : (delta + origin / 2);			
//		}
//	}
//
//	toleranceKeys.map(key => {
//		//Ignore height
//		if(key !== 'height'){
//
//			if(key.startsWith(minPrefix)){
//				var keyWithoutPrefix = camelize(key.slice(minPrefixLength));
//				//var valDiff = roundTo(userMetricObj[keyWithoutPrefix], scale, decimals) - toleranceObj[key]
//				var valDiff = toleranceObj[key] - roundTo(userMetricObj[keyWithoutPrefix], scale, decimals)
//				var tickDelta = valDiff / scale;
//
//				minToleranceFields[keyWithoutPrefix] = tickDelta <= 0 ? 
//					(tickDelta + ticks.length / 2 - 1) : 
//					(tickDelta + ticks.length / 2);
//			}
//			else if(key.startsWith(maxPrefix)){
//				var keyWithoutPrefix = camelize(key.slice(maxPrefixLength));
//				var valDiff = toleranceObj[key] - roundTo(userMetricObj[keyWithoutPrefix], scale, decimals)
//				var tickDelta = valDiff / scale;
//
//				maxToleranceFields[keyWithoutPrefix] = tickDelta >= 0 ? 
//					(tickDelta + ticks.length / 2) : 
//					(tickDelta + ticks.length / 2 - 1) ;
//			}
//		}
//	});
//
//	return { minToleranceFields, maxToleranceFields };
//}
//

function getAccurateAndDisplayMeasurements(isTest, filteredUserMetrics, decimals, scale, units){
	let iniMeasurements ={};
	let displayedProfileData ={};
	if(isTest){
		let maxHeight = 84;
		let minHeight = 48;
		let height = minHeight + Math.round((Math.random() * (maxHeight - minHeight)));
		Object.keys(filteredUserMetrics).map((key, id) => {
			Object.assign(iniMeasurements, {[key]: (Math.random()*height)})
			Object.assign(displayedProfileData, {[key]: (parseFloat( roundTo(iniMeasurements[key], scale, decimals))) } )
		});
	}else{	
		iniMeasurements = filteredUserMetrics;
		Object.keys(filteredUserMetrics).map((key, id) => {
			Object.assign(displayedProfileData, {[key]: (parseFloat( roundTo((units === 'in' ? convertCmToIn(iniMeasurements[key]) : iniMeasurements[key]), scale, decimals))) } )
		});
	}
	return({iniMeasurements, displayedProfileData});
}

const convertInToCm = (inches) => (inches*2.54);

const convertCmToIn = (cm) => (cm/2.54);


/* 
*	Rounds value to the nearest specified step and trims result to the specified decimals
*/
//const roundTo = (value, step, decimals=1) => {
//    step || (step = 1.0);
//    var inv = 1.0 / step;
//    return (Math.round(value * inv) / inv).toFixed(decimals);
//}

export default class ProfileMenu extends React.Component{
	constructor(props){
		super(props);

		this.menuPage1 = 'Measurements';
		this.menuPage2 = 'Tolerance';
		this.decimals = 1;
		this.scaleIn = 0.25;
		this.scaleCm = 0.5;//convertInToCm(this.scaleIn);

		const generateTicksFromRef = (range) => {
			let ticks = [];

			for(let tick = 0; tick < (range - 1); tick++){
				ticks = [...ticks, (tick >= (range/2 - 1) ? tick - 1 : tick)];
			}

			return ticks;
		}

		const referenceTicks = [0,1,2,3,4,4,5,6,7,8]; 

		switch(true){
			//set ticksIn to referenceTicks and generate ticksCm
			case true://this.scaleIn >= this.scaleCm:
				this.ticksIn = referenceTicks;
				let leftRangeCm = convertInToCm(this.scaleCm*(this.ticksIn.length - 2)/2);
				let fullRangeCm = 2*(leftRangeCm/this.scaleCm + 1);				
				this.ticksCm = generateTicksFromRef(fullRangeCm);
				break;

			//set ticksCm to referenceTicks and generate ticksIn
			case this.scaleIn < this.scaleCm:
				this.ticksCm = referenceTicks;
				let leftRangeIn = convertCmToIn(this.scaleIn*(this.ticksCm.length - 2)/2);
				let fullRangeIn = 2*(leftRangeIn/this.scaleIn + 1);				
				this.ticksIn = generateTicksFromRef(fullRangeIn);
				break;

			default:
				break;
		}

		this.scale = this.scaleCm;	
		//let leftRangeIn = this.scaleIn*(this.ticksIn.length - 2)/2;
		////let leftRangeCm = convertInToCm(this.scaleCm*(this.ticksIn.length - 2)/2);
		//let leftRangeCm = convertInToCm(this.scaleCm*(this.ticksIn.length - 2)/2);
		//let lengthTicksCm = 2*(leftRangeCm/this.scaleCm + 1)
//
		//for(let tick = 0; tick < (lengthTicksCm - 1); tick++){
		//	this.ticksCm = [...this.ticksCm, (tick >= (lengthTicksCm/2 - 1) ? tick - 1 : tick)];
		//}

		this.ticks = this.ticksCm;	//[0,1,2,3,3,4,5,6,7,8];

		// variables used to get actual min/max tolerance values during preset selection and slider movemnt
		this.leftCenterTick = this.ticks.length/2 - 1; 
		this.rightCenterTick = this.ticks.length/2;

		this.presets = {
			preset1: 'Tight',
			preset2: 'Fit',
			preset3: 'Loose',
		}

		this.ongoingTouches = [];	//global touch variables (currently not used)

		this.minSwipeX = 10; 		//min number of pixels to swipe before view starts moving.
		this.maxSwipeX = 200;		//max number of pixels to track before view slides over completely.
		this.maxVelocityX = 100;	//max delta x between events before view slides over completely.
		this.velX = 0;

		this.inputRefs = [];		//referenct to input elements

		//object methods
		this._handleInputFieldChange = this._handleInputFieldChange.bind(this);
		this._handleRadioToggled = this._handleRadioToggled.bind(this);
		this._handleBoxChecked = this._handleBoxChecked.bind(this);
		this._handleOnSubmit = this._handleOnSubmit.bind(this);
		this._handleFieldFocus = this._handleFieldFocus.bind(this);
		this._handleFieldBlur = this._handleFieldBlur.bind(this);
		this._goToMeasurments = this._goToMeasurments.bind(this);
		this._goToTolerance = this._goToTolerance.bind(this);
		this._toggleSlidSwitch = this._toggleSlidSwitch.bind(this);
		this.saveTickState = this.saveTickState.bind(this);
		this.getToleranceValues = this.getToleranceValues.bind(this);
		this._handlePresetClicked = this._handlePresetClicked.bind(this);
		this.setPresetTolerances = this.setPresetTolerances.bind(this);
		this.updateTolerances = this.updateTolerances.bind(this);
		this.getMinAndMaxToleranceTicks = this.getMinAndMaxToleranceTicks.bind(this);
		this.updateWidth = this.updateWidth.bind(this);
		this.getStateIniData = this.getStateIniData.bind(this);

		this._handleTouchStart = this._handleTouchStart.bind(this);
		this._handleTouchMove = this._handleTouchMove.bind(this);
		this._handleTouchEnd = this._handleTouchEnd.bind(this);
		this._handleTouchCancel = this._handleTouchCancel.bind(this);
		this.setSwipeableStyles = this.setSwipeableStyles.bind(this);

		this.getToleranceControllerRef = this.getToleranceControllerRef.bind(this);
		this.selectToleranceField = this.selectToleranceField.bind(this);
		this.setupInputRef = this.setupInputRef.bind(this);
		this.convertTickToTol = this.convertTickToTol.bind(this);
		this.filterMetricFields = this.filterMetricFields.bind(this);
		this.calcTolerances = this.calcTolerances.bind(this);
		this.toggleMeasurement = this.toggleMeasurement.bind(this);

		var { bodyData, iniMeasurements, minToleranceFields, maxToleranceFields, displayedProfileData, currentToleranceData } = this.getStateIniData();

		this.recentProfileIni = false;

		this.state = {
			...this.state,
			minTolerances: minToleranceFields,
			maxTolerances: maxToleranceFields,
			prevSelectedField: '',
			selectedField: '',
			fieldListTitle: this.menuPage1,
			units: 'cm',
			gridWidth: 360,
			hasFieldChanged: false,
			previousCursorPos: {
				selectionStart: null,
				selectionEnd: null, 
			},
			profileData: {
				'username': this.profile !== undefined ? this.profile.username : null,

				userMetricsDto: {
					id:null,
					//'bodyShape': this.props.isTest ? 'female' : this.profile.bodyShape,
					//'womens':false,
					//'mens':false,	
					...bodyData,
					...iniMeasurements
				},
				profileStatsDto:null//{
				//	id:null,
				//	following:null,
				//	likes:null,
				//	points:null,
				//	lastUpdate:null
				//}
			},
			initialTouches:[],
			isMeasurement: true,
			toggle:false,
			displayedProfileData,
			currentToleranceData,
		}
	}

	filterMetricFields(metrics=[], customFilter=[]){
		var results = [];

		const filters = [
			...customFilter, 
			'id',
			'bodyShape' ,
			'mens' ,
			'username' ,
			'womens' ,
			'apparelInterest',
			'country' ,
			'toleranceDto' ,
			'dateOfBirth' ,
		];

		var rejected = false;

		for(var field of metrics){
			
			for(var filter of filters){
				if(field == filter){
					rejected = true;
					break;
				}
			}

			results = !rejected ? [...results, field] : (results);
			rejected = false;
		}

		return results;

		//return(
		//	metrics
		//		.filter(field => field != 'id')
		//		.filter(field => field != 'bodyShape')
		//		.filter(field => field != 'mens')
		//		.filter(field => field != 'username')
		//		.filter(field => field != 'womens')
		//		.filter(field => field != 'apparelInterest')
		//		.filter(field => field != 'country')
		//		.filter(field => field != 'toleranceDto')
		//		.filter(field => field != 'dateOfBirth')
		//);
	}

	getStateIniData(units='cm'){

		this.profile = this.props.addedProfile !== undefined ? this.props.addedProfile : this.props.profile;
		this.prevProfile = this.profile;

		this.filteredFieldNames =  this.props.profile !== undefined ? 
			this.filterMetricFields(Object.keys(this.profile.userMetricsDto)) : 
			([]);


		//construct a filtered userMetrics Object 
		this.filteredUserMetrics = {};

		this.filteredFieldNames.map((key, id) => {
			Object.assign(this.filteredUserMetrics, {[key]: this.profile.userMetricsDto[key]})
		})

		var minToleranceFields = {};
		var maxToleranceFields = {};
		var {iniMeasurements, displayedProfileData} = getAccurateAndDisplayMeasurements(this.props.test, this.filteredUserMetrics, this.decimals, this.scale, units)

		var toleranceDto = {
			...(
				this.props.addedProfile !== undefined ? 
					this.props.addedProfile.toleranceDto :
					this.props.profile !== undefined ? 
						this.props.profile.toleranceDto :
						({}) 
			),
		}

		//Build currentToleranceData object from toleranceDto in redux state 

		var currentToleranceData = {
			minTolerances:{},
			maxTolerances:{},
		}

		var prefix;

		for(let key of Object.keys(toleranceDto)){
			if(key !== 'height' && key !== 'id'){
				//extract min or max prefix from key
				prefix = key.substring(0,3);
				currentToleranceData = {
					...currentToleranceData,
					[`${prefix}Tolerances`]:{
						...currentToleranceData[`${prefix}Tolerances`],
						[camelize(key.slice(prefix.length))]: toleranceDto[key],
					}
				}
			}
		}

		if(!this.props.test){
			//let toleranceKeys = Object.keys(this.profile.toleranceDto);
			//var { minToleranceFields, maxToleranceFields } = getMinAndMaxToleranceTicks('min', 'max', toleranceKeys, this.scale, this.ticks, this.profile.toleranceDto, this.profile.userMetricsDto, this.decimals);
			var { minToleranceFields, maxToleranceFields } = this.getMinAndMaxToleranceTicks(currentToleranceData, (units === 'in' ? convertCmToIn : undefined), undefined, undefined, this.scale);
		}else{	
			for(let field of Object.keys(displayedProfileData)){
				//values int ticks indecese 
				minToleranceFields = Object.assign({}, minToleranceFields, {[field]: 0 });
				maxToleranceFields = Object.assign({}, maxToleranceFields, {[field]: (this.ticks.length-1) });
			}
		}

		let bodyData = this.props.test ?
			({
				'bodyShape': 'female',
				'womens':false,
				'mens':false,	
			}) : 
			this.profile !== undefined ?
				({
					'bodyShape': this.profile.userMetricsDto.bodyShape,
					'womens': this.profile.userMetricsDto.womens,
					'mens': this.profile.userMetricsDto.mens,	
				}) :
				({});

		return { bodyData, iniMeasurements, minToleranceFields, maxToleranceFields, displayedProfileData, currentToleranceData };
	}

	calcTolerances(units, isMinTolerance, field=null, tick=null){

		if(typeof isMinTolerance !== "boolean"){
			console.error("isMinTolerance must be specified");
			return;
		}

		var minTick = isMinTolerance ? tick : null;
		var maxTick = !isMinTolerance ? tick : null;
		//var {minTolVal, maxTolVal} = getToleranceValues(field, units);

		if(units === 'in'){
			var {
				minTolVal,
				maxTolVal,
			} = this.convertTickToTol(minTick, maxTick, this.scaleIn, parseFloat(this.state.displayedProfileData[field]));

			minTolVal = minTolVal ? convertInToCm(minTolVal) : null;
			maxTolVal = maxTolVal ? convertInToCm(maxTolVal) : null;
		}

		else if(units === 'cm'){
			var {
				minTolVal,
				maxTolVal,
			} = this.convertTickToTol(minTick, maxTick, this.scaleCm, parseFloat(this.state.profileData.userMetricsDto[field]));	
		}

		return {
			minTolVal: minTolVal,
			maxTolVal: maxTolVal,
		}

	}

	/*
	*	Function invoked in response to change tolerance slides
	*/
	updateTolerances(units, isMinTolerance, field=null, tick=null){

		/*if(typeof isMinTolerance !== "boolean"){
			console.error("isMinTolerance must be specified");
			return;
		}*/

		var toleranceType = isMinTolerance ? "minTolerances" : "maxTolerances";
		/*var minTick = isMinTolerance ? tick : null;
		var maxTick = !isMinTolerance ? tick : null;
		//var {minTolVal, maxTolVal} = getToleranceValues(field, units);

		if(units === 'in'){
			var {
				minTolVal,
				maxTolVal,
			} = this.convertTickToTol(minTick, maxTick, this.scaleIn, parseFloat(this.state.displayedProfileData[field]));

			minTolVal = minTolVal ? convertInToCm(minTolVal) : null;
			maxTolVal = maxTolVal ? convertInToCm(maxTolVal) : null;
		}

		else if(units === 'cm'){
			var {
				minTolVal,
				maxTolVal,
			} = this.convertTickToTol(minTick, maxTick, this.scaleCm, parseFloat(this.state.profileData.userMetricsDto[field]));	
		}*/
		var {minTolVal, maxTolVal} = this.calcTolerances(units, isMinTolerance, field, tick);

		//var {
		//	prefix,
		//	toleranceValue,
		//} = this.isMinTolerance ? ({prefix: 'min', toleranceValue: minTolVal}) : ({prefix: 'max', toleranceValue: maxTolVal});

		this.setState(prevState => ({
			[toleranceType]:{
				...this.state[toleranceType],
				[field]:tick
			},
			/*displayedToleranceData:{
				...prevState.displayedToleranceData,
				[toleranceType]:{
					...prevState.displayedToleranceData[toleranceType],
					...{
						[field]: (isMinTolerance ? minTolVal : maxTolVal)
					},
				}
			},*/
			//currentToleranceData: {
			//	...prevState.currentToleranceData,
			//	[`${prefix}${field.charAt(0).toUpperCase() + field.slice(1)}`]: toleranceValue,
			//},
			currentToleranceData: {				
				...prevState.currentToleranceData,
				[toleranceType]:{
					...prevState.currentToleranceData[toleranceType],
					...{
						[field]: (isMinTolerance ? minTolVal : maxTolVal)
					},
				}
			}
		}));
	}

	componentDidUpdate(){
		//	Becuase fields undergo unit conversion inbetween renders, React will override cursor position to the 
		//	end of the number, so restore the previous cursor position here, if the value was just modified.
		if(this.state.hasFieldChanged){
			this.inputRefs[this.state.selectedField].selectionStart = this.state.previousCursorPos.selectionStart;
			this.inputRefs[this.state.selectedField].selectionEnd = this.state.previousCursorPos.selectionEnd;
		}
	}

	setPresetTolerances(preset, units){		
		var minTicks = {};
		var maxTicks = {};
		var minTolerances = {};
		var maxTolerances = {};
		var minTick = 0;
		var maxTick = this.ticks.length-1;
		var scale = units === 'cm' ? this.scaleCm : this.scaleIn;
		var shownDataVal = units === 'cm' ? this.state.profileData.userMetricsDto : this.state.displayedProfileData;
		var shownDataValFiltered = this.filterMetricFields(Object.keys(shownDataVal), ['height']);


		switch(true){
			//Tight
			case preset === this.presets.preset1:
				minTick = this.leftCenterTick - 2;//2;
				maxTick = this.leftCenterTick - 1;//3;
				break;

			//Fit
			case preset === this.presets.preset2:
				minTick = this.leftCenterTick;//4;
				maxTick = this.rightCenterTick;//5;
				break;

			//Loose
			case preset === this.presets.preset3:
				minTick = this.rightCenterTick + 1;//6;
				maxTick = this.rightCenterTick + 2;//7;
				break;
		}

		for(let field of shownDataValFiltered){
			//values int ticks indecese 
			//if(field != 'height'){
				minTicks = {...minTicks, ...{[field]: minTick }};
				maxTicks = {...maxTicks, ...{[field]: maxTick }};

				var {minTolVal} = this.calcTolerances(units, true, field, minTick);				
				var {maxTolVal} = this.calcTolerances(units, false, field, maxTick);
				
				//var {minTolVal, maxTolVal} = this.convertTickToTol(minTick, maxTick, scale, shownDataVal[field]);
				minTolerances = {...minTolerances, ...{[field] : minTolVal} };
				maxTolerances = {...maxTolerances, ...{[field] : maxTolVal} };				
			//}
		}

		return({
			minTolerances:{
				...minTicks
			},
			maxTolerances:{
				...maxTicks
			},

			currentToleranceData:{
				minTolerances,
				maxTolerances,
			}
		});
	}

	/*
	*	Gets the tolerance min and max values from the tick information stored in this components state.
	*	@param field: 		The key of tolerance object
	*	@param prevUnits: 	indicates the units being switched from when user toggles units
	*						retrieveConvertedValues 
	*/	
	getToleranceValues(field, units=null/*, isMinTolerance*/){
		//let value = 0;
		//const getDeltaTick = (tickOrigin, tolerance) => (tolerance - tickOrigin);
		var shownDataVal;
		var minTolVal;
		var maxTolVal;

		//If prevUnits is provided this method was invoked from a unit switch operation.  In this case, the prevUnits must be used to 
		//determine if this is a cm to in transition and the current displayedProfileData object needs to be converted to cm.
		//shownDataVal = units === 'cm' ?
		//	parseInt(convertInToCm(this.state.displayedProfileData[field], 10)) :
		//	parseFloat(this.state.displayedProfileData[field], 10);

		//the default units of currentToleranceData is centimeters, so just reference whats saved in the component state.
		if(units === 'cm'){
			shownDataVal = parseFloat(this.state.profileData.userMetricsDto[field], 10)
			let {
				minTolerances,
				maxTolerances,
			} = this.state.currentToleranceData;

			minTolVal = minTolerances ? parseFloat(minTolerances[field]) : null;
			maxTolVal = maxTolerances ? parseFloat(maxTolerances[field]) : null;
		}

		//compute min and max tolerance values (in inches) from the min and max ticks stored in the component state
		else if(units === 'in'){
			shownDataVal = parseFloat(this.state.displayedProfileData[field], 10);
			var {minTolVal, maxTolVal} = this.convertTickToTol(this.state.minTolerances[field], this.state.maxTolerances[field], this.scaleIn, shownDataVal);
//
			/*var deltaTickMin = 0;
			var deltaTickMax = 0;
			var minTolTick = this.state.minTolerances[field];
			var maxTolTick = this.state.maxTolerances[field];
	
			//MinTol slider on the right side of measured value
			if(minTolTick > this.leftCenterTick){
				deltaTickMin = getDeltaTick(this.rightCenterTick, minTolTick);
			}
			//MinTol slider on the left side of measured value
			else{
				deltaTickMin = getDeltaTick(this.leftCenterTick, minTolTick);
			}
	
			//MaxTol slider on the left side of measured value
			if(maxTolTick < this.rightCenterTick){
				deltaTickMax = getDeltaTick(this.leftCenterTick, maxTolTick);
			}
			//MaxTol slider on the right side of measured value
			else{
				deltaTickMax = getDeltaTick(this.rightCenterTick, maxTolTick);
			}
	
			minTolVal = shownDataVal + deltaTickMin * this.scaleCm;
			maxTolVal = shownDataVal + deltaTickMax * this.scaleCm;*/
//
		}

		//console.log('shownDataVal = ', shownDataVal);


		return {minTolVal, maxTolVal};
	}

	convertTickToTol(minTick, maxTick, scale, measurement){
		var deltaTickMin = 0;
		var deltaTickMax = 0;
		var minTolVal = null;
		var maxTolVal = null;

		const getDeltaTick = (tickOrigin, tolerance) => (tolerance - tickOrigin);
	
		if(minTick){
			//MinTol slider on the right side of measured value
			if(minTick > this.leftCenterTick){
				deltaTickMin = getDeltaTick(this.rightCenterTick, minTick);
			}
			//MinTol slider on the left side of measured value
			else{
				deltaTickMin = getDeltaTick(this.leftCenterTick, minTick);
			}
		}
	
		if(maxTick){
			//MaxTol slider on the left side of measured value
			if(maxTick < this.rightCenterTick){
				deltaTickMax = getDeltaTick(this.leftCenterTick, maxTick);
			}
			//MaxTol slider on the right side of measured value
			else{
				deltaTickMax = getDeltaTick(this.rightCenterTick, maxTick);
			}
		}
	
		minTolVal = measurement + deltaTickMin * scale;
		maxTolVal = measurement + deltaTickMax * scale;

		return({
			minTolVal,
			maxTolVal,
		});
	}

	/*
	* Returns the min and max tolerances in ticks.
	*
	* @param 	{object} 		currentToleranceData		the currently persisted tolerance data in cm
	* @param 	{function}		unitConverter 				function invoked to convert cm. to inches.
	* @param	{int} 			nextLeftCenterTick			passed when switchign units.  Represents the left center tick value of the units being toggled to.
	* @param	{int} 			nextRightCenterTick 		passed when switchign units.  Represents the right center tick value of the units being toggled to.
	* @param 	{string} 		minPrefix 					specify the prefix that identifies min tolerance values (default 'min')
	* @param 	{string}		maxPrefix 					specify the prefix that identifies max tolerance values (default 'max')
	*
	* @return 	{object}		An object with keys minToleranceFields and maxToleranceFields, each of which have object values containing min and max tolerance properties respectively.  
	*/
	getMinAndMaxToleranceTicks(
		currentToleranceData, 
		unitConverter, 
		nextLeftCenterTick = this.leftCenterTick, 
		nextRightCenterTick = this.rightCenterTick,
		//ticks, 
		unitScale=0.5,
		minPrefix='min', 
		maxPrefix='max',
	){
		let minToleranceFields = {};
		let maxToleranceFields = {};
		let minPrefixLength = minPrefix.length;
		let maxPrefixLength = maxPrefix.length;
		var { userMetricsDto, toleranceDto } = this.profile !== undefined ? this.profile : ({ userMetricsDto: {}, toleranceDto: {} });

		//var {
		//	currentToleranceData,
		//} = currentToleranceData ? 
		//	{currentToleranceData: currentToleranceData} : 
		//	this.state ? 
		//		this.state : 
		//		({currentToleranceData:{}});

		if(!currentToleranceData){
			currentToleranceData = this.state ? 
				{
					minTolerances: this.state.minToleranceFields,
					maxTolerances: this.state.maxToleranceFields,
				} : 
				{
					minTolerances: {},
					maxTolerances: {},					
				}
		}

		const calcTicks = (deltaTick, originTick) => {
			return (deltaTick + originTick);
		}
	
		const calcMinTicks = (deltaTick, originTick) => {
			return deltaTick <= 0 ? (deltaTick + originTick / 2 - 1) : (deltaTick + originTick / 2);
		}

		const calcMaxTicks = (deltaTick, originTick) => {
			return deltaTick >= 0 ? (deltaTick + originTick / 2 - 1) : (deltaTick + originTick / 2);
		}

		//const leftRangTickCount = ticks.length / 2;
		//const calcAllowedMin = (centerVal) => (centerVal - (unitScale * (leftRangTickCount - 1)));
		//const calcAllowedMax = (centerVal) => (centerVal + (unitScale * (leftRangTickCount - 1)));
	
		for(var selector of Object.keys(currentToleranceData)){
			Object.keys(currentToleranceData[selector]).map(key => {
				//Ignore height
				if(key !== 'height'){

					//if unitConverter is defined userMetricDto[key] must be converted from cm to in.
					var metric = unitConverter ? unitConverter(userMetricsDto[key]) : userMetricsDto[key];
					//var metric = unitConverter ? unitConverter(this.state ? this.state.profileData.userMetricsDtos[key]) : us;
					var tolerance = unitConverter ? unitConverter(currentToleranceData[selector][key]) : currentToleranceData[selector][key];
					//const allowedMinTolerance = calcAllowedMin(metric);
					//const allowedMaxTolerance = calcAllowedMax(metric);
					
					//MIN
					if(selector.startsWith(minPrefix)){
						var keyWithoutPrefix = camelize(key.slice(minPrefixLength));

						var valueDiff = tolerance - metric;	
						var tickDiff = parseInt(roundTo((valueDiff / unitScale), 1, 0));
						
						//	Ticks immediately left or right of the corresponding userMetricDto value, represent equal values. 
						//	Typically the left center tick is considered the origin reference for determining minTolerance 
						//	values, unless the minToleranceValue lands on the right center tick. In that case the tick origin 
						//	reference (centerTick) needs to be set to the right center tick. 
						
						//var centerTick = nextLeftCenterTick;
						var centerTick = ((valueDiff / unitScale) + nextLeftCenterTick) >= nextRightCenterTick ? nextRightCenterTick : nextLeftCenterTick;
						var minTick = calcTicks(tickDiff, centerTick)
						minToleranceFields[key] = minTick >= 0 ? minTick : 0;
					}
	
					//MAX
					else if(selector.startsWith(maxPrefix)){
						var keyWithoutPrefix = camelize(key.slice(maxPrefixLength));

						//var valueDiff = tolerance - roundTo(metric, unitScale, this.decimals);
						var valueDiff = tolerance - metric;
						var tickDiff = parseInt(roundTo((valueDiff / unitScale), 1, 0));

						var centerTick = ((valueDiff / unitScale) + nextLeftCenterTick) <= nextLeftCenterTick ? nextLeftCenterTick : nextRightCenterTick;
						var maxTick = calcTicks(tickDiff, centerTick);

						maxToleranceFields[key] = maxTick >= 2*nextLeftCenterTick ? 
							(2*nextLeftCenterTick + 1) :
							maxTick <= minTick ?
								(minTick + 1) :
								(maxTick);
					}
				}
			});
		}
	
		return { minToleranceFields, maxToleranceFields };
	}

	_handlePresetClicked(e, label){
		console.log('_presetClicked')
		this.setState(prevState => ({
			selectedPreset: label,
			...this.setPresetTolerances(label, prevState.units)
		}));
	}

	_handleInputFieldChange(e, field){

		//console.table(Object.keys(this.inputRefs).map(field => {
//
		//	//var key = Object.keys(refObj)[0];
		//	//return({[key]: `selectionStart: ${refObj[key].selectionStart}, selectionEnd: ${refObj[key].selectionEnd}, selectionDirection: ${refObj[key].selectionDirection}` });
		//	return({ [field]: `selectionStart: ${this.inputRefs[field].selectionStart}, selectionEnd: ${this.inputRefs[field].selectionEnd}, selectionDirection: ${this.inputRefs[field].selectionDirection}` });
		//}, this));

		console.log(`${field}: {selectionStart: ${this.inputRefs[field].selectionStart}, selectionEnd: ${this.inputRefs[field].selectionEnd}, selectionDirection: ${this.inputRefs[field].selectionDirection}}`)
		var scale = this.state.units === 'in' ? this.scaleIn : this.scaleCm;

		//convert text to float and append 0 to values with trailing decimals
		var value = 0;//parseFloat(e.target.value.replace(/^\d*\.$/, (e.target.value + '0')));
				
		//value has a single trailing decimal
		if ((/^\d*\.$/).test(e.target.value)){
			value = parseFloat(e.target.value + '0').toFixed(1);
		}

		// match decimal followed by one or more digits
		else{
			var scale = e.target.value.match(/\.(\d){1,}$/);
			if(scale != null){
				//var test = scale[scale.index];
				//var testlength = test.length;
				var matchLength = scale[0].length;

				// Test for scale of more than 1 (string length including decimal point > 2)				
				if(matchLength > 2 ){
					value = parseFloat(e.target.value.slice(0, e.target.value.length - (matchLength - 2)));	
				}
				else{
					// Remove the un-needed scale
					//value = parseFloat(e.target.value.slice(0, e.target.value.length - scale[scale.index].length));
					value = parseFloat(e.target.value);
					//value = parseFloat(e.target.value).toFixed(scale.length - 1);
				}
			}

			else{
				value = parseFloat(e.target.value);
			}
		}

		var valueCm = this.state.units === 'in' ? convertInToCm(value, this.scaleCm) : value;
		var minTolField = `min${field.replace(/^\w/, chr => chr.toUpperCase())}`;
		var maxTolField = `max${field.replace(/^\w/, chr => chr.toUpperCase())}`;
		/*
		* recalculate tolerances wrt new measurement value
		*/

		// calculate this difference between previ
		var minTolVal = valueCm - (this.leftCenterTick - this.state.minTolerances[field])*this.scale;
		var maxTolVal = valueCm + (this.state.maxTolerances[field] - this.rightCenterTick)*this.scale;
		
		this.profile.userMetricsDto[field] = valueCm;

		this.setState(prevState => ({
			hasFieldChanged: true,
			previousCursorPos: {
				selectionStart: this.inputRefs[field].selectionStart,
				selectionEnd: this.inputRefs[field].selectionEnd,
			},
			displayedProfileData: {
				...prevState.displayedProfileData,
				...(prevState.units === 'in' ? ({[field]: value}) : ({[field]: value}))
			},
			'profileData':{
				...prevState.profileData,				
				userMetricsDto:{
					...prevState.profileData.userMetricsDto,
					/*[field]:parseFloat(prevState.units === 'cm' ? 
						roundTo(value, this.scaleCm) : 
						roundTo(convertInToCm(value), this.scaleCm))*/
					[field]: (parseFloat(prevState.units === 'cm' ? roundTo(value, this.scaleCm) : roundTo(convertInToCm(value), this.scaleCm)))
				}
			},
			currentToleranceData:{
				...prevState.currentToleranceData,
				minTolerances:{
					...prevState.currentToleranceData.minTolerances,
					[field]: minTolVal,
				},
				maxTolerances:{
					...prevState.currentToleranceData.maxTolerances,
					[field]: maxTolVal,
				},
			},
		}));
	}

	_handleRadioToggled(selection){
		this.setState(prevState => ({
			'profileData':{
				...prevState.profileData,
				userMetricsDto:{
					...prevState.profileData.userMetricsDto,
					'bodyShape':selection
				}
			}
		}));
	}

	_handleBoxChecked(type){
		this.setState(prevState => ({
			'profileData':{
				...prevState.profileData,
				userMetricsDto:{
					...prevState.profileData.userMetricsDto,
					[type]: !prevState.profileData.userMetricsDto[type]
				}
			}
		}));
	}

	_handleFieldFocus(event){

		event.target.select();
		this.setState(prevState => {

			const selectedField = event.target.name;
			const prevSelectedField = prevState.selectedField

			//higher accuracy convertion of source of truth to inches with respect to unselected fields.
			var selectedFieldData = prevState.units === 'in' ? ({[selectedField]: roundTo(convertCmToIn(prevState.profileData.userMetricsDto[selectedField]), .001, 2)}) : ({});

			var updatedDisplayData =  
				prevSelectedField !== 'id' && 
				prevSelectedField !== 'country' && 
				prevSelectedField !== 'username' && 
				prevSelectedField !== 'bodyShape' && 
				prevSelectedField !== 'mens' && 
				prevSelectedField !== 'womens' &&
				prevSelectedField !== '' ? 
					({ [prevSelectedField]: (prevState.units === 'cm' /*&& prevState.hasFieldChanged*/ ? 
						parseFloat(prevState.profileData.userMetricsDto[prevSelectedField].toFixed(this.decimals)) : 
						prevState.hasFieldChanged ?
							parseFloat(convertCmToIn(prevState.profileData.userMetricsDto[prevSelectedField]).toFixed(this.decimals)) :
							roundTo(convertCmToIn(prevState.profileData.userMetricsDto[prevSelectedField]), this.scaleIn, this.decimals)
					) }) :
					({});
			console.log("previously selectedField = ", prevSelectedField);

			return({
				hasFieldChanged: false,
				selectedField: selectedField,
				displayedProfileData:{
					...prevState.displayedProfileData,
					...updatedDisplayData,
					...selectedFieldData,
				}
			})
		});
	}

	selectToleranceField(name){
		this.setState(prevState => ({
			selectedField: name,
		}))
	}

	_handleFieldBlur(event){
		/*this.setState(prevState => ({
			prevSelectedField: event.target.name
		}));*/
	}

	_handleOnSubmit(){
		//When calling modifyProfile the profileData object is passed as the action payload.
		//The reducer is expecting this payload to contain an id field which it uses as its key
		//to reference the payload data in the redux state tree.  This id field needs to be
		//added explicitly here because it is left undefined when the profile object is 
		//returned by the server, and because it is refernced to when dynamically building this.state.profileData fields.
		let scrubbedProfileState = Object.assign({}, this.state.profileData, {id: 1});


		//gotta do some string gymnastics so construct tolerance ojbect property that is compatible with the server api spec.
		//Also convert to cm (if units are inches) before sending to server
		let tolerance = {};
		for(let field of Object.keys(this.state.minTolerances)){
			//measurements and tolerances should always be sent to the server as cm
			var {minTolVal, maxTolVal} = this.getToleranceValues(field, 'cm'/*this.state.units*/);
			tolerance[`min${field.charAt(0).toUpperCase() + field.slice(1)}`] = minTolVal;//this.state.units === 'in' ? 
				//convertInToCm(this.getToleranceValues(field, true)) : 
				//this.getToleranceValues(field, true);
		//}

		//for(let field of Object.keys(this.state.maxTolerances)){
			tolerance[`max${field.charAt(0).toUpperCase() + field.slice(1)}`] = maxTolVal;//this.state.units === 'in' ? 
				//convertInToCm(this.getToleranceValues(field, false)) : 
				//this.getToleranceValues(field, false);			
		}

		console.log('tolerance = ', tolerance);
		scrubbedProfileState = Object.assign({}, scrubbedProfileState, {...scrubbedProfileState, toleranceDto:{id:null, ...tolerance}});
		this.props.modifyProfile(scrubbedProfileState);
		this.props.postProfile(scrubbedProfileState/*this.state.profileData*/);
	}

	_goToMeasurments(){
		this.setState(prevState => ({
			fieldListTitle: this.menuPage1
		}))
	}

	_goToTolerance(){
		this.setState(prevState => ({
			fieldListTitle: this.menuPage2
		}))
	}

	_toggleSlidSwitch(event){
		this.setState(prevState => {
			let convertedDisplayData = {...prevState.displayedProfileData};
			let convertedMaxTol;
			let convertedMinTol;
			let nextUnits = prevState.units === 'cm' ? 'in' : 'cm';
			//need to recompute sinc this.leftCenterTick and this.rightCenterTick have not yet been updated to the Inch ruler
			let leftCenterTick = nextUnits === 'in' ? this.ticksIn.length/2 - 1 : this.ticksCm.length/2 - 1; 
			let rightCenterTick = nextUnits === 'in' ? this.ticksIn.length/2 : this.ticksCm.length/2;

			const switchUnitSystem = (field, prevScale, nextScale, nextTicks, nextLeftCenterTick, nextRightCenterTick, unitConverter) => {
				var prevTickRange = (prevState.maxTolerances[field] - prevState.minTolerances[field]);

				var { minToleranceFields, maxToleranceFields } = this.getMinAndMaxToleranceTicks(
					this.state.currentToleranceData, 
					(nextUnits === 'in' ? convertCmToIn : null ),
					nextLeftCenterTick,
					nextRightCenterTick,
					(nextUnits === 'in' ? this.scaleIn : this.scaleCm)
				);

				/*
				var {minTolVal, maxTolVal} = this.getToleranceValues(field, prevState.units);

				var prevMinMaxRange = unitConverter( prevScale * prevTickRange );
				var tickRange = Math.round(prevMinMaxRange / nextScale);				
				tickRange = tickRange === 0 ? 1 : tickRange;
				var convertedMinTolVal;
				var convertedMaxTolVal;
				var measuredVal;

				if(prevState.units === 'cm'){
					//from the converted tickRange, compute the new min and maxTolerance tick value
					convertedMinTolVal = unitConverter(minTolVal);
					convertedMaxTolVal = unitConverter(maxTolVal);
					measuredVal = unitConverter(prevState.profileData.userMetricsDto[field]);
				}else{
					convertedMinTolVal = unitConverter(minTolVal);
					convertedMaxTolVal = unitConverter(maxTolVal);
					measuredVal = prevState.profileData.userMetricsDto[field];
				}

				//var measuredVal = prevState.units === 'cm' ?
				//	unitConverter(prevState.profileData.userMetricsDto[field]) :
				//	prevState.profileData.userMetricsDto[field];

				//calculate the tick value of the minTolerance on the new unit scale
				var minTickDelta = parseInt((measuredVal - convertedMinTolVal) / nextScale);
				var maxTickDelta = parseInt((measuredVal - convertedMaxTolVal) / nextScale);

				var minTick = parseInt((nextTicks[nextTicks.length / 2 - 1] - minTickDelta).toFixed());
				//var maxTick = parseInt((minTick + tickRange).toFixed());
				var maxTick = parseInt((nextTicks[nextTicks.length / 2 - 1] - maxTickDelta).toFixed());

				//Check if minTick is leftCenter tick while max tick is gt. right center tick.  If so, increment minTick and maxTick by 1.
				//This is done to accomodate for the fact that leftCenterTick and rightCenterTick are the same value.  min/maxTicks need to be
				//incremented or decremented depending on whether they appear above or below the measured value
				var minTickAdjust = minTick >= nextTicks.length - 2 ? 0 : 1;
				var maxTickAdjust = maxTick >= nextTicks.length - 1 ? 0 : 1;

				switch(true){
					case (minTick === nextLeftCenterTick && maxTick > nextRightCenterTick):
						
						minTick += minTickAdjust;
						maxTick += maxTickAdjust;
						break;

					case (minTick > nextRightCenterTick):
						minTick += minTickAdjust;
						
					case (maxTick > nextRightCenterTick):
						maxTick += maxTickAdjust;

					default:
						break;
				}*/

				//set the new min and max tick values
				//convertedMaxTol = {
				//	...convertedMaxTol,
				//	[field]: maxTick,
				//};					
				//convertedMinTol = {
				//	...convertedMinTol,
				//	[field]: minTick,
				//}

				convertedMaxTol = {
					...convertedMaxTol,
					[field]: maxToleranceFields[field],
				};					
				convertedMinTol = {
					...convertedMinTol,
					[field]:minToleranceFields[field],
				}
				//return {convertedMaxTol, convertedMinTol};

			}

			for(let field of Object.keys(prevState.displayedProfileData)){
				convertedDisplayData[field] = prevState.units === 'cm' ? 
					parseFloat(roundTo(convertCmToIn(prevState.profileData.userMetricsDto[field]), this.scaleIn, this.decimals)) : //convert to inches
					parseFloat(roundTo(prevState.profileData.userMetricsDto[field], this.scaleCm, this.decimals)); //convert to centimeters
			}

			for(let field of Object.keys(prevState.maxTolerances)){

				if(prevState.units === 'cm'){
					/*{convertedMaxTol, convertedMinTol} =*/ switchUnitSystem(field, this.scaleCm, this.scaleIn, this.ticksIn, leftCenterTick, rightCenterTick, convertCmToIn );
				}else{
					/*{convertedMaxTol, convertedMinTol} = */switchUnitSystem(field, this.scaleIn, this.scaleCm, this.ticksCm, leftCenterTick, rightCenterTick, convertInToCm );
					/*var minMaxTolerances = this.getMinAndMaxToleranceTicks('min', 'max');
					convertedMaxTol = minMaxTolerances.maxToleranceFields;
					convertedMinTol = minMaxTolerances.minToleranceFields;*/
				}
			}

			return({
				units: nextUnits,
				displayedProfileData: {
					...convertedDisplayData
				},
				minTolerances:{...convertedMinTol},
				maxTolerances:{...convertedMaxTol},
			});
		});
	}

	saveTickState(tickObj={minTolerances: {}, maxTolerances: {}}){
		this.setState(prevState => ({
			minTolerances:{
				...tickObj.minTolerances
			},
			maxTolerances:{
				...tickObj.maxTolerances
			}
		}))
	}

	updateWidth(width){
		this.setState(prevState => ({
			...prevState,
			gridWidth: width,
		}))
	}

	_handleTouchStart(event, onAction){
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

	_handleTouchMove(event){
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

	_handleTouchCancel(event){
		event.preventDefault();
		console.log('canceling touch');
		var touches = event.changedTouches;

		for(let i = 0; i < touches.length; i++){
			var index = ongoingTouchIndexById(touches[i].identifier, this.ongoingTouches);
			this.ongoingTouches.splice(index);
		}
	}

	_handleTouchEnd(event){
		event.preventDefault();

	}

	setSwipeableStyles(div){
		div ? div.style.display = 'inline-block' : null;
	}

	getToleranceControllerRef(div){
		this.toleranceControllerRef = div;
	}

	setupInputRef(field, input){
		this.inputRefs = {
			...this.inputRefs,
			[field]: input,
		};
	}

	toggleMeasurement(){
		this.setState(prevState => ({
			...prevState,
			isMeasurement: !prevState.isMeasurement,
		}));
	}

	render(){
		//TODO:  push this to the select in LandingPageConnector.js
		//This filters what properties to display on the Profile Creation page

		//let fields = Object.keys(this.profile.userMetricsDto);
		//let filteredFieldNames =  fields.filter(field => field != 'id')
		//.filter(field => field != 'height')
		//.filter(field => field != 'bodyShape')
		//.filter(field => field != 'mens')
		//.filter(field => field != 'username')
		//.filter(field => field != 'womens')
		//.filter(field => field != 'apparelInterest')
		//.filter(field => field != 'country')
		//.filter(field => field != 'toleranceDto')
		//.filter(field => field != 'dateOfBirth');

		if (this.prevProfile !== this.props.profile ){
			var { bodyData, iniMeasurements, minToleranceFields, maxToleranceFields, displayedProfileData, currentToleranceData } = this.getStateIniData(this.state.units);
			this.setState(prevState =>({
				...prevState,
				minTolerances: minToleranceFields,
				maxTolerances: maxToleranceFields,
				profileData:{
					...prevState.profileData,
					userMetricsDto:{
						...prevState.profileData.userMetricsDto,
						...bodyData,
						...iniMeasurements
					}
				},
				displayedProfileData,
				currentToleranceData
			}))
		}

		//make sure currentToleranceData state is updated with profile.toleranceDto props
		if(this.props.profile !== undefined && Object.keys(this.state.currentToleranceData).length === 0){

			var {
				toleranceDto
			} = this.props.profile;

			var minTolerances = {};
			var maxTolerances = {};
			const minPrefix = 'min';
			const maxPrefix = 'max';

			for(var field of Object.keys(toleranceDto)){

				if(field.startsWith(minPrefix)){
					//minTolerances = { ...minTolerances, ...{[field]: toleranceDto[field]} }
					var fieldWithoutPrefix = camelize(field.slice((minPrefix).length));
					minTolerances = { ...minTolerances, ...{[fieldWithoutPrefix]: toleranceDto[field]} }
				}

				else if(field.startsWith(maxPrefix)){
					var fieldWithoutPrefix = camelize(field.slice((maxPrefix).length));
					maxTolerances = { ...maxTolerances, ...{[fieldWithoutPrefix]: toleranceDto[field]} }
				}

				else{
					console.warn("unrecognized substring while building displayed tolerance state");
				}
			}

			this.setState(prevState => ({
				...prevState,
				currentToleranceData : {
					minTolerances,
					maxTolerances,
				}
			}))
		}


		if(this.state.units === 'cm'){
			this.ticks = this.ticksCm;
			this.scale = this.scaleCm;
			//reset the left center tick value
			this.leftCenterTick = this.ticks.length/2 - 1; 
			this.rightCenterTick = this.ticks.length/2; 
		}
		else{
			this.ticks = this.ticksIn;
			this.scale = this.scaleIn;
			//reset the left center tick value
			this.leftCenterTick = this.ticks.length/2 - 1; 
			this.rightCenterTick = this.ticks.length/2; 
		}

		//console.log('filteredFieldNames');
		//console.log(this.filteredFieldNames);		
		const bodyShape = this.state.profileData.userMetricsDto.bodyShape;
		const cornerRad = '3px';
		let bodyShapeContainer = maleContainer;

		let fieldSet = this.filteredFieldNames.map(field => {
			var isSelected = this.state.selectedField === field;
			var displayedValue = null;

			if(isSelected){
				switch(this.state.units){
					case 'cm':
						//displayedValue = this.state.profileData.userMetricsDto[field];
						displayedValue = this.state.displayedProfileData[field];
						break;
					case 'in':
						displayedValue = this.state.displayedProfileData[field];
						break;
					default:
						break;
				}

			}
			else{
				switch(this.state.units){
					case 'cm':
						displayedValue = this.state.displayedProfileData[field];
						break;
					case 'in':
						//displayedValue = roundTo(convertCmToIn(this.state.profileData.userMetricsDto[field]), .001, 2);
						displayedValue = this.state.displayedProfileData[field];
						break;
					default:
						break;
				}
			}

			return(
				<ProfileFieldWrapper 
					key={field} 
					field={field} 
					value={
						displayedValue
					} 
					callback={()=>{this._handleInputFieldChange(event, field)}} 
					onSelect={() => this._handleFieldFocus(event)}
					selectedField={this.state.selectedField}
					units={this.state.units}
					setupInputRef={(input) => {this.setupInputRef(field, input)} }
				/>
			);
		});

		const ProfileMenuContent = (
			<React.Fragment>
			<div 
				className={ProfileMenuStyles.fieldListContainer_div} 
				style={this.state.isMeasurement ? ({transform: 'translateX(0px)'}) : ({transform: 'translateX(-100vw)'})}
			>
				<div className={ProfileMenuStyles.fieldListContainer2_div}>
					<div 
						className={ProfileMenuStyles.fieldList_div}
						style={{
							//'--profile-ctrl-contianer-width': `calc(${this.state.gridWidth}px + 2*var(--profile-ctrl-container-padding) + var(--profile-ctrl-container-border-width))`,
							'border-right':'none',
							'border-top-right-radius': '0px',
							'border-bottom-right-radius':'0px',
						}}>
						<div className={ProfileMenuStyles.fieldListTitleContainer1_div} >
							<div className={ProfileMenuStyles.fieldListTitleContainer2_div} >
								<div className={ProfileMenuStyles.fieldListTitle_div} >
									{ this.state.fieldListTitle }
								</div>
							</div>
						</div>
			
						{ 
							this.state.fieldListTitle === this.menuPage1 ? (
								<React.Fragment>

									<SlideSwitch 
										props={{
											toggleSlidSwitch: this._toggleSlidSwitch,
											units: this.state.units
										}}
									/>									

									<div 
										style={{
											position:'absolute',
											right: '7.5px',
											height: '24px',
											top: 'calc(94px/2 + 5.5px)',
											display: 'none',
										}}
									>
										<div
											style={{
												height: 'inherit',
												'line-height': '24px',
											}}
										>
											<div
												style={{
													display: 'inline-block',
													'vertical-align': 'top',
													'font-size': '13px',
													color: '#838383',
												}}
											>
												Tolerance
											</div>
												<i 
													style={{color:'#bbbbbb'}}
													class="material-icons"
												>
													arrow_forward
												</i>
										</div>
									</div>

									<div 
										className={ProfileMenuStyles.apparelPreferences_div}
										//style={{
										//	'margin-bottom': '10px',
										//	'margin-top': '45px',
										//	'border-top': 'solid 1px #bbbbbb',
										//	'padding-top': '20px',
										//}} 
									>
											<div>
												<div>
													<div className={ProfileMenuStyles.sexHeadersContainer_div} >
														<div className={ProfileMenuStyles.sexHeader_div}> Womens </div>
														<div className={ProfileMenuStyles.sexHeader_div}> Mens </div>
													</div>
													<div className={ProfileMenuStyles.physiqueOptionsContainer_div} >
														<div 
															id="physiqueOptions" 
															style={{height:'inherit',width:'100%'}}
														>
															<div 
																id="womensPhysique" 
																className={ProfileMenuStyles.physiqueBtnContainer_div}
															>
																<div 
																	id='bodyShapeRadio' 
																	style={{
																		...(bodyShape === 'female' ? selectedRadioStyle : radioStyle),
																		...{'border-top-left-radius': `${cornerRad}`}
																	}} 
																	onClick={() => this._handleRadioToggled('female')}
																>
																</div>
															</div>
															<div 
																id="mensPhysique" 
																className={ProfileMenuStyles.physiqueBtnContainer_div}
																style={{'margin-left':'-1px'}}
															>
																<div 
																	id='bodyShapeRadio' 
																	style={{
																		...(bodyShape === 'male' ? selectedRadioStyle : radioStyle),
																		...{'border-top-right-radius': `${cornerRad}`}
																	}} 
																	onClick={() => this._handleRadioToggled('male')}
																>
																</div>										
															</div>
														</div>
														<div 
															id="bodyShapeTitle" 
															className={ProfileMenuStyles.optionsHeader_div}
														>
															Body Shape
														</div>								
													</div>
													<div 
														className={ProfileMenuStyles.apparelOptionsContainer_div} 
														style={{'margin-top':'-1px'}}
													>
														<div 
															id="apperelInterestRadioList"
															style={{height:'inherit',width:'100%'}}
														>
															<div 
																id="womensApparel" 
																className={ProfileMenuStyles.apparelBtnContainer_div}
															>
																<div 
																	style={{
																		...(this.state.profileData.userMetricsDto.womens ? selectedCheckBoxStyle : checkBoxStyle),
																		...{'border-bottom-left-radius': `${cornerRad}`}
																	}}
																	onClick={() => this._handleBoxChecked('womens')} 
																>
																</div>
															</div>
															<div 
																id="mensApparel" 
																className={ProfileMenuStyles.apparelBtnContainer_div}
																style={{'margin-left':'-1px'}}
															>
																<div 
																	style={{
																		...(this.state.profileData.userMetricsDto.mens ? selectedCheckBoxStyle : checkBoxStyle),
																		...{'border-bottom-right-radius':`${cornerRad}`}
																	}} 
																	onClick={() => this._handleBoxChecked('mens')}
																>
																</div>
															</div>
														</div>
														<div 
															id="apparelInterestTitle" 
															className={ProfileMenuStyles.optionsHeader_div}
														>
															Apperel Interest
														</div>			
													</div>								
												</div>
											</div>
									</div>
									{fieldSet}
								</React.Fragment>
							) : (
								<ToleranceSettings 
									units={this.state.units}
									displayedProfileData={
										//this.props.test ? 
											this.state.displayedProfileData //: 
										//	this.state.profileData.userMetricsDto
										} 
									saveTickState={this.saveTickState}
									minTolerances={this.state.minTolerances}
									maxTolerances={this.state.maxTolerances}
									getToleranceValues={this.getToleranceValues}
									scale={this.scale}
									handlePresetClicked={this._handlePresetClicked}
									setPresetTolerances={this.setPresetTolerances}
									updateTolerances={this.updateTolerances}
									ticks={this.ticks}
									selectedPreset={this.state.selectedPreset}
									updateWidth={this.updateWidth}
									width={this.state.gridWidth}
									
									handleTouchStart={this._handleTouchStart}
									handleTouchMove={this._handleTouchMove}
									handleTouchCancel={this._handleTouchCancel}
									handleTouchEnd={this._handleTouchEnd}

									tickPixelDelta={
										(window.innerWidth/window.innerHeight) <= 13/9 /*&& this.state.units == 'in'*/ ? 
											((window.innerWidth - 2*30) / (this.ticks.length - 1)) :
											this.state.units == 'in' ? 
												33 : 
												(360 - 2*30)/(this.ticks.length - 1)
									}

									selectToleranceField={this.selectToleranceField}
									//toleranceControllerRef={this.toleranceControllerRef}
								/>
							)
						}				
					</div>
					<div 
						className={ProfileMenuStyles.toleranceFieldList_div}
						style={{
							//'--profile-ctrl-contianer-width': `calc(${this.state.gridWidth}px + 2*var(--profile-ctrl-container-padding) + var(--profile-ctrl-container-border-width))`,
						}}
					>
						
						<div className={ProfileMenuStyles.fieldListTitleContainer1_div} >
							<div className={ProfileMenuStyles.fieldListTitleContainer2_div} >
								<div className={ProfileMenuStyles.fieldListTitle_div} >
									{ this.menuPage2 }
								</div>
							</div>
						</div>
			
						<ToleranceSettings 
							units={this.state.units}
							displayedProfileData={
								//this.props.test ? 
									this.state.displayedProfileData //: 
								//	this.state.profileData.userMetricsDto
								} 
							saveTickState={this.saveTickState}
							minTolerances={this.state.minTolerances}
							maxTolerances={this.state.maxTolerances}
							getToleranceValues={this.getToleranceValues}
							scale={this.scale}
							handlePresetClicked={this._handlePresetClicked}
							setPresetTolerances={this.setPresetTolerances}
							updateTolerances={this.updateTolerances}
							ticks={this.ticks}
							selectedPreset={this.state.selectedPreset}
							updateWidth={this.updateWidth}
							width={this.state.gridWidth}
							selectedField={this.state.selectedField}
							handleOnSubmit={this._handleOnSubmit} 
									
							handleTouchStart={this._handleTouchStart}
							handleTouchMove={this._handleTouchMove}
							handleTouchCancel={this._handleTouchCancel}
							handleTouchEnd={this._handleTouchEnd}

							tickPixelDelta={
								(window.innerWidth/window.innerHeight) <= 13/9 /*&& this.state.units == 'in'*/ ? 
									((window.innerWidth - 2*30) / (this.ticks.length - 1)) :
									this.state.units == 'in' ? 
										33 : 
										(360 - 2*30)/(this.ticks.length - 1)
							}
							selectToleranceField={this.selectToleranceField}
							//toleranceControllerRef={this.toleranceControllerRef}
						/>
					</div>
				</div>
			</div>
	
			<div style={{							
    			'display': 'inline-block',
    			'width': '42.5%',
    			'vertical-align':'top'
			}}>
				{/*<div  id='rightBodyContainer' style={bodyShapeContainer}>
					<div style={bodySvgContianerStyles}>
						{bodyShape === 'male' ? <MaleSideVertMirrored allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : <FemaleSideVertMirrored allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>}
					</div>
					<div style={bodySvgContianerStyles}>
						{bodyShape === 'male' ? <MaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : <FemaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>}
					</div>
				</div>*/}
			</div>
			</React.Fragment>
		);

		return(
			<div 
				className={ProfileMenuStyles.profileMenuContainer_div}
			>
				<div 
					className={ProfileMenuStyles.bodyDiagramContainer_div}
					//style={{							
    				//'display': 'inline-block',
					//'width': 'calc(50% - 320px)',
    				//'vertical-align':'top',
    				//'height':'100%'
    				//}}
    			>
					<div id='leftBodyDiagramContainer' style={bodyShapeContainer}>
						<div style={bodySvgContianerStyles}>
							{
								bodyShape === 'male' ? 
									<MaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : 
									<FemaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>
							}
						</div>
						<div style={bodySvgContianerStyles}>
							{
								bodyShape === 'male' ? 
									<MaleSide allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : 
									<FemaleSide allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>
							}
						</div>
					</div>
				</div>
				<Swipeable 
					onSwiped={
						(event) => {
							//var dist = Math.sqrt(Math.pow(event.absX, 2) + Math.pow(event.absY, 2));
							//var velocityX = event.velocity * Math.sqrt(Math.pow(dist, 2) - Math.pow(event.absY, 2)) / dist;
							if(
								(event.dir == LEFT && this.state.isMeasurement) || (event.dir == RIGHT && !this.state.isMeasurement)
							){
								this.toggleMeasurement()
							}
						}
					}
					delta={30}
					innerRef={this.setSwipeableStyles}
				>
					{ProfileMenuContent}
				</Swipeable>
			</div>
		);
	}
}