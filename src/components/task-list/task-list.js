import React, {Component} from 'react';
import Task from '../task'
import './task-list.css';

export default class TaskList extends Component {

    render() {

        /*
        let { tasks, onDelete, onToggleImportant, onToggleDone } = this.props;
        let tasksArr = tasks.map(({ id, ...itemProps }) => {
            return  <li key={ id }>
                        <Task { ...itemProps }
                              onDelete = { () => onDelete(id) }
                              onToggleImportant={ () => onToggleImportant(id) }
                              onToggleDone={ () => onToggleDone(id) }
                        />
                    </li>;
        })
        */



        return (
            <ul className="todo-list">
                <li className="completed">
                    <div className="view">
                        <input className="toggle" type="checkbox"/>
                        <label>
                            <span className="description">Completed task</span>
                            <span className="created">created 17000 seconds ago</span>
                        </label>
                        <button className="icon icon-edit"></button>
                        <button className="icon icon-destroy"></button>
                    </div>
                </li>
                <li className="editing">
                    <div className="view">
                        <input className="toggle" type="checkbox"/>
                        <label>
                            <span className="description">Editing task из листа</span>
                            <span className="created">created 5 minutes ago</span>
                        </label>
                        <button className="icon icon-edit"></button>
                        <button className="icon icon-destroy"></button>
                    </div>
                    <input type="text" className="edit" value="Editing task"/>
                </li>
                <Task />
            </ul>
        );
    }
}