<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('en', 'phpmailer/language/');
	$mail->IsHTML(true);

	
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'w01ffb7c.kasserver.com';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'supplier@totem-superfood.com';                     //SMTP username
	$mail->Password   = 'Defender-1035';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465;                 
	

	//Від кого лист
	$mail->setFrom('supplier@totem-superfood.com', 'Totem'); // Вказати потрібний E-mail
	//Кому відправити
	$mail->addAddress('info@totem-superfood.com'); // Вказати потрібний E-mail
	//Тема листа
	$mail->Subject = 'New dealer request!"';

	//Тіло листа
	$body = '<h1>New request:</h1>';
	$body .= '<p><strong>Address as:</strong> ' . ($_POST['anrede'] ?? '') . '</p>';
	$body .= '<p><strong>First name:</strong> ' . ($_POST['firstName'] ?? '') . '</p>';
	$body .= '<p><strong>Last name:</strong> ' . ($_POST['lastName'] ?? '') . '</p>';
	
	$body .= '<p><strong>E-Mail:</strong> ' . ($_POST['email'] ?? '') . '</p>';
	$body .= '<p><strong>Weitere Informationen:</strong><br>' . nl2br($_POST['addInfo'] ?? '') . '</p>';
	$body .= '<p><strong>Datenschutz-Einwilligung:</strong> ' . (isset($_POST['agreement']) ? 'Ja' : 'Nein') . '</p>';

	$mail->Body = $body;

	//if(trim(!empty($_POST['email']))){
		//$body.=$_POST['email'];
	//}	
	
	/*
	//Прикріпити файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//шлях завантаження файлу
		$filePath = __DIR__ . "/files/sendmail/attachments/" . $_FILES['image']['name']; 
		//грузимо файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото у додатку</strong>';
			$mail->addAttachment($fileAttach);
		}
	}
	*/

	$mail->Body = $body;

	//Відправляємо
	// if (!$mail->send()) {
	// 	$message = 'Error';
	// } else {
	// 	$message = 'Data sent!';
	// }


	// Send email
	try {
		if ($mail->send()) {
			$response = ['message' => 'Your request was sent!'];
		} else {
			$response = ['message' => 'Error during sending your request.'];
		}
	} catch (Exception $e) {
		$response = ['message' => 'Mailer Error: ' . $mail->ErrorInfo];
	}


	$response = ['message' => $message ?? 'Your request was sent!'];

	header('Content-type: application/json');
	echo json_encode($response);
?>