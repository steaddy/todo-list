import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class NewTaskForm extends Component {

    static defaultProps = {
        addNewTask: () => {
        }
    }

    static propTypes = {addNewTask: PropTypes.func};

    render() {
        const {addNewTask} = this.props;
        return (
            <form className='new-todo-form'>
                <input className="new-todo" placeholder="What needs to be done?"
                       onKeyDown={(e) => {
                           const min = document.querySelector(".new-todo-form__timer--min");
                           const sec = document.querySelector(".new-todo-form__timer--sec");
                           if (e.key === 'Enter') {
                               addNewTask(e.target.value, min.value, sec.value);
                               e.target.value = '';
                               min.value = '';
                               sec.value = '';
                           }
                       }}
                />
                <input className="new-todo-form__timer new-todo-form__timer--min" placeholder="Min" pattern="[0-9]"/>
                    <input className="new-todo-form__timer new-todo-form__timer--sec" placeholder="Sec" />
            </form>
    );
    }
    }