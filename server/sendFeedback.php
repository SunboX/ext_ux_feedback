<?php
     
$data = null;

$feedback  = 'Server Datum/Zeit: ' . date('d.m.Y - H:i:s') . ' (Beginn Zusammenstellung E-Mail - Server)' . "\n\n";
$feedback .= 'Client Datum/Zeit: ' . date('d.m.Y - H:i:s', strtotime($_POST['datetime'])) . ' (Beginn Feedback-Versand - Client)' . "\n\n";
$feedback .= 'Client Browser: ' . $_POST['useragent'] . "\n\n";
$feedback .= 'Client Betriebssystem: ' . $_POST['platform'] . "\n\n";

$feedback .= 'Feedback: ' . "\n\n" . $_POST['feedback'];

if(isset($_POST['screenshot'])){
    $data = base64_decode(preg_replace('/^data:image\/jpeg;base64,/', '', $_POST['screenshot')));
}

// Create the message
$message = Swift_Message::newInstance()
    
    // Give the message a subject
    ->setSubject('Feedback from Demo App')
    
    // Set the From address with an associative array
    ->setFrom(array('--EMAIL--' => 'Demo App'))
    
    // Set the To addresses with an associative array
    ->setTo(array('--EMAIL--' => 'Demo Admin'))
    
    // Give it a body
    ->setBody($feedback);

// attach ScreenShot
if(!empty($data)){
    $attachment = Swift_Attachment::newInstance($data, 'ScreenShot.jpg', 'image/jpeg');
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
