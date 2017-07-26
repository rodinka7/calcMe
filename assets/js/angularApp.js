(function(){
	var app = angular.module('calc', []);

	app.controller('quadrController', function($scope){

		$scope.reCalc = function(){
			var a = $scope.a || 1,
				b = $scope.b || 1,
				c = $scope.c || 0,
				d,
				x1, x2;

			d = Math.pow(b, 2) - 4*a*c;
			$scope.d = d;

			if (d < 0) {
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

		/*$scope.graph = function(){
			var container = document.querySelector('svg'),
				a = $scope.a || 1,
				b = $scope.b || 1,
				c = $scope.c || 0,
				d,
				x1,
				x2,
				x0,
				y0,
				line;

			d = Math.pow(b, 2) - 4*a*c;
			
			if (d < 0) {
				console.log('Уравнение не имеет корней!');
			} else if (d === 0) {
				x1 = Math.round(-b/(2*a));
				x2 = x1;
			} else {	
				x1 = Math.round((-b - Math.sqrt($scope.d))/(2*a));
				x2 = Math.round((-b + Math.sqrt($scope.d))/(2*a));
			}	

			/*Начало системы кординат (265,327)*/
			/*x0 = Math.round(-b/(2*a));
			y0 = Math.round(a*x0*x0 + b*x0 + c);

			line = document.createElementNS('http://www.w3.org/2000/svg', 'g');

			line.innerHTML = `<polyline points="${265+x1},327 ${265+x0},${327+y0} ${265+x2},327" stroke="#594C91" stroke-width="2"></polyline>`;
			container.appendChild(line);
			console.log(line);
		}*/

		$scope.graph = function(){
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawChart);
		    
		    function drawChart() {
		        var data = google.visualization.arrayToDataTable($scope.arr);

		        var options = {
		          title: 'График параболы',
		          curveType: 'function',
		          legend: { position: 'bottom' }
		        };

		        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		        chart.draw(data, options);
		    }
		}

		$scope.countPoints = function(){
			var arr = [],
				y = 0;

			arr.push(['X', $scope.a + 'x^2 + ' + $scope.b +'x + ' + $scope.c]);

			for (var x = -10; x <= 10; x++ ){
				y = $scope.a*x*x + $scope.b*x + Number($scope.c);
				
				arr.push([x,y]);
			}
			
			$scope.arr = arr;
		}
	})
})();