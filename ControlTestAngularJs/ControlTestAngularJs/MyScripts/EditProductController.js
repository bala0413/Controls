app.controller("EditProductController", function ($scope, $location, SPACRUDService, ShareData) {

    loadAllColorRecords();
    function loadAllColorRecords() {
        var promiseGetColor = SPACRUDService.getColors();
        promiseGetColor.then(function (response) {
            alert('Edit Product Page');
            $scope.ColorTabs = response.data
            console.log($scope.ColorTabs);
        },
            function (errorPl) {
                $scope.error = errorPl;
            });
    }


    getProduct();
    function getProduct() {
      
        var promiseGetProduct = SPACRUDService.getProduct(ShareData.value);

        promiseGetProduct.then(function (pl) {
            $scope.ProductTabs = pl.data;
        },
            function (errorPl) {
                alert('product edit failure');
                $scope.error = 'failure loading Product', errorPl;
            });
    }

    $scope.save = function () {

        //var optionsCSV = '';

        //$scope.ColorTabs.forEach(function (c) {
        //    if (c.id = c.Selected) {                
        //        if (optionsCSV) {
        //            optionsCSV += ','
        //        }
        //        optionsCSV += c.languages;
        //        $scope.ProductTabs.languages = optionsCSV;
        //    }
        //})

        //alert(optionsCSV);

         var message = "";
        for (var i = 0; i < $scope.ColorTabs.length; i++) {
            if ($scope.ColorTabs[i].Selected) {
                var id = $scope.ColorTabs[i].id;
                var languages = $scope.ColorTabs[i].languages;
                message =  languages ;              
            }
            $scope.ProductTabs.languages = message;

        }       


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