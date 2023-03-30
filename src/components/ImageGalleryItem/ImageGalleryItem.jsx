import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItemStyled';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({
  tags,
  webformatURL,
  largeImageURL,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <GalleryItem onClick={toggleModal}>
        <GalleryItemImg src={webformatURL} alt={tags} />
      </GalleryItem>
      {showModal && (
        <Modal src={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
