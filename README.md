# 代码优化 —— 优化代码目的
## 1.代码语句精简:减少代码字节量，进而提高文件加载速度
①变量和函数命名要语义化
 定义变量：带出将来用到时的类型 var bFound,iCount,sName,oPerson;
②松散耦合（内容、样式、行为尽量分离）
 a.应尽量避免在js中创建大量HTML
 b.js修改css样式 element.className="edit",这样就可以动态更改样式而非特定样式来实现，有问题就直接修改css即可
 c.将复杂事件方法分离
③避免过多全局变量(最好只设一个)
 var myApplication = {
     var timer = null,
     sayName:function(){
        alert(timer);
     }
 };
④避免与null进行比较
 引用类型: if(values instanceof 类型)
 基本类型: if(typeof(value) == 类型)
⑤使用常量，用全大写声明常量
⑥注意作用域
 避免全局查找
 function updateUI(){
  var imgs = document.getElementsByTagName("img");
  for(var i=0,len=imgs.length;i<len;i++){
    ims[i].title = document.title + "image" + 1;
  }
  var msg = document.getElementById("msg");
  msg.innerHTML = "XXX";
 }
 优化
 function updateUI(){
  var doc = document;
  imgs = doc.getElementsByTagName("img");
  for(var i=0,len=imgs.length;i<len;i++){
    ims[i].title = doc.title + "image" + 1;
  }
  var msg = doc.getElementById("msg");
  msg.innerHTML = "XXX";
 }
⑦避免with语句
⑧优化循环
 a.减值迭代:在很多情况下，减值迭代比加值迭代高效
 b.简化终止条件:避免属性查找,或运算
 c.简化循环体
⑨switch语句较快，代替复杂的if-else语句
⑩位运算较快
①①将多个变量声明，合成一个语句
①②、使用事件代理来处理
## 2.功能优化:用于增强功能，减少Bug
①for循环
 var sum = 0;
 for(var i=1;i<=100;i++){
   sum += i;
 }
 优化写法
 for(var i=1,sum=0;i<100;sum+=i++);
②setTimeout与setInterval
> 在使用超时调用时，没有必要跟踪超时调用ID，而间歇调用，会一直跟踪间歇调用ID开发环境中，最好用超时调用来模拟间歇调用，很少使用真正的间歇调用。
③while循环
 var input;
 var emps=[];
 while(true){
  input=prompt("输入员工姓名");
  if(input!="exit"){
    //向数组结尾追加新元素
    emps[emps.length]=input;
  }else{
    break;
  }
 }
 优化写法:
 while((input=prompt("输入员工姓名")) != "exit"){
  var input;
  var emps=[];
  emps[emps.length]=input;
 }
④提高for循环的效率
 var arr = new Array(100);
 for(var i=0;i<arr.length;i++){}
 优化写法
 for(var i=0,len=arr.length;i<len;i++){}
⑤频繁的字符串连接+=，要用数组join("")代替
 var text_content = document.getElementById("text_content").value;	
 for(var i=0,result="",len=text_content.length;i<len;i++){
   result += text_content.charCodeAt(i);
 }
 优化写法
 for(var i=0,arry=[],len=text_content.length;i<len;i++){
   arry.push(text_content.charCodeAt(i));
 }
 console.log(arry.join(""));
⑥事件代理技术
 <ul id="myLinks">
  <li id="goSomeWhere">go somewhere</li>
  <li id="doSomething">do something</li>
  <li id="sayWords">say words</li>
 </ul>
 传统做法
 var item1 = document.getElementById("goSomeWhere");
 var item2 = document.getElementById("doSomething");
 var item3 = document.getElementById("sayWords");
 EventUtil.addHandler(item1,"click",function(event){});
 EventUtil.addHandler(item2,"click",function(event){});
 EventUtil.addHandler(item3,"click",function(event){});
 [缺点:数不清的代码用于添加处理程序]
 优化做法
 var list = document.getElementById("myLinks");
 EventUtil.addHandler(list,"click",function(event){
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  switch(target.id){
    case "goSomeWhere":
      //.......
      break;
    case "doSomething":
      //.......
      break;
    case "sayWords":
      //.......
      break;
  }
 });
 为ul添加的事件，由于li都是ul的子节点，事件都会冒泡，最终会掉到这个函数
 【移除事件时，记得element.onclick = null】
⑦访问/修改元素对象的标准DOM: HTML DOM（只能创建Image）
 查找/创建/删除元素对象:核心DOM
 
 
 
 
