import React from 'react';
import './tasks-filter.css';
import PropTypes from "prop-types";

const TasksFilter = props => {
    const buttonsNames = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'completed', label: 'Completed'},
    ];



        const { filter, onFilterChange } = props;
        const buttons = buttonsNames.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? 'selected' : '';
            return (
                <li key={name}>
                    <button
                        type="button"
                        className={clazz}
                        onClick={() => onFilterChange(name)}
                    >{label}</button>
                </li>
            );
        })
        return (
            <ul className="filters">
                {buttons}
            </ul>
        );
}

TasksFilter.propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
};

TasksFilter.defaultProps = {
    filter: '',
    onFilterChange: ()=>{},
};


export default TasksFilter;