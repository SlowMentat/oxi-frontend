import 'babel-polyfill';
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

//CSS Styles
import Styles from '../../root.css';
import NavStyles from '../../nav.css';
import FormStyles from '../../forms.css';
import CreateAccountStyles from '../../createAccount.css';
import ProfileMenuStyles from '../../profileMenu.css';

//Constants
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {roundTo} from '../../Util/Misc.js';

//SVG
import {SvgIcon} from '../SvgAssets/SvgIcon.js';




const InputNumberField = ({props}) => (
	<div 
		className={props.containerStyle} 
		//style={props.selectedField === props.name ?  ({'border-style':'none'}) : ({})}
	>
		{props.type} <input 
			id="measurementField"
			value={props.value}
			type="number"
			step="0.5"
			maxlength="5"
			min="0"
			max="999.99" 
			name={props.name} 
			placeholder={props.placeholder} 
			onChange={props.onChange} 
			className={props.inputStyle}
			onFocus={props.onSelect}
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
						selectedField: this.props.selectedField
					}}/>
					<div className={ProfileMenuStyles.displayUnits_div} style={(isSelected ? ({color: '#70ccf4'}) : null)}>
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
	'width': '15px',
    'height': '15px',
    'border-style': 'solid',
   	'border-radius': '7.5px',
    'border-width': '1px'
}
const selectedRadioStyle = { 
	'width': '15px',
    'height': '15px',
    'border-style': 'solid',
   	'border-radius': '7.5px',
    'border-width': '1px',
    'background-color':'black'
}
const checkBoxStyle = {
	'width': '15px',
    'height': '15px',
    'border-style': 'solid',
   	'border-radius': '2px',
    'border-width': '1px'
}
const selectedCheckBoxStyle = {
	'width': '15px',
    'height': '15px',
    'border-style': 'solid',
   	'border-radius': '2px',
    'border-width': '1px',
    'background-color':'black'	
}
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
					'background-color': (ind === props.ticks.length/2 - 1 ? 'white' : null)
				}}>
			</div>) : 
			null
	))
);

const TolerancePresets = ({props}) => (
	<div 
		className={ProfileMenuStyles.toleranceCheckBox_div}
		style={ props.selectedPreset === props.label ? ({'background-color': '#525252', 'color':'white'}) : ({}) }
		onClick={(e) => props.handlePresetClicked(e, props.label)}
	>
		{props.label}
	</div>
)

