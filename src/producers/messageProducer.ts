import amqp from 'amqplib';

// Function to send a message to RabbitMQ
const sendMessage = async (message: string) => {
  let connection: amqp.Connection | null = null;
  let channel: amqp.Channel | null = null;

  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    const queue = 'emailQueue';

    await channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
    });

    console.log('Message sent to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  } finally {
    // Ensure channel and connection are closed properly
    if (channel) {
      try {
        await channel.close();
      } catch (error) {
        console.error('Error closing channel:', error);
      }
    }
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
};

// Function to format and send email details to RabbitMQ
const sendEmailMessage = async (email: string, subject: string, text: string) => {
  const emailMessage = JSON.stringify({
    to: email,
    subject: subject,
    text: text,
  });

  await sendMessage(emailMessage); // Reuse the existing sendMessage function to send the email details
};

export { sendMessage, sendEmailMessage };
