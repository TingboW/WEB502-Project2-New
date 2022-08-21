/* ------ RANDOM CODES ------ */

// Function to generate combination of characters

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

// Function to disable button

function disableButton(btnvalue) {
  document.getElementById("contact-submit").disabled = btnvalue;
  if (btnvalue == true) {
    document.getElementById("contact-submit").style.backgroundColor = "#c1eb8a";
    document.getElementById("contact-submit").style.color =
      "rgba(255,255,255,0.6)";
  } else {
    document.getElementById("contact-submit").style.backgroundColor = "#8cc63f";
    document.getElementById("contact-submit").style.color =
      "rgba(255,255,255,1)";
  }
}

var firstname1 = document.getElementById("firstname");
firstname1.addEventListener("input", evaluateCode);

var lastname1 = document.getElementById("lastname");
lastname1.addEventListener("input", evaluateCode);

var street1 = document.getElementById("street");
street1.addEventListener("input", evaluateCode);

var city1 = document.getElementById("city");
city1.addEventListener("input", evaluateCode);

var state1 = document.getElementById("state");
state1.addEventListener("input", evaluateCode);

var country1 = document.getElementById("country");
country1.addEventListener("input", evaluateCode);

var zip1 = document.getElementById("zip");
zip1.addEventListener("input", evaluateCode);

var phone1 = document.getElementById("phone");
phone1.addEventListener("input", evaluateCode);

var email1 = document.getElementById("email");
email1.addEventListener("input", evaluateCode);

var codebox = document.getElementById("codeentered");
codebox.addEventListener("input", evaluateCode);

function evaluateCode() {
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let street = document.getElementById("street").value;
  let city = document.getElementById("city").value;
  let state = document.getElementById("state").value;
  let country = document.getElementById("country").value;
  let zip = document.getElementById("zip").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  getCode = document.getElementById("codeentered").value;
  var charset1 = getCode.trim();
  var charset2 = code.trim();

  if (
    charset1.length == charset2.length &&
    charset1 == charset2 &&
    firstname.length != 0 &&
    lastname.length != 0 &&
    street.length != 0 &&
    city.length != 0 &&
    state.length != 0 &&
    country.length != 0 &&
    zip.length == 5 &&
    phone.length == 10 &&
    email.length != 0
  ) {
    disableButton(false);
  }
}

disableButton();
