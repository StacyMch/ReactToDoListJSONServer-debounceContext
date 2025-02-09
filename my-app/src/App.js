import { useState } from 'react';
import { NewNoteInput } from './Components/NewNoteInput/NewNoteInput';
import { Note } from './Components';
import { Search } from './Components';
import { Sorting } from './Components';
import styles from './App.module.css';
import { useRequestGet } from './hooks';
import { AppContexts } from './Context';

export const App = () => {
	const [value, setValue] = useState('');
	const [sorting, setSorting] = useState(false);
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const [refreshContentFlag, setRefreshContentFlag] = useState(false);

	const refreshContent = () => setRefreshContentFlag(!refreshContentFlag);

	const { isLoading, notes } = useRequestGet(refreshContentFlag);

	return (
		<AppContexts
			notes={notes}
			debouncedSearch={{ debouncedSearch, setDebouncedSearch }}
			sorting={{ sorting, setSorting }}
		>
			<div className={styles.app}>
				<div className={styles.container}>
					<h1>Список дел</h1>
					<div className={styles.filter}>
						<Search />
						<Sorting />
					</div>
					<div className={styles.wrapper}>
						<div className={styles.noteInput}>
							<NewNoteInput
								refreshContent={refreshContent}
								value={value}
								setValue={setValue}
							/>
						</div>
						<ul className={styles.notesContainer}>
							{isLoading ? (
								<div className={styles.loader}></div>
							) : (
								<Note refreshContent={refreshContent} />
							)}
						</ul>
					</div>
				</div>
			</div>
		</AppContexts>
	);
};
