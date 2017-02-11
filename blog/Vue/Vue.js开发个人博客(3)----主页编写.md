> 源码地址：https://github.com/BadWaka/blog-waka-by-vue

上图

![](http://upload-images.jianshu.io/upload_images/1828354-95fc8c23e305e29d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

点击左上角会弹出侧滑菜单，侧滑菜单里做类别的分类

![](http://upload-images.jianshu.io/upload_images/1828354-e340b52cbe322574.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

点击右上角跳转到GitHub
点击具体的文章项跳转到具体的文章详情

**设计思路是展现全部文章列表，后续会做分页处理。**

#难点
1. vue-router的使用，官方推荐的router插件，GitHub: https://github.com/vuejs/vue-router ，项目里仅仅使用了vue-router最简单的部分，更加高级的用法还待研究

2. vue-resource的使用，官方推荐的网络请求插件，GitHub: https://github.com/pagekit/vue-resource

3. 父组件向子组件传递数据，props的使用

4. 分页（未完成）

处于精力和时间的考虑，详细步骤省略，只贴代码：

#开发步骤
###1. 页面主页 Index.vue

![Index.vue](http://upload-images.jianshu.io/upload_images/1828354-5d8e2cf98d013319.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
// Index.vue
<template>
  <!--index页整个容器-->
  <section>

    <!--顶部工具栏 使用fixed固定在顶部-->
    <div class="top">
      <!--左侧抽屉开关-->
      <mu-icon-button @click="drawerToggle">
        <i class="material-icons">list</i>
      </mu-icon-button>
      <!--右侧GitHub链接-->
      <mu-icon-button @click="github">
        <i class="iconfont icon-github"></i>
      </mu-icon-button>
    </div>

    <!--点击抽屉开关打开的侧边菜单-->
    <mu-drawer right :open="isDrawerOpen" @close="drawerToggle">
      <!--标题栏-->
      <mu-appbar class="drawer-header" title="类别"/>
      <mu-list>
        <!--类别List-->
        <mu-list-item v-for="type in typeArray" :title="type"/>
        <!--关闭栏-->
        <mu-list-item @click="drawerToggle" title="关闭"/>
      </mu-list>
    </mu-drawer>

    <!--头部-->
    <header>
      <!--头像-->
      <div class="avatar"></div>
      <!--提示语 暂时写死，以后会从服务器取得-->
      <div class="welcome">Welcome to waka's blog</div>
    </header>

    <!--文章列表-->
    <section class="articles">
      <!--引用子组件 ArticleItem 注意html代码中需要将驼峰转化成小写加短横线的形式-->
      <!--artcile 是父组件Index.vue传递给子组件ArticleItem.vue的props-->
      <article-item v-for="article in articles" :article="article"></article-item>
    </section>

  </section>
</template>

<script>

  // 引入ArticleItem组件；这里可以直接使用components而不需要../../components
  // 是因为在build/webpack.base.conf.js中alias字段里定义了别名
  import ArticleItem from 'components/index/article-item/ArticleItem.vue';

  export default {
    // 包含的组件
    components: {
      ArticleItem
    },
    // 数据
    data () {
      return {
        articles: {}, // 文章数据，请求获得
        isDrawerOpen: false,  // 侧边栏开关
        typeArray: ['HTML', 'CSS', 'Sass', 'Java Script', 'ECMAScript', 'Vue.js', 'React', 'React Native', '微信小程序', 'Node.js', 'MongoDB', 'macOS', 'Linux']  // 类型数组，mock数据，后续会从服务器上取得
      }
    },
    // 实例创建后被调用；生命周期钩子
    created () {
      // 请求文章列表数据
      this.$http.get('/api/articles').then(response => {  // 请求成功
        if (response.status !== 200) {
          // 输出错误信息
          this.articles = 'status = ' + response.status + ' errorCode = ' + response.body.errorCode;
          return;
        }
        this.articles = response.body.data;
      }, response => {  // 请求失败，因为mock数据没有请求失败，所以暂时没有处理
        this.articles = '请求失败';
      });
    },
    // 方法
    methods: {
      // 开关抽屉
      drawerToggle () {
        this.isDrawerOpen = !this.isDrawerOpen;
      },
      // 跳转到GitHub
      github () {
        window.open('https://github.com/BadWaka');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  // 引入颜色css
  @import "../../common/css/color.scss";

  .top {
    height: 64px;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #fff;
    background-color: $blue500;
  }

  .drawer-header {
    background-color: $blue500;
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 440px;
    color: #fff;
    background-color: $blue500;

    .avatar {
      height: 150px;
      width: 150px;
      margin-top: 100px;
      background: url(http://img.hb.aicdn.com/19dd42725e125bb7424785afbddeee41d5eb13931b097-evWO7z_fw658) center no-repeat;
      background-size: cover;
      border-radius: 50%;
      box-shadow: 5px 10px 10px $blue800;
    }

    .welcome {
      margin-top: 20px;
      font-size: 24px;
      font-family: "Comic Sans MS";
    }
  }

  /*文章列表*/
  .articles {
    margin-top: -100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
```

###2. 子组件 文章项 ArticleItem.vue

![ArticleItem.vue](http://upload-images.jianshu.io/upload_images/1828354-bb5709895d16c361.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
// ArticleItem.vue
<template>
  <!--使用<router-link>包裹，因为这里需要改变路由，点击后跳转到文章详情页-->
  <!--这里还不完整，因为以后为了区分文章，还需要加入文章id,因为暂时是做样式，所以忽略-->
  <router-link class="wrapper" to="/articleDetail">
    <!--使用Muse-UI的纸张控件-->
    <mu-paper class="wrapper2" :zDepth="2">
      <!--标题-->
      <div class="title">{{article.title}}</div>
      <!--简介-->
      <div class="intro">{{article.intro}}</div>
      <!--额外信息-->
      <div class="extra">
        <span class="type">{{article.typeName}}</span>
      </div>
    </mu-paper>
  </router-link>
</template>

<script>
  export default {
    // 定义从父控件继承的props
    props: {
      // 规定属性article的类型
      article: {
        type: Object
      }
    },
    data () {
      return {
        article: this.article   // 这里要加这个，因为不加的话，html里使用article会报错
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .wrapper {
    width: 90%;
    margin-bottom: 20px;
    color: #000;

    .wrapper2 {
      padding: 24px;

      .title {
        font-size: 24px;
        margin-bottom: 24px;
      }

      .intro {
        font-size: 16px;
        margin-bottom: 16px;
      }

      .type {
        font-size: 12px;
        margin-bottom: 16px;
      }
    }

  }

</style>

```