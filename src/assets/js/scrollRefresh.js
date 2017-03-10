import bindEvents from "./bindEvents";
/**
 * 滚动到滚动窗体的底部时执行
 * @param  {Object} options [参数对象]
 * options:
 *     scrollContainer 滚动元素的父容器
 *     scrollBody 滚动容器
 *     refreshFn 刷新函数(已滚动到底部)
 *
 * @return null
 */
export default function (options) {
    let scrollContainer = options.scrollContainer; // 滚动元素的父容器
    let scrollBody = options.scrollBody; // 滚动容器
    let viewPortHeight = document.body.clientHeight; // 视口高度
    let scrollHeight = scrollBody.clientHeight; // 滚动容器的高度
    let refreshFn = options.refreshFn || function () {}; // 刷新函数
    bindEvents(scrollContainer, "onscroll", () => {
        // console.log(scrollContainer.scrollTop);
        let isResolve = scrollContainer.scrollTop >= (scrollHeight - viewPortHeight - 20);
        if (isResolve) {
            typeof refreshFn === "function" && refreshFn();
        }
    });
}
