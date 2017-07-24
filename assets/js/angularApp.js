(function(){
	var app = angular.module('calc', []);

	app.controller('quadrController', function($scope){

		$scope.reCalc = function(){
			var a = $scope.a || 1,
				b = $scope.b || 1,
				c = $scope.c || 0,
				d;

			d = Math.pow(b, 2) - 4*a*c;
			$scope.d = d;

			if (d < 0) {
				$scope.answer = 'Уравнение не имеет корней!';

				return false;
			} else if (d === 0) {
				$scope.answer = 'Уравнение имеет 1 корень!';
				$scope.x1 = -b/(2*a);
				$scope.x2 = 'x1 = '+(-b/(2*a));
				
				return true;
			} else {
				$scope.answer = 'Уравнение имеет 2 корня!';
				$scope.x1 = (-b - Math.sqrt($scope.d))/(2*a);
				$scope.x2 = (-b + Math.sqrt($scope.d))/(2*a);

				return true;
			}		
		};
	})
})();