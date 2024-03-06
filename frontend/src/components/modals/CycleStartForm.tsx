import { useState, useContext } from 'react';
import { startCycle } from '../../services/cycle';
import { ToastContext } from '../../providers/Toast';
import moment from 'moment';
import { AuthContext } from '../../utils/useAuth';

/**
 * Cycle start form component
 * Fields: cycle end date
 * Future fields: cycle recurring tasks
 */
function CycleStartForm() {
	const [cycleEndDate, setCycleEndDate] = useState<string>('');
	const { toast, setToast } = useContext(ToastContext);
	const { user } = useContext(AuthContext)!;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (!cycleEndDate) {
				setToast({
					message: 'Please fill out all fields',
					type: 'error',
				});
				return;
			}
			await startCycle(user?.token!, cycleEndDate);
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	};

	const handleCycleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
		setCycleEndDate(newDate);
	};

	return (
		<div>
			<div className="flex justify-center text-primary-content">
				<form className="flex flex-col w-96" onSubmit={handleSubmit}>
					<div className="flex justify-center">
						<h1 className="text-2xl font-semibold">Create a new cycle</h1>
					</div>
					<div className="flex flex-col space-y-2 mt-5">
						<label className="font-semibold" htmlFor="cycleEndDate">
							Cycle end date:
						</label>
						<input
							type="date"
							name="cycleEndDate"
							id="cycleEndDate"
							value={cycleEndDate}
							onChange={handleCycleEndDateChange}
							className="border-2 font-semibold border-gray-300 rounded-md p-2"
						/>
					</div>
					<div className="text-xs mt-4">
						* a lot more customization is coming in the future :)
					</div>
					<div className="flex justify-center mt-5">
						<button className="main-button font-semibold py-2 px-4 rounded-md">
							Start cycle
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CycleStartForm;
