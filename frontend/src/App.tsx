import './App.css';
import { useAuth, AuthContext } from './utils/useAuth';
import { Route, Routes } from 'react-router-dom';

function App() {
	const { user, login, logout, isAuthenticated } = useAuth();

	return (
		<AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				{user && (
					<>
						<Route path="/" element={<Home />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="*" element={<h1>404</h1>} />
					</>
				)}
			</Routes>
		</AuthContext.Provider>
	);
}

export default App;
