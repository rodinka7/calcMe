app.factory('List', ['$http', function($http) {
    return {
      get: function() {
        return $http.get("./logs.json").then(function(response) {
          return response.data;
        });
      },
      post: function(data){
      	return $http.post('./assets/php/logs.filter.php', data).then(function(response) {
          return response.data;
        });
      }
    };
  }]);