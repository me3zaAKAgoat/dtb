import { useEffect, useCallback } from 'react';
import { useDebounce } from '../utils/useDebounce';

const NotesContainer = ({
	notes,
	setNotes,
}: {
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
		<div className="">
			<div className="">Notes</div>
			<textarea
				className=""
				spellCheck="false"
				value={notes}
				onChange={handleNotesChange}
			></textarea>
		</div>
	);
};

export default NotesContainer;
