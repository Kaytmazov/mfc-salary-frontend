import { useQuery } from 'react-query';

import * as EmployeesJobPositionsApi from '../api/employeeJobPositions';

// Получение списка сотрудников
const useEmployeeJobPositions = (id) => {
  return useQuery(['employeeJobPositions', id], () => EmployeesJobPositionsApi.get(id));
};

export { useEmployeeJobPositions };
