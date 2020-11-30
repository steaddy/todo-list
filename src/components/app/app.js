import React, { Component } from 'react';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import './app.css';

export default class App extends Component {
    constructor() {
        super();

        this.generateKey = (pre) => {
            return `${ pre }_${ new Date().getTime() }`;
        }

        this.makeNewTask = (title, state, id) => {
            return {title: title, state: state, id: id};
        }

        this.addNewTask = (title) => {
            this.setState(( { tasks } ) => {
                return { tasks: [...tasks, this.makeNewTask(title, 'active', this.generateKey())] };
            })
        }

        this.state = {tasks: [
            this.makeNewTask('First Task', 'editing', 44),
            this.makeNewTask('Second Task', 'active', 33),
            this.makeNewTask('Third Task', 'completed',22)
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
                        el.state = 'editing';
                    }
                });
            })
        }

        this.onEditEnter = (val, id) => {
            this.setState( ({ tasks }) => {
                let newTasks = [...tasks];
                return newTasks.map(el => {
                    if(el.id === id) {
                        el.state = 'active';
                        el.title = val;
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
        let tasksRemain = this.state.tasks.filter(el => el.state === 'active').length;
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>My Todos</h1>
                    <NewTaskForm addNewTask = { this.addNewTask }/>
                </header>
                <section className="main">
                    <TaskList
                        tasks={ this.state.tasks }
                        toggleCompleted={ this.toggleCompleted }
                        onDelete = { this.onDelete }
                        onEdit = { this.onEdit }
                        onEditEnter = { this.onEditEnter }
                    />
                    <Footer tasksRemain = { tasksRemain }/>
                </section>
            </section>
        );
    }
}