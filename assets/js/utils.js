//公共js代码(工具函数)
var token = window.localStorage.getItem('token') || ''
//1. 公共的 baseUrl
//请求拦截器
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    options.headers = {
        Authorization: token,
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {

            window.localStorage.removeItem('token')
            window.location.href = '/login.html'
        } else {}
    }
})