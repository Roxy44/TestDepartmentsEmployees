import { fork, all } from 'redux-saga/effects'
import { departmentSaga } from '../saga/departmentSaga';
import { employeeSaga } from '../saga/employeeSaga';

export default function* rootSaga() {
    yield all([
			fork(departmentSaga),
			fork(employeeSaga),
    ])
}