import { Mongo } from 'meteor/mongo';

export const Trips = new Mongo.Collection('trips');

if (Meteor.isServer) {
  Meteor.publish('trips', function (tripId) {
    return Trips.find({
      $or: [
        { _id: tripId },
        { participants: { $elemMatch: {userId: this.userId} } },
      ],
    });
  });
}
