import { useState, useContext } from 'react';
import styles from './Search.module.css';
import { useDebounce } from '../../hooks';
import { DebouncedSearchContext } from '../../Context';

export const Search = () => {
	const [searchValue, setSearchValue] = useState('');

	const { setDebouncedSearch } = useContext(DebouncedSearchContext);
	setDebouncedSearch(useDebounce(searchValue));

	const searchHandle = (input) => {
		setSearchValue(input);
	};
	return (
		<input
			className={styles.search}
			placeholder="Поиск"
			value={searchValue}
			onChange={(e) => searchHandle(e.target.value)}
		></input>
	);
};
