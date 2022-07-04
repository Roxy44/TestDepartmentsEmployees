import { call, put, takeLatest, all } from 'redux-saga/effects'
import { message } from 'antd'
import axios from 'axios';

function* getDepartmentEmployees({payload}) {
	try {
		const { data } = yield call(axios.post, '/api/departments/get', payload)
		const departmentEmployeesData = data?.map((item) => (
			{ 
				key: 'deparment_employee_' + item.user_id, 
				id: item.user_id, 
				first_name: item.first_name, 
				last_name: item.last_name, 
			}
		));
		yield put({type: 'SET_DEPARTMENT_EMPLOYEES', payload: departmentEmployeesData});
	} catch (e) {
		message.warning('Error');
	}
}

function* getDepartments() {
	try {
		const { data } = yield call(axios.get, '/api/departments');
		const departmentsData = data?.map((item) => (
			{ 
				key: 'deparment_' + item.department_id, 
				id: item.department_id, 
				name: item.name, 
				description: item.description 
			}
		));
		yield put({type: 'SET_DEPARTMENTS', payload: departmentsData});
	} catch (e) {
		message.warning('Error');
	}
}

function* addDepartment({payload}) {
	try {
		yield call(axios.post, '/api/departments/create', payload);
		yield put({ type: 'GET_DEPARTMENTS' });
	} catch (e) {
		message.warning('Error');
	}
}

function* updateDepartment({payload}) {
	try {
		yield call(axios.post, '/api/departments/update', payload);
		yield put({ type: 'GET_DEPARTMENTS' });
	} catch (e) {
		message.warning('Error');
	}
}

function* deleteDepartment({payload}) {
	try {
		yield call(axios.post, '/api/departments/delete', payload);
		yield put({ type: 'GET_DEPARTMENTS' });
	} catch (e) {
		message.warning('Error');
	}
}

export function* departmentSaga() {
	yield all ([
		takeLatest('GET_DEPARTENT_EMPLOYEES', getDepartmentEmployees),
		takeLatest('GET_DEPARTMENTS', getDepartments),
		takeLatest('ADD_DEPARTMENT', addDepartment),
		takeLatest('UPDATE_DEPARTMENT', updateDepartment),
		takeLatest('DELETE_DEPARTMENT', deleteDepartment),
	]);
}