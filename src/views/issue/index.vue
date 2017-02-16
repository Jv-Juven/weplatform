<template lang="html">
    <main class="main issue">
        <!-- tabs -->
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="Sell" title="我是卖家" />
            <mu-tab value="Donate" title="我要捐赠" />
            <mu-tab value="Buy" @active="handleActive" title="我要求购" />
        </mu-tabs>
        <!-- body -->
        <keep-alive>
            <component
                :is="activeTab"
            ></component>
        </keep-alive>
    </main>
</template>

<script>
    import Sell from "./components/sell";
    import Donate from "./components/donate";
    import Buy from "./components/buy";
    export default {
        data() {
            return {
                activeTab: 'Sell'
            }
        },
        computed: {},
        mounted() {},
        methods: {
            // 却换到tab函数
            handleTabChange(val) {
                this.activeTab = val
            },
            // 却换到当前tab-body的钩子函数
            handleActive() {}
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
</style>
