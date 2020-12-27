import React, {Component} from 'react';
import Task from '../task'
import './task-list.css';

export default class TaskList extends Component {
    static defaultProps = {tasks: []};

    render() {
        let {
            tasks,
            toggleCompleted,
            onDelete,
            onEdit,
            onEditEnter
        } = this.props;
        let tasksArr = tasks.map(({ title, id, state, timeOfCreation }) => {
            let editForm = state === 'editing' ? 'block' : 'none';
            return  <li key={ id } className={ state }>
                <Task title={ title }
                      state = { state }
                      toggleCompleted={ ()=> toggleCompleted(id) }
                      onDelete = { () => onDelete(id) }
                      onEdit = { () => onEdit(id, title) }
                      timeOfCreation = { timeOfCreation }
                />
                <input type="text" className="edit" placeholder="Edit task"
                       display={ editForm }


                       defaultValue={title}
                       onKeyDown={ (e) => {
                           if(e.key === "Enter") onEditEnter(e.target.value, id)
                       } }
                />
            </li>;
        });

        if(!tasksArr.length) tasksArr.push((() => <li key='empty' style={{paddingLeft: '60px', lineHeight: '58px', height: '58px', fontSize: '24px', color: 'grey'}}>There is no tasks here</li>)());


        return (
            <ul className="todo-list">
                { tasksArr }
            </ul>
        );
    }
}