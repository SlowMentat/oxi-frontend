import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	createItem, 
	updateItem,
	clientInvalidateEntities,
	modifyItem
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import ItemLocationMap from '../../Components/Presentations/ItemLocationMap.js';


const mapStateToProps = (state, props) => {
	return ({
		viewState: state.contentViewState.viewState,
		clientInvalidateItems:  state.entitiesStateReducer.items.clientInvalidated
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
		}
})

const ItemLocationMapContainer = connect(mapStateToProps, mapDispatchToProps)(ItemLocationMap);
export default ItemLocationMapContainer;