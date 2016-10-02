import { Meteor } from 'meteor/meteor';
import { Trips } from '../../api/trips/trips';

Router.route('/', function () {
  this.render('app_body');
});

Router.route('/login', function () {
  this.render('app_blank', {
    name: 'login',
    data: {
      page: 'login',
    },
  });
});

Router.route('/register', function () {
  this.render('app_blank', {
    name: 'register',
    data: {
      page: 'register',
    },
  });
});

Router.route('/home', function () {
  this.render('app_body', {
    name: 'home',
    data: {
      page: 'home',
    },
  });
});

Router.route('/trip/new', function () {
  this.render('app_body', {
    data: {
      page: 'trip_create',
    },
  });
}, {
  name: 'trip.create',
});

Router.route('/trip/:_id', function () {
  Meteor.subscribe('trips', this.params._id);
  this.render('app_body', {
    data: {
      page: 'trip_details',
      trip: Trips.findOne(this.params._id),
    },
  });
}, {
  name: 'trip.details',
});

Router.route('/trip/:_id/join', function () {
  Meteor.subscribe('trips', this.params._id);
  this.render('app_body', {
    data: {
      page: 'trip_join',
      trip: Trips.findOne(this.params._id),
    },
  });
}, {
  name: 'trip.join',
});
