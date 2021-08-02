import { graphQLClient, gql } from '../services/apiService';

const SALARY_REPORT_QUERY = gql`
  query salaryReport($officeId: String!, $month: Int!, $year: Int!) {
    salaryReport(officeId: $officeId, month: $month, year: $year) {
      id
      employeeId
      fio
      jobPosition
      type
      countDaysPeriod
      salary
      rate
      stepPremium
      stepPremiumOther
      premium
      fineSum
      premiumTotal
    }
  }
`;

// Получение отчета по зарплате
export const get = async (values) => {
  const { salaryReport } = await graphQLClient.request(SALARY_REPORT_QUERY, values);
  return salaryReport;
};
