import Board from '../components/Board';
import Navbar from '../components/Navbar';

function Home() {
	return (
		<div className="base-page flex justify-start">
			<Navbar />
			<Board cycleId={null} />
		</div>
	);
}

export default Home;
