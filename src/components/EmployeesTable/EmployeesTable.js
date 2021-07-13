import React from 'react';

import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import LoadingIndicator from '../shared/LoadingIndicator';
import ErrorIndicator from '../shared/ErrorIndicator';
import Tooltip from '../shared/Tooltip';
import Icon from '../shared/Icon';
import DeleteItemModal from '../shared/DeleteItemModal';

import EditEmployeeModal from '../EditEmployeeModal';

import convertDate from '../../utils/convertDate';

import { useEmployees, useDeleteEmployee } from '../../hooks/employees';

const gendersMap = {
  male: 'Мужской',
  female: 'Женский',
};

const EmployeesTable = () => {
  const { data, error, isLoading } = useEmployees();
  const deleteEmployeeMutation = useDeleteEmployee();
  const [employeeToEdit, setEmployeeToEdit] = React.useState(null);
  const [idToDelete, setIdToDelete] = React.useState('');

  const deleteItem = () => {
    return deleteEmployeeMutation.mutateAsync(idToDelete);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  if (!data?.length) {
    return <Alert variant="secondary">Нет данных</Alert>
  }

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Должность</th>
            <th>Дата рождения</th>
            <th>Пол</th>
            <th>Дата приема на работу</th>
            <th>Дата увольнения</th>
            <th>Наличие прав</th>
            <th className="text-right">Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((it) => (
            <tr key={it.id}>
              <td>{it.lastName}</td>
              <td>{it.firstName}</td>
              <td>{it.middleName}</td>
              <td>{it.jobPosition}</td>
              <td>{convertDate(it.dateBirth)}</td>
              <td>{gendersMap[it.gender]}</td>
              <td>{convertDate(it.dateStart)}</td>
              <td>{convertDate(it.dateEnd)}</td>
              <td>{it.permissions ? 'Да' : 'Нет'}</td>
              <td className="btns-cell">
                <Tooltip title="Редактировать">
                  <Button variant="icon" onClick={() => setEmployeeToEdit(it)}>
                    <Icon name="edit" width="20px" height="20px" />
                  </Button>
                </Tooltip>

                <Tooltip title="Удалить">
                  <Button variant="icon danger" onClick={() => setIdToDelete(it.id)}>
                    <Icon name="remove" width="20px" height="20px" />
                  </Button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {employeeToEdit && (
        <EditEmployeeModal
          employee={employeeToEdit}
          onModalClose={() => setEmployeeToEdit(null)}
        />
      )}

      {idToDelete && (
        <DeleteItemModal
          isModalOpen={Boolean(idToDelete)}
          closeModal={() => setIdToDelete('')}
          deleteItem={deleteItem}
        />
      )}
    </>
  );
};

export default EmployeesTable;
