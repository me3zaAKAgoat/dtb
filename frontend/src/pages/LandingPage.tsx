import { Link } from 'react-router-dom';

function LandingPage() {
	return (
		<div className="flex flex-col justify-between landing-page base-page px-10 md:px-[10%]">
			<header className="pt-10 flex justify-between">
				<details className=" dropdown md:hidden">
					<summary className="rounded-md btn focus:outline focus:outline-2 focus:outline-accent bg-transparent border-2 border-accent text-primary-content hover:bg-accent hover:text-primary-content">
						More Links
					</summary>
					<ul className="p-2 shadow menu dropdown-content z-[1] rounded-md bg-primary border-2 border-accent w-52">
						<li>
							<a
								className="hover:text-primary-content"
								href="https://www.github.com/me3zaAKAgoat"
							>
								Contact
							</a>
						</li>
						<li>
							<a
								className="hover:text-primary-content"
								href="https://www.me3za.tech/posts/dtb/"
							>
								About
							</a>
						</li>
					</ul>
				</details>
				<ul className="hidden items-end text-2xl gap-4 font-semibold md:flex">
					<li>
						<a className="flex gap-2 text-primary-content" href="/">
							<img src="/dtb.svg" alt="logo" className="h-8" />
							Dtboard
						</a>
					</li>
					<li>
						<a
							className="text-stone-500"
							href="https://www.github.com/me3zaAKAgoat"
						>
							Contact
						</a>
					</li>
					<li>
						<a
							className="text-stone-500"
							href="https://www.me3za.tech/posts/dtb/"
						>
							About
						</a>
					</li>
				</ul>
				<Link
					to="/login"
					className="flex items-center justify-center px-4 text-lg font-bold rounded-md w-24 h-10 focus:outline focus:outline-2 focus:outline-accent bg-transparent border-2 border-accent text-primary-content hover:bg-accent hover:text-primary-content"
				>
					Log In
				</Link>
			</header>
			<main className="h-full items-start flex flex-col md:flex-row mt-12 md:mt-36 gap-12 md:gap-0 md:justify-between">
				<div className="flex flex-col items-start gap-8">
					<h1 className="font-bold text-5xl text-primary-content">
						Your Personal Productivity Partner.
					</h1>
					<p className="text-stone-400">
					The productivity app designed for <span className='underline font-bold'>stress-free</span> task management. Organize tasks effortlessly, monitor well-being insights, and track <span className='underline font-bold'>progress</span> seamlessly. Stay focused and <span className='underline font-bold'>motivated</span> with priority tasks and percentage completion tracking. Simplify productivity and find peace of mind, whether at work or school.
					</p>
					<Link
						className="flex items-center justify-center text-xl h-12 w-28 font-bold rounded-md border-accent focus:outline focus:outline-2 focus:outline-primary-content bg-accent text-primary-content hover:bg-transparent hover:bg-primary-content hover:text-accent"
						to="/register"
					>
						Sign Up
					</Link>
				</div>
				<img
					className="w-[700px] object-contain"
					src="/hud.png"
					alt="heads up display showcase image"
				/>
			</main>
			<footer className="pb-10 flex justify-center text-stone-400 text-sm font-semibold">
				© 2024 Me3za. All rights reserved
			</footer>
		</div>
	);
}

export default LandingPage;
