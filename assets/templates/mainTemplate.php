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
	        	<a href="#!/logs" class="logs-button">Показать логи</a>	
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
</div> 