/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

        'MyDesktop.SystemStatus',
        'MyDesktop.VideoWindow',
        'MyDesktop.GridWindow',
        'MyDesktop.TabWindow',
        'MyDesktop.AccordionWindow',
        'MyDesktop.Notepad',
        'MyDesktop.BogusMenuModule',
        'MyDesktop.BogusModule',

//        'MyDesktop.Blockalanche',
        'MyDesktop.Settings',
        
        'Ux.feedback.FeedbackButton'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
            new MyDesktop.VideoWindow(),
            //new MyDesktop.Blockalanche(),
            new MyDesktop.SystemStatus(),
            new MyDesktop.GridWindow(),
            new MyDesktop.TabWindow(),
            new MyDesktop.AccordionWindow(),
            new MyDesktop.Notepad(),
            new MyDesktop.BogusMenuModule(),
            new MyDesktop.BogusModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
                    { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ]
            }),

            wallpaper: 'wallpapers/desktop.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                {
                    xtype: 'feedbackButton',
                    text: 'Give Feedback !',
                    remoteUrl: 'desktop/server/sendFeedback.php',
                    flex: 1,
                    id: 'feedback-button',
                    style: {
                        background: 'yellow'
                    },
                    listener: {
                        feedbackSuccess: function(){
                            Ext.Msg.show({
                                 title:'DEMOTIME!',
                                 msg: 'Would you like to recieve the feedback as eMail than klick "yes". For opening it as new window, click "no".',
                                 buttons: Ext.Msg.YESNO,
                                 icon: Ext.Msg.QUESTION,
                                 fn: function(btn, text){
                                    if (btn === 'ok'){
                                        Ext.Msg.prompt('Your eMail', 'Please enter your eMail adress:', function(btn, text){
                                            if (btn == 'ok'){
                                                Ext.Ajax.request({
                                                    method: 'POST',
                                                    url: 'desktop/server/sendFeedbackAsEMail.php',
                                                    params: {
                                                        email: text
                                                    },
                                                    success: function(response){
                                                        Ext.Msg.alert({
                                                            icon: Ext.Msg.INFO,
                                                            title: 'eMail message send',
                                                            msg: 'Please check you incomming eMail mesages. You should have feedback. ;o)',
                                                            buttons: Ext.Msg.OK
                                                        });
                                                    },
                                                    failure: function(response, opts) {
                                                        var obj = Ext.decode(response.responseText);
                                                        if(obj.msg)
                                                            Ext.Msg.alert(me.messages.errorTitle, obj.msg);
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        window.open('desktop/server/showFeedback.php');
                                    }
                                }
                            });
                        }
                    }
                },
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
