let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

// get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// create product
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
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
  // create count
  if (newpro.count > 1) {
    for (let i = 0; i < newpro.count; i++) {
      datapro.push(newpro);
    }
  } else {
    datapro.push(newpro);
  }
  // finish count

  // save localstorage

  localStorage.setItem("product", JSON.stringify(datapro));

  //  create function clear data

  cleardata();

  // read data
  showdata();
};

// clear inputs
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

// read
function showdata() {
  let table = "";
  for (let i = 1; i < datapro.length; i++) {
    table += `
                <tr>
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button id="update">update</button></td>
              <td><button onclick ="deletedata(${i})" id="delete">delete</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndelete = document.getElementById("deleteall");
  if (datapro.length > 0) {
    btndelete.innerHTML = `
      <button onclick ="deleteall()">Delete All (${datapro.length})</button>
    `;
  } else {
    btndelete.innerHTML = "";
  }
}
showdata();
// finish read data

// delete
function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
  // finish delete  data
}

function deleteall() {
  localStorage.clear();
  datapro.splice(0);
  showdata();
}

// count

// update
// search
// clean data
