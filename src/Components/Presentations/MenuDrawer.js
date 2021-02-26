
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
import { Button, IconButton } from '../../Components/Presentations/FitseeUI/Buttons/Button.js';
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
	Typography
} from '@rmwc/typography';


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

const basicOptions = {
	'Cart': props => <CartList {...props}/>, 
	'Notifications': props => <NotificationsList {...props}/>,
	'Settings': props => <SettingsList {...props}/>,
};

const settingsOptions = [
	'Notifications', 
	'Points'
];

const menuListStyles = {
	//'flex-direction':'row-reverse',
	margin:'unset',
	'border-radius':'0px',
	//'border-bottom':'solid 1px var(--color-01-tint-02)',
	'border-bottom': 'solid 1px #d6d6d6',
	height:'60px',   						
};

const listItemTypography = "subtitle5";

const getBasicOptionIcon = (currentOption) => {
	var icon = '';
	const optionKeys = Object.keys(basicOptions);

	switch(currentOption){
		case optionKeys[0]:
			icon = 'shopping_cart_outline';
			break;

		case optionKeys[1]:
			icon = 'notifications_outline';
			break;

		case optionKeys[2]:
			icon = 'settings_outline';
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
			onClose={(e) => props.toggleMenuDrawer(e, false)}
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

const CartList = (props) => {
	return(
		<List>
			<ComingSoonMessage type={props.option}>
			</ComingSoonMessage>
		</List>
	);
}

const NotificationsList = (props) => {
	return(
		<List>
			<ComingSoonMessage type={props.option}>
			</ComingSoonMessage>
		</List>
	);
}

const SettingsList = (props) => {
	return(
		<List 
			style={{
				direction: 'ltr',
			}}
		>
			<ListItem disabled={props.disabled}>
				<Typography use={listItemTypography}>
					<a href="https://www.oxisalechannel.com/legal/terms-and-conditions.html">Terms of Use</a>
				</Typography>
			</ListItem>
			<ListItem disabled={props.disabled}>
				<Typography use={listItemTypography}>
					<a href="https://www.oxisalechannel.com/legal/privacy-policy.html">Privacy Policy</a>
				</Typography>
			</ListItem>
			<ListItem disabled={props.disabled}>
				<Typography use={listItemTypography}>
					<a href="https://www.oxisalechannel.com/legal/terms-and-conditions.html">Info</a>
				</Typography>
			</ListItem>
		</List>
	);
}

export class MenuDrawer extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			openedLists:{
				Account: false,
				...(Object.keys(basicOptions).reduce((accum, option) => ({
					...accum,
					[option]: false,
				}), {})),
			}
		}

		this.listExpanded = this.listExpanded.bind(this);
	}

	listExpanded(name){
		console.log("setting state on " + name);
		this.setState(prevState => ({
			...prevState,
			openedLists:{
				...prevState.openedLists,
				...{
					Account: (name == 'Account'),
					...(Object.keys(basicOptions).reduce((accum, option) => ({
						...accum,
						[option]: (name == option),
					}), {})),
				}
			}
		}))
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

		console.log(this.state);

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
						timeout={600}
						classNames="metricContainer_div"
						in={true}
						unmountOnExit 
					>
						<div>
							<CollapsibleList
								innerStyle={{
									'min-height':'72px',
									height: 'auto',
								}}
								style={{
									'margin-top': '9px',
								}}
								open={this.state.openedLists["Account"]}
								//onOpen={() => this.listExpanded("Account")}
								onClick={(e) => {
									if(!this.state.openedLists['Account']){
										e.stopPropagation(); 
										this.listExpanded('Account');
									}
								}}
								handle={
									<div 
										style={{
											width:'100%',
											'justify-content': 'space-between',
											'display': 'flex',
											'flex-direction': 'row-reverse',
											'align-items': 'center',
											//'border-bottom': 'solid 1px var(--color-01-tint-02)',
											'border-bottom': 'solid 1px #d6d6d6',
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
												<Typography use="headline5">
													Account
												</Typography>
											</div>
										</ListItem>
									</div>
								}
							>
								<div 
									style={{
										'background-color':'#f3f3f3',
   										'padding-top': '24px',
   										'padding-bottom': '24px',
   										'direction': 'ltr',
									}}
								>
									<ListItem
										disabled
										style={{
											'justify-content':'space-between',
											height:'48px',
										}}
									>
										<Typography use={listItemTypography} style={{'font-weight': 'bold'}}>
											{username}
										</Typography>

										<IconButton
											//outlined
											icon="edit"
											theme="textPrimaryOnLight"
											label={"Edit"}
											onClick={(e) => e.stopPropagation()}
											style={{direction: 'rtl',}}						
										/>
									</ListItem>
									<ListItem disabled><Typography use={listItemTypography}>Style</Typography></ListItem>
									<ListItem disabled><Typography use={listItemTypography}>Likes</Typography></ListItem>
									<ListItem disabled><Typography use={listItemTypography}>Views</Typography></ListItem>
									<ListItem disabled><Typography use={listItemTypography}>Preferences</Typography></ListItem>
									<ListItem
										disabled
										style={{
											'justify-content':'flex-end',
										}}
									>
										<Button
											outlined
											theme="textPrimaryOnLight"
											label={"deactivate account"}
											onClick={(e) => e.stopPropagation()}								
										/>
									</ListItem>
								</div>
							</CollapsibleList>

							{
								Object.keys(basicOptions).map((option, ind) => {
									return(
										<CollapsibleList
											innerStyle={{
												//'background-color': 'var(--color-01-tint-01)',
												'background-color': '#f3f3f3',
											}}
											open={this.state.openedLists[option]}
											onClick={(e) => {
												if(!this.state.openedLists[option]){
													e.stopPropagation(); 
													this.listExpanded(option);
												}
											}}
											handle = {
												<ListItem
													style={menuListStyles}
													disabled
												>
													<ListItemGraphic
														style={{
															'margin':'unset',
															'margin-left': '18px',
															'align-items': 'center',
															color: 'var(--color-01)',
														}} 
														icon={getBasicOptionIcon(option)}
													/>
													<div
														className={Styles.menuListItemText_div}
													>
														<Typography use="headline5">
															{option}
														</Typography>
													</div>
												</ListItem>
											}
										>
											{
												basicOptions[option]({
													option, 
													disabled: true,
												})
											}
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