const {createClient}=require('redis');

// const redisClient = createClient({
//     username: 'default',
//     password: process.env.REDIS_PASS,
//     socket: {
//         host: 'redis-16749.c258.us-east-1-4.ec2.redns.redis-cloud.com',
//         port: 16749,
//         tls: true
//     }
// });


const redisClient = createClient({
    username: 'default',
    password: '3I7GaRzlVY1wYYZ3kdBHVJtmBZ0liiLu',
    socket: {
        host: 'redis-15992.c263.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15992
    }
});




module.exports=redisClient;


