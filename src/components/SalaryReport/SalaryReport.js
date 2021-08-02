import React from 'react';

import Filter from './Filter';
import SalaryReportTable from './SalaryReportTable';

import { useAuthUserQuery } from '../../hooks/authUser';

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const SalaryReport = () => {
  const { data: authUser } = useAuthUserQuery();

  const [filterValues, setFilterValues] = React.useState(() => ({
    officeId: authUser?.office?.id ?? null,
    month: currentMonth,
    year: currentYear,
  }));

  return (
    <>
      <Filter defaultValues={filterValues} onSubmit={setFilterValues} />

      <SalaryReportTable filterValues={filterValues} />
    </>
  );
};

export default SalaryReport;
