
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoutes = require('./src/Routes/user.routes');
const ticketRoutes = require('./src/Routes/ticket.routes');
const {handleError} = require('./src/Utils/errorHandler');
const {PORT}  = require('./src/Config/config');
const {connect} = require('./src/Config/dbConfig');


const app = express();


app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}) );

app.use('/v1/user', userRoutes);
app.use('/v1/ticket', ticketRoutes);

app.use("*", (req, res, next) => {

    const error = new Error("Resources not found");
    error.status = 404;
    next(error);
})


app.use("*", (error, req, res, next) => {
    handleError(error, res);
})
app.listen( PORT, async () => {
    await connect();
    console.log("mongodb connection established");
    console.log(`Server is running on port ${PORT}`);
})