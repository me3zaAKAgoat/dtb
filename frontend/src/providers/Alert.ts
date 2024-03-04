import { createContext } from 'react';

export const AlertContext = createContext<{
	alert: Alert | null;
	setAlert: (alert: Alert) => void;
}>({
	alert: null,
	setAlert: () => {},
});
