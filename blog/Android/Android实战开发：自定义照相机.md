参考资料：

SurfaceView：http://www.cnblogs.com/xuling/archive/2011/06/06/android.html
android.hardware.Camera2：http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0428/2811.html
Camera默认捕获画面横向： http://blog.sina.com.cn/s/blog_777c69930100y7nv.html

感谢以上大神们的的无私分享！

----------

之前在公司写了一个自定义CameraView，年代久远，回头看代码时居然有点看不懂了。。。
真是好记性不如烂笔头啊~

趁着年底不忙有时间，再次重写下Camera，话不多说，开始撸代码。


----------


#1.权限#


----------

首先需要在AndroidManifest文件中配置权限：

```
	<!-- 权限 -->
    <!-- 摄像头权限 -->
    <uses-permission android:name="android.permission.CAMERA" />
    <!-- 闪光灯权限 -->
    <uses-permission android:name="android.permission.FLASHLIGHT" />
    <!-- 在SDCard中创建与删除文件权限 -->
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
    <!-- 写入SD卡权限 -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

	<!-- 功能 -->
    <!-- 摄像头功能 -->
    <uses-feature android:name="android.hardware.camera" />
    <!-- 摄像头自动对焦功能 -->
    <uses-feature android:name="android.hardware.camera.autofocus" />
```

#2.预览图像#


----------


##2.1 SurfaceView和SurfaceHolder ##


----------


关于SurfaceView的详细介绍可以点这里：http://www.cnblogs.com/xuling/archive/2011/06/06/android.html


----------


### 2.1.1 SurfaceView ###


----------


因为我们需要预览照相机中的图像，而这个图像又是动态变化的，所以必须用到这个SurfaceView。
SurfaceView继承自View，能够在非UI线程中在屏幕上绘图，所以我们可以在预览图像的同时进行一些别的操作。
我们把它写在布局文件中，使用findViewById获得它的实例即可。

```
	mSurfaceView = (SurfaceView) findViewById(R.id.surfaceView);
```




### 2.1.2 SurfaceHolder ###


----------


SurfaceHolder相当于是SurfaceView的控制器，用来操纵surface。处理它的Canvas上画的效果和动画，控制表面，大小，像素等。

```
	mSurfaceHolder = mSurfaceView.getHolder();//通过getHolder方法获取实例
```

实现SurfaceView需要实现SurfaceHolder.Callback接口，可以自定义一个类继承SurfaceView并实现这个接口，也可以让Activity直接实现这个接口，我们这里使用第二种。

实现SurfaceHolder.Callback接口需要实现三个方法：

```
	public class CameraActivity extends AppCompatActivity implements SurfaceHolder.Callback {
		...
		mSurfaceHolder.addCallback(this);
		...
		@Override
	    public void surfaceCreated(SurfaceHolder holder) {
			//创建时触发，surfaceView生命周期的开始，在这里打开相机
	    }
	
	    @Override
	    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
			//surface的大小发生改变时触发，在这里预览图像
	    }
	
	    @Override
	    public void surfaceDestroyed(SurfaceHolder holder) {
			//销毁时触发，surfaceView生命周期的结束，在这里关闭相机
	    }
	}
	
```
有了预览图像的容器，下面就真正开始使用Camera了。


----------


## 2.2 Camera ##


----------


### 2.2.1 import注意事项 ###


----------


导入包的时候注意是android.hardware.Camera，而不是android.graphics.Camera，不要搞错了；
hardware中的Camera是控制设备摄像头的，graphics中的Camera是对图像进行处理的。

PS：**在android5.0以上，android.hardware.Camera已过时**，推荐使用的是android.hardware.Camera2类；但由于Camera2类不向下兼容，而且目前安卓手机5.0以上的不多，所以我们还是使用过时的android.hardware.Camera。

关于Camera2类的详情，点这里：http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0428/2811.html
感谢 泡在网上的日子 的无私分享~


----------


### 2.2.2 生成预览图像 ###


----------


在重写的surfaceCreated方法中初始化camera，并开启预览
```
	@Override
    public void surfaceCreated(SurfaceHolder holder) {
        mCamera = Camera.open();//使用静态方法open初始化camera对象，默认打开的是后置摄像头
        try {
            mCamera.setPreviewDisplay(mSurfaceHolder);//设置在surfaceView上显示预览
            mCamera.startPreview();//开始预览
        } catch (IOException e) {
            //在异常处理里释放camera并置为null
            mCamera.release();
            mCamera = null;
            e.printStackTrace();
        }
    }
```
可以直接把预览写在surfaceCreated里，也可以写在surfaceChanged里
```
	@Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
		//也可以把预览写在这里
    }
```
在surfaceView被销毁时，停止预览并释放camera对象并置为null
```
	@Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        //停止预览并释放camera对象并置为null
        mCamera.stopPreview();
        mCamera.release();
        mCamera = null;
    }
```
这时候运行程序，点击同意调用摄像头，我们会发现有图像了,
可是，为什么是歪的？
。。。whta the hell。。。


