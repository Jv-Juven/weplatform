<template>
    <div id="app">
        <div class="app">
            <title-header></title-header>
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
    .app {
        position: relative;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
