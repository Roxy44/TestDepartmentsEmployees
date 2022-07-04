import { call, put, takeLatest, all } from 'redux-saga/effects'
import { message } from 'antd'
import axios from 'axios';

function* getEmployees() {
	try {
		const { data } = yield call(axios.get, `/api/employees`);
		const employeesData = data?.map((item) => (
			{
				key: 'employee_' + item.user_id, 
				id: item.user_id, 
				first_name: item.first_name, 
				last_name: item.last_name, 
				department_id: item.department_id 
			}
		)); 
		yield put({type: 'SET_EMPLOYEES', payload: employeesData});
	} catch (e) {
		message.warning('Error');
	}
}

function* addEmployee({payload}) {
	try {
		yield call(axios.post, '/api/employees/create', payload);
		yield put({ type: 'GET_EMPLOYEES' });
	} catch (e) {
		message.warning('Error');
	}
}

function* updateEmployee({payload}) {
	try {
		yield call(axios.post, '/api/employees/update', payload);
		yield put({ type: 'GET_EMPLOYEES' });
	} catch (e) {
		message.warning('Error');
	}
}

function* deleteEmployee({payload}) {
	try {
		yield call(axios.post, '/api/employees/delete', payload);
		yield put({ type: 'GET_EMPLOYEES' });
	} catch (e) {
		message.warning('Error');
	}
}

export function* employeeSaga() {
	yield all ([
		takeLatest('GET_EMPLOYEES', getEmployees),
		takeLatest('ADD_EMPLOYEE', addEmployee),
		takeLatest('UPDATE_EMPLOYEE', updateEmployee),
		takeLatest('DELETE_EMPLOYEE', deleteEmployee),
	]);
}
    