<div class="container-quadr" ng-controller="quadrController as quadr">
	<div class="container-left">
		<div class="clearfix">
			<div class="container-equation">
		        <div class="container-header">
		        	<h4>Введите коэффициенты:</h4>
		        </div>
		        <form class="form-quadr" name="form">	      
		        	<input type="text" ng-change="quadr.reCalc()" ng-model="quadr.a" required>
		        	<span>x<sup>2</sup></span>
		        	+
		        	<input type="text" ng-change="quadr.reCalc()" ng-model="quadr.b" required>
		        	<span>x</span>
		        	+
		        	<input type="text" ng-change="quadr.reCalc()" ng-model="quadr.c" required>
		        	= 0
		        </form>		      
		        <div class="severalGraph">
		        	<input type="checkbox" class="input" id="changeOninput" ng-model="quadr.changeOninput">
		        	<label class="input-label" for="changeOninput">Строить график при любом изменении в инпуте</label> 
		        	<input type="checkbox" class="input" id="severalGraph" ng-model="quadr.severalGraph">
		        	<label class="input-label" for="severalGraph">Строить несколько графиков</label>   
		        </div>	
		        <a href="" class="graph-btn" ng-show="!quadr.changeOninput" ng-click="quadr.drawGraph()">Построить график</a>	        			
			</div>							
		</div>
		<div class="error">
			<div class="error-mes" ng-show="quadr.error1">
				Коэффициенты должны содержать цифры, знак "минус" и знак "."!
			</div>	
			<div class="error-mes" ng-show="quadr.error2">
				Введите коэффициенты уравнения!
			</div>			
	    </div>
        <div class="result" ng-show="quadr.result">
        	<h4>Результат:</h4>
        	<div class="result-num">
        		a = 
        		<span> {{ quadr.a || 1 }},</span> 
				b = 
				<span> {{ quadr.b || 1 }}, </span>
				c = 
				<span> {{ quadr.c || 0 }} </span>
        	</div>
			<div class="result-name">{{ quadr.answer }}</div>
			<div class="result-d" ng-show="quadr.descriminant">
				Дискриминант D = 
				<span>{{ quadr.d }}</span>
			</div>
			<div class="result-answer"  ng-show="quadr.showx1">
				<div class="result-root">
					x&#8321; = 
					<span>{{ quadr.x1 }}</span>
				</div>
				<div class="result-root" ng-show="quadr.showx2">
					x&#8322; = 
					<span>{{ quadr.x2 }}</span>
				</div>
			</div>
        </div>
        <div class="main-menu clearfix">
        	 <div class="choose-color" ng-show="quadr.colorShow">
	        	<span class="color-span" ng-repeat="color in quadr.colors" style="background: {{ color }};" data-color="{{ color }}" ng-click="quadr.chooseColor($event)"></span>
	        </div>	
	        <div class="menu">	
	        	<a href="" class="menu-href" style="color: {{ quadr.changeColor }};" ng-click="quadr.colorShow=true">Выбрать цвет графика</a> 
	        	<a href="" class="menu-href" ng-click="quadr.deleteGraph()">Очистить график и форму</a>	        	
	        	<a href="#!/logs" class="logs-button">Показать логи</a>	
	        </div>		      		   	        	
        </div>        
	</div>
	<div class="container-right">		
		<div id="curve_chart" class="js-graph" style="width: 100%; min-height: 80vh;" ng-show="quadr.showGraph" ng-click="quadr.deleteItem($event)"></div>			
	</div>
	<div class="delete-item" style="left: {{ quadr.positionX  }}; top: {{ quadr.positionY }}" ng-show="quadr.showDeleteCont">
		<div> Удалить график?</div>
		<div class="delete-div">
			<a href="" class="logs-button del" ng-click="quadr.deletion()">Да</a>
			<a href="" class="logs-button del" ng-click="quadr.showDeleteCont=false">Нет</a>
		</div>
	</div>			
</div>