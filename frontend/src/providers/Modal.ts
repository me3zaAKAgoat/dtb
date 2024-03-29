import { createContext } from 'react';

export const ModalContext = createContext<{
	modal: Modal;
	setModal: (modal: Modal) => void;
}>({
	modal: {
		type: 'off',
	},
	setModal: () => {},
});
