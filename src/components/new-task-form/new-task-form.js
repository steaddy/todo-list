import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {

    render() {
        return (
            <input className="new-todo" placeholder="What needs to be done first?" autofocus/>
        );
    }
}