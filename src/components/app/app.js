import React, { Component } from 'react';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import './app.css';

export default class App extends Component {
    constructor() {
        super();

        this.makeNewTask = (title, id, state) => {
            return {title: title, state: state, id: id};
        }

        this.state = {tasks: [
            this.makeNewTask('First Task', 4, 'editing'),
            this.makeNewTask('Second Task', 99, 'active'),
            this.makeNewTask('Third Task', 32, 'completed')
        ]};

    }

    render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>My Todos</h1>
                    <NewTaskForm/>
                </header>
                <section className="main">
                    <TaskList tasks={ this.state.tasks }/>
                    <Footer/>
                </section>
            </section>
        );
    }
}