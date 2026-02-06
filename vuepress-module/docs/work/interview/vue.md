
# Vue

## 1. MVVM介绍

- MVVM是Model-View-VIewModel的缩写，也就是把MVC中的Controller演变成ViewModel。

- Model层代表数据模型

- View代表UI组件

- ViewModel是View和Model之间的桥梁

数据会绑定到ViewModel层并自动将数据渲染到页面中，视图变化的时候回通知ViewModel层更新数据


## 2. Vue响应式数据原理

### Vue2.x

Vue 在初始化数据时，会使用Object.defineProperty重新定义data中的所有属性，当页面使用对应属性时，首先会进行依赖收集（手机当前组件的watcher）如果属性发生变化，会通知相关依赖进行更新操作（发布订阅）

### Vue3.x

改用Proxy替代Object.defineProperty。因为Proxy可以直接监听数组和对象的变化，并且多达13种拦截方法。

- 作为新标准将会受到浏览器厂商的关注和优化

### Proxy只会代理对象的第一层，那么Vue3.x怎么解决这个问题？

判断当前Reflect.get的返回值是否为Object,如果是则在通过reactive方法作为代理，这样就实现了深度观测

### 监听数组的时候可能触发多次 get/set , 如何防止触发多次？

- 可以判断key是否为当前被代理对象target自身属性

- 可以判断旧值与新值是否相等

只有满足上述两个条件中的一个才能trigger

### Vue2.x中如何监测数组变化

采用了函数劫持的方式，重写了数组的方法，Vue将data中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组api时，可以通知依赖更新。如果数组中包含了引用类型的数据，会对数组中的引用类型再次递归遍历进行监控。

## 3. nextTick的实现原理

在下次 DOM 更新循环结束之后执行延迟回调。nextTick主要使用了宏任务和微任务。

根据执行环境分别尝试采用：

- promise

- MutationObserver

- setImmediate

- setTimeout(最后采用)

定义了一个异步方法，多次调用nextTick 会将方法存入队列中，通过这个异步方法清空当前队列。

## 4. Vue生命周期

1. beforeCreate：new Vue()之后触发的第一个钩子，在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问。

2. created：在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数。可以做一些初始数据的获取，在当前阶段无法与Dom进行交互，如果非要想，可以通过vm.$nextTick来访问Dom。

3. beforeMount： 发生在挂载之前，在这之前template模板已导入渲染函数编译。而当前阶段虚拟Dom已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发updated。

4. Mounted：在挂载完成后发生，在当前阶段，真实的Dom挂载完毕，数据完成双向绑定，可以访问到Dom节点，使用$refs属性对Dom进行操作。

5. beforeUpdate：发生在更新之前，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。

6. updated：发生在更新完成之后，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

7. beforeDestory：发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。

8. destoryed：发生在实例销毁之后，这个时候只剩下了dom空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。


## 5. 接口请求一般放在哪个生命周期？

一般放在 Mounted 中，但服务端渲染不支持mounted, 需要放在created中

## 6. 说一说 Computed 和 Watch

Computed: 本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。适用于计算比较消耗性能的计算场景。

Watcher: 没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。

- 当需要深度监听对象中的属性时，可以打开 deep:true 选项，这样就会对 对象中的每一项进行监听。

- 上述方式有性能问题，优化可以使用 字符串形式监听

## 7. v-if 和 v-show 的区别

- v-if不会渲染DOM元素

- v-show操作的是样式 display， 切换DOM的显示和隐藏

## 8. 组件中的 data 为什么是一个函数？

一个组件被复用多次的情况下会生成多个实例。本质上，这些实例用的都是一个构造函数，如果data是对象的话，对象是引用类型，会影响到所有的实例。所以为了保证组件不同实例之间的data不冲突，data必须是一个函数。

## 9. v-model的原理

v-model本质就是一个语法糖，可以看成是value + input方法的语法糖。可以通过model属性的prop和event属性来进行自定义。原生的v-model，会根据标签的不同生成不同的事件和属性。

## 10. Vue事件绑定原理

- 原生事件绑定是通过 addEventListener 绑定给真实元素的

- 组件事件绑定是通过Vue自定义的 $on 实现的

## 11. Vue模板编译原理

Vue的编译过程就是将 template 转换为 render 函数的过程

- 生成 AST 树

- 优化

- codegen

1. 首先解析模板， 生成 AST 语法树（一种用Javascript对象的形式来描述整个模板）。使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理

