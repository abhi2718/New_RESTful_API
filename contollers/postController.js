const validationHandler = require("../validations/validationHandler");
exports.index = (req, res) => {
    res.send({
       message:"Hi"
    })
}

exports.store = (req, res,next) => { 
    try {
        validationHandler(req);
        res.send({message:`Name is ${req.body.name}`});
    } catch (err) { 
         next(err);
    }
}