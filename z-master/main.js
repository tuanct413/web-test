

carttotal();

function toggleContent1(show) {
    var content = document.getElementById('content');
    if (show) {
        content.style.display = 'block'; // Hiển thị phần tử
    } else {
        content.style.display = 'none'; // Ẩn phần tử
    }
}


const btns = document.querySelectorAll('.btn-add'); // Lấy tất cả các nút "Thêm Vào Giỏ"
btns.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const btnItem = event.target; // Lấy nút được nhấn
        const parentElement = btnItem.parentElement;
        const productCard = parentElement.parentElement;

        var productName = productCard.querySelector('.product-card__name').innerText;
        var productPrice = productCard.querySelector('.product-card__price').innerText;
        var productImage = productCard.querySelector('.product-card__image').src;

        // Giỏ hàng lưu trong biến toàn cục
        if (!window.cartData) window.cartData = []; // Nếu chưa có giỏ hàng, tạo mới

        var existingProduct = window.cartData.find(product => product.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1; // Cập nhật số lượng sản phẩm
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            var product = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            window.cartData.push(product);
        }

        // Hiển thị sản phẩm trong giỏ hàng
        addcart(product.name, product.image, product.price, product.quantity);
     
    });
});

// Hàm hiển thị sản phẩm trong giỏ hàng
function addcart(productName, productImage, productPrice, productQuantity) {
    var cartTable = document.querySelector("tbody");
    

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    var existingRows = cartTable.querySelectorAll("tr");


    // Tạo dòng mới cho sản phẩm (dành cho bảng giỏ hàng chính)
    var addtr = document.createElement("tr");
    var trcontent = `
        <td><img src="${productImage}" alt="Ảnh sản phẩm"></td>
        <td><p>${productName}</p></td>
        <td><span>${productPrice}</span></td>
        <td><input type="number" value="${productQuantity}" min="1" id="sll" oninput="updateQuantity('${productName}', this.value); carttotal();"></td>
        <td><button class="delete_product">Delete</button></td>
    `;
    addtr.innerHTML = trcontent;
    cartTable.append(addtr); // Thêm vào bảng giỏ hàng chính
    // Thêm sự kiện xóa cho cả hai bảng
    addtr.querySelector(".delete_product").addEventListener("click", function () {
        if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${productName}" khỏi giỏ hàng?`)) {
            addtr.remove();  
           
            carttotal();
        }
    });
    
    carttotal(); // Cập nhật lại tổng giỏ hàng
    
}

function saveCartToLocalStorage() {
        // Lấy danh sách các dòng trong bảng giỏ hàng
        let cartTable = document.querySelector("tbody");
        let rows = cartTable.querySelectorAll("tr");
        let cartItems = [];
    
        rows.forEach(row => {
            // Lấy thông tin sản phẩm từ mỗi dòng
            let productImage = row.querySelector("td img").src;
            let productName = row.querySelector("td:nth-child(2) p").textContent;
            let productPrice = row.querySelector("td:nth-child(3) span").textContent;
            let productQuantity = row.querySelector("td:nth-child(4) input").value;
    
            // Thêm sản phẩm vào danh sách
            cartItems.push({
                name: productName,
                image: productImage,
                price: productPrice,
                quantity: productQuantity
            });
        });
    
        // Lưu danh sách sản phẩm vào Local Storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        window.open('thanhtoan.html');
       
    }


// Cập nhật giỏ hàng khi thay đổi số lượng
function updateQuantity(productName, newQuantity) {
    const product = window.cartData.find(p => p.name === productName);
    if (product) {
        product.quantity = parseInt(newQuantity); // Cập nhật số lượng
    }
}

// Hàm tính tổng giỏ hàng
function carttotal() {
    var billElement = document.getElementById("bill");
  
    let total = 0;
    var cartItems = document.querySelectorAll("tbody tr"); // Lấy tất cả các dòng trong bảng giỏ hàng
    for (var i = 0; i < cartItems.length; i++) {
        var inputElement = cartItems[i].querySelector("input"); // Phần tử input chứa số lượng
        var productPriceElement = cartItems[i].querySelector("span"); // Phần tử span chứa giá sản phẩm      
        if (inputElement && productPriceElement) {  // Nếu cả hai phần tử tồn tại
            var inputValue = parseInt(inputElement.value); // Lấy số lượng sản phẩm
            var productPrice = parseInt(productPriceElement.innerText); // Lấy giá sản phẩm          
            total += inputValue * productPrice; // Tính tổng cho sản phẩm này và cộng vào tổng giỏ hàng
        }
       
    }
    if (total <= 0) {
        billElement.innerText = 'Chưa có sản phẩm nào'; // Hiển thị thông báo nếu giỏ hàng rỗng
      
    } else {
        billElement.innerText = 'total bill: ' + total.toFixed(3) + ' VND'; // Cập nhật tổng giỏ hàng vào h3
       
    }
}
function viewproducts(){
    window.open('tee.html', '_blank');
}
// function searchProducts() {
//     // Lấy giá trị người dùng nhập vào thanh tìm kiếm
//     const searchValue = document.getElementById('search').value.toLowerCase();
    
//     // Lấy tất cả các thẻ chứa sản phẩm
//     const productCards = document.querySelectorAll('.product-card');

//     // Lặp qua từng sản phẩm để kiểm tra
//     productCards.forEach(card => {
//         const productName = card.querySelector('.product-card__name').textContent.toLowerCase();

//         // Nếu tên sản phẩm chứa từ khóa tìm kiếm, hiển thị, ngược lại ẩn
//         if (productName.includes(searchValue)) {
//             card.style.display = "block";
//         } else {
//             card.style.display = "none";
//         }
//     });
// }


