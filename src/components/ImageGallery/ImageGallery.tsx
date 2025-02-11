import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';
import { ImageCardType } from '../../types';

export interface ImageGalleryProps {
  imageGallery: ImageCardType[];
  handleImageSelection: (imgObj: ImageCardType) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  imageGallery,
  handleImageSelection,
}) => {
  return (
    <div className="container">
      <ul className={s.imageGallery}>
        {imageGallery.map((image: ImageCardType) => (
          <li key={image.id}>
            <ImageCard
              handleImageSelection={handleImageSelection}
              imgObj={image}
            />{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
