'use strict';

class Login {
  constructor() {
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");

    this.loginButton = document.querySelector("#login-button");
    this.messageContainer = document.querySelector(".message-container");
  }

  // handle the data "submit"
  submit = (event) => {
    event.preventDefault();

    const usersDB = db.getAllUsers();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    // Search the user in the localStorage DB
    const user = usersDB.find( (userObj) => {
      if (userObj.email === email && userObj.password === password) {
        return true;
      }
    })

    this.showMessage(user);
  }

  // show sucess or error message
  showMessage = (user) => {
    // empty the message container
    this.messageContainer.innerHTML = "";

    const message = document.createElement('p');

    // if user is logged in
    if (user) {
      message.innerHTML = `Welcome back, ${user.email}`;
      message.classList.add("correct-message");
    }
    else {
      message.innerHTML = 'Incorrect email or password';
    }
    this.messageContainer.appendChild(message);

    if (user) this.redirect();
  }

  redirect = () => {
    setTimeout( ()=> location.assign('index.html'), 2000);
  }

}

const login = new Login();

login.loginButton.addEventListener("click", login.submit);