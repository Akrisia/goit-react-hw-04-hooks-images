import s from './App.module.css';
import { useState } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from './Loader';
import Button from './Button';
import Modal from 'components/Modal';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imageId, setImageId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const onSubmit = ({ query }) => {
    setQuery(query);
    setPage(1);
    query && setImages([]);
  };

  const handleImages = ({ images, total, loading }) => {
    setImages(images);
    setTotal(total);
    setLoading(loading);
  };

  const onLoadMore = ({ page }) => {
    setPage(page => page + 1);
  };

  const openModal = ({ imageId }) => {
    setShowModal(true);
    setImageId(imageId);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={onSubmit}/>
      <ImageGallery query={query} page={page} handleImages={handleImages} openModal={openModal}/>
      {loading && <Loader />}
      {images.length > 0 && images.length < total && <Button page={page} onLoadMore={onLoadMore} />}
      {showModal && <Modal closeModal={closeModal}>
          {images.map(image => image.id === imageId &&
          <img key={imageId} src={image.largeImageURL} alt={image.tags}/>
          )}
      </Modal>}
    </div>
  );
};