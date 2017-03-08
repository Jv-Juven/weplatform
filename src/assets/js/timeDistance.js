/**
 * 计算时间戳到现在的时间，返回有效时间的最大单位数据
 * @param  {[Date]} timestamp [时间戳]
 * @return {[String]}           [有效时间的最大单位数据]
 */
export default function (timestamp) {
    if (!timestamp || (new Date(timestamp)) == "Invalid Date") {
        timestamp = (new Date()).getTime();
    }
    let thatMoment;
    let now = new Date();
    now = new Date(now);
    timestamp = new Date(timestamp);
    let returnTxt = {
        year: {
            limit: 31104000,
            unitText: "年前"
        },
        month: {
            limit: 2592000,
            unitText: "月前"
        },
        day: {
            limit: 86400,
            unitText: "天前"
        },
        hour: {
            limit: 3600,
            unitText: "小时前"
        },
        minutes: {
            limit: 60,
            unitText: "分钟前"
        },
        seconds: {
            limit: 1,
            unitText: "秒前"
        },
    }
    let gap = (now - timestamp)/1000;

    for(let timeUnit in returnTxt) {
        let num = gap/returnTxt[timeUnit]["limit"];
        if (num >= 1) {
            num = Math.round(num);
            return `${num}${returnTxt[timeUnit]["unitText"]}`;
        }
    }
}
