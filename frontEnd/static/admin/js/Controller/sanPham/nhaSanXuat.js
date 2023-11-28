app.controller("ProducerController", function ($scope, $http) {

    let token = localStorage.getItem("token");
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    $http.get("http://localhost:8080/nhaSanXuat/danhSach", { headers })
        .then(function (response) {
            const promotions = response.data;
            $scope.promotions = promotions;
        });

    $scope.deleteProducer = function (promotion) {
        let idProducer = promotion.id;
        Swal.fire({
            title: 'Xác nhận xóa sản phẩm',
            text: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                $http.delete("http://localhost:8080/nhaSanXuat/xoa/" + idProducer, { headers })
                    .then(function (response) {
                        const promotions = response.data;
                        $scope.$evalAsync(function () {
                            $scope.promotions = promotions;
                            Swal.fire({
                                icon: "success",
                                title: "Xóa thành công",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        });

                    })
                    .catch(function (error) {
                        console.log("Error");
                    });
            }
        });
    }

    $scope.editProducer = function (promotion) {
        let idProducer = promotion.id;
        window.location.href = '#!/edit-Producer?id=' + idProducer;
    };

    $scope.createProducer = function (promotion) {
        window.location.href = '#!/create-Producer?id=';
    };

});

app.controller("CreateProducerController", function ($scope, $http) {

    let token = localStorage.getItem("token");
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    $scope.saveCreate = function () {

        if ($scope.createProducer === undefined) {
            Swal.fire({
                icon: "error",
                title: "Vui lòng nhập đầy đủ thông tin",
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }

        $http.post("http://localhost:8080/nhaSanXuat/themMoi", $scope.createProducer, { headers })
            .then(function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Thêm mới thành công",
                    showConfirmButton: false,
                    timer: 2000,
                }).then(function () {
                    sessionStorage.setItem("isConfirmed", true);
                    window.location.href = "#!/list-Producer";
                });
            })
            .catch(function (error) {
                if (error.status === 400) {
                    const errorMessage = error.data.message;
                    Swal.fire({
                        icon: "error",
                        title: errorMessage + "",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                } else {
                    console.error(error);
                }
            });
    };

    $scope.returnCreate = function () {
        window.location.href = "#!/list-Producer"
    };

});


//
app.controller("EditProducerController", function ($scope, $routeParams, $http) {

    let token = localStorage.getItem("token");
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let idProducer = $routeParams.id;

    $http.get("http://localhost:8080/nhaSanXuat/chinhSua/" + idProducer, { headers })
        .then(function (response) {
            let editProducer = response.data;
            $scope.editProducer = editProducer;
        });


    $scope.saveEdits = function () {

        let editProducer = {
            id: idProducer,
            name: $scope.editProducer.name,
            diaChi: $scope.editProducer.diaChi,
        };

        $http.put("http://localhost:8080/nhaSanXuat/luuChinhSua", editProducer, { headers })
            .then(function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Sửa thành công",
                    showConfirmButton: false,
                    timer: 2000,
                }).then(function () {
                    sessionStorage.setItem("isConfirmed", true);
                    window.location.href = "#!/list-Producer";
                });
            })
            .catch(function (errorResponse) {
                if (errorResponse.status === 400) {
                    const errorMassage = errorResponse.data.message;
                    Swal.fire({
                        icon: "error",
                        title: errorMassage + "",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            });
    };

    //Return
    $scope.returnEdit = function () {
        window.location.href = "#!/list-Producer"
    };
});