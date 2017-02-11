创建一个简单的自定义的BroadcastRecevier广播接收器方法：
1.自定义一个字符串常量，用作Action标识

```
private static final String MY_ACTION = "waka";
```
2.在点击事件中新建一个Intent，调用setAction方法，设置Action标识，再放一个用于辨认的值

```
Intent intent = new Intent();
intent.setAction(MY_ACTION);	//设置setAction		
intent.putExtra("message", "Are you copythat?");							
```
3.发送广播

```
sendBroadcast(intent);      //发送广播                                        
```
4.自定义一个MyBroadcastRecevier类继承BroadcastRecevier类，重写它的onReceive方法

```
public class MyBroadcastReceiver extends BroadcastReceiver{
	//重写Receive方法
	@Override
	public void onReceive(Context context, Intent intent) {
		Toast.makeText(context, intent.getStringExtra("message"), Toast.LENGTH_LONG).show();
	}
}
```
5.最后在AndroidMainfest.xml中注册，并设置过滤器

```
<receiver 
    android:name="MyBroadcastReceiver">
    <intent-filter >
       <action   android:name= "waka"/>
    </intent-filter>
</receiver>
```
这样一个简单的BroadcastReceiver就做好了
