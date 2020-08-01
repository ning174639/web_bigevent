$(function () {
    //调用函数获取用户信息
    getUserInfo()

    // 3.点击退出登录
    //引用layer
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (
            index
        ) {
            layer.close(index)
            localStorage.removeItem('token')
            location.href = '/login.html'
        })
    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        //Jquery中的ajax,专门用来设置请求头的信息的属性  headers区分大小写
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function (res) {
            console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //调用用户渲染的头像
            renderUser(res.data)
        },
        //不论成功还是失败，都会调用complete回调函数
        // compltete: function (res) {},
    })
}

//封装用户头像数据
function renderUser(user) {
    //1.渲染用户名
    var uname = user.nickname || user.username
    $('#weclome').html('欢迎&nbsp;&nbsp;' + uname)

    // 2.渲染头像  如果为空 渲染文本头像
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(uname[0].toUpperCase()).show()
    }
}
