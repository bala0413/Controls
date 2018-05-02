app.controller("EditProductController", function ($scope, $location, ShareData, SPACRUDService) {
    getProduct();

    function getProduct() {
        var promiseGetProduct = SPACRUDService.getProduct(ShareData.value);

        promiseGetProduct.then(function (pl) {
            $scope.ProductTabs = pl.data;
        },
            function (errorPl) {
                $scope.error = 'failure loading Product', errorPl;
            });
    }

    $scope.save = function () {
        var ProductTabs = {
            Id: $scope.ProductTabs.id,
            Name: $scope.ProductTabs.name,
            Color: $scope.ProductTabs.color,
            Unit: $scope.ProductTabs.unit,
            Price: $scope.ProductTabs.price,
            ExpiriyDate: $scope.ProductTabs.expiriyDate,
            Languages: $scope.ProductTabs.languages,
        };

        var promisePutProduct = SPACRUDService.put($scope.ProductTabs.id, ProductTabs);
        promisePutProduct.then(function (pl) {
            $location.path("/showproduct");
        },
            function (errorPl) {
                $scope.error = 'failure loading Product', errorPl;
            });
    };

});  