let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "createdata";
let tmp;

let datapro = JSON.parse(localStorage.getItem("product")) || [];

function getTotal() {
  if (
    price.value !== "" &&
    taxes.value !== "" &&
    ads.value !== "" &&
    discount.value !== ""
  ) {
    let result = (
      +price.value +
      +taxes.value +
      +ads.value -
      +discount.value
    ).toFixed(2);
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood === "createdata") {
    if (newpro.count > 1) {
      for (let i = 0; i < newpro.count; i++) {
        datapro.push({ ...newpro });
      }
    } else {
      datapro.push(newpro);
    }
  } else {
    datapro[tmp] = newpro;
    mood = "createdata";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(datapro));
  cleardata();
  showdata();
};

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showdata() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i})">Update</button></td>
        <td><button onclick="deletedata(${i})">Delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let btndelete = document.getElementById("deleteall");
  if (datapro.length > 0) {
    btndelete.innerHTML = `<button onclick="deleteall()">Delete All (${datapro.length})</button>`;
  } else {
    btndelete.innerHTML = "";
  }
}

function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(datapro));
  showdata();
}

function deleteall() {
  localStorage.clear();
  datapro = [];
  showdata();
}

function updatedata(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  submit.innerHTML = "Update";
  mood = "updatedata";
  tmp = i;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

showdata();
