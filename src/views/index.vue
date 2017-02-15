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
	// vuex
	import { mapActions } from "vuex"

	// 导入相关工具
	import Validator from "assets/js/validator"
	export default {
		data() {
			return {}
		},
		computed: {},
		mounted() {
			this.setGoodsName("篮球");

			let formValidator = new Validator();
			formValidator.importStrategies({
				isNumber: function (value) {
					return !isNaN(value);
				}
			});
			formValidator.valid("faf", "isNumber", "不是数字");
			formValidator.valid("faf", "isNumber", "肯定不是数字");
			console.warn(formValidator.errors);
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
