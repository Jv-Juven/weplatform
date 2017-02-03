<template lang="html">
    <div class="tab-body">
        <div class="input-pannel">
            <!-- 物品名 -->
            <mu-text-field class="input" labelFloat v-model="formData.goodsName" label="物品名" hintText="物品名" fullWidth />
            <!-- 物品简介 -->
            <mu-text-field class="input" labelFloat v-model="formData.intro" label="物品简介" hintText="物品简介" multiLine :rows="3" :rowsMax="6" fullWidth/><br/>
            <!-- 价格 -->
            <mu-text-field class="input" labelFloat v-model="formData.price" label="价格" hintText="价格" fullWidth />
            <!-- 昵称 -->
            <mu-text-field class="input" labelFloat v-model="formData.nickName" label="昵称" hintText="昵称" fullWidth />
            <!-- 联系方式 -->
            <mu-select-field class="input" v-model="formData.contactWay" label="选择联系方式" fullWidth>
                <mu-menu-item class="input" value="1" title="QQ"/>
                <mu-menu-item class="input" value="2" title="微信"/>
            </mu-select-field>

            <mu-select-field multiple label="选择多个">
    <mu-menu-item value="1" title="阴阳师"/>
    <mu-menu-item value="2" title="影之刃"/>
    <mu-menu-item value="3" title="天下HD"/>
    <mu-menu-item value="4" title="穿越火线"/>
    <mu-menu-item value="5" title="英雄联盟"/>
    <mu-menu-item value="6" title="王者荣耀"/>
  </mu-select-field>
            <mu-text-field class="input" v-model="formData.contactNum" hintText="联系号码" fullWidth />
            <!-- 手机号码 -->
            <mu-text-field class="input" labelFloat v-model="formData.phone" label="手机号码" hintText="手机号码" fullWidth />
            <!-- 卖家补充 -->
            <mu-text-field class="input" labelFloat v-model="formData.sellerRemarks" label="卖家补充" hintText="卖家补充" multiLine :rows="3" :rowsMax="6" fullWidth/><br/>
            <!-- 图片上传 -->
            <!-- 页面信息 -->
            <mu-content-block class="marks">
                我们将会通过短信通知您物品编号以及期数，请在物品出售后及时告知公众号已售物品编号及出售时间，以便我们做好登记与下架手续，能够让买家及时得到物品信息。。
            </mu-content-block>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
            formData: {
                goodsName: "", // 物品名
                intro: "", //物品简介
                price: "", // 价格
                nickName: "", // 昵称
                contactWay: "1", // 联系方式， 1: QQ, 2: Wechat
                contactNum: "", // 号码
                phone: "", // 手机号码，长号、短号
                sellerRemarks: "", // 卖家补充
            },
            contactTextArr: {
                "1": "QQ号码",
                "2": "微信号码"
            }
        }
	},
	computed: {
        contactText() {
            let contactWay = this.formData.contactWay;
            return this.contactTextArr[contactWay] || "联系号码";
        }
    },
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
    .selected-value {
        padding-left: 30px;
    }
    .marks {
        padding-bottom: 30px;
        font-size: 28px;
        text-indent: 56px; /*px*/
    }
</style>
