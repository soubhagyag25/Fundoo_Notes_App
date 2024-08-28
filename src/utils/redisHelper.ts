// src/utils/RedisHelper.ts

import client from '../config/redis';

class RedisHelper {

  //! Sets a value in Redis with an optional expiration time.
  public async set(key: string, value: string, expirationInSeconds?: number): Promise<void> {
    try {
      if (expirationInSeconds) {
        await client.set(key, value, {
          EX: expirationInSeconds
        });
      } else {
        await client.set(key, value);
      }
    } catch (error) {
      console.error('Error setting data in Redis:', error);
      throw new Error('Failed to set data in Redis');
    }
  }
  //! Retrieves a value from Redis.
  public async get(key: string): Promise<any> {
    try {
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting data from Redis:', error);
      throw new Error('Failed to get data from Redis');
    }
  }
  //! Deletes a value from Redis.
  public async delete(key: string): Promise<void> {
    try {
      await client.del(key);
    } catch (error) {
      console.error('Error deleting data in Redis:', error);
      throw new Error('Failed to delete data from Redis');
    }
  }
}

export default new RedisHelper();
