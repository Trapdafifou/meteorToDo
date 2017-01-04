import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './main.html';



Template.form.events({
    'click button'(event, template) {
        inputVal = template.find('#todo-input').value;
        if(inputVal) {
            todos.insert({todo: inputVal});
            inputVal = "";
        }else{
            alert('veuillez remplir le champs')
        }
    },
});

Template.list.helpers({
    todos(){
        return todos.find()
    },
    edited(){
        if(this.edit == 'edited'){
            return true;
        }
    }
});

Template.list.events({
    'click .alert'() {
        todos.remove(this._id)
    }
});

Template.list.events({
    'click .success'(event, template) {
        this.edit = 'edited';
    }
});
