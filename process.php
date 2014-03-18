<?php
if( isset($_POST) ){

    //submission data
    $ipaddress = $_SERVER['REMOTE_ADDR'];
    $date = date('d/m/Y');
    $time = date('H:i:s');

    //form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = nl2br($_POST['people']);
    $captcha = $_POST['captcha'];

    if($captcha != 5) return;

    //send email if all is ok
    // $headers = "From: {$email}" . "\r\n";
    $headers = 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= "From: $name <$email>". "\r\n";
    $headers .= "Reply-To: $name <$email>". "\r\n";

    $emailbody = "<p><strong>Name:</strong> {$name} </p>
                  <p><strong>Email Address:</strong> {$email} </p>
                  <p><strong>People:</strong><br> {$message} </p>
                  <p>This message was sent from the IP Address: {$ipaddress} on {$date} at {$time}</p>";
    // make sure each line doesn't exceed 70 characters
    $emailbody = wordwrap($emailbody, 70);
    mail("rsvp@lolixrick.com", "RSVP", $emailbody, $headers);
    // print($emailbody);
    // print($headers);

    // print($formok);
    // print_r($errors);

}

