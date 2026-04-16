import React, { useState } from 'react';

const CompareEmployees = ({ employees }) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');

  const emp1 = employees.find(e => e.id === first);
  const emp2 = employees.find(e => e.id === second);

  return (
    <div>
      <h2>Compare Employees</h2>
      <select value={first} onChange={e => setFirst(e.target.value)}>
        <option value="">Select Employee 1</option>
        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>
      <select value={second} onChange={e => setSecond(e.target.value)}>
        <option value="">Select Employee 2</option>
        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>
      {emp1 && emp2 && (
        <div>
          <p>Name: {emp1.name} vs {emp2.name}</p>
          <p>Department: {emp1.department} vs {emp2.department}</p>
        </div>
      )}
    </div>
  );
};

export default CompareEmployees;
