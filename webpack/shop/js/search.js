$(function () {
    //搜索函数
    function inputFn() {
        searchValue = $("#inputValue").val()
        window.location.href = "../views/search.html?goodsName=" + searchValue
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
    //数据循环请求产品列表
    function Ajax(current) {
        $.ajax({
            type: "get",
            url: `http://192.168.0.133:8080/ylbb/sys/goods/goodsList${window.location.search}&current=${current}&size=10`,
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    if (res.data.length > 0) {
                        var str = ""
                        for (let i = 0; i < res.data.length; i++) {
                            str += `<li>
                                    <div class="image">
                                        <a href="../views/detail.html?id=${res.data[i].id}">
                                            <img src="${res.data[i].goodsMainImgPath}" alt="" title="点击查看详情">
                                        </a>
                                    </div>
                                    <div class="title">
                                        <a href="../views/detail.html?id=${res.data[i].id}">${res.data[i].goodsName}</a>
                                    </div>
                                 </li>`
                        }
                        if (res.data.length % 5 > 0) {
                            for (let i = 0; i < 5 - res.data.length % 5; i++) {
                                str += `<li class="completion"></li>`
                            }
                        }
                        $(".main-list").eq(0).html(str)
                    } else {
                        $(".main-list").eq(0).html("<li class='noneData'>暂无此类商品</li>")
                    }
                }
            }
        })
    }
    Ajax(1) //执行请求第一页
    $.ajax({ //点击分页，先请求出总数居的个数
        type: "get",
        url: `http://192.168.0.133:8080/ylbb/sys/goods/goodsList${window.location.search}`,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                console.log(res.total)
                var currentAll = Math.ceil(res.total / 10) //分页的总数
                var current = 1
                $("#all").html(`共${currentAll}页`)
                $("#next").click(function () { //点击下一页
                    current++
                    if (current < currentAll + 1) {
                        Ajax(current)
                    } else {
                        current = current - 1
                    }
                    $("#several").html(`第${current}页`)
                })
                $("#prev").click(function () { //点击上一页
                    current--
                    if (current > 0) {
                        Ajax(current)
                    } else {
                        current = 1
                    }
                    $("#several").html(`第${current}页`)
                })
            }
        }
    })

    //头部分类页面
    var search = window.location.search.slice(1).split("&")
    var searchObj = {}
    for (var u = 0; u < search.length; u++) {
        var attribute = search[u].split("=")[0]
        var attributeValue = search[u].split("=")[1]
        searchObj[attribute] = attributeValue
    } //解析url，传入到点击筛选里
    $.ajax({
        type: "get",
        url: "http://192.168.0.133:8080/ylbb/sys/goods/goodsAttribute" + window.location.search,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                console.log(res.data)
                var datas = res.data.goods_attribute
                var titles = "" //总数据
                var titlesChild = "" //单个内容
                for (var i = 0; i < datas.length; i++) { //风格款式等
                    titlesChild = ""
                    for (var j = 0; j < datas[i].navigation_list.length; j++) {
                        titlesChild += `<li><a href="../views/search.html?goodsName=${searchObj.goodsName}&goodsAttribute=${datas[i].navigation_list[j].id}">${datas[i].navigation_list[j].typeName}</a></li>`
                    }
                    titles += `<div class="nav-item">
                                    <p class="title">${datas[i].typeName}:</p>
                                    <ul>${titlesChild}</ul>
                                    <button class="fold-up">展开<i class="iconfont icon-zhankai"></i></button>
                                </div>`
                }
                titlesChild = ""
                for (var n = 0; n < res.data.goods_type.length; n++) { //分类
                    titlesChild += `<li><a href="../views/search.html?goodsName=${searchObj.goodsName}&goodsType=${res.data.goods_type[n].id}">${res.data.goods_type[n].goodsTypeName}</a></li>`
                }
                titles += `<div class="nav-item">
                                <p class="title">分类:</p>
                                <ul>${titlesChild}</ul>
                                <button class="fold-up">展开<i class="iconfont icon-zhankai"></i></button>
                            </div>`
                $("#nav").html(titles)

                $(".nav-item ul").map(function (index) { //判断是否显示展开按钮
                    if ($(".nav-item ul").eq(index).find("li").length <= 9) {
                        $(this).siblings(".fold-up").css({
                            visibility: "hidden"
                        })
                    }
                })
                $(".nav-item .fold-up").click(function () { //点击展开或折叠
                    if ($(this).text() == "展开") {
                        $(this).siblings("ul").css({
                            height: "auto"
                        })
                        $(this).html('<div class="fold-up">收起<i class="iconfont icon-shouqi"></i></div>')
                    } else {
                        $(this).siblings("ul").css({
                            height: "30px"
                        })
                        $(this).html('<div class="fold-up">展开<i class="iconfont icon-zhankai"></i></div>')
                    }
                    $("#main").attr("style", "") //先清理固定高度
                    if ($("#search").height() <= window.innerHeight) { //防止底部footer向上偏移
                        $("#main").height(window.innerHeight - 101 - $("#header").height())
                    } else {
                        $("#main").attr("style", "")
                    }
                })
            }
        }
    })
    $(document).ajaxStop(function () { //所有ajax加载完毕之后执行的方法
        if ($("#search").height() < window.innerHeight) { //防止底部footer向上偏移
            $("#main").height(window.innerHeight - 101 - $("#header").height())
        } else {
            $("#main").attr("style", "")
        }
        $(".footer").css({
            display: "block"
        })
        $(".paging").css({
            visibility: "visible"
        })
    });
})