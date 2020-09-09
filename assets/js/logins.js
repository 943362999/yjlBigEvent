$(function () {
  $("#login-link").on("click", function () {
    $("#login-box").hide();
    $("#reg-box").show();
  });
  $("#login-reg").on("click", function () {
    $("#reg-box").hide();
    $("#login-box").show();
  });
  layui.form.verify({
    username: function (value) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return "用户名不能有特殊字符呦宝贝";
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'呦宝贝";
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "用户名不能全为数字呦宝贝";
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repassword: function (value) {
      if ($("#reg-psd").val() !== value) {
        return "密码不一致呦宝贝";
      }
    },
  });
  //注册请求--------------------
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    var username = $("#reg-username").val();
    var password = $("#reg-psd").val();

    console.log(username, password);
    var formdata = {
      username: username,
      password: password,
    };
    // 3. 发送请求
    $.post("http://ajax.frontend.itheima.net/api/reguser", formdata, function (
      res
    ) {
      // 4. 处理响应
      console.log(res);
      if (res.status === 1) {
        console.log(res.message);
      } else {
        console.log(res.message);
      }
      alert("什么逼玩应");
    });
  });
});
