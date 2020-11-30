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

        this.onEdit = (id) => {
            this.setState( ({ tasks }) => {
                let newTasks = [...tasks];
                return newTasks.map(el => {
                    if(el.id === id) {
                        console.log(el.state);
                        el.state = 'editing';
                        console.log(el.state);
                    }
                });
            })
        }

        this.onDelete = (id) => {
            this.setState( ({ tasks }) => {
                return { tasks: tasks.filter(el => el.id !== id) };
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
                        onDelete = { this.onDelete }
                        onEdit = { this.onEdit }
                    />
                    <Footer/>
                </section>
            </section>
        );
    }
}