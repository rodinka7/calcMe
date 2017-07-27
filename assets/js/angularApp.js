(function(){
	var app = angular.module('calc', []);

	app.controller('quadrController', function($scope){
		
		$scope.pos_begin = -10;
		$scope.pos_end = 10;

		$scope.colors = ['#1A3DC1', '#BF6DE8', '#434348', '#008800', '#BB0000', '#DC5656', '#FF7711', '#FCD202'];
		
		$scope.reCalc = function(){
			var a = $scope.a || 1,
				b = $scope.b || 1,
				c = $scope.c || 0,
				d,
				x1, x2;

			d = Math.pow(b, 2) - 4*a*c;
			$scope.d = d;

			if (isNaN(d)) {
				$scope.answer = 'Вы ввели некорректные коэффициенты!';

				return false;
			} else if (d < 0) {
				$scope.answer = 'Уравнение не имеет корней!';

				return false;
			} else if (d === 0) {
				$scope.answer = 'Уравнение имеет 1 корень!';
				x1 = -b/(2*a);
				$scope.x1 = x1;
				$scope.x2 = 'x1 = ' + x1;
				
				return true;
			} else {
				$scope.answer = 'Уравнение имеет 2 корня!';
				x1 = (-b - Math.sqrt($scope.d))/(2*a);
				x2 = (-b + Math.sqrt($scope.d))/(2*a);
				$scope.x1 = x1;
				$scope.x2 = x2;

				return true;
			}				
		};

		$scope.graph = function(){
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawChart);
		    
		    countPoints();

		    function drawChart() {
		        var data = google.visualization.arrayToDataTable($scope.arr);

		        var options = {
		          title: 'График параболы',
		          curveType: 'function',
		          legend: { position: 'bottom' },
		          colors: ['red']
		        };

		        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		        chart.draw(data, options);
		    }
		}

		$scope.showPoints = function(){
			countPoints();
		}

		function countPoints(){
			if (!validate()){
				return false;
			} else {
				var pos_begin = $scope.pos_begin || -10,
					pos_end = $scope.pos_end || 10, 
					arr = [],
					y = 0;

				arr.push(['X', $scope.a + 'x^2 + ' + $scope.b +'x + ' + $scope.c]);

				for (var x = pos_begin; x <= pos_end; x++ ){
					y = $scope.a*x*x + $scope.b*x + Number($scope.c);
					
					arr.push([x,y]);
				}
				
				$scope.arr = arr;
			}

		}

		function validate() {
			var reg = /[-]*\d+[.]*\d*/,
				div = document.createElement('div'),
				container = document.querySelector('.container-left'),
				contBefore = document.querySelector('.result');

			div.className = 'js-error';

			if ($scope.a == undefined || $scope.b == undefined 
				|| $scope.c == undefined || $scope.pos_begin == undefined 
				|| $scope.pos_end == undefined) {

				div.innerHTML = 'Все поля должны быть заполнены!';
				container.insertBefore(div, contBefore);
				
				setTimeout(function(){
					div.remove();
				}, 2000);
				return false;
			} else {
				if (!reg.test($scope.a) || !reg.test($scope.b) 
					|| !reg.test($scope.c) || !reg.test($scope.pos_begin)
					|| !reg.test($scope.pos_end)){

					div.innerHTML = 'Поля должны содержать только цифры, точку и знак "минус"!';
					container.insertBefore(div, contBefore);
					
					setTimeout(function(){
						div.remove();
					}, 3000);
					
					return false;
				} else {
					return true;
				}
			}
		}

		$scope.btnColorClick = function($event){
			
				$event.preventDefault();
				pallet.classList.toggle('active');
		}
				
		$scope.chooseColor = function($event){
			pallet.addEventListener('click',function(e){
				var target = e.target,
					color;

				if (target.classList.contains('color-span')){
					$scope.color = target.dataset.color;
				}
			});
		}
	})
})();