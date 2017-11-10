import angular from 'angular';
import angularRoute from 'angular-route';

const app = angular.module('app', [angularRoute]);
app.config(($routeProvider, $locationProvider) => {
    $locationProvider.html5Mode({enable: true});
    
    $routeProvider.when("/main", {
        templateUrl: './src/templates/main.html',
        controller: 'MainController'
    }).otherwise({redirectTo: '/main'});
});

class MainController {
    constructor($scope) {
        this.scope = $scope;
    }
}

MainController.$inject = ['$scope'];
app.controller('MainController', MainController);