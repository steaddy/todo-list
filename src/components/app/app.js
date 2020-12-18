import React, { Component } from 'react';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);

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
            this.makeNewTask('First Task', 'active', 44),
            this.makeNewTask('Second Task', 'active', 33),
            this.makeNewTask('Third Task', 'active',22)
        ],
        filter: 'all'
        };

        this.onClearCompleted = () => {
            this.setState(({tasks}) => {
                return {tasks: tasks.filter(el => el.state !== "completed")};
            });
        };

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

        this.onFilterChange = filter => this.setState({filter: filter});

        this.filter = (items, filter) => {
          switch(filter) {
              case 'all':
                  return items;
              case 'active':
                  return items.filter(el => el.state === "active");
              case 'completed':
                  return items.filter(el => el.state === "completed");
              default:
                  return items;
          }
        };
    }

    render() {
        const { tasks, filter } = this.state;
        let tasksRemain = this.state.tasks.filter(el => el.state === 'active').length;
        const visibleTasks = this.filter(tasks, filter);
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>My Todos</h1>
                    <NewTaskForm addNewTask = { this.addNewTask }/>
                </header>
                <section className="main">
                    <TaskList
                        tasks={ visibleTasks }
                        toggleCompleted={ this.toggleCompleted }
                        onDelete = { this.onDelete }
                        onEdit = { this.onEdit }
                        onEditEnter = { this.onEditEnter }
                    />
                    <Footer
                        tasksRemain = { tasksRemain }
                            filter={filter}
                        onFilterChange={this.onFilterChange}
                        onClearCompleted={this.onClearCompleted}
                    />
                </section>
            </section>
        );
    }
}