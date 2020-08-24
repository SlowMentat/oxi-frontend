import React from 'react';
import OutfitStyles from '../../../outfit.scss';
import Styles from '../../../root.scss';

import { CircularProgress } from  '@rmwc/circular-progress';
import  '@rmwc/circular-progress/styles';

export const ListLoadProgress = (props) => {
	return(
		<div
			className={Styles.listLoading_div}
			style={{
				'height': '125px',
				...props.style,
			}}
		>
			<div>
				{props.isShown ? <CircularProgress size="48" /> : null}
			</div>
		</div>
	);
}