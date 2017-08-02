<?php
require('/connection.php');

function getRealIpAddr() {
  if (!empty($_SERVER['HTTP_CLIENT_IP'])) { 
  	$ip = $_SERVER['HTTP_CLIENT_IP']; 
  } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
  	$ip = $_SERVER['HTTP_X_FORWARDED_FOR']; 
  } else { 
  	$ip = $_SERVER['REMOTE_ADDR']; 
  }

  return $ip;
}

if (strstr($_SERVER['HTTP_USER_AGENT'], 'YandexBot')) {
	$bot = 'YandexBot';
} elseif (strstr($_SERVER['HTTP_USER_AGENT'], 'Googlebot')) {
	$bot = 'Googlebot';
} else { 
	$bot = $_SERVER['HTTP_USER_AGENT']; 
}

$ip = getRealIpAddr();

$date = date("H:i:s d.m.Y");

$query ="INSERT INTO logs (ip, bot, date) VALUES($ip, $bot, $date)";   
$connection->$query;

mysqli_close($connection);
?>