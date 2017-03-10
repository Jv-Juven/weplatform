import bindEvents from "./bindEvents";
/**
 * 滚动至顶部
 * @param  {[type]} options [description]
 * options:
 *
 * @return {[type]}         [description]
 */
export default function (options) {
    let viewPortHeight = document.body.clientHeight; // 视口高度
    let toggleScrollTop = options.toggleScrollTop; // 触发滚顶元素
    let scrollContainer = options.scrollContainer; // 滚动元素
    // 动画执行函数
    let animate = (from, to, duration, updateFn) => {
        if (from == to) {
            return;
        }
        if (/\ds/.test(duration)) {
            duration = duration.replace("s", "");
            // console.log("duration", duration);
        }
        if (/[ms]/.test(duration)) {
            duration = duration.replace("ms", "");
            duration = duration/1000;
        }
        let steps = duration * 60;
        let locationValue = from;
        let dist = to - from;
        let i = 0;
        let stepLength = dist/steps;
        let exec = () => {
            if (i < steps) {
                i++;
                locationValue += stepLength;
                typeof updateFn === "function" && updateFn(locationValue);
                requestAnimationFrame(exec)
            }
        }
        requestAnimationFrame(exec);
    }
    bindEvents(scrollContainer, "onscroll", () => {
        if (scrollContainer.scrollTop >= viewPortHeight) {
            toggleScrollTop.style.display = "block";
        } else {
            toggleScrollTop.style.display = "none";
        }
    });
    toggleScrollTop.ontouchend = () => {
        let from = scrollContainer.scrollTop;
        animate(from, 0, "0.3s", (value) => {
            scrollContainer.scrollTop = value;
        });
    }
}
