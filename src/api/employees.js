import { v4 as uuid } from 'uuid';
// import { graphQLClient, gql } from '../services/apiService';

// const ALL_EMPLOYEES_QUERY = gql`
//   {
//     allEmployees {
//       ok
//       error
//       employees {
//         id
//         fio
//         login
//       }
//     }
//   }
// `;

// Получение списка сотрудников
const get = async () => {
  // const {
  //   allEmployees: { employees },
  // } = await graphQLClient.request(ALL_EMPLOYEES_QUERY);
  // return employees;
};

// Добавление сотрудника
const add = ({ jobPosition, ...rest }) => {
  const newEmployee = {
    id: uuid(),
    jobPosition: jobPosition.value,
    ...rest,
  };
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  employees.push(newEmployee);

  localStorage.setItem('employees', JSON.stringify(employees));

  return new Promise((resolve) => {
    setTimeout(resolve(newEmployee.id), 500);
  });
};

// Редактирование сотрудника
const edit = (employeeId, values) => {
  const { jobPosition, ...rest } = values;
  const updatedEmployee = {
    id: employeeId,
    jobPosition: jobPosition.value,
    ...rest,
  };
  const currentEmployees = JSON.parse(localStorage.getItem('employees')) || [];
  const employeeIndex = currentEmployees.findIndex((it) => it.id === employeeId);

  const newEmployees = [
    ...currentEmployees.slice(0, employeeIndex),
    updatedEmployee,
    ...currentEmployees.slice(employeeIndex + 1),
  ];

  localStorage.setItem('employees', JSON.stringify(newEmployees));

  return new Promise((resolve) => {
    setTimeout(resolve('Сотрудник успешно обновлен'), 500);
  });
};

// Удаление сотрудника
const del = (employeeId) => {
  const employees = JSON.parse(localStorage.getItem('employees'));
  const newEmployees = employees.filter((it) => it.id !== employeeId);

  localStorage.setItem('employees', JSON.stringify(newEmployees));

  return new Promise((resolve) => {
    setTimeout(resolve('Сотрудник успешно удален'), 500);
  });
};

export { get, add, edit, del };
