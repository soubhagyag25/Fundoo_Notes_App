import client from '../config/redis';

class RedisHelper {
  //! Sets a value in Redis with an optional expiration time.
  public async set(key: string, value: any, expirationInSeconds: number = 3600): Promise<void> {
    try {
      console.log(`Setting data in Redis with key: ${key}`);
      // Convert data to JSON string
      const jsonValue = JSON.stringify(value);
      if (expirationInSeconds) {
        await client.set(key, jsonValue, {
          EX: expirationInSeconds,
        });
      } else {
        await client.set(key, jsonValue);
      }
    } catch (error) {
      console.error('Error setting data in Redis:', error);
      throw new Error('Failed to set data in Redis');
    }
  }
  

  //! Retrieves a value from Redis.
  public async get(key: string): Promise<any> {
    try {
      console.log(`Getting data from Redis with key: ${key}`);
      const data = await client.get(key);
      if (data) {
        try {
          // Attempt to parse JSON
          const parsedData = JSON.parse(data);
          console.log('Data retrieved successfully from Redis.');
          return {
            message: 'Data Retrieved from Redis Successfully',
            data: parsedData,
          };
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          return {
            message: 'Data retrieved is not valid JSON',
            data: null,
          };
        }
      } else {
        console.log('No data found for the given key in Redis.');
        return {
          message: 'No Data Found for the Given Key in Redis',
          data: null,
        };
      }
    } catch (error) {
      console.error('Error getting data from Redis:', error);
      throw new Error('Failed to get data from Redis');
    }
  }
  

  //! Deletes a value from Redis.
  //! We can Use it When a User Logs Out
  public async delete(key: string): Promise<void> {
    try {
      console.log(`Deleting data in Redis with key: ${key}`);
      await client.del(key);
    } catch (error) {
      console.error('Error deleting data from Redis:', error);
      throw new Error('Failed to delete data from Redis');
    }
  }
}

export default new RedisHelper();
