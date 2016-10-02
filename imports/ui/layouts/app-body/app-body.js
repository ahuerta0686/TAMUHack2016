import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './app-body.html';

import '../../pages/home/home';
import '../../pages/trip-details/trip-details';
import '../../pages/trip-join/trip-join';

Template.app_body.helpers({
  userEmail() {
    if (Meteor.user()) {
      return Meteor.user().emails[0].address;
    } else {
      return undefined;
    }
  }
});

Template.app_body.events({
  'click #logout-btn'(event) {
    if (Meteor.user()) {
      Meteor.logout((err) => {
        if (typeof err != 'undefined') {
          console.log(err);
        } else {
          Router.go('home');
        }
      });
    }
  },
});