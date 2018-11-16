import { connect } from 'react-redux';
import { setFormVisibility, createItem, updateItem } from '../../Components/Actions/indexActions.js';
import ItemList from '../../Components/Presentations/ItemLocationMap.js';


/*const mapStateToProps = (state) => {
	return ({
		selectedItemIds: state.entitiesReducer.contents.byIds[state.entitiesReducer.contents.selected].items
}

const mapDispatchToProps = dispatch => ({
	onClick : () => {console.log("dispatching setFormVisibility for UpdateItme"); dispatch(setFormVisibility("UpdateItem"));}
})

const ItemLocationMapContainer = connect(mapStateToProps, mapDispatchToProps)(ItemLocationMap);
export default ItemLocationMapContainer;*/