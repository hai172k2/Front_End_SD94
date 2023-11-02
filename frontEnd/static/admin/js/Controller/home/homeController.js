const app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/list-khuyenMai", {
            templateUrl: "/templates/admin/KhuyenMai/DanhSach.html",
            controller: "KhuyenMaiController",
        })
        .when("/edit-khuyenMai", {
            templateUrl: "/templates/admin/KhuyenMai/ChinhSua.html",
            controller: "EditKhuyenMaiController",
        })
        .when("/create-khuyenMai", {
            templateUrl: "/templates/admin/KhuyenMai/ThemMoi.html",
            controller: "CreateKhuyenMaiController",
        })
        .when("/list-PurchaseBill", {

            templateUrl: "/templates/admin/purchasebill/ChoXacNhan.html",
            controller: "ChoXacNhanController",
        })
        .when("/cho-giao-hang", {
            templateUrl: "/templates/admin/purchasebill/ChoGiaoHang.html",
            controller: "ChoGiaoHangController",
        })
        .when("/dang-giao", {
            templateUrl: "/templates/admin/purchasebill/DangGiaoHang.html",
            controller: "DangGiaoHangController",
        })
        .when("/da-giao", {
            templateUrl: "/templates/admin/purchasebill/DaGiaoHang.html",
            controller: "DaGiaoHangController",
        })
        .when("/da-huy", {
            templateUrl: "/templates/admin/purchasebill/DaHuyDon.html",
            controller: "DaHuyDonController",
        })
        .when("/detailed-invoice", {
            templateUrl: "/templates/admin/detailedInvoice/detailedInvoice.html",
            controller: "DetailsController",
        })
        .when("/login", {
            templateUrl: "/templates/admin/login/index.html",
            controller: "loginCtrl",
        })
        .when("/detailed-invoice2", {
            templateUrl: "/templates/admin/detailedInvoice/details2.html",
            controller: "Details2Controller",
        })
        .when("/detailed-invoice3", {
            templateUrl: "/templates/admin/detailedInvoice/details3.html",
            controller: "Details3Controller",
        })
        .when("/detailed-invoice4", {
            templateUrl: "/templates/admin/detailedInvoice/details2.html",
            controller: "Details4Controller",
        })
        .when("/detailed-invoice5", {
            templateUrl: "/templates/admin/detailedInvoice/details5.html",
            controller: "Details5Controller",
        })
        .otherwise({
            redirectTo: "/login",
        });
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/list-Customer", {
            templateUrl: "/templates/admin/customer/list.html",
            controller: "CustomerController",
        })
        .when("/edit-Customer", {
            templateUrl: "/templates/admin/customer/edit.html",
            controller: "EditCustomerController",
        })
        .when("/create-Customer", {
            templateUrl: "/templates/admin/customer/create.html",
            controller: "CreateCustomerController",
        })
        .when("/edit-Product", {
            templateUrl: "/templates/admin/product/edit.html",
            controller: "EditProductController",
        })
        .when("/list-Product", {
            templateUrl: "/templates/admin/product/list.html",
            controller: "ProductController",
        })
        .when("/create-Product", {
            templateUrl: "/templates/admin/product/create.html",
            controller: "CreateProductController",
        })
        .when("/in-store", {
            templateUrl: "/templates/admin/sales/product_list.html",
            controller: "ListProductController",
        })
        .when("/details-product", {
            templateUrl: "/templates/admin/sales/details.html",
            controller: "detailsController",
        })
        .otherwise({
            redirectTo: "/",
        });
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/list-Color", {
            templateUrl: "/templates/admin/colorr/list.html",
            controller: "ColorrController",
        })
        .when("/create-Color", {
            templateUrl: "/templates/admin/colorr/create.html",
            controller: "CreateColorController",
        })
        .when("/edit-Color", {
            templateUrl: "/templates/admin/colorr/edit.html",
            controller: "EditColorController",
        })
        .when("/list-Size", {
            templateUrl: "/templates/admin/size/list.html",
            controller: "SizeController",
        })
        .when("/create-Size", {
            templateUrl: "/templates/admin/size/create.html",
            controller: "CreateSizeController",
        })
        .when("/edit-Size", {
            templateUrl: "/templates/admin/size/edit.html",
            controller: "EditSizeController",
        })
        .when("/list-Img", {
            templateUrl: "/templates/admin/imagess/list.html",
            controller: "ImgController",
        })
        .when("/list-Line", {
            templateUrl: "/templates/admin/line/list.html",
            controller: "LineController",
        })
        .when("/create-Line", {
            templateUrl: "/templates/admin/line/create.html",
            controller: "CreateLineController",
        })
        .when("/edit-Line", {
            templateUrl: "/templates/admin/line/edit.html",
            controller: "EditLineController",
        })
        .when("/list-Material", {
            templateUrl: "/templates/admin/material/list.html",
            controller: "MaterialController",
        })
        .when("/create-Material", {
            templateUrl: "/templates/admin/material/create.html",
            controller: "CreateMaterialController",
        })
        .when("/edit-Material", {
            templateUrl: "/templates/admin/material/edit.html",
            controller: "EditMaterialController",
        })
        .when("/list-Producer", {
            templateUrl: "/templates/admin/producer/list.html",
            controller: "ProducerController",
        })
        .when("/create-Producer", {
            templateUrl: "/templates/admin/producer/create.html",
            controller: "CreateProducerController",
        })
        .when("/edit-Producer", {
            templateUrl: "/templates/admin/producer/edit.html",
            controller: "EditProducerController",
        })
        .otherwise({
            redirectTo: "/",
        });
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/list-Staff", {
            templateUrl: "/templates/admin/staff/list.html",
            controller: "StaffController",
        })
        .when("/edit-Staff", {
            templateUrl: "/templates/admin/staff/edit.html",
            controller: "EditStaffController",
        })
        .when("/create-Staff", {
            templateUrl: "/templates/admin/staff/create.html",
            controller: "CreateStaffController",
        })
        .otherwise({
            redirectTo: "/",
        });
});
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/logout', {
        templateUrl: 'templates/admin/login/login.html',
        controller: "loginController",
    });
}]);
