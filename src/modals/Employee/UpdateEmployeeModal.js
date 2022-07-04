import React, { useState } from 'react'
import { Modal, Input, Form, Button } from 'antd';

export default function UpdateEmployeeModal(props) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('');
	const [departmentId, setDepartment] = useState('');

	const handleOk = () => {
    props.updateEmployee(props.updateEmployeeModalData.id, firstName, lastName, departmentId)
		props.updateEmployeeModalChangeVisible(
      'updateEmployeeModal', 
      !props.updateEmployeeModalData.isVisible,
      {id: null, firstName: null, lastName: null, departmentId: null}
    )
	};

	const handleCancel = () => {
		props.updateEmployeeModalChangeVisible(
      'updateEmployeeModal', 
      !props.updateEmployeeModalData.isVisible,
      {id: null, firstName: null, lastName: null, departmentId: null}
    )
	};

	return (
		<Modal title="Update employee" visible={props.updateEmployeeModalData.isVisible} onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					Cancel
				</Button>,
				<Button key="submit" type="primary" htmlType="submit" form='updateeEmp'>
				 	Ok
				</Button>,
			]}
		>
			<Form onFinish={handleOk} layout="vertical" id="updateeEmp">
				<Form.Item label="First name" name="FirstName" rules={[{ required: true, message: 'Please input First name!' }]}>
					<Input placeholder="Enter new employee's first name" defaultValue={props.updateEmployeeModalData.firstName} onChange={(e) => setFirstName(e.target.value)} />
				</Form.Item>
				<Form.Item label="Last name" name="LastName" rules={[{ required: true, message: 'Please input Last name!' }]}>
					<Input placeholder="Enter new employee's last name" defaultValue={props.updateEmployeeModalData.lastName} onChange={(e) => setLastName(e.target.value)} />
				</Form.Item>
				<Form.Item label="Department id" name="DepartmentId" rules={[{ required: true, message: 'Please input Department id!' }]}>
					<Input placeholder="Enter new employee's department id" defaultValue={props.updateEmployeeModalData.departmentId} onChange={(e) => setDepartment(e.target.value)} />
				</Form.Item>
			</Form>
		</Modal> 
	)
}