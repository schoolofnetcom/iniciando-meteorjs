import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';


const Contact = new Mongo.Collection('contacts');

FlowRouter.route('/contact/add', {
    action: () => {
        BlazeLayout.render('main', {
            content: 'addContact'
        });
    }
});

FlowRouter.route('/', {
    action: () => {
        BlazeLayout.render('main', {
            content: 'listContact'
        })
    }
});

FlowRouter.route('/:id', {
    action: () => {
        BlazeLayout.render('main', {
            content: 'uniqueContact'
        });
    }
});

FlowRouter.route('/edit/:id', {
    action: () => {
        BlazeLayout.render('main', {
            content: 'editContact'
        })
    }
});

FlowRouter.route('/remove/:id', {
    action: () => {
        var id = FlowRouter.getParam('id');
        Contact.remove(id);
        FlowRouter.go('/')
    }
});

Template.addContact.events({
    'click #saveContact': (event, template) => {
        event.preventDefault();

        let contact = $('form[name="formAddContact"]').serializeJSON();

        // let contact = {
        //     name: template.find('input[name="name"]').value,
        //     lastname: template.find('input[name="lastname"]').value,
        //     telephone: template.find('input[name="telephone"]').value
        // };

        Contact.insert(contact);
    }
});

Template.listContact.helpers({
    list: () => {
        return Contact.find();
    }
});

Template.uniqueContact.helpers({
    unique: () => {
        var id = FlowRouter.getParam('id');

        return Contact.findOne({
            _id: id
        });
    }
});

Template.editContact.helpers({
    data: () => {
        var id = FlowRouter.getParam('id');

        return Contact.findOne({
            _id: id
        });
    }
});

Template.editContact.events({
    'click #editContact': (event, template) => {
        var id = FlowRouter.getParam('id');
        let contact = $('form[name="formEditContact"]').serializeJSON();

        event.preventDefault();

        Contact.update({
            _id: id
        }, contact);
    }
});