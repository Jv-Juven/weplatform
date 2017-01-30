<template lang="html">
    <div class="tab-body">
        <div class="input-pannel">
            <!-- 物品名 -->
            <mu-text-field class="input" labelFloat label="物品名" hintText="物品名" fullWidth />
            <!-- 物品简介 -->
            <mu-text-field class="input" labelFloat label="物品简介" hintText="物品简介" multiLine :rows="3" :rowsMax="6" fullWidth/><br/>
            <!-- 价格 -->
            <mu-text-field class="input" labelFloat label="价格" hintText="价格" fullWidth />
            <!-- 昵称 -->
            <mu-text-field class="input" labelFloat label="昵称" hintText="昵称" fullWidth />
            <!-- 联系方式 -->
            <mu-text-field class="input" labelFloat label="联系方式" hintText="联系方式" fullWidth /> <!-- 要改为多选框 -->
            <!-- QQ -->
            <mu-text-field class="input" labelFloat label="QQ" hintText="QQ" fullWidth />
            <!-- 微信 -->
            <mu-text-field class="input" labelFloat label="微信" hintText="微信" fullWidth />
            <!-- 卖家补充 -->
            <mu-text-field class="input" labelFloat label="卖家补充" hintText="卖家补充" multiLine :rows="3" :rowsMax="6" fullWidth/><br/>
            <!-- 图片上传 -->
            <!-- 页面信息 -->
            <mu-content-block>
                我们将会通过短信通知您物品编号以及期数，请在...
            </mu-content-block>
        </div>
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
    .input-pannel {
        margin-top: 30px;
    }
    .input {
        padding: 0 20px;
    }
</style>
