import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Trips } from '../../../api/trips/trips';

import './trip-join.html';

Template.trip_join.onCreated(function () {
  Template.instance().passengerType = new ReactiveVar();
  Template.instance().lodgingPlans = new ReactiveVar();

  Template.instance().passengerType.set('passenger');
  Template.instance().lodgingPlans.set(false);
});

Template.trip_join.helpers({
  driver() {
    return Template.instance().passengerType.get() === 'driver';
  },
  lodgingPlans() {
    return Template.instance().lodgingPlans.get() === 'true';
  },
});

Template.trip_join.events({
  'click [name="passengerType"]'(event, instance) {
    Template.instance().passengerType.set(event.target.value);
  },
  'click [name="lodgingPlans"]'(event, instance) {
    Template.instance().lodgingPlans.set(event.target.value);
  },
  'submit #trip-join-form'(event, instance) {
    event.preventDefault();

    const target = event.target;
    const userId = Meteor.userId(),
          leader = false,
          passengerType = target.passengerType.value,
          availableSeats = passengerType === 'driver' ? target.availableSeats.value : undefined,
          lodgingPlans = target.lodgingPlans.value === 'true' ? true : false,
          lodgingAddress1 = lodgingPlans ? target.lodgingAddress1.value : undefined,
          lodgingAddress2 = lodgingPlans ? target.lodgingAddress2.value : undefined,
          lodgingCity = lodgingPlans ? target.lodgingCity.value : undefined,
          lodgingState = lodgingPlans ? target.lodgingState.value : undefined,
          lodgingZipcode = lodgingPlans ? target.lodgingZipcode.value : undefined;

    const userObj = {
      userId,
      leader,
      passengerType,
      availableSeats,
      lodgingPlans,
      lodgingAddress1,
      lodgingAddress2,
      lodgingCity,
      lodgingState,
      lodgingZipcode,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Trips.update(this._id, {
      $push: { participants: userObj },
      $set: { updatedAt: new Date() },
    });

    Router.go('trip.details', {_id: this._id});

    return false;
  },
});
