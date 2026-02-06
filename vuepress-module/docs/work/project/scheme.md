# 项目中遇到的一些问题的解决方案

## 不借助后台和 JS ，只用 CSS 让一个列表编号倒序

1. HTML中的reversed 属性

```js
<ol reversed>
  <li>C</li>
  <li>B</li>
  <li>A</li>
</ol>

/* 
3. C
2. B
1. A
*/
```

2. HTML中的value属性

```js
<ol>
  <li value="3">C</li>
  <li value="2">B</li>
  <li value="1">A</li>
</ol>
```

3. CSS 自定义的 counter()

    - 第三种方式就是使用CSS的 counter 计算器， 要倒序计数器的顺序，我们有两件事要做：将计数器重置为非0的值，并以负数递增计数器。

```js
<ol>
    <li>C</li>
    <li>B</li>
    <li>A</li>
</ol>
```
```CSS
ol {
  counter-reset: my-custom-counter 4;
  list-style: none;
}

ol li {
  counter-increment: my-custom-counter -1;
}

ol li::before {
  content: counter(my-custom-counter) ". ";
  color: #f23c50;
  font-size: 2.5rem;
  font-weight: bold;
}
```

- 如果我们不知道确切的列表数量，则可以将counter-reset属性移到HTML中：

```html
<ol style="counter-reset: my-custom-counter {{ items.length + 1 }}">
  <li>C</li>
  <li>B</li>
  <li>A</li>
</ol>
```

```css
ol {
  list-style: none;
}

ol li {
  counter-increment: my-custom-counter -1;
}

ol li::before {
  content: counter(my-custom-counter) ". "
}
```

## 项目开发应该考虑的：

1. 开发应该考虑后期怎么维护、项目如何迭代、可持续化发展，怎么更好的测试
2. 

## 工作相应职责：

1. 页面渲染
2. Nodejs负责路由分配
3. 后端提供API
4. 缓存机制
5. 图片上传下载
6. 数据校验
7. 语言国际化


## Restful风格的API应该是前后端分离的最佳实践

- 后端专注于：后端控制层（Restful API） & 服务层 & 数据访问层；

- 前端专注于：前端控制层（Nodejs） & 视图层

## 如何前后端分离

1、项目设计阶段，前后端架构负责人将项目整体进行分析，讨论并确定API风格、职责分配、开发协助模式，确定人员配备；设计确定后，前后端人员共同制定开发接口。

2、项目开发阶段，前后端分离是各自分工，协同敏捷开发，后端提供Restful API，并给出详细文档说明，前端人员进行页面渲染前台的任务是发送API请(GET,PUT,POST,DELETE等)获取数据（json，xml）后渲染页面。

3、项目测试阶段，API完成之前，前端人员会使用mock server进行模拟测试，后端人员采用junit进行API单元测试，不用互相等待；API完成之后，前后端再对接测试一下就可以了，当然并不是所有的接口都可以提前定义，有一些是在开发过程中进行调整的。

4、项目部署阶段，利用nginx 做反向代理，即Java + nodejs + nginx 方式进行。

## git提交规范

### 主要type
feat:     增加新功能
fix:      修复bug

### 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

### 暂不使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动


## npm version变更项目版本号

1. npm version获取当前的详细版本信息

## Element-UI 

### 1. element-tree组件当数据量比较大的时候会变得比较卡顿

解决方案： 

1. 修改Element-UI源码：添加disable-transitions属性判断

```html
<div v-else>
  <div
    class="el-tree-node__children"
    v-if="!renderAfterExpand || childNodeRendered"
    v-show="expanded"
    role="group"
    :aria-expanded="expanded"
  >
    <el-tree-node
      :render-content="renderContent"
      v-for="child in node.childNodes"
      :render-after-expand="renderAfterExpand"
      :show-checkbox="showCheckbox"
      :key="getNodeKey(child)"
      :node="child"
      :disable-transitions="disableTransitions"
      @node-expand="handleChildNodeExpand">
    </el-tree-node>
  </div>
</div>
```