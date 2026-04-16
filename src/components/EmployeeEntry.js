import React, { useState } from 'react';

const EmployeeEntry = ({ onAdd }) => {
  const [employee, setEmployee] = useState({ name: '', id: '', department: '' });

  const handleChange = e => setEmployee({ ...employee, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    onAdd(employee);
    setEmployee({ name: '', id: '', department: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Employee Entry</h2>
      <input name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
      <input name="id" placeholder="ID" value={employee.id} onChange={handleChange} required />
      <input name="department" placeholder="Department" value={employee.department} onChange={handleChange} required />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeEntry;
