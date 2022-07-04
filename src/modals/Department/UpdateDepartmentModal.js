import React, { useState } from 'react'
import { Modal, Input, Form, Button } from 'antd';

export default function UpdateDepartmentModal(props) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('');

	const handleOk = () => {
		props.updateDepartment(props.updateDepartmentModalData.id, name, description)
		props.updateDepartmentModalChangeVisible(
			'updateDepartmentModal', 
			!props.updateDepartmentModalData.isVisible,
			{id: null, name: null, description: null}
		)
	};

	const handleCancel = () => {
		props.updateDepartmentModalChangeVisible(
			'updateDepartmentModal', 
			!props.updateDepartmentModalData.isVisible,
			{id: null, name: null, description: null}
		)
	};

	return (
		<Modal title="Update department" visible={props.updateDepartmentModalData.isVisible} onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					Cancel
				</Button>,
				<Button key="submit" type="primary" htmlType="submit" form='updateDep'>
				 	Ok
				</Button>,
			]}
		>
			<Form onFinish={handleOk} layout="vertical" id="updateDep">
				<Form.Item label="Name" name="Name" rules={[{ required: true, message: 'Please input Name!' }]}>
					<Input placeholder='Enter new name' defaultValue={props.updateDepartmentModalData.name} onChange={(e) => setName(e.target.value)} />
				</Form.Item>
				<Form.Item label="Description" name="Description" rules={[{ required: true, message: 'Please input Description!' }]}>
					<Input placeholder='Enter new description' defaultValue={props.updateDepartmentModalData.description} onChange={(e) => setDescription(e.target.value)} />
				</Form.Item>
			</Form>
		</Modal> 
	)
}