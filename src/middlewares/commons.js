import validator from "express-validator";

const {validationResult} = validator;

const validResult = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }else{
        next();
    }
}

export default validResult;