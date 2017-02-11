> 源码地址：https://github.com/BadWaka/blog-waka-by-vue

本博客使用现代化的前端开发流程
即Vue.js+webpack构建个人博客单页应用

let's do it.

#1. 安装vue-cli命令行工具
vue-cli是官方的命令行工具，我们用它生成一个配置完好的项目，这样我们就能直接上手开发了，而不用配置一大堆webpack相关的东西。

> Vue.js 提供一个[官方命令行工具](https://github.com/vuejs/vue-cli)，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目：

命令行输入：
```
// 国内推荐使用cnpm，要不安装的太慢了
npm install -g vue-cli
```
![安装完成](http://upload-images.jianshu.io/upload_images/1828354-4bc5ee3f0c7e9058.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#2. 创建基于webpack的基础工程
进入你要创建项目的目录，

![比如我的是workspace/Vue](http://upload-images.jianshu.io/upload_images/1828354-9ba38bafb36f8773.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
输入以下命令
```
// 最后一个参数是项目名称，写自己的即可
vue init webpack blog-waka-by-vue
```
输入完成后按回车，会提示确认一些东西如下，默认一路回车就行了：
> 现在默认使用的是Vue2.x，如果要使用Vue1.x可以输入`vue init webpack#1.0 blog-waka-by-vue`

![要确认的东西](http://upload-images.jianshu.io/upload_images/1828354-65e94b82d9a106fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

创建完成以后进入该项目目录，安装所需依赖，启动服务
```
// 进入该项目目录
cd blog-waka-by-vue
// 安装所需依赖
npm install
// 启动服务
npm run dev
```
浏览器应该会自动弹出来，不弹出来也没有关系，浏览器中输入`localhost:8080`，即可看到跑起来的工程

![](http://upload-images.jianshu.io/upload_images/1828354-fcf9ed540b7fc89d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

用喜欢的编辑器打开工程即可开始开发工作，我比较喜欢WebStorm，但是WebStorm打开项目的时候很大几率会卡死，因为依赖的node_modules太多的缘故，不知是否有人碰到过同样的问题

下图为目录结构，开发时只关注src目录即可
![目录结构](http://upload-images.jianshu.io/upload_images/1828354-46294c78f2dd1387.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#3. ESLint格式不规范导致编译错误的解决方法
开发过程中因为安装了ESLint，所以当格式不规范时会遇到编译不通过的情况，比如：

我在src/main.js 下强迫症加了个分号
![](http://upload-images.jianshu.io/upload_images/1828354-3423eb1081796b80.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
然后他就报错了...
![错误截图](http://upload-images.jianshu.io/upload_images/1828354-9ce091484aa682ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

解决方案很简单，错误信息有个关键字，如图：
![semi](http://upload-images.jianshu.io/upload_images/1828354-5e1e2a53c33fa213.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
在根目录 .eslintrc.js 文件的 rules 字段下加一行
```
// 0代表不做限制，错误提示有一个网页链接，可打开看到ESLint对该属性做的详细规定
'semi':0
```
即可，如图：

![](http://upload-images.jianshu.io/upload_images/1828354-6286a1ebf877427e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

修改 .eslintrc.js 热更新不会生效，所以需要重启服务

![重启服务](http://upload-images.jianshu.io/upload_images/1828354-aa0c536f6ace9da5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

重启服务即可看到编译成功，网页显示正常

其他ESLint的编译错误也可通过该方式解决，这种方式是一种简单省事的做法，也可以通过点开ESLint错误的链接查看ESLint对特定属性定义的规则，从而更加严禁的使用ESLint。


![复制该链接至浏览器即可进入ESLint官方文档](http://upload-images.jianshu.io/upload_images/1828354-40ce34ed6568fa9f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/1828354-f1662fe09c14fc7e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)