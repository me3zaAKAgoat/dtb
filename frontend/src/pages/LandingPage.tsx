import { Link } from 'react-router-dom';

function LandingPage() {
	return (
		<div className="flex flex-col justify-between landing-page base-page px-10 md:px-48">
			<header className="pt-10 flex justify-between">
				<details className="dropdown md:hidden">
					<summary className="m-1 btn border border-quaternary rounded-none">
						More Links
					</summary>
					<ul className="p-2 shadow menu dropdown-content z-[1] bg-primary border border-quaternary w-52">
						<li>
							<a
								className="text-stone-500 hover:text-primary-content"
								href="https://www.github.com/me3zaAKAgoat"
							>
								Contact
							</a>
						</li>
						<li>
							<a
								className="text-stone-500 hover:text-primary-content"
								href="https://www.me3za.tech/posts/dtb/"
							>
								About
							</a>
						</li>
					</ul>
				</details>
				<ul className="hidden items-end text-2xl gap-4 font-semibold md:flex">
					<li>
						<a className="flex gap-2 text-white mr-5" href="/">
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
					className="flex items-center justify-center px-4 text-lg font-bold rounded-md w-28 h-10 focus:outline focus:outline-2 focus:outline-accent bg-transparent border-2 border-accent text-white hover:bg-accent hover:text-white"
				>
					Log In
				</Link>
			</header>
			<main className="h-full flex mt-36 justify-between">
				<div className="flex flex-col items-start gap-8">
					<h1 className="font-bold text-5xl text-white">
						Your Personal Productivity Partner
					</h1>
					<p className="">
						DTB offers a sanctuary for those seeking a calmer, more organized
						approach to their daily tasks. Bid farewell to chaos and welcome
						simplicity with our user-friendly app. Effortlessly manage your
						to-dos, track progress visually, and revel in the satisfaction of
						completing each task, no matter how small. Embrace a more relaxed
						yet effective way of boosting productivity with DTB. Try it now and
						unlock the serenity of streamlined task management.
					</p>
					<Link
						className="flex items-center justify-center text-xl h-10 w-28 font-bold rounded-md border-accent focus:outline focus:outline-2 focus:outline-primary-content bg-accent text-white hover:bg-transparent hover:bg-white hover:text-accent"
						to="/register"
					>
						Sign Up
					</Link>
				</div>
				<img
					className="h-80 -mr-24"
					src="/hud.png"
					alt="heads up display showcase image"
				/>
			</main>
			<footer className="pb-10 flex justify-center text-xl font-semibold">
				Digital Tasks Board © 2024
			</footer>
		</div>
	);
}

export default LandingPage;
