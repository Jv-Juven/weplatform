<template lang="html">
    <transition name="fade">
        <section class="preView-wrapper" @click="close">
            <div class="bg-pannel"></div>
            <div class="swiper-container preView-container">
                <div class="swiper-wrapper preView-wrapper">
                    <div class="swiper-slide preView-slide" v-for="img in images" :style="setBgImg(img)"></div>
                </div>
            </div>
        </section>
    </transition>
</template>

<script>
import Swiper from "swiper";
// 引入相关js库
import {
    preventTouch,
    allowTouch
} from "assets/js/touchEvents"
export default {
	data() {
		return {}
	},
    props: {
        images: {
            type: Array,
            default() {
                return [];
            }
        },
        initIndex: {
            default: 0
        }
    },
	computed: {},
	mounted() {
        let vm = this;
        let preViewSwiper = new Swiper(".preView-container", {
            spaceBetween: 0, // slide之间的距离（单位px）
            initialSlide: vm.initIndex || 0
        });
        // 阻止背景被滑动事件
        preventTouch();
    },
    destroyed() {
        allowTouch();
    },
	methods: {
        setBgImg(imgUrl) {
            return {
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "100% auto",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }
        },
        close() {
            this.$emit("closePreView");
        }
    },
	components: {}
}
</script>

<style lang="less">
    @import "~swiper/dist/css/swiper.min.css";
    @import "../../assets/less/func/index.less";
    @import "../../assets/less/transition.less";
    .preView-wrapper {
        .full-screen();
        z-index: 9999;

        .bg-pannel {
            .full-screen();
            background: rgba(0, 0, 0, .9);
        }

        .preView-container {
            .full-screen();
            background: rgba(0, 0, 0, .9);
        }

        .preView-wrapper {}

        .preView-slide {}
    }
</style>
