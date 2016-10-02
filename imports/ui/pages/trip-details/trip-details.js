import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './trip-details.html';

Template.trip_details.onCreated(function () {
  
});

Template.trip_details.helpers({
  joined() {
    if (Meteor.user()) {
      var user = this.participants.find((participant) => {
        return participant.userId === Meteor.userId();
      });
      if (typeof user != 'undefined') {
        return true;
      }
    }

    return false;
  },
});
