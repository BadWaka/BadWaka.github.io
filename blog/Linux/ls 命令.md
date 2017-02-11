> 参考文章: [[每天一个linux命令(1)：ls命令](http://www.cnblogs.com/peida/archive/2012/10/23/2734829.html)](http://www.cnblogs.com/peida/archive/2012/10/23/2734829.html)

学习Linux命令笔记，记录下来，希望能给大家帮助。

环境是macOS 10.12.2

#0. 简介
ls命令是linux下最常用的命令。

ls命令就是list的缩写。

默认ls用来打印出当前目录的清单。

如果ls指定其他目录，那么就会显示指定目录里的文件及文件夹清单。

通过ls命令不仅可以查看linux文件夹包含的文件，而且可以查看文件权限(包括目录、文件夹、文件权限)，查看目录信息等等。

#1. 命令格式
ls [选项] [目录名]

#2. 命令功能
列出目标目录中所有的子目录和文件。

#3. 常用参数
- 不带参数，打印出当前目录的清单

![](http://upload-images.jianshu.io/upload_images/1828354-f2339732b7d99305.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `-a`, –all 列出目录下的所有文件，包括以 . 开头的隐含文件

![](http://upload-images.jianshu.io/upload_images/1828354-8eec1be07e74d46d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `-A` 同-a，但不列出“.”(表示当前目录)和“..”(表示当前目录的父目录)。

![](http://upload-images.jianshu.io/upload_images/1828354-57baf72ec1cfad3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `-c`  配合 -lt：根据 ctime 排序及显示 ctime (文件状态最后更改的时间)配合 -l：显示 ctime 但根据名称排序否则：根据 ctime 排序

![默认排序](http://upload-images.jianshu.io/upload_images/1828354-3e4f98b20afd678b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![按修改时间排序](http://upload-images.jianshu.io/upload_images/1828354-169660550eca3b85.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![按名称排序](http://upload-images.jianshu.io/upload_images/1828354-84134ecde4a08e12.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `-C` 每栏由上至下列出项目

![和普通的ls有什么区别吗?](http://upload-images.jianshu.io/upload_images/1828354-a04aab571f8e34ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -d, –directory 将目录象文件一样显示，而不是显示其下的文件。

![。。。](http://upload-images.jianshu.io/upload_images/1828354-2a6531c9d9d92fd8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -g 除了文件名之外，还将文件的权限、文件大小等信息详细列出来。类似 -l,但不列出所有者

![](http://upload-images.jianshu.io/upload_images/1828354-6e33aa54c59d1008.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -l 除了文件名之外，还将文件的权限、所有者、文件大小等信息详细列出来。

![](http://upload-images.jianshu.io/upload_images/1828354-0e6eea12f110dd94.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -o 类似 -l,显示文件的除组信息外的详细信息。  

![](http://upload-images.jianshu.io/upload_images/1828354-3aceb8dd7e8cd94a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -i, –inode 印出每个文件的 inode 号

![](http://upload-images.jianshu.io/upload_images/1828354-2fb1d535a0968d3a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -m 所有项目以逗号分隔，并填满整行行宽

![](http://upload-images.jianshu.io/upload_images/1828354-0173993e13c80fd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -r, –reverse 依相反次序排列

![](http://upload-images.jianshu.io/upload_images/1828354-fecbfa1ad49687ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -R, –recursive 同时列出所有子目录层

![输出太多了图截不全](http://upload-images.jianshu.io/upload_images/1828354-62635f7dfcd1bf80.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -s, –size 以块大小为单位列出所有文件的大小

![文件夹都是0](http://upload-images.jianshu.io/upload_images/1828354-04f49fa15db25e07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -S 根据文件大小排序

![](http://upload-images.jianshu.io/upload_images/1828354-dba1f64242dcc824.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- -t 以文件修改时间排序

![](http://upload-images.jianshu.io/upload_images/1828354-4e9652a4672282af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)