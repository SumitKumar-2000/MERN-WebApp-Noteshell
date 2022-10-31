const express = require("express");
require('dotenv').config()
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoutes')
const noteRoute = require('./routes/noteRoutes')
const cors = require('cors')

const app = express();

// connecting with database
mongoose.connect(
  process.env.DATABASE,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
  res.send("Hey there, How are you!")
})

app.use('/api/user',userRoute)
app.use('/api/notes',noteRoute)

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on PORT : http://localhost:${port}`));
