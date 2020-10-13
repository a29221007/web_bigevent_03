$(function () { 
    // 1 自定义校验规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在1~6个字符之间'
            }
        }
    });

    var layer = layui.layer
    // 2 获取用户基本信息，快速渲染到表单上
    initUserinfo()
    // 封装函数
    function initUserinfo() { 
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                form.val('formUserinfo',res.data)
            }
        })
    }

    // 3 重置按钮
    $('#btnReset').on('click', function (e) { 
        e.preventDefault()
        initUserinfo()
    })

    // 4 提交修改
    $('.layui-form').on('submit', function (e) { 
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg('修改基本资料失败！')
                }
                // 成功后
                layer.msg('修改成功！')
                //调用父页面中的方法，渲染
                window.parent.getUserInfo()
            }
        })
    })

})