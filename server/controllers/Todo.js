const ToDo = require('../models/Todo');

const todoPerPage = 5;



const getPaginatedToDos = (req, res) => {
  const page = req.query.page;

  ToDo.find({})
    .skip((page - 1) * todoPerPage)
    .limit(todoPerPage)
    .exec((err, todoitems) => {
      if (err) {
        return res.json(err);
      }
      ToDo.countDocuments({}).exec((count_error, count) => {
        if (err) {
          return res.json(count_error);
        }
        return res.json({
          total: count,
          //   page: page,
          //   pageSize: todoitems.length,
          todoitems,
        });
      });
    });

  //   res.status(200).json({todos});
};

const getToDo = async (req, res) => {
  const {id: todoId} = req.params;
  const todo = await ToDo.findOne({_id: todoId});

  res.status(200).json({todo});
};

const createToDo = async (req, res) => {
  const todo = await ToDo.create(req.body);
  res.status(201).json({todo});
};

const updateToDo = async (req, res) => {
  const {id: todoId} = req.params;
  const todo = await ToDo.findByIdAndUpdate({_id: todoId}, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({todo});
};

const deleteToDo = async (req, res) => {
  const {id: todoId} = req.params;
  const todo = await ToDo.findOneAndDelete({_id: todoId});

  res.status(200).json({todo});
};

module.exports = {
  getPaginatedToDos,
  getToDo,
  createToDo,
  updateToDo,
  deleteToDo,
};
