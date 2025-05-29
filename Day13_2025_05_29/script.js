 const form = document.getElementById("studentForm");
  const addBtn = document.getElementById("addBtn");
  const studentList = document.getElementById("studentList");

  addBtn.addEventListener("click", function() {
    const studentId = document.getElementById("studentId").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!studentId || !fullName || !email || !phone) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

   
    const newRow = document.createElement("tr");


    const idCell = document.createElement("td");
    idCell.textContent = studentId;
    newRow.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = fullName;
    newRow.appendChild(nameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = email;
    newRow.appendChild(emailCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = phone;
    newRow.appendChild(phoneCell);


    studentList.appendChild(newRow);


    form.reset();
  });