import React, {Component} from 'react';
import Task from '../task'
import './task-list.css';

export default class TaskList extends Component {
    constructor() {
        super();

    }

    render() {
        let { tasks, toggleCompleted, onDelete, onEdit } = this.props;
        let tasksArr = tasks.map(({ title, id, state, }) => {
            let editForm = state === 'editing' ? 'block' : 'none';
            return  <li key={ id } className={ state }>
                <Task title={ title }
                      state = { state }
                      toggleCompleted={ ()=> toggleCompleted(id) }
                      onDelete = { () => onDelete(id) }
                      onEdit = { () => onEdit(id) }
                    /*onToggleImportant={ () => onToggleImportant(id) }
                      onToggleDone={ () => onToggleDone(id) }*/
                />
                <input type="text" class="edit" value="Editing task" display={ editForm }/>
            </li>;
        })


        return (
            <ul className="todo-list">
                { tasksArr }
            </ul>
        );
    }
}