const express = require('express');

const router = express.Router();

const {
  getPaginatedToDos,
  getToDo,
  createToDo,
  updateToDo,
  deleteToDo,
} = require('../controllers/Todo');

router.get('/api/v1/todos', getPaginatedToDos);
router.post('/api/v1/todos', createToDo);
router.get('/api/v1/todos/:id', getToDo);
router.patch('/api/v1/todos/:id', updateToDo);
router.delete('/api/v1/todos/:id', deleteToDo);

module.exports = router;
