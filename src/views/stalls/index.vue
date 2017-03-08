<template lang="html">
    <div class="stalls">
        <div id="stallsContainer" class="stalls-container">
            <ul id="stallsWrapper" class="stalls-wrapper">
                <li class="stalls-item" ref="stalls-item" v-for="imgData in allData">
                    <!-- 需要图片加载函数 -->
                    <h1 class="item-title">{{imgData.goodsName}}</h1>
                    <h2 class="item-subtitle">{{imgData.intro}}</h2>
                    <grid
                    :img-urls="imgData.imgs"
                    v-on:selImg="showMoreImages"
                    ></grid>
                    <div class="content-field">
                        <ul class="info-wrapper">
                            <li class="info-item">
                                <span class="info-title">
                                    价格：
                                </span>
                                <span class="info-content price">
                                    ￥{{imgData.price.toFixed(2)}}
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
                            <li class="info-item">
                                <span class="info-title time-stamp">
                                    {{imgData.issueTime}}
                                </span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="stalls-loading-container">
                    <div class="stalls-loading-wrapper" v-show="loadDataStatus != 3">
                        <img class="loading-img" src="../../../static/images/loading.gif" alt="">
                        <span>
                            正在加载
                        </span>
                    </div>
                    <div class="stalls-loading-wrapper" v-show="loadDataStatus == 3">
                        <span>
                            没有更多了~
                        </span>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 图片预览 -->
        <pre-view
            :images="preImages"
            :init-index="currentImgIndex"
            v-on:closePreView="closePreView"
            v-if="preImages.length > 0"
        ></pre-view>
    </div>
</template>

<script>
    import timeDistance from "assets/js/TimeDistance";
    import scrollRefresh from "assets/js/scrollRefresh";

    import PreView from "components/preView";
    import Grid from "components/grid";
    // api
    import api from "api";
    export default {
    	data() {
    		return {
                // goodsName: "雪上手机壳图片", // 物品名
                // intro: "这是一个手机壳图片你可以看看，需要的时候联系我", // 物品简介
                // price: "20.00", // 价格
                // nickName: "雪妮", // 昵称
                // contactWay: "1", // 联系方式， 1: QQ, 2: Wechat
                // contactNum: "954415852", // 号码
                // phone: "15899651258", // 手机号码，长号、短号
                // sellerRemarks: "这个手机壳图片是我男朋友为我画的，我很喜欢，希望有人吃这狗粮。图片质量不错，可以算的是上等品，高级塑料打造成的图片卡片。", // 卖家补充

                preImages: [], // 预览的图片
                currentImgIndex: 0, // 预览的当前图片索引

                allData: [], // 总数据
                pageNum: 0, // 页码
                pageSize: 10, // 单页总数量
                loadDataStatus: 0, // 加载数组的状态。0: 没加载，1：正在加载，3：加载结束
            }
    	},
    	computed: {},
    	mounted() {
            this.getData(this.pageNum, this.pageSize);
        },
        updated() {
            let vm = this;
            // 在页面dom渲染完成之后加载
            scrollRefresh({
                scrollContainer: document.getElementById("stallsContainer"),
                scrollBody: document.getElementById("stallsWrapper"),
                refreshFn() {
                    vm.getData(vm.pageNum, vm.pageSize)
                }
            });
        },
    	methods: {
            // 获取数据
            getData(pageNum, pageSize) {
                return new Promise((resolve, reject) =>{
                    // 加载结束，不再请求数据
                    if (this.loadDataStatus == 3) {
                        return;
                    }
                    api.get(`/getGoods/${pageNum}/${pageSize}`)
                        .then((res) => {
                            let allData = res.data.rows || [];
                            // 加载结束
                            if (allData.length == 0) {
                                this.loadDataStatus = 3
                            }
                            allData.forEach((data) => {
                                this.parseImgsUrl(data);
                                data.issueTime = timeDistance(data.createdAt)
                            });
                            this.allData.push.apply(this.allData, allData);
                            this.pageNum++; // 页面自动加一
                            resolve(res);
                        })
                        .catch((res) => {
                            console.error(res);
                            reject(res);
                        });
                });
            },
            // 处理图片链接数据
            parseImgsUrl(dataUnit) {
                if (!!dataUnit && !!dataUnit.imgs) {
                    // let singleImg = [];
                    dataUnit.imgs = dataUnit.imgs.split(","); // 总图片链接数组
                    // singleImg.push(dataUnit.imgs[0]);
                    // dataUnit.oneImg = singleImg; // 默认显示的图片数组
                    // dataUnit.showAll = false; // 不显示全部图片
                    // dataUnit.showedImgs = singleImg; // 显示的图片的数据
                }
            },
            // 查看更多图片
            // toggleMoreFn(imgData) {
            //     imgData.showAll = !imgData.showAll;
            //     if (imgData.showAll) {
            //         imgData.showedImgs = imgData.imgs; // 显示的图片的数据
            //     } else {
            //         imgData.showedImgs = imgData.oneImg; // 显示的图片的数据
            //     }
            // },
            // 预览更多图片
            showMoreImages(index, imgs) {
                index = index || 0;
                if (imgs && imgs.length > 0) {
                    this.preImages = imgs;
                    this.currentImgIndex = index;
                    // console.log("showMoreImages", this.currentImgIndex);
                }
            },
            // 关闭预览框
            closePreView() {
                this.preImages = [];
            }
        },
    	components: {
            PreView,
            Grid
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/func/index.less";
    @import "../../assets/less/transition.less";

    @border_col: #e0e0e0;
    .stalls {
        width: 100%;
        height: 100%;
        // overflow-y: auto;

        .stalls-container {
            width: 100%;
            height: 100%;
            overflow-y: auto;
        }

        .stalls-item {
            border-top: 1px dashed @border_col; /*no*/
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
            color: #555;
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
            color: #777;
            // display: inline-block;
            // width: 130px;
        }
        .info-content {
            color: black;
        }
        .price {
            color: #e64444;
        }
        .time-stamp {
            color: #b7b7b7;
            font-size: 24px; /*px*/

            padding-top: 20px;
        }

        .stalls-loading-container {
            width: 100%;
            height: 100px;
            border-top: 1px dashed @border_col; /*no*/

            .flex-layout();
            justify-content: center;

            .stalls-loading-wrapper {
                display: inline-block;
            }

            .loading-img {
                @w: 36px;
                width: @w;
                height: @w;

                vertical-align: sub;
            }
        }
    }
</style>
