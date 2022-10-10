import express from 'express';
import bodyParser from 'body-parser';
import { dogRouter } from './router/dogRouter';
import { dhRouter } from './router/dogHandlerRouter';
import { authRouter } from './middlewares/handleauth';
import cors from 'cors';

const port = 3000;
const app = express();

app.use(cors({
    origin:'*',
    credentials:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', authRouter)

app.use('/Dog', dogRouter);
app.use('/DH', dhRouter);

app.use('/', (req, res, next) => {  
    
    res.send('Hello World!');
});


app.listen(port);