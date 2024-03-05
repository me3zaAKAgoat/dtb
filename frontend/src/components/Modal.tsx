/**
 * This is the modal component that is used to display different types of modals that exist in modals directory
 */

function ModalContent({ type }: { type: Modal }) {
	return <></>;
}

/**
 * the type should be a union of string that represents the type of modal to be displayed
 */
function Modal({ type }: { type: Modal }) {
	if (type === 'off') {
		return <></>;
	} else {
		return (
			<dialog id="my_modal_2" className="modal bg-[rgba(0,0,0,0.6)]">
				<div className="modal-box p-4 bg-primary border rounded-[6px]">
					<ModalContent type={type} />
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		);
	}
}

export default Modal;
