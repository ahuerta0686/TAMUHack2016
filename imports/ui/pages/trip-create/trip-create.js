import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Trips } from '../../../api/trips/trips';

import './trip-create.html';

Template.trip_create.onCreated(function () {
  Template.instance().roundTrip = new ReactiveVar();
  Template.instance().passengerType = new ReactiveVar();
  Template.instance().lodgingPlans = new ReactiveVar();

  Template.instance().roundTrip.set(false);
  Template.instance().passengerType.set('passenger');
  Template.instance().lodgingPlans.set(false);
});

Template.trip_create.helpers({
  roundTrip() {
    return Template.instance().roundTrip.get();
  },
  driver() {
    return Template.instance().passengerType.get() === 'driver';
  },
  lodgingPlans() {
    return Template.instance().lodgingPlans.get() === 'true';
  },
});

Template.trip_create.events({
  'click [name="roundTrip"]'(event, instance) {
    instance.roundTrip.set(event.target.checked);
  },
  'click [name="passengerType"]'(event, instance) {
    instance.passengerType.set(event.target.value);
  },
  'click [name="lodgingPlans"]'(event, instance) {
    instance.lodgingPlans.set(event.target.value);
  },
  'submit #trip-form'(event, instance) {
    event.preventDefault();

    const target = event.target;
    const title = target.title.value,
          departureDate = target.departureDate.value,
          registrationDeadline = target.registrationDeadline.value,
          roundTrip = target.roundTrip.checked,
          returnDate = roundTrip ? target.returnDate.value : undefined
          status = 'Planning';

    const userId = Meteor.userId(),
          leader = true,
          passengerType = target.passengerType.value,
          availableSeats = passengerType === 'driver' ? target.availableSeats.value : undefined,
          lodgingPlans = target.lodgingPlans.value === 'true' ? true : false,
          lodgingAddress1 = lodgingPlans ? target.lodgingAddress1.value : undefined,
          lodgingAddress2 = lodgingPlans ? target.lodgingAddress2.value : undefined,
          lodgingCity = lodgingPlans ? target.lodgingCity.value : undefined,
          lodgingState = lodgingPlans ? target.lodgingState.value : undefined,
          lodgingZipcode = lodgingPlans ? target.lodgingZipcode.value : undefined;

    const leaderObj = {
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

    const tripObj = {
      title,
      departureDate,
      registrationDeadline,
      roundTrip,
      returnDate,
      status,
      participants: [leaderObj],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    var tripId = Trips.insert(tripObj);

    Router.go('trip.details', {_id: tripId});
    // Router.go('home');

    return false;
  },
});
