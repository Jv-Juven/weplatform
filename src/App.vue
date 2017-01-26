<template>
    <div id="app">
        <div class="app">
            <!-- 头部 -->
            <title-header v-if="false"></title-header>
            <!-- 路由体 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import TitleHeader from "components/header"
    export default {
    	name: 'app',
        components: {
            TitleHeader
        }
        // Store
    }
</script>

<style lang="less">
    @import "./assets/less/main.less";
    #app,
    .app {
        position: relative;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
