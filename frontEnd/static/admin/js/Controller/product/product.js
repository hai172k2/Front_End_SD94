app.controller("ProductController", function ($scope, $http) {

    $http.get("http://localhost:8080/api/product/list")
        .then(function (response) {
            const promotions = response.data;
            promotions.forEach(function (promotion) {
                promotion.status2 = getStatusText(promotion.status);
            });
            $scope.promotions = promotions;
        });
        

    function getStatusText(status) {
        if (status == 0) {
            return "Active";
        } else if (status == 1) {
            return "Expired";
        } else {
            return "Awaiting";
        }
    }

    //Phân trang
    $scope.pager = {
        page: 1,
        size: 8,
        get promotions() {
            if ($scope.promotions && $scope.promotions.length > 0) {
                let start = (this.page - 1) * this.size;
                return $scope.promotions.slice(start, start + this.size);
            } else {
                return [];
            }
        },
        get count() {
            if ($scope.promotions && $scope.promotions.length > 0) {
                let start = (this.page - 1) * this.size;
                return Math.ceil(1.0 * $scope.promotions.length / this.size);
            } else {
                return 0;
            }
        },
        get pageNumbers() {
            const pageCount = this.count;
            const pageNumbers = [];
            for (let i = 1; i <= pageCount; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        }
    };



    //Chuyển hướng đến trang edit theo id
    $scope.edit = function (promotion) {
        let idPro = promotion.id;
        window.location.href = '#!/edit-Product?id=' + idPro;
    };


    //Xóa trong danh sách
    $scope.delete = function (promotion) {
        let idPro = promotion.id;
        console.log(idPro)
        $http.delete("http://localhost:8080/api/product/deleteProduct/" + idPro)
            .then(function (response) {
                const promotions = response.data;
                
                promotions.forEach(function (promotion) {
                    promotion.status2 = getStatusText(promotion.status);
                });

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

    //Tìm kiếm
    // $scope.search = function (searchTerm) {
    //     $http.get("http://localhost:8080/api/product/search=" + searchTerm)
    //         .then(function (response) {
    //             const promotions = response.data;
    //             promotions.forEach(function (promotion) {
    //                 promotion.status2 = getStatusText(promotion.status);
    //             });

    //             // Cập nhật lại dữ liệu trong table nhưng không load lại trang by hduong25
    //             $scope.$evalAsync(function () {
    //                 $scope.promotions = promotions;
    //             });
    //         });
    // }

    //Tìm kiếm ngày bắt đầu
    // $scope.searchDate = function (selectedDate) {
    //     let formattedDate = formatDate(selectedDate);

    //     // Tiếp tục với yêu cầu HTTP và xử lý dữ liệu
    //     $http.get("http://localhost:8080/api/product/searchDate=" + formattedDate)
    //         .then(function (response) {
    //             const promotions = response.data;
    //             promotions.forEach(function (promotion) {
    //                 promotion.status2 = getStatusText(promotion.status);
    //             });

    //             $scope.$evalAsync(function () {
    //                 $scope.promotions = promotions;
    //             })
    //         });
    // }

    // function formatDate(dateString) {
    //     let date = new Date(dateString);
    //     let year = date.getFullYear();
    //     let month = ("0" + (date.getMonth() + 1)).slice(-2);
    //     let day = ("0" + date.getDate()).slice(-2);
    //     return year + "-" + month + "-" + day;
    // }

    // Re load
    $scope.reLoad = function () {
        $http.get("http://localhost:8080/api/product/list").then(function (response) {
            const promotions = response.data;
            promotions.forEach(function (promotion) {
                promotion.status2 = getStatusText(promotion.status);
            });

            $scope.$evalAsync(function () {
                $scope.promotions = promotions;
            })
        });
    }
});

//Edit controller
app.controller("EditProductController", function ($scope, $routeParams, $http) {
    let idPro = $routeParams.id;

    $http.get("http://localhost:8080/api/product/edit/" + idPro)
        .then(function (response) {
            const editproduct = response.data;
            $scope.editproduct = editproduct;
        });

    //Lưu edit
    // $scope.saveEdit = function () {
    //     let maxValue = $scope.editproduct.fomatMaximumValue;
    //     let numericValue = parseFloat(maxValue.replace(/[^\d.-]/g, ''));

    //     let editproduct = {
    //         id: idPro,
    //         name: $scope.editproduct.name,
    //         startedDate: $scope.editproduct.startedDate,
    //         endDate: $scope.editproduct.endDate,
    //         percentproduct: $scope.editproduct.percentproduct,
    //     };

    //     $http.put("http://localhost:8080/api/product/saveUpdate", editproduct)
    //         .then(function (response) {
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Sửa thành công",
    //                 showConfirmButton: false,
    //                 timer: 2000,
    //             }).then(function () {
    //                 sessionStorage.setItem("isConfirmed", true);
    //                 window.location.href = "#!/list-Product";
    //             });
    //         })
    //         .catch(function (errorResponse) {
    //             if (errorResponse.status === 400) {
    //                 const errorMassage = errorResponse.data.message;
    //                 Swal.fire({
    //                     icon: "error",
    //                     title: errorMassage + "",
    //                     showConfirmButton: false,
    //                     timer: 2000,
    //                 });
    //             }
    //         });
    // };

    //Return
    $scope.returnEdit = function () {
        window.location.href = "#!/list-Product"
    };

});

//Create controller
app.controller("CreateProductController", function ($scope, $http, $routeParams) {
    $http.get("http://localhost:8080/api/product/material/list")
        .then(function (response) {
            const material = response.data;
            $scope.material = material;
        })

    $http.get("http://localhost:8080/api/product/line/list")
        .then(function (response) {
            const line = response.data;
            $scope.line = line;
        })

    $http.get("http://localhost:8080/api/product/producer/list")
        .then(function (response) {
            const producer = response.data;
            $scope.producer = producer;
        })

    $http.get("http://localhost:8080/api/product/color/list")
        .then(function (response) {
            const color = response.data;
            $scope.color = color;
        })

    $http.get("http://localhost:8080/api/product/size/list")
        .then(function (response) {
            const size = response.data;
            $scope.size = size;
        })

    let idPro = $routeParams.id;

    let id_color = [];
    $scope.getIdColor = function (color) {
        if (id_color.indexOf(color.id) === -1) {
            id_color.push(color.id);
            console.log(id_color);
        } else {
            console.log("ID already exists in the array");
        }
    };

    let selectedSizeId;
    let id_size = [];
    $scope.getIdSize = function (size) {
        console.log(size.id);
        if (id_size.indexOf(size.id) === -1) {
            id_size.push(size.id);
            console.log(id_size);
        } else {
            console.log("ID already exists in the array");
        }
    };


    $scope.saveCreate = function () {
        let createProduct = {
            id: idPro,
            name: $scope.createProduct.name,
            price: $scope.createProduct.price,
            origin: $scope.createProduct.origin,
            productMaterial: {
                id: $scope.createProduct.productMaterial
            },
            productLine: {
                id: $scope.createProduct.productLine
            },
            producer: {
                id: $scope.createProduct.producer
            },
        };

        console.log(id_size);
        $http.post("http://localhost:8080/api/product/saveCreate",
            {
                name: $scope.createProduct.name,
                price: $scope.createProduct.price,
                origin: $scope.createProduct.origin,
                id_metarial: $scope.createProduct.productMaterial,
                id_line: $scope.createProduct.productLine,
                producer: $scope.createProduct.producer,
                color: id_color,
                size: id_size,
                quantity: $scope.createProduct.quantity,
                status: $scope.createProduct.status,
            }
        )
            .then(function (response) {
                const details = response.data;
                console.log(details);
                $scope.details = details;
            })
            .catch(function (errorResponse) {
                if (errorResponse.status === 400) {
                    const errorMessage = errorResponse.data.message;
                    Swal.fire({
                        icon: "error",
                        title: errorMessage + "",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            });
    };


    $scope.returnCreate = function () {
        window.location.href = "#!/list-Product"
    };
});



