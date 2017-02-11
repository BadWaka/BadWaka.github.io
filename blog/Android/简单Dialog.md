简单Dialog对话框
思路：
1.建一个构造器Builder，一般使用AlertDialog.Builder
2.设置标题Title，图片Icon，等一些通用属性
3.若是一般的提示信息，使用setMessage方法直接设置显示的文本

```
builder.setMessage("是否确认退出？");
```
若是列表项，则：

```
//items是一个字符串数组，用来显示list的文本信息
builder.setItems(items, new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
			//这里可以通过which来判断是哪一个选项被点击，实现点击事件
			}
		});
```
若是单选框，则：

```
//items是一个字符串数组，用来显示radio的文本信息，第二个参数为默认选中状态
builder.setSingleChoiceItems(items,0,new DialogInterface.OnClickListener() {  
            @Override  
            public void onClick(DialogInterface dialog, int which) {  
            }  
        });  
```
若是多选列表，则

```
final boolean selected[]={true,false,true}; 
//第二个参数为默认选中状态,boolean类型的数组
builder.setMultiChoiceItems(items,selected,new DialogInterface.OnMultiChoiceClickListener() {  
            @Override  
            public void onClick(DialogInterface dialog, int which, boolean isChecked) {  
            }  
        });  
```
若是一个View，则

```
builder.setView(new EditText(this));
```
若是一个自定义布局文件，则

```
LayoutInflater layoutInflater = getLayoutInflater();
		View view = layoutInflater.inflate(R.layout.activity_main,null);
setView(view);
```

4.设置积极（右）/消极（左）/中立（中）按钮

```
builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
			}
		});
builder.setNegativeButton();		//消极
builder.setNeutralButton();			//中立
```
5.别忘了，还有创建和显示

```
builder.create().show();
```
OK，这样一个简单的dialog就创建完成了，下面是源代码:

```
package com.example.dialogdemo;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		//生成dialog
		dialogLayout();
	}
	/**
	 * 简单dialog
	 */
	private void dialog1(){
		AlertDialog.Builder builder = new AlertDialog.Builder(this);		//得到构造器,    alert:警告；警觉
		builder.setTitle("警告");
		builder.setMessage("是否确认退出？");
		builder.setIconAttribute(R.drawable.ic_launcher);
		//设置是按钮，右边，positive：积极地；正确的
		builder.setPositiveButton("是", new DialogInterface.OnClickListener() {
			
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// TODO Auto-generated method stub
				dialog.dismiss();							//关闭dialog
				Toast.makeText(MainActivity.this, "确认"+which, Toast.LENGTH_LONG).show();
			}
		});
		//设置否按钮，左边，Negative：消极的；否定的
		builder.setNegativeButton("否", new DialogInterface.OnClickListener() {
			
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// TODO Auto-generated method stub
				dialog.dismiss();
				Toast.makeText(MainActivity.this, "否", Toast.LENGTH_LONG);
			}
		});
		//设置取消按钮，中间，Neutral：中性的；中间的
		builder.setNeutralButton("取消", new DialogInterface.OnClickListener() {
			
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// TODO Auto-generated method stub
				dialog.dismiss();
				Toast.makeText(MainActivity.this, "取消", Toast.LENGTH_LONG).show();
			}
		});
		builder.create().show(); 								//显示dialog
	}
	/**
	 * 简洁的写法
	 */
	private void dialog1_1(){  
	       //先new出一个监听器，设置好监听  
	       DialogInterface.OnClickListener dialogOnclicListener=new DialogInterface.OnClickListener(){  
	  
	           @Override  
	           public void onClick(DialogInterface dialog, int which) {  
	               switch(which){  
	                   case Dialog.BUTTON_POSITIVE:  
	                       Toast.makeText(MainActivity.this, "确认" + which, Toast.LENGTH_SHORT).show();  
	                       break;  
	                   case Dialog.BUTTON_NEGATIVE:  
	                       Toast.makeText(MainActivity.this, "取消" + which, Toast.LENGTH_SHORT).show();  
	                       break;  
	                   case Dialog.BUTTON_NEUTRAL:  
	                       Toast.makeText(MainActivity.this, "忽略" + which, Toast.LENGTH_SHORT).show();  
	                       break;  
	               }  
	           }  
	       };  
	       //dialog参数设置  
	       AlertDialog.Builder builder=new AlertDialog.Builder(this);  //先得到构造器  
	       builder.setTitle("提示"); //设置标题  
	       builder.setMessage("是否确认退出?"); //设置内容  
	       builder.setIcon(R.drawable.ic_launcher);//设置图标，图片id即可  
	       builder.setPositiveButton("确认",dialogOnclicListener);  
	       builder.setNegativeButton("取消", dialogOnclicListener);  
	       builder.setNeutralButton("忽略", dialogOnclicListener);  
	       builder.create().show();  
	   }  
	/**
	 * 列表对话框
	 */
	private void dialogList(){
		AlertDialog.Builder builder = new AlertDialog.Builder(this);							//先建构造器
		final String [] items = new String[] {"清蒸","红烧","爆炒"};								//匿名内部类不能引用非final类型变量
		builder.setTitle("Tips");  													//设置标题
		builder.setIcon(R.drawable.ic_launcher); 							//设置图片
		//设置列表项
		builder.setItems(items, new DialogInterface.OnClickListener() {
			
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// TODO Auto-generated method stub
				dialog.dismiss();
				Toast.makeText(MainActivity.this, items[which], Toast.LENGTH_LONG).show();
			}
		});
		//设置确定按钮
		builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
			
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// TODO Auto-generated method stub
				dialog.dismiss();
				Toast.makeText(MainActivity.this, "确定", Toast.LENGTH_LONG).show();
			}
		});
		builder.create().show();
	}
	/**
	 * 单选对话框
	 */
	private void dialogSingle(){
		//一款超简单的没有监听器的单选框dialog
		new AlertDialog.Builder(this).setTitle("单选Dialog").setSingleChoiceItems(new String[]{"sada","retger","zklcxw"}, 0, null).setPositiveButton("yes", null).setNeutralButton("no", null).create().show();
	}
	/**
	 * 复选对话框
	 */
	private void dialogMulti(){
		new AlertDialog.Builder(this).setTitle("复选").setIcon(R.drawable.ic_launcher).setMultiChoiceItems(new String[]{"篮球","足球","月球"}, new boolean[]{false,false,true}, null).setPositiveButton("yes", null).setNegativeButton("no", null).setNeutralButton("cancel", null).create().show();
	}
	/**
	 * editText对话框
	 */
	private void dialogView(){
		new AlertDialog.Builder(this).setTitle("ViewDialog").setView(new EditText(this)).setPositiveButton("yes", null).setNeutralButton("no", null).create().show();;
	}
	/**
	 * 自定义布局dialog
	 */
	private void dialogLayout(){
		LayoutInflater layoutInflater = getLayoutInflater();
		View view = layoutInflater.inflate(R.layout.activity_main,null);
		new AlertDialog.Builder(this).setTitle("SelfDialog").setView(view).setPositiveButton("yes", null).setNeutralButton("no", null).create().show();;
	}
}


```