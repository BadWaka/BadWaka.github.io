
因为不能在主线程中访问网络，所以需要新建线程
新建的线程获取数据后，需要传到主线程中（或者不用传，直接用），用于更新UI

之前一直使用AsyncTask来开启多线程

```
new AsyncTask<String, Void, String>() {
            //封装好的线程，可以进行网络通信
            @Override
            protected String doInBackground(String... params) {
            }
            //用于更新UI
            @Override
            protected void onPostExecute(String s) {
            }
        }.execute(url);
```
优点是简单，网络访问写在doInBackground中，更新UI写在onPostExecute中，实现功能简单的程序写起来很方便；
缺点呢是非常不灵活，只能按照套路来。。。比如我想**将网上获取的数据保存到本地**，以后直接调用，AsyncTask很难实现，这时Handler的优势就体现出来了

先来一个最简单的Handler写法

```
//直接在声明时就给它初始化了，方便就是有点乱。。。
private Handler handler = new Handler(){
	//重写它的HandlerMessage方法，数据就是从这个Message传过来的
	@Override
        public void handleMessage(Message msg) {
	        //获取到Message传过来的值
            int arg1 = msg.arg1;
            int arg2 = msg.arg2;
            int what = msg.what;
            Object obj = msg.obj;
        }
};

//当你开启一个子线程时，不只是访问网络哦
public class MyThread implements Runnable{
	@Override
    public void run() {
	    //访问网络
	    ......
	    //假设我们获取到了个图片
	    byte[] data = EntityUtils.toByteArray(httpResponse.getEntity());
	    //新建Message对象，这里推荐使用obtain()，而不是new一个新的
	    //因为源码中它会判断消息池中是否有Message，有则复用，没有才new一个新的，节能环保重复利用
	    Message message = Message.obtain();      //这里是最简单的用法
	    //赋值
	    message.obj = data;                      //obj是一个Object类型的值，可以传任意值
        message.what = 1;                        //what是一个int型，常用来作标志位
        message.arg1 = 111;                      
        message.arg2 = 222;                      //arg1和arg2都是int型，常用来表示传递数据的进度
        Bundle data = new Bundle();
        message.setData(data);                   //setData()可以用来传一个Bundle，传递复杂的数据
        handler.sendMessage(message);            //将message发送给handler
    }
}
```
是不是很简单?
Message.obtain()方法有多种重载方法
比如直接绑定handler啊，给arg1，arg2，obj，what直接赋值啊等等等

值得一提的是
直接绑定一个handler时	
这时发送就不能用handler.sendMessage(message)了，而用Message.sendToTarget();
```
Message message = Message.obtain(handler);         	
message.sendToTarget();
```
Yo，未完待续