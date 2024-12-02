function swapImages(imageID) {
    // Ảnh chính
    const img1 = document.querySelector('#image1');
    // Ảnh nhỏ được nhấp
    const img2 = document.querySelector(`#${imageID}`);
  
    // Lưu tạm đường dẫn và kích thước của ảnh chính
    const tempSrc = img1.src;
    const tempWidth = img1.style.width;
    const tempHeight = img1.style.height;
  
    // Hoán đổi đường dẫn và kích thước
    img1.src = img2.src;
    img2.src = tempSrc;
  
    img1.style.width = tempWidth || '385px'; // Đảm bảo giữ nguyên kích thước
    img1.style.height = tempHeight || '480px';
}
