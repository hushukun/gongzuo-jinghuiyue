<!-- 头部页面 -->
<template>
  <div class="header">
    <div class="header-top">
      <div class="top-text">
        <div class="top-left">
          <p>欢迎来到云智新松服务平台！</p>
        </div>
        <div class="top-right">
          <p>售后电话</p>
          <div>0000-0000</div>
        </div>
      </div>
    </div>
    <div class="header-nav">
      <div class="logo">
        <img :src="logopath" alt />
      </div>
      <div class="nav">
        <ul>
          <router-link to="/" tag="li" :class="getUrl=='/'?'active':''">
            首页
            <p></p>
          </router-link>
          <router-link to="/onex" tag="li" :class="getUrl=='/onex'?'active':''">
            1+X
            <p></p>
          </router-link>
          <router-link to="/product" tag="li" :class="getUrl=='/product'?'active':''">
            产品中心
            <p></p>
          </router-link>
          <router-link to="/system" tag="li" :class="getUrl=='/system'?'active':''">
            课程体系
            <p></p>
          </router-link>
          <router-link to="/cooperation" tag="li" :class="getUrl=='/cooperation'?'active':''">
            校企合作
            <p></p>
          </router-link>
          <router-link to="/education" tag="li" :class="getUrl=='/education'?'active':''">
            双元制教育
            <p></p>
          </router-link>
          <router-link to="/partner" tag="li" :class="getUrl=='/partner'?'active':''">
            合作伙伴
            <p></p>
          </router-link>
          <router-link to="/about-us" tag="li" :class="getUrl=='/about-us'?'active':''">
            关于我们
            <p></p>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      logopath: require("../assets/images/logo.png"),
      getUrl: "/"
    };
  },
  //方法集合
  methods: {},
  mounted() {
    this.getUrl = this.$route.path;
  },
  watch: {}
};
</script>
<style lang='less'>
.header {
  .header-top {
    background: #648ad2;
    .top-text {
      width: 1220px;
      height: 40px;
      margin: 0 auto;
      color: #fff;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      .top-left,
      .top-right {
        display: flex;
        align-items: center;
        // span {
        //   width: 1px;
        //   height: 14px;
        //   background: #fff;
        //   margin: 0 10px;
        // }
      }
      .top-right {
        div {
          margin-left: 20px;
        }
      }
    }
  }
  .header-nav {
    height: 60px;
    width: 1220px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .logo {
      img {
        height: 100%;
        width: 200px;
      }
    }
    .nav {
      ul {
        height: 100%;
        display: flex;
        align-items: center;
        li {
          margin: 0 15px;
          position: relative;
          cursor: pointer;
        }
        li:nth-child(2) {
          padding-top: 3px;
        }

        li.active {
          p {
            position: absolute;
            left: -10%;
            bottom: -5px;
            width: 120%;
            height: 2px;
            background: #648ad2;
          }
        }
      }
    }
  }
}
</style>