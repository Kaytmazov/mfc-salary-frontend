import React from 'react';

import EmployeesTable from '../EmployeesTable';
import AddEmployeeModal from '../AddEmployeeModal';

const Employees = () => (
  <section>
    <header className="page-header">
      <h1 className="page-title">Сотрудники</h1>
      <AddEmployeeModal />
    </header>

    <EmployeesTable />
  </section>
);

export default Employees;
