// Get the modal
var container = document.getElementById("loginBox");
var loginContent = document.getElementById("loginContent");
var profileContent = document.getElementById("profileContent");
var profileMenu = document.getElementById("profileMenu");

// Get the button that opens the modal
var login = document.getElementById("loginBtn");
var register = document.getElementById("registerBtn");
var profile = document.getElementById("profileBtn");
var profileLink = document.getElementById("profileLink");
var logoutLink = document.getElementById("logoutLink");
var close1 = document.getElementById("close1");
var close2 = document.getElementById("close2");

// When the user clicks on the button, open the modal
login.onclick = function() {
  container.style.display = "block";
  loginContent.style.display = "block";
  document.getElementById("loginTab").click();
}
registerBtn.onclick = function() {
  container.style.display = "block";
  loginContent.style.display = "block";
  document.getElementById("registerTab").click();
}

// When the user clicks on <span> (x), close the modal
close1.onclick = function() {
  container.style.display = "none";
  loginContent.style.display = "none";
  profileContent.style.display = "none";
}
close2.onclick = function() {
  container.style.display = "none";
  loginContent.style.display = "none";
  profileContent.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == container) {
    container.style.display = "none";
    loginContent.style.display = "none";
    profileContent.style.display = "none"; 
  }
}

// Tab function
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  };

// Registration form function
const regForm = document.getElementById('reg-form')
regForm.addEventListener('submit', registerUser)

async function registerUser(event) {
  event.preventDefault()
  const username = document.getElementById('r-username').value
  const password = document.getElementById('r-password').value
  const firstname = document.getElementById('r-firstname').value
  const lastname = document.getElementById('r-lastname').value
  const email = document.getElementById('r-email').value


  const result = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      firstname,
      lastname,
      email
    })
  }).then((res) => res.json())

  if (result.status === 'ok') {
    // everything went fine
    alert('You have now been signed up. Please log in.')
    document.getElementById("loginBtn").click();
  } else {
    localStorage.clear();
    alert(result.error)
  }
}

// Login form function
const loginForm = document.getElementById('login-form')
loginForm.addEventListener('submit', loginUser)

async function loginUser(event) {
  event.preventDefault()
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const result = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then((res) => res.json())

  if (result.status === 'ok') {
    // everything went fine
    // console.log('Got the token: ', parseJwt(result.data))
    localStorage.setItem('token', result.data)
    // alert('Success')
    
    // Close login form
    container.style.display = "none";
    loginContent.style.display = "none";
    profileContent.style.display = "none";

    // switch login/profile UI
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    profileMenu.style.display = "block"; 

    document.getElementById("username-nav").innerText = parseJwt(result.data).firstname;

    let greetName = parseJwt(localStorage.getItem('token')).firstname;
    document.getElementById("welcome-message").innerText = `Good ${timeOfDay()}, ${greetName}. Welcome back!`;
    document.getElementById("welcome-container").style.display = "flex";
  } else {
    const errorMessage = document.getElementById("login-error-message");
    localStorage.clear();
    errorMessage.innerText = result.error;
    errorMessage.style.display = 'block';
  }
}

// Get profile page

profile.addEventListener('click', getUser);
profileLink.addEventListener('click', getUser);

async function getUser(event) {
  event.preventDefault()

  const result = await fetch('/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('token')
    })
  }).then((res) => res.json())

  if (result.status === 'ok') {

    container.style.display = "block"
    profileContent.style.display = "block"

    let profileInfo = parseJwt(localStorage.getItem('token'));
    document.getElementById("p-firstname").value = profileInfo.firstname
    document.getElementById("p-lastname").value = profileInfo.lastname
    document.getElementById("p-email").value = profileInfo.email
    document.getElementById("p-username").value = profileInfo.username

  } else {
    alert(result.error)
    localStorage.clear();
    window.location.reload(false);
  }
}

// Logout
logoutLink.addEventListener('click', logout);

async function logout(event) {
  event.preventDefault()

  const result = await fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())

  if (result.status === 'ok') {
    // everythign went fine
    // alert('Success')
    alert("Successfully logged out");
    localStorage.clear();
    window.location.reload(false);

  } else {
    alert(result.error);
    localStorage.clear();
    window.location.reload(false);
  }
}

// Decode JWT token
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// Get user
try {

  // switch login/profile UI
  loginBtn.style.display = "none";
  registerBtn.style.display = "none";
  profileMenu.style.display = "block"; 

  // check if session has expired
  if(Math.round(Date.now()/1000) >= parseInt(parseJwt(localStorage.getItem('token')).exp)){
    alert("Your session has expired. Please log in again to continue");
    localStorage.clear();
    window.location.reload(false);
  }

} catch (e) {
  // switch login/profile UI
  loginBtn.style.display = "block";
  registerBtn.style.display = "block";
  profileMenu.style.display = "none"; 
}