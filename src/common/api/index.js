/**
 * Created by Administrator on 2017/12/13.
 */
import axios from 'axios';
// 服务地址
export const SERVICE = 'http://192.168.10.249:8550';
export const API_PATH = '/windelephant/api'
export const API_FULL = SERVICE + API_PATH;

/**
 * get公共调用方法
 * @param {any} url
 * @param {any} param
 * @param {any} sucess
 * @param {any} fail
 */
function apiGet(url, params, sucess, fail) {
  if(params) params._ = Date.parse(new Date());  //设置请求不缓存
  axios
    .get(url, {
      params: params
    })
    .then(res => {
      validResponed(res);
      let data = res.data;
      sucess(data);
    })
    .catch(error => {
      fail(error);
    });
}
/**
 * post公共调用方法
 * @param {any} url
 * @param {any} param
 * @param {any} sucess
 * @param {any} fail
 */
function apiPost(url, param = {}, sucess, fail) {
  // 判断参数类型
  if (!checkParam(url, sucess, fail)) {
    return new Error('参数错误...');
  }
  axios
    .post(url, param)
    .then(res => {
      validResponed(res);
      let data = res.data;
      sucess(data);
    })
    .catch(error => {
      let res = error.response;
      if (typeof res !== 'undefined') {
        // if (res.status === 400) {     Message.error({         message: '用户尚未注册'
        // }); } return Promise.reject(res.statusText);
        // if (res.status !== 200) {
        //     Message.error({message: res.data.msg});
        // }
      }
      fail(res.data);
    });
}

export default{
   //登录接口
   LoginBlog(param){
     apiPost(API_FULL+'/login', param, sucess, fail)
  },
}