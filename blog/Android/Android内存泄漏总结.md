> 原文地址：http://blog.xuanzhangjiong.xyz/2016/03/01/Android%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E6%80%BB%E7%BB%93/#comments

#前言

对于内存泄漏，我想大家在开发中肯定都遇到过，只不过内存泄漏对我们来说并不是可见的，因为它是在堆中活动，而要想检测程序中是否有内存泄漏的产生，通常我们可以借助LeakCanary、MAT等工具来检测应用程序是否存在内存泄漏，MAT是一款强大的内存分析工具，功能繁多而复杂，而LeakCanary则是由Square开源的一款轻量第三方内存泄漏检测工具，当它检测到程序中有内存泄漏的产生时，它将以最直观的方式告诉我们该内存泄漏是由谁产生的和该内存泄漏导致谁泄漏了而不能回收，供我们复查。
腾讯bugly也推出了三篇关于Android内存泄漏调优的文章：

 1. [内存泄露从入门到精通三部曲之基础知识篇](http://bugly.qq.com/bbs/forum.php?mod=viewthread&tid=21&highlight=%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A%E4%B8%89%E9%83%A8%E6%9B%B2%E4%B9%8B%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%AF%87)
 2. [内存泄露从入门到精通三部曲之排查方法篇](http://bugly.qq.com/bbs/forum.php?mod=viewthread&tid=62&highlight=%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A%E4%B8%89%E9%83%A8%E6%9B%B2%E4%B9%8B%E6%8E%92%E6%9F%A5%E6%96%B9%E6%B3%95%E7%AF%87)
 3. [内存泄露从入门到精通三部曲之常见原因与用户实践](http://bugly.qq.com/bbs/forum.php?mod=viewthread&tid=125&highlight=%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%BB%8E%E5%85%A5%E9%97%A8%E5%88%B0%E7%B2%BE%E9%80%9A%E4%B8%89%E9%83%A8%E6%9B%B2%E4%B9%8B%E5%B8%B8%E8%A7%81%E5%8E%9F%E5%9B%A0%E4%B8%8E%E7%94%A8%E6%88%B7%E5%AE%9E%E8%B7%B5)

Realm同样给出了性能优化文章：（真心佩服）

 - [10条提升Android性能的建议](https://realm.io/cn/news/droidcon-farber-improving-android-app-performance/)

#内存泄漏

##为什么会产生内存泄漏？

当一个对象已经不需要再使用了，本该被回收时，而有另外一个正在使用的对象持有它的引用从而导致它不能被回收，这导致本该被回收的对象不能被回收而停留在堆内存中，这就产生了内存泄漏。

##内存泄漏对程序的影响？

内存泄漏是造成应用程序OOM的主要原因之一！我们知道Android系统为每个应用程序分配的内存有限，而当一个应用中产生的内存泄漏比较多时，这就难免会导致应用所需要的内存超过这个系统分配的内存限额，这就造成了内存溢出而导致应用Crash。

#Android中常见的内存泄漏汇总

##单例造成的内存泄漏

单例模式非常受开发者的喜爱，不过使用的不恰当的话也会造成内存泄漏，由于单例的静态特性使得单例的生命周期和应用的生命周期一样长，这就说明了如果一个对象已经不需要使用了，而单例对象还持有该对象的引用，那么这个对象将不能被正常回收，这就导致了内存泄漏。
如下这个典例：

```
public class AppManager {
    private static AppManager instance;
    private Context context;
    private AppManager(Context context) {
        this.context = context;
    }
    public static AppManager getInstance(Context             context) {
        if (instance != null) {
            instance = new AppManager(context);
        }
        return instance;
    }
}
```

这样不管传入什么Context最终将使用Application的Context，而单例的生命周期和应用的一样长，这样就防止了内存泄漏

##非静态内部类创建静态实例造成的内存泄漏

有的时候我们可能会在启动频繁的Activity中，为了避免重复创建相同的数据资源，可能会出现这种写法：

```
public class MainActivity extends AppCompatActivity {
    private static TestResource mResource = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if(mResource == null){
            mResource = new TestResource();
        }
        //...
    }
    class TestResource {
    //...
    }
}
```

这样就在Activity内部创建了一个非静态内部类的单例，每次启动Activity时都会使用该单例的数据，这样虽然避免了资源的重复创建，不过这种写法却会造成内存泄漏，因为非静态内部类默认会持有外部类的引用，而又使用了该非静态内部类创建了一个静态的实例，该实例的生命周期和应用的一样长，这就导致了该静态实例一直会持有该Activity的引用，导致Activity的内存资源不能正常回收。正确的做法为：
将该内部类设为静态内部类或将该内部类抽取出来封装成一个单例，如果需要使用Context，请使用ApplicationContext

##Handler造成的内存泄漏

Handler的使用造成的内存泄漏问题应该说最为常见了，平时在处理网络任务或者封装一些请求回调等api都应该会借助Handler来处理，对于Handler的使用代码编写一不规范即有可能造成内存泄漏，如下示例：

```
public class MainActivity extends AppCompatActivity {
private Handler mHandler = new Handler() {
    @Override
    public void handleMessage(Message msg) {
    //...
    }
};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        loadData();
    }
    private void loadData(){
        //...request
        Message message = Message.obtain();
        mHandler.sendMessage(message);
    }
}
```

这种创建Handler的方式会造成内存泄漏，由于mHandler是Handler的非静态匿名内部类的实例，所以它持有外部类Activity的引用，我们知道消息队列是在一个Looper线程中不断轮询处理消息，那么当这个Activity退出时消息队列中还有未处理的消息或者正在处理消息，而消息队列中的Message持有mHandler实例的引用，mHandler又持有Activity的引用，所以导致该Activity的内存资源无法及时回收，引发内存泄漏，所以另外一种做法为：

```
public class MainActivity extends AppCompatActivity {
    private MyHandler mHandler = new MyHandler(this);
    private TextView mTextView ;
    private static class MyHandler extends Handler {
        private WeakReference<Context> reference;
        public MyHandler(Context context) {
        reference = new WeakReference<>(context);
        }
        @Override
        public void handleMessage(Message msg) {
            MainActivity activity = (MainActivity) reference.get();
            if(activity != null){
            activity.mTextView.setText("");
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mTextView = (TextView)findViewById(R.id.textview);
        loadData();
    }

    private void loadData() {
        //...request
        Message message = Message.obtain();
        mHandler.sendMessage(message);
    }
}
```

创建一个静态Handler内部类，然后对Handler持有的对象使用弱引用，这样在回收时也可以回收Handler持有的对象，这样虽然避免了Activity泄漏，不过Looper线程的消息队列中还是可能会有待处理的消息，所以我们在Activity的Destroy时或者Stop时应该移除消息队列中的消息，更准确的做法如下：

```
public class MainActivity extends AppCompatActivity {
    private MyHandler mHandler = new MyHandler(this);
    private TextView mTextView ;
    private static class MyHandler extends Handler {
        private WeakReference<Context> reference;
        public MyHandler(Context context) {
        reference = new WeakReference<>(context);
        }
        @Override
        public void handleMessage(Message msg) {
            MainActivity activity = (MainActivity) reference.get();
            if(activity != null){
            activity.mTextView.setText("");
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mTextView = (TextView)findViewById(R.id.textview);
        loadData();
    }

    private void loadData() {
        //...request
        Message message = Message.obtain();
        mHandler.sendMessage(message);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mHandler.removeCallbacksAndMessages(null);
    }
}
```

使用mHandler.removeCallbacksAndMessages(null);是移除消息队列中所有消息和所有的Runnable。当然也可以使用mHandler.removeCallbacks();或mHandler.removeMessages();来移除指定的Runnable和Message。

##线程造成的内存泄漏

对于线程造成的内存泄漏，也是平时比较常见的，异步任务和Runnable都是一个匿名内部类，因此它们对当前Activity都有一个隐式引用。如果Activity在销毁之前，任务还未完成，
那么将导致Activity的内存资源无法回收，造成内存泄漏。正确的做法还是使用静态内部类的方式，如下：

```
static class MyAsyncTask extends AsyncTask<Void, Void, Void> {
    private WeakReference<Context> weakReference;

    public MyAsyncTask(Context context) {
        weakReference = new WeakReference<>(context);
    }

    @Override
    protected Void doInBackground(Void... params) {
        SystemClock.sleep(10000);
        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        super.onPostExecute(aVoid);
        MainActivity activity = (MainActivity) weakReference.get();
        if (activity != null) {
        //...
        }
    }
}
static class MyRunnable implements Runnable{
    @Override
    public void run() {
        SystemClock.sleep(10000);
    }
}
//——————
new Thread(new MyRunnable()).start();
new MyAsyncTask(this).execute();
```

这样就避免了Activity的内存资源泄漏，当然在Activity销毁时候也应该取消相应的任务AsyncTask::cancel()，避免任务在后台执行浪费资源。

##资源未关闭造成的内存泄漏

对于使用了BraodcastReceiver，ContentObserver，File，Cursor，Stream，Bitmap等资源的使用，应该在Activity销毁时及时关闭或者注销，否则这些资源将不会被回收，造成内存泄漏。

#一些建议

 1. 对于生命周期比Activity长的对象如果需要应该使用ApplicationContext
 2. 对于需要在静态内部类中使用非静态外部成员变量（如：Context、View )，可以在静态内部类中使用弱引用来引用外部类的变量来避免内存泄漏
 3. 对于不再需要使用的对象，显示的将其赋值为null，比如使用完Bitmap后先调用recycle()，再赋为null
 4. 保持对对象生命周期的敏感，特别注意单例、静态对象、全局性集合等的生命周期
 5. 对于生命周期比Activity长的内部类对象，并且内部类中使用了外部类的成员变量，可以这样做避免内存泄漏：(1).将内部类改为静态内部类；(2).静态内部类中使用弱引用来引用外部类的成员变量
 6. 在涉及到Context时先考虑ApplicationContext，当然它并不是万能的，对于有些地方则必须使用Activity的Context，对于Application，Service，Activity三者的Context的应用场景如下：![这里写图片描述](http://7xoz2q.com1.z0.glb.clouddn.com/%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F)其中：NO1表示Application和Service可以启动一个Activity，不过需要创建一个新的task任务队列。而对于Dialog而言，只有在Activity中才能创建

