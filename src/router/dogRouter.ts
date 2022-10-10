import express from 'express';
import { Dog } from "../model/dogModel"
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

let dogRouter = express.Router();

let dogArray: Dog[] = [];


dogRouter.get('/', (req, res, next) => {
    res.send(dogArray);
    
});

dogRouter.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    let dog = await prisma.dog.findUnique({
    where:
    {
        id:id
    }
    });
    if(dog)
    {
        res.send(dog);
    }
    else {
        res.status(404).send({ message: 'Dog not Found' });
    }
    /*let myDog = dogArray.find(dog => dog.id == id);
    if (myDog) {
        let cloneDog = new Dog(0, '', '', '');
        Object.assign(cloneDog, myDog);
        cloneDog.secretcmd = '';
        delete (<any>cloneDog).secretcmd
        res.send(cloneDog);
    }
    else {
        res.status(404).send({ message: 'Dog not Found' });
    }*/

});

dogRouter.post('/', async (req, res, next) => {

    
    let myDog = new Dog(0, '', '', '');

    Object.assign(myDog, req.body);

    dogArray.push(myDog);
    let dogInDb = await prisma.dog.create({
       data:myDog 
    })
    console.log(dogInDb);
    res.send(myDog);
            
       
       
});

export { dogRouter };