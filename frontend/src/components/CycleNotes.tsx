import { useEffect, useCallback } from 'react';
import { useDebounce } from '../utils/useDebounce';

const NotesContainer = ({
	cycleId,
	notes,
	setNotes,
}: {
	cycleId: string;
	notes: string;
	setNotes: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const debouncedNotes = useDebounce(notes, 2000);

	useEffect(() => {
		// Api Call to save notes
	}, [debouncedNotes]);

	const handleNotesChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			e.preventDefault();
			setNotes(e.target.value);
		},
		[],
	);

	return (
		<textarea
			className="mt-2 w-[80%] h-[85%] bg-secondary border border-tertiary rounded p-4 text-primary-content font-semibold resize-none focus:outline-none focus:ring-4 focus:ring-tertiary transition-all"
			spellCheck="false"
			value={notes}
			onChange={handleNotesChange}
		></textarea>
	);
};

export default NotesContainer;
