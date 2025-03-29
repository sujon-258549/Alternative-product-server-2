import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './app/config';

let server: Server; // Explicitly define the type

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);

    // Assign the server instance
    // Assign the server instance
    server = app.listen(config.port, () => {
      console.log(`🔥🔥App listening on port ${config.port}🔥🔥`);
    });
  } catch (error) {
    console.log('Error starting the server:', error);
  }
}

// Call the main function to start the server
main();

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      console.log('Server closed due to unhandled rejection.');
      process.exit(1);
    });
  }
});
