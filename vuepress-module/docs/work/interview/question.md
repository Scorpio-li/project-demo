# 面试题

## 初级面试题

### HTML

1. H5的语义化？（为什么，有哪些标签）

2. 移动端的响应式布局方法？（至少三种）

3. 说一说浏览器的重绘和回流（重排）
当页面布局或DOM节点的属性发生变化时（reflow）
当DOM元素的可见性发生变化时，则产生重绘（repaint）
所以回流必定产生重绘

### CSS

1. css水平垂直居中的方法？（至少三种）

### JS

1. 说说Javascript为什么是单线程的？
2. 从输入一个 URL 地址到浏览器完成渲染的整个过程
3. 什么是事件代理（事件委托） 有什么好处
4. addEventListener 默认是捕获还是冒泡(冒泡)
    - addEventListener第三个参数默认为 false 代表执行事件冒泡行为。
    - 当为 true 时执行事件捕获行为。
5. webpack Plugin 和 Loader 的区别

- Loader：
用于对模块源码的转换，loader 描述了 webpack 如何处理非 javascript 模块，并且在 buld 中引入这些依赖。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或者将内联图像转换为 data URL。比如说：CSS-Loader，Style-Loader 等。


- Plugin
目的在于解决 loader 无法实现的其他事,它直接作用于 webpack，扩展了它的功能。在 webpack 运行的生命周期中会广播出许多事件，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

6. apply call bind 区别

- 三者都可以改变函数的 this 对象指向。

- 三者第一个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window。

- 三者都可以传参，但是 apply 是数组，而 call 是参数列表，且 apply 和 call 是一次性传入参数，而 bind 可以分为多次传入。

- bind 是返回绑定 this 之后的函数，便于稍后调用；apply 、call 则是立即执行 。

- bind()会返回一个新的函数，如果这个返回的新的函数作为构造函数创建一个新的对象，那么此时 this 不再指向传入给 bind 的第一个参数，而是指向用 new 创建的实例

7. http 状态码 204 301 302 304 400 401 403 404 含义

- http 状态码 204 （无内容） 服务器成功处理了请求，但没有返回任何内容
- http 状态码 301 （永久移动） 请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。
- http 状态码 302 （临时移动） 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
- http 状态码 304 （未修改） 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。
- http 状态码 400 （错误请求） 服务器不理解请求的语法（一般为参数错误）。
- http 状态码 401 （未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
- http 状态码 403 （禁止） 服务器拒绝请求。（一般为客户端的用户权限不够）
- http 状态码 404 （未找到） 服务器找不到请求的网页。

8. JavaScript 和 TypeScript 有什么区别？在技术选型的时候什么因素使你考虑用？



9. 举出闭包实际场景运用的例子

- 比如常见的防抖节流

```js
// 防抖
function debounce(fn, delay = 300) {
  let timer; //闭包引用的外界变量
  return function () {
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

- 模拟块级作用域

```js
function outputNumbers(count) {
  (function () {
    for (var i = 0; i < count; i++) {
      alert(i);
    }
  })();
  alert(i); //导致一个错误！
}
```

- 闭包可以用于在对象中创建私有变量

```js
var aaa = (function () {
  var a = 1;
  function bbb() {
    a++;
    console.log(a);
  }
  function ccc() {
    a++;
    console.log(a);
  }
  return {
    b: bbb, //json结构
    c: ccc,
  };
})();
console.log(aaa.a); //undefined
aaa.b(); //2
aaa.c(); //3
```

```js
function sayHi() {
    console.log('Hi')
}

function threeTimes(fn) {
    var times = 0;
    return () => {
        console.log('times', times)
        if(times < 3) {
            fn()
            times++;
        }
    }
    
}

const newFun = threeTimes(sayHi)
```

10. 代码题：

```js
func();
function func() {
    console.log('func')
}
var f = function b() {
    console.log('f')
}
f();
b();
```

```
'func'
'f'
Error: b is not defined
```

11. 代码题：

```js
for(var i = 0; i < 5; i++) {
    setTImeout(function() {
        console.log(i)
    }, i * 1000)
}

for(var j = 0;j < 5; j++) {
    (function(k) {
        setTImeout(function() {
            console.log(k)
        }, k * 1000)
    })(j)
}
```

```
5,5,5,5,5

