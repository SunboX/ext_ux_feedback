Ext.ux.Feedback
===============

The idea to this Ext 4 extension is based on Google+ feedback functionality. This extension allows you to put an feedback button somewhere inside you application. If your users click on this button, it will automatically take an ScreenShot of your application and ask your user to write some notes. The feedback will be send to your server. You can find a demo PHP script for sending an eMail with the feedback and attached ScreenShot and Session data inside the `/server/` folder.


The ScreenShot functionality is realized by use of <a href="https://raw.github.com/niklasvh/html2canvas/">html2canvas</a>.


If no canvas is supported by your users browser, it will only aks for some notes and send you some client informations.

### Usage ###

    items: [
        {
            xtype: 'feedbackButton',
            text: 'Give Feedback !',
            remoteUrl: 'sendFeedback.php',
            listeners: {
                feedbackSuccess: function(){
                    alert('Hey, you got feedback!');
                }
            }
        }
    ]
    
### Demo ###

For an demo, please visit <a href="http://www.visualdrugs.net/ext_ux_feedback/demo/">http://www.visualdrugs.net/ext_ux_feedback/demo/</a>