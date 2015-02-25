angular.module('rating', [])
    .directive('rating', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/rating/rating.html',
            scope: {
                ngModel: '=',
                rules: '='
            },
            controller: 'RatingCtrl'
        }
    })
    .controller('RatingCtrl', function ($scope) {
        $scope.RatingCtrl = {
            max: 10,
            rating: 0
        };
    });