0,1,2,3,4
```

6. 代码题：

```js
function foo(num) {
    console.log('foo' + num);
    this.count++;
}
foo.count = 0;
var m;
for(m = 0; m < 10; m++) {
    if(m > 5) {
        foo.call(foo, m)
    }
}
console.log(foo.count)
```

```
'foo6'
'foo7'
'foo8'
'foo9'
4
```

7. 代码题(事件循环相关)

```js
setTimeout(function () {
  console.log("1");
}, 0);
async function async1() {
  console.log("2");
  const data = await async2();
  console.log("3");
  return data;
}
async function async2() {
  return new Promise((resolve) => {
    console.log("4");
    resolve("async2的结果");
  }).then((data) => {
    console.log("5");
    return data;
  });
}
async1().then((data) => {
  console.log("6");
  console.log(data);
});
new Promise(function (resolve) {
  console.log("7");
  //   resolve()
}).then(function () {
  console.log("8");
});
```
- 输出结果：247536 async2 的结果 1


12. vue3.0中setup的参数有哪些

- props: 传入组件的参数（props是响应式的数据，不能进行结构，否则会失去响应式的特性）
- context: 普通对象

    - attr => $attr
    - slot => slot
    - emit => $emit
    
13. Vue3.0 中reactive, ref, toRef, toRefs

- reactive将引用类型数据变为响应式数据
- ref将基础类型数据变为响应式数据，之后需要通过value属性来获取值，因为Vue3使用了proxy实现了响应式原理，而proxy不能代理基础类型
- toRef将对象中的某个属性变为响应式数据
- toRefs批量将对象中的属性变为响应式数据

14. 自定义事件的方式

    1. newEvent => addEventlistener => dispatchEvent
    
    2. createEvent => initEvent => dispatchEvent

15. event.target 和 event.currentTarget的区别

- target指向触发事件的元素
- currentTarget指向绑定事件的元素

16. window.load 和DOMContentLoad的区别

window.load: 资源和图片加载完成之后进行触发
DOMContentLoad: 当Html被完全加载以及解析时


- es6语法用过哪些

- 基本数据类型

- let var区别

- 什么是闭包

- 闭包的同级变量和子级变量能否获取到

- this是什么

- 作用域有哪些

- 什么是块级作用域

- 如何在当前js中使用其他js

- 变量如何给数组添加新的方法？（考察原型、继承）

- 双等三等区别如何判断两个数组是否相等，是用双等还是三等？（是个坑，双等三等都不行）

- undefined和null区别

- 0.1+0.2在三等情况下是否等于0.3

- staic和assets有什么区别

- jQuery属性选择器如何拿到第三个input节点

- React生命周期，每个阶段做了什么

- docker用了哪些容器

- docker除容器外哪部分是抽离出来的

- ES6 继承方式有哪些

- 类有哪些东西可以被继承？

- 一个类中，static 普通方法 箭头函数重名时，会调用哪个？

- 箭头函数有哪些特性

- Scss如何复用变量

- scss中的@和％有什么区别

- 上传文件断点续传怎么做

- css兼容性有哪几种处理方案，

- css3新属性有哪些

- 怎么理解margin越界的问题

- js的继承方式有哪些

- 深拷贝怎么实现

- js的事件轮训机制有了解吗

- 说说call,apply,bind

- 聊聊es6的promise

- 为什么要用async，await

- vue生命周期

- vue双向数据绑定原理

- vue的异步更新，以及nexttick

- vue路由有哪几种方式，是如何实现的,以及注意事项

- vuex的使用，及其原理

- http与https的区别

- url输入到页面显示全过程

- redux的原理

- 项目中遇到过什么问题

- 有没有封装过组件，插件

- webpack怎么进行打包的

- 项目中是怎么优化的

- xss怎么处理的

- 基本上就这么多技术性的的问题，你们觉得难吗（是不是很简单，大佬见了都不信哈哈，），答案我就不写了，

- 然后就开始问我是如何管理前端组的

- 任务是如何分配

- 项目是怎么样协同开发的

- 如何兼顾产品经理和前端负责人的工作以及时间安排

- vuex包括哪些内容

- vue项目优化

- computed和watch区别

computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；

watch： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

运用场景：

- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；

- 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

- vue-router钩子介绍

- vue-router懒加载实现

- 用过的组件库有哪些

- MVVM如何实现

- diff算法理解

- v-if v-show区别

- 单页面多页面区别

- computed、watch区别

- location.href和vue-router跳转有什么区别

- 生命周期mount阶段做来什么

- 项目中有多个环境怎么处理

- v-once是做什么的

- 路由懒加载如何实现

- 图片懒加载原理是什么

- Vue 项目比起传统项目有什么优势

- vue如何实现自定义指令呢

- Vue项目中状态判断如何处理 ，比如在某个页面我需要判断用户是否是登录状态？

- 解释下什么是动态规划？ 它的应用场景，项目中有没有用到

- 我们假如要做抽奖活动，保证绝对的公平，把人名放在数组中，怎么去做

- MVC与MVVM分别介绍下

- MVC的数据流向是怎样的「双向流动」怎么解释双向流动？

- 解释下数据双向绑定

- 三个框架中有哪些是双向绑定的「vue angular」

- Angular是如何实现双向绑定的？「脏值检查」

- 你觉得react和vue有什么区别？「vue有很多内置指令，模板语法，react是一切皆组件」

- 如果我一直写vue，现在上手react，难点在哪？「es6语法，jsx模板语法」

- Url输入到页面显示经历了什么？「导航阶段 dns解析 tcp连接 TLS验证 发起请求 接收响应 连接中断。解析阶段 html js css分开解析，html解析为dom对象，拆分标签 text，js由v8引擎处理，css被解析为cssom 层树，光栅化」

- DNS是如何解析的？怎么拿到地址的

- DNS解析耗时吗？「耗时的，因为要查看是否有缓存」如何优化？（没答出来，被告知可以看看dns预解析）

- 你说到v8引擎，说下v8引擎如何解析一段js代码？「先转成AST树，再转成机器码，最后转为字节码，执行字节码。浏览器对重复的js代码有优化 即时编译技术，如果发现一段代码经常使用，则不用转字节码 直接执行机器码」

- Tcp连接过程解释下「就是常说的三次握手 第一次是客户端发起请求 第二次服务端作出应答 第三次客户端收到应答 知道服务器是通的告诉服务端要请求数据了」

- 了解事件循环吗

- 提供事件的队列是哪来的？

- 继续事件循环。 你说的宏任务微任务解释下

- 哪些被定义为宏任务，哪些被定义为微任务

- Promise是属于微任务吗？「不 promise.then属于微任务」

- 说下http请求方式「get post option还有restful中的put delete」

- Get post区别

- 说下restful规范

- 跨域如何解决？「jsonp iframe proxy nginx反向代理 websocket，后端配置响应头」 还有吗？「在本地开发时，有用chorme插件来关闭csrf检测解决跨域」说下iframe怎么跨域的？（网上看到的 说不清楚）proxy跨域的原理是什么？（这个确实不知道，被告知是webpack中的devsever配置后，node相当于启动了服务器，浏览器请求服务器相当于请求本地服务。）

- 小程序有做过吗？你见过小程序跨域吗？「没有」那意思就是跨域只在浏览器出现，那么 proxy解决跨域的原理就是启动了node服务器，转发其他端口的服务到本地，这样就不会跨域了。

- Webpack有用过吗？做过哪些配置？「不同环境的配置，devserver」有哪些优化措施？「tree shaking，路由懒加载，代码分割」

- 有做过哪些性能优化措施？「资源文件加载，代码压缩 雪碧图，cdn资源服务器」

- 既然webpack用过，那图片文件打包时转为base64，你觉得打包以后体积大了还是小了？「小了」其实打包以后图片体积大了30% 「那为什么还要打包？」因为当你图片特别多的时候 svg 等等图标特别多，每次请求src是不是都要请求网络，那请求网络是不是占用资源。 所以加载base64能减少请求次数

- Nodejs有没有接触过？「简历里那个公众号项目就是node做的」原生node吗？「koa做的」你介绍下koa「基于express的一个node框架，本质非常简单，把其他应用都作为中间件外包出去，核心是洋葱圈模型」  koa是基于express的？「嗯 是的」

- 说说洋葱圈模型「类似于柯里化，内层中间件返回的值作为外层中间件的参数」

- 说说柯里化「参数分开与放在一个括号里的结果相同」怎么实现呢？「可以拦截它的get方法和apply方法来实现」

- 有自己写过中间件吗？「没有，都用的别人的」node服务在线上跑的时候，报错了怎么查看控制台结果「错误统一捕获，在全局处理，放到日志中，查看日志」 日志用的是什么库？「koa-logger」

- node服务怎么让它后台启动的？「supervisor配置，然后开启进程」

- Webpack打包时间过久？打包文件过大怎么解决「第二个问题 代码拆分，把类似于vue这种几乎不变的框架放到cdn缓存，其他的文件模块化拆分，组件库按需加载，第一个问题打包时间过久虽然经常有遇到过，但也没办法解决。不过我了解到最近vue3有新动作，弃用webpack，改用新框架，主要解决开发环境打包过久的问题」

- 在网络请求中如何把大文件资源压缩传输？（没答上来）你知道GZip格式吗？「嗯 知道，在nginx配置时有设置过gzip压缩」

- 你简历写的oss大文件上传能具体说下吗

- 你在团队中是什么角色？你提到的规范是指？或者你从哪看到的相关规范？「vue官方文档写的已经很清楚了，推荐优化策略和规范」

- Vue生命周期

- 说下具体每个阶段做了什么事

- Vuex单向数据流解释下

- app有做过吗？

- Pc是如何适配移动端的

- 混合开发有做过吗

## 中级面试题
### 1. css怎么开启硬件加速（GPU加速）

浏览器在处理下面的 css 的时候，会使用 GPU 渲染

- transform（当 3D 变换的样式出现时会使用 GPU 加速）

- opacity

- filter

- will-change

```
采用 transform: translateZ(0)
采用 transform: translate3d(0, 0, 0)
使用 CSS 的 will-change属性。 will-change 可以设置为opacity、transform、top、left、bottom、right。
```

### 2. 常用设计模式有哪些并举例使用场景

1. 工厂模式 - 传入参数即可创建实例：虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode

2. 单例模式 - 整个程序有且仅有一个实例：vuex 和 vue-router 的插件注册方法 install 判断如果系统存在实例就直接返回掉

3. 发布-订阅模式 (vue 事件机制)

4. 观察者模式 (响应式数据原理)

5. 装饰模式: (@装饰器的用法)

6. 策略模式 策略模式指对象有某个行为,但是在不同的场景中,该行为有不同的实现方案-比如选项的合并策略

### 3. common.js 和 es6 中模块引入的区别？

CommonJS 是一种模块规范，最初被应用于 Nodejs，成为 Nodejs 的模块规范。运行在浏览器端的 JavaScript 由于也缺少类似的规范，在 ES6 出来之前，前端也实现了一套相同的模块规范 (例如: AMD)，用来对前端模块进行管理。自 ES6 起，引入了一套新的 ES6 Module 规范，在语言标准的层面上实现了模块功能，而且实现得相当简单，有望成为浏览器和服务器通用的模块解决方案。但目前浏览器对 ES6 Module 兼容还不太好，我们平时在 Webpack 中使用的 export 和 import，会经过 Babel 转换为 CommonJS 规范。在使用上的差别主要有：

1、CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

2、CommonJS 模块是运行时加载，ES6 模块是编译时输出接口（静态编译）。

3、CommonJs 是单个值导出，ES6 Module 可以导出多个

4、CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层

5、CommonJs 的 this 是当前模块，ES6 Module 的 this 是 undefined

### 4. babel 是什么，原理了解吗

Babel 是一个 JavaScript 编译器。他把最新版的 javascript 编译成当下可以执行的版本，简言之，利用 babel 就可以让我们在当前的项目中随意的使用这些新最新的 es6，甚至 es7 的语法。

Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。

解析
将代码解析成抽象语法树（AST），每个 js 引擎（比如 Chrome 浏览器中的 V8 引擎）都有自己的 AST 解析器，而 Babel 是通过 Babylon 实现的。在解析过程中有两个阶段：词法分析和语法分析，词法分析阶段把字符串形式的代码转换为令牌（tokens）流，令牌类似于 AST 中节点；而语法分析阶段则会把一个令牌流转换成 AST 的形式，同时这个阶段会把令牌中的信息转换成 AST 的表述结构。


转换
在这个阶段，Babel 接受得到 AST 并通过 babel-traverse 对其进行深度优先遍历，在此过程中对节点进行添加、更新及移除操作。这部分也是 Babel 插件介入工作的部分。


生成
将经过转换的 AST 通过 babel-generator 再转换成 js 代码，过程就是深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。


### 5. 原型链判断

```
Object.prototype.__proto__;
Function.prototype.__proto__;
Object.__proto__;
Object instanceof Function;
Function instanceof Object;
Function.prototype === Function.__proto__;
```

```js
Object.prototype.__proto__; //null
Function.prototype.__proto__; //Object.prototype
Object.__proto__; //Function.prototype
Object instanceof Function; //true
Function instanceof Object; //true
Function.prototype === Function.__proto__; //true
```

### 6. RAF 和 RIC 是什么

requestAnimationFrame： 告诉浏览器在下次重绘之前执行传入的回调函数(通常是操纵 dom，更新动画的函数)；由于是每帧执行一次，那结果就是每秒的执行次数与浏览器屏幕刷新次数一样，通常是每秒 60 次。

requestIdleCallback：: 会在浏览器空闲时间执行回调，也就是允许开发人员在主事件循环中执行低优先级任务，而不影响一些延迟关键事件。如果有多个回调，会按照先进先出原则执行，但是当传入了 timeout，为了避免超时，有可能会打乱这个顺序。

### 7. 有一个函数，参数是一个函数，返回值也是一个函数，返回的函数功能和入参的函数相似，但这个函数只能执行3次，再次执行无效，如何实现

```js
function sayHi() {
    console.log('hi')
}

function threeTimes(fn) {
    let times = 0
    return () => {
        if (times++ < 3) {
            fn()
        }
    }
}

const newFn = threeTimes(sayHi)
newFn()
newFn()
newFn()
newFn()
newFn() // 后面两次执行都无任何反应
```


### 8. 代码题：

```js
function Foo() {
  getName = function() { console.log(1) }
  return this
}

Foo.getName = function() { console.log(2) }
Foo.prototype.getName = function() { console.log(3) }

var getName = function() { console.log(4) }
function getName () { console.log(5)  }

