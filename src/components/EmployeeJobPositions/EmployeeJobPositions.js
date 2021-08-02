import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import LoadingIndicator from '../shared/LoadingIndicator';
import ErrorIndicator from '../shared/ErrorIndicator';
import InfoTooltipIcon from '../shared/InfoTooltipIcon';

import convertDate from '../..//utils/convertDate';

import { useEmployeeJobPositions } from '../../hooks/employeeJobPositions';

const EmployeeJobPositions = ({ employeeId }) => {
  const { data, error, isLoading } = useEmployeeJobPositions(employeeId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  if (!data?.length) {
    return <Alert variant="warning">Нет данных</Alert>;
  }

  return (
    <Table className="table-nopadding" hover responsive>
      <thead>
        <tr>
          <th>Филиал</th>
          <th>Ставка</th>
          <th>Интенсивность</th>
          <th>Дата начала</th>
          <th>Дата окончания</th>
          <th className="text-right">
            <Button size="sm">Добавить</Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          (
            {
              id,
              officeName,
              jobPositionName,
              rate,
              intensity,
              dateStart,
              dateStop,
              dateAdd,
              employeeIdAdd,
              employeeFioAdd,
              comment,
            },
            idx
          ) => (
            <tr key={id}>
              <td>
                {officeName}
                <small className="d-block text-muted">{jobPositionName}</small>
              </td>
              <td>{rate}</td>
              <td>{intensity}</td>
              <td>{convertDate(dateStart)}</td>
              <td>{convertDate(dateStop)}</td>
              <td>
                <div className="btns-cell">
                  <InfoTooltipIcon
                    employeeIdAdd={employeeIdAdd}
                    employeeFioAdd={employeeFioAdd}
                    dateAdd={dateAdd}
                    comment={comment}
                  />
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

EmployeeJobPositions.propTypes = {
  employeeId: PropTypes.string.isRequired,
};

export default EmployeeJobPositions;
