


const handleError = (error, res )=>{
    console.log(error);
    res.status(error.status || 500 );
    res.json({
        message: error.message,
    })
}

// const validationError = (error, res )=>{
//     res.status(400);
//     res.json({
//         message: error.message,
//     })


// }

module.exports = {
    handleError
}