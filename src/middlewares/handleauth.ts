import express from 'express';
import jwt from 'jsonwebtoken';
import { JWTKey } from '../router/dogHandlerRouter';

let authRouter = express.Router();

authRouter.use('/', (req, res, next) => {
    // Verify IF the user is Auth
    console.log(req.url);
    console.log(req.method);
    let ary = [
        {
            method: 'GET',
            url: '/Dog'
        },
        {
            method: 'POST',
            url: '/Dog'
        },
        {
            method:'GET',
            url:'/Client'
        }
    ];
    let cont=true;
    for (let per of ary) {
        if (req.url.includes(per.url) && req.method == per.method) {
            if (req.headers['authorization']) {
                try {
                    let verifiedToken = jwt.verify(req.headers['authorization'].replace('Bearer ', ''), JWTKey);
                    if (verifiedToken) {
                        continue;
                    }
                    else {
                        cont=false;
                        break;
                    }
                }
                catch
                {
                    cont=false;
                    break;
                }
            }
            else
            {
                cont=false;
                break;
            }
        }
    }
    if(cont)
       next();
    else
    {
        res.status(401).send({message:'UnAuthorized'});
    }
    
});
export { authRouter };