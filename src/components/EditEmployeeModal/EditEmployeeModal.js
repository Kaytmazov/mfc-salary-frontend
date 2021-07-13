import React from 'react';
import PropTypes from 'prop-types';

import parseISO from 'date-fns/parseISO';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import SubmitBtn from '../shared/SubmitBtn';

import EmployeeForm from '../EmployeeForm';
import { defaultValues } from '../EmployeeForm/schemas';

import prepareEditingItemValues from '../../utils/prepareEditingItemValues';

import useSubmitModal from '../../hooks/shared/useSubmitModal';
import { useEditEmployee } from '../../hooks/employees';

const EditEmployeeModal = ({ employee, onSuccess, onModalClose }) => {
  const mutation = useEditEmployee(employee.id);

  const [isModalOpen, openModal, closeModal, submit] = useSubmitModal({
    mutation,
    onSuccess,
    onModalClose,
  });

  const initValues = React.useMemo(
    () => ({
      ...prepareEditingItemValues(employee, defaultValues),
      dateBirth: employee.dateBirth ? parseISO(employee.dateBirth) : null,
      dateStart: employee.dateStart ? parseISO(employee.dateStart) : null,
      dateEnd: employee.dateEnd ? parseISO(employee.dateEnd) : null,
      jobPosition: {
        value: employee.jobPosition,
        label: employee.jobPosition,
      },
    }),
    [employee]
  );

  React.useEffect(() => {
    openModal();
  }, [openModal]);

  return (
    <Modal size="xl" show={isModalOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование сотрудника</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmployeeForm defaultValues={initValues} onSubmit={submit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={closeModal} disabled={mutation.isLoading}>
          Отмена
        </Button>
        <SubmitBtn
          text="Обновить"
          isSubmitting={mutation.isLoading}
          form="employee-form"
        />
      </Modal.Footer>
    </Modal>
  );
};

EditEmployeeModal.defaultProps = {
  onSuccess: undefined,
}

EditEmployeeModal.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.string.isRequired,
    jobPosition: PropTypes.string.isRequired,
    dateBirth: PropTypes.string.isRequired,
    dateStart: PropTypes.string.isRequired,
    dateEnd: PropTypes.string.isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default EditEmployeeModal;
