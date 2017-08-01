(function(){
	var app = angular.module('calc', []);

	app.controller('quadrController', function($scope){
		$scope.pos_begin = -10;
		$scope.pos_end = 10;

		$scope.colors = ['#1A3DC1', '#BF6DE8', '#434348', '#008800', '#BB0000', '#DC5656', '#FF7711', '#FCD202'];
		$scope.color = [];

		$scope.reCalc = function(){
			if (isValidNumber()) {
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
			} else {
				return false;
			}
		};

		$scope.graph = function(){
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawChart);

		    function drawChart() {
	    		var data = google.visualization.arrayToDataTable($scope.arr);

		        var options = {
		          title: 'График параболы',
		          curveType: 'function',
		          legend: { position: 'bottom' },
		          colors: $scope.color
		        };

		        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		        chart.draw(data, options);
		        $scope.showGraph = true;
		    }
		}

		function countPoints(){
			if (!validate()){
				return false;
			} else {
				var pos_begin = $scope.pos_begin || -10,
					pos_end = $scope.pos_end || 10, 
					arr = [], 
					y = 0;

				if (!$scope.arr) {
					arr.push(['X', $scope.a + 'x^2 + ' + $scope.b +'x + ' + $scope.c]);

					for (var x = pos_begin; x <= pos_end; x++ ){
						y = $scope.a*x*x + $scope.b*x + Number($scope.c);
						
						arr.push([x,y]);
					}

					$scope.arr = arr;
				} else {
					$scope.arr[0].push($scope.a + 'x^2 + ' + $scope.b +'x + ' + $scope.c);

					for (let i = 1; i < $scope.arr.length; i++) {
						var x = pos_begin;
						$scope.arr[i].push($scope.a*x*x + $scope.b*x + Number($scope.c));
						x++;
					}
				}
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
					if ($scope.color == []) {
						div.innerHTML = 'Пожалуйста, выберите цвет!';
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
		}
		
		function isValidNumber() {
			var reg = /[-]*\d+[.]*\d*/,
				div = document.createElement('div'),
				container = document.querySelector('.container-left'),
				contBefore = document.querySelector('.result');

			div.className = 'js-error';

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
		$scope.chooseColor = function($event){
			var target = $event.target,
				color = target.dataset.color;

			$scope.color.push(color);
			$scope.colorShow = false;
		}

		$scope.addGraph = function(){
			document.querySelector('.form-quadr').reset();
			$scope.a = '';
			$scope.b = '';
			$scope.c = '';
		}
	})
})();