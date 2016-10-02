import { Meteor } from 'meteor/meteor';
// import { ApiPassword } from 'meteor/miktam:api-password'

Router.route('/api/v1/login', {where: 'server'})
  .post(function () {
    var request = this.request;

    var response = this.response;
    var ok = false;
    if (ApiPassword.validate({email: request.body.email, password: request.body.password})) {
      ok = true;
    } else {
      ok = false;
    }
    this.response.setHeader('Content-Type', 'application/json');
    this.response.end(JSON.stringify(ok));
  });
