const {createClient}=require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-16749.c258.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 16749
    }
});



module.exports=redisClient;


