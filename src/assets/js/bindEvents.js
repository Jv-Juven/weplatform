/**
 * dom绑定原生事件
 * @param  {Object}   ele       [dom元素]
 * @param  {String}   eventName [原生事件名称]
 * @param  {Function} fn        [原生事件函数体]
 * @return {null}             [description]
 */
export default function (ele, eventName, fn) {
    ele.fnQuery = ele.fnQuery || []; // 函数队列
    if (typeof fn === "function") {
        ele.fnQuery.push(fn);
        ele[eventName] = () => {
            let fnQueryLength = ele.fnQuery.length;
            for (let i = 0; i < fnQueryLength; i++) {
                ele.fnQuery[i](arguments);
            }
        }
    }
}
