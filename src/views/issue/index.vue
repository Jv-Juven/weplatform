<template lang="html">
    <main class="main issue">
        <!-- tabs -->
        <mu-tabs :value="activeTab" @change="handleTabChange" v-show="false">
            <mu-tab value="Sell" title="我是卖家" />
            <mu-tab value="Donate" title="我要捐赠" />
            <mu-tab value="Buy" @active="handleActive" title="我要求购" />
        </mu-tabs>
        <!-- body -->
        <keep-alive>
            <component
                :is="activeTab"
                :show-errors-dialog="showDialog"
                v-on:closeDialogCallback="closeDialogCallback"
            ></component>
        </keep-alive>
        <!-- dialog -->
        <!-- <mu-raised-button label="Alert Dialog" @click="showDialog"/> -->
        <mu-dialog
            :open="dialog.isOpen"
            title="温馨提示"
            titleClass="dialog-title-class"
            bodyClass="dialog-body-class"
            actionsContainerClass="dialog-btn-class"
        >
            {{dialog.content}}
            <mu-flat-button label="确定" slot="actions" primary @click="closeDialog"/>
        </mu-dialog>
    </main>
</template>

<script>
    import Sell from "./components/sell";
    import Donate from "./components/donate";
    import Buy from "./components/buy";
    // api
    import api from "api";
    export default {
        data() {
            return {
                activeTab: 'Sell', // 当前的tab
                dialog: {
                    isOpen: false, // 是否打开对话框
                    content: "" // 对话框内容
                },
                callbackFns: {}, // 回调函数队列
            }
        },
        computed: {},
        mounted() {
            // api({
            //     method: "get",
            //     url: "/lottery"
            // });
        },
        methods: {
            // 却换到tab函数
            handleTabChange(val) {
                this.activeTab = val
            },
            // 却换到当前tab-body的钩子函数
            handleActive() {},
            // 打开对话框
            showDialog(msg) {
                if (msg == "" || msg === null || msg === undefined) {
                    return
                } else {
                    this.dialog.isOpen = true;
                    this.dialog.content = msg;
                }
            },
            // 关闭对话框
            closeDialog() {
                this.dialog.isOpen = false;
                this.dialog.content = "";
                // 执行回调函数
                let fn = this.callbackFns["closeDialog"].pop();
                fn();
            },
            // 关闭对话框后的回调函数 ------- 待优化：应将相同名字的数组合并，而不是替换
            closeDialogCallback(options) {
                if (Object.prototype.toString.call(options) == "[object Object]") {
                    this.callbackFns = Object.assign({}, this.callbackFns, options);
                }
            }
        },
        components: {
            Sell,
            Donate,
            Buy
        }
    }
</script>

<style lang="less">
    .tab-body {
        position: relative;
        top: 0px;
        left: 0px;

        width: 100%;
        overflow: hidden;
        background: white;
        padding-bottom: 60px;
    }
    .issue {
        background: white;
        padding-bottom: 80px;

        .submit-btn {
            position: relative;
            left: 50%;
            transform: translate3d(-50%, 0, 0);

            margin-top: 30px;
        }
    }
    .dialog-title-class {
        font-size: 32px; /*px*/

        justify-content: center!important;
    }
    .dialog-body-class {
        color: rgba(200, 8, 8, .6)!important;
        text-align: center;
    }
    .dialog-btn-class {
        width: 100%;
        border-top: 1px solid rgb(240, 240, 240); /*no*/
        justify-content: center!important;

        .mu-flat-button {
            width: 100%;
            text-align: center;
        }
    }
</style>
