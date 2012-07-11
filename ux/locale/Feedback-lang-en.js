/**
 * Copyright (c) 2012 André Fiedler, <https://twitter.com/sonnenkiste>
 *
 * license: MIT-style license
 */

Ext.onReady(function(){
    
    if(Ux.window.FeedbackWindow){
        Ux.window.FeedbackWindow.buttonText.ok     = 'Give feedback';
        Ux.window.FeedbackWindow.buttonText.yes    = 'Yes';
        Ux.window.FeedbackWindow.buttonText.no     = 'No';
        Ux.window.FeedbackWindow.buttonText.cancel = 'Cancel';
    }
    
    if(Ux.window.FeedbackButton){
        Ux.window.FeedbackWindow.messages.title                 = 'Give feedback';
        Ux.window.FeedbackWindow.messages.descriptionWithCanvas = 'With the help of the feedback function, you can send suggestions to this product. We welcome bug reports, suggestions and comments to functions in general. A ScreenShot was automatically created and appended to your feedback <br/> In addition, you can write a short description for your feedback:';
        Ux.window.FeedbackWindow.messages.description           = 'With the help of the feedback function, you can send suggestions to this product. We welcome bug reports, suggestions and comments to functions in general <br/> your feedback:';
        Ux.window.FeedbackWindow.messages.loading               = 'Feedback will be sent...';
        Ux.window.FeedbackWindow.messages.successTitle          = 'Feedback has been sent';
        Ux.window.FeedbackWindow.messages.successMsg            = 'Thank you for your feedback!';
        Ux.window.FeedbackWindow.messages.errorTitle            = 'Error';
    }
});