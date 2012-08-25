<?php

session_start();

$dir = dirname(__FILE__) . '/data/';
$filename = session_id() . time() . '.jpg';

// delete old screenshots
$handle = opendir($dir);
if($handle) {
    // read directory contents
    while(false !== ($file = readdir($handle))) {
        // check the create time of each file (older than 1 hour)
        if($file !== '.' && $file !== '..' && filemtime($dir . $file) < time() - 3600) {
            unlink($dir . $file);
        }
    }
}
     
$data = '';

$feedback  = 'Server Date/Time: ' . date('Y-m-d - H:i:s') . ' (start building eMail - server)' . "\n\n";
$feedback .= 'Client Date/Time: ' . date('Y-m-d - H:i:s', strtotime($_POST['datetime'])) . ' (start sending feedback - client)' . "\n\n";
$feedback .= 'Client Browser: ' . $_POST['useragent'] . "\n\n";
$feedback .= 'Client OS: ' . $_POST['platform'] . "\n\n";

$feedback .= 'Feedback: ' . "\n\n" . $_POST['feedback'];

if(isset($_POST['screenshot'])){
    $data = base64_decode(preg_replace('/^data:image\/jpeg;base64,/', '', $_POST['screenshot']));
}

// attach ScreenShot
file_put_contents($dir . $filename, $data);

$_SESSION['screenshot'] = $filename;
$_SESSION['feedback'] = $feedback;


echo json_encode(array(
    'success' => true,
    'msg'     => ''
));

?>
