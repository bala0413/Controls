app.controller("EditProductController", function ($scope, $http, $location, SPACRUDService, ShareData) {

    $scope.loadNames = function (query) {
        return $http.get('/MyScripts/name.json', { cache: true }).then(function (response) {
            var name = response.data;
            return name.filter(function (superhero) {
                return superhero.text.toLowerCase().indexOf(query.toLowerCase()) != -1;
            });
        });
    };  

    loadAllColorRecords();
    function loadAllColorRecords() {
        var promiseGetColor = SPACRUDService.getColors();
        promiseGetColor.then(function (response) {
            alert('Edit Product Page');
            $scope.ColorTabs = response.data;
            $scope.ColorTabs.forEach(function (c) {
                if (ShareData.value.languages != undefined && ShareData.value.languages != null) {
                    var languageSeletced = ShareData.value.languages.split(',');
                    for (var i = 0; i < languageSeletced.length; i++) {
                        if (languageSeletced[i] == c.languages) {
                            c.Selected = true;
                        }
                    }
                }
            })
            console.log($scope.ColorTabs);
        },
            function (errorPl) {
                $scope.error = errorPl;
            });
    }
    
    function getProduct() {
        
        var promiseGetProduct = SPACRUDService.getProduct(ShareData.value.id);

        promiseGetProduct.then(function (pl) {
            $scope.ProductTabs = pl.data;
            var ColorData = $scope.ProductTabs.color.split(',');
            $scope.SelectedColor = ColorData;
        },
        function (errorPl) {
            alert('product edit failure');
            $scope.error = 'failure loading Product', errorPl;
            });
    }
    getProduct();

    $scope.availablePayments = ['Credit', 'Debit', 'ATM', 'Internet Banking', 'Cash On Delivery'];
    $scope.multipleDemo = {};
    $scope.multipleDemo.payment = [];

    $scope.save = function () {

        var optionsCSV = '';

        $scope.ColorTabs.forEach(function (c) {
            if (c.id = c.Selected) {                
                if (optionsCSV) {
                    optionsCSV += ','
                }
                optionsCSV += c.languages;
                $scope.ProductTabs.languages = optionsCSV;
            }
        })

        // var message = "";
        //for (var i = 0; i < $scope.ColorTabs.length; i++) {
        //    if ($scope.ColorTabs[i].Selected) {
        //        var id = $scope.ColorTabs[i].id;
        //        var languages = $scope.ColorTabs[i].languages;
        //        message =  languages ;              
        //    }
        //    $scope.ProductTabs.languages = message;
        //}       

        
        var ProductTabs = {
            Id: $scope.ProductTabs.id,
            Name: $scope.ProductTabs.name,
            Color: $scope.SelectedColor.toString(),
            Price: $scope.ProductTabs.price,
            Unit: $scope.ProductTabs.unit,
            ExpiriyDate: $scope.ProductTabs.expiriyDate,
            Languages: $scope.ProductTabs.languages,
            Tag: $scope.ProductTabs.tag.toString(),
            Payment: $scope.ProductTabs.multipleDemo.payment.toString(),
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