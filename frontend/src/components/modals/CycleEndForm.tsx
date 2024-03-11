import { useContext, useState } from 'react';
import { ToastContext } from '../../providers/Toast';
import { AuthContext } from '../../utils/useAuth';
import { concludeCycle } from '../../services/cycle';
import { ModalContext } from '../../providers/Modal';

function CycleEndFOrm({
	cycleId,
	setCycleId,
}: {
	cycleId: string;
	setCycleId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
	const [emotionalState, setEmotionalState] = useState(null);
	const [endNote, setEndNote] = useState('');
	const { setToast } = useContext(ToastContext);
	const { user } = useContext(AuthContext)!;
	const { setModal } = useContext(ModalContext);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!emotionalState) {
			setToast({
				type: 'error',
				message: 'Setting an emotional state is required',
			});
			return;
		}
		try {
			await concludeCycle(user!.token!, cycleId, endNote, emotionalState);
			setToast({
				type: 'success',
				message: 'Cycle archived successfully',
			});
			setCycleId(null);
			setModal({
				type: 'off',
			});
		} catch (err) {
			setToast({
				type: 'error',
				message: 'Failed to archive cycle',
			});
			console.error(err);
		}
	};

	return (
		<div>
			<div className="flex flex-col justify-center text-primary-content">
				<h1 className="bg-accent mb-5 mt-2 flex items-center justify-center font-semibold text-xl w-full">
					Cycle Conclusion
				</h1>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center w-full py-4"
				>
					<div className="flex flex-col w-full">
						<div className="flex flex-col w-full mb-4">
							<legend className="font-semibold">
								Journal your experience during this cycle:
							</legend>
							<textarea
								value={endNote}
								onChange={(e) => setEndNote(e.target.value)}
								className="min-h-20 p-2 transition-all focus:border-primary-content bg-secondary my-2 border border-tertiary rounded-[4px] input input-primary"
							></textarea>
						</div>
						<fieldset className="py-4">
							<legend className="font-semibold">
								Rate your emotional state during this cycle:
							</legend>
							<div className="flex justify-around">
								<div className="flex">
									<input
										className="radio mr-4"
										name="emotionalState"
										type="radio"
										id="happy"
										value="happy"
										onChange={(e) => {
											setEmotionalState(e.target.value);
										}}
									/>
									<label htmlFor="happy">
										<svg
											className="fill-primary-content"
											xmlns="http://www.w3.org/2000/svg"
											width="27"
											height="27"
											viewBox="0 0 512 512"
										>
											<path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
										</svg>
									</label>
								</div>
								<div className="flex">
									<input
										className="radio mr-4"
										name="emotionalState"
										type="radio"
										id="neutral"
										value="neutral"
										onChange={(e) => {
											setEmotionalState(e.target.value);
										}}
									/>
									<label htmlFor="neutral">
										<svg
											className="fill-primary-content"
											xmlns="http://www.w3.org/2000/svg"
											width="27"
											height="27"
											viewBox="0 0 512 512"
										>
											<path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm192-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM184 328c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z" />
										</svg>
									</label>
								</div>
								<div className="flex">
									<input
										className="radio mr-4"
										name="emotionalState"
										type="radio"
										id="sad"
										value="sad"
										onChange={(e) => {
											setEmotionalState(e.target.value);
										}}
									/>
									<label htmlFor="sad">
										<svg
											className="fill-primary-content"
											xmlns="http://www.w3.org/2000/svg"
											width="27"
											height="27"
											viewBox="0 0 512 512"
										>
											<path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM182.4 382.5c-12.4 5.2-26.5-4.1-21.1-16.4c16-36.6 52.4-62.1 94.8-62.1s78.8 25.6 94.8 62.1c5.4 12.3-8.7 21.6-21.1 16.4c-22.4-9.5-47.4-14.8-73.7-14.8s-51.3 5.3-73.7 14.8zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
										</svg>
									</label>
								</div>
							</div>
						</fieldset>
					</div>
					<button className="main-button">Conclude</button>
				</form>
			</div>
		</div>
	);
}

export default CycleEndFOrm;
