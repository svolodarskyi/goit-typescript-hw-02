import React from 'react';

import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={`container ${s.loaderContainer}`}>
      <div className={s.loader}>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="rgb(148, 145, 145)"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    </div>
  );
};

export default Loader;