const SlideSwitch = ({props}) => (
	<div className={ProfileMenuStyles.inputNumberContainer_div}>
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
	
		//let minToleranceFields = {};
		//let maxToleranceFields = {};
		this.filteredFieldNames = Object.keys(this.props.displayedProfileData); //Object.keys(this.props.displayedProfileData).filter(field => (field !== 'id' && field !== 'country' && field !== 'username' && field !== 'bodyShape' && field !== 'mens' && field !== 'womens'));
		//this.ticks = [0,1,2,3,3,4,5,6,7,8];
		//this.scale = 0.5;
		this.slideWidth = 7.5;	//slide width in px
		//this.tickPixelDelta = (300 - 30)/2/this.props.ticks.length;
		this.tickPixelDelta = 33;//298/(this.props.ticks.length - 1);
		//this.width = this.props.width;//(this.props.ticks.length  - 1) * this.tickPixelDelta;
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
		this._sliderReleased = this._sliderReleased.bind(this);
		this.getDeltaTick = this.getDeltaTick.bind(this);
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
		const deltaTick = Math.round((this.state.deltaX)/this.tickPixelDelta);
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

	_sliderGrabbed(e, field, isMinSlider){
		e.stopPropagation();
		console.log('e = ', e.clientX)
		const xCoord = e.clientX;
		//const adjTick = isMinSlider ? this.state.minTolerances[field] : this.state.maxTolerances[field] + 1;
		this.setState({
			[(isMinSlider ? 'minGrabbedSlider' : 'maxGrabbedSlider')]: field,
			startX: xCoord,
			startTick: this.props[(isMinSlider ? 'minTolerances' : 'maxTolerances')][field],
			sliderTransition: false
		});

		this.handleMinSliderMoveWrapper = (e) => this._handleMinSliderMove(e, field);
		this.handleMaxSliderMoveWrapper = (e) => this._handleMaxSliderMove(e, field);
		this.handleMinSliderReleasedWrapper = (e) => this._sliderReleased(e, true);
		this.handleMaxSliderReleasedWrapper = (e) => this._sliderReleased(e, false);

		if(isMinSlider){
			window.addEventListener('mousemove', this.handleMinSliderMoveWrapper);
			window.addEventListener('mouseup', this.handleMinSliderReleasedWrapper);
		}else{
			window.addEventListener('mousemove', this.handleMaxSliderMoveWrapper);	
			window.addEventListener('mouseup', this.handleMaxSliderReleasedWrapper);
		}		
	}

	_sliderReleased(e, isMinSlider){
		const field = (isMinSlider ? this.state.minGrabbedSlider : this.state.maxGrabbedSlider);
		const toleranceObjType = (isMinSlider ? 'minTolerances' : 'maxTolerances');

		this.props.updateTolerances(toleranceObjType, field, (this.state.startTick + this.state.deltaTick));

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

		switch(true){
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

	render(){
		//container width = 
		//	var(--profile-ctrl-contianer-width) - 
		//	2*var(--profile-ctrl-container-padding) - 
		//	2*var(--profile-ctrl-container-border-width)

		//this.tickPixelDelta = 298/(this.props.ticks.length - 1);		
		var calcWidth = (this.props.ticks.length  - 1) * this.tickPixelDelta;
		if(this.props.width !== calcWidth){
			this.props.updateWidth(calcWidth);
			//this.width = calcWidth;
		}

		//this.tickPixelDelta = `calc(100%/${this.props.ticks.length}`;
		return(
			<div style={{
					height:'calc(100% - 110px)',
					'--main-height':'25px',
					'padding-top':'50px',
					'position':'relative',
			}}>
				<div style={{
					'margin-bottom':'20px',
					'position':'relative',
					width:'300px',
					margin:'auto',
				}}>
					<div className={ProfileMenuStyles.tolerancePresetContainer_div}>
						<div className={ProfileMenuStyles.tolerancePreset_div}>
							<TolerancePresets props={{
								label:'Tight',
								selectedPreset: this.props.selectedPreset,
								handlePresetClicked: this.props.handlePresetClicked,
							}}/>
						</div>
					</div>
					<div className={ProfileMenuStyles.tolerancePresetContainer_div}>
						<div className={ProfileMenuStyles.tolerancePreset_div}>
							<TolerancePresets props={{
								label:'Fit',
								selectedPreset: this.props.selectedPreset,
								handlePresetClicked: this.props.handlePresetClicked,
							}}/>
						</div>
					</div>
					<div className={ProfileMenuStyles.tolerancePresetContainer_div}>
						<div className={ProfileMenuStyles.tolerancePreset_div}>
							<TolerancePresets props={{
								label:'Loose',
								selectedPreset: this.props.selectedPreset,
								handlePresetClicked: this.props.handlePresetClicked,
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
						bottom: '0px',
				}}>
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
											className={ProfileMenuStyles.measurements_div}
											style={(
												field === this.props.selectedField ? 
													({'background-color':'#70ccf4'}) :
													({})
											)}>
											<Ruler props={{
												ticks: this.props.ticks,
												scale: this.props.scale,
												measurement: this.props.displayedProfileData[field]
											}} />							
											<div 
												className={ProfileMenuStyles.measurementValue_div} 
												style={{
													width: `calc(100%/${this.props.ticks.length - 1})`,
													//width: 'var(--mvalue-width)',// `${this.tickPixelDelta}`,
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
					
					<div className={ProfileMenuStyles.toleranceControllersContainer_div}>
						<div className={ProfileMenuStyles.toleranceController_div}>
							{
								Object.keys(this.props.minTolerances).map(field => {
									var {minTolVal, maxTolVal} = this.props.getToleranceValues(field);
									return(
										<div className={ProfileMenuStyles.sliderContainer_div}>											
											<div className={ProfileMenuStyles.slideLabel}>
												{field}
											</div>
	
											<div 
												id={field} 
												className={ProfileMenuStyles.minSlider_div}
												onMouseDown={(e) => this._sliderGrabbed(e, field, true)}
												//onMouseUp={(e) => this._sliderReleased(e, true)}
												style={
													this.state.minGrabbedSlider === field ? 
														({left: `${this.props.minTolerances[field]*this.tickPixelDelta + this.state.deltaX}px`, transition: 'none'}) : 
														({left: `${this.tickPixelDelta * (this.props.minTolerances[field]) - this.slideWidth}px`, transition: 'left 150ms ease-in-out'})
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
												onMouseDown={(e) => this._sliderGrabbed(e, field, false)}
												//onMouseUp={(e) => this._sliderReleased(e, false)}
												style={
													this.state.maxGrabbedSlider === field ? 
														({left: `${(this.props.maxTolerances[field])*this.tickPixelDelta + this.state.deltaX}px`, transition: 'none'}) :
														({left: `${this.tickPixelDelta * (this.props.maxTolerances[field]) - this.slideWidth}px` , transition: 'left 150ms ease-in-out'})
												}
											>
												<div>
													<div>
														
													</div>
												</div>
											</div>
	
											<div className={ProfileMenuStyles.slideValueRange_div}>
												<div className={ProfileMenuStyles.slideValueMin_div}>
													{minTolVal}
												</div>
												<div className={ProfileMenuStyles.slideValueTo_div}> 
													- 
												</div>
												<div className={ProfileMenuStyles.slideValueMax_div}>
													{maxTolVal}
												</div>
											</div>
										</div>
									)}
								)
							}
						</div>
					</div>

					<div className={ProfileMenuStyles.btnsContainer_div}>
						<div className={ProfileMenuStyles.btns_div}>
							<div 
								onClick={(event) => this.props.handleOnSubmit()} 
								className={ProfileMenuStyles.submitBtnText_div}
								style={{left:'0px'}} >
								Submit
							</div>
						</div>
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
//function getToleranceMinMax(minPrefix, maxPrefix, toleranceKeys, scale, ticks, toleranceObj, userMetricObj, decimals){
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

function getAccurateAndDisplayMeasurements(isTest, filteredUserMetrics, decimals, scale){
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
			Object.assign(displayedProfileData, {[key]: (parseFloat( roundTo(iniMeasurements[key], scale, decimals))) } )
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
		this.scaleIn = 0.5;
		this.scaleCm = 0.5;//convertInToCm(this.scaleIn);
		this.ticksIn = [0,1,2,3,4,4,5,6,7,8];
		this.ticksCm = [];
		this.scale = this.scaleCm;	
		let leftRangeIn = this.scale*(this.ticksIn.length - 2)/2;
		let leftRangeCm = convertInToCm(leftRangeIn);
		let lengthTicksCm = 2*(leftRangeCm/this.scaleCm + 1)

		for(let tick = 0; tick < (lengthTicksCm - 1); tick++){
			this.ticksCm = [...this.ticksCm, (tick >= (lengthTicksCm/2 - 1) ? tick - 1 : tick)];
		}

		this.ticks = this.ticksCm;//[0,1,2,3,3,4,5,6,7,8];	
		//used to get actual min/max tolerance values during preset selection and slider movemnt
		this.leftCenterTick = this.ticks.length/2 - 1; 
		this.rightCenterTick = this.ticks.length/2;
		this.presets = {
			preset1: 'Tight',
			preset2: 'Fit',
			preset3: 'Loose',
		}

		this.profile = this.props.addedProfile !== undefined ? this.props.addedProfile : this.props.profile;
		this.filteredFieldNames =  Object.keys(this.profile.userMetricsDto).filter(field => field != 'id')
		//.filter(field => field != 'height')
		.filter(field => field != 'bodyShape')
		.filter(field => field != 'mens')
		.filter(field => field != 'username')
		.filter(field => field != 'womens')
		.filter(field => field != 'apparelInterest')
		.filter(field => field != 'country')
		.filter(field => field != 'toleranceDto')
		.filter(field => field != 'dateOfBirth');

		//construct a filtered userMetrics Object 
		this.filteredUserMetrics = {};

		this.filteredFieldNames.map((key, id) => {
			Object.assign(this.filteredUserMetrics, {[key]: this.profile.userMetricsDto[key]})
		})

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
		this.getToleranceMinMax = this.getToleranceMinMax.bind(this);
		this.updateWidth = this.updateWidth.bind(this);

		var minToleranceFields = {};
		var maxToleranceFields = {};
		let {iniMeasurements, displayedProfileData} = getAccurateAndDisplayMeasurements(this.props.test, this.filteredUserMetrics, this.decimals, this.scale)

		if(!this.props.test){
			//let toleranceKeys = Object.keys(this.profile.toleranceDto);
			//var { minToleranceFields, maxToleranceFields } = getToleranceMinMax('min', 'max', toleranceKeys, this.scale, this.ticks, this.profile.toleranceDto, this.profile.userMetricsDto, this.decimals);
			var { minToleranceFields, maxToleranceFields } = this.getToleranceMinMax('min', 'max');
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
			({
				'bodyShape': this.profile.userMetricsDto.bodyShape,
				'womens': this.profile.userMetricsDto.womens,
				'mens': this.profile.userMetricsDto.mens,	
			});

		this.state = {
			minTolerances: minToleranceFields,
			maxTolerances: maxToleranceFields,
			'prevSelectedField':'',
			'selectedField':'',
			'fieldListTitle':this.menuPage1,
			units: 'cm',
			gridWidth:360,
			'profileData':{
				'username':this.profile.username,

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
			displayedProfileData
		}
	}

	updateTolerances(toleranceType, key, value){
		this.setState(prevState => ({
			[toleranceType]:{
				...this.state[toleranceType],
				[key]:value
			}
		}));
	}

	setPresetTolerances(preset){		
		let minToleranceFields = {};
		let maxToleranceFields = {};
		let minToleranceValue = 0;
		let maxToleranceValue = this.ticks.length-1;

		switch(true){
			//Tight
			case preset === this.presets.preset1:
				minToleranceValue = this.leftCenterTick - 2;//2;
				maxToleranceValue = this.leftCenterTick - 1;//3;
				break;
			//Fit
			case preset === this.presets.preset2:
				minToleranceValue = this.leftCenterTick;//4;
				maxToleranceValue = this.rightCenterTick;//5;
				break;
			//Loose
			case preset === this.presets.preset3:
				minToleranceValue = this.rightCenterTick + 1;//6;
				maxToleranceValue = this.rightCenterTick + 2;//7;
				break;
		}

		for(let field of Object.keys(this.state.displayedProfileData)){
			//values int ticks indecese 
			if(field != 'height'){
				minToleranceFields = Object.assign({}, minToleranceFields, {[field]: minToleranceValue });
				maxToleranceFields = Object.assign({}, maxToleranceFields, {[field]: maxToleranceValue });
			}
		}

		return({
			minTolerances:{
				...minToleranceFields
			},
			maxTolerances:{
				...maxToleranceFields
			},
		});
	}

	/*
	*	Gets the tolerance min and max values from the tick information stored in this components state.
	*	field: the key of tolerance object
	*		prevUnits:  indicates the units being switched from when user toggles units
	*		retrieveConvertedValues 
	*/	
	getToleranceValues(field, prevUnits=null/*, isMinTolerance*/){
		//let value = 0;
		const getDeltaTick = (tickOrigin, tolerance) => (tolerance - tickOrigin);
		var shownDataVal;

		//If prevUnits is provided this method was invoked from a unit switch operation.  In this case, the prevUnits must be used to 
		//determine if this is a cm to in transition and the current displayedProfileData object needs to be converted to cm.
		shownDataVal = prevUnits === 'in' ?
			parseInt(convertInToCm(this.state.displayedProfileData[field], 10)) :
			parseFloat(this.state.displayedProfileData[field], 10);

		console.log('shownDataVal = ', shownDataVal);

		var deltaTickMin = 0;
		var deltaTickMax = 0;
		var minTolVal;
		var maxTolVal;
		var minTolState = this.state.minTolerances[field];
		var maxTolState = this.state.maxTolerances[field];

		//MinTol slider on the right side of measured value
		if(minTolState > this.leftCenterTick){
			deltaTickMin = getDeltaTick(this.rightCenterTick, minTolState);
		}
		//MinTol slider on the left side of measured value
		else{
			deltaTickMin = getDeltaTick(this.leftCenterTick, minTolState);
		}

		//MaxTol slider on the left side of measured value
		if(maxTolState < this.rightCenterTick){
			deltaTickMax = getDeltaTick(this.leftCenterTick, maxTolState);
		}
		//MaxTol slider on the right side of measured value
		else{
			deltaTickMax = getDeltaTick(this.rightCenterTick, maxTolState);
		}

		minTolVal = shownDataVal + deltaTickMin * this.scaleCm;
		maxTolVal = shownDataVal + deltaTickMax * this.scaleCm;

		return {minTolVal, maxTolVal};
	}

	/*
	* Returns the min and max tolerances in ticks
	*/
	getToleranceMinMax(minPrefix, maxPrefix){
		let minToleranceFields = {};
		let maxToleranceFields = {};
		let minPrefixLength = minPrefix.length;
		let maxPrefixLength = maxPrefix.length;
		var { userMetricsDto, toleranceDto } = this.profile;

		const calcTicks = (deltaTick, originTick) => {
			return (deltaTick + originTick);
		}
	
		const calcMinTicks = (deltaTick, originTick) => {
			return deltaTick <= 0 ? (deltaTick + originTick / 2 - 1) : (deltaTick + originTick / 2);
		}

		const calcMaxTicks = (deltaTick, originTick) => {
			return deltaTick >= 0 ? (deltaTick + originTick / 2 - 1) : (deltaTick + originTick / 2);
		}
	
		Object.keys(toleranceDto).map(key => {
			//Ignore height
			if(key !== 'height'){
	
				if(key.startsWith(minPrefix)){
					var keyWithoutPrefix = camelize(key.slice(minPrefixLength));
					var valueDiff = toleranceDto[key] - roundTo(userMetricsDto[keyWithoutPrefix], this.scale, this.decimals);	
					var tickDiff = valueDiff / this.scale;
					var centerTick = (toleranceDto[key] / this.scale) === this.rightCenterTick ? this.rightCenterTick : this.leftCenterTick;

					minToleranceFields[keyWithoutPrefix] = calcTicks(tickDiff, centerTick);
				}
				else if(key.startsWith(maxPrefix)){
					var keyWithoutPrefix = camelize(key.slice(maxPrefixLength));
					var valueDiff = toleranceDto[key] - roundTo(userMetricsDto[keyWithoutPrefix], this.scale, this.decimals);
					var tickDiff = valueDiff / this.scale;
					var centerTick = (toleranceDto[key] / this.scale) === this.leftCenterTick ? this.leftCenterTick : this.rightCenterTick;

					maxToleranceFields[keyWithoutPrefix] = calcTicks(tickDiff, centerTick);
				}
			}
		});
	
		return { minToleranceFields, maxToleranceFields };
	}

	_handlePresetClicked(e, label){
		console.log('_presetClicked')
		this.setState(prevState => ({
			selectedPreset: label,
			...this.setPresetTolerances(label)
		}));
	}

	_handleInputFieldChange(e, field){
		this.setState(prevState => ({
			'profileData':{
				...prevState.profileData,				
				userMetricsDto:{
					...prevState.profileData.userMetricsDto,
					[field]:parseFloat(prevState.units === 'cm' ? 
						roundTo(e.target.value, this.scaleCm) : 
						roundTo(convertInToCm(e.target.value), this.scaleCm))
				}
			}
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
		console.log('event.target.name = ', event.target.name)
		this.setState(prevState => {

			let updatedDisplayData =  
				prevState.selectedField !== 'id' && 
				prevState.selectedField !== 'country' && 
				prevState.selectedField !== 'username' && 
				prevState.selectedField !== 'bodyShape' && 
				prevState.selectedField !== 'mens' && 
				prevState.selectedField !== 'womens' &&
				prevState.selectedField !== '' ? 
					({ [prevState.selectedField]: (prevState.units === 'cm' ? 
						parseFloat(prevState.profileData.userMetricsDto[prevState.selectedField].toFixed(this.decimals)) : 
						parseFloat((prevState.profileData.userMetricsDto[prevState.selectedField] / 2.54).toFixed(this.decimals))
					) }) :
					({});

			return({
				selectedField: event.target.name,
				displayedProfileData:{
					...prevState.displayedProfileData,
					...updatedDisplayData
				}
			})
		});
	}

	_handleFieldBlur(event){
		/*this.setState(prevState => ({
			prevSelectedField: event.target.name
		}));*/
	}

	_handleOnSubmit(){
		//When calling modifyProfile the profileData object is passed as the action payload.
		//The reducer is expecting this payload to contain an id field which it uses as a key
		//to reference the payload data in the redux state tree.  This id field needs to be
		//added explicitly here because it is left undefined when the profile object is 
		//returned by the server, and because it is refernced to when dynamically building this.state.profileData fields.
		let scrubbedProfileState = Object.assign({}, this.state.profileData, {id: 1});


		//gotta do some string gymnastics so construct tolerance ojbect property that is compatible with the server api spec.
		//Also convert to cm (if units are inches) before sending to server
		let tolerance = {};
		for(let field of Object.keys(this.state.minTolerances)){
			var {minTolVal, maxTolVal} = this.getToleranceValues(field, this.state.units);
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
			let leftCenterTickIn = this.ticksIn.length/2 - 1; 
			let rightCenterTickIn = this.ticksIn.length/2;

			const switchUnitSystem = (field, prevScale, nextScale, nextTicks, nextLeftCenterTick, nextRightCenterTick, unitConverter) => {
				var prevTickRange = (prevState.maxTolerances[field] - prevState.minTolerances[field]);
				var {minTolVal, maxTolVal} = this.getToleranceValues(field, prevState.units);
				var prevMinMaxRange = unitConverter( prevScale * prevTickRange );
				var tickRange = Math.round(prevMinMaxRange / nextScale);				
				tickRange = tickRange === 0 ? 1 : tickRange;
				var convertedMinTolVal;
				var measuredVal;

				if(prevState.units === 'cm'){
					//from the converted tickRange, compute the new min and maxTolerance tick value
					var convertedMinTolVal = unitConverter(minTolVal);
					measuredVal = unitConverter(prevState.profileData.userMetricsDto[field]);
				}else{
					convertedMinTolVal = minTolVal;
					measuredVal = prevState.profileData.userMetricsDto[field];
				}

				//var measuredVal = prevState.units === 'cm' ?
				//	unitConverter(prevState.profileData.userMetricsDto[field]) :
				//	prevState.profileData.userMetricsDto[field];

				//calculate the tick value of the minTolerance on the new unit scale
				var minTickDelta = ((measuredVal - convertedMinTolVal) / nextScale);
				var minTick = parseInt((nextTicks[nextTicks.length / 2 - 1] - minTickDelta).toFixed());
				//calculate the maxTick 
				var maxTick = parseInt((minTick + tickRange).toFixed());

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

					//huh... thought there were going to be more cases ¯\_(ツ)_/¯
				}

				//set the new min and max tick values
				convertedMaxTol = {
					...convertedMaxTol,
					[field]: maxTick,
				};					
				convertedMinTol = {
					...convertedMinTol,
					[field]: minTick,
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
					/*{convertedMaxTol, convertedMinTol} =*/ switchUnitSystem(field, this.scaleCm, this.scaleIn, this.ticksIn, leftCenterTickIn, rightCenterTickIn, convertCmToIn );
				}else{
					/*{convertedMaxTol, convertedMinTol} = */switchUnitSystem(field, this.scaleIn, this.scaleCm, this.ticksCm, this.leftCenterTick, this.rightCenterTick, convertInToCm );
				}
				//var prevTickRange = (prevState.maxTolerances[field] - prevState.minTolerances[field]);
				////Get previous min and max tolerance values
				//var {minTolVal, maxTolVal} = this.getToleranceValues(field, prevState.units);
				////var prevMinTolVal = this.getToleranceValues(field, true);

				//if(prevState.units === 'cm'){
				//	var prevMinMaxRange = convertCmToIn( this.scaleCm * prevTickRange );
				//	var tickRange = Math.round(prevMinMaxRange / this.scaleIn);
				//	tickRange = tickRange === 0 ? 1 : tickRange;
				//	//from the converted tickRange, compute the new min and maxTolerance tick value
				//	var minTolValIn = convertCmToIn(minTolVal);
				//	var measuredVal = convertCmToIn(prevState.profileData.userMetricsDto[field]);
				//	//calculate the tick value of the minTolerance on the new unit scale
				//	var minTickDelta = ((measuredVal - minTolValIn) / this.scaleIn);
				//	var minTick = parseInt((this.ticksIn[this.ticksIn.length / 2 - 1] - minTickDelta).toFixed());
				//	//calculate the maxTick 
				//	var maxTick = parseInt((minTick + tickRange).toFixed());

				//	//Check if minTick is leftCenter tick while max tick is gt. right center tick.  If so, increment minTick and maxTick by 1.
				//	//This is done to accomodate for the fact that leftCenterTick and rightCenterTick are the same value.  min/maxTicks need to be
				//	//incremented or decremented depending on whether they appear above or below the measured value
				//	var minTickAdjust = minTick >= this.ticksIn.length - 2 ? 0 : 1;
				//	var maxTickAdjust = maxTick >= this.ticksIn.length - 1 ? 0 : 1;
				//	switch(true){
				//		case (minTick === leftCenterTickIn && maxTick > rightCenterTickIn):
				//			
				//			minTick += minTickAdjust;
				//			maxTick += maxTickAdjust;
				//			break;

				//		case (minTick > rightCenterTickIn):
				//			minTick += minTickAdjust;
				//			
				//		case (maxTick > rightCenterTickIn):
				//			maxTick += maxTickAdjust;

				//		default:
				//			break;

				//		//huh... thought there were going to be more cases ¯\_(ツ)_/¯
				//	}

				//	//set the new min and max tick values
				//	convertedMaxTol = {
				//		...convertedMaxTol,
				//		[field]: maxTick,
				//	};					
				//	convertedMinTol = {
				//		...convertedMinTol,
				//		[field]: minTick,
				//	}
				//}else{

				//}
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


		if(this.state.units === 'cm'){
			this.ticks = this.ticksCm;
			this.scale = this.scaleCm;
			//reset the left center tick value
			this.leftCenterTick = this.ticks.length/2 - 1; 
			this.rightCenterTick = this.ticks.length/2; 
		}else{
			this.ticks = this.ticksIn;
			this.scale = this.scaleIn;
			//reset the left center tick value
			this.leftCenterTick = this.ticks.length/2 - 1; 
			this.rightCenterTick = this.ticks.length/2; 
		}

		console.log('filteredFieldNames');
		console.log(this.filteredFieldNames);
		let fieldSet = this.filteredFieldNames.map(field => {
			//console.log(this.state.profileData[field]);
			return(
				<ProfileFieldWrapper 
					key={field} 
					field={field} 
					value={
						this.state.selectedField !== field ? 
							this.state.displayedProfileData[field] : 
							this.state.units === 'cm' ? 
								this.state.profileData.userMetricsDto[field] :
								convertCmToIn(this.state.profileData.userMetricsDto[field])
					} 
					callback={()=>{this._handleInputFieldChange(event, field)}} 
					onSelect={() => this._handleFieldFocus(event)}
					selectedField={this.state.selectedField}
					units={this.state.units}/>
			);
		});
		const bodyShape = this.state.profileData.userMetricsDto.bodyShape;
		let bodyShapeContainer = maleContainer;//(bodyShape === 'female') ? femaleContainer : maleContainer;
		console.log('bodyShapeContainer = ', bodyShapeContainer);
		console.log('fieldSet');
		console.log(fieldSet);
		return(
			<div style={{
				'background-color':'var(--main-background-color)',
				'--container-height': '714.5px',
				height:'calc(100vh - 80px)',
				'margin-top':'80px',
				'overflow':'hidden', 
			}}>
				<div style={{							
    				'display': 'inline-block',
					'width': 'calc(50% - 320px)',
    				'vertical-align':'top',
    				'height':'100%'
    			}}>
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
								{/*<ProfileFieldWrapper 
									field='country' 
									value={this.state.profileData['USA']} 
									callback={()=>{this._handleInputFieldChange(event, 'country')}}
									onSelect={() => this._handleFieldFocus(event)} 
									selectedField={this.state.selectedField} />*/}
								<SlideSwitch props={{
									toggleSlidSwitch: this._toggleSlidSwitch,
									units: this.state.units
								}}/>
								<div style={{'margin-bottom':'10px'}} >
										<div>
											<div>
												<div id="bodyShape" style={{'text-align':'left', 'margin-top':'10px'}} >
													<div id="bodyShapeRadioList" style={radioListStyle}>
														<div id="female" style={radioAndCheckContainerStyle}>
															<div id='bodyShapeTitle' style={radioTitleStyle}>Female</div>
															<div id='bodyShapeRadio' style={bodyShape === 'female' ? selectedRadioStyle : radioStyle} onClick={() => this._handleRadioToggled('female')}></div>
														</div>
														<div id="male" style={{'display':'inline-block'}}>
															<div id='bodyShapeTitle' style={radioTitleStyle}>Male</div>
															<div id='bodyShapeRadio' style={bodyShape === 'male' ? selectedRadioStyle : radioStyle} onClick={() => this._handleRadioToggled('male')}></div>										
														</div>
													</div>
													<div id="bodyShapeTitle" style={{'display':'inline-block', 'vertical-align':'bottom'}}>
														Body Shape
													</div>								
												</div>
												<div id="apparelInterest" style={{'text-align':'left','margin-top':'10px'}} >
													<div id="apperelInterestRadioList" style={radioListStyle}>
														<div id="womens" style={radioAndCheckContainerStyle}>
															<div style={radioTitleStyle}>Womens</div>
															<div style={this.state.profileData.userMetricsDto.womens ? selectedCheckBoxStyle : checkBoxStyle} onClick={() => this._handleBoxChecked('womens')} ></div>
														</div>
														<div id="mens" style={{'display':'inline-block'}}>
															<div style={radioTitleStyle}>Mens</div>
															<div style={this.state.profileData.userMetricsDto.mens ? selectedCheckBoxStyle : checkBoxStyle} onClick={() => this._handleBoxChecked('mens')}></div>
														</div>
													</div>
													<div id="apparelInterestTitle" style={{'display':'inline-block', 'vertical-align':'bottom'}}>
														Apperel Interest
													</div>			
												</div>								
											</div>
										</div>
								</div>
								{/*<ProfileFieldWrapper 
									field='height' 
									value={
										this.state.selectedField !== 'height' ? 
											this.state.displayedProfileData['height'] : 
											this.state.units === 'cm' ? 
												this.state.profileData.userMetricsDto['height'] :
												this.state.profileData.userMetricsDto['height'] / 2.54
									} 
									callback={()=>{this._handleInputFieldChange(event, 'height')}} 
									onSelect={() => this._handleFieldFocus(event)} 
									selectedField={this.state.selectedField}
									units={this.state.units} />*/}
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
								width={this.state.gridWidth}/>
						)
					}

					{/*<div className={ProfileMenuStyles.btnsContainer_div}>
						<div className={ProfileMenuStyles.btns_div}>
							{
								this.state.fieldListTitle === this.menuPage2 ?
									(
										<div 
											onClick={() => {this._goToMeasurments()}} 
											className={ProfileMenuStyles.goBackBtnText_div}>
											Back
										</div>
									) :
									null
							}
							<div 
								onClick={() => {this.state.fieldListTitle === this.menuPage1 ? this._goToTolerance() : this._handleOnSubmit()}} 
								className={ProfileMenuStyles.submitBtnText_div} >
								{this.state.fieldListTitle === this.menuPage1 ? ('Next') : ('Submit')}
							</div>
						</div>
					</div>*/}					
				</div>
				<div 
					className={ProfileMenuStyles.toleranceFieldList_div}
					style={{
						'--profile-ctrl-contianer-width': `calc(${this.state.gridWidth}px + 2*var(--profile-ctrl-container-padding) + var(--profile-ctrl-container-border-width))`,
					}}>
					
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
						handleOnSubmit={this._handleOnSubmit} />
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
			</div>
		);
	}
}