const express = require('express')
const router = express.Router()
const tasksController = require("../../controllers/tasksContorller")
const authMiddleware = require("../../middlewares/authMiddleware")

module.exports = () => {
    router.post('/create', authMiddleware.autherization, tasksController.create);
    router.put('/update/:id', authMiddleware.autherization, tasksController.update);
    router.delete('/delete/:id', authMiddleware.autherization, tasksController.remove);
    router.get('/get/:id', authMiddleware.autherization, tasksController.getTask);
    router.get('/get-all', authMiddleware.autherization, tasksController.getAllTasks);
    return router;
}