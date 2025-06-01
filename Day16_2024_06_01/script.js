class SanPham {
  constructor(ma, ten, gia, soLuong) {
    this.ma = ma;
    this.ten = ten;
    this.gia = gia;
    this.soLuong = soLuong;
  }
}

let danhSachSanPham = [
  new SanPham(1, 'Iphone 12', 6000000, 3),
  new SanPham(2, 'Samsung S6', 1000000, 4)
];

let maDangSua = null;

const inputMa = document.getElementById('productId');
const inputTen = document.getElementById('productName');
const inputGia = document.getElementById('productPrice');
const inputSoLuong = document.getElementById('productQuantity');
const nutThem = document.getElementById('addBtn');
const bangSanPhamBody = document.querySelector('#productTable tbody');
const tongGiaTriSpan = document.getElementById('totalValue');
const sanPhamGiaCaoNhatSpan = document.getElementById('maxPriceProduct');

function dinhDangTienTe(so) {
  return so.toLocaleString('vi-VN') + ' VNĐ';
}

function hienThiBang() {
  bangSanPhamBody.innerHTML = '';
  danhSachSanPham.forEach(sp => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${sp.ma}</td>
      <td>${sp.ten}</td>
      <td>${dinhDangTienTe(sp.gia)}</td>
      <td>${sp.soLuong}</td>
      <td>${dinhDangTienTe(sp.gia * sp.soLuong)}</td>
      <td>
        <button class="edit" onclick="suaSanPham(${sp.ma})">Sửa</button>
        <button class="delete" onclick="xoaSanPham(${sp.ma})">Xóa</button>
      </td>
    `;

    bangSanPhamBody.appendChild(tr);
  });

  const tong = danhSachSanPham.reduce((tong, sp) => tong + sp.gia * sp.soLuong, 0);
  tongGiaTriSpan.textContent = dinhDangTienTe(tong);

  if(danhSachSanPham.length > 0) {
    let sanPhamGiaCaoNhat = danhSachSanPham.reduce((max, sp) => sp.gia > max.gia ? sp : max, danhSachSanPham[0]);
    sanPhamGiaCaoNhatSpan.textContent = `${sanPhamGiaCaoNhat.ten} (${dinhDangTienTe(sanPhamGiaCaoNhat.gia)})`;
  } else {
    sanPhamGiaCaoNhatSpan.textContent = 'Chưa có sản phẩm';
  }
}

function xoaForm() {
  inputMa.value = '';
  inputTen.value = '';
  inputGia.value = '';
  inputSoLuong.value = '';
  maDangSua = null;
  nutThem.textContent = 'Thêm';
}

function themHoacCapNhatSanPham() {
  const ma = parseInt(inputMa.value);
  const ten = inputTen.value.trim();
  const gia = parseInt(inputGia.value);
  const soLuong = parseInt(inputSoLuong.value);

  if(isNaN(ma) || !ten || isNaN(gia) || isNaN(soLuong)) {
    alert('Vui lòng nhập đầy đủ và đúng định dạng các trường!');
    return;
  }

  if(maDangSua === null) {
    if(danhSachSanPham.some(sp => sp.ma === ma)) {
      alert('Mã sản phẩm đã tồn tại. Vui lòng chọn mã khác.');
      return;
    }
    danhSachSanPham.push(new SanPham(ma, ten, gia, soLuong));
  } else {
    if(ma !== maDangSua && danhSachSanPham.some(sp => sp.ma === ma)) {
      alert('Mã sản phẩm đã tồn tại. Vui lòng chọn mã khác.');
      return;
    }

    const sp = danhSachSanPham.find(sp => sp.ma === maDangSua);
    sp.ma = ma;
    sp.ten = ten;
    sp.gia = gia;
    sp.soLuong = soLuong;
    maDangSua = null;
    nutThem.textContent = 'Thêm';
  }

  hienThiBang();
  xoaForm();
}

function suaSanPham(ma) {
  const sp = danhSachSanPham.find(sp => sp.ma === ma);
  if(!sp) return;

  inputMa.value = sp.ma;
  inputTen.value = sp.ten;
  inputGia.value = sp.gia;
  inputSoLuong.value = sp.soLuong;

  maDangSua = ma;
  nutThem.textContent = 'Lưu';
}

function xoaSanPham(ma) {
  if(confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
    danhSachSanPham = danhSachSanPham.filter(sp => sp.ma !== ma);
    hienThiBang();
    if(maDangSua === ma) {
      xoaForm();
    }
  }
}

nutThem.addEventListener('click', themHoacCapNhatSanPham);

hienThiBang();
