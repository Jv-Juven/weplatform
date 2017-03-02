<template lang="html">
<section class="grid">
    <ul class="grid-wrapper">
        <li class="grid-item"
            v-for="(imgUrl, key) in imgUrls"
            :style="imgStyles[imgUrl]"
            @click="selImg(key)"
        ></li>
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
	mounted() {
        this.imgUrls.forEach((url) => {
            this.setStyles(url);
        });
    },
	methods: {
        // 为每张图片设置样式
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
                    this.$set(this.imgStyles, [imgUrl], styleObject);
                }
			}
		},
        // 选择图片
        selImg(key) {
            this.$emit('selImg', key, this.imgUrls);
        }
	},
    watch: {},
	components: {}
}
</script>

<style lang="less">
@full_width: 750px;
@item_width: 240px;
@aside_space: (@full_width - @item_width * 3)/4;
.grid {
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    width: @full_width;

    .grid-wrapper {
        width: 100%;
        overflow: hidden;

        .grid-item {
            float: left;

            width: @item_width;
            height: @item_width;
            margin-top: @aside_space;
            margin-left: @aside_space;
        }
    }
}
</style>
