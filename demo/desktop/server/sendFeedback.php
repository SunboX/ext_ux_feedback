<?php

session_start();
     
$data = '';

$feedback  = 'Server Datum/Zeit: ' . date('d.m.Y - H:i:s') . ' (Beginn Zusammenstellung E-Mail - Server)' . "\n\n";
$feedback .= 'Client Datum/Zeit: ' . date('d.m.Y - H:i:s', strtotime($_POST['datetime'])) . ' (Beginn Feedback-Versand - Client)' . "\n\n";
$feedback .= 'Client Browser: ' . $_POST['useragent'] . "\n\n";
$feedback .= 'Client Betriebssystem: ' . $_POST['platform'] . "\n\n";

$feedback .= 'Feedback: ' . "\n\n" . $_POST['feedback'];

if(isset($_POST['screenshot'])){
    $data = base64_decode(preg_replace('/^data:image\/jpeg;base64,/', '', $_POST['screenshot']));
}

// attach ScreenShot
file_put_contents(dirname(__FILE__) . '/data/' . session_id() . '.jpg', $data);

$_SESSION['screenshot'] = session_id() . '.jpg';
$_SESSION['feedback'] = $feedback;


echo json_encode(array(
    'success' => true,
    'msg'     => ''
));

?>
