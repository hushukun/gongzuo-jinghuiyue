if (document.cookie) {
    console.log("已登陆")
} else {
    console.log("未登录")
    window.location.href = "./login.html"
}