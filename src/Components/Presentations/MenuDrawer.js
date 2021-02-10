
import React from 'react';
import ReactDOM from 'react-dom';

import BrowseControlContainer from '../../Components/Containers/BrowseControlContainer.js';
import ProfileTitleContainer from '../../Components/Containers/ProfileTitleContainer.js';
import VisibleMetricList from '../../Components/Containers/VisibleMetricList.js';
import { PpIcon } from '../../Components/Presentations/ProfileTitle.js';

import MetricStyles from '../../metric.scss';
import Styles from '../../root.scss';
import { OxiAppConstants } from '../../Util/OxiAppConstants.js';
import { SvgIcon } from '../../Components/SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Button } from '../../Components/Presentations/FitseeUI/Buttons/Button.js';
import { logout } from '../Actions/indexActions.js';

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

import {
	CollapsibleList,
	List,
	SimpleListItem,
	ListItem,
	ListItemGraphic,
} from '../../Components/Presentations/FitseeUI/List.js';

import '@rmwc/icon/styles';
import { Icon } from '@rmwc/icon';
import '@rmwc/avatar/styles';
import { Avatar } from '@rmwc/avatar';

import { getImageURL } from '../../Util/Misc.js';

import {
	ComingSoonMessage
} from './Messages.js';

const basicOptions = [
	'Cart', 
	'Notifications'
];

const settingsOptions = [
	'Notifications', 
	'Points'
];

const menuListStyles = {
	'flex-direction':'row-reverse',
	margin:'unset',
	'border-radius':'0px',
	'border-bottom':'solid 1px var(--color-01-tint-02)',
	height:'60px',   						
};

const getBasicOptionIcon = (currentOption) => {
	var icon = '';

	switch(currentOption){
		case basicOptions[0]:
			icon = 'shopping_cart';
			break;

		case basicOptions[1]:
			icon = 'notifications';
			break;

		case basicOptions[2]:
			icon = '';
			break;

		default:
			break;
	}

	return icon;
}

const DrawerWrapper = (props) => {
	return(
		<Drawer 
			modal
			dir="rtl"
			open={props.isOpen}
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

export class MenuDrawer extends React.Component{
	constructor(props){
		super(props);

		this.state = {
		}
	}

	render(){
		//methods
		const {
			toggleMenuDrawer,
		} = this.props;

		//variables
		const {
			webAppView,
			isFocusedPreview,
			isOpen,
			userPicUri,
			username
		} = this.props;

		const DrawerContent = 
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
								break;
	
							case e.dir === RIGHT:
								toggleMenuDrawer(e, false);
								break;
	
							default:
								break;
						}
					}}
					delta={30}
					innerRef={
						(div) => {
							if(div){ 
								div.style.height = '100%';
								div.style['overflow-y'] = 'scroll';
							}
						}
					}
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
							onClickHandler={(event) => {toggleMenuDrawer(event)}}
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
						unmountOnExit 
					>
						<div>
							<CollapsibleList
								innerStyle={{
									height:'72px',
								}}
								style={{
									'margin-top': '9px',
								}}
								handle={
									<div 
										style={{
											width:'100%',
											'justify-content': 'space-between',
											'display': 'flex',
											'flex-direction': 'row-reverse',
											'align-items': 'center',
											'border-bottom': 'solid 1px var(--color-01-tint-02)',
											'padding-left': '12px',
										}}
									>
										<Button
											theme="textPrimaryOnLight"
											//trailingIcon="exit_to_app"
											label={"Sign Out"}
											onClick={(event) => logout()}								
										/>
										<ListItem
											style={{
												margin:'unset',
												'border-radius':'0px',
												height:'48px',
											}}
											disabled
										>
											<ListItemGraphic
												style={{
													height: '36px',
													width: '36px',
													'margin-left':'16px',
												}}
												icon={
													<PpIcon 
														imageName={userPicUri}
														customStyle={{'border-width':'0px'}} 
														customDefaultStyle={{}}
													/>
												} 
											/>
											<div className={Styles.menuListItemText_div}>
												Account
											</div>
										</ListItem>
									</div>
								}
							>
								<List>
									
								</List>
							</CollapsibleList>

							{
								basicOptions.map((option, ind) => {
									return(
										<CollapsibleList
											innerStyle={{
												//'background-color': 'var(--color-01-tint-01)',
												'background-color': '#f3f3f3',
											}}
											handle = {
												<ListItem
													style={menuListStyles}
													disabled
												>
													<ListItemGraphic
														style={{
															'margin':'unset',
															'margin-right': '32px',
															'align-items': 'center',
														}} 
														icon={getBasicOptionIcon(option)}
													/>
													<div
														className={Styles.menuListItemText_div}
													>
														{option}
													</div>
												</ListItem>
											}
										>
											<List>
												<ComingSoonMessage type={option}>
												</ComingSoonMessage>
											</List>
										</CollapsibleList>
									);
								})
							}
						</div>
					</CSSTransition>
				</Swipeable>
			</div>

		return(
			<DrawerWrapper {...this.props} >
				{ DrawerContent }
			</DrawerWrapper>
		);
	}
}