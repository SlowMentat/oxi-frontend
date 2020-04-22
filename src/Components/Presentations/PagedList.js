import React from 'react';
import PropTypes from 'prop-types';
import Styles from '../../root.scss';
import OutfitNavStyles from '../../outfitNav.scss';
/*import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";*/
import LoaderWrapper from '../../Util/LoaderWrapper.js';
//CSS Styles

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

class PagedList extends React.Component{
	constructor(props){
		super(props);
		this._handleScroll = this._handleScroll.bind(this);
		/*this.simulateScrollFactory = this.simulateScrollFactory.bind(this);
		this.setContainerRef = this.setContainerRef(this.simulateScrollFactory).bind(this);*/
		this.setContainerRef = this.setContainerRef.bind(this);
		this.setScrollContainerRef = this.setScrollContainerRef.bind(this);

		this.state = {
			scrollPageHeight: 0,
			currentScrollPage: 0,
			loaded: false,
		}
	}

	componentDidMount(){
		//depending on browseSelection, fetch either outfits or items then scroll

		//Add scroll event listener to component
		console.log(`\nCOMPONENT DID MOUNT (id:${this.props.id})\n`)
		this._handleScroll();
		window.addEventListener('scroll', this._handleScroll, true);
	}

	componentWillUnmount(){
		console.log(`\nCOMPONENT WILL UNMOUNT (id:${this.props.id})\n`)
		window.removeEventListener('scroll', this._handleScroll, true);
	}

	setScrollContainerRef(element){
		this.scrollContainerRef = element;
	}

	setContainerRef(element){
		this.containerRef = element;
	}

	scrubPageURL(URL, page){
		console.log('URL = ', URL);
		console.log('page = ', page)
		let URLArray = URL.split('page=');
		let pageParamArray = URLArray[1].split('&');
		pageParamArray[0] = `page=${page}&`;
		URLArray[1] = pageParamArray.join('');
		console.log('pageParamArray = ', pageParamArray);
		console.log('URLArray = ', URLArray);
		return URLArray.join('');
	}

    _onLoad(){
    	this.setState({loaded:true});
    }

