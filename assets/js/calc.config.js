app.config(function($stateProvider, $urlRouterProvider){		
	$urlRouterProvider.otherwise('index');
    
    $stateProvider.state('index', {
      url: "/index",
      templateUrl: "../../assets/templates/mainTemplate.php",
      controller: 'quadrController'
    })
    .state('logs', {
      url: '/logs',
      templateUrl: "../../assets/templates/logsTemplate.php",
      controller: 'logsController'
    })	    
});