<template lang="html">
    <div class="tab-body">
        <div class="input-pannel">
            <!-- 物品名 -->
            <mu-text-field class="input" labelFloat v-model="formData.goodsName" label="物品名" hintText="物品名" fullWidth />
            <!-- 物品简介 -->
            <mu-text-field class="input" labelFloat v-model="formData.intro" label="物品简介" hintText="物品简介" multiLine :rows="3" :rowsMax="6" fullWidth/><br/>
            <!-- 价格 -->
            <mu-text-field class="input" labelFloat v-model="formData.price" label="价格（元）" hintText="价格（元）" fullWidth />
            <!-- 昵称 -->
            <mu-text-field class="input" labelFloat v-model="formData.nickName" label="昵称" hintText="昵称" fullWidth />
            <!-- 联系方式 -->
            <mu-select-field class="input" v-model="formData.contactWay" label="选择联系方式" fullWidth>
                <mu-menu-item class="input" value="1" title="QQ"/>
                <mu-menu-item class="input" value="2" title="微信"/>
            </mu-select-field>

            <mu-text-field class="input" v-model="formData.contactNum" hintText="联系号码" fullWidth />
            <!-- 手机号码 -->
            <mu-text-field class="input" labelFloat v-model="formData.phone" label="手机号码" hintText="手机号码" fullWidth />
            <!-- 卖家补充 -->
            <mu-text-field class="input" labelFloat v-model="formData.sellerRemarks" label="卖家补充" hintText="卖家补充" multiLine :rows="3" :rowsMax="6" fullWidth/><br/>
            <!-- 图片上传按钮 -->
            <div id="upload_wrapper">
                <mu-raised-button id="upload_btn" label="选择图片" class="demo-raised-button upload-img-btn" secondary/>
            </div>
            <mu-content-block class="marks state-intro">
                最多可上传9张图片，若选择多于9张图片，则以上传最后9张图片。
            </mu-content-block>
            <!-- 已上传图片展示区  -->
            <div class="uploaded-imgs-wrapper">
                <!-- 图片展示框 -->
                <mu-paper class="demo-paper" :zDepth="1" v-for="src in formData.imgs" :style="imgStyles[src]"/>
            </div>
            <!-- 页面信息 -->
            <mu-content-block class="marks">
                我们将会通过短信通知您物品编号以及期数，请在物品出售后及时告知公众号已售物品编号及出售时间，以便我们做好登记与下架手续，能够让买家及时得到物品信息。。
            </mu-content-block>
        </div>
        <!-- 确定按钮 -->
        <mu-raised-button label="提交" class="demo-raised-button submit-btn" @click="submitFn" primary/>
    </div>
</template>

<script>
    import Validator from "assets/js/validator";
    import upload from "../assets/qinniuUpload";
    // api
    import api from "api";
    export default {
    	data() {
    		return {
                formData: {
                    goodsName: "", // 物品名
                    intro: "", // 物品简介
                    price: "0.00", // 价格
                    nickName: "", // 昵称
                    contactWay: "1", // 联系方式， 1: QQ, 2: Wechat
                    contactNum: "", // 号码
                    phone: "", // 手机号码，长号、短号
                    sellerRemarks: "", // 卖家补充
                    imgs: [], // 上传的图片链接
                },
                contactTextArr: {
                    "1": "QQ号码",
                    "2": "微信号码"
                },
                imgStyles: {}
            }
    	},
        props: {
            showErrorsDialog: {
                default: Function,
                default() {}
            }
        },
    	computed: {
            contactText() {
                let contactWay = this.formData.contactWay;
                return this.contactTextArr[contactWay] || "联系号码";
            }
        },
    	mounted() {
            let vm = this;
            // 上传组件初始化
            upload({
                browse_button: "upload_btn",
                container: "upload_wrapper",
                uptoken_url: "http://localhost:3080/getToken/",
                domain: 'http://7xtj5v.com2.z0.glb.qiniucdn.com/'
            }, {
                getUrl(imgUrl) {
                    // 定制图片的样式
                    vm.setBgImg(imgUrl);
                    // 获取上传之后的图片链接
                    vm.formData.imgs.push(imgUrl);
                },
                beforeUpload(uploader) {
                    console.log(uploader.files);
                    // 上传的图片总数
                    let filesLength = uploader.files.length + vm.formData.imgs.length;
                    if (filesLength > 9) {
                        vm.showErrorsDialog("上传的图片不能大于9张");
                        uploader.splice(0, filesLength);
                    } else {
                        uploader.start();
                    }
                }
            });
        },
    	methods: {
            // 表单提交
            submitFn() {
                let validator = new Validator();
                let vm = this;
                validator.valid(this.formData.goodsName, "minLength:1", "请输入物品名称");
                validator.valid(this.formData.goodsName, "maxLength:40", "请输入不多于40个字符的物品名称");
                validator.valid(this.formData.intro, "minLength:1", "请输入物品简介");
                validator.valid(this.formData.price, "isNumber", "请输入数字价格");
                validator.valid(this.formData.nickName, "minLength:1", "请输入昵称");
                if (this.contactWay == "1") {
                    validator.valid(this.formData.contactNum, "isNumber", "请输入数字QQ号码");
                    validator.valid(this.formData.contactNum, "minLength:1", "请输入QQ号码");
                } else {
                    validator.valid(this.formData.contactNum, "minLength:1", "请输入微信号");
                }
                validator.valid(this.formData.phone, "isPhone", "手机号码有误，请重新填写");
                validator.start();
                if (!!validator.errors[0]) {
                    this.showErrorsDialog(validator.errors[0]);
                    return;
                }
                api({
                    method: "post",
                    url: "/postIssueInfo",
                    data: vm.formData
                }).then((res) => {
                    console.warn("后端返回：", res);
                });

            },
            // 设置背景色
            setBgImg(src) {
                let result = {
                    background: `url(${src})`,
                    backgroundSize: "100% auto",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }
                let img = new Image();
                img.src = src;
                img.onload = () => {
                    console.log(img.width);
                    if (img.width > img.height) {
                        result.backgroundSize = "auto 100%";
                    }
                    this.imgStyles = Object.assign({}, this.imgStyles, {
                        [src]: result
                    });
                }
                img.onerror = () => {
                    this.imgStyles = Object.assign({}, this.imgStyles, {
                        [src]: result
                    });
                }
            }
        },
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
        border-top: 1px solid rgb(240, 240, 240); /*no*/
        margin-top: 30px;
        padding-top: 30px;
        padding-bottom: 30px;
        font-size: 28px;
        text-indent: 56px; /*px*/
    }
    .state-intro {
        color: #989898;
    }
    .upload-img-btn {
        position: relative;
        left: 50%;

        transform: translateX(-50%);
    }
    .uploaded-imgs-wrapper {
        width: 100%;
        overflow: hidden;
        padding: 5px 0;
    }
    .demo-paper {
        @w: 240px;

        float: left;

        width: @w;
        height: @w;
        margin-top: 10px;
        margin-left: 7.5px;
    }
</style>
