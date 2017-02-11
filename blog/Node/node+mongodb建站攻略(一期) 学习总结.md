> 视频地址：[node+mongodb 建站攻略（一期）](http://www.imooc.com/learn/75)

> GitHub地址：https://github.com/BadWaka/movie-website

根据慕课网视频编写的简单电影网站

#运行
```
// 安装node模块
npm install 
// 因为bower也是node模块，所以需要后安装
bower install
// 启动数据库服务
mongod
```
之后在浏览器中打开`localhost:3000`
- 首页 `/`
- 首页 `/movie:id`
- 后台录入页 `/admin/movie`
- 后台列表页 `/admin/list`

#学到的知识
会基础的使用Node和Express建立服务器，并使用Jade模板简单的搭建了页面，跑通了整个前后端流程，实现了基础的功能
但还需系统的学习

###后端
- Node
  - path.join()方法拼接路径
- Express
  - 设置视图根目录、设置模板引擎、引入静态资源等一些配置的方法
  - 学会了创建路由，并通过不同的传参方式获取相关参数，比如`:id`直接用`req.param`和`?id=id`用`res.query.id`
  - 熟悉了如何返回一个页面(`res.render()`)，如何返回一个json(`res.json()`)，如何跳转(`res.redirect`)
- mongoose
  - 学会了如何用Node.js与MongoDB交互(连接及操作)，使用mongoose这个node_module
  - 学会了Schema定义模式规定好数据类型及方法，Model定义模型在代码中使用模式中定义好的方法，我的理解：模式(Schema)就相当于类定义，而模型(Model)就相当于具体的对象
  - 学会了mongoose的一些基本操作api
- MongoDB
  - 学会了安装MongoDB
  - 启动mongod服务
  - 使用mongo连接数据库
  - MongoDB的一些基础的命令行操作
- Jade
  - 了解了Jade，说实话，作为一个写了很久HTML的前端，Jade这种语法真的是用着不习惯，不过代码确实很优雅，我想一定是从python转过来的后端大神开发的
  - Jade已经改名叫Pug了

###前端
- HTML
  - 了解了一些原始的表单提交方式和页面跳转方式，ajax写多了对这种方式居然有一种独特的新鲜感
  - 好处是有助于看懂旧代码和了解前端发展历史，旧的东西也得会
- Bootstrap
  - 又多了解了一点Bootstrap，很方便
  - 不过还是更喜欢用flex自己写布局配上Material Design的样式
- bower
  - 学会了基础使用bower，感觉它就像是前端的npm