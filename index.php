<!DOCTYPE html>
<html lang="en" ng-app="calc">
<head>
	<meta charset="UTF-8">
	<title>Calc me!</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<link rel="stylesheet" type="text/css" href="assets/fonts/open-sans/stylesheet.css">
	<script type="text/javascript" src="assets/js/angular.min.js"></script>
	<script type="text/javascript" src="assets/js/angularApp.js"></script>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</head>
<body>	
	<?php require('/assets/php/log.php') ?>
	<div class="wrapper clearfix">
		<header>
			<h2>Решение квадратных уравнений</h2>
		</header>
		<div class="container clearfix">
			<div class="container-quadr" ng-controller="quadrController">
				<div class="container-left">
					<div class="clearfix">
						<div class="container-equation">
					        <div class="container-header">
					        	<h4>Введите коэффициенты:</h4>
					        </div>
					        <form class="form-quadr">
					        	<input type="text" ng-keyup="reCalc()" ng-model="a">
					        	<span>x<sup>2</sup></span>
					        	+
					        	<input type="text" ng-keyup="reCalc()" ng-model="b">
					        	<span>x</span>
					        	+
					        	<input type="text" ng-keyup="reCalc()" ng-model="c">
					        	= 0
					        </form>					
						</div>
						<div class="container-equation right">
					        <div class="form-quadr">
					        	<h4>Выберите интервал по оси Х</h4>
					        	<span>Интервал [ </span>
					        	<input type="text" ng-model="pos_begin" class="pos_begin">
					        	<span>, </span>
					        	<input type="text" ng-model="pos_end" class="pos_end">
					        	<span> ]</span> 
					        </div>					
						</div>					
					</div>
			        <div class="result" ng-show="a || b || c">
			        	<h4>Результат:</h4>
						<div class="result-name">{{ answer }}</div>
						<div class="result-d">
							Дискриминант D = 
							<span>{{ d }}</span>
						</div>
						<div class="result-answer" ng-show="reCalc()">
							<div class="result-root">
								x<sub>1</sub> = 
								<span>{{ x1 }}</span>
							</div>
							<div class="result-root">
								x<sub>2</sub> = 
								<span>{{ x2 }}</span>
							</div>
						</div>
			        </div>
			        <div class="points-wrapper clearfix">
			        	 <div class="choose-color" ng-show="colorShow">
				        	<span class="color-span" ng-repeat="color in colors" style="background: {{ color }};" data-color="{{ color }}" ng-click="chooseColor($event)"></span>
				        </div>	
				        <div class="show-points">		
				        	<a href="" class="href-points" ng-click="graph()">Построить график</a> 
				        	<span class="change-color" ng-click="colorShow=true">Выбрать цвет</span>	
				        	<a href="" class="href-graph" ng-click="drawTable()">Построить параболу по точкам</a>		        	
				        	<a href="#" class="add-graph" ng-click="addGraph()">Добавить график</a>
				        	<a href="#" class="add-graph" ng-click="deleteGraph()">Очистить график и форму</a>
				        </div>				   	        	
			        </div>
			        <div class="points-table" ng-show="showTable">
			        	<h5>Построение параболы по точкам</h5>
			        	<table class="points">
				        	<tbody>
				        		<tr ng-repeat="elem in arr track by $index">
				        			<td ng-repeat="item in elem track by $index">{{ item }}</td>
				        		</tr>
				        	</tbody>	
			        	</table>
			        </div>
				</div>
				<div class="container-right">	
					<div id="curve_chart" class="js-graph" style="width: 550px; height: 550px" ng-show="showGraph"></div>			
				</div>
				<button ng-click="showLog()">Показать логи</button>
			</div>   
		</div>
		<footer class="footer">Тестовое задание 2017</footer>		
	</div>
</body>
</html>