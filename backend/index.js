
import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import testRoutes from "./routes/test.js";
import userRoutes from "./routes/user.js";
import saveRoutes from "./routes/save.js";
import chatRoutes from "./routes/chat.js";
import contactRoutes from "./routes/contact.js";
import messageRoutes from "./routes/message.js";
import cookieParser from 'cookie-parser';
import DBConnection from "./database/db_connection.js";
import cors from 'cors';



const app = express();
const PORT = process.env.PORT || 8000;


//Database connection
DBConnection();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://real-estate-website-client.onrender.com',
    credentials: true,
}));


app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/test', testRoutes);
app.use('/api/user',userRoutes);
app.use('/api/save',saveRoutes);
app.use('/api/chats',chatRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/contact',contactRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
