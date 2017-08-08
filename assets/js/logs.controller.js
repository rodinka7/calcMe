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

			if (logsCont.select2 == 'ip') {
				logsCont.input = '127.0.0.1'
			} else if (logsCont.select2 == 'bot') {
				logsCont.input = 'Mozilla'
			} else if (logsCont.select2 == 'date') {
				logsCont.input = '2017-08-08'
			}
		} 

		$http.post('./assets/php/logs.filter.php', data)
			.then(function(response) {				
				logsCont.logs = response.data;
			});
		
	};

	logsCont.showButton = function() {
		if (logsCont.val){
			logsCont.showBtn = true;
		} else {
			logsCont.input = 'Введите поисковый запрос!';
		}
	}

	logsCont.receiveData = function(){

		console.log(logsCont.val);
	}

});