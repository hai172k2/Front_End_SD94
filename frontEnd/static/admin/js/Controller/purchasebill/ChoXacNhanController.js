app.controller("ChoXacNhanController", function ($scope, $http) {
    let token = localStorage.getItem("token");
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    $scope.loadData = function () {
        $http.get("http://localhost:8080/hoaDon/datHang/choXacNhan/danhSach", { headers }).then(function (response) {
            const pending = response.data;
                $scope.pending = pending;
        });
    }

    $scope.loadData();
    // lay ra thong tin nguoi dang nhap
    function parseJwt(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let payload = JSON.parse(jsonPayload);
        return payload;
    }

    let decodedToken = parseJwt(token);

    $scope.GiaoTatCa = function () {
        const checkOut_email = decodedToken.email;
        Swal.fire({
            title: 'Xác nhận giao hàng',
            text: 'Bạn có muốn giao tất cả đơn hàng không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    email_user: checkOut_email,

                }
                $http.post("http://localhost:8080/hoaDon/datHang/choXacNhan/xacNhanDon/tatCa", data, { headers })
                    .then(function (response) {
                        const pending = response.data;
                        
                        $scope.$evalAsync(function () {
                            $scope.pending = pending;
                        });
                        Swal.fire('Xác nhận thành công!', '', 'success');
                    })
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire('Đã xảy ra lỗi!', '', 'error');
                    });
                
            };
        });
    };


    //Phân trang
    $scope.pager = {
        page: 1,
        size: 4,
        get pending() {
            if ($scope.pending && $scope.pending.length > 0) {
                let start = (this.page - 1) * this.size;
                return $scope.pending.slice(start, start + this.size);
            } else {
                // Trả về một mảng trống hoặc thông báo lỗi tùy theo trường hợp
                return [];
            }
        },
        get count() {
            if ($scope.pending && $scope.pending.length > 0) {
                let start = (this.page - 1) * this.size;
                return Math.ceil(1.0 * $scope.pending.length / this.size);
            } else {
                // Trả về 0
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
    // xác nhận đơn
    $scope.confirm = function (pending) {
        const id = pending.id;
        const checkOut_email = decodedToken.email;
        Swal.fire({
            title: 'Xác nhận đơn hàng',
            text: 'Bạn có muốn giao đơn hàng này không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    id :id,
                    email_user: checkOut_email
                }
                $http.post("http://localhost:8080/hoaDon/datHang/choXacNhan/capNhatTrangThai/daXacNhan", data, { headers })
                    .then(function (response) {
                        const pending = response.data;
                        $scope.$evalAsync(function () {                           
                            $scope.pending = pending;
                        });
                        Swal.fire('Xác nhận thành công!', '', 'success');
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            };
        });
    };

    // từ chối xác nhận ( trạng thái đã huỷ đơn 5)
    $scope.refuseBill = function (pending) {
        const id = pending.id;
        const checkOut_email = decodedToken.email;
        Swal.fire({
            title: 'Xác nhận huỷ đơn hàng',
            text: 'Bạn có muốn huỷ đơn hàng này không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    id:id,
                    email_user: checkOut_email
                }
                $http.post("http://localhost:8080/hoaDon/datHang/choXacNhan/capNhatTrangThai/huyDon", data, { headers })
                    .then(function (response) {
                        $scope.loadData();
                        Swal.fire('Huỷ đơn hàng thành công!', '', 'success');
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                
            };
        });

    };

    //Tìm kiếm
    $scope.$watch('search', function (newVal) {
        if (newVal) {
            $http.get("http://localhost:8080/hoaDon/datHang/choXacNhan/timKiem=" + newVal, { headers })
                .then(function (response) {
                    const pending = response.data;

                    // Cập nhật lại dữ liệu trong table nhưng không load lại trang
                    $scope.$evalAsync(function () {
                        $scope.pending = pending;
                    });
                });
        } else {
            $scope.loadData();
        }
    });

    //Tìm kiếm ngày bắt đầu
    $scope.searchDateBill = function (searchDate) {
        let formattedDate = formatDate(searchDate);

        // Tiếp tục với yêu cầu HTTP và xử lý dữ liệu
        $http.get("http://localhost:8080/hoaDon/datHang/choXacNhan/timKiemNgay=" + formattedDate, { headers })
            .then(function (response) {
                const pending = response.data;

                $scope.$evalAsync(function () {
                    $scope.pending = pending;
                })
            });
    }


    function formatDate(dateString) {
        let date = new Date(dateString);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
    }

    //Re load
    $scope.reLoad = function () {
        $scope.loadData();
    }
    // check don da chon
    $scope.coCheckboxDaChon = false;

    $scope.toggleSelectAll = function () {
        angular.forEach($scope.pending, function (item) {
            item.selected = $scope.selectAll;
        });
        $scope.checkTatCaDaChon();
    };

    $scope.updateSelectAll = function () {
        $scope.selectAll = $scope.pending.every(function (item) {
            return item.selected;
        });
        $scope.checkTatCaDaChon();
    };

    $scope.checkTatCaDaChon = function () {
        $scope.coCheckboxDaChon = $scope.pending.some(function (item) {
            return item.selected;
        });
    };

    $scope.xacNhanDonDaChon = function () {
        let id_hoaDon = [];
        const checkOut_email = decodedToken.email;
        angular.forEach($scope.pending, function (item) {
            if (item.selected) {
                id_hoaDon.push(item.id);
                Swal.fire({
                    title: 'Xác nhận những đơn đã chọn',
                    text: 'Bạn có muốn xác nhận những đơn đã chọn không?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Có',
                    cancelButtonText: 'Không'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let data = {
                            id_hoaDon:id_hoaDon,
                            email_user: checkOut_email
                        }
                        $http.put("http://localhost:8080/hoaDon/datHang/choXacNhan/xacNhanDon/daChon", data, { headers })
                            .then(function (response) {
                                const pending = response.data;
                                $scope.$evalAsync(function () {
                                    $scope.pending = pending;
                                    $scope.coCheckboxDaChon = false;
                                    $scope.selectAll = false
                                });
                                Swal.fire('Xác nhận đơn thành công!', '', 'success');
                            });
                        
                    };
                });

            };
        });
    };
    $scope.huyDonDaChon = function () {
        let id_hoaDon = [];
        const checkOut_email = decodedToken.email;
        angular.forEach($scope.pending, function (item) {
            if (item.selected) {
                id_hoaDon.push(item.id);
                Swal.fire({
                    title: 'Hủy những đơn đã chọn',
                    text: 'Bạn có muốn hủy những đơn đã chọn không?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Có',
                    cancelButtonText: 'Không'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let data = {
                            id_hoaDon:id_hoaDon,
                            email_user: checkOut_email
                        }
                        $http.put("http://localhost:8080/hoaDon/datHang/choXacNhan/huyDon/daChon", data, { headers })
                            .then(function (response) {
                                const pending = response.data;
                                $scope.$evalAsync(function () {
                                    $scope.pending = pending;
                                    $scope.coCheckboxDaChon = false;
                                    $scope.selectAll = false
                                });
                            });
                        Swal.fire('Hủy tất cả đơn thành công!', '', 'success');
                    };
                });
            };
        });
    };
    $scope.look = function (pending) {
        const id = pending.id;
        window.location.href = "#!/detailed-invoice?id=" + id; 
    };
});

