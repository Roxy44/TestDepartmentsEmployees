import React, { useState } from 'react'
import { Modal, Input, Form, Button } from 'antd';

export default function CreateEmployeeModal(props) {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('');
	const [departmentId, setDepartment] = useState('');

	const handleOk = () => {
		props.createEmployeeModalChangeVisible('createEmployeeModal', !props.isVisible)
		props.createEmployee(firstName, lastName, departmentId)
	};

	const handleCancel = () => {
		props.createEmployeeModalChangeVisible('createEmployeeModal', !props.isVisible)
	};

	return (
		<Modal title="Add new employee" visible={props.isVisible} onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					Cancel
				</Button>,
				<Button key="submit" type="primary" htmlType="submit" form='createEmp'>
				 	Ok
				</Button>,
			]}
		>
			<Form onFinish={handleOk} layout="vertical" id="createEmp">
				<Form.Item label="First name" name="FirstName" rules={[{ required: true, message: 'Please input First name!' }]}>
					<Input placeholder="Enter employee's first name" onChange={(e) => setFirstName(e.target.value)} />
				</Form.Item>
				<Form.Item label="Last name" name="LastName" rules={[{ required: true, message: 'Please input Last name!' }]}>
					<Input placeholder="Enter employee's last name" onChange={(e) => setLastName(e.target.value)} />
				</Form.Item>
				<Form.Item label="Department id" name="DepartmentId" rules={[{ required: true, message: 'Please input Department id!' }]}>
					<Input placeholder="Enter employee's department id" onChange={(e) => setDepartment(e.target.value)} />
				</Form.Item>
			</Form>
		</Modal> 
	)
}