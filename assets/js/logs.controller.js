app.controller('logsController', function($scope, List) {
	var logsCont = this,
		sort = 'up';

	logsCont.showInput = false;
	logsCont.arrow = '&#8593;';

	/* При загрузке страницы отображаются логи */
	List.get().then(function(data){
		logsCont.logs = data;
	});
	/* При загрузке страницы отображаются логи */

	/* Получаем данные по возрастанию/убыванию */
	logsCont.sort = function() {
		switch(sort) {
			case 'up':
				sort = 'down';				
				logsCont.arrow = '&#8595;';
				break;
			case 'down':
				sort = 'up';				
				logsCont.arrow = '&#8593;';
				break;
		}
		
		var data = [];

		data.push(sort);

		List.post(data).then(function(list){
			logsCont.logs = list;
		});	

	}
	/* Получаем данные по возрастанию/убыванию */

	/* Подставляет значение в инпут */	
	logsCont.receiveVal = function(){
		if (logsCont.select2) {
			logsCont.showInput = true;

			if (logsCont.select2 == 'ip') {
				logsCont.input = '127.0.0.1';
				logsCont.val = '';
			} else if (logsCont.select2 == 'bot') {
				logsCont.input = 'Mozilla';
				logsCont.val = '';
			} else if (logsCont.select2 == 'date') {
				logsCont.input = '2017-08-08';
				logsCont.val = '';
			}
		} 	
	};
	/* Подставляет значение в инпут */

	/* Показывает кнопку - получить данные */
	logsCont.showButton = function() {
		if (logsCont.val){
			logsCont.showBtn = true;
		}
	}
	/* Показывает кнопку - получить данные */

	/* Передает данные на сервер из инпута */
	logsCont.receiveData = function(){
		var data = [];

		data.push(logsCont.select2);
		data.push(logsCont.val);

		List.post(data).then(function(list){
			logsCont.logs = list;
		});
	}
	/* Передает данные на сервер из инпута */

	/* Передает данные на сервер при нажатии Enter */
	logsCont.onEnter = function(e){				
		if (logsCont.select2 
			&& logsCont.val
			&& e.key == 'Enter') {
			logsCont.receiveData();
		}
		
	}
	/* Передает данные на сервер при нажатии Enter */
});