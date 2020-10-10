$(function () {
    // 1 登录注册功能切换
    $('#link-reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link-login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    // 2自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (value !== $('#form_reg [name=password]').val()) {
                return '两次输入的密码不一致！'
            }

        }
    })

    var layer = layui.layer
    // 3实现注册功能
    $('#form_reg').on('submit', function (e) {
        console.log(11);
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                    username: $('.reg_box [name=username]').val(),
                    password: $('.reg_box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！');
                $('#link-login').click();
                $('#form_reg')[0].reset();

            }
        })
    })

    // 4 实现登录功能   
    $('#form-login').on('submit', function (e) { 
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将token值保存到本地
                localStorage.setItem('token', res.token)
                // 页面跳转
                location.href = '/index.html'
            }
        })
    })


    // 5利用$.ajaxPrefilter函数优化ajax请求
    
})  