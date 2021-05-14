import React, {Component} from 'react';
import TasksFilter from '../tasks-filter';
import './footer.css';

export default class Footer extends Component {

    render() {
        const {tasksRemain, filter, onFilterChange, onClearCompleted} = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">{tasksRemain} items left</span>
                <TasksFilter
                    filter={filter}
                    onFilterChange={onFilterChange}
                />
                <button
                    className="clear-completed"
                    onClick={() => onClearCompleted()}
                >Clear completed</button>
            </footer>
        );
    }
}