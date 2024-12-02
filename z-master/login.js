// Thêm sự kiện click cho nút đăng nhập
const btn = document.querySelector('#dangnhap');

btn.addEventListener("click", (e) => {
    e.preventDefault(); // Ngăn hành vi reload trang

    // Lấy giá trị từ các ô input
    const userEmail = document.querySelector('#email').value.trim(); // Email nhập vào
    const userPass = document.querySelector('#password').value.trim(); // Mật khẩu nhập vào

    // Lấy dữ liệu từ Local Storage dựa trên email
    const storedData = localStorage.getItem(userEmail);

    if (storedData) {
        // Parse dữ liệu JSON từ Local Storage
        const userData = JSON.parse(storedData);     
        
        // So sánh mật khẩu nhập vào với mật khẩu lưu
        if (userPass === userData.pass) {
            login(userData); // Gọi login với thông tin người dùng đã kiểm tra
            window.location.href = "index.html"; // Chuyển trang sau khi đăng nhập thành công
        } else {
            alert('Sai mật khẩu!');
        }
    } else {
        alert('Email không tồn tại!');
    }
});

// Hàm đăng nhập
function login(user) {
    // Lưu thông tin người dùng vào localStorage
    localStorage.setItem(user.email, JSON.stringify(user));

    // Hoặc lưu email vào sessionStorage
    sessionStorage.setItem("currentUserEmail", user.email);
    
    alert(`Đăng nhập thành công: ${user.email}`);
}
