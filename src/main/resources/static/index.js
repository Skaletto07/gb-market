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

    $scope.fillTableBasket = function () {
        $http.get('http://localhost:8189/market/basket/get/')
            .then(function (response) {
                $scope.baskets = response.data;
            });
    };

    $scope.addToBasket = function () {
        $http.post('http://localhost:8189/market/basket/addOne"', $scope.newProductToBasket)
            .then(function (response) {
                $scope.newProductToBasket = null;
                $scope.fillTableBasket();
            });
    }

    $scope.deleteFromBasket = function () {
        $http.delete('http://localhost:8189/market/basket/delete/')
            .then(function (response) {
                $scope.fillTableBasket();
            });
    }

    $scope.fillTableProducts();
});