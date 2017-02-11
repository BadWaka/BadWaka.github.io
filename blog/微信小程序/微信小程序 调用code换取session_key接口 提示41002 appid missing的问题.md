> 官方文档地址：https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161122

#解决方案为：直接将参数拼在url里

问题现象：

- 接口文档
![](http://upload-images.jianshu.io/upload_images/1828354-35addc6f621e0d68.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


1. 调用wx.login成功后拿到code，去请求换取session_key接口时，如果直接将数据写入data里，就会提示 41002 appid missing，如下：

  - 参数写在data里
![参数写在data里](http://upload-images.jianshu.io/upload_images/1828354-c9458cfbabe15825.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 返回信息，提示appid missing
![返回信息](http://upload-images.jianshu.io/upload_images/1828354-183b6322e32d539d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 而直接将参数写到url中后，则可以请求成功，如下：
  - 参数直接拼写在url里
![参数直接拼写在url里](http://upload-images.jianshu.io/upload_images/1828354-196e5c54e24bcb70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 返回信息成功
![返回信息](http://upload-images.jianshu.io/upload_images/1828354-20a56c6f24233c34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

所以这地方可能是有问题的，需要注意一下。