const express = require("express");
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoutes')
const noteRoute = require('./routes/noteRoutes')
const cors = require('cors')

require('dotenv').config().parsed
const app = express();

// connecting with database
mongoose.connect(
  process.env.DATABASE_ULR,
  { useUnifiedTopology: true, useNewUrlParser: true }
);

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
  res.send("Server Started...")
})

app.use('/api/user',userRoute)
app.use('/api/notes',noteRoute)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on PORT : http://localhost:${port}`)
});
