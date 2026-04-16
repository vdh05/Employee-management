import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import EmployeeEntry from './components/EmployeeEntry';
import EmployeeList from './components/EmployeeList';
import CompareEmployees from './components/CompareEmployees';
import EmployeeDashboard from './components/EmployeeDashboard';
import { EmployeeDashboardIndex } from './pages/Employees/EmployeeDashboardIndex';

function App() {
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = emp => {
    setEmployees([...employees, emp]);
  };

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '24px' }}>
          <Routes>
            <Route path="/employee-entry" element={<EmployeeEntry onAdd={handleAddEmployee} />} />
            <Route path="/employee-list" element={<EmployeeList employees={employees} />} />
            <Route path="/compare" element={<CompareEmployees employees={employees} />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee-deashboard-index" element={<EmployeeDashboardIndex />} />
            <Route path="*" element={<EmployeeEntry onAdd={handleAddEmployee} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;