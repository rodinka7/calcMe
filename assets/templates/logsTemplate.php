<div class="container-quadr" ng-controller="logsController as logsCont">
	<h3>Логи</h3>	
	<div class="logs-table">
		<div class="btn-wrapper clearfix">
			<a href="#!/index" class="logs-button index">Назад</a>			
		</div>
		<table class="js-logsTable">
			<tr><th>IP пользователя</th><th>Браузер пользователя</th><th>Дата посещения сайта</th></tr>
			<tr ng-repeat="log in logsCont.logs">
				<td>{{ log.ip }}</td>
				<td>{{ log.bot }}</td>
				<td>{{ log.date }}</td>
			</tr>
		</table>
	</div>
</div> 