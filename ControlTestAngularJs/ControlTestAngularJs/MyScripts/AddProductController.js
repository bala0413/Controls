app.controller('AddProductController', function ($scope, $location, SPACRUDService, ShareData) {
    //$scope.Id = 0;

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


    $scope.save = function () {
       
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
            Color: $scope.Color,
            Unit: $scope.Unit.toString(),
            Price: $scope.Price,
            ExpiriyDate: $scope.ExpiriyDate,
            Languages: $scope.Languages,

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