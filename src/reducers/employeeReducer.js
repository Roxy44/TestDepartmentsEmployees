const defaultState = {
	employeesArray: [],
	createEmployeeModal: {
		isVisible: false,
	},
	updateEmployeeModal: {
		isVisible: false,
		id: null,
		firstName: null,
		lastName: null,
		departmentId: null,
	},
	deleteEmployeeModal: {
		isVisible: false,
		id: null,
		firstName: null,
		lastName: null,
	},
}

export const employeeReducer = (state = defaultState, action) => {
	switch(action.type) {
		case 'SET_EMPLOYEES':
			return { ...state, employeesArray: action.payload };
		case 'SET_MODAL_VISIBLE': 
			return {...state, [action.payload.name]: {...state[action.payload.name], isVisible: action.payload.isVisible, ...action.payload.data}}
		default:
			return state;
	}
}

