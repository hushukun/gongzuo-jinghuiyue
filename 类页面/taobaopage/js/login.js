$(function () {
    $("#forms").attr({
        action: publicUrl + "uLogin"
    })
    $("#forms").ajaxForm(function (res) {
        if (res.code == 200) {
            alert("登陆成功")
            var data = res.data
            var username = data.username
            var avatar = data.avatar
            document.cookie = "username=" + username + ";path=/taobaopage/;"
            document.cookie = "avatar=" + avatar + ";path=/taobaopage/;"
            window.location.href = "../index.html"
        } else if (res.code == 400) {
            alert("账号密码不正确")
        }
    })
})
