
import React from 'react';
import ReactDOM from 'react-dom';

import BrowseControlContainer from '../../Components/Containers/BrowseControlContainer.js';
import ProfileTitleContainer from '../../Components/Containers/ProfileTitleContainer.js';
import VisibleMetricList from '../../Components/Containers/VisibleMetricList.js';
import { PpIcon } from '../../Components/Presentations/ProfileTitle.js';

import MetricStyles from '../../metric.scss';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import Styles from '../../root.scss';
import {SvgIcon} from '../../Components/SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Button } from './Controls.js';
import { Elevation } from '@rmwc/elevation';
import '@rmwc/elevation/styles';
import { Drawer, DrawerContent } from '../../Components/Presentations/FitseeUI/Drawer.js';
import '@rmwc/drawer/styles';

import { 
	Swipeable,
	LEFT,
	RIGHT,
	UP,
	DOWN,
} from '../../Components/Presentations/FitseeUI/Swipeable.js';



const DrawerWrapper = (props) => {
	return(
		<Drawer 
			modal 
			open={props.isOpen}
			onClose={(e) => props.toggleMetricPanel(e, false)}
			style={{
				'z-index': '20',
    			width: 'calc(100vw - 48px)',
    			top: '0px',
    			'border-right-width': '0px;',
			}}
		>
			<DrawerContent>
				{ props.children }
			</DrawerContent>
		</Drawer>
	);
}

