import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

import LoadingIndicator from '../../shared/LoadingIndicator';
import ErrorIndicator from '../../shared/ErrorIndicator';
import Pagination from '../../shared/Pagination';

import { useSalaryReportQuery } from '../../../hooks/salaryReport';

const SalaryReportTable = ({ filterValues }) => {
  const history = useHistory();
  const [pageItems, setPageItems] = React.useState([]);

  const { data, error, isLoading } = useSalaryReportQuery(filterValues);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  if (!data?.length) {
    return <Alert variant="secondary">Нет данных</Alert>;
  }

  return (
    <>
      <Table hover className="mb-4">
        <thead>
          <tr>
            <th rowSpan="2">№</th>
            <th rowSpan="2">Сотрудник</th>
            <th rowSpan="2">Тип</th>
            <th rowSpan="2" className="text-center">
              Дни
              <span className="d-block text-nowrap">(период/отраб.)</span>
            </th>
            <th rowSpan="2" className="text-center">
              Оклад
            </th>
            <th rowSpan="2" className="text-center">
              Став.
            </th>
            <th colSpan="2" className="text-center">
              Надбавка за инт.
            </th>
            <th rowSpan="2" className="text-center">
              Удержано
            </th>
            <th rowSpan="2" className="text-center">
              Сумма к начисл.
            </th>
          </tr>
          <tr className="text-center">
            <th className="text-nowrap">Свои / От др.</th>
            <th className="font-weight-bold">Итого</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((it, idx) => (
            <tr key={it.id} onClick={() => history.push(`/salary-report/${it.employeeId}`)}>
              <td>{idx + 1}</td>
              <td>
                {it.fio}
                <small className="d-block text-muted">{it.jobPosition}</small>
              </td>
              <td>{it.type}</td>
              <td className="text-center">{it.countDaysPeriod} / 1</td>
              <td className="text-center">{it.salary}</td>
              <td className="text-center">{it.rate}</td>
              <td className="text-center">
                {it.stepPremium} / {it.stepPremiumOther}
              </td>
              <td className="text-center font-weight-bold">{it.premium}</td>
              <td className="text-center">{it.fineSum}</td>
              <td className="text-center">{it.premiumTotal}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination items={data} onPageChange={setPageItems} />
    </>
  );
};

SalaryReportTable.propTypes = {
  filterValues: PropTypes.shape({
    officeId: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};

export default SalaryReportTable;
