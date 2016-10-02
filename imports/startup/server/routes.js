import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Router.route('/api/v1/login', {where: 'server'})
//   .post(function () {
//     var request = this.request;

//     Meteor.loginWithPassword(request.email, request.password,
//     (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         this.response.setHeader('Content-Type', 'application/json');
//         this.response.end(JSON.stringify(response));
//       }
//     });

//   });