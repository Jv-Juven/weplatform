/**
 * 验证函数 ----- 策略模式
 * 参考：http://www.cnblogs.com/kongxianghai/p/4985122.html
 * 1、是否字符串；
 * 2、字符串长度；
 * 3、是否数字；
 * 4、数字范围；
 * 5、是否对象；
 * 6、对象里是否含有某个属性；
 * 7、是否数组；
 * 8、数组长度；
 * 9、电话号码验证；
 * 10、手机号码验证；
 * 11、是否邮箱；
 * @return {[Boolean]} [验证是否通过]
 */
var Validator = function () {
    this.strategies = {}; // 实例对象的验证策略集合
    this.errors = []; // 验证函数队列
}

/**
* 导入验证策略函数
* @param  {[object]} strategies [策略函数对象（键值对形式）]
* @return {[object]}            [null]
*/
Validator.prototype.importStrategies = function (strategies) {
    if (defaultStrategies.isNoEmptyObject(strategies)) {
        for (var name in strategies) {
            this.addStrategies(name, strategies[name]);
        }
    } else {
        console.error("导入的验证策略函数对象非Json对象");
    }
};
/**
 * 添加策略
 * @param {[String]} name     [策略名字]
 * @param {[Function]} strategy [策略函数体]
 */
Validator.prototype.addStrategies = function (name, strategy) {
    this.strategies[name] = strategy;
};
/**
 * 验证函数
 * @param  {[String, Array...]} value      [验证的值]
 * @param  {[String]} rule       [验证规则]
 * @param  {[type]} ruleParams [对应验证规则的参数]
 * @return {[type]}            [description]
 */
Validator.prototype.valid = function (value, ruleElement, errMsg) {
    if (!value || !ruleElement) {
        console.error("验证函数参数有误");
        return;
    }

    var result,
    ruleName,
    ruleParams;
    var params = [];
    var ruleElement = ruleElement.split(":");

    ruleName = ruleElement[0]; // 规则名字
    ruleParams = ruleElement[1]; // 规则函数的参数
    params.push(value);
    
    ruleParams != "" && ruleParams !== null && ruleParams !== undefined && params.push(ruleParams);
    // 执行验证函数, 正确返回true，错误返回errMsg
    result = this.strategies[ruleName].apply(this, params);
    result = !!result ? result : errMsg;
    this.errors.push(result);
};

var defaultStrategies = {
    // 是否非空对象
    isNoEmptyObject: function (obj) {
        var bool = (typeof obj === "object") && (Object.prototype.toString.call(obj).toLowerCase() === "[object object]") && !obj.length;
        return bool || false;
    }
}

export default Validator;
