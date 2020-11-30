import React, { Component } from 'react';
import TasksFilter from '../tasks-filter';
import './footer.css';

export default class Footer extends Component {

    render() {
        let { tasksRemain } = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">{ tasksRemain } items left</span>
                <TasksFilter/>
                <button className="clear-completed">Clear completed</button>
            </footer>
        );
    }
}