import s from './Searchbar.module.css';
import { useState } from "react";
import PropTypes from 'prop-types';

export default function Searchbar({onSubmit}) {
    const [query, setQuery] = useState('');

    const handleChange = event => {
        const { value } = event.currentTarget;
        setQuery(value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({ query });
        setQuery('');
    };

    return (
        <header className={s.searchbar}>
            <form className={s.form} onSubmit={handleSubmit}>
                <button type="submit" className={s.button}>
                    <span className={s.label}>Search</span>
                </button>
                <input
                    className={s.input}
                    type="text"
                    name="query"
                    value={query}
                    onChange={handleChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
};