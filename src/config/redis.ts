import { createClient } from 'redis';
import Logger from './logger';

const logger = Logger.logger;

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

client.on('connect', () => {
  logger.info('Connected to Redis');
});

client.on('error', (err) => {
  logger.error('Redis connection error:', err);
});

client.connect();

export default client;
