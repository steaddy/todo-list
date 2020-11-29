import React, { Component } from 'react';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import './app.css';

export default class App extends Component {
    constructor() {
        super();

        this.makeNewTask = (title, id, state = 'active') => {
            return {title: title, state: state, id: id};
        }

        this.state = {tasks: [
            this.makeNewTask('First Task', 4, 'editing'),
            this.makeNewTask('Second Task', 99),
            this.makeNewTask('Third Task', 32, 'completed')
        ]};

        this.toggleCompleted = (id) => {
            this.setState( ({ tasks }) => {
                let newTasks = [...tasks];
                return newTasks.map(el => {
                    if(el.id === id) {
                        el.state === 'active' ? el.state = 'completed' : el.state = 'active';
                    }
                });
            })
        }

    }

    render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>My Todos</h1>
                    <NewTaskForm/>
                </header>
                <section className="main">
                    <TaskList
                        tasks={ this.state.tasks }
                        toggleCompleted={ this.toggleCompleted }
                    />
                    <Footer/>
                </section>
            </section>
        );
    }
}