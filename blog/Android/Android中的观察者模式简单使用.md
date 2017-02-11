> 维基百科：https://zh.wikipedia.org/wiki/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F
> 
> 参考博客：http://blog.csdn.net/feiduclear_up/article/details/42167487

##观察者模式
“定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变的时候，所有依赖于它的对象都将得到通知，并自动更新”，可以理解成多个观察者向一个被观察者订阅消息，当被观察者发生改变时通知相应的观察者去作自己的事情。

Android 中的观察者实现java.util.Observer接口，被观察者继承java.util.Observable类。

##使用步骤

 1. 观察者实现Observer接口，重写update()方法；
 2. 被观察者继承Observable类；
 3. 观察者向被观察者订阅事件，调用addObserver()方法；
 4. 被观察者数据改变，调用setChanged()方法和notifyObservers()方法，通知观察者，观察者在update()方法里做出相应操作；
 5. 观察者向被观察者取消订阅事件。

##应用场景实例
计步器功能，在Service里中有动态改变的step步数变量，而在Activity（或Fragment）中需要动态监听步数的变化更新UI，这时选择使用观察者模式。Activity（或Fragment）为观察者，Service中的step变量为被观察者。

##效果展示
![这里写图片描述](http://img.blog.csdn.net/20160302112835032)

##代码示例

###1.观察者实现Observer接口，重写update()方法；
```
public class PedometerFragment extends Fragment implements Observer {

	@Override
    public void update(Observable observable, Object data) {

    }
}
```
###2.被观察者继承Observable类；

因为Java的单继承，计步Service已经继承了Service无法再继承另一个类，所以新建一个类StepObservable作为被观察者。

```
/**
 * 步数被观察者
 * 
 * Created by waka on 2016/3/2.
 */
public class StepObservable extends Observable {

    //单例
    private static StepObservable instance = null;

    public static StepObservable getInstance() {

        if (null == instance) {
            instance = new StepObservable();
        }

        return instance;
    }

    //通知观察者更新数据
    public void notifyStepChange(int step) {

		//关键方法，必须写，具体实现可以查看源码
        setChanged();//设置changeFlag
        notifyObservers(step);//通知观察者
    }

}
```
###3.观察者向被观察者订阅事件，调用addObserver()方法；

在Fragment的onResume方法中添加订阅
```
	/**
     * onResume
     */
    @Override
    public void onResume() {
        super.onResume();

        //观察者往被观察者中添加订阅事件
        StepObservable.getInstance().addObserver(this);
    }
```
###4.被观察者数据改变，调用setChanged()方法和notifyObservers()方法，通知观察者，观察者在update()方法里做出相应操作；

Service中的相应代码：
```
private Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
           
        //..
		
		//得到当前步数
	    currentStep = step;

	    //被观察者数据改变，更新数据
	    StepObservable.getInstance().notifyStepChange(currentStep);
	    
	    //..
	    
	}
}
```

Fragment中的相应代码，在update方法里做相应操作：

```
	@Override
    public void update(Observable observable, Object data) {

        int step = (int) data;
		Snackbar.make(roundProgressBar, "step=" + step, Snackbar.LENGTH_SHORT).show();
        Log.i(TAG, "step=" + step);
    }
```

###5.观察者向被观察者取消订阅事件

在Fragment的onPause方法中添加订阅

```
	/**
     * onPause
     */
    @Override
    public void onPause() {
        super.onPause();

        //观察者从被观察者队列中移除
        StepObservable.getInstance().deleteObserver(this);
    }
```

##源码地址

自己写的一个Android计步器项目
https://github.com/BadWaka/WakaPedometer
