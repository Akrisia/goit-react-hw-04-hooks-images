import { useEffect, useState } from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({page, onLoadMore}) {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setCurrentPage(page)
    }, [page]);

    return (
        <button type="button" className={s.button} onClick={() => {
            setCurrentPage(currentPage => currentPage + 1);
            onLoadMore(currentPage);
        }}>
            Load more
        </button>
    )
};

Button.propTypes = {
    page: PropTypes.number.isRequired,
    onLoadMore: PropTypes.func.isRequired
};

