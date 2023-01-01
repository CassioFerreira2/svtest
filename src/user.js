/* -=============== ACCOUNT AND LOGIN MANAGEMENT */
'use strict'
const {VERBOSE} = require('./main')
const {connection} = require('./sql')

class User {
    constructor(name, email) {
        this.name = name
        this.email = email
    }
}

function validateInput(username, passw) {
    // Validate input arguments
    if (typeof email !== 'string' || email.trim().length === 0) {
        return { error: 'Invalid username' };
    }
    if (typeof passw !== 'string' || passw.trim().length === 0) {
        return { error: 'Invalid password' };
    }
    return {}
}

const checkUsernameAvailability = (username) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT username FROM accounts WHERE username = "${username}"`,
            (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows.length === 0)
                }
            }
            )
    })
}
function registerAtSQL(username, password) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO accounts (username, password) VALUES ("${username}",
                                                 "${password}")`,
            (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }}
                )
            }
            )
}

function signUp(username, password) {
    validateInput(username, password)
    checkUsernameAvailability(username)
        .then((res) => {
            if (res) {
                if (VERBOSE) {
                    console.log(`username: "${username}" available`)
                }    
                registerAtSQL(username, password).catch(
                    (err) => {
                        console.error(err)
                    }).then((rows) => {
                        if (VERBOSE) {
                            console.log(`Added: "${rows}"`)
                        }
                    })
            } else {
                if (VERBOSE) {
                    console.error(`username: ${username} not available`)
                    return {error: `username: ${username} not available`}
                }
            }
        }).catch((err) => {
                console.error(err)
                return {error: err}
            })
}
signUp('cassio', 123123)


function checkAccount(email, passw, accounts) {
    if (accounts[email] === passw) {
        if (VERBOSE) {
            console.log('Found account')
            console.log('Logging in user: ' + email + 
                    'with password: '+ passw)
        }
        return searchUser(email)
    } 

    // Return error if no matching account is found
    return { error: 'Email or password is incorrect' };
}

function login(email, passw) {
    const validationResult = validateInput(email, passw)
    if (validateInput.error) {
        
        if (VERBOSE) {
            console.log(validateInput.error)
        }
        return validationResult
    }

    // Get list of accounts
    const accounts = getMapFromJSON(FILE_ACCOUNTS);

    return checkAccount(email, passw, accounts)
}

// Search for an user using email
function searchUser(email) {
    
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {

            if (VERBOSE)
                { console.log('Found user: ' + users[i].email) }
                
            return new User(users[i].name, users[i].email)
        }}
    
    throw Error('Email not found')
}


//module.exports = {login, signUp}