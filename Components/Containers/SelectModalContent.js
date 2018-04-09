import { connect } from 'react-redux';
import { setFormVisibility,  } from '../../Components/Actions/indexActions.js';
import FilledModal from '../../Components/Presentations/Modal.js';

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
		closeModal: () => dispatch(setFormVisibility(null))
})

const ModalContentSelection = connect(mapStateToProps, mapDispatchToProps)(FilledModal);
export default ModalContentSelection;