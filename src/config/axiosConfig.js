/**
 * axios的基本配置
 */
import axios from 'axios'
import qs from 'qs'
// import * as _ from './whole'

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://10.100.31.217:3080';
// axios.defaults.baseURL = 'http://192.168.1.129:8383';

//POST传参序列化
axios.interceptors.request.use((config) => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data);
	}
	return config;
}, (error) => {
	console.error("axios配置：错误的传参");
	return Promise.reject(error);
});

//code状态码200判断
axios.interceptors.response.use((res) => {
	if (res.status != '200') {
		console.error("axios配置：", res);
		return Promise.reject(res);
	}
	return res.data;
}, (error) => {
	console.error("axios配置：网络异常");
	return Promise.reject(error);
});
export default axios;
