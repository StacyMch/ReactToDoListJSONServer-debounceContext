import { useState } from 'react';
import { deleteNote } from '../api';

export const useRequestDelete = (refreshContent) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDelete = (id) => {
		setIsDeleting(true);
		deleteNote(id)
			.then((response) => {
				console.log('Заметка удалена');
				refreshContent();
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};
	return {
		isDeleting,
		requestDelete,
	};
};
