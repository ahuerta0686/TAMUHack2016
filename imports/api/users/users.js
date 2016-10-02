import { Meteor } from 'meteor/meteor';

Meteor.users.helpers({
  fullName() {
    return this.profile.firstName + this.profile.lastName;
  },
});

if (Meteor.isServer) {
  Meteor.publish('users', function () {
    return Meteor.users.find({});
  });
}
