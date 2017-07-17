/*定义抽象类:让window依赖于widget，如果在定义treeTab类，也是依赖于Widget
* 为Widdget类添加统一生命周期
*/
define(['jquery'],function($){
    function Widget(){
        this.boundingBox = null;//最外层容器
    }
    Widget.prototype = {
        //多个元素绑定通一事件，利用观察者模式处理回调函数的公共方法
        on:function(type,handler){
            if(typeof this.handlers[type] == 'undefined'){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire:function(type,data){
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                $.each(handlers,function(i,n){
                   n(data);
                });
            }
        },
        render:function(container){//方法:渲染组件
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container||document.body).append(this.boundingBox);
        },
        //方法:销毁组件
        destroy:function(){
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
        },
        //统一接口
        renderUI:function(){},//接口:添加dom节点
        bindUI:function(){},//接口:监听事件
        syncUI:function(){},//接口:初始化组件属性
        destructor:function(){}//接口:销毁前的处理函数

    };
    return {Widget:Widget};
});