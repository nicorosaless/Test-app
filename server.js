const express = require('express') /* */
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = [] /* esta variable es la que va dentro del servidor */

app.get('/users', (req, res) => {
    res.json(users)
}) 

app.post('/users', (req, res) => {
    try {
        const salt = bcrypt.genSalt(10)
        const hashedPassword = bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: req.body.hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }

})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user') 
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not allowed')
        }
    } catch {
        res.status(500).send()
    }
})


app.listen(80)