<?php

session_start();

?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    
    <title>ExtTop - Desktop Sample App - Feedback</title>

</head>
<body>
<h3>Screenshot:</h3>
<br>
<img src="data/<?php echo $_SESSION['screenshot']; ?>">
<br><br>
<h3>Data:</h3>
<br>
<?php echo nl2br($_SESSION['feedback']); ?>
<br><br>
</body>
</html>
