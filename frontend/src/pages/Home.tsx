import Board from '../components/Board';
import Navbar from '../components/Navbar';

function Home() {
	return (
		<div className="base-page flex items-center justify-stretch">
			<Navbar />
			<Board cycleId={null} />
		</div>
	);
}

export default Home;
