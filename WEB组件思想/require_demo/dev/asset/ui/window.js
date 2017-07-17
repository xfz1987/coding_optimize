define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
    function Window(){
        this.cfg = {
            width:500,
            height:300,
            title:'系统提示',
            content:'',
            textAlertBtn:'确定',
            close:false,
            isDraggable:true,
            skinClassName:null,
            handlerAlert:null,
            handlerClose:null,
            textConfirmBtn:'确定',
            textCancelBtn:'取消',
            handlerConfirm:null,
            handlerCancelBtn:null
        };
    }

    Window.prototype = $.extend({},new widget.Widget(),{
        renderUI:function(){
            /*创建遮罩层*/
            this._mask = $('<div class="window_mask"></div>');
            this._mask.appendTo('body');
            /*创建弹窗*/
            var footerContent = '';
            switch(this.cfg.winType){
                case 'alert':
                    footerContent = '<input type="button" class="window_alertBtn" value="'+ this.cfg.textAlertBtn + '"';
                    break;
                case 'confirm':
                    footerContent = '<input type="button" class="window_confirmBtn" value="'+ this.cfg.textConfirmBtn + '">' +
                                    '<input type="button" class="window_cancelBtn" value="'+ this.cfg.textCancelBtn + '">';
                    break;
            }
            this.boundingBox = $(
                '<div class="window_boundingBox">' +
                    '<div class="window_header">'+this.cfg.title+'</div>' +
                    '<div class="window_body">'+this.cfg.content+'</div>' +
                    '<div class="window_footer">'+footerContent+'</div>' +
                '</div>'
            );
            /*创建关闭按钮*/
            if(this.cfg.close){
                this.boundingBox.append($('<span class="window_closeBtn">X</span>'));
            }
            this.boundingBox.appendTo('body');
        },
        bindUI:function(){
            var me = this;
            this.boundingBox.on('click','.window_alertBtn',function(){
                me.fire('alert');
                me.destroy();
            });
            this.boundingBox.on('click','.window_closeBtn',function(){
                me.fire('close');
                me.destroy();
            });
            this.boundingBox.on('click','.window_confirmBtn',function(){
                me.fire('confirm');
                me.destroy();
            });
            this.boundingBox.on('click','.window_cancelBtn',function(){
                me.fire('cancel');
                me.destroy();
            });
            //给cfg中的两个回调函数绑定
            me.cfg.handlerAlert && me.on('alert',me.cfg.handlerAlert);
            me.cfg.handlerClose && me.on('close',me.cfg.handlerClose);
        },
        syncUI:function(){
            this.boundingBox.css({
                width:this.cfg.width+'px',
                height:this.cfg.height+'px',
                left:(window.innerWidth-this.cfg.width)/2 + 'px',
                top:(window.innerHeight-this.cfg.height)/2 + 'px'
            });
            if(this.cfg.skinClassName){
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
            if(this.cfg.isDraggable){
                this.boundingBox.find('.window_header').css('cursor','move');
                this.boundingBox.draggable({handle:'.window_header'});
            }
        },
        destructor:function(){
            this._mask && this._mask.remove();
        },
        alert:function(cfg){
            $.extend(this.cfg,cfg,{winType:'alert'});
            this.render();
            return this;
        },
        confirm:function(cfg){
             $.extend(this.cfg,cfg,{winType:'confirm'});
             this.render();
             return this;
        }
    });
    return {Window:Window};
});