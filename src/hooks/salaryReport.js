import { useQuery } from 'react-query';

import * as SalaryReportApi from '../api/salaryReport';

// Получение отчета по зарплате
export const useSalaryReportQuery = (values) => {
  return useQuery(['salary-report', values], () => SalaryReportApi.get(values));
};
