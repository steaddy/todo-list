import React, {Component} from 'react';
import './task.css';

export default class Task extends Component {

    render() {
        let { toggleCompleted } = this.props;

        return (
                <div className="view">
                    <input className="toggle" type="checkbox"
                    onChange={ toggleCompleted }
                    />
                    <label>
                        <span className="description">{ this.props.title }</span>
                        <span className="created">created 5 minutes ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
        );
    }
}