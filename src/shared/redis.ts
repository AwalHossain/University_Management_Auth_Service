//import redis and create a redis client

import { createClient } from 'redis'
import config from '../config'

const redisClient = createClient({
    url: config.redis.url,
})


const redisPubClient = createClient({
    url: config.redis.url,
})

const redisSubClient = createClient({
    url: config.redis.url,
})

redisClient.on('error', (err) => {
    console.log('Redis error: ', err)
}
)

redisClient.on('connect', () => {
    console.log('Redis client connected')
}
)

const connect = async () => {
    await redisClient.connect();
    await redisPubClient.connect();
    await redisSubClient.connect()
}

const set = async (key: string, value: string): Promise<void> => {
    await redisClient.set(key, value);
}

const get = async (key: string): Promise<string | null> => {
    return await redisClient.get(key);
}

const del = async (key: string): Promise<void> => {
    await redisClient.del(key);
}


const disconnect = async (): Promise<void> => {
    await redisClient.quit();
    await redisPubClient.quit();
    await redisSubClient.quit();
}

const setAccessTokne = async (userId: string, token: string): Promise<void> => {
    const key = `access-token:${userId}`;
    await redisClient.set(key, token, { EX: Number(config.redis.expires_in) });
}

const getAccessToken = async (userId: string): Promise<string | null> => {
    const key = `access-token:${userId}`;
    return await redisClient.get(key);
}

const delAccessToken = async (userId: string): Promise<void> => {
    const key = `access-token:${userId}`;
    await redisClient.del(key);
}


export const RedisClient = {
    connect,
    disconnect,
    set,
    get,
    del,
    publish: redisPubClient.publish.bind(redisPubClient),
    subscribe: redisSubClient.subscribe.bind(redisSubClient),
    setAccessTokne,
    getAccessToken,
    delAccessToken
}




