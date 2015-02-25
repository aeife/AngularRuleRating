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
        var calculateOverallRating = function (rules, model) {
            var result = 0;
            var weightCount = 0;

            rules.forEach(function (rule) {
                var ruleResult = rule(model);
                result += ruleResult.rating * (ruleResult.weight || 1);
                weightCount += ruleResult.weight || 1;
            });
            result = result / weightCount;

            return result;
        };

        $scope.RatingCtrl = {
            max: 10,
            rating: 0
        };

        $scope.$watch('ngModel', function () {
            $scope.RatingCtrl.rating = calculateOverallRating($scope.rules, $scope.ngModel) * $scope.RatingCtrl.max;
        }, true);
    });