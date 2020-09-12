$(function () {
    layui.form.verify({
        len: [/^\S{6,12}$/, '长度必须6到12位，不能有空格'],

        // 验证新密码不能和原密码相同
        diff: function (value) {
            // value 表示新密码
            // 获取原密码
            var oldPwd = $('[name="oldPwd"]').val()
            if (value === oldPwd) {
                return '新密码不能和原密码相同'
            }
        },
        //验证新密码和确认密码是否相同
        same: function (value) {
            console.log(value);
            var newPwd = $('[ name="newPwd"]').val()
            if (value !== newPwd) {

                return "两次输入的密码不一致"
            }
        }
    })
    $('#changePwd').click(function (e) {
        e.preventDefault()
        $.post('/my/updatepwd', $('#formInfo').serialize(), function (res) {
            if (res.status === 0) {
                $('button[type="reset"]').click()

                layer.msg(res.message)

            } else {
                layer.msg(res.message)
            }


        })


    })




})