2. Vue的数据是响应式的，但其实模板中并不是所有数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的DOM也不会变化。那么优化过程就是深度遍历 AST 树， 按照相关条件对树节点进行标记。 这些被标记的节点（静态节点） 我们就可以跳过对他们的对比，对运行时的模板可以起到很大的优化作用。

3. 将优化后的 AST 树转换成可执行的代码

## 12. Vue2.x 和 Vue3.x渲染器的diff算法？

diff 算法有以下过程：

- 同级比较，再比较子节点

- 先判断一方有子节点, 一方没有子节点的情况（如果新的children没有子节点，将旧的子节点移除）

- 比较都有子节点的情况（核心）

- 递归比较子节点

正常Diff两个树的时间复杂度是O(n^3)，但实际情况下我们很少会进行跨层级的移动DOM，所以Vue将Diff进行了优化，从O(n^3) -> O(n)，只有当新旧children都为多个子节点时才需要用核心的Diff算法进行同层级比较。

Vue2的核心Diff算法采用了双端比较的算法，同时从新旧children的两端开始进行比较，借助key值找到可复用的节点，再进行相关操作。相比React的Diff算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。

Vue3.x借鉴了ivi算法和 inferno算法

在创建VNode时就确定其类型，以及在mount/patch的过程中采用位运算来判断一个VNode的类型，在这个基础之上再配合核心的Diff算法，使得性能上较Vue2.x有了提升。(实际的实现可以结合Vue3.x源码看。)

该算法中还运用了动态规划的思想求解最长递归子序列。

## 13. 再说一下虚拟Dom以及key属性的作用

由于在浏览器中操作DOM是很昂贵的。频繁的操作DOM，会产生一定的性能问题。这就是虚拟Dom的产生原因。

Vue2的Virtual DOM借鉴了开源库snabbdom的实现。

Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点。是对真实DOM的一层抽象。(也就是源码中的VNode类，它定义在src/core/vdom/vnode.js中。)

VirtualDOM映射到真实DOM要经历VNode的create、diff、patch等阶段。

「key的作用是尽可能的复用 DOM 元素。」

新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的。

需要在新旧 children 的节点中保存映射关系，以便能够在旧 children 的节点中找到可复用的节点。key也就是children中节点的唯一标识。

## 14. keep-alive

keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载。

常用的两个属性include/exclude，允许组件有条件的进行缓存。

两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。

keep-alive的中还运用了LRU(Least Recently Used)算法。

## 15. Vue中组件生命周期调用顺序说一下

- 组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。

- 组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

### 加载渲染过程

父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted

### 子组件更新过程

父beforeUpdate->子beforeUpdate->子updated->父updated

### 父组件更新过程

父 beforeUpdate -> 父 updated

### 销毁过程

父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

## 16. Vue2.x组件通信有哪些方式？

- 父子组件通信

父->子props，子->父 $on、$emit

获取父子组件实例 $parent、$children

Ref 获取实例的方式调用组件的属性或者方法

Provide、inject 官方不推荐使用，但是写组件库时很常用

- 兄弟组件通信

Event Bus 实现跨组件通信 Vue.prototype.$bus = new Vue

event bus既是node中各个模块的基石，又是前端组件通信的依赖手段之一，同时涉及了订阅-发布设计模式，是非常重要的基础。

- 简单版

```js
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}


// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  // 从储存事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
};

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
  // 将type事件以及对应的fn函数放入this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};
```

- 面试版

```js
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}

// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  // 从储存事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
};

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
  // 将type事件以及对应的fn函数放入this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};

// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  handler = this._events.get(type);
  if (Array.isArray(handler)) {
    // 如果是一个数组说明有多个监听者,需要依次此触发里面的函数
    for (let i = 0; i < handler.length; i++) {
      if (args.length > 0) {
        handler[i].apply(this, args);
      } else {
        handler[i].call(this);
      }
    }
  } else {
    // 单个函数的情况我们直接触发即可
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }

  return true;
};

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单
  if (!handler) {
    this._events.set(type, fn);
  } else if (handler && typeof handler === "function") {
    // 如果handler是函数说明只有一个监听者
    this._events.set(type, [handler, fn]); // 多个监听者我们需要用数组储存
  } else {
    handler.push(fn); // 已经有多个监听者,那么直接往数组里push函数即可
  }
};

EventEmeitter.prototype.removeListener = function(type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单

  // 如果是函数,说明只被监听了一次
  if (handler && typeof handler === "function") {
    this._events.delete(type, fn);
  } else {
    let postion;
    // 如果handler是数组,说明被监听多次要找到对应的函数
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        postion = i;
      } else {
        postion = -1;
      }
    }
    // 如果找到匹配的函数,从数组中清除
    if (postion !== -1) {
      // 找到数组对应的位置,直接清除此回调
      handler.splice(postion, 1);
      // 如果清除后只有一个函数,那么取消数组,以函数形式保存
      if (handler.length === 1) {
        this._events.set(type, handler[0]);
      }
    } else {
      return this;
    }
  }
};
```

