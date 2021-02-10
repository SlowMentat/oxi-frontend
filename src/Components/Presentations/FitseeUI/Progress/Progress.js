import React from 'react';
//import Styles from '../../root.scss';
import styled from 'styled-components';

import {
	mobileRules,
	desktopRules,
} from '../../../../mixin.js';

import { 
	LinearProgress as RmwcLinearProgress 
} from  '@rmwc/linear-progress';
import  '@rmwc/linear-progress/styles';

export const LinearProgress = styled(({children, ...otherProps}) => (//{

	//var {
	//	lengthComputable,
	//	loaded,
	//	total,
	//} = otherProps.progressStatus;

	//var progress = lengthComputable ? (total / loaded) : null;

	//return(
		otherProps.lengthComputable ? 
			<RmwcLinearProgress progress={otherProps.total / otherProps.loaded} /> :
			<RmwcLinearProgress />
	//);
))`
	${
		props => (`
			& .mdc-linear-progress{
				height: 20px;
    			border-bottom-left-radius: 3px;
			}

			& .mdc-linear-progress__buffering-dots{
				background-repeat: repeat;
			}

			& .mdc-linear-progress__bar-inner{
				border-color: var(--color-01-tint-02);
				border-top-width: 20px;
			}
		`)
	}
`;