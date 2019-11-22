
import React from 'react';
import ReactDOM from 'react-dom';

import BrowseControlContainer from '../../Components/Containers/BrowseControlContainer.js';
import ProfileTitleContainer from '../../Components/Containers/ProfileTitleContainer.js';
import VisibleMetricList from '../../Components/Containers/VisibleMetricList.js';

import MetricStyles from '../../metric.scss';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import Styles from '../../root.scss';
import {SvgIcon} from '../../Components/SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Button } from './Controls.js';



export class MetricPanel extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			fitResult: null,
		}

		this.setFitResult = this.setFitResult.bind(this);
	}

	setFitResult(value){
		this.setState({ fitResult: value });
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
		} = this.props;

		return(
			<div
				style={
					isOpen ?  
						({left:'7px'}) :
						({})
				} 
				className={
					isFocusedPreview ?
						Styles.metricBlockPreview :
						Styles.metricBlock
				}
			>
				<div className={Styles.expandMetricBtn_div}>
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
				    tiemout={600}
				    classNames="metricContainer_div"
				    in={true}
				    unmountOnExit >
			    	<React.Fragment>
			    		<div className={Styles.titleContainer_div}>
			    			<div 
								style={{
									//'padding-top': '15px',
    								'padding-bottom': '15px',
    								'height': '165px',
    								//'border-bottom-style': 'solid',
    								//'border-width': '1px',
    								//'border-color': '#e2e2e2',
    								'margin-right':'-1px',
    								'position':'relative',
								}}
							>
								<ProfileTitleContainer />
								{webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? 
									//<ProfileControlContainer /> :
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
							<div className={MetricStyles.metricMatch_div}>
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
							</div>
							<VisibleMetricList setFitResult={this.setFitResult} fitResult={this.state.fitResult}/>
						</div>
					</React.Fragment>
				</CSSTransition>
			</div>
		);
	}
}