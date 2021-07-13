import { useQuery, useMutation, useQueryClient } from 'react-query';

import * as EmployeesApi from '../api/employees';

// Получение списка сотрудников
const useEmployees = () => {
  return useQuery('employees', () => EmployeesApi.get());
};

// Добавление сотрудника
const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation((values) => EmployeesApi.add(values), {
    onSuccess: () => queryClient.invalidateQueries('employees')
  });
};

// Редактирование сотрудника
const useEditEmployee = (employeeId) => {
  const queryClient = useQueryClient();

  return useMutation((values) => EmployeesApi.edit(employeeId, values), {
    onSuccess: () => queryClient.invalidateQueries('employees')
  });
};

// Удаление сотрудника
const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation((values) => EmployeesApi.del(values), {
    onSuccess: () => queryClient.invalidateQueries('employees')
  });
};

export {
  useEmployees,
  useAddEmployee,
  useEditEmployee,
  useDeleteEmployee,
};
