/**
 * Copyright (c) 2012 André Fiedler, <https://twitter.com/sonnenkiste>
 *
 * license: MIT-style license
 */

Ext.onReady(function(){
    
    if(Ux.window.FeedbackWindow){
        Ux.window.FeedbackWindow.buttonText.ok     = 'Feedback senden';
        Ux.window.FeedbackWindow.buttonText.yes    = 'Ja';
        Ux.window.FeedbackWindow.buttonText.no     = 'Nein';
        Ux.window.FeedbackWindow.buttonText.cancel = 'Abbrechen';
    }
    
    if(Ux.window.FeedbackButton){
        Ux.window.FeedbackWindow.messages.title                 = 'Feedback geben';
        Ux.window.FeedbackWindow.messages.descriptionWithCanvas = 'Mit Hilfe der Feedback-Funktion können Sie Verbesserungsvorschläge zu diesem Produkt senden. Wir freuen uns über Problemberichte, Anmerkungen zu Funktionen und Kommentare im Allgemeinen. Es wurde automatisch ein ScreenShot erstellt und Ihrem Feedback angehangen.<br/><br/> Zusätzlich können Sie eine kurze Beschreibung zu Ihrem Feedback verfassen:';
        Ux.window.FeedbackWindow.messages.description           = 'Mit Hilfe der Feedback-Funktion können Sie Verbesserungsvorschläge zu diesem Produkt senden. Wir freuen uns über Problemberichte, Anmerkungen zu Funktionen und Kommentare im Allgemeinen.<br/><br/> Ihr Feedback:';
        Ux.window.FeedbackWindow.messages.loading               = 'Feedback wird versendet...';
        Ux.window.FeedbackWindow.messages.successTitle          = 'Feedback wurde versandt';
        Ux.window.FeedbackWindow.messages.successMsg            = 'Vielen Dank für Ihr Feedback!';
        Ux.window.FeedbackWindow.messages.errorTitle            = 'Fehler';
    }
});