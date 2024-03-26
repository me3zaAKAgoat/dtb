import { useState } from 'react';
import { useAuth, AuthContext } from './utils/useAuth';
import { ToastContext } from './providers/Toast';
import { ModalContext } from './providers/Modal';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import LandingPage from './pages/LandingPage';
import './index.css';
import Dashboard from './pages/Dashboard';
import ModalPortal from './components/Modal';
import ToastPortal from './components/Toast';

function App() {
	const { user, setUser, login, logout } = useAuth();
	const [toast, setToast] = useState<Toast | null>(null);
	const [modal, setModal] = useState<Modal>({ type: 'off' });

	return (
		<AuthContext.Provider value={{ user, setUser, login, logout }}>
			<ModalContext.Provider value={{ modal, setModal }}>
				<ToastContext.Provider value={{ toast, setToast }}>
					<Routes>
						{!user && <Route path="/" element={<LandingPage />} />}
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
					<ToastPortal toast={toast} setToast={setToast} />
					<ModalPortal modal={modal} setModal={setModal} />
				</ToastContext.Provider>
			</ModalContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
