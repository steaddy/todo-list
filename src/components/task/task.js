import React, {Component} from 'react';
import './task.css';

export default class Task extends Component {

    render() {

        return (
            <li>
                <div className="view">
                    <input className="toggle" type="checkbox"/>
                    <label>
                        <span className="description">Таск из компонента</span>
                        <span className="created">created 500 minutes ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
            </li>
        );
    }
}