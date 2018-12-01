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
import SubmitIcon from './Icons/SubmitIcon.js';
import CropIcon from './Icons/CropIcon.js';
import DiscardIcon from './Icons/DiscardIcon.js';
import HeartIcon from './Icons/HeartIcon.js';
import WardrobeIcon from './Icons/WardrobeIcon.js';
import CommojiIcon from './Icons/CommojiIcon.js';
import TypeUnknown from './Icons/TypeUnknown.js';

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
		case 'SubmitIcon': return(<SubmitIcon {...props}/>); break;
		case 'CropIcon': return(<CropIcon {...props}/>); break;
		case 'DiscardIcon': return(<DiscardIcon {...props}/>); break;
		case 'HeartIcon': return(<HeartIcon {...props}/>); break;
		case 'CommojiIcon': return(<CommojiIcon {...props}/>); break;
		case 'WardrobeIcon': return(<WardrobeIcon {...props}/>); break;
		default: return(<TypeUnknown {...props}/>); break;
	}
}