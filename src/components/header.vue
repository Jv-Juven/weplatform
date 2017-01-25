<template lang="html">
    <div class="header">
        <mu-appbar title="Title">
			<mu-icon-button icon='menu' slot="left" />
			<mu-icon-button icon='expand_more' slot="right" />
		</mu-appbar>
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

<style lang="less" scoped>
    .header {
        position: relative;
        top: 0px;
        left: 0px;

        width: 100%;
        overflow: hidden;
    }
</style>
