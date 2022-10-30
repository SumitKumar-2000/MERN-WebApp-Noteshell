const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoutes')
const noteRoute = require('./routes/noteRoutes')
const cors = require('cors')

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// connecting with database
mongoose.connect(
  "mongodb+srv://sumit:SumitKumar@cluster0.6kqfc.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

// this is included to get rid of cors error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE");
  // res.setHeader('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use('/api/user',userRoute)
app.use('/api/notes',noteRoute)

const PORT = process.env.port || 5000;
app.listen(PORT, console.log(`Server started on PORT : http://localhost:${PORT}`));