写出下面代码，打印的内容
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
```

Foo.getName() // 2 这个应该没有什么质疑的, 因为函数 Foo 内部没有执行，所以执行外面的结果是  2

getName()  // 4 这个可能就有疑问❓为什么是 4 ，不应该是5吗，这个在我第一次做这道提的时候，就写了 5，结果在电脑上试了一下❎了，
因为这里考察了一个相对久远的 var 和 function 预解析的问题，他们两个是有优先级的
函数的优先级更高一下，而且预解析时函数是声明 + 赋值（这就是因为为什么日常函数声明写在下面，调用写在上面，也是可以用的）
而 var 是只声明，还没有赋值

Foo().getName() //1
这个应该没有什么质疑的，函数执行，调用里面的 getName 方法，所以结果打印 1

getName() // 1
因为上面的 Foo().getName() 执行, 里面的 getName 替换了外面的 getName 函数到全局上，所有执行的是 Foo 内部的 getName

new Foo.getName() // 2
这里应该又会有疑问，因为我这里第一次也写错了🤣，我以为会是 1 😅
因为：. 的优先级比 new 高，所以这里就是一个次 Foo.getName() 调用，所以是 2 ，new 是误导用的

new Foo().getName() // 3 这里我第一次写的 1 😳，然后不是和上面那个一样吗 🤔
其实不是，因为：new Foo() 加个括号，是提升了优先级，会去先执行 new Foo(), 然后在调用 .getName(), 那问题又来了，为啥不是 1，因为内部的 getName 不是绑定在 this 上的呀，所以就去找原型上的方法，结果是 3

new Foo.getName() //实例化的是Foo的静态函数getName内部的代码会执行输出2

new Foo().getName()；//实例化Foo对象，最后返回的this，也就是当前创建的对象。调用getName时，会在自己对象上查找，没有找到。然后会沿着对象中的__proto__（创建这个实例的构造函数的原型）查找。也就是在Foo.prototype这个对象查找，最终找到了。调用，输出3

### 说一说preload、prefetch、defer的区别

1. preload: 预加载（在页面开始之前就进行加载，常用在link）
2. prefetch: 懒加载（在浏览器的空闲时间进行加载）
3. defer: 异步加载（所有元素解析完成之后进行加载）

## 1. 操作计算题

### ['1','2','3'].map(parseInt)

- 答案：[1,NaN,NaN]

- 解析：
    - map的参数：
        1. currentValue
        callback 数组中正在处理的当前元素。
        
        2. **index可选 ** 看到这里先注意起来这个参数，思考一下
        callback 数组中正在处理的当前元素的索引。
        
        3. array可选
        callback  map 方法被调用的数组。
    - parseInt参数：
        - ![parseInt](https://user-gold-cdn.xitu.io/2019/2/22/1691435685020630?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
        - string: 必须，要被解析的字符串
        - radix：可选。表示要解析的数字的基数。

- 实际调用情况：

```js
parseInt('1',0,theArray);
parseInt('2',1,theArray);
parseInt('3',2,theArray);
```
- 第一次，当我我们第一次调用的时候 是这样的：parseInt('1',0) 这个是没问题的 转十进制的 看我红框的图片
返回 1

- 第二次，调用第二个index参数是1,也是说1作为数值的基础。规范里说的很清楚了，如果基础是非0或者小于2，函数都不会查询字符串直接返回NaN。

- 第三次，2作为基数。这就意味着字符串将被解析成字节数，也就是仅仅包含数值0和1。parseInt的规范第十一步指出，它仅尝试分析第一个字符的左侧，这个字符还不是要求基数的有效数字。这个字符串的第一个字符是“3”，它并不是基础基数2的一个有效数字。所以这个子字符串将被解析为空。第十二步说了：如果子字符串被解析成空了，函数将返回为NaN。

- 解决：

```js
['1','2','3'].map(function(value){
        return parseInt(value)
})
// <!--或-->
['1','2','3'].map(Number)
```

## 2. JavaScript块级作用域的默认变量和声明函数

```js
{
  a = 10;
  function a(){};
  console.log(a)//10
};
console.log(a);//10
```

### 块级作用域的默认变量

```js
console.log(window.a, a);//undefined, ReferenceError: a is not defined
{
  console.log(window.a,a);//undefined  、a is not defined
    a = 10;
    console.log(window.a,a)//10 10
}
console.log(window.a,a);//10 10
```
我们可以清晰的看到，在块级作用域中默认声明的变量，只有执行了声明代码，变量才会被挂载到全局作用域上。

```js
console.log(window.a,a);//undefined  undefined
{
  console.log(window.a,a);//undefined  、undefined
    var a = 10;
    console.log(window.a,a)//10 10
}
console.log(window.a,a);//10 10
```
对比上一个例子，我们可以得出，使用var声明的变量会在编译阶段被提升到全局作用域上，不过它只是将声明提升，赋值操作并未提升上去。

### 小结

- 在块级作用域中默认声明的变量，只有代码执行到声明语句之后，才可以进行访问，否则会报错。

- 块级作用域中默认声明的变量会被提升到全局作用域。

### 块级作用域的函数声明

块级作用域函数，就像预先在全局作用域中使用var声明了一个变量，且默认值为undefined。

```js
console.log(window.a,a);//undefined undefined
{
  console.log(window.a,a);//undefined function a(){}
  function a(){};
  console.log(window.a,a)//function a(){} function a(){}
}
console.log(window.a,a);//function a(){} function a(){}
```
- 至于第二行window.a=undefoned，而a=function a(){} ，上面在阮一峰老师的文章中说过，声明函数a会被提升到全局作用域，且在其块级作用域中，也会被提升到顶层。而window.a为什么会为undefined呢？因为只有window.a只有等块级作用域中函数声明的定义的那行代码执行过之后，才会被映射到全局作用域。

### 小结：

- 块级作用域函数在编译阶段将函数声明提升到全局作用域，并且会在全局声明一个变量，值为undefined。同时，也会被提升到对应的块级作用域顶层。

- 块级作用域函数只有定义声明函数的那行代码执行过后，才会被映射到全局作用域。

### 块级作用域中有同名的变量和函数声明

```js
console.log(window.a,a);//undefined undefined
{
    console.log(window.a,a);//undefined function a(){}
    function a() {};
    a = 10;
    console.log(window.a,a); //function a(){}  10
};
console.log(window.a,a); //function a(){}  function a(){}
```

首先，块级作用域函数a的声明会被提升到全局作用域，第一行打印比较符合预期。然后在块级作用域中，由于声明函数a提升到块级作用域顶端，所以打印a = function a(){}，而window.a由于并没有执行函数定义的那一行代码，所以仍然为undefined。当执行到声明函数定义的时候，就会把函数a映射到全局作用域中。当执行a = 10的时候，JS引擎会进行LHS查找，此时，声明函数已经被同时提升到全局作用域和块级作用域顶端了，由于遮蔽效果，此时查找a只会找到块级作用域内的a，并不会找到全局作用域的a，这时，a已经被定义，a = 10只会执行赋值操作，并不会进行提升。

```js
console.log(window.a,a);//undefined undefined
{
    console.log(window.a,a);//undefined function a(){}
       a = 10;
    function a() {};
    console.log(window.a,a); //10  10
};
console.log(window.a,a); //10 10
```

我们直接进行下一步，执行a = 10，我们知道，此时，在块级作用域中函数声明已经被提升到顶层，那么此时执行a，就是相当于赋值，将函数声明a赋值为数字a，可以理解吗？如果有疑问，可以看🌰1。然后，执行到函数声明语句，此时，虽然这一行代码是函数声明语句，但是a，已经为数字10了，所以，执行function a(){}之后，a的值10就会被赋值给全局作用域上的a，所以下面打印的window.a,a都为10！！！

### 小结

- 块级作用域函数只有执行函数声明语句的时候，才会重写对应的全局作用域上的同名变量。




## Javascript

### 1. Javascript是如何运行的

### 2. Js的闭包和上下文

- 基本执行上下文是全局执行上下文:它是代码中随处可访问的内容。

- 全局执行上下文为你创建了两个东西:全局对象和this关键字.

### 3. ES6做了那些升级优化

### 4. Bind,Call,Apply的区别

- .call方法会立即执行！

- .bind方法会返回函数的拷贝值，但带有绑定的上下文！ 它不会立即执行。

### 5. Promise内部实现原理

### 6. ES6有哪些方式实现继承

### 7. var、let、const创建变量

变量的赋值可以分为三个阶段：

- 创建变量，在内存中开辟空间

- 初始化变量，将变量初始化为undefined

- 真正赋值

let 的「创建」过程被提升了，但是初始化没有提升。（暂时死区）

var 的「创建」和「初始化」都被提升了。

function 的「创建」「初始化」和「赋值」都被提升了。

- 使用let（和const）关键字声明的变量是具有块作用域的（块是{}之间的任何东西）

### 8. 普通函数和箭头函数

对于箭头函数，this关键字指向是它所在上下文（定义时的位置）的环境，与普通函数不同！ 这意味着当我们调用时，它不是指向调用的对象，而是指其定义时的环境（window）

### 9. javascript运算符

- 一元加号会尝试将boolean类型转换为数字类型。 true被转换为1，false被转换为0。

- 取非运算符会将字符串类型转换为Boolean类型。

### 10. 构造函数

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person("Lydia", "Hallie");
const sarah = Person("Sarah", "Smith");

console.log(lydia);
console.log(sarah);

// Person {firstName: "Lydia", lastName: "Hallie"} and undefined
```

使用new时，它指的是我们创建的新空对象。 但是，如果你不添加new它指的是全局对象！

我们指定了this.firstName等于'Sarah和this.lastName等于Smith。 我们实际做的是定义global.firstName ='Sarah'和global.lastName ='Smith。 sarah本身的返回值是undefined。

### 11. 原型与原型链

