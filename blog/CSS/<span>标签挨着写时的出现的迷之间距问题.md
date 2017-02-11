#问题

![](http://upload-images.jianshu.io/upload_images/1828354-4fa25d3d6e837f6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

两个span分行挨着写时，样式会出现迷之间隔，如下：


![](http://upload-images.jianshu.io/upload_images/1828354-4456782a4bb04f13.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](http://upload-images.jianshu.io/upload_images/1828354-c6b9e03323b69283.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



#解决方案1：
父元素的font-size设置为0，但是这样会出现一个问题，`text-overflow: ellipsis`属性不在生效

![](http://upload-images.jianshu.io/upload_images/1828354-bee7b9b731bd6b46.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#解决方案2：
html中将span不分行挨着写，如下图：

![](http://upload-images.jianshu.io/upload_images/1828354-4055541dca70a49d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/1828354-a5c1187ff863cce6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这样既可以消除间隔，又可以保留`text-overflow: ellipsis`属性