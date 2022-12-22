angular.module('market', ['ngStorage']).controller('indexController', function ($scope, $http, $localStorage) {
    $scope.fillTableProducts = function () {
        $http.get('http://localhost:8189/market/api/v1/products')
            .then(function (response) {
                $scope.products = response.data;
            });
    };

    $scope.tryToAuth = function () {
        $http.post('http://localhost:8189/auth/auth', $scope.user)
            .then(function successCallback(response) {
                if (response.data.token) {
                    $http.default.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $localStorage.marketUser = {username: $scope.user.username, token: response.data.token};

                    $scope.user.username = null;
                    $scope.user.password = null;
                }
            }, function errorCallback(response) {
            })
    };

    $scope.tryToLogout = function () {
        $scope.clearUser();
        $scope.user = null;
        $location.path('/');
    };

    $scope.clearUser = function () {
        delete $localStorage.marketUser;
        $http.dafaults.headers.common.Authorization = '';
    };

    $scope.isUserLoggedIn = function () {
        if ($localStorage.marketUser) {
            return true;
        } else {
            return false;
        }
    };

    $scope.deleteProduct = function (id) {
        $http.delete('http://localhost:8189/market/api/v1/products/' + id)
            .then(function (response) {
                $scope.fillTableProducts();
            });
    };

    $scope.createNewProduct = function () {
        $http.post('http://localhost:8189/market/api/v1/products', $scope.newProduct)
            .then(function (response) {
                $scope.newProduct = null;
                $scope.fillTableProducts();
            });
    };

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
    };

    $scope.deleteFromBasket = function () {
        $http.get('http://localhost:8189/market/api/v1/basket/remove/' + productId)
            .then(function (response) {
                $scope.loadBasket();
            });
    };

    $scope.clearBasket = function () {
        $http.get('http://localhost:8189/market/api/v1/basket/clear/')
            .then(function (response) {
                $scope.loadBasket();
            });
    };

    if ($localStorage.marketUser) {
        try {
            let jwt = $localStorage.marketUser.token;
            let payload = JSON.parse(atob(jwt.split('.')[1]));
            let currentTime = parseInt(new Date().getTime() / 1000);
            if (currentTime > payload.exp) {
                console.log('Token is expired!!!');
                delete $localStorage.marketUser;
                $http.defaults.headers.common.Authorization = '';
            }
        } catch (e) {
        }
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.marketUser.token;
    }

    $scope.fillTableProducts();
    $scope.loadBasket();
});