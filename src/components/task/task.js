import { useState, useEffect } from 'react';
import {formatDistanceToNow, differenceInSeconds} from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';





const Task = props => {
    const [canStartNewTimer, setCanStartNewTimer] = useState(true);
    const [timerID, setTimerID] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);



    const startTimer = () => {
        const { getSpentTime } = props;

        if(!canStartNewTimer) return;
        const start = Date.now();


        const interval = setInterval(() => {
                const res = getSpentTime() + differenceInSeconds(Date.now(), start);
                setCurrentTime(res);
                setCanStartNewTimer(false);
        }, 1000);
        setTimerID(interval);
        // eslint-disable-next-line consistent-return
        return interval;
    };

    const stopTimer = () => {
        const { setSpentTime } = props;
        clearInterval(timerID)
        setSpentTime(currentTime);
        setCanStartNewTimer(true);
    };

    const timeFormat = (sec) => {
        if(!sec) return "00:00:00";
        const seconds = Math.floor(sec % 60).toString();
        const minutes = Math.floor(sec / 60 % 60).toString();
        const hours = Math.floor(sec / 60 / 60 % 24).toString();
        const zero = "0";

        return `${hours.length < 2? zero + hours : hours}:${(minutes.length < 2)? zero + minutes : minutes}:${(seconds.length < 2)? zero + seconds : seconds}`;
    };




    useEffect( () => {
      const intervalID = startTimer();
       /* const intervalID = setInterval(()=> {

      }, 1000); */
      return ()=> {
        clearInterval(intervalID);
      };
           // return () => {clearTimeout(interval)}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);





        const {toggleCompleted, state, onDelete, onEdit, timeOfCreation, title} = props;
        const timeOfCreationPrivate = formatDistanceToNow(timeOfCreation, {includeSeconds: true});

        return (
            <div className="view">
                <input className="toggle" type="checkbox"
                       onChange={toggleCompleted}
                       checked={state === "completed"}
                />
                <label>
                    <span className="title">{title}</span>
                    <span className="description">df
                  <button
                      type="button"
                      aria-label="Play"
                      className="icon icon-play"
                      onClick={startTimer}
                  />
                  <button
                      type="button"
                      aria-label="Pause"
                      className="icon icon-pause"
                      onClick={stopTimer}
                  > </button>
                        { timeFormat(currentTime) }
                </span>
                    <span className="description">{timeOfCreationPrivate}</span>
                </label>
                <button
                    type="button"
                    aria-label="Edit"
                    className="icon icon-edit"
                    onClick={onEdit}
                />
                <button
                    type="button"
                    aria-label="Delete"
                    className="icon icon-destroy"
                    onClick={onDelete}
                />
            </div>
        );
};

Task.defaultProps = {
    toggleCompleted: ()=>{},
    state: '',
    onDelete: ()=>{},
    onEdit: ()=>{},
    getSpentTime: ()=>{},
    setSpentTime: ()=>{},
    timeOfCreation: 0,
    title: "",
};

Task.propTypes = {
    toggleCompleted: PropTypes.func,
    state: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    getSpentTime: PropTypes.func,
    setSpentTime: PropTypes.func,
    timeOfCreation: PropTypes.number,
    title: PropTypes.string,
};


export default Task;



/*

// eslint-disable-next-line react/prefer-stateless-function
export default class Task extends Component {
    state = {
        canStartNewTimer: true
    }

    static defaultProps = {
        toggleCompleted: ()=>{},
        state: '',
        onDelete: ()=>{},
        onEdit: ()=>{},
        getSpentTime: ()=>{},
        setSpentTime: ()=>{},
        timeOfCreation: 0,
        title: "",
    };

    static propTypes = {
        toggleCompleted: PropTypes.func,
        state: PropTypes.string,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
        getSpentTime: PropTypes.func,
        setSpentTime: PropTypes.func,
        timeOfCreation: PropTypes.number,
        title: PropTypes.string,
    };

    timerID = 0;

    constructor(props) {
        super(props);
        this.startTimer();
    }


    componentWillUnmount() {
        clearInterval(this.timerID);
    };


    /!*
    getCurrentTime = async () => {
    }; *!/

    startTimer = () => {
        const { canStartNewTimer } = this.state;
        const { getSpentTime } = this.props;

        if(!canStartNewTimer) return;
        const start = Date.now();


        this.timerID = setInterval(() => {
            this.setState(() => {
                const res = getSpentTime() + differenceInSeconds(Date.now(), start);
                return {currentTime: res, canStartNewTimer: false}
            });

        }, 1000);

    };

    stopTimer = () => {
        const { setSpentTime } = this.props;
        const { currentTime } = this.state;
        clearInterval(this.timerID)
        setSpentTime(currentTime);
        this.setState({ canStartNewTimer: true})
    };

    timeFormat = (sec) => {
        if(!sec) return "00:00:00";
        const seconds = Math.floor(sec % 60).toString();
        const minutes = Math.floor(sec / 60 % 60).toString();
        const hours = Math.floor(sec / 60 / 60 % 24).toString();
        const zero = "0";

        return `${hours.length < 2? zero + hours : hours}:${(minutes.length < 2)? zero + minutes : minutes}:${(seconds.length < 2)? zero + seconds : seconds}`;
    };


    render() {
        const {toggleCompleted, state, onDelete, onEdit, timeOfCreation, title} = this.props;
        const { currentTime } = this.state;
        const timeOfCreationPrivate = formatDistanceToNow(timeOfCreation, {includeSeconds: true});
        return (
            <div className="view">
                <input className="toggle" type="checkbox"
                       onChange={toggleCompleted}
                       checked={state === "completed"}
                />
                <label>
                    <span className="title">{title}</span>
                    <span className="description">
                  <button
                      type="button"
                      aria-label="Play"
                      className="icon icon-play"
                      onClick={this.startTimer}
                  />
                  <button
                      type="button"
                      aria-label="Pause"
                      className="icon icon-pause"
                      onClick={this.stopTimer}
                  />
                        { this.timeFormat(currentTime) }
                </span>
                    <span className="description">{timeOfCreationPrivate}</span>
                </label>
                <button
                    type="button"
                    aria-label="Edit"
                    className="icon icon-edit"
                    onClick={onEdit}
                />
                <button
                    type="button"
                    aria-label="Delete"
                    className="icon icon-destroy"
                    onClick={onDelete}
                />
            </div>
        );
    }
} */
