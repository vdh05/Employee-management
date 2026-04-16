import React from 'react';

const EmployeeList = ({ employees }) => (
  <div>
    <h2>Employee List</h2>
    <ul>
      {employees.map((emp, idx) => (
        <li key={idx}>
          {emp.name} | {emp.id} | {emp.department}
        </li>
      ))}
    </ul>
  </div>
);

export default EmployeeList;
