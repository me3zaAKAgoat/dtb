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
	if (toast.type === 'success') {
		return (
			<div className="toast toast-end">
				<div className="rounded-[4px] border border-primary-content alert alert-success">
					<span>{toast.message}.</span>
				</div>
			</div>
		);
	} else if (toast.type === 'error') {
		return (
			<div className="toast toast-end">
				<div className="rounded-[4px] border border-primary-content alert alert-error">
					<span>{toast.message}.</span>
				</div>
			</div>
		);
	} else {
		return (
			<div className="toast toast-end">
				<div className="rounded-[4px] border border-primary-content alert alert-warning">
					<span>{toast.message}.</span>
				</div>
			</div>
		);
	}
}

export default ToastPortal;
