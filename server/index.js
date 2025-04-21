import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js'; // Import the database connection function
import 'dotenv/config'; // Import dotenv to load environment variables
import userRouter from './routes/userRoute.js'; // Import the user router

const app = express();
const port = process.env.PORT || 4000; 

await connectDB() // Connect to MongoDB


// Allow multiple origins
const allowedOrigins = ['http://localhost:5173'] 

//Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins, 
    credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent
}))

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/user', userRouter); // Use the user router for user-related routes

app .listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
    })
