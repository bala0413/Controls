app.controller('ShowProductsController', function ($scope, $location, SPACRUDService, ShareData) {
    loadAllProductsRecords();

    function loadAllProductsRecords() {
        var promiseGetProduct = SPACRUDService.getProducts();

        promiseGetProduct.then(function (pl) { $scope.ProductTabs = pl.data },
            function (errorPl) {
                $scope.error = errorPl;
            });
    }

    $scope.editProduct = function (Id) {
        ShareData.value = Id;
        $location.path("/editProduct");
    }


    $scope.deleteProduct = function (Id) {
        ShareData.value = Id;
        $location.path("/deleteProduct");
    }
});  