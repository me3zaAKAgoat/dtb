import { calcTotal } from '../utils/taskUtil';
import { deleteCycle } from '../services/cycle';
import { useContext } from 'react';
import { AuthContext } from '../utils/useAuth';

function HUD({
	tasks,
	cycleId,
	setCycleId,
}: {
	tasks: Task[];
	cycleId: string;
	setCycleId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
	const { user } = useContext(AuthContext)!;

	const handleDelete = async () => {
		try {
			await deleteCycle(user?.token!, cycleId);
			setCycleId(null);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="w-[400px] bg-secondary h-[80%] border border-tertiary rounded p-2 px-4 flex items-center justify-between">
			<h1 className="flex justify-center items-center font-bold">
				Completion:
			</h1>
			<div className="completion-circle h-14">
				<div className="outer">
					<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
						<circle
							cx="50%"
							cy="50%"
							r="42.5%"
							style={{
								strokeDasharray: 2 * 42.5 * 3.14,
								strokeDashoffset:
									2 * 42.5 * 3.14 * (1 - calcTotal(tasks) / 100),
							}}
						/>
					</svg>
					<div className="inner">{calcTotal(tasks)}%</div>
				</div>
			</div>
			<button className="btn w-20 text-base rounded-[10px] border-tertiary bg-primary-content text-primary hover:bg-primary hover:text-primary-content">
				Conclude
			</button>
			<button
				onClick={handleDelete}
				className="btn w-20 text-base rounded-[10px] border-tertiary bg-error text-primary hover:bg-primary hover:text-primary-content "
			>
				Delete
			</button>
		</div>
	);
}

export default HUD;
