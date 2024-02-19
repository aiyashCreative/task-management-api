const responseHandler = require("../handlers/responseHandler")
const Task = require("../models/task")

const getAllTasks = (req, res) => {
    Task.find().then(tasks => responseHandler.successResponseHandler(res, { data: tasks, count: tasks.length }))
}

const getTask = (req, res) => {
    const id = req.params.id

    Task.find({ _id: id }).then(tasks => responseHandler.successResponseHandler(res, { data: tasks, count: tasks.length }))
}

const create = (req, res) => {
    const title = req.body.title
    const status = req.body.status

    new Task({
        title,
        status
    }).save()
        .then(taskSaved => {
            responseHandler.successResponseHandler(res, { message: "Successfully Created!", data: taskSaved })
        })
        .catch(err => {
            responseHandler.errorResponseHandler(res, { message: err })
        });
}

const update = (req, res) => {
    const _id = req.params.id
    const status = req.body.status

    Task.updateOne({ _id }, { status }).then(updatedTask => responseHandler.successResponseHandler(res, { message: "Task updated!" }))
        .catch(err => responseHandler.errorResponseHandler(res, { message: "Task doesn't exist!" }))
}

const remove = (req, res) => {
    const _id = req.params.id

    Task.deleteOne({ _id }).then(deletedTask => responseHandler.successResponseHandler(res, { message: "Deleted!" }))
        .catch(err => responseHandler.errorResponseHandler(res, { message: "Task doesn't exist!" }))
}

module.exports = {
    getAllTasks,
    getTask,
    create,
    update,
    remove
}