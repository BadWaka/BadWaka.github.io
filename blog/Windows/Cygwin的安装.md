> [Cygwin官网](https://www.cygwin.com/)
> [Cygwin中文站点](http://www.cygwin.cn/)

#简介
Cygwin是一个在Windows上的类Linux环境，它可以帮助人们在Windows上使用强大的Linux命令。

由于最近在做一个Android平台打开PDF的项目，需要编译so文件，windows下十分的不友好，所以开始学习Cygwin，并将学习过程记录下来。

#安装步骤

 1. 去Cygwin官网下载安装包，注意下好对应的版本：https://cygwin.com/install.html
 
 2. 打开安装包，点击下一步
 ![这里写图片描述](http://img.blog.csdn.net/20160425163215065)

 3. 第二页有三个选项，从网上直接安装，下载但并不安装，从本地安装；这里推荐选第二个，如果对自己网速有自信的话，就直接从网上安吧
 ![这里写图片描述](http://img.blog.csdn.net/20160425170649869)

 4. 选择本地保存路径
 ![这里写图片描述](http://img.blog.csdn.net/20160425163838333)
 
 5. 选择直接连接
 ![这里写图片描述](http://img.blog.csdn.net/20160425163926771)
 
 6. 选择镜像站点，这里推荐选择国内站点，我下载的时候速度能上2000k/s
 ![这里写图片描述](http://img.blog.csdn.net/20160425164238507)
 
 7. 点击确定后会有一个进度条，走完后会跳转到安装选项目录，推荐安装的子目录为Archive、Base、Devel（包括gcc、make等编译工具）、Libs、Net、DEShells（这个我没有找到）、Utils:（包括bzip2等实用工具），安装时需要把子目录旁边的”default”用鼠标点一下，直到变成”install”
![这里写图片描述](http://img.blog.csdn.net/20160425170711830)![这里写图片描述](http://img.blog.csdn.net/20160425170917559)
 
 8. 点击下一步，查看依赖关系
 ![这里写图片描述](http://img.blog.csdn.net/20160425165716278)
 
 9. 点击下一步，开始安装，快的话大约1小时能下载完毕。。。
 ![这里写图片描述](http://img.blog.csdn.net/20160425165948717)
 
 10. 如图，安装完毕（至于勾选创建桌面和快捷菜单图标为什么是灰的，是因为我们只是下载下来了，还没有安装。。。）
 ![这里写图片描述](http://img.blog.csdn.net/20160425175235195)
 
 11. 重新打开setup.exe，这次选择从本地安装
 ![这里写图片描述](http://img.blog.csdn.net/20160425175744373)
 
 12. 选择Cygwin的安装目录（注意刚才我们选的是下载目录，这两个并不一样）
 ![这里写图片描述](http://img.blog.csdn.net/20160425175903516)
 
 13. 选择Cygwin的下载目录，从这里取得安装包
 ![这里写图片描述](http://img.blog.csdn.net/20160425180013409)
 
 14. 看到这个界面应该很熟悉吧，再次勾选要安装的字目录
 ![这里写图片描述](http://img.blog.csdn.net/20160425180227146)
 ![这里写图片描述](http://img.blog.csdn.net/20160425180235193)
 
 15. 下一步下一步，然后继续等吧 
![这里写图片描述](http://img.blog.csdn.net/20160425180430601)
![这里写图片描述](http://img.blog.csdn.net/20160425180454321)

 16. 漫长的等待之后。。它报错了。。。没事不介意，继续下一步
![这里写图片描述](http://img.blog.csdn.net/20160425190018890)

 17. 创建快捷方式，安装完成！
 ![这里写图片描述](http://img.blog.csdn.net/20160425190130500)

打开桌面上的Cygwin64 Terminal，输入 ps 测试成功！
![这里写图片描述](http://img.blog.csdn.net/20160425190341938)

终于可以愉快地使用Linux命令了 
 
  
  