	_handleScroll(){
		//event !== undefined ? event.stopImmediatePropagation() : null;
		console.log(`\n_handleScroll called (${this.props.id})`);
		const { handleScroll, containerRef, scrollContainerRef } = this;
		const { innerHeight, scrollY, pageYOffset } = window;
		if(scrollContainerRef === undefined) return;
		const { 
			offsetTop, 
			offsetHeight, 
			scrollTop,
			scrollHeight,
			clientTop
		} = scrollContainerRef;

		const offsetBottom = innerHeight - offsetTop - offsetHeight;

		console.log(`================\n${this.props.id}\n`);
		console.log(`innerHeight + scrollTop:  ${innerHeight} + ${scrollTop} = ${innerHeight + scrollTop}\n`);
		console.log(`offsetTop + clientTop + offsetBottom + scrollHeight:  ${offsetTop} + ${clientTop} + ${offsetBottom} + ${scrollHeight} = ${offsetTop + offsetBottom + scrollHeight}\n`);

		let pagingDown = (
					innerHeight + scrollTop >= (offsetTop + offsetBottom + scrollHeight) &&
					//this.props.currentPage < this.props.lastPage &&
					!this.props.isFetching);
		let pagingUp = false/*(
					scrollTop === 0 &&
					this.props.currentPage !== 0 &&
					!this.props.isFetching);*/


		switch(true){
			case (pagingDown):
				// Depending on browseSelection, fetch either outfits or items
				console.log(`${this.props.id} triggered pageDown fetch\n`);

				this.setState(prevState => ({
					...prevState,
					loaded:false,
				}));

				new Promise((resolve, reject) => {
					switch(this.props.id){
						case OxiAppConstants.PageListIds.ITEM_LIST_BROWSE:
							resolve( this.props.getItems(this.props.nextPageURL) );
							break;
						case OxiAppConstants.PageListIds.ITEM_AS_SEEN_ON_LIST:
							resolve( this.props.getContentById(this.props.nextPageURL) );
							break
						default:
							resolve(null);
							break;
					}
				}).then(response => {
					//extend the scrollContainerRef to the nearest initially observed scrollContiainer Height.
					//this is in case the last page is shorter than the scrollContainerRef Height


					//set the top of scrollContainerRef to scrollPageHeight * (Page tail - 1)
					//scrollContainerRef.scrollTop = this.state.scrollPageHeight * (OxiAppConstants.scrollBufferSize - 1.1);
				
					/*this.setState(prevState => ({
						...prevState,
						loaded: true,
					}));*/

					this.setState({loaded:true});

					let pageNumbers = Object.keys(this.props.pages)
					let headPageNumber = parseInt(pageNumbers[0], 10)
					console.log('response** = ',response);
					if(response && response.data._links){
						!response.data._links.after ? 
							this.props.setNextPageURL(null) :
							this.props.setNextPageURL(response.data._links.after.href);

						!response.data._links.prev ? 
							this.props.setPrevPageURL(null) :							
							this.props.setPrevPageURL(this.scrubPageURL(response.data._links.prev.href, (headPageNumber !== 0 ? headPageNumber - 1 : 0) ) );
					}
				})
				//TODO: Either reset to previeous page here or shift scroll to current page, or do nothing
				break;

			case (pagingUp):
				console.log(`${this.props.id} triggered pageUp fetch\n`);
				new Promise((resolve, reject) => {
					switch(this.props.id){
						case OxiAppConstants.PageListIds.ITEM_LIST_BROWSE:
							resolve( this.props.getItems(this.props.prevPageURL) );
							break;
						case OxiAppConstants.PageListIds.ITEM_AS_SEEN_ON_LIST:
							resolve( this.props.getContentById(this.props.prevPageURL) );
							break
						default:
							resolve(null);
							break;
					}			
				}).then(response => {
					//set the current scroll page to the page (head + 1)
					scrollContainerRef.scrollTop = this.state.scrollPageHeight * (1);
					let pageNumbers = Object.keys(this.props.pages)
					let tailPageNumber = parseInt(pageNumbers[pageNumbers.length - 1], 10);
					if(response.data._links){
						!response.data._links.next ? 
							this.props.setNextPageURL(null) :
							this.props.setNextPageURL(this.scrubPageURL(response.data._links.next.href, (tailPageNumber !== this.props.lastPage ? tailPageNumber + 1 : this.props.lastPage) ) );

						!response.data._links.prev ? 
							this.props.setPrevPageURL(null) :							
							this.props.setPrevPageURL(response.data._links.prev.href);
					}
				})
				break;

			default:
				break;
		}

		//Set ScrollPageHeight once items are 
		if(this.state.scrollPageHeight > (innerHeight - offsetTop)){
			//let scrollPageHeight = this.props.scrollPageHeight === 0 ? this.props.scrollPageHeight : (this.props.scrollPageHeight - 81);
			let nextScrollPage = Math.floor( ((scrollTop + offsetTop) / this.state.scrollPageHeight) );
			if(this.state.currentScrollPage != nextScrollPage){
				this.setState(prevState => ({
					...prevState,
					currentScrollPage: nextScrollPage
				}));
				//let currentScrollPage = Math.floor( ((scrollTop + offsetTop) / this.state.scrollPageHeight) );
				console.log(`currentScrollPage = ${this.state.currentScrollPage}`);
				console.log(`nextScrollPage = ${nextScrollPage}`);
				console.log(`scrollPageHeight = ${this.state.scrollPageHeight}`)
	
				this.props.setCurrentEntityPage( parseInt( Object.keys(this.props.pages)[nextScrollPage], 10 ) );
				/*(this.props.currentPage !== this.state.currentScrollPage || this.props.currentPage === 1) ? 
					this.props.setCurrentEntityPage( parseInt( Object.keys(this.props.pages)[nextScrollPage], 10 ) ) : 
					null;*/
			}
		}else{
			this.setState(prevState => ({
				...prevState,
				scrollPageHeight: scrollHeight
			}));
			//this.props.setScrollPageHeight(scrollHeight);
		}
	}

	render(){
		const {
			loaderContainerStyles,
			scrollContainerStyle,
			id,
			list,
			pages,
			lastPage,
			webAppView,
		} = this.props;

		let elementHeight = id === OxiAppConstants.PageListIds.ITEM_LIST_BROWSE ? 
			112 :
			id === OxiAppConstants.PageListIds.ITEM_AS_SEEN_ON_LIST ? 
				60 :
				0;

		let endOfPageMargin = pages[lastPage] === undefined ? 
			0 : 
			lastPage > 0 ? 
				(elementHeight * (pages[lastPage - 1].length -  pages[lastPage].length)) : 
				0;

		return(
			<React.Fragment>
				<div 
					id={id} 
					//className={webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? scrollContainerStyle : OutfitNavStyles.previewContainerMobile} 
					className={ scrollContainerStyle } 
					style={ (webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? 
						({
							/*'background-color':'white'*/
						}) : 
						({
							'padding-top': '50px',
							//'padding-bottom': '150px',
						}))
					}
		    		/*className={Styles.pagedListContainer_div}*/
					ref={this.setScrollContainerRef} >
						<div
							style={{
								'margin-bottom': `${endOfPageMargin}px`
							}} 
							ref={this.setContainerRef} >
							{list}
						</div>
						<LoaderWrapper 
							loaded={this.state.loaded}
							style={
								loaderContainerStyles ? 
									(loaderContainerStyles) :
									({
										display:'none',
										height: '125px',
    									'padding-top': '43.5px',	
									})
							}
						/>
				</div>
			</React.Fragment>
		);
	}
}

export default PagedList;