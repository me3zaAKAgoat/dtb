import { useContext, useEffect, useState } from 'react';
import Board from '../components/Board';
import Navbar from '../components/Navbar';
import { getCurrentCycle } from '../services/cycle';
import { ModalContext } from '../providers/Modal';
import { AuthContext } from '../utils/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';

function NoBoard({
	setCycleId,
}: {
	setCycleId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
	const { modal, setModal } = useContext(ModalContext);
	const navigate = useNavigate();

	return (
		<div className="board h-full w-full flex flex-col justify-center items-center">
			<div className="flex flex-col">
				<div className="flex m-5">
					<svg
						className="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
					<button
						className="hover:underline ml-2 font-semibold"
						onClick={() => {
							setModal({ type: 'CycleStartForm', extraData: { setCycleId } });
						}}
					>
						Create a new cycle
					</button>
				</div>
				<div className="flex m-5">
					<svg
						className="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"
						/>
					</svg>
					<button className="hover:underline ml-2 font-semibold">
						Load an archived cycle
					</button>
				</div>
				<div className="flex m-5">
					<svg
						className="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 4v15c0 .6.4 1 1 1h15M8 16l2.5-5.5 3 3L17.3 7 20 9.7"
						/>
					</svg>
					<button
						className="hover:underline ml-2 font-semibold"
						onClick={() => {
							navigate('/dashboard');
						}}
					>
						Go to dashboard
					</button>
				</div>
			</div>
		</div>
	);
}

function Home() {
	const [cycleId, setCycleId] = useState<string | null>(null);
	const { user } = useContext(AuthContext)!;
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * do a fetch for the current cycle (meaning last cycle that if its not archived)
	 * depending on that load the board or the no board component
	 */

	useEffect(() => {
		const fetchCycle = async () => {
			try {
				const res = await getCurrentCycle(user?.token!);
				if (res.id) {
					setCycleId(res.id);
				}
			} catch (err: any) {}
			setIsLoading(false);
		};
		fetchCycle();
	}, []);
	return (
		<div className="base-page flex justify-start">
			<Navbar />
			{isLoading ? (
				<div className="h-full w-full flex justify-center items-center">
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			) : cycleId ? (
				<Board cycleId={cycleId} setCycleId={setCycleId} />
			) : (
				<NoBoard setCycleId={setCycleId} />
			)}
		</div>
	);
}

export default Home;
