//db.js

const mongoose = require('mongoose')
// const pass = encodeURIComponent("codinglearner")


const url = `mongodb+srv://nipun:iamnipun@cluster0.yonphoo.mongodb.net/blogwebsite?retryWrites=true`;
const connectionParams = {
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true
}

mongoose.set('strictQuery', true);
mongoose.connect(url, connectionParams)
	.then(() => {
		console.log('Connected to database ')
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`);
	})

