import express from 'express';
import { DogHandler } from '../model/handlerModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let dhRouter = express.Router();
const JWTKey="B652CE94AB2DE51E78A33B0FB0C0B0F82BC5F1D4FDC4B203219BD8C1CFEBD741";
let dhArry:DogHandler[]=[];
dhRouter.get('/', (req, res, next) => {
    res.send(dhArry);
});
dhRouter.post('/', (req, res, next) => {
     
     // You need to validate that the req.body is indeed correct
     
     if(DogHandler.IsItADogHandler(req.body))
     {
        let dh = new DogHandler();
        Object.assign(dh,req.body);
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(dh.password, salt, function(err, hash) {
                // Store hash in your password DB.
                dh.password = hash;
                dhArry.push(dh);
                res.send(dh);
            });
        });
        
        
     }
     else
     {
        res.status(400).send({messsage:'Not a valid handler'});
     }
});

dhRouter.get('/Login/:user/:pwd', (req, res, next) => {
    console.log(req.params.user);
    console.log(req.params.pwd);
    
    let dh = dhArry.find(d=> d.id===req.params.user);
    if(dh)
    {
        bcrypt.compare(req.params.pwd,dh.password, (err,result)=>{
            console.log(result);
            if(result)
            {
                let token = jwt.sign({
                    exp: Math.floor((Date.now() / 1000) + (60 * 60)),
                    data: {
                        userId: dh?.id,
                        name:dh?.name
                    }
                }, JWTKey);
                res.send({ token: token });
            }
            else
            {
                res.status(401).send({message:'Just beat it!'})
            }
        });
    }
    else
    {
        res.status(401).send({message:'Just beat it!'});
    }
});


export {dhRouter,JWTKey}