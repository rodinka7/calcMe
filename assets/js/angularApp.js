(function(){
	var app = angular.module('calc', []);

	app.controller('quadrController', function($scope){
		$scope.pos_begin = -10;
		$scope.pos_end = 10;

		$scope.colors = ['#1A3DC1', '#BF6DE8', '#434348', '#008800', '#BB0000', '#DC5656', '#FF7711', '#FCD202'];
		$scope.arr = [];
		$scope.color = [];
		
		var numberGraph = 0,
			pos_begin = document.querySelector('.pos_begin'),
			pos_end = document.querySelector('.pos_end'),
			form = document.querySelector('.form-quadr');

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
			if (!numberGraph) {
				$scope.arr = [];

				if (countPoints()) {
					drawGraph();
				}

			} else {
				var num = $scope.arr[0].length - 2;
				
				if (num === numberGraph) {
					drawGraph();				
				} else {
					if (countPoints()) {
						drawGraph();
					}
				}
			}		
		}

		function drawGraph() {
			google.charts.load('current', {'packages':['line']});
		    google.charts.setOnLoadCallback(drawChart);

		    function drawChart() {
	    		var data = google.visualization.arrayToDataTable($scope.arr);

		        var options = {
		          curveType: 'function',
		          legend: { position: 'bottom' },
		          colors: $scope.color
		        };

		        var chart = new google.charts.Line(document.getElementById('curve_chart'));

		        chart.draw(data, options);
		    }
		    $scope.showGraph = true;
		}

		$scope.drawTable = function(){
			if (!$scope.arr.length) {
				if (countPoints()) {
					$scope.showTable = true;
				}
			} else {
				var num = $scope.arr[0].length - 2;
				if (num === numberGraph) {
					$scope.showTable = true;				
				} else {
					if (countPoints()) {
						$scope.showTable = true;
					}	
				}
			}
		}

		function countPoints(){
			if (!validate()){
				return;
			} else {
				var pos_begin = $scope.pos_begin || -10,
					pos_end = $scope.pos_end || 10, 
					arr = [], 
					y = 0;

				if (!numberGraph || !$scope.arr.length) {
					arr.push(['X', $scope.a + 'x^2 + ' + $scope.b +'x + ' + $scope.c]);

					for (var x = pos_begin; x <= pos_end; x++ ){
						y = $scope.a*x*x + $scope.b*x + Number($scope.c);
						
						arr.push([x,y]);				
					}

					$scope.arr = arr;

					return true;					
				} else {
					var str = $scope.a + 'x^2 + ' + $scope.b +'x + ' + $scope.c,
						x = pos_begin;
					
					$scope.arr[0].push(str);

					for (let i = 1; i < $scope.arr.length; i++) {
						$scope.arr[i].push($scope.a*x*x + $scope.b*x + Number($scope.c));
						x++;
					}
					return true;
				}
			}

		}

		function validate() {
			var reg = /^\-?\d+$/,
				div = document.createElement('div'),
				container = document.querySelector('.container-left'),
				contBefore = document.querySelector('.result');

			div.className = 'js-error';

			if ($scope.a == undefined || $scope.b == undefined 
				|| $scope.c == undefined || $scope.pos_begin == undefined 
				|| $scope.pos_end == undefined) {

				isValid('Все поля должны быть заполнены!', container, div, contBefore);
				return false;
			} else { 
				if (!reg.test($scope.a) || !reg.test($scope.b) 
					|| !reg.test($scope.c) || !reg.test($scope.pos_begin)
					|| !reg.test($scope.pos_end)){

					isValid('Поля должны содержать только целые числа и знак "минус"!', container, div, contBefore);
					return false;
				} else {
					if (!$scope.color.length) {
						isValid('Пожалуйста, выберите цвет!', container, div, contBefore);
						return false;
					} else {
						return true;
					}
				}
			}
		}
		
		function isValid(str, container, div, contBefore) {
			var arr = [].slice.call(container.children),
				res = arr.filter(function(item) {
					if (item.classList.contains('js-error')) {
						return true;
					}
				});

			if (res.length) {
				return false;
			} else {
				div.innerHTML = str;
				container.insertBefore(div, contBefore);
					
				setTimeout(function(){
					div.remove();
				}, 2000);

				return false;
			}			
		}

		$scope.chooseColor = function($event){
			if (!numberGraph) {
				$scope.color = [];				
			}
			
			var target = $event.target,
				color = target.dataset.color,
				elem = document.querySelector('.change-color');

			elem.style.color = color;

			$scope.color.push(color);
			$scope.colorShow = false;
		}

		$scope.addGraph = function(){
			form.reset();
			pos_begin.setAttribute('disabled', 'disabled');
			pos_end.setAttribute('disabled', 'disabled');

			$scope.a = '';
			$scope.b = '';
			$scope.c = '';
			
			numberGraph++;
		}

		$scope.deleteGraph = function (){
			form.reset();
			pos_begin.removeAttribute('disabled');
			pos_end.removeAttribute('disabled');

			$scope.a = '';
			$scope.b = '';
			$scope.c = '';

			$scope.showGraph = false;
			$scope.showTable = false;
			$scope.arr = [];
			$scope.color = [];
		}

		$scope.showLog = function() {
			console.log(User-Agent);
		}		
	})
})();