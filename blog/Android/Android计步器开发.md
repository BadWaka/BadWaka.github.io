**参考博客：**
Demo参考：http://www.cfanz.cn/index.php?c=article&a=read&id=250334
源码参考：http://blog.csdn.net/aikongmeng/article/details/40457233#comments
两种计步器的区别和特点：http://blog.csdn.net/kieven2008/article/details/45165825
**感谢这几位大神的无私分享！!**

最近在做一个计步器项目，其中最主要的就是计步器算法，为了这个可谓绞尽脑汁啊，怎么算都不精确，今天无意中发现在Android高版本（API19+）中居然有系统提供的方法！
**TYPE_STEP_DETECTOR** 和**TYPE_STEP_COUNTER** 

本人的手机是华为荣耀6，系统版本是Android5.1.1，在对比了华为自带的计步器和自己写的Demo后发现步数的变化是一模一样的！

所以以后大家在写计步器时用google给我们提供的方法就可以了，又方便又精确，不过低版本的还得自己写。。。。。

使用条件：android 4.4（API19）以上 并且需要相关传感器支持

使用方法：

```
sManager=(SensorManager)context.getSystemService(SENSOR_SERVICE); 

// Step Counter  
sManager.registerListener(new SensorEventListener() {  
	@Override  
	public void onSensorChanged(SensorEvent event) {  
		//这里可以直接得到步数，已测试与华为自带一模一样
		float steps = event.values[0];  
		textViewStepCounter.setText((int) steps + "");  
	}  
	@Override  
	public void onAccuracyChanged(Sensor sensor, int accuracy){  
		}  
	}, sManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER), SensorManager.SENSOR_DELAY_FASTEST); 

// Step Detector  
sManager.registerListener(new SensorEventListener() {  
	@Override  
	public void onSensorChanged(SensorEvent event) {  
		//这个传感器我的手机上没有。。所以不确定是否这样写
		if (event.values[0] == 1.0) {
			step++;
		}
	}  
	@Override  
	public void onAccuracyChanged(Sensor sensor, int accuracy){  
		}  
	}, sManager.getDefaultSensor(Sensor.TYPE_STEP_DETECTOR), SensorManager.SENSOR_DELAY_FASTEST);
```
这样使用了Google的原生API，计步精确又简单，但只有少部分的Android手机有这个功能，所以如果要想让低版本的手机也能计步的话，只好自己写计步算法了...
这是我在网上找的一个计步算法，不是很精确，而且还看求不懂：

```
public class StepDetector implements SensorEventListener {
	public static int CURRENT_SETP = 0;
	public static float SENSITIVITY = 2; // SENSITIVITY灵敏度,这玩意很重(坑)要(爹)！灵敏度为1的时候轻轻晃一下就计步了，灵敏度为10时得狠狠地晃才行。。。。。
	private float mLastValues[] = new float[3 * 2];
	private float mScale[] = new float[2];
	private float mYOffset;
	private static long end = 0;
	private static long start = 0;
	/**
	 * 最后加速度方向
	 */
	private float mLastDirections[] = new float[3 * 2];
	private float mLastExtremes[][] = { new float[3 * 2], new float[3 * 2] };
	private float mLastDiff[] = new float[3 * 2];
	private int mLastMatch = -1;

	/**
	 * 传入上下文的构造函数
	 * 
	 * @param context
	 */
	public StepDetector(Context context) {
		super();
		int h = 480;
		mYOffset = h * 0.5f;
		mScale[0] = -(h * 0.5f * (1.0f / (SensorManager.STANDARD_GRAVITY * 2)));
		mScale[1] = -(h * 0.5f * (1.0f / (SensorManager.MAGNETIC_FIELD_EARTH_MAX)));
	}

	/**
	 * 当传感器检测到的数值发生变化时就会调用这个方法
	 */
	public void onSensorChanged(SensorEvent event) {
		Sensor sensor = event.sensor;
		synchronized (this) {
			// 如果是加速度传感器，则使用自己写的步数判定算法
			if (sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
				float vSum = 0;
				for (int i = 0; i < 3; i++) {
					final float v = mYOffset + event.values[i] * mScale[1];
					vSum += v;
				}
				int k = 0;
				float v = vSum / 3;
				float direction = (v > mLastValues[k] ? 1 : (v < mLastValues[k] ? -1 : 0));
				if (direction == -mLastDirections[k]) {
					// Direction changed
					int extType = (direction > 0 ? 0 : 1); // minumum or maximum?
					mLastExtremes[extType][k] = mLastValues[k];
					float diff = Math.abs(mLastExtremes[extType][k] - mLastExtremes[1 - extType][k]);
					if (diff > SENSITIVITY) {
						boolean isAlmostAsLargeAsPrevious = diff > (mLastDiff[k] * 2 / 3);
						boolean isPreviousLargeEnough = mLastDiff[k] > (diff / 3);
						boolean isNotContra = (mLastMatch != 1 - extType);
						if (isAlmostAsLargeAsPrevious && isPreviousLargeEnough && isNotContra) {
							end = System.currentTimeMillis();
							if (end - start > 500) {// 此时判断为走了一步

								CURRENT_SETP++;
								mLastMatch = extType;
								start = end;
							}
						} else {
							mLastMatch = -1;
						}
					}
					mLastDiff[k] = diff;
				}
				mLastDirections[k] = direction;
				mLastValues[k] = v;
			}
		}
	}
```
这个有很大的误差，所以还在继续优化中，希望大家有什么好的计步算法麻烦给推荐一下~~

