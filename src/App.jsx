import React, { useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { ApartmentOutlined, UserOutlined, BankOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import DepartmentComponent from './components/DepartmentComponent';
import EmployeeComponent from './components/EmployeeComponent';
import CurrentDepartmentPage from './components/CurrentDepartmentPage';

import 'antd/dist/antd.css';
import './App.css';

const { Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
 
  return (
    <BrowserRouter>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
          <BankOutlined className='logo'/>
          <Menu theme="dark" mode="inline">
            <Menu.Item key='1' icon={<ApartmentOutlined/>} >
              <Link to="/Departments" className="Link">Departments</Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<UserOutlined/>}>
              <Link to="/Employees" className="Link" >Employees</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Routes>  
          <Route path="/" element={<DepartmentComponent collapsed={collapsed} setCollapsed={setCollapsed}/>} />
          <Route path="/Departments" element={<DepartmentComponent collapsed={collapsed} setCollapsed={setCollapsed}/>} /> 
          <Route path="/Employees" element={<EmployeeComponent collapsed={collapsed} setCollapsed={setCollapsed}/>} />
          <Route path="/Departments/:id" element={<CurrentDepartmentPage collapsed={collapsed} setCollapsed={setCollapsed} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
