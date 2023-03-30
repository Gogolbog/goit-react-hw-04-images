import { useState, useEffect } from 'react';
import ApiSearchImg from 'services/getImg';
import Searchbar from '../Searchbar/Searchbar';
import { AppWrapper } from './AppStyled';
import Notiflix from 'notiflix';
import { ImageGallery } from 'components/ImageGallery/Imagegallery';
import { Btn } from 'components/Button/btn';
import { Loader } from 'components/Loader/Loader';

const apiSearchImg = new ApiSearchImg();

export default function App() {
  const [searchValue, setsearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const galleryLengthCheck = data => {
    const galleryLength = data.hits.length < 12;
    if (galleryLength) {
      setShowBtn(false);
      Notiflix.Notify.info('These are all images per your request', {
        width: '400px',
        fontSize: '20px',
      });
    } else {
      setShowBtn(true);
    }
  };

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      apiSearchImg.resetPage();
      apiSearchImg
        .getImg(searchValue)
        .then(data => {
          if (data.hits.length === 0) {
            return Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.',
              { width: '400px', fontSize: '20px' }
            );
          }
          galleryLengthCheck(data);
          setImages(data.hits);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchValue]);

  const onSubmit = value => {
    setsearchValue(value);
  };

  const onClick = async () => {
    try {
      apiSearchImg.incrementPage();
      const data = await apiSearchImg.getImg(searchValue);
      galleryLengthCheck(data);
      setImages(prevState => [...prevState, ...data.hits]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery galleryArr={images} />
      {isLoading && <Loader />}
      {showBtn && <Btn onClick={onClick} />}
    </AppWrapper>
  );
}
