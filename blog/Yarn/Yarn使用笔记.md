![](http://upload-images.jianshu.io/upload_images/1828354-be0c1fb0252963ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> Yarn官网：https://yarnpkg.com/
Yarn Github地址：https://github.com/yarnpkg/yarn

#前言
作为Facebook出品的React全家桶的使用者，没有理由不去试试Facebook最新的包管理器**Yarn**。

#安装Yarn
> 官方安装文档：https://yarnpkg.com/en/docs/install

####windows下安装方法

前提：不论哪种安装方法，都需要安装**node.js**，具体可以参考这里[[安装node.js](http://www.jianshu.com/p/0299e8f36976)](http://www.jianshu.com/p/0299e8f36976)
- 方法一，下载安装包：直接下载`.msi`安装文件安装，[下载地址](https://yarnpkg.com/latest.msi)
- 方法二，使用Chocolatey进行安装：[Chocolatey](https://chocolatey.org/install)是一个windows下的包管理器，可以通过在命令行下输入以下命令直接安装Yarn
```
choco install yarn
```
这里直接通过安装包安装 

![安装成功](http://upload-images.jianshu.io/upload_images/1828354-9319833b9b0719d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

默认情况下，Yarn已经配置好环境变量

![](http://upload-images.jianshu.io/upload_images/1828354-e3518c5310e5e309.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果没有自动配置，在`path`后手动添加即可（注意前面如果没有分号要手动加上分号）

在cmd中终端输入
```
yarn --version
```

若提示版本号，则代表安装成功

![](http://upload-images.jianshu.io/upload_images/1828354-c12fb1cc35791f52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#开始使用Yarn
###Yarn命令
Yarn的使用方式跟npm类似，但命令上还是有所区别
> 官方文档地址：https://yarnpkg.com/en/docs/usage

具体语法如下：
- 开始一个新工程
```
yarn init
```
- 添加一个依赖
```
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```
- 更新一个依赖
```
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```
- 移除一个依赖
```
yarn remove [package]
```
- 安装package.json中所有的依赖项
```
yarn
```
或者
```
yarn install
```
以上只是较为常用的几个命令，详细文档戳这里[CLI Introduction | Yarn](https://yarnpkg.com/en/docs/cli/)

###实际使用Yarn

让我们实际使用下吧

#####初始化工程
新建一个文件夹`YarnDemo`，将命令行定位到该目录下，输入
```
yarn init
```
如果不需要将代码发布，这些信息一路默认回车即可

![](http://upload-images.jianshu.io/upload_images/1828354-59d5f12e4e696157.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

命令完成后可以看到，根目录下多了一个package.json文件；

![](http://upload-images.jianshu.io/upload_images/1828354-55a6a739a17aa4a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这样工程就初始化完成了，可以添加所需要的模块了。

#####添加依赖
下面试试添加前端最流行的模块加载器兼打包工具`webpack`
在终端输入
```
yarn add webpack
```
即可看到webpack的安装过程

值得一提的是，yarn的安装过程非常“形象”，具体的我截个图你们感受下...

![是不是非常形象？](http://upload-images.jianshu.io/upload_images/1828354-053f4d732fb6d1d2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果安装途中出现错误，yarn会在工程根目录下自动生成yarn-error.log文件，排查问题非常方便

![安装成功](http://upload-images.jianshu.io/upload_images/1828354-ee0481de77754e34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开package.json文件，可以看到自动添加依赖说明，不再像npm那样需要手动输入`--save-dev`，命令更为简洁

![](http://upload-images.jianshu.io/upload_images/1828354-a79f32d8ebe9d817.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`webpack`依赖添加完成，是不是很简单？

以后就可以用yarn添加各种模块，来管理工程的依赖。

更新依赖和移除依赖很简单，就不多说了

> **注意：**使用`yarn`或`yarn install`安装全部依赖时是根据package.json里的`"dependencies"`字段来决定的

#总结
实际体验过程中，yarn确实要比npm更快速，更简单。

前端世界日新月异，要及时跟上脚步，用更新更强大的工具能够让我们开发者更专注于业务逻辑，更方便的维护和管理代码。

所以赶快用起来吧！