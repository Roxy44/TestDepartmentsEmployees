import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Layout, Table, Button } from 'antd';
import 'antd/dist/antd.css';

import { useSelector, useDispatch } from 'react-redux';

import CreateEmployeeModal from '../modals/Employee/CreateEmployeeModal';
import UpdateEmployeeModal from '../modals/Employee/UpdateEmployeeModal';
import DeleteEmployeeModal from '../modals/Employee/DeleteEmployeeModal';

const { Header, Content } = Layout;

const EmployeeComponent = ({ collapsed, setCollapsed }) => {

  const employees = useSelector(state => state.employees.employeesArray);
  const createEmployeeModalData = useSelector(state => state.employees.createEmployeeModal);
  const updateEmployeeModalData = useSelector(state => state.employees.updateEmployeeModal);
  const deleteEmployeeModalData = useSelector(state => state.employees.deleteEmployeeModal);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'GET_EMPLOYEES'});
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
    {
      title: 'Department_id',
      dataIndex: 'department_id',
      key: 'department_id',
    },
    {
      dataIndex: 'update',
      key: 'update',
      render: (_, row) => 
        <>
          <Button onClick={() => 
            updateEmployeeModalChangeVisible(
              'updateEmployeeModal', 
              true, 
              {id: row.id, firstName: row.first_name, lastName: row.last_name, departmentId: row.department_id}
            )}>
            <EditOutlined />
          </Button>
          <Button style={{marginLeft: '1rem'}} type='danger' onClick={() => 
            deleteEmployeeModalChangeVisible(
              'deleteEmployeeModal', 
              true,
              {id: row.id, firstName: row.first_name, lastName: row.last_name}
            )}>
            <DeleteOutlined />
          </Button>
        </>,
    },
  ];

  const createEmployee = (first_name, last_name, department_id) => {
    let id = 1;
    employees.forEach((item) => {
      id === item.id && id++
    })
    dispatch({type: 'ADD_EMPLOYEE', payload: {id, first_name, last_name, department_id}});
  };
  
  const updateEmployee = (id, first_name, last_name, department_id) => {
    dispatch({type: 'UPDATE_EMPLOYEE', payload: {id, first_name, last_name, department_id}});
  }

  const deleteEmployee = (id) => {
    dispatch({type: 'DELETE_EMPLOYEE', payload: {id}});
  }
   
  const createEmployeeModalChangeVisible = (name, visible) => {
    dispatch({type: 'SET_MODAL_VISIBLE', payload: {name, isVisible: visible}});
  };

  const updateEmployeeModalChangeVisible = (name, visible, data) => {
    dispatch({type: 'SET_MODAL_VISIBLE', payload: {name, isVisible: visible, data: data}});
  };

  const deleteEmployeeModalChangeVisible = (name, visible, data) => {
    dispatch({type: 'SET_MODAL_VISIBLE', payload: {name, isVisible: visible, data: data}});
  };

  function changeCollapse () {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className="site-layout">
      <Header className="site-layout-background pageHeader">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => changeCollapse(),
        })}
        <span className='headerTitle'>Employees</span>
      </Header>
      <Content className="site-layout-background" style={{padding: 24 }}>
        <Button type='primary' className='tableAddNewNote' onClick={() => createEmployeeModalChangeVisible('createEmployeeModal', true)}>
          <PlusOutlined />
          Create new employee
        </Button>
        <Table dataSource={employees} columns={columns} pagination={false} bordered />
      </Content>
      {
        createEmployeeModalData.isVisible ? 
          <CreateEmployeeModal 
            isVisible={createEmployeeModalData.isVisible}
            createEmployeeModalChangeVisible={createEmployeeModalChangeVisible} 
            createEmployee={createEmployee} 
          />
        :
        updateEmployeeModalData.isVisible ? 
          <UpdateEmployeeModal 
            updateEmployeeModalData={updateEmployeeModalData}
            updateEmployeeModalChangeVisible={updateEmployeeModalChangeVisible} 
            updateEmployee={updateEmployee} 
          />
        :
        deleteEmployeeModalData.isVisible && 
          <DeleteEmployeeModal 
            deleteEmployeeModalData={deleteEmployeeModalData}
            deleteEmployeeModalChangeVisible={deleteEmployeeModalChangeVisible} 
            deleteEmployee={deleteEmployee} 
          />
      }
    </Layout>
  );
};

export default EmployeeComponent;
