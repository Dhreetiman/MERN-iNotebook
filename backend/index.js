const express = require('express')
const cors = require('cors')
let connectDB = require('./db')
const app = express()


connectDB();
app.use(cors())
app.use(express.json({ extended: false }));

const port = 5000


app.use('/api/auth', require('./routes/auth'))



app.listen(port, () => {
  console.log(`Server is running on Port ${port}`)
})