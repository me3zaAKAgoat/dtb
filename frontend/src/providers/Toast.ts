import { createContext } from 'react';

export const ToastContext = createContext<{
	toast: Toast | null;
	setToast: (toast: Toast) => void;
}>({
	toast: null,
	setToast: () => {},
});
