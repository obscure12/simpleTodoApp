const express = require('express');
const router = express.Router();
const Todo = require('../models').Todo;

router.get('/', function(req, res) {
    Todo.find().exec((err, todos) => {
      if (err) {
        res.send(err)
        return
      }   
      res.json(todos)
    })  
});

router.post('/create', function(req, res) {
    const todo = new Todo({
        title: req.body.title
    });

    todo.save(function(err) {
        if (err) throw err; 
    });

    res.json(todo);
});

router.post('/delete', function(req, res) {
    Todo.findByIdAndRemove(req.body.id, {}, (err) => {
        if (err) throw err; 
    });

    const param = {
        message: "Todo deleted successfully."
    }
    res.json(200, param);
})

module.exports = router;