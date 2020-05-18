"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStore = void 0;
require('custom-env').env(true);
const redis = __importStar(require("redis"));
class RedisStore {
    constructor() {
        this.REDIS_HOST = process.env.REDIS_HOST;
        this.REDIS_PORT = process.env.REDIS_PORT;
    }
    /**
       * creates redis client connection
     * precondition: redis client must be disconnected
       * @param {void}
       * @return {void}
       */
    createConnection() {
        const promise = new Promise((resolve, reject) => {
            this.redisClient = redis.createClient(parseInt(this.REDIS_PORT), this.REDIS_HOST);
            resolve();
        });
        return promise;
    }
    /**
       * inserts key value pair with the entity id as the key and
     * the entity string as the value
       * precondition: redis client must be connected
     *               entity must have unique id field
     * @param {string} - id of entity to insert
       * @param {T} - generic type
     * @return {void}
       * @effects writes to redis store
       */
    insert(entityId, entity) {
        const entityString = JSON.stringify(entity);
        const promise = new Promise((resolve, reject) => {
            this.redisClient.set(entityId, entityString, (err, res) => {
                if (err)
                    reject(err);
                resolve();
            });
        });
        return promise;
    }
    /**
     * updates entity string in redis store with same id (deleting
     * pre-existing key value store and inserting a new one)
     * precondition: redis client must be connected
     * @param {string} - id of entity to update
     * @param {T} - generic type
     * @return {void}
     * @effects writes to redis store
     */
    async update(entityId, entity) {
        await this.delete(entityId);
        await this.insert(entityId, entity);
    }
    /**
       * selects entity string given entity id as the key
       * precondition: redis client must be connected
     *               entity must exist in collection
       * @param {string} - id of entity to select
       * @return {Error / string} - throws error or returns string
     *                            representation of object
       */
    select(entityId) {
        const promise = new Promise((resolve, reject) => {
            this.redisClient.get(entityId, (err, res) => {
                if (err)
                    reject(err);
                const entityString = res;
                resolve(entityString);
            });
        });
        return promise;
    }
    /**
     * deletes entity string from redis store given entity id
     * precondition: redis client must be connected
     *               entity must exist in redis store
     * @param {string} - id of entity to delete
     * @return {void}
     */
    delete(entityId) {
        const promise = new Promise((resolve, reject) => {
            this.redisClient.del(entityId, (err, res) => {
                if (err)
                    reject(err);
                resolve();
            });
        });
        return promise;
    }
    /**
       * determines if entity string is in redis store based on
     * id of entity
     * precondition: redis client must be connected
     *               correct entity id must be passed in
       * @param {object} - entity id field object
       * @returns {boolean} - represents if entity exists
       */
    existById(entityId) {
        const promise = new Promise((resolve, reject) => {
            this.redisClient.exists(entityId, (err, res) => {
                if (err)
                    reject(err);
                const doesEntityExist = res === 1;
                resolve(doesEntityExist);
            });
        });
        return promise;
    }
    /**
     * clears redis store of entity string key value pairs
     * precondition: redis client must be connected
     * @param {void}
     * @return {void}
     * @effects clears redis store
     */
    clear() {
        const promise = new Promise((resolve, reject) => {
            this.redisClient.flushdb((err, res) => {
                if (err)
                    reject(err);
                resolve();
            });
        });
        return promise;
    }
    /**
     * closes redis client connection
     * precondition: redis client must be connected
     * @param {void}
     * @return {void}
     */
    closeConnection() {
        this.redisClient.quit();
    }
}
exports.RedisStore = RedisStore;
