define(['jquery'],function($){
    function ScrollTo(opts){
        this.opts = $.extend({},ScrollTo.DEFAULTS,opts);
        this.$el = $('html,body');
    }
    ScrollTo.DEFAULTS = {
        dest:0,
        speed:800
    };
    ScrollTo.prototype = {
        move:function(){
            var opts = this.opts;//利用局部变量缓存参数，节省性能
            if($(window).scrollTop() !== opts.dest && !this.$el.is(':animated')){
                this.$el.animate({
                    scrollTop:opts.dest
                },opts.speed);
            }
        },
        go:function(){
            var dest = this.opts.dest;
            $(window).scrollTop() !== dest && this.$el.scrollTop(dest);
        }
    };
    return {ScrollTo:ScrollTo};
});