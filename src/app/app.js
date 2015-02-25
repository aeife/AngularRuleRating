angular.module('ratingApp', ['rating'])
    .controller('RatingAppCtrl', function ($scope) {
        $scope.testmodel = {
            name: 'testname',
            height: 300
        };

        $scope.rules = [
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
    });