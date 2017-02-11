> 参考文章：http://www.linuxidc.com/Linux/2016-09/135487.htm

Node.js官网下载最新稳定版Node.js安装包

是这么个东西，后缀名是tar.xz

![](http://upload-images.jianshu.io/upload_images/1828354-e1e75112b89ba146.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

进入Downloads目录解压该文件
```
cd Downloads
tar -xvf node-v6.9.5-linux-x64
```

可以看到解压缩完成

![](http://upload-images.jianshu.io/upload_images/1828354-9e8314a566ef82be.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

输入命令把该文件夹移至通用软件目录opt
```
sudo mv node-v6.9.5-linux-x64 /opt/
```

安装 npm 和 node 命令到系统命令 
```
sudo ln -s /opt/node-v6.9.5-linux-x64/bin/node /usr/local/bin/node 
sudo ln -s /opt/node-v6.9.5-linux-x64/bin/npm /usr/local/bin/npm
```

输入`node -v`和`npm -v`验证是否安装成功