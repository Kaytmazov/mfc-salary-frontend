import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import SubmitBtn from '../SubmitBtn';

const DeleteItemModal = ({ isModalOpen, closeModal, deleteItem }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const onSubmit = () => {
    setIsDeleting(true);
    deleteItem()
      .then(() => {
        setIsDeleting(false);
        closeModal();
      })
      .catch(() => setIsDeleting(false));
  };

  return (
    <Modal className="modal-mini" show={isModalOpen} onHide={closeModal} centered>
      <Modal.Body className="text-center">
        <h3 className="mb-3">Удаление</h3>
        <p className="mb-4">Вы уверены, что хотите удалить элемент?</p>
        <div>
          <Button variant="light" onClick={closeModal}>
            Отмена
          </Button>
          <SubmitBtn text="Удалить" variant="danger" className="ml-2" isSubmitting={isDeleting} onClick={onSubmit} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

DeleteItemModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default DeleteItemModal;
