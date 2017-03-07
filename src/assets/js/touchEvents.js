// 阻止滑动事件
export const preventTouch = () => {
	window.ontouchmove = window.onmousemove = function (e) {
		e.returnValue = false;
	}
}
// 允许滑动事件
export const allowTouch = () => {
	window.ontouchmove = window.onmousemove = function (e) {
		e.returnValue = true;
	}
}
