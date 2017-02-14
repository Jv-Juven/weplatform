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
var validator = function () {
    var validationStrategies = {}; // 验证策略
    var validate = function () {}; // 验证行为
}
