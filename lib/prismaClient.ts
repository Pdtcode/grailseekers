import { PrismaClient } from './generated/prisma';
import { Pool } from '@neondatabase/serverless';

// This is a server-side only module
// Make sure this file is only imported on the server side
if (typeof window !== 'undefined') {
  throw new Error('This file is meant to be used only on the server side');
}

// Configure PrismaClient with Neon serverless adapter
const connectionString = process.env.DATABASE_URL;

// Modify the connection string to add longer timeout for Neon
let modifiedConnectionString = connectionString;
if (connectionString && connectionString.includes('neon.tech')) {
  // Add connection parameters for Neon if not already present
  if (!connectionString.includes('connect_timeout')) {
    const separator = connectionString.includes('?') ? '&' : '?';
    modifiedConnectionString = `${connectionString}${separator}connect_timeout=30&pool_timeout=30&socket_timeout=30`;
  }
  console.log('Using Neon database with extended timeouts');
}

// Create a singleton instance of the PrismaClient
let prisma: PrismaClient;

// Determine logging levels based on environment
const getPrismaLogLevels = () => {
  // By default, only log errors and warnings
  const logLevels = ['error', 'warn'];
  
  // Only add query logging if explicitly enabled via env variable
  if (process.env.PRISMA_LOG_QUERIES === 'true') {
    logLevels.push('query');
  }
  
  return logLevels;
};

// Custom datasource configuration for Neon
const datasourceOptions: any = {};
if (modifiedConnectionString && modifiedConnectionString.includes('neon.tech')) {
  console.log('Configuring Prisma for Neon connection pooling');
  datasourceOptions.url = modifiedConnectionString;
}

// Log database connection details for debugging (without password)
console.log('Connecting to database...');
if (connectionString) {
  // Extract and log only the host part to avoid showing credentials
  const url = new URL(connectionString);
  console.log(`Database host: ${url.host}`);
}

// Create Prisma client with custom configuration
const createPrismaClient = () => {
  const prismaOptions: any = {
    log: getPrismaLogLevels(),
  };
  
  // Only add datasources if we have a custom URL
  if (Object.keys(datasourceOptions).length > 0) {
    prismaOptions.datasources = {
      db: {
        url: datasourceOptions.url
      }
    };
  }
  
  const client = new PrismaClient(prismaOptions);

  // Add connection retry logic
  client.$use(async (params, next) => {
    try {
      return await next(params);
    } catch (error: any) {
      if (
        error.message && 
        (error.message.includes("Can't reach database server") || 
         error.message.includes("Connection refused"))
      ) {
        console.error('Database connection error, retrying...', error.message);
        
        // Wait a moment for the database to reconnect
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          // Attempt to reconnect
          await client.$connect();
          // Retry the operation that failed
          return await next(params);
        } catch (reconnectError) {
          console.error('Failed to reconnect to the database:', reconnectError);
          throw error; // If reconnection fails, throw the original error
        }
      }
      throw error;
    }
  });

  return client;
};

if (process.env.NODE_ENV === 'production') {
  // In production, create a new client
  prisma = createPrismaClient();
} else {
  // Prevent multiple instances of Prisma Client in development
  if (!(global as any).prisma) {
    (global as any).prisma = createPrismaClient();
  }
  prisma = (global as any).prisma;
}

// Handle connection errors - attach this but don't await it
// This allows the app to start even if the database is temporarily unavailable
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    console.log('Application will retry connections automatically when needed');
  });

export default prisma;