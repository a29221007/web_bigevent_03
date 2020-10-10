$(function () {
    // 开发环境服务器地址
    var baseURL = 'http://ajax.frontend.itheima.net'
    // 1.拦截所有的ajax请求
    // option 参数可以获取所有的ajax请求的配置参数
    $.ajaxPrefilter(function (option) {
        option.url = baseURL + option.url;
    });

    
})