----------


### 2.2.3 设置预览方向 ###


----------


之所以是歪的，是因为摄像头默认捕获的画面byte[]是根据横向来的，而我们的应用是竖向的，
解决办法是调用setDisplayOrientation来设置PreviewDisplay的方向，效果就是将捕获的画面旋转多少度显示。
详情点这里：http://blog.sina.com.cn/s/blog_777c69930100y7nv.html

所以我们只要在预览前调用下setDisplayOrientation这个方法就好了

```
	@Override
    public void surfaceCreated(SurfaceHolder holder) {
        mCamera = Camera.open();
        try {
            mCamera.setPreviewDisplay(mSurfaceHolder);
            
            //设置预览偏移90度,一般的设备都是90，但某些设备会偏移180
            mCamera.setDisplayOrientation(90);
            
            mCamera.startPreview();
        } catch (IOException e) {
            mCamera.release();
            mCamera = null;
            e.printStackTrace();
        }
    }

```

### 2.2.4 Camera.Parameters 相机参数类 ###


----------


Camera.Parameters是相机参数类，在这里可以给camera对象设置分辨率，图片方向，闪光灯模式等等一些参数，用以实现更丰富的功能。
使用方式如下：

```
	@Override
    public void surfaceCreated(SurfaceHolder holder) {
        mCamera = Camera.open();
        try {
            mCamera.setPreviewDisplay(mSurfaceHolder);
            mCamera.setDisplayOrientation(90);
            
            /**Camera.Parameters**/
            Camera.Parameters parameters = mCamera.getParameters();//得到一个已有的（默认的）参数
            parameters.setPreviewSize(1920, 1080);//设置分辨率，后面有详细说明
            parameters.setRotation(90);//设置照相生成的图片的方向，后面有详细说明
            parameters.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);//设置闪光灯模式为关
            mCamera.setParameters(parameters);//将参数赋给camera
            
            mCamera.startPreview();
        } catch (IOException e) {
            mCamera.release();
            mCamera = null;
            e.printStackTrace();
        }
    }
```
注意：这里设置分辨率是不能随便设置的，因为每个设备所支持的分辨率不一样，如果设置了设备不支持的分辨率程序就会崩溃，**所以上面我把分辨率写死是非常不可取的**；
可以通过getSupportedPreviewSizes()获得设备支持的分辨率list。

```
	List<Camera.Size> sizeList = parameters.getSupportedPreviewSizes();//获得设备所支持的分辨率列表
        for (int i = 0; i < sizeList.size(); i++) {
	        //这里的TAG是一个常量字符串，用来标识log
            Log.i(TAG, "width:" + sizeList.get(i).width + ",height:" + sizeList.get(i).height);
        }
```
运行这行代码，我们可以看到如下log

```
01-09 09:23:09.540 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:176,height:144
01-09 09:23:09.540 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:320,height:240
01-09 09:23:09.540 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:352,height:288
01-09 09:23:09.540 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:480,height:320
01-09 09:23:09.540 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:480,height:368
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:640,height:480
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:720,height:480
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:800,height:480
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:800,height:600
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:864,height:480
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:960,height:540
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:1280,height:720
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:1088,height:1088
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:1440,height:1080
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:1920,height:1080
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:1920,height:1088
01-09 09:23:09.541 11014-11014/com.waka.workspace.wakacamera I/CameraActivity: width:1680,height:1248
```
在这里面我们可以获得所有的支持的分辨率；
但是注意，**这里面的width都比height大**，这是因为系统默认的图像捕捉是横屏的，而非我们所熟悉的竖屏。


----------

### 2.2.5 获得最佳分辨率 ###


----------


我们发现，sizeList的分辨率大小虽然有一定的规律，但是并不是最后一个就是屏幕的分辨率；
比如我测试的手机屏幕分辨率为1920x1080，但是sizeList的最后一个是1680x1248，
所以我们还要对这些数据进行一下筛选，找到最适合屏幕的分辨率。

代码如下：