- 除基础对象外，所有对象都有原型。 基础对象可以访问某些方法和属性，例如.toString。 这就是您可以使用内置JavaScript方法的原因！ 所有这些方法都可以在原型上找到。 虽然JavaScript无法直接在您的对象上找到它，但它会沿着原型链向下寻找并在那里找到它，这使您可以访问它。

- 基础对象指原型链终点的对象。基础对象的原型是null

### 12. 事件处理机制

事件捕获 -> 事件目标 -> 事件冒泡

事件处理程序在冒泡阶段执行（除非您将useCapture设置为true）。 它从最深的嵌套元素向外延伸。

- 通过event.stopPropagation停止冒泡

### 13. 数据类型

- 只有7种内置类型：null，undefined，boolean，number，string，object和symbol、BigInt。 function不是一个类型，因为函数是对象，它的类型是object。
- JavaScript只有原始类型和对象。
- 原始类型是boolean，null，undefined，bigint，number，string和symbol。

### 14. 前端路由跳转

两种不同方式的路由方式： Hash 和 History

1. Hash

Hash 方法是在路由中带有一个 #，主要原理是通过监听 # 后的 URL 路径标识符的更改而触发的浏览器 hashchange 事件，然后通过获取 location.hash 得到当前的路径标识符，再进行一些路由跳转的操作

    1. location.href：返回完整的 URL
    
    2. location.hash：返回 URL 的锚部分
    
    3. location.pathname：返回 URL 路径名
    
    4. hashchange 事件：当 location.hash 发生改变时，将触发这个事件

比如访问一个路径 http://sherlocked93.club/base/#/page1，那么上面几个值分别为：

```js
# http://sherlocked93.club/base/#/page1

{
  "href":"http://sherlocked93.club/base/#/page1",
  "pathname": "/base/",
  "hash":"#/page1"
}
```

> 因为 Hash 方法是利用了相当于页面锚点的功能，所以与原来的通过锚点定位来进行页面滚动定位的方式冲突，导致定位到错误的路由路径，所以需要采用别的办法，之前在写 progress-catalog 这个插件碰到了这个情况。

2. HTML5 History

- history.go(n)：路由跳转，比如n为 2 是往前移动2个页面，n为 -2 是向后移动2个页面，n为0是刷新页面

- history.back()：路由后退，相当于 history.go(-1)

- history.forward()：路由前进，相当于 history.go(1)

- history.pushState()：添加一条路由历史记录，如果设置跨域网址则报错

- history.replaceState()：替换当前页在路由历史记录的信息

- popstate 事件：当活动的历史记录发生变化，就会触发 popstate 事件，在点击浏览器的前进后退按钮或者调用上面前三个方法的时候也会触发


Hash 模式是使用 URL 的 Hash 来模拟一个完整的 URL，因此当 URL 改变的时候页面并不会重载。History 模式则会直接改变 URL，所以在路由跳转的时候会丢失一些地址信息，在刷新或直接访问路由地址的时候会匹配不到静态资源。因此需要在服务器上配置一些信息，让服务器增加一个覆盖所有情况的候选资源，比如跳转 index.html 什么的，一般来说是你的 app 依赖的页面

## CSS

### 1. css的盒模型

## 浏览器（Browser）

### 1. 一个浏览器是如何工作的

### 2. 为何会有跨域的问题一级解决方案

### 3. 详细介绍fetch原理

### 4. 浏览器缓存：cookie、sessionStorage、localStorage

- 关闭选项卡后，将删除存储在sessionStorage中的数据。

- 如果使用localStorage，数据将永远存在，除非例如调用localStorage.clear()。

### 5. 输入 URL 到展现

1. 地址栏输入地址，网址缓存：不论什么时候，我们获取的主页面资源 timeline, 都应该是重新请求服务器而获得的，不可以使用本地浏览器的缓存。至于为什么？你看到静态资源文件名的 hash 值你就应该清楚了。
2. 检查 HSTS 预加载列表
> HSTS（ HTTP Strict Transport Security ）国际互联网工程组织 IETE 正在推行一种新的 Web 安全协议，作用是强制客户端（如浏览器）使用 HTTPS 与服务器创建连接。

采用 HSTS 后：支持这个协议的浏览器，在输入 URL 后会检查自带的 HSTS 预加载列表（这个列表里包含了那些请求浏览器只使用 HTTPS 进行连接的域名），若网站在这个列表里，浏览器会使用 HTTPS 协议并且返回码为 307。而不支持 HSTS 的浏览器访问我们的网站，则不会产生跳转，从而提高了兼容性。这个机制对于不支持 HTTPS 的搜索引擎来说是非常友好的！

3. 查询DNS
    1. 浏览器的 DNS 缓存
    2. 操作系统中的 DNS 缓存
    3. 索操作系统的 hosts 文件（可手动写入的缓存）

虽然 DNS 缓存可以提高获取 DNS 的速度，但缓存时间过长也会影响 DNS 在 IP 变更时不能及时解析到最新的 IP。

4. ARP（地址解析协议）:ARP 是一种用以解释地址的协议，根据通信方的 IP 地址就可以反查出对应方的 MAC 地址。

当地址解析协议被询问一个已知 IP 地址节点的 MAC 地址时，先在 AR 缓存中查看，若存在，就直接返回与之对应的MAC地址；若不存在，才发送 ARP 请求查询。

5. TCP请求
6. HTTP请求

## 页面优化

### 1. 如何系统地优化页面

## Vue

### 1. vue事件原理

原生事件绑定是通过addEventListener绑定给真实元素的，组件事件绑定是通过Vue自定义的$on实现的。

### 2. vue如何实现的双向绑定

### 3. 响应式对象的创建、依赖收集、派发更新的实现过程

### 4. vue实现原理及初始化过程是怎样的

### 5. 如何使用路由管理

### 6. 为什么需要做状态管理，如何做

### 7. 讲一讲MVVM

MVVM是Model-View-ViewModel缩写，也就是把MVC中的Controller演变成ViewModel。Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。

### 8. vue响应式数据原理

2.x：Vue在初始化数据时，会使用Object.defineProperty重新定义data中的所有属性，当页面使用对应属性时，首先会进行依赖收集(收集当前组件的watcher)如果属性发生变化会通知相关依赖进行更新操作(发布订阅)。

3.x: Vue3.x改用Proxy替代Object.defineProperty。因为Proxy可以直接监听对象和数组的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。

> Proxy只会代理对象的第一层，那么Vue3又是怎样处理这个问题的呢？

判断当前Reflect.get的返回值是否为Object，如果是则再通过reactive方法做代理， 这样就实现了深度观测。

> 监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？

我们可以判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行trigger。

### 9. vue2.x中如何监测数组变化

使用了函数劫持的方式，重写了数组的方法，Vue将data中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组api时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。

### 10. nextTick知道吗，实现原理是什么？

在下次 DOM 更新循环结束之后执行延迟回调。nextTick主要使用了宏任务和微任务。根据执行环境分别尝试采用

- Promise
- MutationObserver
- setImmediate
- 如果以上都不行则采用setTimeout

### 11. Vue的生命周期

- beforeCreate是new Vue()之后触发的第一个钩子，在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问。

- created在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数。可以做一些初始数据的获取，在当前阶段无法与Dom进行交互，如果非要想，可以通过vm.$nextTick来访问Dom。

- beforeMount发生在挂载之前，在这之前template模板已导入渲染函数编译。而当前阶段虚拟Dom已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发updated。

- mounted在挂载完成后发生，在当前阶段，真实的Dom挂载完毕，数据完成双向绑定，可以访问到Dom节点，使用$refs属性对Dom进行操作。

- beforeUpdate发生在更新之前，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。

- updated发生在更新完成之后，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

- beforeDestroy发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。

- destroyed发生在实例销毁之后，这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

组件生命周期调用顺序:

- 组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。

- 组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

- 加载渲染过程: 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted

- 子组件更新过程: 父beforeUpdate->子beforeUpdate->子updated->父updated

- 父组件更新过程: 父 beforeUpdate -> 父 updated

- 销毁过程: 父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

### 12. 接口请求一般放在哪个生命周期中

接口请求一般放在mounted中，但需要注意的是服务端渲染时不支持mounted，需要放到created中

### 13. Computed和Watch

Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。

Watch没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开deep：true选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用unWatch手动注销哦。

### 14. v-if和v-show的区别

当条件不成立时，v-if不会渲染DOM元素，v-show操作的是样式(display)，切换当前DOM的显示和隐藏。

### 15. 组件中的data为什么是一个函数？

一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。

### 16. 说一下v-model的原理

v-model本质就是一个语法糖，可以看成是value + input方法的语法糖。可以通过model属性的prop和event属性来进行自定义。原生的v-model，会根据标签的不同生成不同的事件和属性。

### 17. Vue模版编译原理知道吗，能简单说一下吗？

简单说，Vue的编译过程就是将template转化为render函数的过程。会经历以下阶段：

- 生成AST树
- 优化
- codegen

首先解析模版，生成AST语法树(一种用JavaScript对象的形式来描述整个模板)。使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。

Vue的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的DOM也不会变化。那么优化过程就是深度遍历AST树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用。

编译的最后一步是将优化后的AST树转换为可执行的代码。

### 18. Vue2.x和Vue3.x渲染器的diff算法分别说一下

简单来说，diff算法有以下过程:

- 同级比较，再比较子节点

- 先判断一方有子节点一方没有子节点的情况(如果新的children没有子节点，将旧的子节点移除)

- 比较都有子节点的情况(核心diff)

- 递归比较子节点

