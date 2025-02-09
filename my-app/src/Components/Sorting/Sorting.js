import { useState, useContext } from 'react';
import { SortingContext } from '../../Context';
import styles from './Sorting.module.css';

export const Sorting = () => {
	const [checked, setChecked] = useState(false);
	const { sorting, setSorting } = useContext(SortingContext);

	const toggleAlphabetSorting = () => {
		setChecked(!checked);
		setSorting(!sorting);
	};

	return (
		<div className={styles.checkboxContainer}>
			по алфавиту
			<input
				type="checkbox"
				className={styles.check}
				checked={checked}
				onChange={toggleAlphabetSorting}
			/>
		</div>
	);
};
