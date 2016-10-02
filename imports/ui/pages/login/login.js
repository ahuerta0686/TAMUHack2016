import { Template } from 'meteor/templating';

import './login.html';

Template.login.events({
  'submit #login-form'(event) {
    event.preventDefault();

    const target = event.target;
    const email = target.email.value;
    const password = target.password.value;

    Meteor.loginWithPassword(email, password, (err) => {
      if (typeof err != 'undefined') {
        console.log(err);
      } else {
        Router.go('home');
      }
    });

    return false;
  },
});