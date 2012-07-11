/**
 * Copyright (c) 2012 André Fiedler, <https://twitter.com/sonnenkiste>
 *
 * license: MIT-style license
 */

Ext.define('Ux.feedback.FeedbackButton', {
    extend: 'Ext.Button',
    
    alias: 'widget.feedbackButton',
    
    remoteUrl  : '',
    jpegQuality: 0.5, // 0.1 to 1 (1 = 100%)
    messages   : {
        title                : 'Give feedback',
        descriptionWithCanvas: 'With the help of the feedback function, you can send suggestions to this product. We welcome bug reports, suggestions and comments to functions in general. A ScreenShot was automatically created and appended to your feedback <br/> In addition, you can write a short description for your feedback:',
        description          : 'With the help of the feedback function, you can send suggestions to this product. We welcome bug reports, suggestions and comments to functions in general <br/> your feedback:',
        loading              : 'Feedback will be sent...',
        successTitle         : 'Feedback has been sent',
        successMsg           : 'Thank you for your feedback!',
        errorTitle           : 'Error'
    },
    
    // private
    initComponent: function() {
        var me = this;
        
        me.callParent(arguments);
           
        // Alway layout as button, even if it´s inside a toolbar
        me.removeCls('x-toolbar-item');
        me.removeCls('x-btn-default-toolbar-small');
        me.addCls('x-btn-default-small');

        me.on('click', me.onClicked);
    },
    
    // private
    onRender: function() {
        this.callParent(arguments);
        
        // Feedback Button always stays on top (eg. Ext.getBody().mask())
        this.el.setStyle('z-index', 1000000);
        
        /*
        setInterval(function(){
            btn.toFront();
        }, 1000);
        */
    },

    // private
    onClicked: function() {
        var me = this;
        
        // TODO: Add Bandwidth Test (down/upstream speed test)
        
        if(me.isCanvasSupported()){
    		
			html2canvas( [ document.body ], {
				onrendered: function(canvas) {
					var c = Ext.get(canvas);

					c.setStyle('position', 'absolute');
					c.setStyle('left', 0);
					c.setStyle('top', 0);
					c.setStyle('z-index', 9999);
		
					Ext.get(document.body).insertSibling(c);
		
					me.showFeedbackWindow(
						me.messages.descriptionWithCanvas,
						canvas, c
					);
				}
			});
			
			
        } else {
            me.showFeedbackWindow(me.messages.description);
        }
    },
    
    // private
    isCanvasSupported: function(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    },
    
    // private
    showFeedbackWindow: function(msg, canvas, c){
        var me = this,
            win = Ext.create('Ux.feedback.FeedbackWindow');
            
        win.on('hide', function(){
            if(c) c.destroy();
        });
        win.prompt(me.messages.title, msg, function(btn, text){
            if (btn == 'ok'){
                Ext.getBody().mask(me.messages.loading, 'x-mask-loading', false);
                Ext.Ajax.request({
                    method: 'POST',
                    url: me.remoteUrl,
                    params: {
                        feedback: text,
                        screenshot: canvas ? canvas.toDataURL('image/jpeg', me.jpegQuality) : '',
                        datetime: new Date().toGMTString(),
                        useragent: navigator.userAgent,
                        platform: navigator.platform
                    },
                    success: function(response){
                        if(c) c.destroy();
                        Ext.getBody().unmask();
                        Ext.Msg.alert({
                            icon: Ext.Msg.INFO,
                            title: me.messages.successTitle,
                            msg: me.messages.successMsg,
                            buttons: Ext.Msg.OK
                        });
                        
                        me.fireEvent('feedbackSuccess');
                    },
                    failure: function(response, opts) {
                        var obj = Ext.decode(response.responseText);
                        Ext.getBody().unmask();
                        if(obj.msg)
                            Ext.Msg.alert(me.messages.errorTitle, obj.msg);
                            
                        me.fireEvent('feedbackFailure');
                    }
                });
            } else {
                if(c) c.destroy();
            }
        }, this, true);
    }
});