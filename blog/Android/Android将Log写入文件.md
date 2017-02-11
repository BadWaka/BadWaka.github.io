
#为什么要将Log写入文件
运行应用程序的时候，大多数是不会连接着IDE的；
而当应用程序崩溃时，我们需要收集复现步骤，在设备上复现，并进行Debug；

而由于Android手机的多样性，有些问题是某个机型特有的， 这样很难去复现；
所以我们想能不能把重要的log输出在文件中，有问题，有bug直接把log发过来，这样可以大大简化复现的流程，增加Debug的速度。

#原理简介
其实原理很简单，就是把一行行字符串写入文件中而已。

这里选用了静态方法调用，跟系统的log一样，使用起来比较方便；
需要注意的是，使用之前需要传入context进行初始化，这样是为了获得系统规定好的存储路径，将数据写入Android希望我们写入的地方，便于卸载时清除；
其实也可以不传入context，直接用Environment的静态方法获取外部储存路径，自定义文件名即可，但是这样比较不规范，不推荐这样做；

代码很简单，分享在CSDN上方便以后使用。

#权限

```
    <!--外部存储读取权限-->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```


#源码：


GitHub地址：

> https://github.com/BadWaka/LogToFile

```
package com.waka.workspace.logtofile;

import android.content.Context;
import android.os.Environment;
import android.util.Log;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * 将Log日志写入文件中
 * <p>
 * 使用单例模式是因为要初始化文件存放位置
 * <p>
 * Created by waka on 2016/3/14.
 */
public class LogToFile {

    private static String TAG = "LogToFile";

    private static String logPath = null;//log日志存放路径

    private static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss", Locale.US);//日期格式;

    private static Date date = new Date();//因为log日志是使用日期命名的，使用静态成员变量主要是为了在整个程序运行期间只存在一个.log文件中;

    /**
     * 初始化，须在使用之前设置，最好在Application创建时调用
     *
     * @param context
     */
    public static void init(Context context) {
        logPath = getFilePath(context) + "/Logs";//获得文件储存路径,在后面加"/Logs"建立子文件夹
    }

    /**
     * 获得文件存储路径
     *
     * @return
     */
    private static String getFilePath(Context context) {

        if (Environment.MEDIA_MOUNTED.equals(Environment.MEDIA_MOUNTED) || !Environment.isExternalStorageRemovable()) {//如果外部储存可用
            return context.getExternalFilesDir(null).getPath();//获得外部存储路径,默认路径为 /storage/emulated/0/Android/data/com.waka.workspace.logtofile/files/Logs/log_2016-03-14_16-15-09.log
        } else {
            return context.getFilesDir().getPath();//直接存在/data/data里，非root手机是看不到的
        }
    }

    private static final char VERBOSE = 'v';

    private static final char DEBUG = 'd';

    private static final char INFO = 'i';

    private static final char WARN = 'w';

    private static final char ERROR = 'e';

    public static void v(String tag, String msg) {
        writeToFile(VERBOSE, tag, msg);
    }

    public static void d(String tag, String msg) {
        writeToFile(DEBUG, tag, msg);
    }

    public static void i(String tag, String msg) {
        writeToFile(INFO, tag, msg);
    }

    public static void w(String tag, String msg) {
        writeToFile(WARN, tag, msg);
    }

    public static void e(String tag, String msg) {
        writeToFile(ERROR, tag, msg);
    }

    /**
     * 将log信息写入文件中
     *
     * @param type
     * @param tag
     * @param msg
     */
    private static void writeToFile(char type, String tag, String msg) {

        if (null == logPath) {
            Log.e(TAG, "logPath == null ，未初始化LogToFile");
            return;
        }

        String fileName = logPath + "/log_" + dateFormat.format(new Date()) + ".log";//log日志名，使用时间命名，保证不重复
        String log = dateFormat.format(date) + " " + type + " " + tag + " " + msg + "\n";//log日志内容，可以自行定制

        //如果父路径不存在
        File file = new File(logPath);
        if (!file.exists()) {
            file.mkdirs();//创建父路径
        }

        FileOutputStream fos = null;//FileOutputStream会自动调用底层的close()方法，不用关闭
        BufferedWriter bw = null;
        try {

            fos = new FileOutputStream(fileName, true);//这里的第二个参数代表追加还是覆盖，true为追加，flase为覆盖
            bw = new BufferedWriter(new OutputStreamWriter(fos));
            bw.write(log);

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bw != null) {
                    bw.close();//关闭缓冲流
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

}

```
