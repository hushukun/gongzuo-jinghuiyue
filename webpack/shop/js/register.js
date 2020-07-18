$(function () {
    //定义验证手机号的正则
    var phone = /^[1][35678][0-9]{9}$/
    $("#submit").click(function () {
        if (!phone.test($('input[name="Phone"]').eq(0).val())) { //验证手机号
            alert("手机号格式不正确")
            return false
        }
        if ($(".passwords").eq(0).val() != $(".passwords").eq(1).val()) { //验证密码是否一样
            alert("两次密码输入不一致")
            return false
        }
    })

    $("#forms").ajaxForm(function (res) {
        console.log(res)
        if (res.code == 200) {
            alert("注册成功")
            window.location.href = "../index.html"
        }
    })
})