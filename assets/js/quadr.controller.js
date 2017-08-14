app.controller('quadrController', function(){
	var quadr = this;

	quadr.result = false;
	quadr.descriminant = false;
	quadr.x1 = false;
	quadr.x2 = false;
	
	quadr.colors = ['#1A3DC1', '#BF6DE8', '#434348', '#008800', '#BB0000', '#DC5656', '#FF7711', '#FCD202'];
	quadr.arr = [];
	quadr.color = [];			

	/* reCalc - считает значение дискриминанта и корней уравнения */
	quadr.reCalc = function(){		
		quadr.error1 = false;
		quadr.error2 = false;
		quadr.showGraph = false;
		
		if (validate()) {
			var a = quadr.a || 1,
				b = quadr.b || 1,
				c = quadr.c || 0,
				d,
				x1, x2;
							
			quadr.result = true;

			if ( a == 0 && b == 0 && c == 0) {
				quadr.answer = 'Верное равенство: 0 = 0!';	
				quadr.begin = - 5;
				quadr.end = 5;
				quadr.straph = 0.1;

				isTrue(false, false, false, true);				
			} else if ((a == 0) && (b == 0)) {
				quadr.answer = 'Неверное равенство: ' + c + ' = 0!';			
				
				isTrue(false, false, false, false);
			} else if (a == 0 && b != 0) {
				quadr.answer = 'Уравнение стало линейным с одним корнем!';
				x1 = - (c/b);
				quadr.x1 = x1;	

				quadr.begin = x1 - 5;
				quadr.end = x1 + 5;
				quadr.straph = 0.1;
				
				isTrue(true, false, false, true);				
			} else {
				d = Math.pow(b, 2) - 4*a*c;
				quadr.d = d;
				quadr.descriminant = true;

				if (isNaN(d)) {
					quadr.answer = 'Вы ввели некорректные коэффициенты!';
					isTrue(false, false, false, false);		
				} else if (d < 0) {
					quadr.answer = 'Уравнение не имеет вещественных корней!';

					var top = - b / (2*a);

					quadr.begin = top - 5;
					quadr.end = top + 5,
					quadr.straph = 0.1;

					isTrue(false, false, true, true);					
				} else if (d === 0) {
					quadr.answer = 'Уравнение имеет 1 корень!';
					x1 = -b/(2*a);
					quadr.x1 = x1;				
												
					quadr.x2 = 'x\u2081 = ' + x1;

					quadr.begin = x1 - 5,
					quadr.end = x1 + 5,
					quadr.straph = 0.1;

					isTrue(true, true, true, true);			
				} else {
					quadr.answer = 'Уравнение имеет 2 корня!';
					x1 = (-b - Math.sqrt(quadr.d))/(2*a);
					x2 = (-b + Math.sqrt(quadr.d))/(2*a);

					quadr.x1 = x1;
					quadr.x2 = x2;

					if (x1 > x2) {
						quadr.begin = x2 - 5;
						quadr.end = x1 + 5;
						quadr.straph = (x1 - x2)/100;				
					} else if (x1 < x2) {
						quadr.begin = x1 - 5;
						quadr.end = x2 + 5;
						quadr.straph = (x2 - x1)/100;						
					}
					isTrue(true, true, true, true);
				}			
			}
		} else {
			quadr.result = false;
			return;
		}		
	};
	/* reCalc - считает значение дискриминанта и корней уравнения */

	/* Вспомогательная функция для reCalc - присваивает переменным переданные значения */
	function isTrue(isX1, isX2, isDescriminanmt, isGraph) {
		quadr.showx1 = isX1;
		quadr.showx2 = isX2;
		quadr.descriminant = isDescriminanmt;

		if (quadr.changeOninput && isGraph){
			graph();
		}	
	}
	/* Вспомогательная фуункция - присваивает переменным переданные значения */

	/* Вспомогательная функция для CountPoints() - составляет строку */
	function lessZero(){
		if (quadr.b < 0 && quadr.c < 0) {
			var str = quadr.a + 'x\u00B2 ' + quadr.b +'x ' + quadr.c;
		} else if (quadr.b < 0) {
			var str = quadr.a + 'x\u00B2 ' + quadr.b +'x + ' + quadr.c;
		} else if (quadr.c < 0){
			var str = quadr.a + 'x\u00B2 + ' + quadr.b +'x ' + quadr.c;
		} else {
			var str = quadr.a + 'x\u00B2 + ' + quadr.b +'x + ' + quadr.c;
		}

		return str;
	}
	/* Вспомогательная функция для CountPoints() - составляет строку */

	/* Формируется основной массив */
	function countPoints(){		
		var string = lessZero(),
			arr = [], 
			y = 0;

		if ((!quadr.severalGraph && quadr.arr.length) 
			|| (quadr.severalGraph && !quadr.arr.length) 
			|| (!quadr.severalGraph)) {

			arr.push(['X', string]);

			for (var x = quadr.begin; x <= quadr.end; x += quadr.straph){
				y = quadr.a*x*x + quadr.b*x + Number(quadr.c);
				
				arr.push([x,y]);				
			}			
			quadr.arr = arr;
		} else {					
			quadr.arr[0].push(string);

			for (let i = 1; i < quadr.arr.length; i++) {
				let x = quadr.arr[i][0];

				quadr.arr[i].push(quadr.a*x*x + quadr.b*x + Number(quadr.c));
			}
		}		
	}
	/* Формируется основной массив */

	/* Валидация */
	function validate() {
		var reg = /^\-?\d+\.?\d*$/;

		if (!quadr.a || !quadr.b 
			|| !quadr.c) {

			quadr.error1 = true;
			return false;
		} else { 
			if (!reg.test(quadr.a) || !reg.test(quadr.b) 
				|| !reg.test(quadr.c)){

				quadr.error2 = true;
				return false;
			} else {
				return true;
			} 
		}
	}
	/* Валидация */	

	/* Выбирает цвет для прорисовки графика */
	quadr.chooseColor = function($event){		
		var target = $event.target,
			color = target.dataset.color;

		if (quadr.severalGraph) {
			quadr.color.push(color);
		} else {
			quadr.color = [];
			quadr.color.push(color);
		}
		
		quadr.changeColor = color;
		quadr.colorShow = false;		
	}
	/* Выбирает цвет для прорисовки графика */

	/* Удаляет все графики */
	quadr.deleteGraph = function (){			
		quadr.result = false;
		quadr.severalGraph = false;
		quadr.changeColor = '#81A34A';

		quadr.a = '';
		quadr.b = '';
		quadr.c = '';

		quadr.showGraph = false;		
		quadr.arr = [];
		quadr.color = [];
	}
	/* Удаляет график */

	/* Вызывает функцию отрисовки графика - при отрисовке при нажатии на кнопку */
	quadr.drawGraph = function(){  
		var str1 = 'Неверное',
			str2 = 'Вы';

		if (validate() 
			&& (quadr.answer.indexOf(str1) < 0) 
			&& (quadr.answer.indexOf(str2) < 0)){
    		graph();
		}  else {
			return;
		}	
    }
    /* Вызывает функцию отрисовки графика - при отрисовке при нажатии на кнопку */

    /* Вспомогательная функция для drawGraph() - вызывает подготовку массива и отрисовку графика */
	function graph() {
		
		if (!quadr.color.length) {
			quadr.color[0] = 'blue';
		} else if (quadr.severalGraph && quadr.arr.length) {
				
			var lastColor = quadr.color[quadr.color.length-1],
				arrLength = quadr.arr[0].length - 1;

			while (quadr.color.length <= arrLength) {	
				quadr.color.push(lastColor);
			}			
		}

		countPoints();
		quadr.showGraph = true;
		
		prepareGraph();		
	}
	/* Вспомогательная функция для drawGraph() - вызывает подготовку массива и отрисовку графика */

	/* Отрисовка графика */
	function prepareGraph (){
    	google.charts.load('current', {'packages':['corechart', 'line']});
		google.charts.setOnLoadCallback(drawChart);

	    function drawChart() {
	    	var data = google.visualization.arrayToDataTable(quadr.arr);

	        var options = {
	          curveType: 'function',
	          legend: { position: 'right' },
	          colors: quadr.color,	       
	          hAxis: { 
	          	title: 'X',
	          	format: '#.##',
	          	gridlines: { 
	          		count: 15,
	          		color: '#bfbdbd'
	          	 },
	          	baselineColor: 'red'
	          },
	          vAxis: {
	          	title: 'Y',
	          	format: '#.##',
	          	gridlines: { 
	          		count: 15,
	          		color: '#bfbdbd'
	          	 },
	          	baselineColor: 'red'
	          },
	          crosshair: { 
	          	trigger: 'focus',
	          	focused: { 
	          		color: '#3bc', 
	          		opacity: 0.5 
	          	}           	  
	          },
	          pointSize: 2	                       
	        };

	        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
	        chart.draw(data, options);
	    }
    }
    /* Отрисовка графика */

    /* Удаление пробелов из строки */
    String.prototype.trimAll = function() {
		var r=/\s+/g;
		
		return this.replace(r,'');
	}
	/* Удаление пробелов из строки */

    /* Удаление графика одной функции */
	quadr.deleteItem = function(e){
    	if (e.target.tagName === 'text') {	        		
    		if (e.target.textContent.indexOf('x\u00B2') >= 0) {
    			var target = e.target;

    			if (target.nextElementSibling) {
    				var nextTarget = target.nextElementSibling;

    				if (nextTarget.tagName === 'text') {
	    				var str = target.textContent + nextTarget.textContent;
	    			}
    			} else {
    				var	str = target.textContent;    				
    			}
    			
    			quadr.positionX = e.pageX - 100 + 'px';
    			quadr.positionY = e.pageY + 15 + 'px';
    			quadr.showDeleteCont = true;

    			quadr.deletion = function(){    				
    				if (quadr.arr[0].length < 3){
	    				quadr.arr = []; 			
    				} else {
    					quadr.arr[0].forEach(function(item, index) {    						
	    					if (item.trimAll() === str.trimAll()) {
	    						quadr.arr.forEach(function(el){
	    							el.splice(index, 1);
	    						})
	    						quadr.color.splice(index-1, 1);
	    					}
	    				})
	    				quadr.changeColor = quadr.color[quadr.color.lenght-1];	    				
    				}
    				quadr.showDeleteCont = false;    				
    				if (quadr.arr.length){
    					prepareGraph();    					
    				} else {
    					quadr.result = false;
    					quadr.showGraph = false;
    					quadr.changeColor = '#81A34A';
    				}
    			}
    		}
    	} else {
			quadr.showDeleteCont = false;
		}
    }
    /* Удаление графика одной функции */
});