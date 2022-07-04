import React from 'react'
import { Modal, Form, Button } from 'antd';

export default function DeleteDepartmentModal(props) {
	const handleOk = () => {
		props.deleteDepartment(props.deleteDepartmentModalData.id)
		props.deleteDepartmentModalChangeVisible(
			'deleteDepartmentModal', 
			!props.deleteDepartmentModalData.isVisible,
		)
	};

	const handleCancel = () => {
		props.deleteDepartmentModalChangeVisible(
			'deleteDepartmentModal', 
			!props.deleteDepartmentModalData.isVisible,
		)
	};

	return (
		<Modal title="Delete department" visible={props.deleteDepartmentModalData.isVisible} onCancel={handleCancel}
			footer={[
				<Button key="submit" type="primary" htmlType="submit" form='deleteDep'>
				 	Ok
				</Button>,
				<Button key="back" type='danger' onClick={handleCancel}>
						Cancel
				</Button>,
			]}
		>
			<Form onFinish={handleOk} layout="vertical" id="deleteDep">
				<Form.Item>
					<span>Are you sure you want to delete <b>{props.deleteDepartmentModalData.name}</b> ?</span>
				</Form.Item>
			</Form>
		</Modal> 
	)
}