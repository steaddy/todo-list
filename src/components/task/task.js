import React, {Component} from 'react';
import './task.css';

export default class Task extends Component {

    render() {
        let { toggleCompleted, state, onDelete, onEdit } = this.props;

        return (
                <div className="view">
                    <input className="toggle" type="checkbox"
                    onChange={ toggleCompleted }
                           checked = { state === "completed" }
                    />
                    <label>
                        <span className="description">{ this.props.title }</span>
                        <span className="created">created 5 minutes ago</span>
                    </label>
                    <button className="icon icon-edit"
                    onClick={ onEdit }
                    ></button>
                    <button className="icon icon-destroy"
                    onClick = { onDelete }
                    ></button>
                </div>
        );
    }
}