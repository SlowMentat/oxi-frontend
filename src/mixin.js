//import styled from 'styled-components';

export const mobileRules = (content) => {
	return `
		@media screen and (max-aspect-ratio: 13/9){
			${content}
		}
	`
}

export const desktopRules = (content) => {
	return `
		@media screen and (min-aspect-ratio: 13/9){
			${content}
		}
	`
}