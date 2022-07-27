const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const request = require('request');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, () => {console.log("Servidor ligado na porta", port)});

app.use("/api/steam", require("./routes/routes"));