```
	/**
     * 获得最佳分辨率
     * 注意:因为相机默认是横屏的，所以传参的时候要注意，width和height都是横屏下的
     *
     * @param parameters 相机参数对象
     * @param width      期望宽度
     * @param height     期望高度
     * @return
     */
    private int[] getBestResolution(Camera.Parameters parameters, int width, int height) {
        int[] bestResolution = new int[2];//int数组，用来存储最佳宽度和最佳高度
        int bestResolutionWidth = -1;//最佳宽度
        int bestResolutionHeight = -1;//最佳高度

        List<Camera.Size> sizeList = parameters.getSupportedPreviewSizes();//获得设备所支持的分辨率列表
        int difference = 99999;//最小差值，初始化市需要设置成一个很大的数

        //遍历sizeList，找出与期望分辨率差值最小的分辨率
        for (int i = 0; i < sizeList.size(); i++) {
            int differenceWidth = Math.abs(width - sizeList.get(i).width);//求出宽的差值
            int differenceHeight = Math.abs(height - sizeList.get(i).height);//求出高的差值

            //如果它们两的和，小于最小差值
            if ((differenceWidth + differenceHeight) < difference) {
	            difference = (differenceWidth + differenceHeight);//更新最小差值
                bestResolutionWidth = sizeList.get(i).width;//赋值给最佳宽度
                bestResolutionHeight = sizeList.get(i).height;//赋值给最佳高度
            }
        }

        //最后将最佳宽度和最佳高度添加到数组中
        bestResolution[0] = bestResolutionWidth;
        bestResolution[1] = bestResolutionHeight;
        return bestResolution;//返回最佳分辨率数组
    }
```
注意：这里期望宽度和期望高度是为了扩展功能，
一般来说照相机都全屏，直接传入手机分辨率就可以了
但是如果不全屏呢？

所以就可以在这里传入希望的高度和宽度，保证预览图像不变形。

修改surfaceCreate方法中的代码：

```
	@Override
    public void surfaceCreated(SurfaceHolder holder) {
        mCamera = Camera.open();
        try {
            mCamera.setPreviewDisplay(mSurfaceHolder);
            mCamera.setDisplayOrientation(90);
            Camera.Parameters parameters = mCamera.getParameters();

            /**获得屏幕分辨率**/
            Display display = this.getWindowManager().getDefaultDisplay();
            Point size = new Point();
            display.getSize(size);
            int screenWidth = size.x;
            int screenHeight = size.y;

            /**获得最佳分辨率，注意此时要传的width和height是指横屏时的,所以要颠倒一下**/
            int[] bestResolution = Utils.getBestResolution(parameters, screenHeight, screenWidth);//Utils是一个工具类，我习惯把操作的方法放在一个工具类中，作为静态方法使用
            parameters.setPreviewSize(bestResolution[0], bestResolution[1]);

            parameters.setRotation(90);
            parameters.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
            mCamera.setParameters(parameters);
            mCamera.startPreview();
        } catch (IOException e) {
            mCamera.release();
            mCamera = null;
            e.printStackTrace();
        }
    }
```
好了，现在应该就可以看到不变形的图像了~
如果还变形，请隐藏**通知栏，ActionBar和底部的虚拟导航键栏**，等等等等等。。。

**所以这个时候期望宽度和期望高度就有用了**，我们可以计算出除去这些系统栏的高度，然后传入我们算好的值，就可以自动匹配出最佳分辨率~


----------
### 2.2.6 设置自动对焦 ###

----------

现在预览出来的图像终于是正常大小了，可还是模模糊糊的，这咋拍？这坑定不能拍啊
所以我们需要实现相机的自动对焦功能，在这里Android已经给我们封装的很好了，我们只需要简单的调用一下方法就行。
好多手机里自带的那种停下来就自动进行对焦的方式我还不太会，就先写了个触摸自动对焦

自动对焦需要配置相关权限，和实现Camera.AutoFocusCallback接口

代码如下:
```
	//重写onTouchEvent方法
	@Override
    public boolean onTouchEvent(MotionEvent event) {
        mCamera.autoFocus(this);//让Activity实现接口
        return true;
    }

	//实现接口中的方法，自动对焦完成时的回调
	@Override
    public void onAutoFocus(boolean success, Camera camera) {
		//在这里可以判断对焦是否成功，进行一些操作
    }
```
自动对焦已经完成，调用Google的东西真是很简单，我们可以在这里加个提示框啊什么的，后面有时间再说。


----------


### 2.2.7 照相 ###


----------
终于要照相了，T^T
照相调用camera.takePicture方法，
代码如下：

```
	private Camera.PictureCallback pictureCallback = new Camera.PictureCallback() {//照相动作回调用的pictureCallback

        //在这里可以获得拍照后的图片数据
        @Override
        public void onPictureTaken(byte[] data, Camera camera) {
        
	        //byte[]数组data就是图片数据，可以在这里对图片进行处理
            mCamera.startPreview();//恢复预览
        }
    };
    
    //点击事件
	@Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.imgbtnTakePhoto:
                mCamera.takePicture(null, null, pictureCallback);//拍照会停止预览
                break;
            default:
                break;
        }
    }
就先写到这里吧，有精力再补充。。