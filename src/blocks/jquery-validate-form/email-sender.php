<?php
	if (isset($_POST['action']) && $_POST['action'] == 'am_send_email' && $_POST['fields']){
		$toReturn = array();
		$message = '';
		$fields = json_decode($_POST['fields']);
		if(is_array($fields)){
			foreach ($fields as $field){
				if (!empty($field[1])){
					$message .= $field[0].' '.(is_array($field[1])? implode($field[1], ', ') : $field[1]).'<br>';
				}
			}
		}
		if ($message){

			$to = 'plumbers.contact@callapro.com';

			$subject = 'Plumbers Today Customers Message';

			$headers = "From: Plumbers\r\nReply-To:\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=utf-8\r\n";

			if (mail($to, $subject, $message, $headers)) {
				$toReturn['response'] = 'ok';
			} else {
				$toReturn['response'] = 'error';
			}

		}else{
			$toReturn['response'] = 'error';
		}
		echo json_encode($toReturn);
		die();
	}
	else{
		die();
	}

	function getRealIp() {
			if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			//check ip from share internet
				$ip=$_SERVER['HTTP_CLIENT_IP'];
			} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			//to check ip is pass from proxy
				$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
			} else {
				 $ip=$_SERVER['REMOTE_ADDR'];
			}
			return $ip;
		}
?>