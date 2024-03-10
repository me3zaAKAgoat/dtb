import { createContext } from 'react';

export const ToastContext = createContext<{
	toast: Toast | null;
	setToast: (toast: Toast | null) => void;
}>({
	toast: null,
	setToast: () => {},
});
