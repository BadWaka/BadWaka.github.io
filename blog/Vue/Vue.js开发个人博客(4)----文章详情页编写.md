> 源码地址：https://github.com/BadWaka/blog-waka-by-vue

读取服务器上的一篇Markdown格式的文章，并展示。
仿简书自定义Markdown样式。

上图

![](http://upload-images.jianshu.io/upload_images/1828354-51b807e270470f41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](http://upload-images.jianshu.io/upload_images/1828354-922bf16de6fc7c3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#难点
1. node.js读取文件
2. Markdown转换至HTML，不同
3. 如何自定义好看的Markdown样式
4. 如何让Markdown代码高亮

#开发步骤
###1. 设计mock数据
在根目录放置一篇Markdown文章
![](http://upload-images.jianshu.io/upload_images/1828354-1e634f8d9714667e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在build/dev-server.js中编写文章详情接口，这里是假数据，所以接口名就直接写死了
```
// 因为要读取.md文件，所以引入文件读取模块fs
var fs = require('fs');

// 请求具体的某一篇文章
apiRoutes.get('/article/1', function (req, res) {
  // 文件路径
  var mdPath = path.join(__dirname, '../article1.md');
  fs.readFile(mdPath, {
    encoding: 'utf-8'
  }, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    var mdStr = data;
    // console.log('mdStr = ' + mdStr);
    res.json({
      errorCode: 0,
      data: mdStr
    });
  });
});
```
###2. 编写文章详情界面 ArticleDetail.vue

![ArticleDetail.vue](http://upload-images.jianshu.io/upload_images/1828354-3fc1c47aea2ea999.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

代码如下：
```
// ArticleDetail.vue
<template>
  <section class="page">
    <!--顶部工具栏-->
    <mu-appbar class="app-bar" title="从零开始，教你用Webpack构建React基础工程">
      <!--返回按钮-->
      <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
      <!--右侧菜单-->
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="菜单 1"/>
        <mu-menu-item title="菜单 2"/>
        <mu-menu-item title="菜单 3"/>
        <mu-menu-item title="菜单 4"/>
        <mu-menu-item title="菜单 5"/>
      </mu-icon-menu>
    </mu-appbar>

    <!--文章详情-->
    <mu-paper class="article" :zDepth="2">
      <!--使用v-html输出纯HTML-->
      <div class="markdown" v-html="articleContent"></div>
    </mu-paper>
  </section>
</template>

<script>

  // 引入highlight.js来将代码块高亮
  // 因为文件夹名最好不要有. 所以叫highlightjs，其实它们是一样的，只不过highlightjs的版本略低
  // highlight.js模块的版本是9.9.0
  // highlightjs模块的版本是9.8.0
  import highlightjs from 'highlightjs';

  // 引入marked，用来将Markdown转换成HTML
  import marked from 'marked';
  // 配置marked
  marked.setOptions({
    // 配置高亮
    highlight: function (code, lang, callback) {
      return highlightjs.highlightAuto(code).value;   // 这里highlightjs会自动给代码增加类
    }
  });

  export default {
    data () {
      return {
        articleContent: ''
      }
    },
    methods: {
      // 后退
      back () {
        window.history.back();
      },
      // 异步请求
      request () {

      }
    },
    // Vue实例创建之后被调用
    created () {
      this.$http.get('/api/article/1').then(response => {
        console.log(response);
        // 拿到数据
        let mdData = response.body.data;  // md格式数据
        mdData = mdData.replace(/#/g, '# ');  // 因为简书里的#后接文字是可以被识别的，但是marked必须# 后接文字才可以被识别
        let htmlData = marked(mdData);    // html格式数据
        console.log(htmlData);
        this.articleContent = htmlData;
      }, response => {  // 请求失败
        console.log(response);
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  // 引入颜色css
  @import "../../common/css/color.scss";

  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
  }

  .app-bar {
    background-color: $blue500;
  }

  .article {
    width: 90%;
    margin-top: 24px;
    padding: 48px;
  }

  .markdown {
    width: 100%;
  }
</style>
```