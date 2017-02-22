<template lang="html">
    <div class="stalls">
        <ul class="stalls-wrapper">
            <li class="stalls-item" ref="stalls-item" v-for="n in 10">
                <!-- 需要图片加载函数 -->
                <h1 class="item-title">{{goodsName}}</h1>
                <h2 class="item-subtitle">{{intro}}</h2>
                <section class="imgs-field">
                    <img class="img-box" src="http://img05.tooopen.com/images/20150202/sy_80219211654.jpg" v-for="n in 1"></img>
                </section>
                <div class="ims-btn">
                    查看更多图片
                </div>
                <div class="content-field">
                    <ul class="info-wrapper">
                        <li class="info-item">
                            <span class="info-title">
                                价格：
                            </span>
                            <span class="info-content price">
                                ￥{{price}}
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="info-title">
                                联系人：
                            </span>
                            <span class="info-content">
                                {{nickName}}
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="info-title">
                                {{contactWay == "1" ? "QQ" : "Wechat"}}：
                            </span>
                            <span class="info-content">
                                {{contactNum}}
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="info-title">
                                手机号码：
                            </span>
                            <span class="info-content">
                                {{phone}}
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="info-title">
                                备注：
                            </span>
                            <span class="info-content">
                                {{sellerRemarks}}
                            </span>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
    	data() {
    		return {
                goodsName: "雪上手机壳图片", // 物品名
                intro: "这是一个手机壳图片你可以看看，需要的时候联系我", // 物品简介
                price: "20.00", // 价格
                nickName: "雪妮", // 昵称
                contactWay: "1", // 联系方式， 1: QQ, 2: Wechat
                contactNum: "954415852", // 号码
                phone: "15899651258", // 手机号码，长号、短号
                sellerRemarks: "这个手机壳图片是我男朋友为我画的，我很喜欢，希望有人吃这狗粮。图片质量不错，可以算的是上等品，高级塑料打造成的图片卡片。", // 卖家补充
            }
    	},
    	computed: {},
    	mounted() {
        },
    	methods: {},
    	components: {}
    }
</script>

<style lang="less">
    .stalls {
        height: 100%;
        overflow-y: auto;

        .stalls-item {
            border-top: 1px dashed #e0e0e0; /*no*/
            padding: 20px 30px;
        }
        .stalls-item:nth-child(1) {
            border-top: 0;
        }
        .item-title {
            margin: 0;
        }
        .item-subtitle {
            font-size: 28px; /*px*/
            color: #9a9a9a;
        }
        .imgs-field {
            width: 100%;
            overflow: hidden;
        }
        .img-box {
            width: 100%;
        }
        .ims-btn {
            font-size: 28px; /*px*/
            color: white;
            text-align: center;

            margin: 0 auto;
            width: 80%;
            line-height: 80px;
            border-radius: 6px; /*no*/
            background: #34ce09;
        }
        .content-field {
            width: 100%;
            padding: 20px 0;
        }
        .info-wrapper {
            width: 100%;
            overflow: hidden;
        }
        .info-item {
            font-size: 28px; /*px*/
            line-height: 40px; /*px*/

            margin-top: 8px;
        }
        .info-title {
            color: #909290;
            // display: inline-block;
            // width: 130px;
        }
        .info-content {
            color: black;
        }
        .price {
            color: #e64444;
        }
    }
</style>
