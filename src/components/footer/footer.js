import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter';
import './footer.css';

const Footer = props => {

        const {tasksRemain, filter, onFilterChange, onClearCompleted} = props;
        return (
            <footer className="footer">
                <span className="todo-count">{tasksRemain} items left</span>
                <TasksFilter
                    filter={filter}
                    onFilterChange={onFilterChange}
                />
                <button
                    type="button"
                    className="clear-completed"
                    onClick={() => onClearCompleted()}
                >Clear completed</button>
            </footer>
        );
};

Footer.propTypes = {
    tasksRemain: PropTypes.number,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    onClearCompleted: PropTypes.func,
};

Footer.defaultProps = {
    tasksRemain: 0,
    filter: '',
    onFilterChange: ()=>{},
    onClearCompleted: ()=>{},
};

export default Footer;