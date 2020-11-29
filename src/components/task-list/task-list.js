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

        let { tasks/*, onDelete, onToggleImportant, onToggleDone*/ } = this.props;
        let tasksArr = tasks.map(({ title, id, state, }) => {
            return  <li key={ id } className={ state }>
                <Task title={ title }
                      /*onDelete = { () => onDelete(id) }
                      onToggleImportant={ () => onToggleImportant(id) }
                      onToggleDone={ () => onToggleDone(id) }*/
                />
            </li>;
        })


        return (
            <ul className="todo-list">
                { tasksArr }
            </ul>
        );
    }
}