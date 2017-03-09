/**
 * 计算时间戳到现在的时间，返回有效时间的最大单位数据
 * 显示规则：
 * 判断：年份——跨年显示 年-月-日；
 * 判断：月份——跨月显示 月-日；
 * 判断：日期——跨10日或以上显示 月-日；
 * 判断：日期——隔天且现在距离时间24小时显示 “昨天”；
 * 判断：其他——显示 现在距离时间“前”；
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
        date: {
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
    // 获取相关单位的时间
    let getDates = (dateObj) => {
        if (Object.prototype.toString.call(dateObj) !== "[object Date]") {
            return
        }
        return {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            date: dateObj.getDate(),
            hour: dateObj.getHours(),
            mimute: dateObj.getMinutes(),
            second: dateObj.getSeconds()
        }
    }
    let gap = (now - timestamp)/1000;
    let thisTimes = getDates(now);
    let thatTimes = getDates(timestamp);

    for(let timeUnit in returnTxt) {
        // console.log(thatTimes);
        let num = gap/returnTxt[timeUnit]["limit"];
        // 跨年，显示具体的包括年份的时间
        if ((thisTimes.year - thatTimes.year) >= 1) {
            return `${thatTimes.year}-${thatTimes.month}-${thatTimes.date}`;
        }

        // 跨月份或跨10天以上，显示月份和日期
        if ((timeUnit == "month" && num >= 1) || (timeUnit == "date" && num >= 10)) {
            return `${thatTimes.month}-${thatTimes.date}`;
        }
        // 隔天
        if (timeUnit == "hour") {
            console.log(num);
        }

        // 其他
        if ((thisTimes.date - thatTimes.date) === 1 && (gap/returnTxt["date"]["limit"] >= 1)) {
            return "昨天";
        }
        if (num > 1) {
            num = Math.floor(num);
            return `${num}${returnTxt[timeUnit]["unitText"]}`;
        }
    }
}
