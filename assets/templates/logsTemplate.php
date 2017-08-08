<div class="container-quadr" ng-controller="logsController as logsCont">
	<h3>Логи</h3>	
	<div class="logs-table">
		<div class="btn-wrapper clearfix">
			<a href="#!/index" class="logs-button index">Назад</a>			
		</div>
		<div class="menu-filters">
			<form>
				<div class="select-wrapper">
					<label for="select-filter">Сортировка по дате посещения:</label>
					<select id="select-filter" ng-model="logsCont.select1" ng-change="logsCont.receiveVal()">
						<option value="up">По возростанию</option>
						<option value="down">По убыванию</option>
					</select>					
				</div>
				<div class="select-wrapper">
					<label for="select-filter">Сортировка по значению:</label>
					<select id="select-filter" ng-model="logsCont.select2" ng-change="logsCont.receiveVal()">
						<option value="ip">IP пользователя</option>
						<option value="bot">Браузеру пользователя</option>
						<option value="date">Дате посещения</option>
					</select>					
				</div>
				<div class="select-wrapper">
					<input class="input-logs" type="text" ng-show="logsCont.showInput" placeholder="{{ logsCont.input }}">
					<a href="#!/index" class="logs-btn" ng-show="logsCont.showBtn">Получить данные</a>
				</div>
			</form>
		</div>
		<table class="js-logsTable">
			<tr><th>IP пользователя</th><th>Браузер пользователя</th><th>Дата посещения сайта</th></tr>
			<tr ng-repeat="log in logsCont.logs track by $index">
				<td>{{ log.ip }}</td>
				<td>{{ log.bot }}</td>
				<td>{{ log.date }}</td>
			</tr>
		</table>
	</div>
</div>  