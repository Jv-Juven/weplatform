<template lang="html">
	<div class="greeting">
		Hello, VUE2.0!@
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	computed: {},
	mounted() {},
	methods: {},
	components: {}
}
</script>

<style lang="less">
	@h: 20px;
	.greeting {
		position: relative;
		top: 30px;
		left: 100px;

		font-size: @h;
		border-radius: 10px;
		transform: rotate(20deg);

		width: 300px;
		height: 300px;
		background: rgba(0, 0, 0, .4);
	}
</style>