正常Diff两个树的时间复杂度是O(n^3)，但实际情况下我们很少会进行跨层级的移动DOM，所以Vue将Diff进行了优化，从O(n^3) -> O(n)，只有当新旧children都为多个子节点时才需要用核心的Diff算法进行同层级比较。

Vue2的核心Diff算法采用了双端比较的算法，同时从新旧children的两端开始进行比较，借助key值找到可复用的节点，再进行相关操作。相比React的Diff算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。

Vue3.x借鉴了ivi算法和 inferno算法

在创建VNode时就确定其类型，以及在mount/patch的过程中采用位运算来判断一个VNode的类型，在这个基础之上再配合核心的Diff算法，使得性能上较Vue2.x有了提升。(实际的实现可以结合Vue3.x源码看。)

### 19. 虚拟Dom以及key属性的作用

由于在浏览器中操作DOM是很昂贵的。频繁的操作DOM，会产生一定的性能问题。这就是虚拟Dom的产生原因。

Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点。是对真实DOM的一层抽象。(也就是源码中的VNode类，它定义在src/core/vdom/vnode.js中。)

VirtualDOM映射到真实DOM要经历VNode的create、diff、patch等阶段。

「key的作用是尽可能的复用 DOM 元素。」

新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的。

需要在新旧 children 的节点中保存映射关系，以便能够在旧 children 的节点中找到可复用的节点。key也就是children中节点的唯一标识。

### 20. keep-alive

keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

常用的两个属性include/exclude，允许组件有条件的进行缓存。

两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。

keep-alive的中还运用了LRU(Least Recently Used)算法。

### 21. Vue2.x组件通信有哪些方式

1. 父子组件通信

父->子props，子->父 $on、$emit

获取父子组件实例 $parent、$children

Ref 获取实例的方式调用组件的属性或者方法

Provide、inject 官方不推荐使用，但是写组件库时很常用

2. 兄弟组件通信

Event Bus 实现跨组件通信 Vue.prototype.$bus = new Vue

Vuex

3. 跨级组件通信

Vuex

$attrs、$listeners

Provide、inject

### 22. SSR

SSR也就是服务端渲染，也就是将**Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端**。

SSR有着更好的SEO、并且首屏加载速度更快等优点。不过它也有一些缺点，比如我们的开发条件会受到限制，服务器端渲染只支持beforeCreate和created两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境。还有就是服务器会有更大的负载需求。

### 23. Vue的性能优化

#### 编码阶段

- 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher

- v-if和v-for不能连用

- 如果需要使用v-for给每项元素绑定事件时使用事件代理

- SPA 页面采用keep-alive缓存组件

- 在更多的情况下，使用v-if替代v-show

- key保证唯一

- 使用路由懒加载、异步组件

- 防抖、节流

- 第三方模块按需导入

- 长列表滚动到可视区域动态加载

- 图片懒加载

#### SEO优化

- 预渲染

- 服务端渲染SSR

#### 打包优化

- 压缩代码

- Tree Shaking/Scope Hoisting

- 使用cdn加载第三方模块

- 多线程打包happypack

- splitChunks抽离公共文件

- sourceMap优化

## React

### 1. React native中如何混编组件

### 2. React 组件的生命周期

### 3. React 组件事件代理的原理

### 4. 如何组织action和reducer

### 5. Reducx如何实现多个组件之间的通信

### 6. Reducx请求中间件如何处理并发

## nodejs

### 1. nodejs时间循环模型的原理

## 微信小程序

### 1. 微信小程序的原理

## 项目

### 1. webpack中的热更新与原理

### 2. 超长列表无限滚动加载的解决方案

### 3. 项目流程

1. 自建Gitlab：包括代码管理、权限管理、提交日志查询，以及联动一些第三方插件
2. 版本管理：

    - 发布后分支锁死，不可再更改：指当例如0.0.1版本成功发布后，不可再更改0.0.1分支上的代码，否则可能会导致版本管理混乱。

    - 全自动流程发布；指应避免开发者提交后，手动编译打包等操作，换句话说，开发人员发布后，将自动发布到预发布/生产环境。开发人员不和相关环境直接接触。实现这个需要参考下面的2.3。

    - 多版本并存；指当例如发布0.0.2版本后，0.0.1版本的代码应仍保存在线上（例如CDN），这样当出现线上bug时，方便快速回滚到上一个版本。

3. 自动编译发布Jenkins：这个工具用于在代码发布后，执行一系列流程，例如自动编译打包合并，然后再从Gitlab发布到CDN或者静态资源服务器。

4. 统一脚手架
5. Node中间层：需要SEO且前端使用React、vue，或前端介入后端逻辑，直接读取后端服务或者数据库的情况。
6. 埋点系统
    - 记录每个页面的访问量（日周月年的UV、PV）；

    - 记录每个功能的使用量；

    - 捕捉报错情况；
    
    - 图表化显示，方便给其他部门展示；

7. 监控和报警系统:监控和报警系统应基于埋点系统而建立，在如以下场景时触发：

    - 当访问量有比较大的变化（比如日PV/UV只有之前20%以下）时，自动触发报警，发送邮件到相关人员邮箱；

    - 比如报错量大幅度上升（比如200%或更高），则触发报警；

    - 当一段时间内没有任何访问量（不符合之前的情况），则触发报警；

    - 每过一段时间，自动汇总访问者/报错触发者的相关信息（例如系统、浏览器版本等）；
    
建设这个系统的好处在于，提前发现一些不容易发现的bug（需要埋点做的比较扎实）。

有一些线上bug，因为用户环境特殊，导致无法被开发人员和测试人员发现。

但其中一部分bug又因为不涉及资金，并不会导致资损（因此也不会被后端的监控系统所发现），这样的bug非常容易影响项目里某个链路的正常使用。

意义:

提高项目的稳定性，提高对业务的把控能力。

降低bug数，降低资损的可能性，提前发现某些功能的bug（在工单到来之前）。

8. 安全管理

安全管理的很难从架构设计上完全避免，但还是有一定解决方案的，常见安全问题如下：

- XSS注入：对用户输入的内容，需要转码（大部分时候要server端来处理，偶尔也需要前端处理），禁止使用eval函数；

- https：这个显然是必须的，好处非常多；

- CSRF：要求server端加入CSRF的处理方法（至少在关键页面加入）；

减少安全漏洞，避免用户受到损失，避免遭遇恶意攻击，增加系统的稳定性和安全性。

9. Eslint

- 降低低级bug（例如拼写问题）出现的概率；

- 增加代码的可维护性，可阅读性；

- 硬性统一代码风格，团队协作起来时更轻松；

总的来说，eslint推荐直接配置到脚手架之中，对我们提高代码的可维护性的帮助会很大。可以考虑在上传到gitlab时，硬性要求eslint校验，通过的才允许上传。

10. 灰度发布

灰度发布是大型项目在发布时的常见方法，指在发布版本时，初始情况下，只允许小比例（比如1~5%比例的用户使用），若出现问题时，可以快速回滚使用老版本，适用于主链路和访问量极大的页面。

- 生产环境比开发环境复杂，灰度发布时可以在生产环境小范围尝试观察新版本是否可以正常运行，即使出问题，也可以控制损失。

- 对于大版本更新，可以先灰度一部分，观察埋点效果和用户反馈（即所谓的抢先试用版）。假如效果并不好，那么回滚到老版本也可以及时止损；

- 当我们需要验证某些想法或问题的时候，可以先灰度一部分，快速验证效果如何，然后查漏补缺或者针对性优化；

降低风险，提高发布灵活度。

11. Mock
12. 以应用为单位划分前端项目

所谓应用即指一个业务涉及到的前后端代码

13. 基础组件库的建设

设计基础组件库的前提，是要求统一技术栈，这样才能最大化基础组件库的效益。

- 使用ts；

- 可扩展性强；

- 适用程度高；

- 文档清楚详细；

- 版本隔离，小版本优化加功能，大改需要大版本更新；

- 和UI协调统一，要求UI交互参与进来；

统一不同/相同产品线之间的风格，给用户更好的体验，减少单次开发中写UI组件时浪费的时间和人力，提高开发效率。

14. 技术栈统一

- 三大框架选型其一，团队水平一般推荐Vue、水平较好推荐React，对外项目选React或者ng；

- 需要兼容IE8或更老版本时，建议使用jQuery；

- 组件库自建或者统一选择一个固定的第三方；

- 一些特殊第三方库统一使用一个版本，例如需要使用地图时，固定使用高德或百度或腾讯地图；

- 基础设施建设应避免重复造轮子，所有团队尽量共用，并有专门的前端平_台负责统一这些东西，对于特殊需求，可以新建，但应当有说服力；

15. 内容平_台建设

为了提高公司内部的沟通效率，总结经验，以及保密原因。

应建设一个内部论坛+博客站点。

其具备的好处如下：

- 可以记录公司的历史；

- 研发同学之间分享经验；

- 总结转载一些外界比较精品的文章，提高大家的眼界；

- 增加公司内部同学的交流，有利于公司的团队和文化建设；

- 对某些技术问题可以进行讨论，减少因没有达成共识带来的沟通损耗；

大型互联网公司通常都有这样一个内部论坛和博客站点。

其降低了公司的沟通和交流成本，也增加了公司的技术积累。

### 4. 多页和单页

除了特殊场景，通常推荐使用多页架构。理由如下：

- 多页项目，页面和页面之间是独立的，不存在交互，因此当一个页面需要单独重构时，不会影响其他页面，对于有长期历史的项目来说，可维护性、可重构性要高很多；

- 多页项目的缺点是不同页面切换时，会有一个白屏时间，但通常来说，这个时间并不长，大部分现有大公司的线上网页，都是这样的，因此认为是可以接受的；

