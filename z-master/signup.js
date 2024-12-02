const btn = document.querySelector('#submitBtn');

btn.addEventListener("click", (e) => {
    e.preventDefault(); // Ngăn form gửi đi

    // Lấy giá trị từ các trường nhập liệu
    const lastname = document.querySelector('#lastname').value.trim();
    const firstname = document.querySelector('#firstname').value.trim();
    const phone = document.querySelector('#phonenumber').value.trim();
    const email = document.querySelector('#email').value.trim();
    const pass = document.querySelector('#pass').value.trim();

    // Kiểm tra nếu có trường nào bị bỏ trống
    if (lastname === "" || firstname === "" || phone === "" || email === "" || pass === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
    } else {
        // Tạo đối tượng user
            const user = {
            lastname,
            firstname,
            phone,
            email,
            pass,
        };

        // Chuyển đối tượng user thành chuỗi JSON
        const json = JSON.stringify(user);

        // Lưu vào Local Storage với key là email (hoặc key khác duy nhất)
        localStorage.setItem(email, json);

        alert("Đăng ký thành công!");

        // Chuyển hướng sang trang login
        window.location.href = "login.html";
    }
});
