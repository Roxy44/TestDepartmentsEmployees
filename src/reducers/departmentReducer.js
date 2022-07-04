const defaultState = {
	departmentsArray: [],
	departmentEmployeesArray: [],
	createDepartmentModal: {
		isVisible: false,
	},
	updateDepartmentModal: {
		isVisible: false,
		id: null,
		name: null,
		description: null
	},
	deleteDepartmentModal: {
		id: null,
		name: null,
		isVisible: false,
	},
}

export const departmentReducer = (state = defaultState, action) => {
	switch(action.type) {
		case 'SET_DEPARTMENTS':
			return { ...state, departmentsArray: action.payload };
		case 'SET_MODAL_VISIBLE': 
			return {...state, [action.payload.name]: {...state[action.payload.name], isVisible: action.payload.isVisible, ...action.payload.data}}
		case 'SET_DEPARTMENT_EMPLOYEES':
			return { ...state, departmentEmployeesArray: action.payload}
		default:
			return state;
	}
}