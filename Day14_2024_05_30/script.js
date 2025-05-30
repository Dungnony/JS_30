const form = document.getElementById("studentForm");
const addBtn = document.getElementById("addBtn");
const studentList = document.getElementById("studentList");

let editingRow = null;

function onEditClick(e) {
  editingRow = e.target.closest("tr");
  document.getElementById("studentId").value = editingRow.cells[0].textContent;
  document.getElementById("fullName").value = editingRow.cells[1].textContent;
  document.getElementById("email").value = editingRow.cells[2].textContent;
  document.getElementById("phone").value = editingRow.cells[3].textContent;

  addBtn.textContent = "Lưu";
}

function addEditButtonToRow(row) {
  const td = document.createElement("td");
  const btn = document.createElement("button");
  btn.textContent = "Sửa";
  btn.type = "button";
  btn.classList.add("btn-sua");
  btn.addEventListener("click", onEditClick);
  td.appendChild(btn);
  row.appendChild(td);
}

document.querySelectorAll(".btn-sua").forEach(btn => {
  btn.addEventListener("click", onEditClick);
});

addBtn.addEventListener("click", () => {
  const studentId = document.getElementById("studentId").value.trim();
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!studentId || !fullName || !email || !phone) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (addBtn.textContent === "Thêm") {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${studentId}</td>
      <td>${fullName}</td>
      <td>${email}</td>
      <td>${phone}</td>
    `;
    addEditButtonToRow(newRow);
    studentList.appendChild(newRow);
  } else if (addBtn.textContent === "Lưu" && editingRow) {
    editingRow.cells[0].textContent = studentId;
    editingRow.cells[1].textContent = fullName;
    editingRow.cells[2].textContent = email;
    editingRow.cells[3].textContent = phone;

    editingRow = null;
    addBtn.textContent = "Thêm";
  }
  form.reset();
});
