import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import SubmitBtn from '../shared/SubmitBtn';

import EmployeeForm from '../EmployeeForm';
import { defaultValues } from '../EmployeeForm/schemas';

import useSubmitModal from '../../hooks/shared/useSubmitModal';
import { useAddEmployee } from '../../hooks/employees';

const AddEmployeeModal = () => {
  const mutation = useAddEmployee();

  const [isModalOpen, openModal, closeModal, submit] = useSubmitModal({ mutation });

  return (
    <>
      <Button onClick={openModal}>Добавить</Button>
      <Modal size="xl" show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Добавление сотрудника</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmployeeForm defaultValues={defaultValues} onSubmit={submit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeModal} disabled={mutation.isLoading}>
            Отмена
          </Button>
          <SubmitBtn isSubmitting={mutation.isLoading} form="employee-form" />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEmployeeModal;
