<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader (created by composer, not included with PHPMailer)
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions

require('phpmailer/PHPMailerAutoload.php');

//EMAIL RECEIVED TO THE CLIENT

$mail2 = new PHPMailer(true);
$mail2->IsMail();
$mail2->IsSMTP(); //use this code if you are using SMTP mail service
$mail2->Host = 'smtp.hostinger.in';		//add your host name for eg here it shows gmail 
$mail->Port = 587; //SMTP port -- use '465' or '587
$mail2->SMTPAuth = true; 
$mail2->SMTPDebug = false; //to remove the mail errors
$mail2->do_debug = 0;
$mail2->Username = 'president@mycitibidadi.com'; // Enter your SMTP username (if not using SMTP then enter gmail email id for gmail host)
$mail2->Password = '$$MyCiti1234$$'; // Enter your SMTP password (if not using SMTP then enter gmail passwork for gmail host)
$mail2->FromName = "MyCiti";	//name from which the mail is sent
$mail2->From = "president@mycitibidadi.com";	//email from which the mail is sent
$mail2->SMTPSecure = 'tls'; //if not tls use 'ssl'
$mail2->Port = 587; //SMTP port -- use '465' or '587'
$mail2->addAddress($emailSanitized, $fnameSanitized);
$mail2->AddBCC('president@mycitibidadi.com', 'president@mycitibidadi.com');
$mail2->AddReplyTo('president@mycitibidadi.com', 'president@mycitibidadi.com');
$mail2->IsHTML(true);	//if the email template is in html format
$mail2->Subject = "Thank you - Your Request Submitted Successfully";	//subject for the mail
$mail2->Body = "<br>



// Define some constants
 define( "RECIPIENT_NAME", " " );
 define( "RECIPIENT_EMAIL", "president@mycitibidadi.com" ); //write your mail here
 
// Read the form values
$success = false;
$userName = isset( $_POST['name'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['name'] ) : "";
$senderEmail = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";
$senderPhone = isset( $_POST['phone'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['phone'] ) : "";
$userSubject = isset( $_POST['subject'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['subject'] ) : "";
$message = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

// If all values exist, send the email
if ( $userName && $senderEmail && $senderPhone && $userSubject && $message) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $headers = "From: " . $userName . "";
  $msgBody = " Email: ". $senderEmail . " Phone: ". $senderPhone . " Subject: ". $userSubject . " Message: " . $message . "";
  $success = mail( $recipient, $headers, $msgBody );

  //Set Location After Successsfull Submission
  header('Location: index.html?message=Successfull');
}

else{
	//Set Location After Unsuccesssfull Submission
  	header('Location: index.html?message=Failed');	
}

//REDIRECT TO PAGE AFTER SUBMIT
//header("Location:https://mycitibidadi.com/") //redirects to a page named index.php;
?>