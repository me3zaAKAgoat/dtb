import { useEffect } from 'react';

function ToastPortal({
	toast,
	setToast,
}: {
	toast: Toast | null;
	setToast: (toast: Toast | null) => void;
}) {
	useEffect(() => {
		if (toast) {
			setTimeout(() => {
				setToast(null);
			}, 6000);
		}
	}, [toast, setToast]);

	if (!toast) return <></>;
	return (
		<div className="toast toast-end">
			<div className={`alert ${'alert-' + toast.type}`}>
				<span>{toast.message}.</span>
			</div>
		</div>
	);
}

export default ToastPortal;
