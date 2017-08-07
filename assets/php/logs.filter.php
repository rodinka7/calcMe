<?php
require('connection.php');

$user = json_decode(file_get_contents('php://input'), true);

	if (!empty($_POST)) {
		$param = $_POST;
		var_dump($_POST);
		switch ($param) {
			case 'up':
				$stmt = $pdo->query('SELECT * FROM logs ORDER BY date');

				while ($row = $stmt->fetch())
				{
				    $logs[] = $row;
				}

				print_r($logs);
		} 
	}
?>