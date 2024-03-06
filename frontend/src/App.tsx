import { useState } from 'react';
import { useAuth, AuthContext } from './utils/useAuth';
import { AlertContext } from './providers/Alert';
import { ModalContext } from './providers/Modal';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import './index.css';
import Dashboard from './pages/Dashboard';

function App() {
	const { user, login, logout } = useAuth();
	const [alert, setAlert] = useState<Alert | null>(null);
	const [modal, setModal] = useState<Modal>('off');

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			<ModalContext.Provider value={{ modal, setModal }}>
				<AlertContext.Provider value={{ alert, setAlert }}>
					<Routes>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						{user && (
							<>
								<Route path="/" element={<Home />} />
								<Route path="/home" element={<Home />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="*" element={<PageNotFound />} />
							</>
						)}
					</Routes>
				</AlertContext.Provider>
			</ModalContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
