import angular from 'angular';
import angularRoute from 'angular-route';
import path from 'path';
require('./templates/main.less');

const app = angular.module('app', [angularRoute]);
app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    $locationProvider.html5Mode({enable: true});
    
    $routeProvider.when("/main", {
        templateUrl: 'main.html',
        controller: 'MainController'
    }).otherwise({redirectTo: '/main'});
}]);

class MainController {
    constructor($scope) {
        this.scope = $scope;

        this.getPosition = this.getPosition.bind(this);
        this.changePosition = this.changePosition.bind(this);

        this.scope.getNumber = this.getNumber;
        this.scope.changePosition = this.changePosition;
        this.scope.getPosition = this.getPosition;
        this.position = [0, 0];
        this.scope.lines = 10;
        this.scope.columns = 10;
    }

    changePosition(y, x) {
        this.position = [x, y];
    }

    getPosition(y, x) {
        return this.position[0] == x && this.position[1] == y;
    }

    getNumber(num) {
        return new Array(num);
    }
}

MainController.$inject = ['$scope'];
app.controller('MainController', MainController);