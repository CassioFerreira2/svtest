/* 
 * Copyright (c) 2022 - 2023 Snowflake Computing Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * 
 * Author: Cássio Zareck
*/
'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const user = require('./user')

const VERBOSE = true // Will output log debugs

function debug(msg) {
    if (VERBOSE) {
        console.log(msg)
    }
}

// Utility to parse requests comming from client side
// apparently not in use since we are not using body
app.use(bodyParser.urlencoded({extended: true}))

const port = 3000

/* -=============== EXPRESS */
app.get('/', (req, res) => {
    const name = req.query.name
    res.send('Hello World! ' + name)
})

// Define o que acontece quando for enviado dados
// de registro (email e senha)
// Chaves necessárias do request: email, passw
app.post('/signup', (req, res) => {
    let r = user.signUp(req.query.email, req.query.passw)
    if (r == null) {
        res.status(400).end("Wasn't possible to sign up")
    } else {
        res.end('Account created')
    }
})

// Chaves necessárias do request: email, passw
app.post('/login', (req, res) => {
    let r = user.login(req.query.email, req.query.passw)
    if (r == null) {
        res.status(400).end("Wasn't possible to login")
    } else {
        res.end(JSON.stringify(r))
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

module.exports = {debug}