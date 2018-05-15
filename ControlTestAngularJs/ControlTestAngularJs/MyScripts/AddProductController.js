app.controller('AddProductController', function ($scope, $http, $location, SPACRUDService, ShareData) {
    //$scope.Id = 0;

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
            alert('Add Product Page');
            $scope.ColorTabs = response.data
            console.log($scope.ColorTabs);
        },
            function (errorPl) {
                $scope.error = errorPl;
            });      
    }

    $scope.availablePayments = ['Credit', 'Debit', 'ATM', 'Internet Banking', 'Cash On Delivery'];
    $scope.multipleDemo = {};
    $scope.multipleDemo.payment = ['Credit', 'Debit'];

    $scope.availableCity = ['Madurai', 'Chennai', 'Coimbatore', 'Dindigul', 'Theni'];
    $scope.multiple = {};
    $scope.multiple.city = ['Madurai'];

    $scope.save = function () {
        debugger;
        var optionsCSV = '';
        $scope.ColorTabs.forEach(function (c) {
            if (c.id=c.Selected) {              
                if (optionsCSV) {
                    optionsCSV += ','
                }
                optionsCSV += c.languages;
                $scope.Languages = optionsCSV;
            }
        })

        //var message = "";
        //for (var i = 0; i < $scope.ColorTabs.length; i++) {
        //    if ($scope.ColorTabs[i].Selected) {
        //        var id = $scope.ColorTabs[i].id;
        //        var languages = $scope.ColorTabs[i].languages;
        //        message =  languages ;              
        //    }
        //    $scope.Languages = message;

        //}       

        var ProductTabs = {
         
            Id: $scope.Id,
            Name: $scope.Name,
            Color: $scope.Color.toString(),
            Price: $scope.Price,
            Unit: $scope.Unit,
            ExpiriyDate: $scope.ExpiriyDate,
            Languages: $scope.Languages,
            Tag: $scope.Tag.toString(),
            Payment: $scope.multipleDemo.payment.toString(),
            City: $scope.multiple.city.toString()
        };
        

        var promisePost = SPACRUDService.post(ProductTabs);

        promisePost.then(function (pl) {
           
            alert("Product Saved Successfully.");
        },
            function (errorPl) {
                alert('error');
                $scope.error = 'failure loading Product', errorPl;
            });       
    };
});