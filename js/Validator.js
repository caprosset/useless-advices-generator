'use strict';

class Validator {
  constructor() {
    this.invalidEmailError = 'Please insert a valid email address';
    this.emailExistsError = 'This email address already exists';
    this.passwordError = 'Insert a password with 6 or more characters';
    this.repeatPasswordError = 'The fields do not match';
  
    this.errors = {}
  }

  validateEmail = (email) => {
    if(this.emailIsValid(email)){
      delete this.errors.invalidEmailError;
    } else {
      this.errors.invalidEmailError = this.invalidEmailError;
    }
  }

  // handler function of validateEmail()
  emailIsValid = (email) => {
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    const isValid = emailRegEx.test(email);
    return isValid;      
  }

  validateUniqueEmail = (email) => {
    const usersDB = db.getAllUsers();
    let emailIsUnique = true;

    if(usersDB.length > 0) {
      usersDB.forEach( userObj => {
        if(userObj.email === email) {
          emailIsUnique = false;
        }
      });

      if(emailIsUnique) {
        delete this.errors.emailExistsError;
      } else {
        this.errors.emailExistsError = this.emailExistsError;
      }
    }
  }

  validatePassword = (password) => {
    if(password.length > 5) {
      delete this.errors.passwordError;
    } else {
      this.errors.passwordError = this.passwordError;
    }
  }

  validatePasswordRepeat = (password, repeatPassword) => {
    if(password === repeatPassword) {
      delete this.errors.repeatPasswordError;
    } else {
      this.errors.repeatPasswordError = this.repeatPasswordError;
    }
  }

  getErrors = () => {
    return this.errors;
  }
}

const validator = new Validator();