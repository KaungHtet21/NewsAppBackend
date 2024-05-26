import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'colors';
import connectDB from './config/db.js';

dotenv.config();

connectDB()

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function(req,res) {
    console.log(req.body)
    console.log('Endpoint is working fine')
})

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    () => console.log(`Server is connected in ${process.env.NODE_ENV} mode on port ${PORT}`.red)
);
