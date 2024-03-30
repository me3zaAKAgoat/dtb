import { Link } from 'react-router-dom';
import Icon from '../assets/dtb';

function LandingPage() {
	return (
		<div className="flex flex-col justify-between landing-page h-screen w-screen px-10 md:px-[10%]">
			<header className="pt-10 flex justify-between">
				<details className=" dropdown md:hidden">
					<summary className="rounded-md btn bg-transparent border-2 border-accent text-primary-content hover:border-accent hover:bg-accent hover:text-primary-content">
						More Links
					</summary>
					<ul className="p-2 shadow menu dropdown-content z-[1] rounded-md bg-primary border-2 border-accent w-52">
						<li>
							<a
								className="hover:text-primary-content"
								href="https://www.github.com/me3zaAKAgoat"
								target="_blank"
							>
								Contact
							</a>
						</li>
						<li>
							<a
								className="hover:text-primary-content"
								href="https://www.me3za.tech/posts/dtb/"
								target="_blank"
							>
								About
							</a>
						</li>
					</ul>
				</details>
				<ul className="hidden items-end text-xl gap-4 font-semibold md:flex">
					<li>
						<a
							className="svg-icon mr-2 text-2xl flex items-end gap-2 text-primary-content hover:text-accent transition-all"
							href="/"
						>
							<Icon className="fill-primary-content h-7" />
							Dtboard
						</a>
					</li>
					<li>
						<a
							className="font-normal text-stone-500 hover:text-accent transition-all"
							href="https://www.github.com/me3zaAKAgoat"
							target="_blank"
						>
							Contact
						</a>
					</li>
					<li>
						<a
							className="font-normal text-stone-500 hover:text-accent transition-all"
							href="https://www.me3za.tech/posts/dtb/"
							target="_blank"
						>
							About
						</a>
					</li>
				</ul>
				<Link
					to="/login"
					className="bg-quaternary transition-all flex items-center justify-center px-4 text-lg font-bold rounded-md w-24 h-10 border-2 border-accent text-primary-content hover:bg-accent hover:text-primary-content"
				>
					Log In
				</Link>
			</header>
			<main className="h-full items-start flex flex-col md:flex-row mt-12 md:mt-[10%] gap-12 md:gap-0 md:justify-between">
				<section className="md:w-1/2 flex flex-col items-start gap-6">
					<h1 className="font-bold text-4xl text-primary-content">
						Offload Stress And Focus On The Essentials.
					</h1>
					<p className="text-stone-400">
						The productivity app designed for{' '}
						<span className="underline font-bold">stress-free</span> task
						management. Organize tasks effortlessly, monitor well-being
						insights, and track{' '}
						<span className="underline font-bold">progress</span> seamlessly.
						Stay focused and{' '}
						<span className="underline font-bold">motivated</span> with priority
						tasks and percentage completion tracking. Simplify productivity so
						you can focus on what matters.
					</p>
					<Link
						className="transition-all flex items-center justify-center text-xl h-12 w-28 font-bold rounded-md border-accent focus:outline focus:outline-2 focus:outline-primary-content bg-accent text-primary-content hover:bg-primary-content hover:text-accent"
						to="/register"
					>
						Sign Up
					</Link>
				</section>
				<section className="md:w-1/2 object-contain mb-14">
					<img src="/hud.png" alt="heads up display showcase image" />
				</section>
			</main>
			<footer className="pb-6 flex justify-center text-stone-400 text-sm font-normal">
				© 2024 Me3za. All rights reserved
			</footer>
		</div>
	);
}

export default LandingPage;
