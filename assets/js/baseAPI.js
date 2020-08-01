//设置路径（测试）
var baseURL = 'http://ajax.frontend.itheima.net'
//设置路径（生产）

//1.拦截/过滤每一次ajax请求，配置每次请求需要的参数
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url

    //2.判断请求路径是否包含 /my/
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }

    //3.所有的请求完成后都要对身份进行判断
    options.complete = function (res) {
        console.log(res)
        var data = res.responseJSON
        if (data.status == 1 && data.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})
