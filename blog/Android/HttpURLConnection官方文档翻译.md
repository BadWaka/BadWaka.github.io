> 本篇为翻译文章，原文地址在这里http://developer.android.com/intl/zh-cn/reference/java/net/HttpURLConnection.html


因为Android6.0已经放弃HttpClient，而Volley和okhttp需要导入第三方库，公司项目因条件比较特殊，不予许擅自导入第三方库，所以只能使用另一个原生网络连接类HttpURLConnection。虽然我一直觉得HttpClient比较好用。。。

网上查的HttpURLConnection讲的不是很全，大体都是讲边流程而已，而且大多都很老旧，这都2016年了喂大哥！所以干脆把最新的官方文档翻译一下吧~~


----------
API Level: 23

public abstract class 公有抽象类
#HttpURLConnection
extends URLConnection

----------
java.lang.Object
   ↳	java.net.URLConnection
 	   ↳	java.net.HttpURLConnection
Known Direct Subclasses 已知的直接子类
**HttpsURLConnection**


----------
#类概述
一个为HTTP协议(RFC 2616)设计的URLConnection，被用来在网络上发送和接收数据。数据可能是任何类型，也可能是任何长度。这个类也可以被用在发送和接收那些提前并不知道长度的流数据上。

使用这个类应该遵循的模板：

* 1 得到一个新的HttpURLConnection实例应该通过调用URL.openConnection()这个方法，然后把结果强制转换为HttpURLConnection。

* 2 准备请求。请求的主要属性是它的URI。请求头也包括元数据，比如证书、首选内容类型和会话cookie。

* 3 可选择地上传一个请求体。如果实例包含请求体，则必须配置setDoOutput(true)。通过写入流来传输数据，返回值在getOutputStream()中。

* 4 读取响应（返回结果）。响应头通常包括元数据，比如响应体的内容类型和长度，修改日期和会话cookie。响应体可以通过getInputStream()将流读取出来。如果响应没有响应体，这个方法会返回一个空的流。

* 5 断开连接。一旦响应体读取完成，这个HttpURLConnection就应该被断开，调用disconnect()方法断开。断开会释放connection所持有的资源，所以它们可能会被关闭或者重用。

例如，检索网页 http://www.android.com/

```
URL url = new URL("http://www.android.com/");
HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
try {
	InputStream in = new BufferedInputStream(urlConnection.getInputStream());
	readStream(in);
finally {
	urlConnection.disconnect();
	}
}
```


----------
#通过 HTTPS进行安全通信

已"https"的方式在一个URL上调用openConnection()方法会返回一个HttpsURLConnection对象，这个对象允许去重写默认的HostnameVerifier（主机名验证）和SSLSocketFactory（安全套接字工厂）。通过SSLContext创建一个应用程序提供的SSLSockerFactory，它可以提供一个自定义的X509TrustManager，用来验证证书链；它还可以提供一个自定义的X509KeyManager，用来提供客户端证书。查看HttpsURLConnection，获取更多细节。


----------
#响应处理

HttpURLConnection遵循五个HTTP重定向。它从一个源服务器重定向到另一个。这个实现不会将HTTPS重定向到HTTP，反之亦然 。
如果这个HTTP响应表明有错误发生，getInoutStream()方法将会抛出一个IOException。使用getErrorStream()来读取错误响应信息。响应头可以使用getHeaderFields()方法来正常读取。


----------
#发布内容

要上传数据到服务端，使用setDoOutput(true)来配置connection的输出。
为了获得最佳的性能，当请求体长度事先已经知道的时候你应该使用setFixedLengthStreamingMode(int)，事先不知道的时候使用setChunkedStreamingMode(int)。要不然的话这个HttpURLConnection会在传输完成之前被迫地把整个的请求体都缓冲在内存中，浪费（很可能会耗尽）堆和增加延迟。

例如，执行一个上传：

```
HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
try {
	urlConnection.setDoOutput(true);
	urlConnection.setChunkedStreamingMode(0);

	OutputStream out = new BufferedOutputStream(urlConnection.getOutputStream());
	writeStream(out);

	InputStream in = new BufferedInputStream(urlConnection.getInputStream());
	readStream(in);
finally {
	urlConnection.disconnect();
	}
}
```


----------
#性能

通过这个类返回的输入流和输出流是没有缓冲的。大多数调用者应该用BufferedInputStream或者BufferedOutputStream将返回的流包裹起来。那些只做批量读取或写入的调用者们可以忽略缓冲操作。
当从服务端或者向服务端传输大量的数据时，要限制一次性在内存里可以存多少数据。除非你需要一下子把整个数据体都放在内存中，当成一个流（不是把整个数据体当做一个字节数组或者字符串来存储，而是流）来处理。

为了减少延迟，这个类可以为多个请求/响应重用相同的底层套接字。因此，HTTP连接能够被重新打开的功能就不再重要了。调用disconnect()方法会从连接套接字池中返回一个套接字。在任意HTTP请求发出之前，这种行为都可以通过将系统属性http.keepAlive设置为false来禁用。http.maxConnections属性可以用来控制连接每个服务器的空闲的connections的数量。

在HttpURLConnection请求的实现里，服务器默认使用gzip压缩，当使用者调用getInputStream()时，它会自动将数据解压。内容编码和内容长度响应头在实例中被清除。可以通过在请求头中设置可接受的编码格式来禁用gzip压缩。

```
urlConnection.setRequestProperty("Accept-Encoding", "identity");
```
在请求头中设置可接受的编码格式可以显示的禁用自动解压缩，让响应头更完整。但是要求调用者必须根据响应的内容编码头来自行处理解压缩操作。

getContentLength()方法返回的传输的字节数，并不能被用来估计有多少字节可以用getInputStream()方法从压缩流中读取出来。相反的，它会一直读取流，直到当read()返回-1的时候。


----------


