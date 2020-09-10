$(function () {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            var resname = res.data.nickname || res.data.username
            $('#welcome').html(resname)
            if (res.data.user_pic) {

                $('.layui-nav-img').attr('src', res.data.user_pic).show()
                $('.text-avatar').hide()
            } else {
                // 反之
                $('.layui-nav-img').hide()

                $('.text-avatar').html(resname[0].toUpperCase())
            }
        },
    })

    // 用户退出
    $('#btn-logout').click(function (e) {
        e.preventDefault()

        // 确认框
        layui.layer.confirm('is not?', {
            icon: 3,
            title: '提示'
        }, function (
            index
        ) {
            //do something
            // 取消
            // 确定=>
            //2. 清空token
            window.localStorage.removeItem('token')
            // 1. 跳转登录
            window.location.href = '/login.html'
            layer.close(index)
        })
    })
})