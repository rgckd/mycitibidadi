<?php

// Define some constants
define( "RECIPIENT_NAME", "MyCiti Owners Association" );
define( "RECIPIENT_EMAIL", "mycitiownersassociation@gmail.com" );

// Read the form values
$userName = isset( $_POST['name'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['name'] ) : "";
$senderEmail = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";
$senderPhone = isset( $_POST['phone'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9\+\s]/", "", $_POST['phone'] ) : "";
$userSubject = isset( $_POST['subject'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['subject'] ) : "";
$message = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

// If all values exist, send the email
if ( $userName && $senderEmail && $senderPhone && $userSubject && $message) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $headers = "From: contact@mycitibidadi.com\r\nReply-To: " . $senderEmail;
  $subject = "New Contact Form: " . $userSubject;
  $msgBody = "Name: ". $userName . "\nEmail: ". $senderEmail . "\nPhone: ". $senderPhone . "\nSubject: ". $userSubject . "\n\nMessage:\n" . $message;
  $success = mail( $recipient, $subject, $msgBody, $headers );

  //Set Location After Successsfull Submission
  if($success) {
    header('Location: index.html?message=Successfull');
  } else {
    header('Location: index.html?message=Failed&error=smtp');
  }
}
else{
	//Set Location After Unsuccesssfull Submission
  	header('Location: index.html?message=Failed&error=missing_fields');	
}

?>