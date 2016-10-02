import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Trips } from '../../../api/trips/trips';

import './home.html';

Template.home.onCreated(function () {
  Meteor.subscribe('trips');
});

Template.home.helpers({
  trips() {
    return Trips.find({});
  },
});
