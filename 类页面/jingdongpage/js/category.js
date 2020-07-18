$(function () {
    //搜索函数
    function inputFn() {
        searchValue = $("#inputValue").val()
        window.location.href = "../views/search.html?goodsName=" + searchValue
    }
    // 搜索点击事件
    $("#buttonFn").click(function () {
        inputFn()
    })
    //回车键搜索
    $("#inputValue").keydown(function (event) {
        var e = event || window.event;
        var code = e.keyCode || e.which || e.charCode;
        if (code == 13) {
            //回车执行查询
            inputFn()
        }
    })

    //banner轮播图
    var num = 0;
    function bannerFn() {
        $("#banner-img li").eq(num).fadeIn(500).siblings("li").fadeOut(500)
        $("#dots li").eq(num).addClass("active").siblings("li").removeClass("active")
    }
    $("#dots li").mouseenter(function () {
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
    $("#banner").mouseenter(function () {
        clearInterval(timer)
    })
    $("#banner").mouseleave(function () {
        timer = setInterval(function () {
            $("#next").click()
        }, 3000)
    })

    //左侧详情分类数据
    $.ajax({
        type: "get",
        url: publicUrl + "sys/goodsType/navigation",
        success: function (res) {
            if (res.code == 200) {
                //解析url地址
                var search = window.location.search.slice(1).split("&")
                var searchObj = {}
                for (var u = 0; u < search.length; u++) {
                    var attribute = search[u].split("=")[0]
                    var attributeValue = search[u].split("=")[1]
                    searchObj[attribute] = attributeValue
                }
                console.log(searchObj)
                var categortData = ""
                //获取当前的数据的id,点击左边三级时时传入
                var newgeturl = `index=${searchObj.index}&cid=${searchObj.cid}`
                // 根据索引判断，获取相应的值
                for (var j = 0; j < res.data.length; j++) { //根据索引的到对应的
                    if (searchObj.index == j) {
                        // categortData = res.data[j]
                        for (var k = 0; k < res.data[j].navigation_list.length; k++) {
                            if (res.data[j].navigation_list[k].id == searchObj.cid) {
                                categortData = res.data[j].navigation_list[k].navigation_list
                            }
                        }
                        break;
                    }
                }
                console.log(categortData)
                var leftStr = "" //右边分类数据
                var leftStrChild = ""
                for (var i = 0; i < categortData.length; i++) {
                    leftStrChild = ""
                    for (var z = 0; z < categortData[i].navigation_list.length; z++) {
                        leftStrChild += `<a href="../views/category.html?${newgeturl}&id=${categortData[i].navigation_list[z].id}"  title="${categortData[i].navigation_list[z].typeName}">${categortData[i].navigation_list[z].typeName}</a>`
                    }
                    leftStr += `<div class="nav-child">
                                    <h3>${categortData[i].typeName}</h3>
                                    <div>${leftStrChild}</div>
                                </div>`
                }
                $(".nav").eq(0).html(leftStr)
            }
        }
    })


    //请求产品列表
    var searchs = window.location.search
    $.ajax({
        type: "get",
        url: publicUrl + "sys/goods/navigation/goods" + searchs,
        success: function (res) {
            console.log(res)
            var datas = null
            var rightStr = "" //产品列表数据
            if (res.code == 200) {
                datas = res.data
                if (datas.length > 0) {
                    for (var q = 0; q < datas.length; q++) {
                        rightStr += `<li>
                                <div class="data">
                                <a href="detail.html?id=${datas[q].id}">
                                    <div>
                                        <img src="${datas[q].goodsMainImgPath}" alt="">
                                    </div>
                                    <p>${datas[q].goodsName}</p>
                                </a>
                                </div>
                            </li>`
                    }
                    if (datas.length % 4 > 0) {
                        for (let i = 0; i < 4 - datas.length % 4; i++) {
                            rightStr += `<li class="completion"></li>`
                        }
                    }
                    $(".shop-warp").eq(0).html(rightStr)
                } else {
                    $(".product").eq(0).html("<div style='font-size: 24px;text-align: center;margin-top: 20px;'>暂无商品</div>")
                }
            }
        }
    })

    $(document).ajaxStop(function () { //所有ajax加载完毕之后执行的方法
        //判断防止出现底部footer跑到上面
        if ($(".category").height() < window.innerHeight) {//判断防止出现底部footer跑到上面
            $(".category").height(window.innerHeight - 40)
            //60为header的上下padding
        }
        $(".footer").css({
            display: "block"
        })
    });
})