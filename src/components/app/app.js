import {useState, useEffect} from 'react';
import generateKey from "../../helpers";
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import './app.css';


const App = () => {

  const makeNewTask = (title, state, id, howMuchTimeSpent = 0) => ({
    title,
    state,
    id,
    howMuchTimeSpent,
    timeOfCreation: Date.now()
  });

  const [tasks, setTasks] = useState([]);
  const addNewTask = (title, min, sec) => {
    const howMuchTimeSpent = Number(min) * 60 + Number(sec);

    setTasks([...tasks, makeNewTask(title, 'active', generateKey(), howMuchTimeSpent)]);

  };

  const [filter, setFilter] = useState('all');

  const onClearCompleted = () => {
    setTasks(tasks.filter(el => el.state !== "completed"));
  };

  const toggleCompleted = id => {
    const newTasks = [...tasks];
    newTasks.map(el => {
      if (el.id === id) {
        // eslint-disable-next-line no-unused-expressions,no-param-reassign
        el.state === 'active' ? el.state = 'completed' : el.state = 'active';
      }
      return el;
    });
    setTasks(newTasks);
  };

  const onFilterChange = newFilter => setFilter(newFilter);

  const useFilter = (items, filterValue) => {
    switch (filterValue) {
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

  const getSpentTime = (id) => {
    let res = 0;
    tasks.map(el => {
      if (el.id === id) {
        res = el.howMuchTimeSpent;
      }
      return el;
    });
    return res;
  };

  const setSpentTime = (id, currentTime) => {
    const resState = tasks.map(el => {
      if (el.id === id) {
        const res = {...el};
        res.howMuchTimeSpent = currentTime;
        return res;
      }
      return el;
    });
    setTasks(resState);
  };


  const onEdit = (id, currentValue) => {
    const newTasks = tasks.map(el => {
      const elem = {...el};
      if (el.id === id) {
        elem.state = 'editing';
        elem.title = currentValue;
        return elem;
      }

      return elem;
    });
    setTasks(newTasks);
  }

  const onEditEnter = (val, id) => {
    const newTasks = tasks.map(el => {
      const elem = {...el};
      if (el.id === id) {
        elem.state = 'active';
        elem.title = val;
        return elem;
      }
      return elem;
    });
    setTasks(newTasks);
  }

  const onDelete = id => {
    setTasks(tasks.filter(el => el.id !== id));
  }


  useEffect(() => {
    if (!localStorage.getItem('taskList')) {
      localStorage.setItem('taskList', JSON.stringify(tasks))
    } else {
      setTasks(JSON.parse(localStorage.getItem('taskList')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(tasks));
  }, [tasks]);


  const tasksRemain = tasks.filter(el => el.state === 'active').length;
  const visibleTasks = useFilter(tasks, filter);
  return (
    <section className="todoapp">
      <header className="header">
        <h1>My Todos</h1>
        <NewTaskForm addNewTask={addNewTask}/>
      </header>
      <section className="main">
        <TaskList
          tasks={visibleTasks}
          toggleCompleted={toggleCompleted}
          onDelete={onDelete}
          onEdit={onEdit}
          onEditEnter={onEditEnter}
          // startTimer = { this.startTimer } Откуда взялось не пойму
          getSpentTime={getSpentTime}
          setSpentTime={setSpentTime}
        />
        <Footer
          tasksRemain={tasksRemain}
          filter={filter}
          onFilterChange={onFilterChange}
          onClearCompleted={onClearCompleted}
        />
      </section>
    </section>
  );


};


export default App;


/*


export default class App extends Component {
    constructor(props) {
        super(props);

        this.generateKey = (pre) => `${ pre }_${ new Date().getTime() }`

        this.makeNewTask = (title, state, id, howMuchTimeSpent = 0) => ({title, state, id, howMuchTimeSpent, timeOfCreation: Date.now()})

        this.addNewTask = (title, min, sec) => {
            const howMuchTimeSpent = Number(min) * 60 + Number(sec);
            this.setState(( { tasks } ) => ({
                tasks: [...tasks, this.makeNewTask(title, 'active', this.generateKey(), howMuchTimeSpent)]
            }))
        }

        this.state = {
            tasks: [
                this.makeNewTask('First Task', 'editing', 44, 60),
                this.makeNewTask('Second Task', 'active', 33, 20),
                this.makeNewTask('Third Task', 'active', 22, 345)
            ],
            filter: 'all'
        };

        this.onClearCompleted = () => {
            this.setState(({tasks}) => ({tasks: tasks.filter(el => el.state !== "completed")}));
        };

        this.toggleCompleted = (id) => {
            this.setState( ({ tasks }) => {
                const newTasks = [...tasks];
                return newTasks.map(el => {
                    if(el.id === id) {
                        // eslint-disable-next-line no-unused-expressions,no-param-reassign
                        el.state === 'active' ? el.state = 'completed' : el.state = 'active';
                    }
                    return el;
                });
            })
        }









        this.onEdit = (id, currentValue) => {
            this.setState( ({ tasks }) => {
                const newTasks =tasks.map(el => {
                    const elem = {...el};
                    if(el.id === id) {
                        elem.state = 'editing';
                        elem.title = currentValue;
                        return elem;
                    }
                    console.log(elem);
                    return elem;
                });
                return {tasks: newTasks};
            })
        }

        this.onEditEnter = (val, id) => {
            this.setState( ({ tasks }) => {
                const newTasks = tasks.map(el => {
                    const elem = {...el};
                    if(el.id === id) {
                        elem.state = 'active';
                        elem.title = val;
                        return elem;
                    }
                    return elem;
                });
                return {tasks: newTasks};
            })
        }

        this.onDelete = (id) => {
            this.setState( ({ tasks }) => ({ tasks: tasks.filter(el => el.id !== id) }))
        }










        this.onFilterChange = filter => this.setState({filter});

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

        this.getSpentTime = (id) => {
            const { tasks } = this.state;
            let res = 0;
            tasks.map(el => {
                if(el.id === id) {
                    res = el.howMuchTimeSpent;
                }
                return el;
            });
            return res;
        };

        this.setSpentTime = (id, currentTime) => {
            const { tasks } = this.state;
            const resState = tasks.map(el => {
                if(el.id === id) {
                    const res = {...el};
                    res.howMuchTimeSpent = currentTime;
                    return res;
                }
                return el;
            });
            this.setState({tasks: resState});
        };

        // this.intervalID = setInterval(() => this.setState({}), 2000);
    }

    componentDidMount() {
        const { tasks } = this.state;
        if(!localStorage.getItem('taskList')){
            localStorage.setItem('taskList', JSON.stringify(tasks))
        } else {
        this.setState({tasks: (JSON.parse(localStorage.getItem('taskList')))})
        }
    }

    componentDidUpdate() {
        const { tasks } = this.state;
        localStorage.setItem('taskList', JSON.stringify(tasks));
    }

    render() {
        const { tasks, filter } = this.state;
        const tasksRemain = tasks.filter(el => el.state === 'active').length;
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
                        startTimer = { this.startTimer }
                        getSpentTime = { this.getSpentTime }
                        setSpentTime = { this.setSpentTime }
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


*/