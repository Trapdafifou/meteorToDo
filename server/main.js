import {Meteor} from 'meteor/meteor';


Meteor.startup(function () {
        if (!todos.find().count()) {
            todos.insert({todo: "code"})
        }
    }
);
