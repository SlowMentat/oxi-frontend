import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	createItem, 
	updateItem,
	clientInvalidateEntities,
	modifyItem,
	selectEntity,
	deselectMultipleEntity,
	clearSelectMultipleEntity,
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import ItemLocationMap from '../../Components/Presentations/ItemLocationMap.js';


const mapStateToProps = (state, props) => {
	return ({
		viewState: state.contentViewState.viewState,
		clientInvalidatedItems:  state.entitiesStateReducer.items.clientInvalidated,
		selectedItemId : state.entitiesStateReducer.items.selected,
		//selectedContentId: state.entitiesStateReducer.contents.selected,
		//contentByIds: state.entitiesReducer.contents.byIds,
		//addedContentByIds: state.addedEntitiesReducer.contents.byIds,
	})
}

const mapDispatchToProps = dispatch => ({
		clientInvalidateItem: (itemId) => dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.ITEM, [itemId])),
		modifyItemStatePosition: (itemId, posx, posy) => {
			dispatch(modifyItem(
				{
					id: itemId,
					positionx: posx,
					positiony: posy
				}
			));			
		},
		selectItem: (id) => dispatch(selectEntity(OxiAppConstants.EntityTypes.ITEM , id)),
		deselectItem: (id) => dispatch(deselectMultipleEntity(OxiAppConstants.EntityTypes.ITEM, id)),
		deselectAllItems: () => dispatch(deselectMultipleEntity(OxiAppConstants.EntityTypes.ITEM, null)),
})

const ItemLocationMapContainer = connect(mapStateToProps, mapDispatchToProps)(ItemLocationMap);
export default ItemLocationMapContainer;