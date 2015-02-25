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

            rules.forEach(function (rule) {
                result += rule(model).rating;
            });
            result = result / rules.length;

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

                return {rating: rating};
            }
        ];

        $scope.RatingCtrl = {
            max: 10,
            rating: 0
        };

        $scope.$watch('ngModel', function () {
            console.log("run");
            $scope.RatingCtrl.rating = calculateOverallRating(rules, $scope.ngModel) * $scope.RatingCtrl.max;
        }, true);
    });