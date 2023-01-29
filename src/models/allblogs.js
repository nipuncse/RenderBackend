const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogdata = new Schema({
	username: {
		type: String
	},
	uuid: {
		type: String
	},
	heading: {
		type: String
	},
	content: {
		type: String
	},
	likes: {
		type: Number
	},
	category: {
		type: String
	},
	timestamp: {
		type: String
	},
	usersliked: { type: Array, "default": [] }
})

const blog = new mongoose.model("blogs", blogdata)
module.exports = blog