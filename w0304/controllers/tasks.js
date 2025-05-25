const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const validateTask = (task) => {
  const { title, description, status, dueDate, category, priority } = task;
  if (!title || typeof title !== 'string') return 'Invalid title';
  if (!description || typeof description !== 'string') return 'Invalid description';
  if (!status || !['pending', 'in-progress', 'completed'].includes(status)) return 'Invalid status';
  if (dueDate && isNaN(new Date(dueDate))) return 'Invalid due date';
  if (category && typeof category !== 'string') return 'Invalid category';
  if (priority && !['low', 'medium', 'high'].includes(priority)) return 'Invalid priority';
  return null;
};


const taskController = {
createTask: async (req, res) => {
    //#swagger.tags = ['Tasks']
    try {
      const validationError = validateTask(req.body);
      if (validationError) {
        return res.status(400).json({ message: validationError });
      }
      const task = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: req.body.category,
        priority: req.body.priority
      };
      const result = await mongodb.getDb().collection('tasks').insertOne(task);
      if (result.acknowledged) {
        res.status(201).json({ message: 'Task created successfully', _id: result.insertedId });
      } else {
        res.status(500).json({ message: 'Error creating task' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error creating task', error: err });
    }
  },
getAllTasks: async (req, res) => {
   //#swagger.tags = ['Tasks']
    try {
        const result = await mongodb.getDb().collection('tasks').find().toArray();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result);
        } catch (err) {
                res.status(500).json({ message: 'Error retrieving tasks', error: err });
        }
},
getTaskById: async (req, res) => {
   //#swagger.tags = ['Tasks']
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid task ID'
        });
      }

              const result = await mongodb.getDb().collection('tasks').find({ _id: new ObjectId(id) }).toArray();

              if (result.length === 0) {
                  return res.status(404).json({ message: 'task not found' });
              }

              res.setHeader('Content-Type', 'application/json');
              res.status(200).json(result[0]);
          } catch (err) {
              res.status(500).json({ message: 'Error retrieving task', error: err });
          }
},
updateTask: async (req, res) => {
    //#swagger.tags = ['Tasks']
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid task ID' });
      }

      const validationError = validateTask(req.body);
      if (validationError) {
        return res.status(400).json({ message: validationError });
      }
      const task = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
        updatedAt: new Date(),
        category: req.body.category,
        priority: req.body.priority
      };
      const result = await mongodb.getDb().collection('tasks').updateOne({ _id: new ObjectId(id) }, { $set: task });

      if (result.modifiedCount === 0) {
        return res.status(404).json({ success: false, message: 'Task not found or no changes made' });
      }

      res.status(200).json({ success: true, message: 'Task updated successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error updating task', error: err });
    }
  },
  deleteTask: async (req, res) => {
     //#swagger.tags = ['Tasks']
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid task ID'
        });
      }

      const result = await mongodb.getDb().collection('tasks').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error deleting task',
        error: err
      });
    }
  }
}

module.exports = taskController;