- 多页项目可以单次只更新一个页面的版本，而单页项目如果其中一个功能模块要更新（特别是公共组件更新），很容易让所有页面都需要更新版本；

- 多页项目的版本控制更简单，如果需要页面拆分，调整部分页面的使用流程，难度也会更低；

- 灰度发布更友好；

降低长期项目迭代维护的难度。

### 5. 浏览器兼容

- 配置postcss，让某些css增加兼容性前缀；

- 写一个wepback的loader，处理某些特殊场景；

- 规范团队代码，使用更稳定的写法（例如移动端避免使用fixed进行布局）；

- 对常见问题、疑难问题，总结解决方案并团队共享；

- 建议或引导用户使用高版本浏览器（比如chrome）；

### 6. 登录系统设计（单点登录）

当公司内部业务线比较复杂但相互之间的耦合度比较高时，我们应该考虑设计添加单点登录系统。

具体来说，用户在一处登录，即可以在任何页面访问，登出时，也同样在任何页面都失去登录状态。SSO的好处很多：

- 增强用户体验；

- 打通了不同业务系统之间的用户数据；

- 方便统一管理用户；

- 有利于引流；

- 降低开发系统的成本（不需要每个业务都开发一次登录系统和用户状态控制）；

### 7. CDN

前端资源的加载速度是衡量用户体验的重要指标之一。

而现实中，因为种种因素，用户在加载页面资源时，会受到很多限制。

因此上CDN是非常有意义的，好处如下：

- 用户来自不同地区，加入CDN可以使用户访问资源时，访问离自己比较近的CDN服务器，降低访问延迟；

- 降低服务器带宽使用成本；

- 支持视频、静态资源、大文件、小文件、直播等多种业务场景；

- 消除跨运营商造成的网络速度较慢的问题；

- 降低DDOS攻击造成的对网站的影响；

CDN是一种比较成熟的技术，各大云平_台都有提供CDN服务，价格也不贵，因此CDN的性价比很高。

意义：

增加用户访问速度，降低网络延迟，带宽优化，减少服务器负载，增强对攻击的抵抗能力。

### 8. 负载均衡

目前来看，负载均衡通常使用Nginx比较多，以前也有使用Apache。

当遇见大型项目的时候，负载均衡和分布式几乎是必须的。负载均衡有以下好处：

- 降低单台server的压力，提高业务承载能力；

- 方便应对峰值流量，扩容方便（如举办某些活动时）；

- 增强业务的可用性、扩展性、稳定性；

负载均衡已经是蛮常见的技术了，好处不用多说，很容易理解。

意义：

增强业务的可用性、扩展性、稳定性，可以支持更多用户的访问。

### 9. 多端共用一套接口

目前常见场景是一个业务，同时有PC页面和H5页面，由于业务是一样的，因此应避免同一个业务有多套接口分别适用于PC和H5端。

因此解决方案如下：

- 后端提供的接口，应该同时包含PC和H5的数据（即单独对一个存在亢余数据）；

- 接口应当稳定，即当业务变更时，应尽量采取追加数据的形式；

- 只有在单独一端需要特殊业务流程时，设计单端独有接口；

- 多端共用接口，是减少开发工作量，并且提高业务可维护性的重要解决方案。

意义：

降低开发工作量，增强可维护性。



## Javascript

### 1. Javascript是如何运行的

### 2. Js的闭包和上下文

- 基本执行上下文是全局执行上下文:它是代码中随处可访问的内容。

- 全局执行上下文为你创建了两个东西:全局对象和this关键字.

### 3. ES6做了那些升级优化

### 4. Bind,Call,Apply的区别

- .call方法会立即执行！

- .bind方法会返回函数的拷贝值，但带有绑定的上下文！ 它不会立即执行。

### 5. Promise内部实现原理

### 6. ES6有哪些方式实现继承

### 7. var、let、const创建变量

变量的赋值可以分为三个阶段：

- 创建变量，在内存中开辟空间

- 初始化变量，将变量初始化为undefined

- 真正赋值

let 的「创建」过程被提升了，但是初始化没有提升。（暂时死区）

var 的「创建」和「初始化」都被提升了。

function 的「创建」「初始化」和「赋值」都被提升了。

- 使用let（和const）关键字声明的变量是具有块作用域的（块是{}之间的任何东西）

### 8. 普通函数和箭头函数

对于箭头函数，this关键字指向是它所在上下文（定义时的位置）的环境，与普通函数不同！ 这意味着当我们调用时，它不是指向调用的对象，而是指其定义时的环境（window）

### 9. javascript运算符

- 一元加号会尝试将boolean类型转换为数字类型。 true被转换为1，false被转换为0。

- 取非运算符会将字符串类型转换为Boolean类型。

### 10. 构造函数

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person("Lydia", "Hallie");
const sarah = Person("Sarah", "Smith");

console.log(lydia);
console.log(sarah);

// Person {firstName: "Lydia", lastName: "Hallie"} and undefined
```

使用new时，它指的是我们创建的新空对象。 但是，如果你不添加new它指的是全局对象！

我们指定了this.firstName等于'Sarah和this.lastName等于Smith。 我们实际做的是定义global.firstName ='Sarah'和global.lastName ='Smith。 sarah本身的返回值是undefined。

### 11. 原型与原型链

- 除基础对象外，所有对象都有原型。 基础对象可以访问某些方法和属性，例如.toString。 这就是您可以使用内置JavaScript方法的原因！ 所有这些方法都可以在原型上找到。 虽然JavaScript无法直接在您的对象上找到它，但它会沿着原型链向下寻找并在那里找到它，这使您可以访问它。

- 基础对象指原型链终点的对象。基础对象的原型是null

### 12. 事件处理机制

事件捕获 -> 事件目标 -> 事件冒泡

事件处理程序在冒泡阶段执行（除非您将useCapture设置为true）。 它从最深的嵌套元素向外延伸。

- 通过event.stopPropagation停止冒泡

### 13. 数据类型

- 只有7种内置类型：null，undefined，boolean，number，string，object和symbol、BigInt。 function不是一个类型，因为函数是对象，它的类型是object。
- JavaScript只有原始类型和对象。
- 原始类型是boolean，null，undefined，bigint，number，string和symbol。

### 14. 前端路由跳转

两种不同方式的路由方式： Hash 和 History

1. Hash

Hash 方法是在路由中带有一个 #，主要原理是通过监听 # 后的 URL 路径标识符的更改而触发的浏览器 hashchange 事件，然后通过获取 location.hash 得到当前的路径标识符，再进行一些路由跳转的操作

    1. location.href：返回完整的 URL
    
    2. location.hash：返回 URL 的锚部分
    
    3. location.pathname：返回 URL 路径名
    
    4. hashchange 事件：当 location.hash 发生改变时，将触发这个事件

比如访问一个路径 http://sherlocked93.club/base/#/page1，那么上面几个值分别为：

```js
# http://sherlocked93.club/base/#/page1

