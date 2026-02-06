<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2022-04-15 14:13:28
 * @LastEditTime: 2022-04-15 14:13:54
 * @LastEditors: lizhiliang
 * @Usage: 
-->
# 开发常用技巧

## 1. HTML

### 图片懒加载

图片懒加载可以避免立即加载那些不在屏幕中立即显示的图片素材，当用户滚动临近图片时再去开始加载。

换言之，当用户滚动到图片出现时再进行加载，否则不加载。这就降低了屏幕内容展示过程中的图片素材的请求数量，提升了站点性能。

往往我们都是通过javascript来实现的，通过监听页面滚动事件来确定加载对应的资源。但是，在不完全考虑兼容性的场景下，我们其实可以直接通过HTML来直接实现。

可以通过为图片文件添加loading="lazy"的属性来实现:

```html
<img src="image.png" loading="lazy" alt="lazy" width="200" height="200" />
```

### 输入提示

当用户在进行输入搜索功能时，如果能够给出有效的提示，这会大大提升用户体验。输入建议和自动完成功能现在到处可见，我们可以使用Javascript添加输入建议，方法是在输入框上设置事件侦听器，然后将搜索到的关键词与预定义的建议相匹配。

其实，HTML也是能够让我们来实现预定义输入建议功能的，通过<datalist>标签来实现。需要注意的是，使用时这个标签的id属性需要和input元素的list属性一致。

```html
<label for="country">请选择喜欢的国家:</label>
<input list="countries" name="country" id="country">
<datalist id="countries">
  <option value="UK">
  <option value="Germany">
  <option value="USA">
  <option value="Japan">
  <option value="India">
  <option value=“China”>
</datalist>
```

### Picture标签

HTML提供了<picture>标签，允许我们来添加多张图片资源，并且根据不同的分辨率需求来展示不同的图片。

```html
<picture>
  <source media="(min-width:768px)" srcset="med_flower.jpg">
  <source media="(min-width:495px)" srcset="small_flower.jpg">
  <img src="high_flower" style="width: auto;" />
</picture>
```

### Base URL

当我们的页面有大量的锚点跳转或者静态资源加载时，并且这些跳转或者资源都在统一的域名的场景时，我们可以通过<base>标签来简化这个处理。

```html
<head>
  <base href="https://www.weibo.com/" target="_blank">  
</head>
<body>
  <a href="jackiechan">成龙</a>
  <a href="kukoujialing">贾玲</a>
</body>
```

### 页面重定向（刷新）

我们经常会遇到有些站点会有这样一个功能，“5s后页面将跳转”。这个交互可以嵌入到HTML中，直接通过<meta>标签，设置http-equiv="refresh"来实现

```html
<meta http-equiv="refresh" content="4; URL='https://google.com' />
```

## 2. Git

```shell
git clone https://github.com/microsoft/TypeScript --depth=1 ts
```

加上 --depth 会只下载一个 commit，所以内容少了很多，速度也就上去了。

而且下载下来的内容是可以继续提交新的 commit、创建新的分支的。不影响后续开发，只是不能切换到历史 commit 和历史分支。