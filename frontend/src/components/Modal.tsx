import React, { useEffect } from 'react';
import CycleStartForm from './modals/CycleStartForm';
import TaskCreationForm from './modals/TaskCreationForm';
import TaskEditForm from './modals/TaskEditForm';

/**
 * This is the modal component that is used to display different types of modals that exist in modals directory
 */
function ModalContent({ modal }: { modal: Modal }) {
	if (modal.type === 'CycleStartForm') {
		return <CycleStartForm />;
	} else if (modal.type === 'TaskCreationForm') {
		return (
			<TaskCreationForm
				cycleId={modal.extraData!.cycleId!}
				tasks={modal.extraData!.tasks!}
				setTasks={modal.extraData!.setTasks!}
			/>
		);
	} else if (modal.type === 'TaskEditForm') {
		return (
			<TaskEditForm
				taskId={modal.extraData!.taskId!}
				tasks={modal.extraData!.tasks!}
				setTasks={modal.extraData!.setTasks!}
			/>
		);
	}
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
		if (modal.type !== 'off')
			(document.getElementById('my_modal_2') as HTMLDialogElement).showModal();
		else (document.getElementById('my_modal_2') as HTMLDialogElement).close();
	}, [modal]);

	return (
		<dialog id="my_modal_2" className="modal bg-[rgba(0,0,0,0.6)]">
			<div className="modal-box p-4 bg-primary border rounded-[6px] border-tertiary">
				<ModalContent modal={modal} />
			</div>
			<form method="dialog" className="modal-backdrop">
				<button
					onClick={() => {
						setModal({ type: 'off' });
					}}
				>
					close
				</button>
			</form>
		</dialog>
	);
}

export default ModalPortal;
