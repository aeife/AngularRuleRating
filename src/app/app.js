angular.module('ratingApp', ['rating'])
    .controller('RatingAppCtrl', function ($scope) {
        $scope.testmodel = {
            name: 'testname',
            height: 300
        };
    });