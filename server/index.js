import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'
import dalleRoutes from "./routes/dalle.routes.js"
import fontsRoutes from "./routes/fonts.routes.js"

dotenv.config();

const app = express();

// CORS configuration - allow both development and production
const allowedOrigins = [
    'https://createmyshirt.netlify.app'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser with size limit for security
app.use(express.json({limit: '10mb'})); // Reduced from 50mb
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Basic security headers
app.disable('x-powered-by');

app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/v1/fonts', fontsRoutes)

app.get('/', (req, res) => {
    res.status(200).json({message: "CreateMyShirt API", version: "1.0.0"})
})

app.get('/health', (req, res) => {
    res.status(200).json({status: "healthy"})
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))