app.controller('logsController', function($scope, List) {
	var logsCont = this;

	logsCont.showInput = false;

	/* При загрузке страницы отображаются логи */
	List.get().then(function(data){
		logsCont.logs = data;
	});
	/* При загрузке страницы отображаются логи */

	/* Передеает данные на сервер при изменении в селекте */	
	logsCont.receiveVal = function(){
		var data = [];

		if (logsCont.select1) {
			data.push(logsCont.select1);

			List.post(data).then(function(list){
				logsCont.logs = list;
			});				
		}

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
	/* Передеает данные на сервер при изменении в селекте */

	/* Показывает кнопку - получить данные */
	logsCont.showButton = function() {
		if (logsCont.val){
			logsCont.showBtn = true;
		} else {
			logsCont.input = 'Введите поисковый запрос!';
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
	function onEnter(){
		document.body.addEventListener('keyup', function(e){
			if (logsCont.select2 
				&& logsCont.val
				&& e.keyCode == 13) {
				logsCont.receiveData();
			}
		})
	}

	onEnter();
	/* Передает данные на сервер при нажатии Enter */
});