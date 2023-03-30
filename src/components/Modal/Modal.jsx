import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Img, ModalContent, ModalOverlay } from './modalStyled';

export default function Modal({ src, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <Img src={src} alt={alt} />
      </ModalContent>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
