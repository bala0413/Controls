app.service("SPACRUDService", function ($http) {

    this.getColors = function () {
        return $http.get("/api/ColorTabsAPI");
    };

    this.getProducts = function () {
        return $http.get("/api/ProductTabsAPI");
    };

    this.getProduct = function (id) {
        return $http.get("/api/ProductTabsAPI/" + id);
    };


    this.post = function (ProductTabs) {
        var request = $http({
            method: "post",
            url: "/api/ProductTabsAPI",
            data: ProductTabs
        });
        return request;
    };

    this.put = function (id, ProductTabs) {
        var request = $http({
            method: "put",
            url: "/api/ProductTabsAPI/" + id,
            data: ProductTabs
        });
        return request;
    };


    this.delete = function (id) {
        var request = $http({
            method: "delete",
            url: "/api/ProductTabsAPI/" + id
        });
        return request;
    };
});  