export class MetricPanel extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			fitResult: null,
			selectedLabel: null,
		}

		this.setFitResult = this.setFitResult.bind(this);
		this.setSelectedLabel = this.setSelectedLabel.bind(this);
	}

	setFitResult(value){
		this.setState({ fitResult: value });
	}

	setSelectedLabel(value){
		this.setState({ selectedLabel: value });
	}

	render(){
		//methods
		const {
			toggleMetricPanel,
		} = this.props;

		//variables
		const {
			webAppView,
			isFocusedPreview,
			isOpen,
			profileStats,
			base64HostImage,
			base64OwnerImage,
			ownerpicuri,
			hostpicuri,
		} = this.props;

		const ppIconStyles = {
			'padding':'2px',
			'border-radius': '3.8rem',
			'font-size': '3.8rem',
			//'--border-width':'0px',
        	'border':'solid 0px #f9f9f9',
		}

		const ppIconDefaultStyle = {
        	'background-color': '#f9f9f9',
    		color: 'var(--color-01-tint-02)',
			'border-radius': '3.8rem',
			'font-size': '3.8rem',
			...(isDevice ?
				({
					//'font-size':'3.8rem',
				}) : 
				({ 
					//'font-size':'3.8rem',
				})
			),
		}


		const metricBlockContent = 
			<div
				//style={
				//	isOpen ?  
				//		//({left:'-1px'}) :
				//		({transform: `translateX(var(--mobile-metric-panel-width))`}) :
				//		({transform: 'unset'})
				//} 
				className={
					//isFocusedPreview ?
					//	Styles.metricBlockPreview :
						true ? //isOpen ?
							Styles['metricBlock--shown'] :
							Styles.metricBlock
				}
			>

				<Swipeable 
					onSwiped={(e) => {
						switch(true){
							case e.dir === LEFT:
								toggleMetricPanel(e, false);
								break;
	
							case e.dir === RIGHT:
								//prevId ? toggleMetricPanel(e, true) : null;
								break;
	
							default:
								break;
						}
					}}
					delta={30}
					innerRef={(div) => { div ? div.style.height = '100%' : null; }}
				>
					<div 
						className={Styles.expandMetricBtn_div}
						styles={
							false ? //isOpen ? 
								({display:'block'}) :
								({display: 'none'})
						} >
						<Button
							buttonType={OxiAppConstants.ControlConstants.ButtonTypes.c} //static icon toggle
							onClickHandler={(event) => {toggleMetricPanel(event)}}
							toggleActiveTitle='close'
							toggleInactiveTitle='open'
							isToggleActive={isOpen}
							iconName='Metrics Panel'
							ligature={isOpen ? 'expand_less' : 'expand_more'}
							customButtonStyles={{transform: 'rotate(270deg)'}}
						/>
					</div>
					<CSSTransition
					    tiemout={300}
					    classNames="metricContainer_div"
					    in={true}
					    unmountOnExit >
				    	<React.Fragment>
				    		<div className={Styles.titleContainer_div}>
				    			<div 
									style={{
										'padding-bottom': '5px',
										'height': '165px',
										//'margin-right':'-1px',
										'position':'relative',
									}}
								>
									<ProfileTitleContainer 
										//base64Image={this.props.base64OwnerImage}
										imageName={ownerpicuri}
									/>
									{
										webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? 
											(
												<div className={Styles.points_div}>
													{
														!profileStats ? 
															null :
															profileStats.points >= 0 ?
																profileStats.points : 
																null
													}
												</div>
											) :
											<BrowseControlContainer />
									}
					
								</div>
							</div>
							<div className={Styles.metricContainer_div}>
								<div className={Styles.metricHeader}>								
									<div 
										className={MetricStyles.mobileFitIcon_div}
										style={
											this.state.fitResult !== OxiAppConstants.fitResultValues.a ? 
												({
													'--match-icon-width':'35px',
													'background-color': 'var(--color2)',
													//'width':'calc(var(--match-icon-width)/2)',
													//height:'calc(var(--match-icon-width)/2)',
													//'line-height': 'calc(var(--match-icon-width)/2)',
													//'border-radius': 'calc(var(--match-icon-width)/4)',
												}) : 
												({}) 
										} >
										{this.state.fitResult}
									</div>
								</div>
								<div className={MetricStyles.metricMatch_div}>
									<div className={MetricStyles.metricMatchHeader_div}>
										<div className={MetricStyles.metricMatchTitle_div}>
											<span className={MetricStyles.metricMatchTitle_span}>
												Fit Check
											</span>
										</div>
										<div className={MetricStyles.metricMatchType_div}>
											<span className={MetricStyles.metricMatchType_span}>
												{this.state.selectedLabel ? this.state.selectedLabel : 'all'}
											</span>
											<Elevation 
												z={5}
												style={{
													'width': 'auto',
													'height': 'auto',
													'position': 'absolute',
													'right': '18px',
													'transition': 'transform 200ms ease-in-out',
													'transform': 'scale(01)',
													'border-radius': '18px',
												}}
											>
												<div className={MetricStyles.metricMatchIndicator_div}>
													<span 
														class="material-icons" 
														sytle={{
															color: 'var(--color-02-shade-02)',
															'font-size': '2.4rem',
															'font-weight': 'bold',
														}}
													>
														done
													</span>
												</div>
											</Elevation>
										</div>
									</div>
									<div 
										style={{
											'width': '100%',
											'height': '100%',
											'display': 'flex',
											'align-items': 'center',
											'justify-content': 'center',
										}}
									>
										<div className={MetricStyles.metricMatchIcons_div}>
											<div className={MetricStyles.hostIconContainer_div}>
												<PpIcon 
													//base64Image={base64HostImage} 
													imageName={hostpicuri}
													isMobile={false} 
													customStyle={ppIconStyles} 
													customDefaultStyle={ppIconDefaultStyle}
												/>
												{/*
													base64HostImage ?
														(<img 
															src={base64HostImage === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (base64HostImage) }
															style={{
																'width': 'calc(100% - 2px)',
																'height': 'calc(100% - 2px)',
																'border-radius': '24px',
																'padding-top': '2px',
																'padding-left': '2px',
															}}
														/>) :
														(<i class="material-icons" style={ isMobile ? ({'font-size':'48px', 'color':'#ffffff5c'}) : ({'font-size':'48px', 'color': 'var(--color-mobile-icon-bg)'}) }> account_circle </i>)
												*/}
											</div>
											<div className={MetricStyles.hostToOwner_div}>
												<div className={MetricStyles.hostToOwnerLine_div}>

												</div>
											</div>
											<div className={MetricStyles.ownerIconContainer_div}>
												<div style={{position:'relative', 'height': '100%'}}>
													<div className={MetricStyles.ownerIndicator}>
													</div>
												</div>
												<PpIcon 
													//base64Image={base64OwnerImage} 
													imageName={ownerpicuri}
													isMobile={false} 
													customStyle={ppIconStyles} 
													customDefaultStyle={ppIconDefaultStyle}
												/>
												{/*
													base64OwnerImage ?
														(<img 
															src={base64OwnerImage === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (base64OwnerImage) }
															style={{
																'width': 'calc(100% - 2px)',
																'height': 'calc(100% - 2px)',
																'border-radius': '24px',
																'padding-top': '2px',
																'padding-left': '2px',
															}}
														/>) :
														(<i class="material-icons" style={ isMobile ? ({'font-size':'48px', 'color':'#ffffff5c'}) : ({'font-size':'48px', 'color': 'var(--color-mobile-icon-bg)'}) }> account_circle </i>)
												*/}
											</div>
										</div>
									</div>
								{/*
									<div className={MetricStyles.metricMatchLPanel_div}>
										<div 
											className={MetricStyles.fitIcon_div}
											style={
												this.state.fitResult !== OxiAppConstants.fitResultValues.a ? 
													({
														'--match-icon-width':'35px',
														'background-color': 'var(--color2)',
														//'width':'calc(var(--match-icon-width)/2)',
														//height:'calc(var(--match-icon-width)/2)',
														//'line-height': 'calc(var(--match-icon-width)/2)',
														//'border-radius': 'calc(var(--match-icon-width)/4)',
													}) : 
													({}) 
											} >
											{this.state.fitResult}
										</div>
									</div>
									<div className={MetricStyles.metricMatchRPanel_div}>
										<div className={MetricStyles.comparisonTypeIconContainer_div}>
										  <div className={MetricStyles.comparisonTypeIcon_div}>
										  	<SvgIcon 
										  		name='CompTypeMaleIcon' 
										  		fill='var(--comp-icon-fill)' 
										  		stroke='var(--comp-icon-fill)'/>
										  </div>
										  <div 
										  	className={MetricStyles.comparisonTypeIcon_div}
										  	style={{'border-left':'solid 2px var(--color2)'}}>
										  	<SvgIcon 
										  		name='CompTypeApparelIcon'
										  		style={{height:'100%', width:'70%'}}
										  		fill='var(--comp-icon-fill)' 
										  		stroke='var(--comp-icon-fill)' />
										  </div>
										</div>
									</div>
								*/}
								</div>
								<VisibleMetricList 
									setFitResult={this.setFitResult} 
									fitResult={this.state.fitResult}
									setSelectedLabel={this.setSelectedLabel}
								/>
							</div>
						</React.Fragment>
					</CSSTransition>
				</Swipeable>
			</div>

		return(
			isDevice ? 
				<DrawerWrapper {...this.props}>
					{ metricBlockContent }
				</DrawerWrapper> :
				metricBlockContent
		);
	}
}