// MongoDB + Express + Node

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const currentDate = new Date();
require('dotenv').config();

// models
const User = require('./models/user.model')
const PORTNUMBER = process.env.MONGODB_PORT;

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_CONNECTION)

app.post('/api/register', async (req, res) => {
    console.log(req.body)

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        await User.create({
            schema: 1,
            acctDate: currentDate,
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
            birthDate: req.body.birthDate,
            ethnicity: req.body.ethnicity,
        })
        res.json({status: 'ok'})
    } catch(err) {
        console.log(err)
        res.json({status: 'error', error: 'Duplicate email'})
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if(!user) {
        return res.json({ status: 'error', error: 'Invalid login'})
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if(isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            }, 
            process.env.JWT_SECRET
        )

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email
        const user = await User.findOne({email: email})

        return res.json({ status: 'ok', quote: user.quote })
    } catch {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }
})

app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email
        const user = await User.updateOne({email: email}, { $set: { quote: req.body.quote } })

        return res.json({ status: 'ok', quote: user.quote })
    } catch {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }
})

app.listen(PORTNUMBER, () => {
    console.log('Server started on ' + PORTNUMBER)
    console.log(process.env.SALT_ROUNDS)
})