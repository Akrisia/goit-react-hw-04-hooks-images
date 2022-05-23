import s from './ImageGallery.module.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { fetchImages } from 'services/FetchImages';

export default function ImageGallery({query, page, handleImages, openModal}) {
    const [images, setImages] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) {
            return;
        };
        setLoading(true);
        fetchImages(query, page)
            .then(response => {
                setImages(images => [...response.data.hits]);
                setTotal(response.data.totalHits);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [query]);

    useEffect(() => {
        if (!query) {
            return;
        };
        setLoading(true);
        fetchImages(query, page)
            .then(response => {
                setImages(images => [...images, ...response.data.hits]);
                setTotal(response.data.totalHits);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [page]);


    useEffect(() => {
        handleImages({ images, total, loading });
    });

    return (
        <ul className={s.gallery}>
            {images.map(image => {
                return <ImageGalleryItem key={image.id} imageId={image.id} webformatURL={image.webformatURL} tags={image.tags} openModal={openModal} />
            })}
        </ul>
    );
};

ImageGallery.propTypes = {
    query: PropTypes.string,
    page: PropTypes.number.isRequired,
    handleImages: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
};