import React from 'react'
import { Modal, Form, Button } from 'antd';

export default function DeleteEmployeeModal(props) {
	const handleOk = () => {
    props.deleteEmployee(props.deleteEmployeeModalData.id)
    props.deleteEmployeeModalChangeVisible(
			'deleteEmployeeModal', 
			!props.deleteEmployeeModalData.isVisible,
    )
	};

	const handleCancel = () => {
		props.deleteEmployeeModalChangeVisible(
      'deleteEmployeeModal', 
      !props.deleteEmployeeModalData.isVisible,
    )
	};

	return (
		<Modal title="Delete employee" visible={props.deleteEmployeeModalData.isVisible} onCancel={handleCancel}
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
          <span>Are you sure you want to delete <b>{props.deleteEmployeeModalData.firstName + ' ' + props.deleteEmployeeModalData.lastName}</b> ?</span>
				</Form.Item>
			</Form>
		</Modal> 
	)
}