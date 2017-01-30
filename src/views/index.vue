<template lang="html">

	<div class="greeting">
		<mu-appbar title="Title">
			<mu-icon-button icon='menu' slot="left" />
			<mu-icon-button icon='expand_more' slot="right" />
		</mu-appbar>
		Hello, VUE2.0!@
	</div>
</template>

<script>
import { mapActions } from "vuex"
	export default {
		data() {
			return {}
		},
		computed: {},
		mounted() {
			// console.log(this.$store);
			this.setGoodsName("篮球");
			// this.$store.dispatch("setGoodsName", "篮球");
		},
		methods: {
			...mapActions([
				"setGoodsName"
			])
		},
		components: {}
	}
</script>

<style lang="less">
	@h: 20px;
	.greeting {
		position: relative;
		top: 30px;
		left: 100px;

		font-size: @h; /*px*/
		border-radius: 10px;
		transform: rotate(20deg);

		width: 300px; /*no*/
		height: 300px;
		background: rgba(0, 0, 0, .4);
	}
</style>
