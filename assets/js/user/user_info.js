$(function () {
    //1.定义校验规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称在1-6位之间！'
            }
        },
    })

    //2.初始化用户信息
    initUserInfo()
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //调用 form.val（）快速为表单赋值
                form.val('formUserInfo', res.data)
            },
        })
    }

    // 3.重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        //初始化用户信息
        initUserInfo()
    })

    //4.提交用户修改行为
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败！')
                } else {
                    layer.msg('恭喜，用户信息修改成功！')
                    //刷新父框架里面的用户信息
                    window.parent.getUserInfo()
                }
            },
        })
    })
})
