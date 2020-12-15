import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class PhotoPlaceholder extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.fill || "none";
		let strokeWidth = this.props.strokeWidth || "2";
		return(
			<svg 
				width="100mm" 
				height="100mm" 
				version="1.1" 
				viewBox="0 0 100 100" 
				xmlns="http://www.w3.org/2000/svg"
			>
				<g 
					transform="translate(0,-197)"
				>
					<g 
						transform="matrix(.22649 -.23925 .22649 .23925 -32.737 237.05)" 
						aria-label="Photo"
						fill={fill}
						stroke={stroke}
						stroke-width={strokWidth}
					>
						<path 
							d="m113.3 190.28v10.957h4.9609q2.7539 0 4.2578-1.4258 1.5039-1.4258 1.5039-4.0625 0-2.6172-1.5039-4.043-1.5039-1.4258-4.2578-1.4258zm-3.9453-3.2422h8.9062q4.9023 0 7.4023 2.2266 2.5195 2.207 2.5195 6.4844 0 4.3164-2.5195 6.5234-2.5 2.207-7.4023 2.207h-4.9609v11.719h-3.9453z" 
							style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal"
						/>
						<path 
							d="m151.52 203v13.203h-3.5938v-13.086q0-3.1055-1.2109-4.6484t-3.6328-1.543q-2.9102 0-4.5898 1.8555-1.6797 1.8555-1.6797 5.0586v12.363h-3.6133v-30.391h3.6133v11.914q1.2891-1.9727 3.0273-2.9492 1.7578-0.97656 4.043-0.97656 3.7695 0 5.7031 2.3438 1.9336 2.3242 1.9336 6.8555z" 
							style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal"
						/>
						<path 
							d="m167.21 196.85q-2.8906 0-4.5703 2.2656-1.6797 2.2461-1.6797 6.1719t1.6602 6.1914q1.6797 2.2461 4.5898 2.2461 2.8711 0 4.5508-2.2656 1.6797-2.2656 1.6797-6.1719 0-3.8867-1.6797-6.1523-1.6797-2.2852-4.5508-2.2852zm0-3.0469q4.6875 0 7.3633 3.0469 2.6758 3.0469 2.6758 8.4375 0 5.3711-2.6758 8.4375-2.6758 3.0469-7.3633 3.0469-4.707 0-7.3828-3.0469-2.6562-3.0664-2.6562-8.4375 0-5.3906 2.6562-8.4375 2.6758-3.0469 7.3828-3.0469z" 
							style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal"/>
						<path 
							d="m186.74 188.12v6.2109h7.4023v2.793h-7.4023v11.875q0 2.6758 0.72266 3.4375 0.74218 0.76172 2.9883 0.76172h3.6914v3.0078h-3.6914q-4.1602 0-5.7422-1.543-1.582-1.5625-1.582-5.6641v-11.875h-2.6367v-2.793h2.6367v-6.2109z" 
							style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal"/>
						<path 
							d="m207.36 196.85q-2.8906 0-4.5703 2.2656-1.6797 2.2461-1.6797 6.1719t1.6602 6.1914q1.6797 2.2461 4.5898 2.2461 2.8711 0 4.5508-2.2656 1.6797-2.2656 1.6797-6.1719 0-3.8867-1.6797-6.1523-1.6797-2.2852-4.5508-2.2852zm0-3.0469q4.6875 0 7.3633 3.0469 2.6758 3.0469 2.6758 8.4375 0 5.3711-2.6758 8.4375-2.6758 3.0469-7.3633 3.0469-4.707 0-7.3828-3.0469-2.6562-3.0664-2.6562-8.4375 0-5.3906 2.6562-8.4375 2.6758-3.0469 7.3828-3.0469z" 
							style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal"/>
					</g>
					<path 
						d="m100 197-32.531 32.531m-34.396 34.396-33.073 33.073" 
						fill={fill}
						stroke={stroke}
						stroke-width={strokWidth}
					/>
				</g>
			</svg>
		);
	}
}