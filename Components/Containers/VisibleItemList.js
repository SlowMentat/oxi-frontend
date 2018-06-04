import { connect } from 'react-redux';
import { setFormVisibility, createItem, updateItem } from '../../Components/Actions/indexActions.js';
import ItemList from '../../Components/Presentations/ItemList.js';


const mapStateToProps = state => {
	return ({
		items : state.entitiesReducer.items.byIds,
		itemIds : state.entitiesReducer.items.allIds 
	});
}

const mapDispatchToProps = dispatch => ({
	onClick : id => dispatch(setFormVisibility(id, "UpdateItem"))
})

const VisibleItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export default VisibleItemList;