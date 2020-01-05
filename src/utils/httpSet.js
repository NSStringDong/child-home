import {axiosConfig} from '../utils/httpConfig.js'
import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router/index.js'

let token = '';
const httpSet = axios.create({
	baseURL: axiosConfig.baseUrl,
	timeout: axiosConfig.timeout
});

// 设置使用cookies
httpSet.defaults.withCredentials = true;

httpSet.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

httpSet.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';

httpSet.defaults.responseType = 'json';

httpSet.defaults.transformRequest = [
	function(data) {
		// 数据序列化
		return JSON.stringify(data);
	}
];

httpSet.defaults.validataStatus = function (status) {
	return true;
};

// 配置请求头信息
httpSet.interceptors.request.use(
	config => {
		let localToken = window.localStorage.getItem('token');
		// console.info("token", localToken);
  		if (localToken) {
    		token = localToken;
  		}
  		config.headers.common['token'] = token;
		config.headers.Accept = 'application/json';
		return config;
	},
	error => {
		this.$message.error(error);
		Promise.reject(error);
	}
);

// response拦截器=>对响应做处理
httpSet.interceptors.response.use(
	function (response) {
		console.info('response', response);
		// 成功请求到数据
		// 根据返回的数据做对应的处理
		if (response.status == 200) {
			const data = response.data;
			if (data.code >= 0) {
				return data;
			} else if (data.code == -100) {
				Message({
					showClose: true,
					message: data.message,
					type: 'error'
				});
				router.replace({
					path: '/login'
				});
			} else {
				Message({
					showClose: true,
					message: data.msg,
					type: 'error'
				});
				return data;
			}
		} else {
			// console.info(`请求返回：${JSON.stringify(response)}`);
			const err = new Error();
			err.data = response.data;
			err.response = response;
			throw err;
		}
	},
	function (error) {
		// console.log(`执行error`);
		// console.info(error);
		// console.info(JSON.stringify(error));

		if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求参数错误'
                    break
                case 401:
                    error.message = '未授权，请登录'
                    break
                case 403:
                    error.message = '跨域拒绝访问'
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
            }
            Message.error(error.message);
        }
        return Promise.reject(error)
	}
);

export default httpSet;