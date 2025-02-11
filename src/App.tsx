import { useState } from 'react';
import { fetchPhotos } from './services/api';
import SearchBar from './components/SearchBar/SearchBar';
import { useEffect, MouseEvent } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';

import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { ImageCardType } from './types';

const FRIENDLY_ERROR_MESSAGES = {
  400: 'Oops! Something went wrong with your request. Please check that all required information is provided and try again.',
  401: "Access denied! Please make sure you're logged in and using a valid access token to access this feature.",
  403: 'You don’t have the necessary permissions to perform this action. Contact support if you think this is a mistake.',
  404: 'The resource you’re looking for doesn’t seem to exist. Try searching for something else.',
  500: 'Something went wrong on our end. We’re working to fix it as quickly as possible. Please try again later.',
  503: 'Something went wrong on our end. We’re working to fix it as quickly as possible. Please try again later.',
};

function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [pictureGallery, setPictureGallery] = useState<ImageCardType[]>([]);
  const [selectedPicture, setSelectedPicture] = useState<ImageCardType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [relativeButtonLocation, setRelativeButtonLocation] =
    useState<number>(0);

  const notifyError = (message: string) =>
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
      style: { fontFamily: 'sans-serif', fontSize: '0.7rem' },
    });

  const handleChangeInQuery = (queryValue: string) => {
    const queryValueTrimmed = queryValue.trim();
    if (queryValueTrimmed === '') {
      notifyError('Oops! The search field is empty. Try again.');
      return;
    } else if (queryValueTrimmed === query) {
      return;
    }
    setPage(1);
    setPictureGallery([]);
    setQuery(queryValueTrimmed);
  };

  const handleLoadMoreButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Ensure we're using the correct target element
    const buttonElement = e.currentTarget;

    // Get distance from the top edge of the button element to the top edge of the viewport
    setRelativeButtonLocation(buttonElement.getBoundingClientRect().top);
    setPage(prev => prev + 1);
  };

  const handleImageSelection = (imgObj: ImageCardType): void => {
    setSelectedPicture(imgObj);
    setModalIsOpen(true);
  };

  const handModalClosing = (): void => {
    setModalIsOpen(false);
    setSelectedPicture(null);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchPhotosFromApi = async () => {
      const per_page = 12;
      try {
        setIsLoading(true);
        setIsError(false);
        const response: { results: ImageCardType[]; total: number } =
          await fetchPhotos({ query, page, per_page });

        if ('results' in response && response.results.length > 0) {
          setPictureGallery(prev => [...prev, ...response.results]);
          if (response.results.length < per_page) {
            setShowLoadMoreButton(false);
          } else {
            setShowLoadMoreButton(true);
          }
        } else if (response.total === 0) {
          notifyError('Nothing found. Please try another request');
        } else if (response.results.length === 0) {
          setShowLoadMoreButton(false);
        }
      } catch (error: any) {
        setIsError(true);
        setShowLoadMoreButton(false);
        switch (error.status) {
          case 400:
            //400 - Bad Request
            notifyError(FRIENDLY_ERROR_MESSAGES[400]);
            break;
          case 401:
            //401 - Unauthorized
            notifyError(FRIENDLY_ERROR_MESSAGES[401]);
            break;
          case 403:
            //403 - Forbidden
            notifyError(FRIENDLY_ERROR_MESSAGES[403]);
            break;
          case 404:
            //404 - Not Found
            notifyError(FRIENDLY_ERROR_MESSAGES[404]);
            break;
          case 500:
            //500 - Server Error
            notifyError(FRIENDLY_ERROR_MESSAGES[500]);
            break;
          case 503:
            //503 - Server Error
            notifyError(FRIENDLY_ERROR_MESSAGES[503]);
            break;
          default:
            notifyError('Please refresh the page and try again');
        }
      } finally {
        setIsLoading(false);
        //requestAnimationFrame ensures that the DOM is fully updated before executing the scrolling logic.
        setTimeout(() => {
          if (page > 1) {
            window.scrollBy({
              top: relativeButtonLocation - 150,
              behavior: 'smooth',
            });
          }
        }, 1);
      }
    };

    fetchPhotosFromApi();
  }, [query, page, relativeButtonLocation]);

  return (
    <>
      {selectedPicture && (
        <ImageModal
          selectedPicture={selectedPicture}
          modalIsOpen={modalIsOpen}
          handModalClosing={handModalClosing}
        />
      )}
      <SearchBar handleChangeInQuery={handleChangeInQuery} query={query} />
      <ImageGallery
        imageGallery={pictureGallery}
        handleImageSelection={handleImageSelection}
      />
      {showLoadMoreButton && !isLoading ? (
        <LoadMoreBtn handleLoadMoreBtn={handleLoadMoreButtonClick} />
      ) : null}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster />
      <ScrollToTop />
    </>
  );
}

export default App;
