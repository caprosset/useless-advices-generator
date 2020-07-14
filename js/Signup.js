'use strict';

class Signup {
  constructor() {
    this.usernameInput = document.querySelector('#username');
    this.emailInput = document.querySelector('#email');
    this.passwordInput = document.querySelector('#password');
    this.repeatPasswordInput = document.querySelector('#repeat-password');

    this.submitButton = document.querySelector('#signup-button');
    this.messageContainer = document.querySelector('.message-container');
  }

  handleEmailInput = (e) => {
    const email = e.target.value;

    // validate the email input
    validator.validateEmail(email);

    // if email is valid, check it is unique
    const errorsObj = validator.getErrors();
    if(!errorsObj.invalidEmailError) {
      validator.validateUniqueEmail(email);
    }

    this.setErrorMessages();
    this.controlSignupButton();
  }

  handlePasswordInput = (e) => {
    const password = e.target.value;
    const passwordRepeat = this.repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validatePasswordRepeat(password, passwordRepeat);

    this.setErrorMessages();
    this.controlSignupButton();
  }

  handleRepeatPasswordInput = (e) => {
    const password = e.target.value;
    const passwordRepeat = this.passwordInput.value;

    validator.validatePassword(password);
    validator.validatePasswordRepeat(password, passwordRepeat);

    this.setErrorMessages();
    this.controlSignupButton();
  }

  saveData = (e) => {
    e.preventDefault();

    // grab the value of each input
    const username = this.usernameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const repeatPassword = this.repeatPasswordInput.value;

    // create a new user
    const newUser = new User(username, email, password, repeatPassword);

    // and save it to the DB if no errors
    db.saveNewUser(newUser);

    // empty the form
    this.usernameInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.repeatPasswordInput.value = "";
    this.submitButton.disabled = true;

    this.showSuccessMessage();
    this.removeMessages();
  }

  addListeners = (e) => {
    // listen to the input changes and button click
    this.emailInput.addEventListener('input', this.handleEmailInput);
    this.passwordInput.addEventListener('input', this.handlePasswordInput);
    this.repeatPasswordInput.addEventListener('input', this.handleRepeatPasswordInput);

    this.submitButton.addEventListener('click', this.saveData);
  }

  setErrorMessages = () => {
    // empty the message container div
    this.messageContainer.innerHTML = "";

    // get the errors obj and convert it to a str array
    const errorsObj = validator.getErrors();
    const errorsStrArr = Object.values(errorsObj);
    // for each error in the errors strings array, create and display a new paragraph with the error
    errorsStrArr.forEach(errorStr => {
      const errorMsgP = document.createElement('p');
      errorMsgP.innerHTML = errorStr;
      this.messageContainer.appendChild(errorMsgP);
    })
  }

  controlSignupButton = () => {
    const errorsObj = validator.getErrors();
    const errorsStrArr = Object.values(errorsObj);

    if(errorsStrArr.length > 0) {
      this.submitButton.disabled = true;
    } else {
      this.submitButton.disabled = false;
    }
  }

  showSuccessMessage = (e) => {
    // empty the message container div
    this.messageContainer.innerHTML = "";
    
    // if there is an error, do nothing
    const errorsObj = validator.getErrors();
    const errorsStrArr = Object.values(errorsObj);
    if(errorsStrArr.length > 0) {
      return;
    }

    // else, add a success message to the message container
    const successMessageP = document.createElement('p');
    successMessageP.innerHTML = "You have signed up successfully";
    this.messageContainer.appendChild(successMessageP);
  }

  removeMessages = () => {
    setTimeout( () => {
      this.messageContainer.innerHTML = "";
    }, 2000)
  }
}

const signup = new Signup();

window.addEventListener("load", signup.addListeners );