
//Action Types
export const SET_VISIBLE_FORM = 'SET_VISIBLE_FORM';
export const SHOW_MODAL = 'SHOW_MODAL';
export const SET_XCSRF_TOKEN = 'SET_XCSRF_TOKEN';


//Other Constants

export const setFormVisibility = form => {
	return {
		type: SET_VISIBLE_FORM,
		payload: {
			'modal':form,
		}
	}
}

export const showModal = visible => {
	return {
		type: SHOW_MODAL,
		payload: {
			'isModalVisible':visible
		}
	}
}

export const setXcsrfToken = token => {
	return {
		type: SET_XCSRF_TOKEN,
		payload:{
			'xCsrfToken': token
		}
	}
}

