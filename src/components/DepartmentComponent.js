import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Layout, Table, Button } from 'antd';
import 'antd/dist/antd.css';

import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import CreateDepartmentModal from '../modals/Department/CreateDepartmentModal';
import UpdateDepartmentModal from '../modals/Department/UpdateDepartmentModal';
import DeleteDepartmentModal from '../modals/Department/DeleteDepartmentModal';

const { Header, Content } = Layout;

const DepartmentComponent = ({ collapsed, setCollapsed }) => {
  const departments = useSelector(state => state.departments.departmentsArray);
  const createDepartmentModalData = useSelector(state => state.departments.createDepartmentModal);
  const updateDepartmentModalData = useSelector(state => state.departments.updateDepartmentModal);
  const deleteDepartmentModalData = useSelector(state => state.departments.deleteDepartmentModal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'GET_DEPARTMENTS'});
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name', 
      dataIndex: 'name',
      key: 'name',
      render: (fieldData, row) => 
        <Link to={`/Departments/${row.id}`} className='departmentName' type='text'>
          {fieldData} 
          <QuestionCircleOutlined style={{marginLeft: '0.5rem'}} />
        </Link>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      dataIndex: 'update',
      key: 'update',
      render: (_, row) => 
      <>
        <Button onClick={() => 
          updateDepartmentModalChangeVisible(
            'updateDepartmentModal', 
            true, 
            {id: row.id, name: row.name, description: row.description}
          )}>
          <EditOutlined />
        </Button>
        <Button style={{marginLeft: '1rem'}} type='danger' onClick={() => 
          deleteDepartmentModalChangeVisible(
            'deleteDepartmentModal', 
            true,
            {id: row.id, name: row.name}
          )}>
          <DeleteOutlined />
        </Button>
      </>,
    },
  ];

  const createDepartment = (name, description) => {
    let id = 1;
    departments.forEach((item) => {
      id === item.id && id++
    })
    dispatch({type: 'ADD_DEPARTMENT', payload: {name, description, id}});
  };

  const updateDepartment = (id, name, description) => {
    dispatch({type: 'UPDATE_DEPARTMENT', payload: {id, name, description}});
  }

  const deleteDepartment = (id) => {
    dispatch({type: 'DELETE_DEPARTMENT', payload: {id}});
  }
   
  const createDepartmentModalChangeVisible = (name, visible) => {
    dispatch({type: 'SET_MODAL_VISIBLE', payload: {name, isVisible: visible}});
  };

  const updateDepartmentModalChangeVisible = (name, visible, data) => {
    dispatch({type: 'SET_MODAL_VISIBLE', payload: {name, isVisible: visible, data: data}});
  };

  const deleteDepartmentModalChangeVisible = (name, visible, data) => {
    dispatch({type: 'SET_MODAL_VISIBLE', payload: {name, isVisible: visible, data: data}});
  };

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
        <span className='headerTitle'>Departments</span>
      </Header>
      <Content className="site-layout-background" style={{padding: 24 }}>
        <Button type='primary' className='tableAddNewNote' onClick={() => createDepartmentModalChangeVisible('createDepartmentModal', true)}>
          <PlusOutlined />
          Create new department
        </Button>
        <Table dataSource={departments} columns={columns} pagination={false} bordered />
      </Content>
      {
        createDepartmentModalData.isVisible ? 
          <CreateDepartmentModal 
            isVisible={createDepartmentModalData.isVisible}
            createDepartmentModalChangeVisible={createDepartmentModalChangeVisible} 
            createDepartment={createDepartment} 
          />
        :
        updateDepartmentModalData.isVisible ? 
          <UpdateDepartmentModal 
            updateDepartmentModalData={updateDepartmentModalData}
            updateDepartmentModalChangeVisible={updateDepartmentModalChangeVisible} 
            updateDepartment={updateDepartment} 
          />
        :
        deleteDepartmentModalData.isVisible && 
          <DeleteDepartmentModal 
            deleteDepartmentModalData={deleteDepartmentModalData}
            deleteDepartmentModalChangeVisible={deleteDepartmentModalChangeVisible} 
            deleteDepartment={deleteDepartment} 
          />
      }
    </Layout>
  );
};

export default DepartmentComponent;
