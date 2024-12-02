// Hàm load dữ liệu từ Local Storage và đổ vào bảng
function loadCart() {
    // Lấy dữ liệu từ Local Storage
    const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Xác định bảng nơi hiển thị sản phẩm
    const tbody = document.getElementById("sanpham");

    // Xóa nội dung cũ trong bảng (nếu có)
    tbody.innerHTML = "";

    // Biến tính tổng tiền
    let totalPrice = 0;

    // Duyệt qua dữ liệu và thêm vào bảng
    cartData.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;"></td>
            <td>${item.name}</td>
            <td>${item.price} VND</td>
            <td>${item.quantity}</td>
        `;

        // Tính tổng tiền (loại bỏ dấu phẩy trong giá)
        const itemPrice = parseInt(item.price.replace(/,/g, ""));
        totalPrice += itemPrice * parseInt(item.quantity);

        // Thêm dòng vào bảng
        tbody.appendChild(row);
    });

    // Hiển thị tổng tiền
    const billElement = document.getElementById("bill1");
    billElement.textContent = `Total Bill: ${totalPrice.toLocaleString()} VND`;
}
function thanhtoan() {
    // Lấy giá trị từ các ô input
    const input1 = document.getElementById('name').value.trim();
    const input2 = document.getElementById('tinh').value.trim();
    const input3 = document.getElementById('huyen').value.trim();
    const input4 = document.getElementById('phuong').value.trim();
    const input5 = document.getElementById('thon').value.trim();

    // Kiểm tra nếu có trường nào bỏ trống
    if (input1 === "" || input2 === "" || input3 === "" || input4 === "" || input5 === "") {
        alert("Vui lòng nhập đủ thông tin!");
    } else {
        alert("Thanh Toán Thành Công");
        window.location.href = "index.html"; // Điều hướng về trang chính
    }
}


// Gọi hàm khi tải trang
window.onload = loadCart;
