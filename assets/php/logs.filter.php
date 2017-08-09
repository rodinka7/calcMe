<?php
require('connection.php');
$request = json_decode(file_get_contents('php://input'), true);

if (!empty($request)) {
	
	switch ($request[0]) {
		case 'up':
			$str = 'SELECT * FROM logs ORDER BY date';
			formResponse($str, $pdo);			
			
			break;
		case 'down':
			$str = 'SELECT * FROM logs ORDER BY date DESC';
			formResponse($str, $pdo);	
			
			break;
		case 'ip':
			$search = $request[1];
			$query = "SELECT * FROM logs WHERE ip LIKE %$search%";
			$stmt = $pdo->prepare($query);
			$stmt->execute();

			while ($row = $stmt->fetch()){
			    $logs[] = $row;
			}

			print_r(json_encode($logs));
			break;
	}
}
/* Вспомогательная функция - делает выборку из базы данных */
function formResponse($str, $pdo){
	$stmt = $pdo->query($str);

	while ($row = $stmt->fetch()){
	    $logs[] = $row;
	}
	print_r(json_encode($logs));
}
/* Вспомогательная функция - делает выборку из базы данных */
?>