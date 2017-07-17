/**
 * require 模块配置
 * @type {Object}
 */

// require.config({
//     baseUrl:'./../asset',
//     paths:{
//         jquery : './lib/jquery.min',
//         backtop : './ui/backtop',
//         scrollto : './ui/scrollTo'
//     }
// });
require(['jquery','backtop'],function($,bt){
    new bt.BackTop($('.top'),{
        mode:'move',//move,go两种方式
        pos:$(window).height(),//到什么位置时显示回到顶部按钮
        speed:800
    });
});