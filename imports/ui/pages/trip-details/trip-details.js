import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Trips } from '../../../api/trips/trips';

import './trip-details.html';

Template.trip_details.onCreated(function () {
  Meteor.subscribe('users');
});

Template.trip_details.helpers({
  driver(passengerType) {
    if (passengerType) {
      return passengerType === 'driver';
    } else {
      if (Meteor.user()) {
        var userParticipant = this.participants.find((participant) => {
          return participant.userId === Meteor.userId();
        });

        if (userParticipant && userParticipant.passengerType === 'driver') {
          return true;
        } else {
          return false;
        }
      }
    }
  },
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
  leader() {
    if (Meteor.user()) {
      var userParticipant = this.participants.find((participant) => {
        return participant.userId === Meteor.userId();
      });

      if (userParticipant && userParticipant.leader) {
        return true;
      } else {
        return false;
      }
    }
  },
  userEmail(userId) {
    var user = Meteor.users.findOne(userId);
    return user.emails[0].address;
  },
  userFullName(userId) {
    var user = Meteor.users.findOne(userId);
    return user.profile.firstName + " " + user.profile.lastName;
  },
});

Template.trip_details.events({
  'click #general-leave-trip'(event, instance) {
    if (Meteor.user()) {
      Trips.update(this._id, {
        $pull: {participants: { userId: Meteor.userId() } }
      });

      Router.go('home');
    }
  },
  'click #leader-assign-trip'(event, instance) {
    if (Meteor.user()) {
      var userParticipant = this.participants.find((participant) => {
        return participant.userId === Meteor.userId();
      });

      if (userParticipant.leader) {
        // Do logic for assigning carpools
        var carSeats = [];
        var currentCar = 1;

        // Assign car numbers
        this.participants.forEach((participant) => {
          if (participant.passengerType === 'driver') {
            carSeats.push(participant.availableSeats);
            participant.carNo = carSeats.length;
          }
        });

        // Assign passengers
        this.participants.forEach((participant) => {
          if (participant.passengerType === 'passenger') {
            if (carSeats.length > 0) {
              participant.carNo = currentCar;
              carSeats[0] -= 1;
              if (carSeats[0] <= 0) {
                carSeats.splice(0, 1);
                currentCar += 1;
              }
            } else {
              participant.carNo = -1;
            }
          }
        });

        // Update trip
        Trips.update(this._id, {
          $set: {participants: this.participants, status: 'Pre-Trip'},
        });
      }
    }
  },
  'click #leader-delete-trip'(evet, instance) {
    if (Meteor.user()) {
      var userParticipant = this.participants.find((participant) => {
        return participant.userId === Meter.userId();
      });

      if (userParticipant.leader) {
        Trips.remove(this._id);
        Router.go('home');
      }
    }
  },
});
