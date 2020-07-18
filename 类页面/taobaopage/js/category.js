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
    $("#inputValue").keydown(function (e) {
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            //回车执行查询
            inputFn()
        }
    })
    //导航分类数据
    $.ajax({
        type: "get",
        url: publicUrl + "sys/goodsType/navigation",
        success: function (res) {
            console.log(res)
            //解析url地址
            var search = window.location.search.slice(1).split("&")
            var searchObj = {}
            for (var u = 0; u < search.length; u++) {
                var attribute = search[u].split("=")[0]
                var attributeValue = search[u].split("=")[1]
                searchObj[attribute] = attributeValue
            }
            console.log(searchObj)
            var categortData = "" //循环的数据
            for (var j = 0; j < res.data.length; j++) { //根据索引的到对应的数据
                if (searchObj.index == j) {
                    for (var k = 0; k < res.data[j].navigation_list.length; k++) {
                        if (res.data[j].navigation_list[k].id == searchObj.cid) { //根据分类id找到对应的数据
                            categortData = res.data[j].navigation_list[k].navigation_list
                            break;
                        }
                    }
                    break;
                }
            }
            //把数据渲染到分类导航上
            var array = "" //总数据
            var sarr = "" //单个数据
            //获取当前的数据索引和分类的id,点击左边时传入
            var newgeturl = `index=${searchObj.index}&cid=${searchObj.cid}`
            for (var i = 0; i < categortData.length; i++) {
                sarr = ""
                for (let z = 0; z < categortData[i].navigation_list.length; z++) {
                    sarr += `<a href="../views/category.html?${newgeturl}&size=999&id=${categortData[i].navigation_list[z].id}">${categortData[i].navigation_list[z].typeName}</a>`
                }
                array += `<li class="item">
                            <h5>${categortData[i].typeName}</h5>
                            ${sarr}
                        </li>`
            }
            console.log(categortData)
            $(".item-wrap").eq(0).html(array)
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
            var mainList = "" //产品列表数据
            if (res.code == 200) {
                datas = res.data
                if (datas.length > 0) {
                    for (var q = 0; q < datas.length; q++) {
                        mainList += `<li>
                                    <div class="image">
                                        <a href="../views/detail.html?id=${datas[q].id}">
                                            <img src="${datas[q].goodsMainImgPath}" alt="" title="点击查看详情">
                                        </a>
                                    </div>
                                    <div class="title">
                                        <a href="../views/detail.html?id=${datas[q].id}">${datas[q].goodsName}</a>
                                    </div>
                                </li>`
                    }
                    if (datas.length % 5 > 0) {
                        for (let i = 0; i < 5 - datas.length % 4; i++) {
                            mainList += `<li class="completion"></li>`
                        }
                    }
                    $(".main-list").eq(0).html(mainList)
                } else {
                    $(".main").eq(0).html("<div style='font-size: 24px;text-align: center;padding-top: 20px;'>暂无商品</div>")
                }

            }
        }
    })
    $(document).ajaxStop(function () {
        //判断防止出现底部footer跑到上面
        if ($(".category").height() < window.innerHeight) {//判断防止出现底部footer跑到上面
            $(".main").height(window.innerHeight - $(".nav-wrap").height() - $(".header").height() - $(".footer").height() - 40)
        } else {
            $("#main").attr("style", "")
        }
        $(".footer").css({
            display: "block"
        })
    })
})