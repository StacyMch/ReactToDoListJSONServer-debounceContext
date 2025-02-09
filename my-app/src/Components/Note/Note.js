import { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import styles from './Note.module.css';
import {
	useRequestUpdateText,
	useRequestDelete,
	useRequestIsCompleted,
} from '../../hooks';
import { NotesContext, DebouncedSearchContext, SortingContext } from '../../Context';

export const Note = ({ refreshContent }) => {
	const [idEdited, setIdEdited] = useState(null);
	const [textBeforeEditing, setTextBeforeEditing] = useState('');
	const [textEdited, setTextEdited] = useState('');

	const notes = useContext(NotesContext);
	const { debouncedSearch } = useContext(DebouncedSearchContext);
	const { sorting } = useContext(SortingContext);

	const handleInputChange = (e) => {
		setTextEdited(e.target.value);
	};

	const wantToEdit = (id, text) => {
		setIdEdited(id); //назначаем id заметки, которую хотим редактировать, чтобы при отрисовке использовать его в условии
		setTextEdited(text);
		setTextBeforeEditing(text);
	};

	const { isUpdating, requestUpdate } = useRequestUpdateText(
		textEdited,
		textBeforeEditing,
		setTextEdited,
		setIdEdited,
		refreshContent,
	);

	const { isChanging, requestIsCompleted } = useRequestIsCompleted(refreshContent);
	const { isDeleting, requestDelete } = useRequestDelete(refreshContent);

	const refForCursor = useRef(null);
	const refForResizing = useRef(null);

	useEffect(() => {
		if (refForCursor.current) {
			let end = refForCursor.current.value.length;
			refForCursor.current.setSelectionRange(end, end); //чтобы курсор встал в конец текста
			refForCursor.current.focus();
		}
	}, [idEdited]);

	const filteredAndSortedNotes = notes
		.filter(
			({ content }) =>
				!debouncedSearch ||
				(content &&
					typeof content === 'string' &&
					content.toLowerCase().includes(debouncedSearch?.toLowerCase())),
		)
		.sort(
			(a, b) =>
				sorting
					? a.content.localeCompare(b.content)
					: a.completed === b.completed
						? 0 // если обе одинаковые по 'completed', не меняем порядок
						: a.completed
							? 1
							: -1, // перемещаем 'completed: true' вниз
		);

	return filteredAndSortedNotes.map(({ id, content, completed }) => (
		<li>
			<div key={id} className={styles.note}>
				<textarea
					className={completed ? styles.completed : null}
					value={idEdited === id ? textEdited : content}
					onChange={handleInputChange}
					onBlur={idEdited === id ? () => requestUpdate(id) : null}
					ref={idEdited === id ? refForCursor : refForResizing}
					disabled={completed || idEdited !== id}
				></textarea>
				{idEdited !== id && !completed && (
					<div className={styles.iconContainer + ' ' + styles.absoluteIcon}>
						<div
							className={styles.editBtn}
							disabled={isUpdating}
							onClick={() => wantToEdit(id, content)}
						>
							&#9998;
						</div>
					</div>
				)}
				<div className={styles.iconsContainer}>
					{!completed && (
						<div className={styles.iconContainer}>
							<div
								className={styles.saveBtn}
								disabled={isChanging}
								onClick={() => requestIsCompleted(id)}
							>
								&#10004;
							</div>
						</div>
					)}
					<div className={styles.iconContainer}>
						<div
							className={styles.deleteBtn}
							disabled={isDeleting}
							onClick={() => requestDelete(id)}
						>
							&#10008;
						</div>
					</div>
				</div>
			</div>
		</li>
	));
};
