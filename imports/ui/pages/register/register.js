import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import './register.html';

Template.register.events({
  'submit #register-form'(event) {
    event.preventDefault();

    const target = event.target;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const email = target.email.value;
    const password = target.password.value;
    const passwordConfirm = target.passwordConfirm.value ;

    if (password == passwordConfirm) {
      Accounts.createUser({
        email,
        password,
        profile: {firstName, lastName},
      },
      (err) => {
        if (typeof err != 'undefined') {
          console.log(err);
        } else {
          Router.go('home');
        }
      });
    }

    return false;
  },
});