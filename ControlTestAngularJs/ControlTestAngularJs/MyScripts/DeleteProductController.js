app.controller("DeleteProductController", function ($scope, $location, ShareData, SPACRUDService) {

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

    $scope.delete = function () {
        var promiseDeleteProduct = SPACRUDService.delete(ShareData.value);

        promiseDeleteProduct.then(function (pl) {
            $location.path("/showproduct");
        },
            function (errorPl) {
                $scope.error = 'failure loading Product', errorPl;
            });
    };

});  