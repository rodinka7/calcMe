<!DOCTYPE html>
<html lang="en" ng-app="calc">
<head>
	<meta charset="UTF-8">
	<title>Calc me!</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<link rel="stylesheet" type="text/css" href="assets/fonts/open-sans/stylesheet.css">
	<script type="text/javascript" src="assets/js/angular.min.js"></script>
	<script type="text/javascript" src="assets/js/angular-ui-router.js"></script>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.js"></script>
	<script type="text/javascript" src="assets/js/calc.module.js"></script>
	<script type="text/javascript" src="assets/js/calc.config.js"></script>	
	<script type="text/javascript" src="assets/js/calc.factory.js"></script>
	<script type="text/javascript" src="assets/js/quadr.controller.js"></script>
	<script type="text/javascript" src="assets/js/logs.controller.js"></script>
</head>
<body>	
	<?php require('assets/php/log.php') ?>
	<div class="wrapper clearfix">
		<header>
			<h2>Решение квадратных уравнений</h2>
		</header>
		<div class="container clearfix">
			<div ui-view></div>   
		</div>
		<footer class="footer">Тестовое задание 2017</footer>		
	</div>
</body>
</html>