import { connect } from 'react-redux';
import { setFormVisibility, createContent, createItem, updateItem, fetchImage, selectContent, previewContent} from '../../Components/Actions/indexActions.js';
import ContentList from '../../Components/Presentations/ContentList.js';

const getVisibleContents = (contents, filter, outfits) => {
	let contentsById = contents.byIds;
	let result = {byIds:{}, allIds:[]};
	//Only perform filter on non-empty contents object
	if(!(Object.keys(contentsById).length === 0 && contentsById.constructor === Object)){
		switch(filter){
			case 'SHOW_ALL':
				return contents;
			case 'BY_OUTFIT_ID':
				if(outfits != undefined){
					console.log("outfits =");
					console.log(outfits)
					if(outfits.selected != undefined){
						if(outfits.selected != false){
							//array of content ids
							result.allIds = outfits.byIds[outfits.selected]["contents"].sort();
							for(let contentId of result.allIds){
								result.byIds[contentId] =  contentsById[contentId];
							}
							//result.allIds = Object.keys(result.byIds);
							console.log("result");
							console.log(result);
							return result;	
						}else{
							console.log("outfits.selected is false");
						}				
					}else{
						console.log("outfits.selected is undefined");
					}
				}else{
					console.log("outfits is undefined");
				}
			default:
				return contents;
		}
	}
	return contents;
}

const mapStateToProps = state => {
	let filteredContents = getVisibleContents(
		state.entitiesReducer.contents,
		'BY_OUTFIT_ID',
		state.entitiesReducer.outfits
	);
	return ({
		contents : filteredContents.byIds,
		//contents : state.entitiesReducer.contents.byIds,
		contentIds : filteredContents.allIds,//state.entitiesReducer.contents.allIds,
		controlDisabled: state.entitiesReducer.contents.controlDisabled,
		isEdit: state.contentViewState.isEditingContent
	});
}

const mapDispatchToProps = dispatch => ({
	onClick : (contentId) => {
		dispatch(selectContent(contentId));
		dispatch(previewContent(contentId));
	},
	onControlClick : () => dispatch(createContent()),
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback))
})

const VisibleContentList = connect(mapStateToProps, mapDispatchToProps)(ContentList);
export default VisibleContentList;