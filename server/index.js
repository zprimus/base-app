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
        })
        return res.json({status: 'ok'})
    } catch(err) {
        console.log(err)
        return res.json({status: 'error', error: 'E-mail already exists'})
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
                email: user.email
            }, 
            process.env.JWT_SECRET
        )

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.get('/api/getUserData', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email
        const user = await User.findOne({email: email})

        return res.json({ 
            status: 'ok',
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthDate: user.birthDate,
        })
    } catch(err) {
        console.log(err)
        return res.json({ status: 'error', error: 'Invalid token'})
    }
})

app.post('/api/updateUserData', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email

        const replacementEmail = await User.findOne({email: req.body.email});

        if(replacementEmail && (replacementEmail !== email)) {
            return res.json({ status: 'error' , error: 'E-mail already exists' })
        } else {
            const response = await User.updateOne({email: email}, { 
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    birthDate: req.body.birthDate,
                }
            })

            const token = jwt.sign(
                {
                    email: replacementEmail
                }, 
                process.env.JWT_SECRET
            )

            return res.json({ status: 'ok', user: token, response: response })
        }
        
    } catch(err) {
        console.log(err)
        return res.json({ status: 'error', error: 'Invalid token'})
    }
})

app.listen(PORTNUMBER, () => {
    console.log('Server started on ' + PORTNUMBER)
})