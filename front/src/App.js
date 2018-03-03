import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {FormGroup, FormControl, Button, Row, Col, InputGroup, ListGroup, Panel} from 'react-bootstrap';
import Todo from './components/Todo';

class App extends Component {

  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: "",
    }

    this.changeText = this.changeText.bind(this);
    this.submit = this.submit.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get("/api/todos")
    this.setState({todos: res.data || []});
  }

  changeText(e) {
    this.setState({newTodo: e.target.value})
  }

  submit() {
    axios.post("/api/todos/create", {
      title: this.state.newTodo
    })
    .then((response) => {
      console.log(response);
      this.setState({todos: [...this.state.todos, response.data]})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {

    return(
      <div>
        <form>
        <InputGroup>
          <FormControl type="text" placeholder="New Todo" onChange={this.changeText}  />
          <InputGroup.Button>
            <Button onClick={this.submit} bsStyle="info">Add</Button>
          </InputGroup.Button>
        </InputGroup>
        </form>
          <Panel bsStyle="success">
            <Panel.Heading>
              <Panel.Title componentClass="h3">ListGroup</Panel.Title>
            </Panel.Heading>

            <Panel.Body>
              <ListGroup>
              {this.state.todos.map((todo, index) => (
                <Todo id={todo._id} title={todo.title} />
              ))}
              </ListGroup>
            </Panel.Body>
          </Panel>
      </div>
    )
  }
}

export default App;
