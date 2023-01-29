const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userregister = new Schema({
	username: {
		type: String,
		unique: true
	},
	password: {
		type: String
	}
})

const userinfo = new mongoose.model("registerinfo", userregister)
module.exports = userinfo