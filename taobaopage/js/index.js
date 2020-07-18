$(function () {
    //搜索函数
    function inputFn() {
        searchValue = $("#inputValue").val()
        window.location.href = "views/search.html?goodsName=" + searchValue
    }
    // 搜索点击事件
    $("#clackSearch").click(function () {
        inputFn()
    })
    //回车键搜索
    $("#inputValue").keydown(function (e) {
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            //回车执行查询
            inputFn()
        }
    })
    //Banner轮播图
    var num = 0;
    function bannerFn() {
        $("#banner-img li").eq(num).fadeIn(500).siblings("li").fadeOut(500)
        $("#dots li").eq(num).addClass("active").siblings("li").removeClass("active")
    }
    $("#dots li").click(function () {
        num = $(this).index()
        bannerFn()
    })
    $("#next").click(function () {
        num++;
        if (num > $("#banner-img li").length - 1) {
            num = 0;
        }
        bannerFn()
    })
    var timer = setInterval(function () {
        $("#next").click()
    }, 3000)
    $(".banner").mouseenter(function () {
        clearInterval(timer)
    })
    $(".banner").mouseleave(function () {
        timer = setInterval(function () {
            $("#next").click()
        }, 3000)
    })

    //导航循环数据
    $.ajax({
        type: "get",
        url: publicUrl + "sys/goodsType/navigation",
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var dataList = res.data
                var naviGation = "<li><a href='index.html'>首页</a></li>";//顶部导航
                var starrs = ""; //左侧总数据html
                var navArr = "";//左侧分类导航标题
                var oneArr = "";//一级标题
                var twoArr = "";//二级标题
                var threeArr = ""//三级标题
                for (var i = 0; i < dataList.length; i++) {
                    navArr = "" //左侧分类导航标题
                    for (var j = 0; j < dataList[i].navigation_list.length; j++) {
                        navArr += `<a href="views/category.html?index=${i}&cid=${dataList[i].navigation_list[j].id}&size=999&id=${dataList[i].navigation_list[j].id}&level=levels">${dataList[i].navigation_list[j].typeName}</a>`
                    }
                    oneArr = "" //隐藏分类内容
                    for (var y = 0; y < dataList[i].navigation_list.length; y++) {
                        twoArr = ""
                        for (var z = 0; z < dataList[i].navigation_list[y].navigation_list.length; z++) {
                            threeArr = ""
                            for (var k = 0; k < dataList[i].navigation_list[y].navigation_list[z].navigation_list.length; k++) {
                                threeArr += `<a href="views/category.html?index=${i}&cid=${dataList[i].navigation_list[y].id}&size=999&id=${dataList[i].navigation_list[y].navigation_list[z].navigation_list[k].id}">${dataList[i].navigation_list[y].navigation_list[z].navigation_list[k].typeName}</a>`
                            }
                            twoArr += `<div>
                                            <h3>${dataList[i].navigation_list[y].navigation_list[z].typeName}</h3>
                                            <p>${threeArr}</p>
                                        </div>`
                        }
                        oneArr += `<section>
                                    <header>
                                        <div>
                                            <a href="views/category.html?id=${dataList[i].navigation_list[y].id}&index=${i}&cid=${dataList[i].navigation_list[y].id}&size=999&level=levels">
                                                ${dataList[i].navigation_list[y].typeName}
                                            </a>
                                        </div>
                                    </header>
                                    ${twoArr}
                                </section>`
                    }
                    starrs += `<li class="nav-item">
                                    <div class="navBlock">
                                        <div class="title">${navArr}</div>
                                    </div>
                                    <div class="navNone">
                                        <div class="navNone-title">
                                            ${oneArr}
                                        </div>
                                    </div>
                                </li>`
                }
                $(".nav").eq(0).html(starrs)
            }
        },
        error: function (res) {
            console.log(res)
        }
    })

    //判断是否登陆
    console.log(document.cookie)
    if (document.cookie) {
        console.log("yidenglu")
        var cookies = {}
        var data = document.cookie.replace(" ", "").split(";") //replace(" ", "")去掉所有空格
        for (var i = 0; i < data.length; i++) {
            var item = data[i].split("=")
            cookies[item[0]] = item[1]
        }
        console.log(cookies)
        $("#username").html("<h3 id='username'>您好！" + cookies.username + "</h3>")
        $("#removebtn").html("<button id='cookieBtn'>退出登录</button>")
        $("#login img").eq(0).attr({
            src: cookies.avatar
        })
        $("#cookieBtn").click(function () {
            $.removeCookie('username', { path: '/taobaopage/' })
            $.removeCookie('avatar', { path: '/taobaopage/' })
            window.location.href = 'views/login.html'
        })
    }
})