import React from 'react';
import PropTypes from 'prop-types';


import TypeJacket from './Icons/TypeJacket.js';
import TypePants from './Icons/TypePants.js';
import TypeShirtLong from './Icons/TypeShirtLong.js';
import TypeShirtT from './Icons/TypeShirtT.js';
import TypeShorts from './Icons/TypeShorts.js';
import TypeDress from './Icons/TypeDress.js';
import TypeSkirt from './Icons/TypeSkirt.js';

import DeleteIcon from './Icons/DeleteIcon.js';
import EditIcon from './Icons/EditIcon.js';
import {FileUploadIcon} from './Icons/FileUploadIcon.js';
import OkIcon from './Icons/OkIcon.js';
import CropIcon from './Icons/CropIcon.js';
import DiscardIcon from './Icons/DiscardIcon.js';
import HeartIcon from './Icons/HeartIcon.js';
import WardrobeIcon from './Icons/WardrobeIcon.js';
import CommojiIcon from './Icons/CommojiIcon.js';
import TypeUnknown from './Icons/TypeUnknown.js';
import BookmarkIcon from './Icons/BookmarkIcon.js';
import MenuPointer from './Icons/MenuPointer.js';
import ApparelIcon from './Icons/ApparelIcon.js';
import OutfitsIcon from './Icons/OutfitsIcon.js';
import FilterIcon from './Icons/FilterIcon.js';
import LogoIcon from './Icons/LogoIcon.js';
import OutfitCoverIcon from './Icons/OutfitCoverIcon.js';
import AddContentIcon from './Icons/AddContentIcon.js';
import DeleteContentIcon from './Icons/DeleteContentIcon.js';
import SpreadIcon from './Icons/SpreadIcon.js';
import StatsIcon from './Icons/StatsIcon.js';
import ShopIcon from './Icons/ShopIcon.js';
import FollowIcon from './Icons/FollowIcon.js';
import RetailerIcon from './Icons/RetailerIcon.js';
import CompTypeMaleIcon from './Icons/CompTypeMaleIcon.js';
import CompTypeApparelIcon from './Icons/CompTypeApparelIcon.js';
import MultiplePicIcon from './Icons/MultiplePicIcon.js';
import RotateClockwiseIcon from './Icons/RotateClockwiseIcon.js';
import AddOutfitIcon from './Icons/AddOutfitIcon.js';
import LogoIconFitsee from './Icons/LogoIconFitsee.js';
import DropdownIcon from './Icons/DropdownIcon.js';

import {OxiAppConstants} from './../../Util/OxiAppConstants.js';


export const SvgIcon = (props) => {
	switch(props.name){
		case 'TypeJacket': return(<TypeJacket {...props}/>); break;
		case 'TypePants': return(<TypePants {...props}/>); break;
		case 'TypeShirtLong': return(<TypeShirtLong {...props}/>); break;
		case 'TypeShirtT': return(<TypeShirtT {...props}/>); break;
		case 'TypeShorts': return(<TypeShorts {...props}/>); break;
		case 'TypeShorts': return(<TypeShorts {...props}/>); break;
		case 'TypeDress': return(<TypeDress {...props}/>); break;
		case 'TypeSkirt': return(<TypeSkirt {...props}/>); break;
		case 'DeleteIcon': return(<DeleteIcon {...props}/>); break;
		case 'EditIcon': return(<EditIcon {...props}/>); break;
		case 'FileUploadIcon': return(<FileUploadIcon {...props}/>); break;
		case 'OkIcon': return(<OkIcon {...props}/>); break;
		case 'CropIcon': return(<CropIcon {...props}/>); break;
		case 'DiscardIcon': return(<DiscardIcon {...props}/>); break;
		case 'HeartIcon': return(<HeartIcon {...props}/>); break;
		case 'CommojiIcon': return(<CommojiIcon {...props}/>); break;
		case 'WardrobeIcon': return(<WardrobeIcon {...props}/>); break;
		case 'BookmarkIcon': return(<BookmarkIcon {...props}/>); break;
		case 'MenuPointer': return(<MenuPointer {...props}/>); break;
		case 'ApparelIcon': return(<ApparelIcon {...props}/>); break;
		case 'OutfitsIcon': return(<OutfitsIcon {...props}/>); break;
		case 'FilterIcon': return(<FilterIcon {...props}/>); break;
		case 'LogoIcon': return(<LogoIcon {...props}/>); break;
		case 'OutfitCoverIcon': return(<OutfitCoverIcon {...props}/>); break;
		case 'AddContentIcon': return(<AddContentIcon {...props}/>); break;
		case 'DeleteContentIcon': return(<AddContentIcon {...props}/>); break;
		case 'SpreadIcon': return(<SpreadIcon {...props}/>); break;
		case 'StatsIcon': return(<StatsIcon {...props}/>); break;		
		case 'ShopIcon' : return(<ShopIcon {...props}/>); break;	
		case 'FollowIcon' : return(<FollowIcon {...props}/>); break;
		case 'CompTypeMaleIcon' : return(<CompTypeMaleIcon {...props}/>); break;
		case 'CompTypeApparelIcon' : return(<CompTypeApparelIcon{...props}/>); break; 
		case 'MultiplePicIcon' : return (<MultiplePicIcon {...props}/>); break;
		case 'RotateClockwiseIcon' : return (<RotateClockwiseIcon {...props}/>); break;
		case 'AddOutfitIcon' : return (<AddOutfitIcon {...props}/>); break;
		case 'LogoIconFitsee' : return (<LogoIconFitsee {...props}/>); break;
		case 'DropdownIcon' : return (<DropdownIcon {...props}/>); break;
		case 'RetailerIcon' : return (<RetailerIcon {...props}/>); break;
		default: return(<TypeUnknown {...props}/>); break;
	}
}