Vuex

- 跨级组件通信

Vuex

$attrs、$listeners

Provide、inject

## 17. SSR

SSR也就是服务端渲染，也就是将Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端。

SSR有着更好的SEO、并且首屏加载速度更快等优点。不过它也有一些缺点，比如我们的开发条件会受到限制，服务器端渲染只支持beforeCreate和created两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境。还有就是服务器会有更大的负载需求。

## 18. Vue的性能优化

### 编码阶段

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

### SEO优化

- 预渲染

- 服务端渲染SSR

### 打包优化

- 压缩代码

- Tree Shaking/Scope Hoisting

- 使用cdn加载第三方模块

- 多线程打包happypack

- splitChunks抽离公共文件

- sourceMap优化

### 用户体验

- 骨架屏

- PWA

## 19. hash路由和history路由实现原理

- location.hash的值实际就是URL中#后面的东西。

- history实际采用了HTML5中提供的API来实现，主要有history.pushState()和history.replaceState()。

<!-- 基础 -->
## 基本指令

## 实例的属性和方法

## 实例的生命周期

## 组件基础: 创建,注册,添加属性方法,套用等…

## 组件通信传值 父子, 兄弟, 跨级

## 插槽slot等…

<!-- 高级 -->

## vue-router: 搭建SPA

这里的路由就是**SPA（单页应用）的路径管理器**。再通俗的说，vue-router就是WebApp的链接路径管理系统。

vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转的。在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。**路由模块的本质 就是建立起url和页面之间的映射关系。**

至于我们为啥不能用a标签，这是因为用Vue做的都是单页应用（**当你的项目准备打包时，运行 npm run build时，就会生成dist文件夹，这里面只有静态资源和一个index.html页面）**，所以你写的标签是不起作用的，你必须使用vue-router来进行管理。

### vue-router实现原理

SPA(single page application):单一页面应用程序，只有一个完整的页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。**单页面应用(SPA)的核心之一是: 更新视图而不重新请求页面**

#### 1、Hash模式：

**Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据**。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件。

#### 2、History模式：

这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，**你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。**

- 方式1：直接修改地址栏

- 方式2：this.$router.push(‘路由地址’)

- 方式3：
```js
<router-link to="路由地址"></router-link>
```

## vue如何实现页面刷新

### 1.this.$router.go(0)

缺点：类似F5刷新，会出现瞬间白屏，体验不好

### 2.location.reload()

缺点：与方法1类似

### 3.跳转空白页再回跳

在需要刷新的地方写上：

```
this.$router.push('/emptyPage')
```

跳转到空白页，在emptyPage.vue的beforeRouteEnter 钩子里控制页面跳转，从而达到刷新的效果

```js
beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$router.replace(from.path)
      })
}
```
缺点：能看到路由快速变化

### 4.控制 router-view 的显示隐藏

默认 router-view v-if="isRouterAlive" /，isRouterAlive肯定是true，在需要刷新的时候把这个值设为false，接着再重新设为true

```js
this.isRouterAlive = false
this.$nextTick(function () {
  this.isRouterAlive = true
})
```

### 5.搭配provide/inject使用。

provide/inject是vue组件通讯的一种方式，其它vue通讯方法也可适当搭配使用。

1.在App.vue页面或别的上级页面中定义provide，返回一个对象的函数，函数处理路由v-if变量的更改，如方法4。代码如下:

```html
<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
 
<script>
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
```

2.在需要刷新的页面引入依赖：inject: ['reload']

3.在需要执行的地方直接调用方法即可：this.reload()

## 路由,组件的配置

## 路由间的传值

## 路由跳转

## 路由的导航守卫

## 记住在router.js 和 组件页面中的使用方式

## vuex: 状态管理: 数据仓库store

## 实例化仓库的5大属性的使用：state, getters, mutations, actions, modules

## 辅助函数mapState等…, 仓库中计算属性的映射, 方便操作

## 记住在 store.js 和 组件中 使用方式

<!-- VUE深入, 源码阅读 -->

## 数据响应式原理

## virtual dom

## diff 算法

## nextTick等等…

## vue2和vue3的数据绑定

## vue3的componest API

## vite的用法