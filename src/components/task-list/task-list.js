import React, {Component} from 'react';
import Task from '../task'
import './task-list.css';

export default class TaskList extends Component {
    constructor() {
        super();

    }

    render() {
        let { toggleCompleted } = this.props;

        let { tasks/*, onDelete, onToggleImportant, onToggleDone*/ } = this.props;
        let tasksArr = tasks.map(({ title, id, state, }) => {
            return  <li key={ id } className={ state }>
                <Task title={ title }
                      toggleCompleted={ ()=> toggleCompleted(id) }
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