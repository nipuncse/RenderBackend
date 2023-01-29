require('dotenv').config()

const conn = require('./db/conn.js')
const cors = require('cors')
const path = require('path')
const userinfo = require('./models/userregister')
const newblog = require('./models/allblogs')
const express = require('express')
const app = express()
// hello

app.use(express.json())

app.use(cors({
	origin: '*',
	credentials: true
}))

app.use(express.urlencoded())
app.use(cors())
const port = process.env.PORT || 4200

//for login

app.post('/loginuser', (req, res) => {
	console.log(req.body)
	const { username, password } = req.body
	userinfo.findOne({ username: username }, (err, user) => {
		if (user) {
			if (password === user.password) {
				res.send({ message: true, user: user })
			}

			else {
				res.send({ message: false })
			}
		}

		else {
			res.send({ message: "Wrong Credentials" })
		}
	})
})
// ?-----------------------------------------------------------

// for register

app.post('/registeruser', async (req, res) => {
	console.log(req)
	const { username, password } = req.body

	try {
		const details = new userinfo({
			username: username,
			password: password
		})

		const registered = await details.save();
		console.log(registered)
		res.send({ message: 'success', user: details })
	}
	catch (err) {
		console.log(err)
		res.send({ message: 'fail' })
	}
})

// -----------------------------------------------------------

// for Homepage

app.get('/allblogs', (req, res) => {

	try {
		newblog.find({}, function (err, allDetails) {
			console.log(allDetails)
			if (err) {
				res.send({ message: "0" })
				console.log(err);
			} else {
				res.send({ message: "1", details: allDetails })
			}
		})
	}

	catch (err) {
		res.send({ message: "0" })
	}

})

// -----------------------------------------------------------

// for Newblog

app.post('/addblog', async (req, res) => {
	console.log(req)
	const { username, uuid, heading, content, category, timestamp } = req.body

	var add
	try {
		add = await newblog.updateOne(
			{ uuid: uuid },
			{ $set: { username: username, uuid: uuid, heading: heading, content: content, category: category, timestamp: timestamp, likes: '0', usersliked: [] } },
			{ upsert: true }
		);
	}
	catch (err) {
		res.send({ message: '-1' });
	}
	console.log(add)
	if (add.matchedCount) {
		res.send({ message: "1" })
		console.log('blogupdated')
	}
	else if (!add.matchedCount) {
		res.send({ message: "0" })
		console.log('blogadded')
	}
})

// ----------------------------------------------------------
// for updating blog

app.post('/updateblog', async (req, res) => {
	console.log(req)
	const { id, heading, content, category, timestamp } = req.body

	var add
	try {
		add = await newblog.updateOne(
			{ _id: id },
			{ $set: { heading: heading, content: content, category: category } },
		);
		res.send({ message: '1' })
	}
	catch (err) {
		res.send({ message: '-1' });
	}
})


//--------------------------------------------------------

//for categor blogs

app.post('/bycategory', (req, res) => {
	console.log(req.body)
	try {
		newblog.find({ category: req.body.category }, function (err, allDetails) {
			console.log(allDetails)
			if (err) {
				res.send({ message: "0" })
				console.log(err);
			} else {
				res.send({ message: "1", details: allDetails })
			}
		})
	}

	catch (err) {
		res.send({ message: "0" })
	}

})

//------------------------------------------------------------
// for user blogs

app.post('/getblogbyuser', (req, res) => {
	console.log(req.body)
	try {
		newblog.find({ username: req.body.id }, function (err, allDetails) {
			console.log(allDetails)
			if (err) {
				res.send({ message: "0" })
				console.log(err);
			} else {
				res.send({ message: "1", details: allDetails })
			}
		})
	}

	catch (err) {
		res.send({ message: "0" })
	}

})

//-------------------------------------------------------------
// for delete blog

app.post('/deleteblog', (req, res) => {
	console.log(req.body)
	const { id } = req.body
	newblog.remove({ _id: id }, function (err, allDetails) {
		if (err) {
			res.send({ message: "0" })
			console.log(err);
		} else {
			res.send({ message: "1", details: allDetails })
		}
	})
})

//-------------------------------------------------------------
//for blog details

app.post('/getblogdetails', (req, res) => {
	console.log(req.body)
	const { id } = req.body

	try {
		newblog.find({ _id: id }, function (err, allDetails) {
			console.log(allDetails)
			if (err) {
				res.send({ message: "0" })
				console.log(err);
			} else {
				res.send({ message: "1", details: allDetails })
			}
		})
	}

	catch (err) {
		res.send({ message: "0" })
	}


})
// --------------------------------------------------
// for like update positive
app.post('/updatelikepos', async (req, res) => {
	console.log(req)
	const { id, user } = req.body

	// let add = undefined;
	try {
		const add = await newblog.updateOne(
			{ _id: id },
			{ $push: { usersliked: user } },
			(err, allDetails) => {
				if (err) {
					res.send({ message: '-1' })
					throw err
				}
				else
					res.send({ message: '1', details: allDetails })
			}
		);
	}
	catch (err) {
		console.log(err);
		// res.send({ message: '-1' });
		console.log('mujhe jabardasti likha hua hai, 21232343434')
	}
	// console.log(add)

})

// --------------------------------------------------
// for like update positive
app.post('/updatelikeneg', async (req, res) => {
	console.log(req)
	const { id, user } = req.body

	try {
		const add = await newblog.updateOne(
			{ _id: id },
			{ $pull: { usersliked: user } },
			(err, allDetails) => {
				if (err) {
					res.send({ message: '-1' })
					throw err
				}
				else
					res.send({ message: '1', details: allDetails })
			}
		);
	}
	catch (err) {
		console.log(err);
		// res.send({ message: '-1' });
		console.log('mujhe jabardasti likha hua hai, 21232343434')
	}
	// console.log(add)

})


// Port is listening here
app.listen(port, () => {
	console.log('tmkoc')
})