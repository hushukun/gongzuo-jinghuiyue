<!-- 底部导航组件 -->
<template>
  <div class="footer">
    <div class="f-nav">
      <div>
        <ul>
          <li>首页</li>
          <li>1+X</li>
          <li>产品中心</li>
          <li>课程体系</li>
          <li>校企合作</li>
          <li>双元制教育</li>
          <li>合作伙伴</li>
          <li>关于我们</li>
        </ul>
      </div>
      <div>
        <i class="iconfont icon-telephone"></i>
        <i class="iconfont icon-gongzhonghao"></i>
        <i class="iconfont icon-xinxi"></i>
        <i class="iconfont icon-weibo"></i>
      </div>
    </div>
    <div class="link">
      <span>友情链接：</span>
      <span>链接1</span>
      <span>链接2</span>
      <span>链接3</span>
    </div>
    <div class="record">
      <span>备案号：</span>
      <span>备案号1</span>
      <span>备案号2</span>
      <span>备案号3</span>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {}
};
</script>
<style lang='less'>
.footer {
  height: 270px;
  background-color: #313131;
  .f-nav {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    div:first-child {
      ul {
        display: flex;
        color: #7c7c7c;
        li {
          margin: 0 15px;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
        li:nth-child(1) {
          margin-left: 0;
        }
        li:nth-child(2) {
          padding-top: 3px;
        }
      }
    }
    div:last-child {
      i {
        color: #7c7c7c;
        font-size: 22px;
        margin-right: 40px;
      }
      i:last-child {
        margin: 0;
      }
    }
  }
  .link,
  .record {
    display: flex;
    width: 1200px;
    margin: 30px auto 0;
    span {
      font-size: 14px;
      color: #7c7c7c;
      margin-right: 15px;
    }
  }
  .record {
    border-top: 1px solid #535353;
    span {
      line-height: 66px;
    }
  }
}
</style>