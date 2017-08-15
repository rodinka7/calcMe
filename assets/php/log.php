<?php
require('connection.php');

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
	$bot = 'GoogleBot';
} else { 
	$bot = $_SERVER['HTTP_USER_AGENT']; 
}

$ip = getRealIpAddr();

$date = date("Y-m-d H:i:s");

$query = $pdo->prepare("INSERT INTO logs (ip, bot, date) VALUES(?, ?, ?);");
$query->execute([$ip, $bot, $date]);

$stmt = $pdo->query('SELECT * FROM logs');

while ($row = $stmt->fetch())
{
    $logs[] = $row;
}

$str = json_encode($logs); 
file_put_contents('logs.json', $str);
?>