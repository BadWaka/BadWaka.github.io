> 源码地址：https://github.com/BadWaka/blog-waka-by-vue

开发之前首先删去项目中无用的代码

#1. 样式相关处理
###1.1. 设置CSS Reset
不同浏览器上的默认样式都会有差别，所以要设置一下CSS Reset

因为这是一个全局的css文件，所以可以放在static目录下（static目录放置一些全局的静态资源文件）

删除static文件夹下没用的.gitkeep
> Git会忽略空的文件夹。如果你想版本控制包括空文件夹，根据惯例会在空文件夹下放置.gitkeep文件。其实对文件名没有特定的要求。一旦一个空文件夹下有文件后，这个文件夹就会在版本控制范围内。

在static文件夹下新建css文件夹，新建reset.css文件
访问http://cssreset.com/scripts/eric-meyer-reset-css/， 复制粘贴给出的CSS Reset代码

![](http://upload-images.jianshu.io/upload_images/1828354-cc71e66afa9b2950.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接着需要在html中引入这个css，因为是static下的静态资源，不能用webpack打包到bundle.js中，所以需要手动引入

![](http://upload-images.jianshu.io/upload_images/1828354-eb8a6ed320f2419c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 如果需要适配移动端浏览器，在head里加入meta标签，设置视口viewport宽度和缩放
```
  <!--适配移动设备-->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```


###1.2. 安装和配置sass-loader
因为我个人比较喜欢Sass，所以样式选用scss写
新建一个文件，准备愉快的写代码了

![](http://upload-images.jianshu.io/upload_images/1828354-4fa2d3e7667f578e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

但是编译发现报了这个错误

![can't resolve 'sass-loader'](http://upload-images.jianshu.io/upload_images/1828354-d4056384142d139e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

提示需要安装sass-loader
打开终端进入项目根目录
```
// 进入项目根目录
cd workspace/Vue/blog-waka-by-vue
// 安装sass-loader，作为开发依赖 
cnpm install --save-dev sass-loader
```
结果如图所示报了一个警告，需要前置依赖 node-sass 4.0.0 版本以上

![requires node-sass](http://upload-images.jianshu.io/upload_images/1828354-432092a83095c076.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

OK，那就安呗
```
cnpm install --save-dev node-sass
```
安装完成后重启一下服务ctrl+c，然后命令`npm run dev`

即可看到编译成功
可以愉快的写scss代码了

###1.3. 引入UI库
因为研究过Android开发，个人是Google Material Design的铁粉，所以很喜欢MaterialUI这个UI库
但是MaterialUI是React的，不是Vue，所以选用了基于Vue2.0开发的[Muse-UI](https://museui.github.io/#/install)

具体引入方法可看Muse-UI官方文档

这里简述一下
1. 在index.html中手动引入google的字体和图标
![引入google字体和图标](http://upload-images.jianshu.io/upload_images/1828354-8c71ea68c29a5b11.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 在src/main.js下引入Muse-UI
![](http://upload-images.jianshu.io/upload_images/1828354-5645bf27aa3f4347.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



#2. 数据mock，模拟后台数据
在根目录下新建data.json，作为模拟数据

![data.json](http://upload-images.jianshu.io/upload_images/1828354-36696bbe2636a275.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我的模拟数据是这样
```
{
  "articles": [
    {
      "_id": "1",
      "title": "从零开始，教你用Webpack构建React基础工程",
      "intro": "随着前端代码越来越多，越来越复杂，整个工程变得越来越难以管理。所以，前端工程化已是必然的趋势，已经是2016年了，还在用手动添加依赖吗？快来学习用构建工具来管理web项目吧。",
      "link": "http://www.jianshu.com/p/4df92c335617",
      "typeId": "1",
      "typeName": "webpack",
      "img": "http://upload-images.jianshu.io/upload_images/1828354-9205b1b29eb5b7a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
    },
    {
      "_id": "3",
      "title": "微信小程序经验分享",
      "intro": "小程序是一种新的开放能力，开发者可以快速地开发一个小程序。小程序可以在微信内被便捷地获取和传播，同时具有出色的使用体验。",
      "link": "http://www.jianshu.com/p/9839062bf199",
      "typeId": "3",
      "typeName": "微信小程序",
      "img": "http://upload-images.jianshu.io/upload_images/1828354-1b2d78ae8b73c1ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
    }
  ]
}
```

之后在build/dev-server.js中引入模拟数据并编写路由
```
// TODO 数据mock
var appData = require('../data.json');  // 拿到mock数据
var articles = appData.articles;  // 拿到文章列表数据

// 定义Express的路由，并编写接口
var apiRoutes = express.Router();

// 请求文章列表
apiRoutes.get('/articles', function (req, res) {
  // 返回给客户端json数据
  res.json({
    errorCode: 0,   // 错误码;0为正确
    data: articles    // 数据
  });
});

// 使用该路由；所有的路由都要加上/api，举个栗子：localhost:8080/api/articles
app.use('/api', apiRoutes);
```

![](http://upload-images.jianshu.io/upload_images/1828354-b8fae7cdcac2a88f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


重启服务`npm run dev`

浏览器中输入`http://localhost:8080/api/articles`即可看到返回的数据

![](http://upload-images.jianshu.io/upload_images/1828354-1950a7204e3c8e43.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 如果chrome浏览器中json不是格式化的，请在chrome商店下载jsonview这个插件

接下来就可以开发界面了。