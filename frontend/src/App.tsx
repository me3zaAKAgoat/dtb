import { useEffect, useState } from 'react';
import { useAuth, AuthContext } from './utils/useAuth';
import { AlertContext } from './providers/Alert';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import './index.css';

function App() {
	const { user, login, logout } = useAuth();
	const [alert, setAlert] = useState<Alert | null>(null);

	useEffect(() => {
		const alertTimeout = setTimeout(() => {
			setAlert(null);
		}, 3000);

		return () => clearTimeout(alertTimeout);
	}, [alert]);

	return (
		<AlertContext.Provider value={{ alert, setAlert }}>
			<AuthContext.Provider value={{ user, login, logout }}>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					{user && (
						<>
							<Route path="/" element={<Home />} />
							<Route path="/home" element={<Home />} />
							<Route path="*" element={<PageNotFound />} />
						</>
					)}
				</Routes>
			</AuthContext.Provider>
		</AlertContext.Provider>
	);
}

export default App;
