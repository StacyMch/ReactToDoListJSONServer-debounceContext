import { NotesContext, DebouncedSearchContext, SortingContext } from './index';

export const AppContexts = ({ notes, debouncedSearch, sorting, children }) => {
	return (
		<NotesContext value={notes}>
			<DebouncedSearchContext value={debouncedSearch}>
				<SortingContext value={sorting}>{children}</SortingContext>
			</DebouncedSearchContext>
		</NotesContext>
	);
};