app.controller("DetailsController", function ($scope, $routeParams, $http) {
    let token = localStorage.getItem("token");
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    const id = $routeParams.id;
    $scope.loadData = function(){
        $http.get("http://localhost:8080/hoaDon/chiTietHoaDon/choXacNhan/id="+id, { headers })
        .then(function (response) {

            const invoice = response.data;
            const hdct = invoice.hoaDonChiTiets;
            $scope.hdct = hdct;
            const lshd = invoice.lichSuHoaDons;
            $scope.lshd = lshd;
            const hoaDon = invoice.hoaDon;
            $scope.hoaDon = hoaDon;
        });
    }
    
    $scope.loadData();

    //Phân trang
    $scope.pager = {
        page: 1,
        size: 4,
        get invoice() {
            if ($scope.invoice && $scope.invoice.length > 0) {
                let start = (this.page - 1) * this.size;
                return $scope.invoice.slice(start, start + this.size);
            } else {
                // Trả về một mảng trống hoặc thông báo lỗi tùy theo trường hợp
                return [];
            }
        },
        get count() {
            if ($scope.invoice && $scope.invoice.length > 0) {
                let start = (this.page - 1) * this.size;
                return Math.ceil(1.0 * $scope.invoice.length / this.size);
            } else {
                // Trả về 0
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
});




