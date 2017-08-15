<div class="container-quadr" ng-controller="logsController as logsCont">
	<h3>Логи</h3>	
	<div class="logs-table" ng-keyup="logsCont.onEnter($event)">
		<div class="btn-wrapper clearfix">
			<a href="#!/index" class="logs-button index">Назад</a>			
		</div>
		<div class="menu-filters">
			<form>				
				<div class="select-wrapper">				
					<select id="select-filter" ng-model="logsCont.select2" ng-change="logsCont.receiveVal()">	
						<option value="" disabled="">Поиск по:</option>			
						<option value="ip">IP пользователя</option>
						<option value="bot">Браузеру пользователя</option>
						<option value="date">Дате посещения</option>
					</select>					
				</div>
				<div class="select-wrapper" ng-show="logsCont.showInput">
					<input class="input-logs" type="text" placeholder="{{ logsCont.input }}" ng-change="logsCont.showButton()" ng-model="logsCont.val">
					<a href="" class="logs-btn" ng-show="logsCont.showBtn" ng-click="logsCont.receiveData()">Получить данные</a>
				</div>
			</form>
		</div>
		<table class="js-logsTable">
			<tr ng-click="logsCont.sort()"><th>IP пользователя</th><th>Браузер пользователя</th><th>Дата посещения сайта <span ng-bind-html="logsCont.arrow | unsafe"></span></th></tr>
			<tr ng-repeat="log in logsCont.logs track by $index">
				<td>{{ log.ip }}</td>
				<td>{{ log.bot }}</td>
				<td>{{ log.date }}</td>
			</tr>
		</table>
	</div>
</div>  