$(function () { 
    // 1 调用获取用户信息函数
    getUserInfo()

    // 2 退出功能
    $('#btnlogout').on('click', function () { 
        layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
            //1 清空本地toke值
            localStorage.removeItem('token')
            //2 跳转页面
            location.href = '/login.html'
            //3 关闭弹出框
            layer.close(index);
          });
    })
})

// 获取用户信息，封装到入口函数外面
// 原因是，其他页面要用到这个函数
function getUserInfo() { 
    // 发送ajax请求
    $.ajax({
        type:'GET',
        url: '/my/userinfo',
        headers: {
            Authorization:localStorage.getItem('token') || ''
        },
        success: function (res) { 
            // 判断状态码
            if (res.status !== 0) { 
                return layui.layer.msg('获取用户基本信息失败！')
            }
            // 渲染头像信息
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) { 
    // 判断是用户名
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.user-avatar').hide()
    } else { 
        // 没头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.user-avatar').show().html(first)
    }

}

// 优化ajax 请求头信息利用ajaxPerfilter()函数