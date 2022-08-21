// Captcha

var code = "";
var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
var btnvalue;
var getCode = "";

function generateCode() {
  for (let i = 1; i <= 8; i++) {
    var char = Math.random() * str.length;
    code += str.charAt(char);
  }

  return code;
}

document.getElementById("codes").innerHTML = generateCode();

// Form Validation

function checkFirstName(value) {
  if (value.trim() == "") {
    var tag = document.createElement("p");
    var text = document.createTextNode("Please enter your first name");
    tag.appendChild(text);
    var element = document.getElementById("errorname");
    element.appendChild(tag);
  }
}

function checkLastName(value) {
  if (value.trim() == "") {
    var tag = document.createElement("p");
    var text = document.createTextNode("Please enter your last name");
    tag.appendChild(text);
    var element = document.getElementById("errorname");
    element.appendChild(tag);
  }
}

function checkStreet(value) {
  if (value.trim() == "") {
    var tag = document.createElement("p");
    var text = document.createTextNode("Please enter your street");
    tag.appendChild(text);
    var element = document.getElementById("errorname");
    element.appendChild(tag);
  }
}

function checkCity(value) {
  if (value.trim() == "") {
    var tag = document.createElement("p");
    var text = document.createTextNode("Please enter your city");
    tag.appendChild(text);
    var element = document.getElementById("errorname");
    element.appendChild(tag);
  }
}

function checkState(value) {
  if (value.trim() == "") {
    var tag = document.createElement("p");
    var text = document.createTextNode("Please enter your state");
    tag.appendChild(text);
    var element = document.getElementById("errorname");
    element.appendChild(tag);
  }
}

function checkCountry(value) {
  if (value.trim() == "") {
    var tag = document.createElement("p");
    var text = document.createTextNode("Please enter your country");
    tag.appendChild(text);
    var element = document.getElementById("errorname");
    element.appendChild(tag);
  }
}

function checkZip(value) {
  if (value.trim() == "" || value.length != 5) {
    var tag = document.createElement("p");
    var text = document.createTextNode("Please enter a valid zip code");
    tag.appendChild(text);
    var element = document.getElementById("errorname");
    element.appendChild(tag);
  }
}

function checkPhone(value) {
  if (value.trim() == "" || value.length != 10) {
    var tag = document.createElement("p");
    var text = document.createTextNode("Please enter a valid phone number");
    tag.appendChild(text);
    var element = document.getElementById("errorname");
    element.appendChild(tag);
  }
}

function checkEmail(value) {
  if (value.trim() == "") {
    var tag = document.createElement("p");
    var text = document.createTextNode("Please enter your email");
    tag.appendChild(text);
    var element = document.getElementById("errorname");
    element.appendChild(tag);  }
}

function checkRandomCode(value) {
  var charset1 = value.trim();
  var charset2 = code.trim();

  if (charset1 != charset2 || value.trim() == "") {
    var tag = document.createElement("p");
    var text = document.createTextNode("Please enter correct code as seen");
    tag.appendChild(text);
    var element = document.getElementById("errorname");
    element.appendChild(tag);
  }
}
