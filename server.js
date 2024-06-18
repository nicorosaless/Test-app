const express = require('express') /* */
const app = express()

const users = [] /* esta variable es la que va dentro del servidor */

app.get('/users', (req, res) => {
    res.json(users)
}) 

app.listen(80)