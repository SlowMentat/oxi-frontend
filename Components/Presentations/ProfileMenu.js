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

//SVG
import {SvgIcon} from '../SvgAssets/SvgIcon.js';




const InputNumberField = ({props}) => (
	<div className={props.containerStyle} style={props.selectedField === props.name ?  ({'border-style':'none'}) : null}>
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
			style={props.selectedField === props.name ? 
				({
					'background-color': '#ffffff00',
					color: 'white',
				}):
				null
			}

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
				<div className={ProfileMenuStyles.inputNumberContainer_div} style={this.props.style || (isSelected ? ({'border-radius': '2px', color:'white'}) : null)}>
					<div className={ProfileMenuStyles.selectHighlight_div} style={isSelected ? ({width: '100%'}) : ({width:'0px'})}>			
					</div>
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
	'display': 'inline-block'
}
const maleContainer = {
	'height':'calc(100vh - 80px)', 
	'width':'90%',
	'margin':'auto',
	'margin-top':'80px',
	'vertical-align':'top'
}
const femaleContainer = {								
	'width': '75%',
	'display': 'block',
	'margin':'auto',
	'margin-top': '185px'	
}

const Ruler = ({props}) => (props.ticks.map((tick, ticks) => (
		tick < 9 ? 
			(<div
				id={ (props.measurement + ((tick - ticks.length/2) * props.scale / 2)) }  
				className={ProfileMenuStyles.tick_div}>
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
		this.tickPixelDelta = 300/(this.props.ticks.length - 1);
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
		return(
			<div style={{
					height:'100%',
					'--main-height':'25px'
			}}>
				<div style={{'margin-bottom':'20px','position':'relative'}}>
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
						position: 'relative',
						height:'inherit',
				}}>
					<div className={ProfileMenuStyles.measurementsContainer_div}>
						{
							this.filteredFieldNames.map(field => (	
								field != 'height' ?//Skip height
									(<div className={ProfileMenuStyles.measurements_div}>
										<Ruler props={{
											ticks: this.props.ticks,
											scale: this.props.scale,
											measurement: this.props.displayedProfileData[field]
										}} />							
										<div className={ProfileMenuStyles.measurementValue_div} style={{width: `${this.tickPixelDelta}px`}}>
											{this.props.displayedProfileData[field]}
										</div>
									</div>) :
									null
							))
						}
					</div>
					<div className={ProfileMenuStyles.toleranceControllersContainer_div}>
						<div className={ProfileMenuStyles.toleranceController_div}>
							{
								Object.keys(this.props.minTolerances).map(field => (
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
												{this.props.getToleranceValues(field, true)}
											</div>
											<div className={ProfileMenuStyles.slideValueTo_div}> 
												- 
											</div>
											<div className={ProfileMenuStyles.slideValueMax_div}>
												{this.props.getToleranceValues(field, false)}
											</div>
										</div>
									</div>
								))
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function camelize(str){
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	})
}

/*
* Returns the min and max tolerances in ticks
*/
function getToleranceMinMax(minPrefix, maxPrefix, toleranceKeys, scale, ticks, toleranceObj, userMetricObj){
	let minToleranceFields = {};
	let maxToleranceFields = {};
	let minPrefixLength = minPrefix.length;
	let maxPrefixLength = maxPrefix.length;
	toleranceKeys.map(key => {
		if(key !== 'height'){	//Ignore height
			if(key.startsWith(minPrefix)){
				let keyWithoutPrefix = camelize(key.slice(minPrefixLength));
				minToleranceFields[keyWithoutPrefix] = Math.floor((userMetricObj[keyWithoutPrefix] - toleranceObj[key])/scale) + ((ticks.length - 1)/2);
			}else if(key.startsWith(maxPrefix)){
				let keyWithoutPrefix = camelize(key.slice(maxPrefixLength));
				maxToleranceFields[keyWithoutPrefix] = Math.floor((userMetricObj[keyWithoutPrefix] - toleranceObj[key])/scale) + ((ticks.length - 1)/2);
			}
		}
	});

	return { minToleranceFields, maxToleranceFields };
}

function getPreciseAndDisplayMeasurements(isTest, filteredUserMetrics, decimals){
	let iniMeasurements ={};
	let displayedProfileData ={};
	if(isTest){
		let maxHeight = 84;
		let minHeight = 48;
		let height = minHeight + Math.round((Math.random() * (maxHeight - minHeight)));
		Object.keys(filteredUserMetrics).map((key, id) => {
			Object.assign(iniMeasurements, {[key]: (Math.random()*height)})
			Object.assign(displayedProfileData, {[key]: (parseFloat(iniMeasurements[key].toFixed(decimals))) } )
		});
	}else{		
		iniMeasurements = filteredUserMetrics;
		Object.keys(filteredUserMetrics).map((key, id) => {
			Object.assign(displayedProfileData, {[key]: (parseFloat(iniMeasurements[key].toFixed(decimals))) } )
		});
	}
	return({iniMeasurements, displayedProfileData});
}

export default class ProfileMenu extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.test);
		this.menuPage1 = 'Measurements';
		this.menuPage2 = 'Tolerance';
		this.decimals = 1;
		this.scale = 0.5;
		this.ticks = [0,1,2,3,3,4,5,6,7,8];		
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

		var minToleranceFields = {};
		var maxToleranceFields = {};
		let {iniMeasurements, displayedProfileData} = getPreciseAndDisplayMeasurements(this.props.test, this.filteredUserMetrics, this.decimals)

		if(!this.props.test){
			let toleranceKeys = Object.keys(this.profile.toleranceDto);
			var { minToleranceFields, maxToleranceFields } = getToleranceMinMax('min', 'max', toleranceKeys, this.scale, this.ticks, this.profile.toleranceDto, this.profile.userMetricsDto);
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

	getToleranceValues(field, isMinTolerance){
		let value = 0;
		const displayedProfileDataValue = parseInt(this.state.displayedProfileData[field], 10);
		console.log('displayedProfileDataValue = ', displayedProfileDataValue);
		if(isMinTolerance){
			value = displayedProfileDataValue > 4 ? 
				(displayedProfileDataValue + (this.state.minTolerances[field] - 5) * this.scale) :
				(displayedProfileDataValue + (this.state.minTolerances[field] - 4) * this.scale)
		}else{
			value = displayedProfileDataValue > 4 ? 
				(displayedProfileDataValue + (this.state.maxTolerances[field] - 5) * this.scale) :
				(displayedProfileDataValue + (this.state.maxTolerances[field] - 4) * this.scale)
		}
		console.log('value = ', value);
		return value;
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
					[field]:parseFloat(prevState.units === 'cm' ? e.target.value : (e.target.value * 2.54))
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
		//returned by the server, which is refernced to dynamically build this.state.profileData fields.
		let scrubbedProfileState = Object.assign({}, this.state.profileData, {id: 1});

		//gotta do some string gymnastics so construct tolerance ojbect property that is compatible
		//with the server api spec
		let tolerance = {};
		for(let field of Object.keys(this.state.minTolerances)){
			tolerance[`min${field.charAt(0).toUpperCase() + field.slice(1)}`] = this.getToleranceValues(field, true);
		}

		for(let field of Object.keys(this.state.maxTolerances)){
			tolerance[`max${field.charAt(0).toUpperCase() + field.slice(1)}`] = this.getToleranceValues(field, false);			
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
			let convertedDisplayData = prevState.displayedProfileData;
			for(let field of Object.keys(prevState.displayedProfileData)){
				convertedDisplayData[field] = prevState.units === 'cm' ? 
					(prevState.profileData.userMetricsDto[field] / 2.54).toFixed(this.decimals): //convert to inches
					(prevState.profileData.userMetricsDto[field]).toFixed(this.decimals); //convert to centimeters
			}
			return({
				units: (prevState.units === 'cm' ? 'in' : 'cm'),
				displayedProfileData: {
					...convertedDisplayData
				}
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
								this.state.profileData[field] :
								this.state.profileData[field] / 2.54
					} 
					callback={()=>{this._handleInputFieldChange(event, field)}} 
					onSelect={() => this._handleFieldFocus(event)}
					selectedField={this.state.selectedField}
					units={this.state.units}/>
			);
		});
		const bodyShape = this.state.profileData.userMetricsDto.bodyShape;
		let bodyShapeContainer = (bodyShape === 'female') ? femaleContainer : maleContainer;
		console.log('bodyShapeContainer = ', bodyShapeContainer);
		console.log('fieldSet');
		console.log(fieldSet);
		return(
			<div style={{'background-color':'var(--main-background-color)'}}>
				<div style={{							
    				'display': 'inline-block',
					'width': 'calc(50% - 180px)',
    				'vertical-align':'top'
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

				<div className={ProfileMenuStyles.fieldList_div}>
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
								selectedPreset={this.state.selectedPreset}/>
						)
					}

					<div className={ProfileMenuStyles.btnsContainer_div}>
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
					</div>					
				</div>

				<div style={{							
    				'display': 'inline-block',
    				'width': '42.5%',
    				'vertical-align':'top'
				}}>
					<div  id='rightBodyContainer' style={bodyShapeContainer}>
						<div style={bodySvgContianerStyles}>
							{bodyShape === 'male' ? <MaleSideVertMirrored allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : <FemaleSideVertMirrored allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>}
						</div>
						<div style={bodySvgContianerStyles}>
							{bodyShape === 'male' ? <MaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/> : <FemaleFront allOff={false} selectedField={this.state.selectedField} strokeWidth="0.26458px"/>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}