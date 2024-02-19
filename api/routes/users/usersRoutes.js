const express = require('express')
const router = express.Router()
const userController = require("../../controllers/usersController")
const autherization = require("../../middlewares/authMiddleware")

module.exports = () => {
    router.post("/create", userController.create)
    router.post("/login", userController.login)
    router.get("/get/:id", autherization.autherization, userController.getUser)
    router.get("/get-all/", autherization.autherization, userController.getUsers)
    router.delete("/delete/:id", autherization.autherization, userController.remove)
    return router
}