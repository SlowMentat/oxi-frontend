import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

import '@rmwc/icon/styles';
import { Icon } from '@rmwc/icon';
import  '@rmwc/theme/styles';
import { Theme } from '@rmwc/theme';


const Rating = (props) => {
	const {
		value,
	} = props;

	var stars = typeof value !== 'number' ? 0 : value > 5 ? 5 : value;  
	var unstars = 5 - stars;

	return (
		<Theme use={['textSecondaryOnBackground']}>
			{ Array.apply(null, Array(stars)).map( val => <Icon icon="star"></Icon> ) }
			{ Array.apply(null, Array(unstars)).map( val => <Icon icon="star_outline"></Icon> ) }
    	</Theme>
	);
}

export default Rating;