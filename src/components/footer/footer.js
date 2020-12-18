import React, { Component } from 'react';
import TasksFilter from '../tasks-filter';
import './footer.css';

export default class Footer extends Component {

    render() {
        let { tasksRemain, filter, onFilterChange } = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">{ tasksRemain } items left</span>
                <TasksFilter filter={filter} onFilterChange={onFilterChange}/>
                <button className="clear-completed">Clear completed</button>
            </footer>
        );
    }
}