import dotenv from 'dotenv';
import { prisma } from './src/utils/prisma';
import app from './src/app';

dotenv.config();

const PORT = process.env.PORT || 8000;

// Test database connection and start the server
async function startServer() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}

startServer();
