let baseUrl = '/jweb_management/';
if (process.env.NODE_ENV === 'development') {
	baseUrl = 'http://47.94.90.103:8088/api/';
}

/*
if (window.domain === 'www.xlvren.com') {

} else {
	baseUrl = 'http://192.168.11.64:8083/oms/';
}
*/

export let axiosConfig = {
	timeout: 20000,
	baseUrl: baseUrl
}