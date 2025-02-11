import React from 'react';
import s from './ImageModal.module.css';
import Modal from 'react-modal';
import { ImageCardType } from '../../types';

Modal.setAppElement('#root');

export interface ImageModalProps {
  modalIsOpen: boolean;
  handModalClosing: () => void;
  selectedPicture: ImageCardType;
}

const ImageModal: React.FC<ImageModalProps> = ({
  modalIsOpen,
  handModalClosing,
  selectedPicture,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handModalClosing}
      className={s.modalFrame}
      overlayClassName={s.modalOverlay}
    >
      <div className={s.modalContent}>
        <img
          className={s.modalImage}
          src={selectedPicture.urls.regular}
          alt={selectedPicture.alt_descr}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
