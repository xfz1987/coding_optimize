/**
 * require 模块配置
 * @type {Object}
 */
// require.config({
//     baseUrl:'./../asset',
//     paths:{
//         jquery : './lib/jquery.min',
//        jqueryUI : './ui/jquery.ui',
//         window : './ui/window',
//         widget : './ui/widget'
//     }
// });

require(['jquery','window'],function($,w,amz){
    $('#a').click(function(){
        var win = new w.Window();

        //使用连缀语法
        win.alert({
            width:300,
            height:200,
            title:'提示',
            content:'welcome!',
            textAlertBtn:'OK',
            close:true,
            isDraggable:true,
            skinClassName:'window_skin_a',
            handlerAlert:function(){
                alert('you click the alert button');
            },
            handlerClose:function(){
                alert('you click the close button');
            }
        }).on('alert',function(){
            alert('you click second alert button');
        }).on('alert',function(){
            alert('you click third alert button');
        }).on('close',function(){
            alert('you click second close button');
        });
    });

    $('#c').click(function(){
        new w.Window().confirm({
            width:300,
            height:150,
            title:'系统提示',
            content:'您确定要删除该记录吗？',
            isDraggable:true,
            textConfirmBtn:'Ok',
            textCancelBtn:'Cancel',
        }).on('confirm',function(){
            alert('I am sure');
        }).on('cancel',function(){
            alert('I am not sure');
        });
    });

    $('.g-test>li').click(function(){
        alert($(this).text());
    });

    $('.g-like').on('change',function(){
        console.log($(this)[0].selectedIndex);
    });


});