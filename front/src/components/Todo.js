import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListGroupItem, Button} from 'react-bootstrap';
import axios from 'axios';

class Todo extends Component {

    constructor() {
        super();
        this.finish = this.finish.bind(this);
    }

    finish() {
        console.log(this.props.id);
        axios.post("/api/todos/delete", {
            id: this.props.id
        })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <ListGroupItem>
                {this.props.title} 
                <Button onClick={this.finish} bsSize="small" className="pull-right align-middle">Finish</Button>
            </ListGroupItem>
        )
    }
}

Todo.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string
}

export default Todo;