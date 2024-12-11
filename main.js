// Getting DOM elements by their IDs to interact with them
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitleButton = document.getElementById("searchtitle");
let searchCategoryButton = document.getElementById("searchcategory");

// Initial mood is set to "create data" mode, indicating it's creating a new product
let mood = "createdata";
let tmp; // Temporary variable to store the index when updating a product

// Retrieve products from localStorage or initialize an empty array if none exist
let datapro = JSON.parse(localStorage.getItem("product")) || [];

// Function to calculate and display the total price of the product
function getTotal() {
  if (price.value !== "" && taxes.value !== "" && ads.value !== "" && discount.value !== "") {
    let result = (+price.value + +taxes.value + +ads.value - +discount.value).toFixed(2);
    total.innerHTML = result; // Display the result in the total field
    total.style.background = "#040"; // Green background to indicate success
  } else {
    total.innerHTML = ""; // Clear total if inputs are invalid
    total.style.background = "#a00d02"; // Red background to indicate error
  }
}

// Event listener for the submit button
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
        datapro.push({...newpro}); // Push a copy of the product to avoid reference issues
      }
    } else {
      datapro.push(newpro); // Otherwise, just add one product
    }
  } else {
    datapro[tmp] = newpro;
    mood = "createdata"; // Reset mood back to "create"
    submit.innerHTML = "Create"; // Change button text back to "Create"
    count.style.display = "block"; // Show the count input field again
  }

  localStorage.setItem("product", JSON.stringify(datapro)); // Save the updated list
  cleardata(); // Clear input fields
  showdata(); // Refresh the data display
};

// Function to clear the input fields
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

// Function to display the product list in the table
function showdata() {
  getTotal(); // Recalculate the total to ensure the correct value is shown
  let table = "";

  // Loop through each product and add it to the table
  for (let i = 0; i < datapro.length; i++) {
    table += `
      <tr>
        <td>${i+1}</td>
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

  document.getElementById("tbody").innerHTML = table; // Update the table with all data

  let btndelete = document.getElementById("deleteall");
  if (datapro.length > 0) {
    btndelete.innerHTML = `<button onclick="deleteall()">Delete All (${datapro.length})</button>`;
  } else {
    btndelete.innerHTML = ""; // Hide the button if there are no products
  }
}

// Function to delete a product by index
function deletedata(i) {
  datapro.splice(i, 1); // Remove the product from the array
  localStorage.setItem("product", JSON.stringify(datapro)); // Update localStorage
  showdata(); // Refresh the data display
}

// Function to delete all products
function deleteall() {
  localStorage.clear(); // Clear all data in localStorage
  datapro = []; // Clear the product array
  showdata(); // Refresh the data display
}

// Function to update a product's details
function updatedata(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal(); // Recalculate total for the selected product
  count.style.display = "none"; // Hide the count input field when updating
  category.value = datapro[i].category;
  submit.innerHTML = "Update"; // Change button text to "Update"
  mood = "updatedata"; // Change mode to "update"
  tmp = i; // Save the index for later reference
  window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top of the page
}

// Event listener for search by title
searchTitleButton.addEventListener("click", function() {
  let query = search.value.toLowerCase();
  let filteredData = datapro.filter(product => product.title.toLowerCase().includes(query));
  displayFilteredData(filteredData);
});

// Event listener for search by category
searchCategoryButton.addEventListener("click", function() {
  let query = search.value.toLowerCase();
  let filteredData = datapro.filter(product => product.category.toLowerCase().includes(query));
  displayFilteredData(filteredData);
});

// Function to display filtered data
function displayFilteredData(filteredData) {
  let table = "";
  for (let i = 0; i < filteredData.length; i++) {
    table += `
      <tr>
        <td>${i+1}</td>
        <td>${filteredData[i].title}</td>
        <td>${filteredData[i].price}</td>
        <td>${filteredData[i].taxes}</td>
        <td>${filteredData[i].ads}</td>
        <td>${filteredData[i].discount}</td>
        <td>${filteredData[i].total}</td>
        <td>${filteredData[i].category}</td>
        <td><button onclick="updatedata(${i})">Update</button></td>
        <td><button onclick="deletedata(${i})">Delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table; // Update the table with filtered data
}

// Call the showdata function on page load to display stored products
showdata();
