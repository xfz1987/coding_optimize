define(['jquery','scrollto'],function($,sto){
    function BackTop(el,opts){
        this.$el = $(el);
        this.opts = $.extend({},this.DEFAULTS,opts);
        this.sto = new sto.ScrollTo({
            dest:0,
            speed:this.opts.speed
        });

        this._checkPos();

        if(this.opts.mode === 'move'){
            //$.proxy将click的this($el)指向第二个参数this(BackTop)这个对象
            this.$el.on('click',$.proxy(this._move,this));
        }else{
            this.$el.on('click',$.proxy(this._go,this));
        }

        $(window).on('scroll',$.proxy(this._checkPos,this));
    }
    BackTop.prototype = {
        _move:function(){
            this.sto.move();
        },
        _go:function(){
            this.sto.go();
        },
        _checkPos:function(){
            $(window).scrollTop() > this.opts.pos ? this.$el.fadeIn() : this.$el.fadeOut();
        }
    };
    BackTop.DEFAULTS = {
        mode:'move',//go
        pos:$(window).height(),
        speed:800
    };
    return {BackTop:BackTop};
});