import s from './ImageCard.module.css';
import { ImageCardType } from '../../types';

export interface ImageCardProps {
  imgObj: ImageCardType;
  handleImageSelection: (imgObj: ImageCardType) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imgObj,
  handleImageSelection,
}) => {
  return (
    <div className={s.imageCardContainer}>
      <img
        onClick={() => handleImageSelection(imgObj)}
        className={s.imageCard}
        src={imgObj.urls.small}
        alt={imgObj.alt_description}
      />
    </div>
  );
};

export default ImageCard;
