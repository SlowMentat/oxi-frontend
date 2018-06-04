import { connect } from 'react-redux';
import { setFormVisibility, createItem } from '../../Components/Actions/indexActions.js';
import Modal from '../../Components/Presentations/Modal.js';

/*const selectModalContent = (selectedForm) => {
	console.log("entering switch statement if selectModalContent container")
	//(selectedForm === 'NONE') ? null : <FromDeck selection={selectedForm}/>;

	/*switch(selectedForm){
		case 'Login':
			return (<Login />);
		case 'AddItem':
			return (<AddItem />);
		default:
			return null;
	}*/
//}

const mapStateToProps = state => {
	console.log("state = " + state.toggleModal.modal)
	return {
		modalContent: state.toggleModal.modal
	};
}

const mapDispatchToProps = dispatch => ({
		closeModal: () => dispatch(setFormVisibility(null)),
		onSubmitForm: (size, hashTag, url) => {dispatch(createItem(size, hashTag, url))}
})

const ModalContentSelection = connect(mapStateToProps, mapDispatchToProps)(Modal);
export default ModalContentSelection;