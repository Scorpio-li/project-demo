# JS常用数据处理

## 1. 树结构遍历

- 基本树结构

```js
let tree = [
  {
    id: '1',
    title: '节点1',
    children: [
      {
        id: '1-1',
        title: '节点1-1'
      },
      {
        id: '1-2',
        title: '节点1-2'
      }
    ]
  },
  {
    id: '2',
    title: '节点2',
    children: [
      {
        id: '2-1',
        title: '节点2-1'
      }
    ]
  }
]
```

### 1.1 树结构遍历

#### 1.1.1 广度优先

广度优先遍历是非递归的，通常用循环来实现

广度优先的思路是，维护一个队列，队列的初始值为树结构根节点组成的列表，重复执行以下步骤直到队列为空：

取出队列中的第一个元素，进行访问相关操作，然后将其后代元素（如果有）全部追加到队列最后。

1. 循环实现

```js
// 广度优先
function treeForeach (tree, func) {
  let node, list = [...tree]
  while (node = list.shift()) {
    func(node)
    node.children && list.push(...node.children)
  }
}
```

```js
// 结果
treeForeach(tree, node => { console.log(node.title) })

> 节点1
> 节点2
> 节点1-1
> 节点1-2
> 节点2-1
```

#### 1.1.2 深度优先 

深度优先遍历是可递归的，实现方法可以是递归，也可以是循环

1. 先序遍历

```js
function treeForeach (tree, func) {
  tree.forEach(data => {
    func(data)
    data.children && treeForeach(data.children, func) // 遍历子树
  })
}
```

```js
// 循环
function treeForeach (tree, func) {
  let node, list = [...tree]
  while (node = list.shift()) {
    func(node)
    node.children && list.unshift(...node.children)
  }
}
```

2. 后续遍历

```js
function treeForeach (tree, func) {
  tree.forEach(data => {
    data.children && treeForeach(data.children, func) // 遍历子树
    func(data)
  })
}
```

```js
function treeForeach (tree, func) {
  let node, list = [...tree], i =  0
  while (node = list[i]) {
    let childCount = node.children ? node.children.length : 0
    if (!childCount || node.children[childCount - 1] === list[i - 1]) {
      func(node)
      i++
    } else {
      list.splice(i, 0, ...node.children)
    }
  }
}
```

#### 1.1.3 两种遍历方式的区别

- 深度优先，访问完一颗子树再去访问后面的子树，

    - 而访问子树的时候，先访问根再访问根的子树，称为先序遍历；
    
    - 先访问子树再访问根，称为后序遍历。

- 广度优先，即访问树结构的第n+1层前必须先访问完第n层

### 1.2 树结构查找

- 树结构筛选

树结构过滤即保留某些符合条件的节点，剪裁掉其它节点。一个节点是否保留在过滤后的树结构中，取决于它以及后代节点中是否有符合条件的节点。可以传入一个函数描述符合条件的节点:

```js
function treeFilter (tree, func) {
  // 使用map复制一下节点，避免修改到原树
  return tree.map(node => ({ ...node })).filter(node => {
    node.children = node.children && treeFilter(node.children, func)
    return func(node) || (node.children && node.children.length)
  })
}
```

#### 1.2.1 节点查找

查找节点其实就是一个遍历的过程，遍历到满足条件的节点则返回，遍历完成未找到则返回null。类似数组的find方法，传入一个函数用于判断节点是否符合条件，代码如下：

```js
function treeFind (tree, func) {
  for (const data of tree) {
    if (func(data)) return data
    if (data.children) {
      const res = treeFind(data.children, func)
      if (res) return res
    }
  }
  return null
}
```

#### 1.2.2 路径查找

略微复杂一点，因为不知道符合条件的节点在哪个子树，要用到回溯法的思想。查找路径要使用先序遍历，维护一个队列存储路径上每个节点的id，假设节点就在当前分支，如果当前分支查不到，则回溯。

```js
function treeFindPath (tree, func, path = []) {
  if (!tree) return []
  for (const data of tree) {
    path.push(data.id)
    if (func(data)) return path
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, path)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}
```

### 1.3 树结构和列表结构相互转换

#### 1.3.1 列表转为树结构

列表结构通常是在节点信息中给定了父级元素的id，然后通过这个依赖关系将列表转换为树形结构

