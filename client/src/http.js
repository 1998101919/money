import axios from 'axios';
import router from './router';
import { Message,Loading } from 'element-ui'

//加载动画
let loadingInstance;
function startLoading() {
    loadingInstance = Loading.service({
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.7)'
    });
}

//结束动画
function endLoading() {
    loadingInstance.close();
}

//请求拦截
axios.defaults.timeout = 5000
axios.interceptors.request.use(config => {
    // element ui Loading方法
    startLoading()
    //设置请求头
    if(localStorage.getItem('eleToken')){
        config.headers.Authorization = localStorage.getItem('eleToken')
    }

    return config
}, error => {
    loadinginstace.close()
    Message.error({
        message: '加载超时'
    })
    return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(data => {
    endLoading()
    return data;
},err => {
    endLoading()
    const {status} = err.response;

    if(status == 401){
        Message.error({
            message : 'token无效,请重新登录!'
        })
        //清除token
        localStorage.removeItem('eleToken')
        //跳转
        router.push('/login')
    }
    Message.error({
        message : '格式不正确,请重新填写!'
    })
    return Promise.reject(err)
})

export default axios;