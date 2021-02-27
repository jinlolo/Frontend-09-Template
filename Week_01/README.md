# 学习笔记

## 编程训练训练的内容
1. 语言特性
1. 数据结构
1. 算法练习
## TicTacToe游戏实现（三子棋）
**表示棋盘**
1. 定义一个3*3的二维数组
1. 每个数组的位置表示一个棋盘格的状态：空、圈、叉

**绘制棋盘**
1. 两层for循环去创建棋盘格
1. 棋盘的状态展示：a.js三元表达式嵌套替代if/switch语句；b.代码规整表示；c.DOM树渲染&绘制过程（单步调试）

**落子的事件监听**
1. addEventListener添加监听事件
1. let 块级作用域
1. 交替落子的实现方法

**判断胜负**
三行三列两对角 {}定义局部变量（可以让let声明的变量win反复使用(块级作用域)）

**胜出预判**
1. AI 能力 循环遍历数组，判断是否存在空节点，深拷贝数组，继而对该空节点赋值color，然后进行胜负判断
1. 使用JSON.parse(JSON.stringify())实现深拷贝

## Promise与async/await：
1. callback 回调地狱，代码复杂
2. Promise.then promise是一个链式表达式的形式。
3. async/await 是Promise机制的语法上的支持和封装，运行时实际上也是通过Promise去管理异步的。 以描述同步代码的方式写异步代码。

## generator与异步
1. generator yield模拟 async/await
2. async generator （对应 for await of 语法）
```js
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}
async function* counter() {
  let index = 0;
  while(true) {
    await sleep(1000);
    yield index++;
  }
}
(async function(){
  for await(let v of counter()){
    console.log(v);
  }
})();
```
