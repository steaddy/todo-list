import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

const NewTaskForm = props => {

        const { addNewTask } = props;
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
                <input className="new-todo-form__timer new-todo-form__timer--sec" placeholder="Sec"/>
            </form>
        );
};

NewTaskForm.defaultProps = {addNewTask: () => {}};

NewTaskForm.propTypes = {addNewTask: PropTypes.func};


export default NewTaskForm;