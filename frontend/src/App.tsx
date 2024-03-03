import { useAuth, AuthContext } from './utils/useAuth';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
// import Home from './pages/Home';
// import Settings from './pages/Settings';
import './index.css';
import { useEffect, useState } from 'react';

interface Alert {
	type: 'error' | 'success';
	message: string;
}

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
		<AuthContext.Provider value={{ user, login, logout }}>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				{user && (
					<>
						{/* <Route path="/" element={<Home />} /> */}
						{/* <Route path="/settings" element={<Settings />} /> */}
						<Route
							path="*"
							element={
								<div className="base-page">
									<h1 className="font-bold">404</h1>
								</div>
							}
						/>
					</>
				)}
			</Routes>
		</AuthContext.Provider>
	);
}

export default App;
