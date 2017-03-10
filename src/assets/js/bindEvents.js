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
