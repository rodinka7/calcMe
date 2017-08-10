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
			receiveData($request[1], 'ip', $pdo);
						
			break;
		case 'bot':
			receiveData($request[1], 'bot', $pdo);
						
			break;
		case 'date':
			receiveData($request[1], 'date', $pdo);
						
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

/* Вспомогательная функция - делает поиск по ключевому слову и выборку из базы данных */
function receiveData($str, $column, $pdo) {			
	$search = '%'.$str.'%';
	
	$stmt  = $pdo->prepare("SELECT * FROM logs WHERE $column LIKE ?");
	$stmt->execute(array($search));
	$data = $stmt->fetchAll();

	print_r(json_encode($data));
}
/* Вспомогательная функция - делает поиск по ключевому слову и выборку из базы данных */
?>