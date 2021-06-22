function add() {
  var table = document.getElementById("table");
  var row = table.insertRow(-1);
  var fname = document.getElementById("fname");
  var age = document.getElementById("age");
  var city = document.getElementById("city");

  if (fname.value === "") {
    alert("Enter your name!");
    return;
  }

  if (fname.value.length > 11) {
    alert("Your FirstName should not be more than 10 alphabets");
    return;
  }

  if (isNaN(age.value) || age.value === "") {
    alert("Enter your age!");
    return;
  }
  if (age.value <= 9 || age.value >= 51) {
    alert("Your age should be between 10 to 50");
    return;
  }
  if (city.value === "") {
    alert("enter your city!");
    return;
  }
  var gender;
  if (document.getElementById("male").checked) {
    gender = document.getElementById("male");
  } else if (document.getElementById("female").checked) {
    gender = document.getElementById("female");
  } else if (document.getElementById("other").checked) {
    gender = document.getElementById("other");
  } else {
    alert("you should choose your gender!");
    return;
  }
  row.id = fname.value.toUpperCase();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = fname.value.toUpperCase();
  cell2.innerHTML = gender.value;
  cell3.innerHTML = age.value;
  cell4.innerHTML = city.value;
  cell5.innerHTML = `<button onclick="update('${fname.value.toUpperCase()}')">Update</button> /<button onclick='remove(this)'>Remove</button>`;
}
function update(id) {
  document.getElementById("update1").disabled = false;
  let tr = document.getElementById(id);
  console.log(id);
  let name = tr.children[0].innerHTML;
  let gender = tr.children[1].innerHTML;
  let age = tr.children[2].innerHTML;
  let city = tr.children[3].innerHTML;
  let action = tr.children[4].innerHTML;

  document.getElementById("fname").value = name;
  document.getElementById("age").value = age;
  document.getElementById("city").value = city;

  switch (gender) {
    case "male":
      document.getElementById("male").checked = true;
      break;
    case "female":
      document.getElementById("female").checked = true;
      break;
    case "other":
      document.getElementById("other").checked = true;
      break;
  }

  let addButton = document.getElementById("add1");
  addButton.setAttribute("value", "Cancel");
  addButton.setAttribute("onclick", "cancel()");

  document
    .getElementById("update1")
    .setAttribute("onclick", `update2(${name})`);
}

function remove(r) {
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("table").deleteRow(i);
}
function update2(id) {
  console.log(id);
  var tr = id;
  tr.children[0].innerHTML = document.getElementById("fname").value;
  var gender;
  if (document.getElementById("male").checked) {
    gender = document.getElementById("male");
  } else if (document.getElementById("female").checked) {
    gender = document.getElementById("female");
  } else if (document.getElementById("other").checked) {
    gender = document.getElementById("other");
  } else {
    alert("Please choose your gender!");
    return;
  }
  tr.children[1].innerHTML = gender.value;
  tr.children[2].innerHTML = document.getElementById("age").value;
  tr.children[3].innerHTML = document.getElementById("city").value;
  tr.children[4].innerHTML = `<button onclick="update('${fname.value}')">Update</button> /<button onclick='remove(this)'>Remove</button>`;

  document.getElementById("add1").setAttribute("value", "add");
  document.getElementById("add1").setAttribute("onclick", "add()");
  document.getElementById("update1").disabled = true;
}
function cancel() {
  document.getElementById("resetform").click();
  document.getElementById("add1").setAttribute("value", "add");
  document.getElementById("add1").setAttribute("onclick", "add()");
  document.getElementById("update1").disabled = true;
}
