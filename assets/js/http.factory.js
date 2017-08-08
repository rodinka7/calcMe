app.factory('HttpFactory', function($http){
    return {
        getSessions: function() {
            return $http.post('/services', { 
                type : 'getSource',
                ID    : 'TP001'
            });
        }
    };
});