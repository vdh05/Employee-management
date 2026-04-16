import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div style={{
    width: '200px',
    background: '#f5f6fa',
    borderRight: '1px solid #e1e1e1',
    padding: '24px 0',
    minHeight: '100vh'
  }}>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li style={{ margin: '16px 0' }}><Link to="/">Dashboard</Link></li>
      <li style={{ margin: '16px 0' }}><Link to="/employee-entry">Employee Entry</Link></li>
      <li style={{ margin: '16px 0' }}><Link to="/employee-list">Employee List</Link></li>
      <li style={{ margin: '16px 0' }}><Link to="/compare">Compare Employees</Link></li>
    </ul>
  </div>
);

export default Sidebar;
