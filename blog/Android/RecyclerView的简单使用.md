我是想做个日历应用的，发现需要用到RecyclerView，之前也经常用但是还是会忘记，所以还是把它写下来吧~~~haha

## 1.导入依赖库##
首先导入依赖

```
compile 'com.android.support:recyclerview-v7:23.1.1'
```

![这里写图片描述](http://img.blog.csdn.net/20160114184244664)


----------
## 2.XML布局文件##
在xml中写入

```
		<android.support.v7.widget.RecyclerView
            android:id="@+id/rvCalendar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

        </android.support.v7.widget.RecyclerView>
```
![这里写图片描述](http://img.blog.csdn.net/20160114184428427)


----------
在layout文件夹下新建recyclerview_item文件

![这里写图片描述](http://img.blog.csdn.net/20160114184623506)


----------
## 3.继承RecyclerView.Adapter##
写最重要的Adapter类，这次不用再继承BaseAdapter了，直接继承RecyclerView.Adapter，实现需要重写的方法即可；再也不需要自己重写getView方法，自己做缓存了，RecyclerView都给我们封装好了

![这里写图片描述](http://img.blog.csdn.net/20160114185717355)

```
public class RvAdapterTemplate extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
	    //在这里关联布局文件，生成view对象
        return null;
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
		//在这里绑定数据
    }

    @Override
    public int getItemCount() {
        return 0;//得到数量
    }
}
```


----------
当然别忘了构造方法

```
private Context context;//上下文
private List<Map<String, Object>> datas;//数据列表，为了实现最灵活的数据，使用list嵌套map的方式
    
    public RvCalendarAdapter(Context context, List<Map<String, Object>> datas) {
        this.context = context;
        this.datas = datas;
    }
```

----------
写ViewHolder内部类，直接继承RecyclerView.ViewHolder即可

```
	protected class MyViewHolder extends RecyclerView.ViewHolder {

        protected LinearLayout llDate;
        protected TextView tvDate, tvLunarDate;

        public MyViewHolder(View itemView) {
            super(itemView);

            //initView
            llDate = (LinearLayout) itemView.findViewById(R.id.llDate);
            tvDate = (TextView) itemView.findViewById(R.id.tvDate);
            tvLunarDate = (TextView) itemView.findViewById(R.id.tvLunarDate);

            //initEvent
            llDate.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                }
            });
        }
    }
```


----------
然后在onCreateViewHolder中获取ViewHolder的实例

```
MyViewHolder viewHolder = new MyViewHolder(LayoutInflater.from(context).inflate(R.layout.recyclerview_item_calendar, parent, false));//关联布局
return viewHolder;
```


----------
在onBindViewHolder中绑定数据

```
	//Map中的字段值，写在常量中方便更改
    public static final String TV_DATE = "tvDate";
    public static final String TV_LUNAR_DATE = "tvLunarDate";

	public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        MyViewHolder viewHolder = (MyViewHolder) holder;//强制转换下
        viewHolder.tvDate.setText((String) datas.get(position).get(TV_DATE));
        viewHolder.tvLunarDate.setText((String) datas.get(position).get(TV_LUNAR_DATE));
    }
```


----------
返回数据列表的大小
```
public int getItemCount() {
        return datas.size();
    }
```
这样Adapter已经写好了。

----------
## 4.在程序中调用##
RecyclerView比较其他两个类似的view多了一个setLayoutManager方法，用这个方法既可以实现listView的布局也可以实现GridView的布局，更牛的是还能实现瀑布流的布局！这个在以前是很麻烦的。。

不过它没有点击事件，只能自己写。。。

代码中省略部分无关代码。。。。。。
```
public class CalendarFragment extends Fragment {

    private RecyclerView rvCalendar;//RecyclerView的实例
    private RvCalendarAdapter rvCalendarAdapter;//Adapter
    private List<Map<String, Object>> dateList;//数据集

    /**
     * onCreateView
     *
     * @param inflater
     * @param container
     * @param savedInstanceState
     * @return
     */
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_calendar, container, false);
        initView(view);
        initData();
        initEvent();
        return view;
    }

    /**
     * initView
     *
     * @param view
     */
    private void initView(View view) {
        rvCalendar = (RecyclerView) view.findViewById(R.id.rvCalendar);//获得实例
    }

    /**
     * initData
     */
    private void initData() {
        dateList = new ArrayList<>();//初始化数据集
        for (int i = 0; i < 30; i++) {
            addDatasToDateList("14", "初五");//循环添加测试数据
        }
        //rvCalendar.setLayoutManager(new LinearLayoutManager(this.getActivity()));//设置为线性布局，listView既视感
        rvCalendar.setLayoutManager(new GridLayoutManager(this.getActivity(), 7));//设置网格布局，gridView既视感
        rvCalendarAdapter = new RvCalendarAdapter(this.getActivity(), dateList);
        rvCalendar.setAdapter(rvCalendarAdapter);
    }

    /**
     * initEvent
     */
    private void initEvent() {

    }

    /**
     * 往dateList中填数据
     *
     * @param date
     * @param lunarDate
     */
    private void addDatasToDateList(String date, String lunarDate) {
        Map<String, Object> map = new HashMap<>();
        map.put(RvCalendarAdapter.TV_DATE, date);
        map.put(RvCalendarAdapter.TV_LUNAR_DATE, lunarDate);
        dateList.add(map);
    }
}
```
就这样，一个RecyclerView就能用了~

下面是效果图
![这里写图片描述](http://img.blog.csdn.net/20160116114535906)

点击事件，添加分割线，添加headView，footView和下拉刷新就以后有时间在写咯~


