import React, { useState } from 'react'
import { Modal, Input, Form, Button } from 'antd';

export default function CreateDepartmentModal(props) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('');

	const handleOk = () => {
		props.createDepartmentModalChangeVisible('createDepartmentModal', !props.isVisible)
		props.createDepartment(name, description)
	};

	const handleCancel = () => {
		props.createDepartmentModalChangeVisible('createDepartmentModal', !props.isVisible)
	};

	return (
		<Modal title="Add new department" visible={props.isVisible} onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					Cancel
				</Button>,
				<Button key="submit" type="primary" htmlType="submit" form='createDep'>
				 	Ok
				</Button>,
			]}
		>
			<Form onFinish={handleOk} layout="vertical" id="createDep">
				<Form.Item label="Name" name="Name" rules={[{ required: true, message: 'Please input Name!' }]}>
					<Input placeholder="Enter department's name" onChange={(e) => setName(e.target.value)} />
				</Form.Item>
				<Form.Item label="Description" name="Description" rules={[{ required: true, message: 'Please input Description!' }]}>
					<Input placeholder="Enter department's description" onChange={(e) => setDescription(e.target.value)} />
				</Form.Item>
			</Form>
		</Modal> 
	)
}