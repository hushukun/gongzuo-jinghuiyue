$(function () {
    //搜索函数
    function inputFn() {
        searchValue = $("#inputValue").val()
        window.location.href = "search.html?goodsName=" + searchValue
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


    //左侧详情数据
    $.ajax({
        type: "get",
        url: "http://192.168.0.133:8080/ylbb/sys/goodsType/navigation",
        success: (res) => {
            if (res.code == 200) {
                console.log(res.data)
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
                var newgeturl = `nav=true&cid=${searchObj.cid}`
                if (searchObj.nav) { //判断是否点击nav导航过来
                    for (var j = 0; j < res.data.length; j++) { //根据前台传的id判断得到相应的值
                        if (res.data[j].id == searchObj.cid) {
                            console.log()
                            categortData = res.data[j].navigation_list
                        }
                    }
                    var leftStr = "" //右边分类数据
                    var twoChild = "" //二级数据
                    var threeChild = "" //三级数据
                    for (var k = 0; k < categortData.length; k++) {
                        twoChild = ""
                        for (var z = 0; z < categortData[k].navigation_list.length; z++) {
                            threeChild = ""
                            for (var n = 0; n < categortData[k].navigation_list[z].navigation_list.length; n++) {
                                threeChild += `<li><a href="../views/category.html?${newgeturl}&id=${categortData[k].navigation_list[z].navigation_list[n].id}">${categortData[k].navigation_list[z].navigation_list[n].typeName}</a></li>`
                            }
                            twoChild += `<div class="nav-child">
                                            <h3>${categortData[k].navigation_list[z].typeName}</h3>
                                            <ul>${threeChild}</ul>
                                        </div>`
                        }
                        leftStr += `<div class="nav-title">${categortData[k].typeName}&nbsp;&nbsp;&nbsp;&nbsp;</div>${twoChild}`
                    }
                    $(".nav").eq(0).html(leftStr)
                } else { //点击左侧分类导航过来
                    // 根据索引判断，获取相应的值
                    for (var j = 0; j < res.data.length; j++) { //根据索引的到对应的
                        if (searchObj.index == j) {
                            // categortData = res.data[j]
                            for (var k = 0; k < res.data[j].navigation_list.length; k++) {
                                if (res.data[j].navigation_list[k].id == searchObj.cid) {
                                    categortData = res.data[j].navigation_list[k]
                                }
                            }
                            break;
                        }
                    }
                    //获取当前的数据索引和分类的id,点击左边时传入
                    var newgeturl = `index=${searchObj.index}&cid=${searchObj.cid}`
                    var leftStr = "" //右边分类数据
                    var leftStrChild = ""
                    for (var z = 0; z < categortData.navigation_list.length; z++) {
                        leftStrChild = ""
                        for (var m = 0; m < categortData.navigation_list[z].navigation_list.length; m++) {
                            leftStrChild += `<li><a href="../views/category.html?${newgeturl}&id=${categortData.navigation_list[z].navigation_list[m].id}">${categortData.navigation_list[z].navigation_list[m].typeName}</a></li>`
                        }
                        leftStr += `<div class="nav-child">
                                <h3>${categortData.navigation_list[z].typeName}</h3>
                                <ul>${leftStrChild}</ul>
                            </div>`
                    }
                    $(".nav").eq(0).html(leftStr)

                }
                //设定一下左边导航的高度
                $(".left-main").css({
                    "height": $(".nav").eq(0).height() + 100
                })
            }
        }
    })


    //请求产品列表
    var searchs = window.location.search
    $.ajax({
        type: "get",
        url: "http://192.168.0.133:8080/ylbb/sys/goods/navigation/goods" + searchs,
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
                    $(".right-main").eq(0).html("<div style='font-size: 24px;text-align: center;margin-top: 20px;'>暂无商品</div>")
                }
            }
        }
    })

    $(document).ajaxStop(function () { //所有ajax加载完毕之后执行的方法
        //判断防止出现底部footer跑到上面
        if ($(".category").height() < window.innerHeight) {//判断防止出现底部footer跑到上面
            $(".main").height(window.innerHeight - $(".header").height() - $(".footer").height() - 60)
            //60为header的上下padding
        }
        $(".footer").css({
            display: "block"
        })
    });

})