{
  "href":"http://sherlocked93.club/base/#/page1",
  "pathname": "/base/",
  "hash":"#/page1"
}
```

> 因为 Hash 方法是利用了相当于页面锚点的功能，所以与原来的通过锚点定位来进行页面滚动定位的方式冲突，导致定位到错误的路由路径，所以需要采用别的办法，之前在写 progress-catalog 这个插件碰到了这个情况。

2. HTML5 History

- history.go(n)：路由跳转，比如n为 2 是往前移动2个页面，n为 -2 是向后移动2个页面，n为0是刷新页面

- history.back()：路由后退，相当于 history.go(-1)

- history.forward()：路由前进，相当于 history.go(1)

- history.pushState()：添加一条路由历史记录，如果设置跨域网址则报错

- history.replaceState()：替换当前页在路由历史记录的信息

- popstate 事件：当活动的历史记录发生变化，就会触发 popstate 事件，在点击浏览器的前进后退按钮或者调用上面前三个方法的时候也会触发


Hash 模式是使用 URL 的 Hash 来模拟一个完整的 URL，因此当 URL 改变的时候页面并不会重载。History 模式则会直接改变 URL，所以在路由跳转的时候会丢失一些地址信息，在刷新或直接访问路由地址的时候会匹配不到静态资源。因此需要在服务器上配置一些信息，让服务器增加一个覆盖所有情况的候选资源，比如跳转 index.html 什么的，一般来说是你的 app 依赖的页面

## CSS

### 1. css的盒模型

## 浏览器（Browser）

### 1. 一个浏览器是如何工作的

### 2. 为何会有跨域的问题一级解决方案

### 3. 详细介绍fetch原理

### 4. 浏览器缓存：cookie、sessionStorage、localStorage

- 关闭选项卡后，将删除存储在sessionStorage中的数据。

- 如果使用localStorage，数据将永远存在，除非例如调用localStorage.clear()。

### 5. 输入 URL 到展现

1. 地址栏输入地址，网址缓存：不论什么时候，我们获取的主页面资源 timeline, 都应该是重新请求服务器而获得的，不可以使用本地浏览器的缓存。至于为什么？你看到静态资源文件名的 hash 值你就应该清楚了。
2. 检查 HSTS 预加载列表
> HSTS（ HTTP Strict Transport Security ）国际互联网工程组织 IETE 正在推行一种新的 Web 安全协议，作用是强制客户端（如浏览器）使用 HTTPS 与服务器创建连接。

采用 HSTS 后：支持这个协议的浏览器，在输入 URL 后会检查自带的 HSTS 预加载列表（这个列表里包含了那些请求浏览器只使用 HTTPS 进行连接的域名），若网站在这个列表里，浏览器会使用 HTTPS 协议并且返回码为 307。而不支持 HSTS 的浏览器访问我们的网站，则不会产生跳转，从而提高了兼容性。这个机制对于不支持 HTTPS 的搜索引擎来说是非常友好的！

3. 查询DNS
    1. 浏览器的 DNS 缓存
    2. 操作系统中的 DNS 缓存
    3. 索操作系统的 hosts 文件（可手动写入的缓存）

虽然 DNS 缓存可以提高获取 DNS 的速度，但缓存时间过长也会影响 DNS 在 IP 变更时不能及时解析到最新的 IP。

4. ARP（地址解析协议）:ARP 是一种用以解释地址的协议，根据通信方的 IP 地址就可以反查出对应方的 MAC 地址。

当地址解析协议被询问一个已知 IP 地址节点的 MAC 地址时，先在 AR 缓存中查看，若存在，就直接返回与之对应的MAC地址；若不存在，才发送 ARP 请求查询。

5. TCP请求
6. HTTP请求

## 页面优化

### 1. 如何系统地优化页面

## Vue

### 1. vue事件原理

原生事件绑定是通过addEventListener绑定给真实元素的，组件事件绑定是通过Vue自定义的$on实现的。

### 2. vue如何实现的双向绑定

1. 由于在Vue的父子组件通讯时，子组件禁止直接修改父组件传过来的prop, 所以为了实现双向绑定：
    1. 在子组件增加一个监听事件，然后在子组件数据变化时，传递给父组件去修改数据
    2. 自定义组件的v-model和.sync
    ```js
    <!--父组件-->
    <template>
      <child-component v-model="val" />
    </template>
    <!--子组件-->
    export default {
      model: {
        prop: 'anyKey',  // 不一定非要是value
        event: 'anyEventName'  // 不一定非要是input
      },
      props: {
        anyKey: {
          type: Number
        }
      },
      methods: {
        handleClick() {
          this.$emit('anyEventName', this.anyKey+2)
        }
      }
    }
    ```
    ```js
    <!--父组件-->
    <template>
      <child-component :val.sync="val" />
    </template>
    <!--子组件-->
    export default {
      props: {
        val: {
          type: Number
        }
      },
      methods: {
        handleClick() {
          this.$emit('update:val', this.val+2)
        }
      }
    }
    ```

### 3. 响应式对象的创建、依赖收集、派发更新的实现过程

### 4. vue实现原理及初始化过程是怎样的

### 5. 如何使用路由管理

### 6. 为什么需要做状态管理，如何做

### 7. 讲一讲MVVM

MVVM是Model-View-ViewModel缩写，也就是把MVC中的Controller演变成ViewModel。Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。

### 8. vue响应式数据原理

2.x：Vue在初始化数据时，会使用Object.defineProperty重新定义data中的所有属性，当页面使用对应属性时，首先会进行依赖收集(收集当前组件的watcher)如果属性发生变化会通知相关依赖进行更新操作(发布订阅)。

3.x: Vue3.x改用Proxy替代Object.defineProperty。因为Proxy可以直接监听对象和数组的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。

> Proxy只会代理对象的第一层，那么Vue3又是怎样处理这个问题的呢？

判断当前Reflect.get的返回值是否为Object，如果是则再通过reactive方法做代理， 这样就实现了深度观测。

> 监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？

我们可以判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行trigger。

### 9. vue2.x中如何监测数组变化

使用了函数劫持的方式，重写了数组的方法，Vue将data中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组api时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。

### 10. nextTick知道吗，实现原理是什么？

在下次 DOM 更新循环结束之后执行延迟回调。nextTick主要使用了宏任务和微任务。根据执行环境分别尝试采用

- Promise
- MutationObserver
- setImmediate
- 如果以上都不行则采用setTimeout

### 11. Vue的生命周期

- beforeCreate是new Vue()之后触发的第一个钩子，在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问。

- created在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数。可以做一些初始数据的获取，在当前阶段无法与Dom进行交互，如果非要想，可以通过vm.$nextTick来访问Dom。

- beforeMount发生在挂载之前，在这之前template模板已导入渲染函数编译。而当前阶段虚拟Dom已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发updated。

- mounted在挂载完成后发生，在当前阶段，真实的Dom挂载完毕，数据完成双向绑定，可以访问到Dom节点，使用$refs属性对Dom进行操作。

- beforeUpdate发生在更新之前，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。

- updated发生在更新完成之后，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

- beforeDestroy发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。

- destroyed发生在实例销毁之后，这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

组件生命周期调用顺序:

- 组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。

- 组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

- 加载渲染过程: 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted

- 子组件更新过程: 父beforeUpdate->子beforeUpdate->子updated->父updated

- 父组件更新过程: 父 beforeUpdate -> 父 updated

- 销毁过程: 父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

### 12. 接口请求一般放在哪个生命周期中

接口请求一般放在mounted中，但需要注意的是服务端渲染时不支持mounted，需要放到created中

### 13. Computed和Watch

Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。

Watch没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开deep：true选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用unWatch手动注销哦。

### 14. v-if和v-show的区别

当条件不成立时，v-if不会渲染DOM元素，v-show操作的是样式(display)，切换当前DOM的显示和隐藏。

### 15. 组件中的data为什么是一个函数？

一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。

### 16. 说一下v-model的原理

v-model本质就是一个语法糖，可以看成是value + input方法的语法糖。可以通过model属性的prop和event属性来进行自定义。原生的v-model，会根据标签的不同生成不同的事件和属性。

### 17. Vue模版编译原理知道吗，能简单说一下吗？

简单说，Vue的编译过程就是将template转化为render函数的过程。会经历以下阶段：

- 生成AST树
- 优化
- codegen

首先解析模版，生成AST语法树(一种用JavaScript对象的形式来描述整个模板)。使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。

Vue的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的DOM也不会变化。那么优化过程就是深度遍历AST树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用。

编译的最后一步是将优化后的AST树转换为可执行的代码。

### 18. Vue2.x和Vue3.x渲染器的diff算法分别说一下

简单来说，diff算法有以下过程:

- 同级比较，再比较子节点

- 先判断一方有子节点一方没有子节点的情况(如果新的children没有子节点，将旧的子节点移除)

- 比较都有子节点的情况(核心diff)

- 递归比较子节点

正常Diff两个树的时间复杂度是O(n^3)，但实际情况下我们很少会进行跨层级的移动DOM，所以Vue将Diff进行了优化，从O(n^3) -> O(n)，只有当新旧children都为多个子节点时才需要用核心的Diff算法进行同层级比较。

Vue2的核心Diff算法采用了双端比较的算法，同时从新旧children的两端开始进行比较，借助key值找到可复用的节点，再进行相关操作。相比React的Diff算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。

Vue3.x借鉴了ivi算法和 inferno算法

在创建VNode时就确定其类型，以及在mount/patch的过程中采用位运算来判断一个VNode的类型，在这个基础之上再配合核心的Diff算法，使得性能上较Vue2.x有了提升。(实际的实现可以结合Vue3.x源码看。)

### 19. 虚拟Dom以及key属性的作用

由于在浏览器中操作DOM是很昂贵的。频繁的操作DOM，会产生一定的性能问题。这就是虚拟Dom的产生原因。

Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点。是对真实DOM的一层抽象。(也就是源码中的VNode类，它定义在src/core/vdom/vnode.js中。)

VirtualDOM映射到真实DOM要经历VNode的create、diff、patch等阶段。

「key的作用是尽可能的复用 DOM 元素。」

新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的。

需要在新旧 children 的节点中保存映射关系，以便能够在旧 children 的节点中找到可复用的节点。key也就是children中节点的唯一标识。

### 20. keep-alive

keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

常用的两个属性include/exclude，允许组件有条件的进行缓存。

两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。

keep-alive的中还运用了LRU(Least Recently Used)算法。

### 21. Vue2.x组件通信有哪些方式

1. 父子组件通信

父->子props，子->父 $on、$emit

获取父子组件实例 $parent、$children

Ref 获取实例的方式调用组件的属性或者方法

Provide、inject 官方不推荐使用，但是写组件库时很常用

2. 兄弟组件通信

Event Bus 实现跨组件通信 Vue.prototype.$bus = new Vue

Vuex

3. 跨级组件通信

Vuex

$attrs、$listeners

Provide、inject

### 22. SSR

SSR也就是服务端渲染，也就是将**Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端**。

SSR有着更好的SEO、并且首屏加载速度更快等优点。不过它也有一些缺点，比如我们的开发条件会受到限制，服务器端渲染只支持beforeCreate和created两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境。还有就是服务器会有更大的负载需求。

### 23. Vue的性能优化

#### 编码阶段

- 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher

- v-if和v-for不能连用

- 如果需要使用v-for给每项元素绑定事件时使用事件代理

- SPA 页面采用keep-alive缓存组件

- 在更多的情况下，使用v-if替代v-show

- key保证唯一

- 使用路由懒加载、异步组件

- 防抖、节流

- 第三方模块按需导入

- 长列表滚动到可视区域动态加载

- 图片懒加载

#### SEO优化

- 预渲染

- 服务端渲染SSR

#### 打包优化

- 压缩代码

- Tree Shaking/Scope Hoisting

- 使用cdn加载第三方模块

- 多线程打包happypack

- splitChunks抽离公共文件

- sourceMap优化

## React

### 1. React native中如何混编组件

### 2. React 组件的生命周期

### 3. React 组件事件代理的原理

### 4. 如何组织action和reducer

### 5. Reducx如何实现多个组件之间的通信

### 6. Reducx请求中间件如何处理并发

## nodejs

### 1. nodejs时间循环模型的原理

## 微信小程序

### 1. 微信小程序的原理

## 项目

### 1. webpack中的热更新与原理

### 2. 超长列表无限滚动加载的解决方案

### 3. 项目流程

1. 自建Gitlab：包括代码管理、权限管理、提交日志查询，以及联动一些第三方插件
2. 版本管理：

    - 发布后分支锁死，不可再更改：指当例如0.0.1版本成功发布后，不可再更改0.0.1分支上的代码，否则可能会导致版本管理混乱。

    - 全自动流程发布；指应避免开发者提交后，手动编译打包等操作，换句话说，开发人员发布后，将自动发布到预发布/生产环境。开发人员不和相关环境直接接触。实现这个需要参考下面的2.3。

    - 多版本并存；指当例如发布0.0.2版本后，0.0.1版本的代码应仍保存在线上（例如CDN），这样当出现线上bug时，方便快速回滚到上一个版本。

3. 自动编译发布Jenkins：这个工具用于在代码发布后，执行一系列流程，例如自动编译打包合并，然后再从Gitlab发布到CDN或者静态资源服务器。

4. 统一脚手架
5. Node中间层：需要SEO且前端使用React、vue，或前端介入后端逻辑，直接读取后端服务或者数据库的情况。
6. 埋点系统
    - 记录每个页面的访问量（日周月年的UV、PV）；

    - 记录每个功能的使用量；

    - 捕捉报错情况；
    
    - 图表化显示，方便给其他部门展示；

7. 监控和报警系统:监控和报警系统应基于埋点系统而建立，在如以下场景时触发：

    - 当访问量有比较大的变化（比如日PV/UV只有之前20%以下）时，自动触发报警，发送邮件到相关人员邮箱；

    - 比如报错量大幅度上升（比如200%或更高），则触发报警；

    - 当一段时间内没有任何访问量（不符合之前的情况），则触发报警；

    - 每过一段时间，自动汇总访问者/报错触发者的相关信息（例如系统、浏览器版本等）；
    
建设这个系统的好处在于，提前发现一些不容易发现的bug（需要埋点做的比较扎实）。

有一些线上bug，因为用户环境特殊，导致无法被开发人员和测试人员发现。

但其中一部分bug又因为不涉及资金，并不会导致资损（因此也不会被后端的监控系统所发现），这样的bug非常容易影响项目里某个链路的正常使用。

意义:

提高项目的稳定性，提高对业务的把控能力。

降低bug数，降低资损的可能性，提前发现某些功能的bug（在工单到来之前）。

8. 安全管理

安全管理的很难从架构设计上完全避免，但还是有一定解决方案的，常见安全问题如下：

- XSS注入：对用户输入的内容，需要转码（大部分时候要server端来处理，偶尔也需要前端处理），禁止使用eval函数；

- https：这个显然是必须的，好处非常多；

- CSRF：要求server端加入CSRF的处理方法（至少在关键页面加入）；

减少安全漏洞，避免用户受到损失，避免遭遇恶意攻击，增加系统的稳定性和安全性。

9. Eslint

- 降低低级bug（例如拼写问题）出现的概率；

- 增加代码的可维护性，可阅读性；

- 硬性统一代码风格，团队协作起来时更轻松；

总的来说，eslint推荐直接配置到脚手架之中，对我们提高代码的可维护性的帮助会很大。可以考虑在上传到gitlab时，硬性要求eslint校验，通过的才允许上传。

10. 灰度发布

灰度发布是大型项目在发布时的常见方法，指在发布版本时，初始情况下，只允许小比例（比如1~5%比例的用户使用），若出现问题时，可以快速回滚使用老版本，适用于主链路和访问量极大的页面。

- 生产环境比开发环境复杂，灰度发布时可以在生产环境小范围尝试观察新版本是否可以正常运行，即使出问题，也可以控制损失。

- 对于大版本更新，可以先灰度一部分，观察埋点效果和用户反馈（即所谓的抢先试用版）。假如效果并不好，那么回滚到老版本也可以及时止损；

- 当我们需要验证某些想法或问题的时候，可以先灰度一部分，快速验证效果如何，然后查漏补缺或者针对性优化；

降低风险，提高发布灵活度。

11. Mock
12. 以应用为单位划分前端项目

所谓应用即指一个业务涉及到的前后端代码

13. 基础组件库的建设

设计基础组件库的前提，是要求统一技术栈，这样才能最大化基础组件库的效益。

- 使用ts；

- 可扩展性强；

- 适用程度高；

- 文档清楚详细；

- 版本隔离，小版本优化加功能，大改需要大版本更新；

- 和UI协调统一，要求UI交互参与进来；

统一不同/相同产品线之间的风格，给用户更好的体验，减少单次开发中写UI组件时浪费的时间和人力，提高开发效率。

14. 技术栈统一

- 三大框架选型其一，团队水平一般推荐Vue、水平较好推荐React，对外项目选React或者ng；

- 需要兼容IE8或更老版本时，建议使用jQuery；

- 组件库自建或者统一选择一个固定的第三方；

- 一些特殊第三方库统一使用一个版本，例如需要使用地图时，固定使用高德或百度或腾讯地图；

- 基础设施建设应避免重复造轮子，所有团队尽量共用，并有专门的前端平_台负责统一这些东西，对于特殊需求，可以新建，但应当有说服力；

15. 内容平_台建设

为了提高公司内部的沟通效率，总结经验，以及保密原因。

应建设一个内部论坛+博客站点。

其具备的好处如下：

- 可以记录公司的历史；

- 研发同学之间分享经验；

- 总结转载一些外界比较精品的文章，提高大家的眼界；

- 增加公司内部同学的交流，有利于公司的团队和文化建设；

- 对某些技术问题可以进行讨论，减少因没有达成共识带来的沟通损耗；

大型互联网公司通常都有这样一个内部论坛和博客站点。

其降低了公司的沟通和交流成本，也增加了公司的技术积累。

### 4. 多页和单页

除了特殊场景，通常推荐使用多页架构。理由如下：

- 多页项目，页面和页面之间是独立的，不存在交互，因此当一个页面需要单独重构时，不会影响其他页面，对于有长期历史的项目来说，可维护性、可重构性要高很多；

- 多页项目的缺点是不同页面切换时，会有一个白屏时间，但通常来说，这个时间并不长，大部分现有大公司的线上网页，都是这样的，因此认为是可以接受的；

- 多页项目可以单次只更新一个页面的版本，而单页项目如果其中一个功能模块要更新（特别是公共组件更新），很容易让所有页面都需要更新版本；

- 多页项目的版本控制更简单，如果需要页面拆分，调整部分页面的使用流程，难度也会更低；

- 灰度发布更友好；

降低长期项目迭代维护的难度。

### 5. 浏览器兼容

- 配置postcss，让某些css增加兼容性前缀；

- 写一个wepback的loader，处理某些特殊场景；

- 规范团队代码，使用更稳定的写法（例如移动端避免使用fixed进行布局）；

- 对常见问题、疑难问题，总结解决方案并团队共享；

- 建议或引导用户使用高版本浏览器（比如chrome）；

### 6. 登录系统设计（单点登录）

当公司内部业务线比较复杂但相互之间的耦合度比较高时，我们应该考虑设计添加单点登录系统。

具体来说，用户在一处登录，即可以在任何页面访问，登出时，也同样在任何页面都失去登录状态。SSO的好处很多：

- 增强用户体验；

- 打通了不同业务系统之间的用户数据；

- 方便统一管理用户；

- 有利于引流；

- 降低开发系统的成本（不需要每个业务都开发一次登录系统和用户状态控制）；

### 7. CDN

前端资源的加载速度是衡量用户体验的重要指标之一。

而现实中，因为种种因素，用户在加载页面资源时，会受到很多限制。

因此上CDN是非常有意义的，好处如下：

- 用户来自不同地区，加入CDN可以使用户访问资源时，访问离自己比较近的CDN服务器，降低访问延迟；

- 降低服务器带宽使用成本；

- 支持视频、静态资源、大文件、小文件、直播等多种业务场景；

- 消除跨运营商造成的网络速度较慢的问题；

- 降低DDOS攻击造成的对网站的影响；

CDN是一种比较成熟的技术，各大云平_台都有提供CDN服务，价格也不贵，因此CDN的性价比很高。

意义：

增加用户访问速度，降低网络延迟，带宽优化，减少服务器负载，增强对攻击的抵抗能力。

### 8. 负载均衡

目前来看，负载均衡通常使用Nginx比较多，以前也有使用Apache。

当遇见大型项目的时候，负载均衡和分布式几乎是必须的。负载均衡有以下好处：

- 降低单台server的压力，提高业务承载能力；

- 方便应对峰值流量，扩容方便（如举办某些活动时）；

- 增强业务的可用性、扩展性、稳定性；

负载均衡已经是蛮常见的技术了，好处不用多说，很容易理解。

意义：

增强业务的可用性、扩展性、稳定性，可以支持更多用户的访问。

### 9. 多端共用一套接口

目前常见场景是一个业务，同时有PC页面和H5页面，由于业务是一样的，因此应避免同一个业务有多套接口分别适用于PC和H5端。

因此解决方案如下：

- 后端提供的接口，应该同时包含PC和H5的数据（即单独对一个存在亢余数据）；

- 接口应当稳定，即当业务变更时，应尽量采取追加数据的形式；

- 只有在单独一端需要特殊业务流程时，设计单端独有接口；

- 多端共用接口，是减少开发工作量，并且提高业务可维护性的重要解决方案。

意义：

降低开发工作量，增强可维护性。

