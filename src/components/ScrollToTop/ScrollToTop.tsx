import React, { useState, useEffect, useCallback } from 'react';
import { IoArrowUp } from 'react-icons/io5';
import s from './ScrollToTop.module.css';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = useCallback((): void => {
    setIsVisible(window.scrollY > window.innerHeight);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div onClick={scrollToTop} className={s.scrollButton} title="Go to top">
          <IoArrowUp />
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
