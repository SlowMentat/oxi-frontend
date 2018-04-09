import React from 'react';
import ReactDOM from 'react-dom';
import styles from './item.css';

class Item extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
	    return(
	    	<div className={styles.itemContainer}>
			<div className={styles.itemSizeBlock}>
				size
			</div>
			<div className={styles.itemLinkBlock}>
				link
			</div>
			<div className={styles.itemTypeBlock}>	
				type
			</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Item name="Deven"/>,
	document.getElementById('root')
);
