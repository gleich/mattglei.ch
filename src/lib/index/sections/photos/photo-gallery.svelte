<script lang="ts">
	import { Image } from '@gleich/ui';

	interface Photo {
		src: string;
		alt: string;
		width: number;
		height: number;
		placeholder: string;
	}

	// prettier-ignore
	const photoData: Photo[] = [{src:'/photos/ritracing.webp',alt:'ritracing',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAIAAACepSOSAAAAeElEQVR4nCTJ3Q0CMRADYa93c0EgmqEIeqD/Ho6fJDY6kEbz8tXjfjMw5TH1HnqOtX+0j/WaLmazkbDKCbfwFlKaQm3bxYAcKVDHS3ESpqN6vwIQYoEN7OA8CuGwsxEOKrgixVyRK2iwqnX8zEyx9H/QwW8AAAD//57KQCOMf/3XAAAAAElFTkSuQmCC',width:1919,height:1280},{src:'/photos/a4.webp',alt:'a4',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAIAAACe+MrKAAAAVElEQVR4nFTLQRKAMAgDQJIm5QMevPj/bzoUdeqhHbIQHdcZCEQAQdQvkrHlIsslD9WgdC7pvGjOXOuPoOncc5Htv0Aa6h4JoJ7I8RbZV3cAAAD//4MFAUulHo1UAAAAAElFTkSuQmCC',width:1237,height:1855},{src:'/photos/quinn.webp',alt:'quinn',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAQCAIAAABP3xIpAAABDElEQVR4nGyQj2rzMAzEFUmnf3acNN+3FUbHYO//kMNNC4NVmMM2P98dVno9B3mjzcjkJcFEQslivIFfEs0Pvw60APDHw0k+r33sURnuEPlFJNGN6HI7+t6qZ0QAqiL6QQSiRrQu1L+2vvdaMzM9fGaI6PdsRdap3lH7qFHVMjLd7UG8/SO2SeQ4cq1pUBmzxJO4/CdWQm7Rq3pmiyqPdHMHdBJj5UXCokdFlldalkW4x9Oj1WA2xHyXgUqrsEh7pKhoeS4CcwtHOuqu6ZghNmPUzVgUBoeGaZxq6qZm9x4GZVZADGI61VUc4tDHj6kwM0MEwvMsrMoqDGU89+cszCy83Befl6f+BAAA///UMAtRXSmBwAAAAABJRU5ErkJggg==',width:2248,height:3372},{src:'/photos/mtb2.webp',alt:'mtb2',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAIAAAD3rtNaAAAAYklEQVR4nJTOMQoEIQyF4bAEGwsbK2uP4P3vpSHvLWvYwYFp5qsev4X5yJM3VccYJN3dzNZac04z0947NwDujk1ba/wDEENrrSRF5FZLKZEuv99yzmeNrSmluOZ8+AYAAP//bdVnWzdG17IAAAAASUVORK5CYII=',width:1440,height:2160},{src:'/photos/eye.webp',alt:'eye',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAIAAACe+MrKAAAAmklEQVR4nBTIS07DMBAAUH9mxoCDwUHiApyCWyHE/ThM1UW7qJSqVRx7PlW2D37/fkTHfV0ut+Np+T9cXUBEAESkJ0wZPz/IwfRaRAaij75F+8rhDG+1qnBv+Iw6xdHoG+o8m/Bo1MlvoCMFeK87yUoDHAdmcFBK2QmDeBbr4hVecjZmDaayCa+mHYjIYjBNmpJSMkqPAAAA///60E8v+SVLggAAAABJRU5ErkJggg==',width:1263,height:1894},{src:'/photos/spider.webp',alt:'spider',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAIAAABRDCAKAAAAdUlEQVR4nCyOUQoDIRBD81KP0L9C73/I7qRkdmXAiM/4zvvzRYBsbL/gDgYMkiVF0W5KnrwHpflkBhTRiRdfELHgSa4Eo9jpKiRuVChn5kKampTMdm8HbPHJ/KLa9f0k7O8dolbXo13j8FysCImgpv8AAAD//2K7VV9L9wKtAAAAAElFTkSuQmCC',width:2352,height:1568},{src:'/photos/up.webp',alt:'up',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAIAAAA88gD/AAAAVUlEQVR4nFyOAQ6AIAwDW7L/+AQ/4/+fYA1gl2qzlI2UY3WdBzFFF4Sx/K/qTj4IVAcZr+re8xdU0hyJ9cNqlATZmQSFv4ThlBg7yMUdytvWEwAA//+oDiDsxiL/wgAAAABJRU5ErkJggg==',width:1520,height:2278},{src:'/photos/cadillac.webp',alt:'cadillac',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAAX0lEQVR4nBzLPQrCUBAA4Zl9u/vufxKrnEgEBX/AToIakmaqb/K0LMqQHnRYgwpGkOv6Ef+BXwwcEvwk36+nku68g47jkLzfLkJJywxa63D5uJ6VggnTvS0JWwAAAP//4toREWzQwwEAAAAASUVORK5CYII=',width:1609,height:1074},{src:'/photos/ladybug.webp',alt:'ladybug',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAIAAABSnclZAAAAyklEQVR4nFSRAW7EMAgE15Gf0j/1K335VQ7sbgXkTmqECNKYCTj7++fLtui8GSfPb5zXfV7nvM59dAGAAXve83yKy7KNDkNTFJ+81Vi0iKorYAFejfODXZjFurVxZolEM6U02QIua8FrM+QHV5QjW6AFXTvvxrJSDDNqCHNhuqOxCztDSrQD7b92HALv0aY74XzL49QSVp9IKayAuNqPp7tnKb+zM1HfFnq0ssOzNCfjWSxDmFtUH6IxTHXHm+nnJ+h/eAH4CwAA///rDjF1UkBD7AAAAABJRU5ErkJggg==',width:2069,height:3100},{src:'/photos/rocky8.webp',alt:'rocky8',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAAQklEQVR4nGI5dOgQAxj8RwUQEZZfv37BOcgMCJvlzZs3ECGsBrDcv38fUwIOWM6fPw/n/Pv3D0JCAMQAfAAQAAD//7/UdaIE+d2uAAAAAElFTkSuQmCC',width:2047,height:1365},{src:'/photos/clarkson.webp',alt:'clarkson',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAGCAIAAABrW6giAAAAU0lEQVR4nATASw6EIAwA0AINMxtCdOdtvJ7eViJQ6AcfXvf5+6e8HSnvXhVUQcREFtIAA8OmPjCWBpFNF08e+FTAYDS4voSlQ3CLOkc3vwAAAP//D1QsDRzRVWsAAAAASUVORK5CYII=',width:898,height:1347},{src:'/photos/motorcycle.webp',alt:'motorcycle',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAIAAAAYbLhkAAAAhUlEQVR4nCTKy03DQBhF4fFwbSXYAZFqKIIV/fcBnv8+0ODd0aeDr+9PJ0We4/wZ5+8YWIHYS1rgK/B2e01MqrAOrMXCcz+SSCoWqyji+XhcJBZJi/g4JtmTxLKJ933/J2ouNa/jfp9iWTQxr9u2tRZLVvfLYndsQFrSF/eoJ2p/AQAA//8PxIC+Qhzu3QAAAABJRU5ErkJggg==',width:1355,height:2032},{src:'/photos/mtb1.webp',alt:'mtb1',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAIAAAC+k6JsAAAAX0lEQVR4nCzMSw7CQAwD0PgjTs5hWHA5BFRtmUlQRn0LW97Yz8edpGT71lmZWUF0A+l5DgAxq2aV0r9tBzBlaZD28d4QoESalI/XFwGwAfS5duDi8dlj6deIfwAAAP//sGUmvJIlHbAAAAAASUVORK5CYII=',width:1136,height:1704},{src:'/photos/nyc.webp',alt:'nyc',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAIAAACe+MrKAAAAXElEQVR4nESNCwoDQQxCfTZXa6H3v83Ox7IzHfZBIIom9f58k4wxWmvX1XrvRg8goRJrORjXcnSk8SxDpLAkftmFUUS8Se6iVyis4LbuW95Fe84U/P9z5hcAAP///uAeLnkazvUAAAAASUVORK5CYII=',width:1259,height:1888},{src:'/photos/hayhay.webp',alt:'hayhay',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAIAAABRDCAKAAAAYUlEQVR4nDyOiREAIQgDNw4F2n8x5IbnZHxCWJS49wJSbeloo0S7HDATBvvPWrmSmMugZZPs7lkmXISx0GBqrZLUOUS/Yl7BNUWTKJzZ7mBaLT0jtntHsV9lPjFfAAAA//8d6iwZYV3BsAAAAABJRU5ErkJggg==',width:2224,height:1483},{src:'/photos/pete.webp',alt:'pete',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAIAAACepSOSAAAAg0lEQVR4nDTMTarCQBwD8P9Hkpn2Ud5CXHhLLyB4UUFwp+7qaiyMtGjILvyC8+no4UBKLIWlSAKJzMSyvN3DrEdYpmd6hLlb7x3z/Iqfa02tUeLXPR93dwdRpPVwLYltu10vkUmy1FrqGm0wkb43g9uws79/G6fDME61jpQS+AQAAP//NyYXQ7fk0j8AAAAASUVORK5CYII=',width:1951,height:1301},{src:'/photos/eggBeach.webp',alt:'eggBeach',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAIAAABPxRC5AAAAUUlEQVR4nByKQQ4CMQzEpmneyR3xf4ntJDEqlm92vt6fEJtJ9aYTQPwZiazqEKKXatFpe91eunZ+n7M10MKi8jlnM1CBF77/iBgXJ/AvAAD//ybOSaX/weDoAAAAAElFTkSuQmCC',width:1020,height:1529},{src:'/photos/fox.webp',alt:'fox',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAIAAABPxRC5AAAAWUlEQVR4nEzMsQqDMByE8bv7X5qSBppMoUvddBd8/1cTFcRv/A2fcffNqM1IwNuoDaW2nL2sm6QU8XKKCM//CaSkkEj6NwZI4kAS7r3z+p3qTyl4tAcAAP//o6sCgpCY1ZoAAAAASUVORK5CYII=',width:1065,height:1597},{src:'/photos/flower.webp',alt:'flower',placeholder:'iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAIAAAAd2sgZAAABAUlEQVR4nJSUXRLCIAyEwcnJfPUA3v8iXUc7tkCyyZIHHX6yH0tC7f16Nh9AMNka5p95Ccs+H49NUqwFOpjCmHSUDoJBiTmTLVW/xm4iYsUnGMKIDFMX2NyiobxGpPWK0kFGNuoUWER/FXiM1Vndv7NJ3rhRzY66G7NODxqU5wk183mrfZW3D6Py9VwG0w2wjCWqmvEmoAnJ5wpHriWT+Iu4YcSZxvjt6nLuVbNdB6U23CG+zg4m21OxrVOdUlnNELL3o/+lxHd2s3VknxNP2MYZlTv1jHbD5Jr0RQIqY4BV1hKV8UqZSp9h8QJTYQBWy3GPibrLHr+Eitpa+wQAAP//EXSkrIkgFSAAAAAASUVORK5CYII=',width:7360,height:4912},{src:'/photos/fog.webp',alt:'fog',placeholder:'iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAIAAAAd2sgZAAACG0lEQVR4nIRWAbbbIAzz2+vBdrNdYQdurL2ALckh2/pTPk0IQrJs+Pz89TsCEXdz/wPuL/oLINlmrvb+y7d2P2RnvRd7mjXzj0Kqj/fnj7WK8+7xOR+DzceeNrXFTVeggHZ/d0B0a4tC6K16ozA+pqFNVKNQH07T2tYAHJdWRlqNupilacRwxctEyGrjuONI6yf0VhD+g0QYUIk5RiOS7R31yIzllDXM8DLH+AOvmBHKaaHdGPJkTU3IDQCySaOV1LzBkNdwzbR+oRazvfwFSZZoyNSAuklOiln+h5nLuNNnzys92a47yFPJik4z63zez8p+u7+TdPNzcpx60Mr4F9h1eeoRajBjAHIXhpodrVgJq0eHQTZY5FcJTaROMVmD7mgNGyDJGKLF4DHBV8zEDK4lHoYkHnz5N6pDmjX+IuPXy9WUMaAcwnDaSQ4PQxoerR8NZgWry5OTYxmfYXOz2CJmTWBSGzNzv4ctuwiNeBSMZ7cWcRaRKlcGppLvBlHMarq7LULG75AR6dW5krplhCrxi/vzndz2iLJN1s+h4Vo/3TgMyaKlwtGbtSXc8MioWzgqVufZ5fFSdXzP64c7BsUXQ073eyGG2HGT9I6UPNk87tt2M7YYggnu2DzbIC8zrqvtYwknGb1c2bHBzyBdjV2Q9C2tY5laBLpoPTY2yejnFujYo80snqeMjqQJpf4+NKQdEWSQPwEAAP//26sUQhrgqGkAAAAASUVORK5CYII=',width:7360,height:4912},{src:'/photos/boat.webp',alt:'boat',placeholder:'iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAIAAAAd2sgZAAACD0lEQVR4nIRVbXbcIAzUYLzrpH392cP0/vdSn0ESI8DZzT4iO0aj+TCp/2TzQRGBSBG09S5iRVrvIp4Uv4xavG6fqnZ/PNFh0lqWO8gFf4WKCUyu+5dKmkiLXSox+ICxICVa6GC/7FL7E7zh4atNKw3Fpi2T3KZ1B/tmr5yieC9Jrdtfi+CQWHtrmL2A2QgBDe7M9OuSsLMxV9+j6EVrZMPC+3oBjFQgIkHZAECe/XVONgh63X60zeirYDTlQgjSuzuEc+jMrj/hFcw826SGJ6C+GhIhkm5DWI+xEo7JeP0Omur7dBoQUAlaIgsYryEb6WdwVd7fSjcakqGQmFbp3QGDfYJnJtipKFXfXwzO5NAIyYK0sklusWGZXNXXlZEaFWeGyA4orlTHCkrgMGBg3ZdVX2+RrG2YaswQZicvkc8JpsgF8ax6vjOtJmAbP2ZWn3rN2yYgWT5Wssr5shwO1hGQRaIHAAFSGJAbeeOq58kKKsHEnD9jrALS48m4qvVcPYtYJtWf4kfapv7Te32DHZXjAJcUe/9l92Itpwbo3yedIQ0MA6N3VXolF0t2b/FTFLOSVY5DiI1mY5mTbtKIRGRHjvNYtRzRU10yjWHoJcun1O48TG5Nh0lnVkqvzDDMydV19k0IUwRnEIlTHw9j0DYl157ETHrt+rRTv5/inkOsz82B/BjOrCu58D8AAP//baNWcERavnAAAAAASUVORK5CYII=',width:7360,height:4912},{src:'/photos/pete2.webp',alt:'pete2',placeholder:'iVBORw0KGgoAAAANSUhEUgAAACgAAAAbCAIAAACBclo5AAADG0lEQVR4nIxWbZLrKAzsVjzv915ia+9/wKAtfSHheFLP42IwAbpbEkLXP//+R+JFXOQl/BH+Ef685OfFP9bKz+Wtv5f3r/1KdPgSeb3kJdYRaymkdykC+iMkABL2BwjiUfzV8zRNv+2gvy0W+9Zv+94HdbzxfXT0xkVrsirmPBkz5u8nmuoTK81Fk4x+MLnRz/kqRUcHivZgEq7+/m2r2cyKmxahoV+Dk2opUMjeOgnr3kh7bNJNAts0qiV7E4umBnSTR30r9Or9rGEtYsOXC/Y+e9w/mApzLcsoVIDeZZIkqP5n+13FnGWkhNfcC8NYuHm0sG1mkPApTFbc81k+zg7RwP7Z3mBrmlrnUDHb/RrZHg250AG5sS4stVM9Qr9cxcOkH3YeHHifYlsxOssCGDiwrXNl/DCP9D4WY6OGuQu+WWSZB9WgnEpiUj9OopqpV0YSVrFZPpkKcdFLVQrd96p+SbVOiV5YArbuMyeYHW0q0sfhilC8RmwZpE8zvJIbePYSn6K3dZziWhDBAiXOElOjA6/lgV7xG4qlHJlyg8SThYPH0qLri5aGDGt8+8W4HkJ0ArtXSexIN2zfzpECG0/Ya1F2YC1oojBdE6L7IkpUagC/NcHC4hTjbg4OSNeymkS4X/fbzj5zzDa1yxWHCNQweAUXNcEZER76LFQCW816T+G8sE3t87wdDtYK3AZx7DA12um06Q4TqN9MPVybpo5EsIaDl5SpI3mWcS+8/RgJO32FPSOSA/UjxLDD+6up1cW2qTFN/e5UqhVZkGW0J+rELgdHRj6l91mykKjIejL129bk7/Rcs2wltjLFL5nyZm12i8w2kF8rovRxXr5L6hCz3JVn+jFT1POYq7sqGIm6r4oytdnZ4tJcu/zYxFu60WXJvEuOqwnJAHkzdprWj0ti5urIWQs4bwXM/wU7+qyRfS0moI4CYBQbjFiqKnNLPKotdPkz6sSuhBJ/kzkp3YsXVElpW1aVOevEs/I6yubTx33J9YL9v4MMzRO7NpORRmcBiVvZiXu5igN10tBRdNcUbak58n8AAAD///ALgExgFDEAAAAAAElFTkSuQmCC',width:8112,height:5408},{src:'/photos/bug.webp',alt:'bug',placeholder:'iVBORw0KGgoAAAANSUhEUgAAAA0AAAAICAIAAACtROKYAAAAn0lEQVR4nEyPS07EMBAF/T7dJjDKrNhxG+5/J/R6EjRS1LHkcpXtn99vAkW21aXd3qVuV6ksiRIAeDt/i2V29lieKdqwIBKEz8dHOOLFRTlzfIyPIOHn88DKuRK7pt7cEy3TAiNcPs8DWOLFbXN8WQ+X+xHw12PfXXSg6+v4YN/d47OxltLFfuP25csTyeVqhWNkUU7xv1vGy/cXAAD//3NyBQSxZPCEAAAAAElFTkSuQmCC',width:2656,height:1773},{src:'/photos/porsche.webp',alt:'porsche',placeholder:'iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAIAAAAd2sgZAAABL0lEQVR4nJyW4XaFIAyDQXk03/+V3NnqWJakUC8/PLVX+JrUC47ruhqM+76bDEzamGbZRVprB933n6FJG2dJ+0xrbdAPURQmMUOxTRIPVTKs956ZQDVp+ZTUuhmmRVH5FLwqdBwHt03LRMdsgO7ZeA/TOAIlWfXayHGeZ5GBML21ohGZKlNkBtgicRYr2wqqXDUI8D/Yuk96fatvY2OFsUXOpdIXRHkZo2hp7/2B2Z10LcsG859gnWQbiwauqdbJbxu1Z0VZFIeaTNxj41sYrpvFyMM9xdiI5Wg/pqZ5GxPtHo1JhtlNDzHIoBUrx8LQU9iSqFKcUjn/Hlgoq09YD3uo/sFmgR+vrp8R2QtpvkGsh9mpgcisETN/0OdUxHSdD/TfoRLpMVowxlcAAAD//xrHslRmvWVVAAAAAElFTkSuQmCC',width:7202,height:4801}];

	const { count = photoData.length }: { count?: number } = $props();

	let verticalCount = $state(3);
	let photos: Photo[] = $state(photoData);
	let innerWidth = $state(0);

	function reorderPhotos(photos: Photo[], verticalCount: number): Photo[] {
		const horizontals = photos.filter((photo) => photo.width > photo.height);
		const verticals = photos.filter((photo) => photo.width <= photo.height);
		const ordered: Photo[] = [];
		let h = 0,
			v = 0;

		while (h < horizontals.length || v < verticals.length) {
			if (h < horizontals.length) {
				ordered.push(horizontals[h++]);
			}
			for (let i = 0; i < verticalCount; i++) {
				if (v < verticals.length) {
					ordered.push(verticals[v++]);
				}
			}
			if (h < horizontals.length) {
				ordered.push(horizontals[h++]);
			}
		}
		return ordered;
	}

	$effect(() => {
		if (innerWidth >= 560 && verticalCount != 3) {
			verticalCount = 3;
			photos = photoData;
		} else if (innerWidth < 560 && verticalCount != 2) {
			verticalCount = 2;
			photos = reorderPhotos(photoData, verticalCount);
		}
	});
</script>

<svelte:window bind:innerWidth />
<div class="photos">
	{#each photos.slice(0, count) as photo (photo.src)}
		<div class="photo {photo.width > photo.height ? 'horizontal' : 'vertical'}">
			<Image
				src={photo.src}
				placeholder={`data:image/png;base64,${photo.placeholder}`}
				alt={photo.alt}
				width={photo.width}
				height={photo.height}
			/>
		</div>
	{/each}
</div>

<style>
	.photos {
		display: flex;
		flex-wrap: wrap;
		gap: 3px;
	}

	.photo.horizontal {
		flex: 0 0 calc(50% - 3px);
	}

	.photo.vertical {
		flex: 0 0 calc(25% - 3px);
	}

	.photo {
		box-shadow: var(--box-shadow);
	}

	@media (max-width: 560px) {
		.photo.horizontal {
			flex-basis: calc(70% - 3px);
		}

		.photo.vertical {
			flex-basis: calc(30% - 3px);
		}
	}
</style>
