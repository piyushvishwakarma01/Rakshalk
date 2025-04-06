    import express from 'express';
    import cors from 'cors';
    import helmet from 'helmet';
    import morgan from 'morgan';
    import { errorHandler } from './middleware/errorMiddleware';
    import userRoutes from "./routes/userRoutes"
    import authRoutes from "./routes/authRoutes"
    import cookieParser from "cookie-parser";
    // Initialize Express app
    const app = express();

    // Middleware
    app.use(cors({
        credentials:true,
        origin: "*"
    }));
    app.use(express.static("public"))
    app.use(helmet()); // Security Headers
    app.use(morgan('dev')); // Logger
    app.use(cookieParser    ())
    app.use(express.json()); // JSON Parsing
    app.use(errorHandler);
    // Default Route
    app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
    app.get('/', (req, res) => {
        res.send('API is running...');
    });

    export default app;
