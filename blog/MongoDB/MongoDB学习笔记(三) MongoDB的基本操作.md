> 参考视频：[慕课网-mongoDB入门篇](http://www.imooc.com/learn/295)

> 文档：https://docs.mongodb.com/manual/

###查看当前系统中有多少数据库
```
show dbs
```
![](http://upload-images.jianshu.io/upload_images/1828354-aa0e2300584ff28f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###切换(创建)数据库
```
use [数据库名]
```
> 如果没有该数据库，则use命令会在需要的时候创建数据库

> 这里的"需要的时候"指的是数据库不为空，只创建个空的数据库还是看不到

![](http://upload-images.jianshu.io/upload_images/1828354-e1551a15f430c325.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###删除数据库
使用use进入某个数据库后，输入以下命令
```
db.dropDatabase()
```
![](http://upload-images.jianshu.io/upload_images/1828354-d35aa5450d7ee8e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> MongoDB中将一张表称为一个集合(Collection)

###插入数据
```
db.collection.insert()
```
![插入数据成功，waka数据库建立](http://upload-images.jianshu.io/upload_images/1828354-db7d23f92b847e28.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 可以使用for循环插入多条数据
```
// 例子
for(i=3;i<100;i++)db.waka_collection.insert({x:i})for(i=3;i<100;i++)db.waka_collection.insert({x:i})
```
![](http://upload-images.jianshu.io/upload_images/1828354-06aab885483eebf7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


###查看数据库中的集合(Collection)
```
show collections
```
![](http://upload-images.jianshu.io/upload_images/1828354-5cb61b6dcbee8fd6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###查找数据
```
db.collection.find(query, projection)
```
- `find()`参数为空代表查询所有数据
![](http://upload-images.jianshu.io/upload_images/1828354-b0a584f28ffced41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> _id是MongoDB自动生成的字段，在全局范围内不会重复
也可以手动指定_id，但是不能重复，重复MongoDB会报错
![_id重复会报错](http://upload-images.jianshu.io/upload_images/1828354-2639761460d56a8a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `find({key:value})`查询特定key-value的数据
![](http://upload-images.jianshu.io/upload_images/1828354-1efca332266e9406.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

同时`find()`支持
- `find().count()`查看数据数目
![](http://upload-images.jianshu.io/upload_images/1828354-3e8e826e5502113d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- `skip`跳过多少条数据
- `limit`限制返回的数据
- `sort`排序

```
// 实例：跳过3条数据；限制只返回两条数据；根据x排序
db.waka_collection.find().skip(3).limit(2).sort({x:1})
```

![](http://upload-images.jianshu.io/upload_images/1828354-b7acf199482f8069.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)