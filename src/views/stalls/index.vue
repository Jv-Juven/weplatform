<template lang="html">
    <div class="stalls">
        <ul class="stalls-wrapper">
            <li class="stalls-item" ref="stalls-item" v-for="imgData in allData">
                <!-- 需要图片加载函数 -->
                <h1 class="item-title">{{imgData.goodsName}}</h1>
                <h2 class="item-subtitle">{{imgData.intro}}</h2>
                <section class="imgs-field" @click="showMoreImages(imgData.imgs)">
                    <transition name="fade" v-for="src in imgData.showedImgs">
                        <img class="img-box" :src="src"></img>
                    </transition>
                </section>
                <div class="ims-btn" @click="toggleMoreFn(imgData)">
                    {{imgData.showAll ? "收起" : "查看更多图片"}}
                </div>
                <div class="content-field">
                    <ul class="info-wrapper">
                        <li class="info-item">
                            <span class="info-title">
                                价格：
                            </span>
                            <span class="info-content price">
                                ￥{{imgData.price}}
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="info-title">
                                联系人：
                            </span>
                            <span class="info-content">
                                {{imgData.nickName}}
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="info-title">
                                {{imgData.contactWay == "1" ? "QQ" : "Wechat"}}：
                            </span>
                            <span class="info-content">
                                {{imgData.contactNum}}
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="info-title">
                                手机号码：
                            </span>
                            <span class="info-content">
                                {{imgData.phone}}
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="info-title">
                                备注：
                            </span>
                            <span class="info-content">
                                {{imgData.sellerRemarks}}
                            </span>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>

        <!-- 图片预览 -->
        <pre-view
            :images="preImages"
            v-if="preImages.length > 0"
        ></pre-view>
    </div>
</template>

<script>
    import PreView from "components/preView";
    // api
    import api from "api";
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

                preImages: [], // 预览的图片

                allData: [], // 总数据
            }
    	},
    	computed: {},
    	mounted() {
            this.getData(0, 10);
        },
    	methods: {
            // 获取数据
            getData(pageNum, pageSize) {
                api.get(`/getGoods/${pageNum}/${pageSize}`)
                    .then((res) => {
                        let allData = res.data.rows || [];
                        allData.forEach((data) => {
                            this.parseImgsUrl(data);
                        });
                        this.allData = allData;
                    })
                    .catch((res) => {
                        console.error(res);
                    });
            },
            // 处理图片链接数据
            parseImgsUrl(dataUnit) {
                if (!!dataUnit && !!dataUnit.imgs) {
                    let singleImg = [];
                    dataUnit.imgs = dataUnit.imgs.split(","); // 总图片链接数组
                    singleImg.push(dataUnit.imgs[0]);
                    dataUnit.oneImg = singleImg; // 默认显示的图片数组
                    dataUnit.showAll = false; // 不显示全部图片
                    dataUnit.showedImgs = singleImg; // 显示的图片的数据
                }
            },
            // 查看更多图片
            toggleMoreFn(imgData) {
                imgData.showAll = !imgData.showAll;
                if (imgData.showAll) {
                    imgData.showedImgs = imgData.imgs; // 显示的图片的数据
                } else {
                    imgData.showedImgs = imgData.oneImg; // 显示的图片的数据
                }
            },
            // 预览更多图片
            showMoreImages(imgs) {
                if (imgs && imgs.length > 0) {
                    this.preImages = imgs;
                }
            }
        },
    	components: {
            PreView
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/transition.less";
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
            color: #27abe4;
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
