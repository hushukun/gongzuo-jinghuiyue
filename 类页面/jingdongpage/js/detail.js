$(function () {
    function picture() {
        //图片放大镜效果
        var leftones = document.getElementById('imgda-wrap');//left父元素加了相对定位，改变获取offsetTop的值，不然出错
        var leftone = document.getElementById('left');
        var rightone = document.getElementById('right');
        var box = document.getElementById('box');
        var rimg = rightone.getElementsByTagName("img")[0];
        function getPosition(e) {
            var e = e || window.event; //实现兼容
            var summ = document.documentElement.scrollTop //滚动条距离顶部的距离
            window.onscroll = function () {
                summ = document.documentElement.scrollTop
            }
            //此处加上滚动条高度防止出现box上下偏移出现错误
            var top = e.clientY + summ - leftones.offsetTop - box.offsetHeight / 2;
            // console.log(leftone.offsetTop)
            //计算小图容器里的鼠标坐标(要减去最外层的偏移)
            var left = e.clientX - leftones.offsetLeft - box.offsetWidth / 2;
            //边界判断
            //获取小滑块最大纵向移动距离
            var maxtop = leftone.offsetHeight - box.offsetHeight;
            //获取小滑块最大横向移动距离
            var maxleft = leftone.offsetWidth - box.offsetWidth;
            // console.log(maxtop)
            // console.log(maxleft)
            var mintop = 0; //获取小滑块最小纵向移动距离
            var minleft = 0; //获取小滑块最大纵向移动距离
            var mvtop; //定义小滑块的纵向移动距离
            var mvleft; //定义小滑块的横向移动距离
            // 判断
            if (top < mintop) {
                box.style.top = mintop + "px";
                mvtop = mintop;
            } else if (top > maxtop) {
                box.style.top = maxtop + "px";
                mvtop = maxtop;
            } else {
                box.style.top = top + "px";
                mvtop = top;
            }
            if (left < minleft) {
                box.style.left = minleft + "px";
                mvleft = minleft
            } else if (left > maxleft) {
                box.style.left = maxleft + "px";
                mvleft = maxleft
            } else {
                box.style.left = left + "px";
                mvleft = left;
            }
            rimg.style.top = -mvtop * 2 + "px";
            rimg.style.left = -mvleft * 2 + "px";
        }
        //鼠标移动效果
        leftone.onmousemove = function (e) {
            var e = e || window.event; //判断事件源
            box.style.display = "block";
            getPosition(e);
            rightone.style.display = "block";
        }
        //鼠标移出效果
        leftone.onmouseleave = function (e) {
            var e = e || window.event; //判断事件源
            box.style.display = "none";
            rightone.style.display = "none";
        }

    }

    //改变右侧说明的定位left的值
    var leftimage = document.getElementById('left');
    var videoWrap = document.getElementById('video-wrap');
    document.getElementById('sarr').style.left = leftimage.offsetLeft + 400 + "px" //说明定位
    videoWrap.style.left = leftimage.offsetLeft + "px" //视频定位
    window.onresize = function () { //当窗口改变时实时改变
        document.getElementById('sarr').style.left = leftimage.offsetLeft + 400 + "px"
        videoWrap.style.left = leftimage.offsetLeft + "px"
    }

    //点击搜索跳转到搜索页面
    $("#inputValue").click(function () {
        window.location.href = "../views/search.html?goodsName="
    })




    //获取详情数据
    var searchs = window.location.search
    $.ajax({
        type: "get",
        url: publicUrl + "sys/goods/details" + searchs,
        success: function (res) {
            console.log(res)
            var rightStr = "" //产品列表数据
            if (res.code == 200) {
                //产品详情加详情图片列表
                var datas = res.data.goods
                var title = `<h1>${datas.goodsName}</h1>`
                $(".detail-title").eq(0).html(title)
                $(".product-img").eq(0).html(datas.goodsDetail)

                // 展示放大图片
                var imagelist = res.data.img_list
                var images = `<img src="${res.data.goods.goodsMainImgPath}" alt=""/>` //主图图片
                $(".left-image").eq(0).html(images)
                $(".rightcon").eq(0).html(images) //设置放大镜的图片
                picture()//执行放大镜图片函数
                for (var i = 0; i < imagelist.length; i++) {
                    images += `<img src="${imagelist[i].filePath}" alt="">`
                }
                $(".image-child").eq(0).html(images)


                //点击向右平移展示图片
                if ($("#image-child img").length > 5) { //图片长度大于5能点击
                    //点击向右平移next
                    $(".next").eq(0).click(function () {
                        $("#image-child").animate({
                            left: "-64px"
                        }, 200, function () {
                            $("#image-child img").eq(0).appendTo($("#image-child"));
                            $("#image-child").css("left", 0);
                        })
                    })
                    //点击向左平移prev
                    $(".prev").eq(0).click(function () {
                        $("#image-child img:last").prependTo($("#image-child"));
                        $("#image-child").css("left", "-64px");
                        $("#image-child").animate({
                            left: "0"
                        });
                    })
                } else {//如果图片长度小于5，去除点击样式
                    $(".icon").removeClass("icon")
                }

                if (!res.data.noVideo) { //说明有视频
                    $("#video-wrap").css({ //视频显示
                        display: "block"
                    })
                    $("#btnicon").css({ //按钮显示
                        display: "block"
                    })
                    var mp4 = res.data.video_list[0] //视频对象
                    $("#video").attr({
                        src: mp4.filePath  //视频路径
                    })
                }


                //鼠标移入切换图片效果 //视频隐藏效果
                var video = document.getElementById("video") //获取视频dom 
                $("#image-child img").mousemove(function () {
                    var src = $(this).attr("src")
                    $("#left img").eq(0).attr({ //图片路径切换
                        "src": src
                    })
                    $("#right img").eq(0).attr({//放大图片路径切换
                        "src": src
                    })
                    $("#video-wrap").css({ //视频隐藏
                        display: "none"
                    })
                    video.pause() //视频暂停
                })

                //视频图片
                $("#btnicon").click(function () {
                    $("#video-wrap").css({ //视频显示
                        display: "block"
                    })
                    video.play() //视频播放
                })
            }
        }
    })
})