app.controller('logsController', function($scope, $http) {
	var logsCont = this;

	$http.get("./logs.json")
	    .then(function(response) {
    		logsCont.logs = response.data;
		});
});