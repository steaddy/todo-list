import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {

    render() {
        let { addNewTask } = this.props;
        return (
            <input className="new-todo" placeholder="What needs to be done first?" autoFocus
            onKeyDown={ (e) => {
                if(e.key === 'Enter') {
                    addNewTask(e.target.value);
                    e.target.value = '';
                }
            } }
            />
        );
    }
}