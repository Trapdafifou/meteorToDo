import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './main.html';


// FORM TEMPLATE HELPER/EVENTS
Template.form.events({
    'click button'(event, template) {
        inputVal = template.find('#todo-input').value;
        if(inputVal) {
            todos.insert({todo: inputVal, edited:false});
            template.find('#todo-input').value = "";
        }else{
            alert('veuillez remplir le champs')
        }
    },
});


// LIST TEMPLATE HELPER/EVENT
Template.list.helpers({
    todos(){
        return todos.find()
    },
    edited(){
        const isEdited = todos.findOne( this._id, { fields:{edited:1} } );
        return isEdited.edited;
    }
});


var cachedTodo = "";

Template.list.events({
    'click .delete'() {
        todos.remove(this._id)
    }
});

Template.list.events({
    'click .update'(event, template) {
        cachedTodo = this.todo;
        this.edited = true;
       todos.update(this._id, { $set:{  edited:true }});
    }
});


Template.list.events({
    'click .val-update'(event, template) {
        todos.update(this._id, {$set :{ todo:template.find('#todo-update-input').value , edited:false}})
    }
})

Template.list.events({
    'click .cancel'(event, template) {
        todos.update(this._id, {$set :{ todo:cachedTodo , edited:false}})
    }
})