<template lang="html">
<section>
    <ul class="grid-wrapper">
        <li class="grid-item" v-for="imgUrl in imgUrls" :style="imgStyles[imgUrl]"></li>
    </ul>
</section>
</template>

<script>
export default {
	data() {
		return {
            imgStyles: {} // 图片的style
        }
	},
    props: {
        imgUrls: {
            type: Array,
            default() {
                return [];
            }
        }
    },
	computed: {},
	mounted() {},
	methods: {
		setStyles(imgUrl) {
			if (imgUrl && imgUrl.length > 0 && !this.imgStyles[imgUrl]) {
                let img = new Image();
                let styleObject = {
                    background: `url(${imgUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                };
                img.src = imgUrl;
                img.onload = () => {
                    if (img.width > img.height) {
                        styleObject.backgroundSize = "auto 100%";
                    } else {
                        styleObject.backgroundSize = "100% auto";
                    }
                    this.$set(imgStyles, [imgUrl], styleObject);
                }
			}
		}
	},
    watch: {
        imgUrls: {
            handler(newVal) {
                newVal.forEach((url) => {
                    this.setStyles(url);
                });
            },
            deep: true

        }
    },
	components: {}
}
</script>

<style lang="less">@full_width: 750px;
@item_width: 240px;
@aside_space: (@full_width - @item_width * 3)/4;
.grid-wrapper {
    width: 100%;

    .grid-item {
        float: left;

        width: @item_width;
        height: @item_width;
        margin-top: @aside_space;
        margin-left: @aside_space;
    }
}
</style>
