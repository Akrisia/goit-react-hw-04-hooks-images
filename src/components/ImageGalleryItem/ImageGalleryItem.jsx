import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ imageId, webformatURL, tags, openModal}) {
    return (
        <li className={s.item}>
            <img src={webformatURL} alt={tags} id={imageId} onClick={() => {
                openModal({ imageId });
            }} />
        </li>
    )
};
    
ImageGalleryItem.propTypes = {
    imageId: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
};