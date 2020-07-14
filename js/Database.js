'use strict';

class Database {
  getAllUsers = () => {
    // get the array of users stringified
    const usersStr = localStorage.getItem('users');

    if(!usersStr) {
      console.log('nothing in localStorage')
      return [];
    } else {
      // parse the string to get an array
      const usersArr = JSON.parse(usersStr);
      return usersArr;
    }
  }

  saveNewUser = (newUser) => {
    // get the array of users
    const usersArr = this.getAllUsers();
    // add the new user to it
    usersArr.push(newUser);
    // stringify the modified array
    const usersStr = JSON.stringify(usersArr);
    // save it into localStorage
    localStorage.setItem('users', usersStr);
  }
}

const db = new Database();