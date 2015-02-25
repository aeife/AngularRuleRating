angular.module('rating', [])
    .directive('rating', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/rating/rating.html',
            scope: {
                ngModel: '=',
                rules: '=?'
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

        // mock rules
        var rules = [
            function rateName (model) {
                var rating = 0;
                if (model.name.length > 5) {
                    rating = 1;
                } else if (model.name.length > 0) {
                    rating = 0.5;
                }

                return {rating: rating};
            },
            function rateHeight (model) {
                var rating = 0;
                if (model.height > 500) {
                    rating = 1;
                } else if (model.height > 400) {
                    rating = 0.8;
                } else if (model.height > 300) {
                    rating = 0.6;
                } else if (model.height > 200) {
                    rating = 0.4;
                } else if (model.height > 100) {
                    rating = 0.2;
                }

                return {rating: rating, weight: 2};
            }
        ];

        $scope.RatingCtrl = {
            max: 10,
            rating: 0
        };

        $scope.$watch('ngModel', function () {
            $scope.RatingCtrl.rating = calculateOverallRating(rules, $scope.ngModel) * $scope.RatingCtrl.max;
        }, true);
    });