<?php

session_start();

require_once dirname(__FILE__) . '/../../../lib/swift_mailer/swift_required.php';

// Create the message
$message = Swift_Message::newInstance()
    
    // Give the message a subject
    ->setSubject('Feedback from Demo App')
    
    // Set the From address with an associative array
    ->setFrom(array('--EMAIL--' => 'Demo App'))
    
    // Set the To addresses with an associative array
    ->setTo(array($_POST['email'] => 'Demo App'))
    
    // Give it a body
    ->setBody($feedback);

// attach ScreenShot
if(!empty($_SESSION['screenshot'])){
    $attachment = Swift_Attachment::newInstance($_SESSION['screenshot'], 'ScreenShot.jpg', 'image/jpeg');
    $message->attach($attachment);
}

$attachment = Swift_Attachment::newInstance(mb_convert_encoding(var_export($_SESSION), 'UTF-8'), 'Session.txt', 'text/plain');
$message->attach($attachment);

// Create the Transport
$transport = Swift_SmtpTransport::newInstance('--SERVER--', 25)
  ->setUsername('--USER--')
  ->setPassword('--PASSWORD--');

// Create the Mailer using your created Transport
$mailer = Swift_Mailer::newInstance($transport);

// Send the message
$result = $mailer->send($message);

echo json_encode(array(
    'success' => true,
    'msg'     => ''
));

?>
