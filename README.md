# 雅虎商城快速导出订单，方便发货处理

    使用chrome 或才 firefox 开发者工具，在控制台里直接执行代码。复制，粘贴，回车，即可轻松搞定

### 第一步 ，打开订单页面，需要导出的数据的标签，F12 或者  Fn+F12 打开控制台
    按F12 或者 Fn+F12

### 第二步， 复制 （hook.min.js 里的全部内容），在控制台里粘贴，回车
    此时界面会有变化，显示了简单的操作界面，第一部分是默认数据列，第二部分是可数据列，第三部分是导出选项和操作
    勾选数据列，可以选择是否导出，勾选的顺序，决定数据列的顺序 （红色字体标出）
    可选数据列，因为数据列太多，默认不显示
    点生成数据，如果成功，将出现下载按键，可直接下载到Excel里。

### 或者直接复制下面代码在控制台里粘贴，回车 (此方法行不通)
``` javascript
//使用document
var head= document.getElementsByTagName('head')[0];
var script= document.createElement('script');
script.type= 'text/javascript';
script.src= 'https://rawcdn.githack.com/sporttery/yahoo_order_export_tools/ffc30c3a52a84d085edfa94dfca20c1f62e5a10e/hook.min.js?t='+(+new Date);
head.appendChild(script);
//使用jQuery  CDN
$.getScript('https://rawcdn.githack.com/sporttery/yahoo_order_export_tools/ffc30c3a52a84d085edfa94dfca20c1f62e5a10e/hook.min.js');
//使用jQuery
$.getScript('https://raw.githack.com/sporttery/yahoo_order_export_tools/master/hook.min.js');
```
    
### 后面有时间再写一个浏览器插件
    谢谢！