> 参考视频：[慕课网-mongoDB入门篇](http://www.imooc.com/learn/295)

只是简单的笔记，具体操作请看视频

#文件目录结构
![](http://upload-images.jianshu.io/upload_images/1828354-77951f055cd7fc9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#日志文件配置
![](http://upload-images.jianshu.io/upload_images/1828354-3f631b5f0a5a97ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#启动服务
-f 后面接配置文件
```
mongod -f conf/mongod.conf
```
![](http://upload-images.jianshu.io/upload_images/1828354-c4a13a758087ef2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#连接服务
ip+端口号+数据库名
```
mongo 127.0.0.1:12345/test
```
![](http://upload-images.jianshu.io/upload_images/1828354-66af0ff5b35be71b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#关闭mongod服务
```
db.shutdownServer()
```
> 会提示只有admin数据库才能使用该命令
![](http://upload-images.jianshu.io/upload_images/1828354-7e35de05e4efca48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)