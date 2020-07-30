$(function () {
    //1.点击按钮，切换登录和注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //2.定义表单校验规则
    //不能直接用得调用
    var form = layui.form
    form.verify({
        //校验的值可以用函数和数组两种方式
        //密码校验规则
        pwd: [/^\S{6,12}$/, '密码为6-12位且不能包含空格'],
        repwd: function (value) {
            //通过形参拿到的是确认形参中的值  在拿到确认密码里面的值  在进行判断  判断失败提示信息
            if ($('#reg-pwd').val() !== value) {
                return '两次密码输入不一致'
            }
        },
    })

    //3.注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        //阻止表单默认行为
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            //data： $('#form_reg').serialize()  用这个方法可以直接拿到name值
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //触动切换行为，注册成功直接跳转到登录接界面
                $('#link_login').click()
                //清空注册表单
                $('#form_reg')[0].reset()
            },
        })
    })

    //4.登录
    $('#form_login').on('submit', function (e) {
        //阻止表单默认行为
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            //data： $('#form_reg').serialize()  用这个方法可以直接拿到name值
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //保存token
                localStorage.setItem('token', res.token)
                //页面跳转
                location.href = '/index.html'
            },
        })
    })
})
