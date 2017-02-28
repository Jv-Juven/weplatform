<template lang="html">
    <transition name="fade">
        <main class="preView-wrapper" @click="closePreView()">
            <div class="bg-pannel"></div>
            <div class="swiper-container preView-container">
                <div class="swiper-wrapper preView-wrapper">
                    <div class="swiper-slide preView-slide" v-for="img in images" :style="setBgImg(img)"></div>
                </div>
            </div>
        </main>
    </transition>
</template>

<script>
import Swiper from "swiper";
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
            // twoWay: true
        },
        initIndex: {
            default: 0
            // twoWay: true
        }
    },
	computed: {
        // showPreView() {
        //     return this.images.length > 0;
        // }
    },
	mounted() {
        let vm = this;
        let preViewSwiper = new Swiper(".preView-container", {
            spaceBetween: 0, // slide之间的距离（单位px）
            initialSlide: vm.initIndex || 0
        });
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
        closePreView() {
            this.images = [];
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
        }

        .preView-wrapper {}

        .preView-slide {}
    }
</style>
