const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userlogin = new Schema({
	username: {
		type: String
	},
	password: {
		type: String
	}
})

const logininfo = new mongoose.model("logininfo", userlogin)
module.exports = logininfo