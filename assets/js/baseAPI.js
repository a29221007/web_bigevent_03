$(function () {
    // 开发环境服务器地址
    var baseURL = 'http://ajax.frontend.itheima.net'
    // 1.拦截所有的ajax请求
    // option 参数可以获取所有的ajax请求的配置参数
    $.ajaxPrefilter(function (option) {
        option.url = baseURL + option.url;

        if (option.url.indexOf('/my/') !== -1) { 
            option.headers = {
                Authorization:localStorage.getItem('token') || ''
            }
        }
        
        // 3 身份认证，拦截
        option.complete = function (res) { 
            //console.log(res);
            var obj = res.responseJSON;
            if (obj.status === 1 && obj.message === '身份认证失败！') { 
                // 1 清除本地的token
                localStorage.removeItem('token')
                // 2 强制跳转页面
                location.href = '/login.html'
            }
        }
    });

     

})