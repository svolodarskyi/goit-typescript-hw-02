import React, { MouseEvent } from 'react';

import s from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  handleLoadMoreBtn: (e: MouseEvent<HTMLButtonElement>) => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleLoadMoreBtn }) => {
  return (
    <div className="container">
      <div className={s.LoadMoreBtnWrapper}>
        <button onClick={handleLoadMoreBtn} className={s.LoadMoreBtn}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default LoadMoreBtn;
