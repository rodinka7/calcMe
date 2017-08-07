app.controller('logsController', function($scope, $http) {
	var logsCont = this;

	$http.get("./logs.json")
	    .then(function(response) {
    		logsCont.logs = response.data;
		});

	logsCont.receiveVal = function(){
		var data = [];

		if (logsCont.select1 && logsCont.select2) {
			data.push(logsCont.select1);
			data.push(logsCont.select2);
		} else if 

		$http.post('./assets/php/logs.filter.php', data)
			.then(function(response) {

			});
		
	}


});