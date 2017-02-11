> 参考文章: [Mac 上安装MongoDB](http://www.jianshu.com/p/dd0c39bf7be4)
参考视频: [慕课网-mongoDB入门篇](http://www.imooc.com/learn/295)

#安装
###【macOS】
通过Homebrew安装
1. 更新Homebrew的package数据库
```
brew update
```

2. 安装MongoDB
```
brew install mongodb
```
> Homebrew默认的安装目录是`/usr/local/opt/`
![](http://upload-images.jianshu.io/upload_images/1828354-7b1685777f42ddd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 验证是否安装成功，输入mongo(连接数据库命令)查看是否显示MongoDB相关信息
MongoDB默认使用27017端口
```
mongo
```
![安装成功!](http://upload-images.jianshu.io/upload_images/1828354-4033428593b79a1b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#MongoDB文件用途简介
> macOS Homebrew MongoDB 安装路径默认为`/usr/local/opt/mongodb/`
![](http://upload-images.jianshu.io/upload_images/1828354-fb0805244ce0a20a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- mongod 是部署服务用的
- mongo 是用来连接服务的客户端
- mongoimport 导入MongoDB
- mongoexport 导出MongoDB
- mongorestore 恢复，与mongoimport类似，但是是二进制数据
- mongodump 备份，与mongoexport类似，但是是二进制数据
- mongooplog 用来做操作日志的回放
- mongostat 用来查看mongo服务器的状态