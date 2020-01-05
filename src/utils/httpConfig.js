let baseUrl = '/jweb_management/';
if (process.env.NODE_ENV === 'development') {
	baseUrl = 'http://192.168.4.64:8083/oms/';
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