$(function () {
    $("#forms").attr({
        action: publicUrl + "uLogin"
    })
    console.log($("#forms").attr("action"))
    $("#forms").ajaxForm(function (res) {
        console.log(res)
        if (res.code == 200) {
            alert("登陆成功")
            var data = res.data
            var username = data.username
            var avatar = data.avatar
            document.cookie = "username=" + username + ";path=/ylbbpage/;"
            document.cookie = "avatar=" + avatar + ";path=/ylbbpage/;"
            window.location.href = "../index.html"
        } else if (res.code == 400) {
            alert("账号密码不正确")
        }
    })
})
