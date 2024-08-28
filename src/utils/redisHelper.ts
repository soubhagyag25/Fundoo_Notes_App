import client from '../config/redis';

class RedisHelper {
  public async set(key: string, value: string) {
    try {
      await client.set(key, value);
    } catch (error) {
      console.error('Error setting data in Redis:', error);
      throw new Error('Failed to set data in Redis');
    }
  }

  public async get(key: string) {
    try {
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting data from Redis:', error);
      throw new Error('Failed to get data from Redis');
    }
  }

  public async delete(key: string) {
    try {
      await client.del(key);
    } catch (error) {
      console.error('Error deleting data in Redis:', error);
      throw new Error('Failed to delete data from Redis');
    }
  }
}

export default new RedisHelper();
