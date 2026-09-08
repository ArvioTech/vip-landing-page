<!-- Default layout: the page column (design `.wrap` — 1200px, 24px gutters, 16px on phones) with header · content · footer.
     The outer div clips the full-bleed CTA band horizontally. -->
<script setup lang="ts"></script>

<template>
	<div class="overflow-x-clip">
		<div class="mx-auto w-[calc(100%-32px)] max-w-wrap tablet:w-[calc(100%-48px)]">
			<HeaderBar />
			<main>
				<slot />
			</main>
			<FooterBar />
		</div>
	</div>
</template>
