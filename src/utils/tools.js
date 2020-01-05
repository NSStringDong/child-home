/**
 * 获取指定月份的最后一天
 * @param  {String} val 月份
 * @return {String}     最后一天
 */
export function formatDate(val) {
	let dateStr = val.split('-');
	let lastDay= new Date(dateStr[0], dateStr[1], 0);
	let y = lastDay.getFullYear();  
	let m = lastDay.getMonth() + 1;  
	m = m < 10 ? ('0' + m) : m;  
	let d = lastDay.getDate();  
	d = d < 10 ? ('0' + d) : d;  
	return y + '-' + m + '-' + d;
}
/**
 * 获取当前月份
 * @return {String} 当前月份
 */
export function nowMonth() {
	let nowDate = new Date();
	let y = nowDate.getFullYear();  
	let m = nowDate.getMonth() + 1;  
	m = m < 10 ? ('0' + m) : m;
	return y + '-' + m 
}
/**
 * 获取当前日期
 * @return {String} 当前日期
 */
export function nowDay() {
	let nowDate = new Date();
	let y = nowDate.getFullYear();  
	let m = nowDate.getMonth() + 1;  
	m = m < 10 ? ('0' + m) : m;
	let d = nowDate.getDate();  
	d = d < 10 ? ('0' + d) : d;  
	return y + '-' + m + '-' + d; 
}
/**
 * 获取详细时间
 * @param  {String} val GMT时间
 * @return {String}     时分秒时间
 */
export function allTime(val) {
	let date = new Date(val);
    let Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' +
    date.getDate() + ' ' +
    date.getHours() + ':' +
    date.getMinutes() + ':' +
    date.getSeconds()
    return Str
}