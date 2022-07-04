import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import { Layout, Table} from 'antd';

import 'antd/dist/antd.css';

const { Header, Content } = Layout;

const CurrentDepartmentPage = ({ collapsed, setCollapsed }) => {
	const { id } = useParams();
	
	const departmentEmployees = useSelector(state => state.departments.departmentEmployeesArray);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({type: 'GET_DEPARTENT_EMPLOYEES', payload: { id } });
	}, []);

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'First name',
			dataIndex: 'first_name',
			key: 'first_name',
		},
		{
			title: 'Last name',
			dataIndex: 'last_name',
			key: 'last_name',
		},
	];

	const changeCollapse = () => {
		setCollapsed(!collapsed)
	};

	return (
		<Layout className="site-layout">
			<Header className="site-layout-background pageHeader">
				{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
					className: 'trigger',
					onClick: () => changeCollapse(),
				})}
				<span className='headerTitle'>123</span>
			</Header>
			<Content className="site-layout-background" style={{padding: 24 }}>
				<Table dataSource={departmentEmployees} columns={columns} pagination={false} bordered />
			</Content>
		</Layout>
	);
}

export default CurrentDepartmentPage;


