<script>
	import Logo from '$lib/logo.svelte';
	import Description from '$lib/nav/description.svelte';
	import Socials from '$lib/nav/socials.svelte';
	import Resume from '$lib/resume.svelte';
</script>

<section>
	<div class="container">
		<div class="title">
			<div class="title-text">
				<h1>Matt Gleich</h1>
				<p class="description">
					<Description />
				</p>
			</div>
			<div class="logo">
				<Logo />
			</div>
		</div>
		<div class="socials">
			<Socials />
		</div>
	</div>

	<p class="introduction">
		Hey! I'm Matt Gleich, a college student attending the <a href="https://rit.edu" about="_blank"
			>Rochester Institute of Technology (RIT)</a
		>. I'm in my 3rd year studying computer science there and in my free time I really enjoy cycling
		(gravel, road, and mountain bike) and photography. This summer I will be working at
		<a href="https://kcftech.com" about="_blank">KCF Technologies</a>
		as a DevOps intern. Below are a few sections featuring parts of who I am! Want to get in touch? Feel
		free to shoot me an email over at <a href="mailto:mail@mattglei.ch">mail@mattglei.ch</a>. More
		of my professional work is detailed in my <Resume />.
	</p>
</section>

<style>
	h1 {
		font-family: 'Inter';
		font-size: 64px;
		font-weight: 700;
		margin-bottom: 4px;
		line-height: 75%;
	}

	.introduction {
		margin-top: 15px;
		max-width: 1300px;
	}

	section {
		display: flex;
		flex-direction: column;
	}

	.container {
		display: flex;
		align-items: center;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo {
		width: 150px;
		height: auto;
	}

	.title-text {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.description {
		font-size: 17px;
	}

	.socials {
		display: flex;
		gap: 5px;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	@media (max-width: 590px) {
		h1 {
			font-size: min(15vw, 60px);
			margin-top: 10px;
		}

		.title {
			flex-direction: column-reverse;
		}

		.logo {
			width: 60vw;
			max-width: 250px;
			height: auto;
		}

		.title-text {
			align-items: center;
		}

		.description {
			font-size: 20px;
		}

		.container {
			flex-direction: column;
		}

		.socials {
			margin-top: 20px;
			gap: 25px;
			flex-direction: row;
		}
	}
</style>
