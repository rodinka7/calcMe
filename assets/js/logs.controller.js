app.controller('logsController', function($scope, $http) {
	var logsCont = this;

	logsCont.showInput = false;

	$http.get("./logs.json")
	    .then(function(response) {
    		logsCont.logs = response.data;
		});

	logsCont.receiveVal = function(){
		var data = [];

		if (logsCont.select1) {
			data.push(logsCont.select1);			
		} else if (logsCont.select2) {
			logsCont.showInput = true;
		} 

		$http.post('./assets/php/logs.filter.php', data)
			.then(function(response) {
				console.log(response);
			});
		
	}


});