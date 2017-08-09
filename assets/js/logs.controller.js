app.controller('logsController', function($scope, List) {
	var logsCont = this;

	logsCont.showInput = false;

	List.get().then(function(data){
		logsCont.logs = data;
	});
	
	logsCont.receiveVal = function(){
		var data = [];

		if (logsCont.select1) {
			data.push(logsCont.select1);

			List.post(data).then(function(list){
				logsCont.logs = list;
			});				
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
	};

	logsCont.showButton = function() {
		if (logsCont.val){
			logsCont.showBtn = true;
		} else {
			logsCont.input = 'Введите поисковый запрос!';
		}
	}

	logsCont.receiveData = function(){
		var data = [];

		data.push(logsCont.select2);
		data.push(logsCont.val);

		List.post(data).then(function(list){
			logsCont.logs = list;
		});
	}

});