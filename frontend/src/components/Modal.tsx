import React, { useEffect } from 'react';
import CycleStartForm from './modals/CycleStartForm';

/**
 * This is the modal component that is used to display different types of modals that exist in modals directory
 */
function ModalContent({ modal }: { modal: Modal }) {
	if (modal === 'CycleStartForm') {
		return <CycleStartForm />;
	} else return <></>;
}

/**
 * the modal should be a union of string that represents the type of modal to be displayed
 */
function ModalPortal({
	modal,
	setModal,
}: {
	modal: Modal;
	setModal: React.Dispatch<React.SetStateAction<Modal>>;
}) {
	useEffect(() => {
		if (modal !== 'off')
			(document.getElementById('my_modal_2') as HTMLDialogElement).showModal();
	}, [modal]);

	return (
		<dialog id="my_modal_2" className="modal bg-[rgba(0,0,0,0.6)]">
			<div className="modal-box p-4 bg-primary border rounded-[6px] border-tertiary">
				<ModalContent modal={modal} />
			</div>
			<form method="dialog" className="modal-backdrop">
				<button
					onClick={() => {
						setModal('off');
					}}
				>
					close
				</button>
			</form>
		</dialog>
	);
}

export default ModalPortal;
