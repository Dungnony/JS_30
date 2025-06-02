class Product {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

let products = [
  new Product(1, 'Iphone 12', 6000000, 3),
  new Product(2, 'Samsung S6', 1000000, 4)
];

let editingId = null;

const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const quantityInput = document.getElementById('quantity');
const addBtn = document.getElementById('addBtn');
const tableBody = document.getElementById('tableBody');
const totalValueSpan = document.getElementById('totalValue');
const maxPriceProductSpan = document.getElementById('maxPriceProduct');

function formatCurrency(num) {
  return num.toLocaleString('vi-VN') + ' VNĐ';
}

function render() {
  tableBody.innerHTML = '';
  products.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${formatCurrency(p.price)}</td>
      <td>${p.quantity}</td>
      <td>${formatCurrency(p.price * p.quantity)}</td>
      <td>
        <button onclick="editProduct(${p.id})">Sửa</button>
        <button onclick="deleteProduct(${p.id})">Xóa</button>
      </td>`;
    tableBody.appendChild(tr);
  });

  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  totalValueSpan.textContent = formatCurrency(total);

  if (products.length > 0) {
    const maxP = products.reduce((max, p) => p.price > max.price ? p : max, products[0]);
    maxPriceProductSpan.textContent = `${maxP.name} (${formatCurrency(maxP.price)})`;
  } else {
    maxPriceProductSpan.textContent = 'Chưa có';
  }
}

function clearForm() {
  idInput.value = '';
  nameInput.value = '';
  priceInput.value = '';
  quantityInput.value = '';
  editingId = null;
  addBtn.textContent = 'Thêm';
}

function addOrUpdate() {
  const id = Number(idInput.value);
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const quantity = Number(quantityInput.value);

  if (!id || !name || !price || !quantity) {
    alert('Vui lòng nhập đầy đủ thông tin hợp lệ');
    return;
  }

  if (editingId === null) {
    if (products.some(p => p.id === id)) {
      alert('ID đã tồn tại!');
      return;
    }
    products.push(new Product(id, name, price, quantity));
  } else {
    if (id !== editingId && products.some(p => p.id === id)) {
      alert('ID đã tồn tại!');
      return;
    }
    const p = products.find(p => p.id === editingId);
    p.id = id; p.name = name; p.price = price; p.quantity = quantity;
    editingId = null;
    addBtn.textContent = 'Thêm';
  }

  render();
  clearForm();
}

function editProduct(id) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  idInput.value = p.id;
  nameInput.value = p.name;
  priceInput.value = p.price;
  quantityInput.value = p.quantity;
  editingId = id;
  addBtn.textContent = 'Lưu';
}

function deleteProduct(id) {
  if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
    products = products.filter(p => p.id !== id);
    render();
    if (editingId === id) clearForm();
  }
}

addBtn.onclick = addOrUpdate;

render();