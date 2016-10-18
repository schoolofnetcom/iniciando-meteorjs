import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
    const Contact = new Mongo.Collection('contacts');
  // code to run on server at startup
});
