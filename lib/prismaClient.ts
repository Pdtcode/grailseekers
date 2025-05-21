import { PrismaClient } from './generated/prisma';
import { Pool } from '@neondatabase/serverless';

// Configure PrismaClient with Neon serverless adapter
const connectionString = process.env.DATABASE_URL;

// Create a singleton instance of the PrismaClient
let prisma: PrismaClient;

// Log database connection details for debugging (without password)
console.log('Connecting to database...');
if (connectionString) {
  // Extract and log only the host part to avoid showing credentials
  const url = new URL(connectionString);
  console.log(`Database host: ${url.host}`);
}

if (process.env.NODE_ENV === 'production') {
  // In production, create a new client
  prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
} else {
  // Prevent multiple instances of Prisma Client in development
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = (global as any).prisma;
}

// Handle connection errors
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

export default prisma;