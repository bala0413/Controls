var app = angular.module("ProductModule", ["ngRoute", "ngTagsInput"]);

app.factory("ShareData", function () {
    return { value: 0 }
});

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/showproduct',
        {
            templateUrl: 'ProductTab/ShowProducts',
            controller: 'ShowProductsController'
        });
    $routeProvider.when('/addproduct',
        {
            templateUrl: 'ProductTab/AddNewProduct',
            controller: 'AddProductController'
        });
    $routeProvider.when("/editProduct",
        {
            templateUrl: 'ProductTab/EditProduct',
            controller: 'EditProductController'
        });
    $routeProvider.when('/deleteProduct',
        {
            templateUrl: 'ProductTab/DeleteProduct',
            controller: 'DeleteProductController'
        });
    $routeProvider.otherwise(
        {
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true).hashPrefix('!')

}]);