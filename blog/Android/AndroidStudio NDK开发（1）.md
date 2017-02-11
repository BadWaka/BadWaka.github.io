> 感谢 "Sodino" 大神的无私分享！
> 这是他的博客地址：http://blog.csdn.net/sodino/article/details/41946607
> 
> 感谢 “穷_小_子” 大神的无私分享！
> 这是他的博客地址：http://blog.csdn.net/tuoguang/article/details/48141251

----------
不劳而获的喜悦，走向毁灭。

----------


##在AndroidStudio中集成开发NDK的步骤

在Eclipse中，需要配置很多东西，手动下载NDK，下载UNIX/Linux模拟环境cygwin等等很多的东西，很麻烦；
但是在AndroidStudio中可以大大简化繁琐的步骤。

我的AndroidStudio版本是1.5.1，推荐使用1.3以上版本。

----------
##1.NDK环境配置


----------
###1.1. 下载NDK


----------
点击File--->Settings--->Appearance&Behavior--->System Settings--->Android SDK--->SDK Tools
下载NDK开发工具包

![这里写图片描述](http://img.blog.csdn.net/20160113145831476)

----------
###2.2. 配置NDK路径

----------
点击File--->Project Structure
配置NDK路径，NDK默认目录是sdk目录下的ndk-bundle

![这里写图片描述](http://img.blog.csdn.net/20160113150848156)

在local.properties文件中查看是否配置成功

![这里写图片描述](http://img.blog.csdn.net/20160113151127697)

----------
###2.3. 修改gradle.properties配置

----------
> 之前是没有修改这条的，会出现很多错误
> Error:Execution failed for task ':app:compileDebugNdk'.
> Error: NDK integration is deprecated in the current plugin.  Consider trying the new experimental plugin.  For details, see http://tools.android.com/tech-docs/new-build-system/gradle-experimental.  Set "android.useDeprecatedNdk=true" in gradle.properties to continue using the current NDK integration.
> 
> 解决方案地址：http://stackoverflow.com/questions/31979965/after-updating-android-studio-to-version-1-3-0-i-am-getting-ndk-integration-is

在gradle.properties文件里加上`android.useDeprecatedNdk=true`这句话，就行了

![这里写图片描述](http://img.blog.csdn.net/20160113170108104)

----------


##2.Demo程序


----------
###2.1 生成.h头文件

因为在Android中，头文件必须严格遵循jni的命名规则，所以我们使用javah自动生成我们需要的头文件

新建一个Android工程
添加native接口

```
public class MainActivity extends Activity {

    //静态，添加native接口
    static {
        System.loadLibrary("JniTest");
    }

    public native String getStringFromNative();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TextView textView = (TextView) findViewById(R.id.textView);
        textView.setText(getStringFromNative());
    }
}
```
![这里写图片描述](http://img.blog.csdn.net/20160113173005372)

这时候getStringFromNative方法是红的，因为我们还没有建立jni文件夹和c库（截图不是红的是因为我之后补截了一个）

点击Build--->Make Project编译，生成.class文件
点击view--->Tool Windows--->Terminal，打开控制台

![这里写图片描述](http://img.blog.csdn.net/20160113152944622)

默认进入到的是当前工程的目录，输入命令：cd app\src\main，切换到main目录下

![这里写图片描述](http://img.blog.csdn.net/20160113153225543)

输入javah -d jni -classpath C:\Android\sdk\platforms\android-22\android.jar;..\..\build\intermediates\classes\debug com.waka.workspace.ndkdemo.MainActivity

> 提示：命令行意义解析
> javah是生成头文件需要的工具
> -d jni 在工程下生成jni目录，会在这里放c/c++文件
> -classpath C:\Android\sdk\platforms\android-22\android.jar 是sdk文件夹下android.jar所在的文件位置，可以配置到环境变量中快速调用，这里注意要用分号";"和后面区分开
> ..\\..\build\intermediates\classes\debug 指向debug目录，注意和后面用空格" "区分开
> com.waka.workspace.ndkdemo.MainActivity 需要调用ndk的类
> ![这里写图片描述](http://img.blog.csdn.net/20160113160440897)

**注意：不要继承AppCompatActivity，会报错**
![这里写图片描述](http://img.blog.csdn.net/20160113154712783)

改为继承Activity，Make Project重新编译，生成.class文件;
再次输入javah -d jni -classpath C:\Android\sdk\platforms\android-22\android.jar;..\..\build\intermediates\classes\debug com.waka.workspace.ndkdemo.MainActivity

生成头文件成功
![这里写图片描述](http://img.blog.csdn.net/20160113155134314)

可以看到项目里出现了jni文件夹和.h头文件
![这里写图片描述](http://img.blog.csdn.net/20160113155300367)

![这里写图片描述](http://img.blog.csdn.net/20160113171029935)

----------
###2.2 在jni目录下建立C源文件

----------
![这里写图片描述](http://img.blog.csdn.net/20160113161609659)
![这里写图片描述](http://img.blog.csdn.net/20160113162245761)

生成了两个文件main.c和main.h
![这里写图片描述](http://img.blog.csdn.net/20160113162342133)

把main.h删了，main.c里改为`#include "com_waka_workspace_ndkdemo_MainActivity.h"`，并实现头文件中的方法 

```
JNIEXPORT jstring JNICALL
Java_com_waka_workspace_ndkdemo_MainActivity_getStringFromNative
        (JNIEnv *env, jobject obj) {
    return (*env)->NewStringUTF(env, "Hello From JNI!");
}
```

![这里写图片描述](http://img.blog.csdn.net/20160113170939288)


----------

###2.3 修改build.gradle配置

----------
工程中共有两个build.gradle配置文件，我们修改Project\app\build.gradle这个文件

![这里写图片描述](http://img.blog.csdn.net/20160113163941522)

在defaultConfig分支中加上

```
		ndk {
            moduleName "JniTest"
            ldLibs "log", "z", "m"
            abiFilters "armeabi", "armeabi-v7a", "x86"
        }
```
以上配置代码指定的so库名称为JniTest，链接时用到的库，对应android.mk文件中的LOCAL_LDLIBS，及最终输出指定三种abi体系结构下的so库

![这里写图片描述](http://img.blog.csdn.net/20160113170607428)

Android Studio不用配置android.mk文件，但是不用配置不代表他没有，只不过配置过程不用我们来做，我们使用gradle就可以自动生成了
那android.mk在哪呢？
点击Build--->Make Project重新编译，即可找到android.mk文件

![这里写图片描述](http://img.blog.csdn.net/20160113171711214)

----------

这时候运行程序，已经可以看到成功了

![这里写图片描述](http://img.blog.csdn.net/20160113172654479)

