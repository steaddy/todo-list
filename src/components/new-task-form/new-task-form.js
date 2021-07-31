import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

const NewTaskForm = props => {

  const {addNewTask} = props;

  const minRef = React.createRef();
  const secRef = React.createRef();
  const newTaskNameRef = React.createRef();


  const addNewTaskContent = (e) => {
    const min = minRef.current;
    const sec = secRef.current;
    if (e.key === 'Enter') {
      addNewTask(newTaskNameRef.current.value, min.value, sec.value);
      e.target.value = '';
      min.value = '';
      sec.value = '';
    }
  };

  return (
    <form className='new-todo-form'>
      <input
        ref={newTaskNameRef}
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={addNewTaskContent}
      />
      <input
        ref={minRef}
        className="new-todo-form__timer new-todo-form__timer--min"
        placeholder="Min"
        pattern="[0-9]"
        onKeyDown={addNewTaskContent}
      />
      <input
        ref={secRef}
        className="new-todo-form__timer new-todo-form__timer--sec"
        placeholder="Sec"
        onKeyDown={addNewTaskContent}
      />
    </form>
  );
};

NewTaskForm.defaultProps = {
  addNewTask: () => {
  }
};

NewTaskForm.propTypes = {addNewTask: PropTypes.func};


export default NewTaskForm;