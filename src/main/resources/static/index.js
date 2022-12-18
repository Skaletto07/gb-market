angular.module('market', []).controller('indexController', function ($scope, $http) {
    $scope.fillTableProducts = function () {
        $http.get('http://localhost:8189/market/api/v1/products')
            .then(function (response) {
                $scope.products = response.data;
            });
    };

    $scope.deleteProduct = function (id) {
        $http.delete('http://localhost:8189/market/api/v1/products/' + id)
            .then(function (response) {
                $scope.fillTableProducts();
            });
    }

    $scope.createNewProduct = function () {
        $http.post('http://localhost:8189/market/api/v1/products', $scope.newProduct)
            .then(function (response) {
                $scope.newProduct = null;
                $scope.fillTableProducts();
            });
    }

    $scope.loadBasket = function () {
        $http.get('http://localhost:8189/market/api/v1/basket/')
            .then(function (response) {
                $scope.basket = response.data;

            });
    };

    $scope.addToBasket = function (productId) {
        $http.get('http://localhost:8189/market/api/v1/basket/add/' + productId)
            .then(function (response) {
                alert(response.data.title);
            });
    }

/*    $scope.deleteFromBasket = function () {
        $http.delete('http://localhost:8189/market/basket/delete/')
            .then(function (response) {
                $scope.loadBasket();
            });
    }*/

    $scope.fillTableProducts();
    $scope.loadBasket();
});