import React from 'react';

import { toast } from 'react-toastify';

const useSubmitModal = ({ mutation, onSuccess, onModalClose }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = React.useCallback(() => setIsModalOpen(true), []);
  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
    if (onModalClose) {
      onModalClose();
    }
  }, [onModalClose]);

  React.useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Успешно добавлен');
      closeModal();

      if (onSuccess) {
        onSuccess(mutation.data);
      }
    }
  }, [mutation.isSuccess, mutation.data, closeModal, onSuccess]);

  React.useEffect(() => {
    if (mutation.error) {
      toast.error(mutation.error.message);
    }
  }, [mutation.error]);

  const submit = (values) => {
    mutation.mutate(values);
  };

  return [isModalOpen, openModal, closeModal, submit];
};

export default useSubmitModal;