```js
let list = [
  {
    id: '1',
    title: '节点1',
    parentId: '',
  },
  {
    id: '1-1',
    title: '节点1-1',
    parentId: '1'
  },
  {
    id: '1-2',
    title: '节点1-2',
   parentId: '1'
  },
  {
    id: '2',
    title: '节点2',
    parentId: ''
  },
  {
    id: '2-1',
    title: '节点2-1',
   parentId: '2'
  }
]
```

列表结构转为树结构，就是把所有非根节点放到对应父节点的chilren数组中，然后把根节点提取出来：

```js
function listToTree (list) {
  let info = list.reduce((map, node) => (map[node.id] = node, node.children = [], map), {})
  return list.filter(node => {
    info[node.parentId] && info[node.parentId].children.push(node)
    return !node.parentId
  })
}
```

这里首先通过info建立了id=>node的映射，因为对象取值的时间复杂度是O(1)，这样在接下来的找寻父元素就不需要再去遍历一次list了，因为遍历寻找父元素时间复杂度是O(n)，并且是在循环中遍历，则总体时间复杂度会变成O(n^2)，而上述实现的总体复杂度是O(n)。

#### 1.3.2 树结构转为列表

有了遍历树结构的经验，树结构转为列表结构就很简单了。不过有时候，我们希望转出来的列表按照目录展示一样的顺序放到一个列表里的，并且包含层级信息。使用先序遍历将树结构转为列表结构是合适的，直接上代码:

```js
//递归实现
function treeToList (tree, result = [], level = 0) {
  tree.forEach(node => {
    result.push(node)
    node.level = level + 1
    node.children && treeToList(node.children, result, level + 1)
  })
  return result
}

// 循环实现
function treeToList (tree) {
  let node, result = tree.map(node => (node.level = 1, node))
  for (let i = 0; i < result.length; i++) {
    if (!result[i].children) continue
    let list = result[i].children.map(node => (node.level = result[i].level + 1, node))
    result.splice(i+1, 0, ...list)
  }
  return result
}
```

## 2. 循环遍历

当数组中元素是值类型，map不会改变原数组；当是引用类型，则可以改变原数组

## 3. 运算精度问题

- JavaScript四舍五入保留两位小数

需要保留的浮点数加上常量 Number.EPSILON进行浮点数补偿,补偿后再使用 Math.round()

```js
(Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2) // num 为需要保留的初始小数
```

## 4. formaData数据处理

1. 添加数据   formdata.append(key,value)
2. 删除数据   formdata.delete(key);
3. 设置/修改数据   formdata.set(key,value)如果key不存在则新增一条数据，如果存在，则会修改对应的value值。
4. 获取数据   formdata.get(key)/formdata.getAll(key)
5. 判断是否存在某条数据   formdata.has(key),存在返回true，不存在返回false。

## 5. Math常用方法

1. Math.random(): 获取的是从0~1的随机数。包含0，不包含1
2. Math.abs(): 获取一个绝对值
3. Math.floor(): 向下取整
4. Math.ceil(): 向上取整 
5. Math.round(): 四舍五入
6. Math.max方法，接收N个数字作为参数，返回这些数字中的最大值
7. Math.min 方法，接收N个数字作为参数，返回这些数字中的最小值
8. Math.sqrt(): 开方
9. Math.pow(x, y); 返回的是x的y次方

## 6. 数组去重

- 测试模板

```js
let arr1 = Array.from(new Array(100000), (x, index)=>{
    return index
})

let arr2 = Array.from(new Array(50000), (x, index)=>{
    return index+index
})

let start = new Date().getTime()
console.log('开始数组去重')

function distinct(a, b) {
    // 数组去重
}

console.log('去重后的长度', distinct(arr1, arr2).length)

let end = new Date().getTime()
console.log('耗时', end - start)
```

1. Array.sort(): 方法思路：首先使用 sort() 将数组进行排序，然后比较相邻元素是否相等，从而排除重复项

```js
function distinct(a, b) {
    let arr = a.concat(b)
    arr = arr.sort()
    let result = [arr[0]]

    for (let i=1, len=arr.length; i<len; i++) {
        arr[i] !== arr[i-1] && result.push(arr[i])
    }
    return result
}
```

2. new Set():  ES6 新增了 Set 这一数据结构，类似于数组，但Set 的成员具有唯一性

```js
function distinct(a, b) {
    return Array.from(new Set([...a, ...b]))
}
```

3. for...of + Object: 方法思路：首先创建一个空对象，然后用 for 循环遍历，利用对象的属性不会重复这一特性，校验数组元素是否重复

```js
function distinct(a, b) {
    let arr = a.concat(b)
    let result = []
    let obj = {}

    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }
    return result
}
```