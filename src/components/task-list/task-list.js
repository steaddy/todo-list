import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Task from '../task'
import './task-list.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class TaskList extends Component {

    static defaultProps = {
        tasks: [],
        toggleCompleted: () => {},
        onDelete: () => {},
        onEdit: () => {},
        onEditEnter: () => {},
        startTimer: () => {},
        getSpentTime: () => {},
        setSpentTime: () => {},
    };

    static propTypes = {
        tasks: PropTypes.arrayOf(PropTypes.object),
        toggleCompleted: PropTypes.func,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
        onEditEnter: PropTypes.func,
        startTimer: PropTypes.func,
        getSpentTime: PropTypes.func,
        setSpentTime: PropTypes.func,
    };

    render() {
        const {
            tasks,
            toggleCompleted,
            onDelete,
            onEdit,
            onEditEnter,
            startTimer,
            setSpentTime,
            getSpentTime
        } = this.props;
        const tasksArr = tasks.map(({ title, id, state, timeOfCreation, timeSpent }) => {
            const editForm = state === 'editing' ? 'block' : 'none';
            return  <li key={ id } className={ state }>
                <Task title={ title }
                      state = { state }
                      toggleCompleted={ ()=> toggleCompleted(id) }
                      onDelete = { () => onDelete(id) }
                      onEdit = { () => onEdit(id, title) }
                      timeOfCreation = { timeOfCreation }
                      timeSpent = { timeSpent }
                      startTimer = { () => startTimer(id) }
                      getSpentTime = { () => getSpentTime(id) }
                      setSpentTime = { (currentTime) => setSpentTime(id, currentTime) }
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

        if(!tasksArr.length) tasksArr.push((() => <li key='empty' style={{paddingLeft: '60px', lineHeight: '58px', height: '58px', fontSize: '24px', color: 'grey'}}>There are no tasks here</li>)());


        return (
            <ul className="todo-list">
                { tasksArr }
            </ul>
        );
    }
}