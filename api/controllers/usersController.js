const { register } = require("module")
const jwt = require('jsonwebtoken');
const responseHandler = require("../handlers/responseHandler")
const bcrypt = require("bcrypt")
const User = require("../models/user")

const getUsers = (req, res) => {
    User.find().then(users => responseHandler.successResponseHandler(res, { data: users, count: users.length }))
}

const getUser = (req, res) => {
    const id = req.params.id

    User.findOne({ _id: id }).then(user => responseHandler.successResponseHandler(res, { data: user }))
}

const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email: email }).then(async user => {
        if (user) {
            const isMatch = await user.validPassword(password)
            if (isMatch) {
                const token = jwt.sign({ _id: user._id, role: user.user_role }, process.env.SECRET_KEY, {
                    expiresIn: "2h"
                })
                responseHandler.successResponseHandler(res, { token })
            } else responseHandler.authErrorHandler(res, { message: "Incorrect Password!" })

        } else responseHandler.authErrorHandler(res, { message: "Email doesn't exist!" })
    })
}

const create = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const user_role = req.body.user_role

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save newUser object to database 
    new User({
        name,
        email,
        user_role,
        password: hashedPassword
    }).save()
        .then(userData => responseHandler.successResponseHandler(res, { data: userData }))
        .catch(err => {
            if (err.index >= 0) {
                responseHandler.errorResponseHandler(res, { message: "This Email has already been taken!" })
            } else responseHandler.errorResponseHandler(res, { message: err })
        })
}

const remove = (req, res) => {
    const _id = req.params.id

    User.deleteOne({ _id }).then(deletedUser => responseHandler.successResponseHandler(res, { message: "Deleted!" }))
        .catch(err => responseHandler.errorResponseHandler(res, { message: "Task doesn't exist!" }))
}

module.exports = {
    getUsers,
    getUser,
    login,
    create,
    remove
}