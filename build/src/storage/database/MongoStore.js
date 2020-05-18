"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoStore = void 0;
require('custom-env').env(true);
const mongodb_1 = require("mongodb");
class MongoStore {
    constructor(databaseName, collectionName) {
        this.MONGO_HOST = process.env.MONGO_HOST;
        this.MONGO_PORT = process.env.MONGO_PORT;
        this.MONGO_URL = 'mongodb://' + this.MONGO_HOST + ':' + this.MONGO_PORT;
        this.MAX_RESULTS = 1;
        this.collectionName = collectionName;
        this.databaseName = databaseName;
    }
    /**
     * creates mongodb client connection
   * precondition: mongodb client must be disconnected
     * @param {void}
     * @return {void}
     */
    createConnection() {
        const promise = new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(this.MONGO_URL, {
                useUnifiedTopology: true
            }, (err, dbClient) => {
                if (err)
                    reject(err);
                this.mongoClient = dbClient;
                this.entityDatabase = this.mongoClient.db(this.databaseName);
                this.entityCollection = this.entityDatabase.collection(this.collectionName);
                resolve();
            });
        });
        return promise;
    }
    /**
     * inserts entity object into mongodb collection
     * precondition: mongodb client must be connected
   *               entity must have unique id
     * @param {T} - generic type
   * @return {void}
     * @effects add '_id' field to obj
     * @effects writes to mongodb collection
     */
    insert(entity) {
        const promise = new Promise((resolve, reject) => {
            this.entityCollection.insertOne(entity, (err, res) => {
                if (err)
                    reject(err);
                resolve();
            });
        });
        return promise;
    }
    /**
     * updates entity object in mongodb collection with same id
     * precondition: mongodb client must be connected
     *               entity must exist in collection
     * @param {string} - id of entity to update
     * @param {T} - generic type
     * @return {void}
     * @effects writes to mongodb collection
     */
    update(entityId, entity) {
        const promise = new Promise((resolve, reject) => {
            this.entityCollection.replaceOne({ 'id': entityId }, entity, (err, res) => {
                if (err)
                    reject(err);
                resolve();
            });
        });
        return promise;
    }
    /**
     * selects entity object given entity id
     * precondition: mongodb client must be connected
   *               entity must exist in collection
     * @param {string} - id of entity to select
     * @return {string} - entity string representation
   *                            representation of object
     */
    select(entityId) {
        const promise = new Promise((resolve, reject) => {
            this.entityCollection.find({ 'id': entityId }, {
                projection: {
                    _id: 0
                }
            }).limit(this.MAX_RESULTS).toArray((err, entities) => {
                if (err)
                    reject(err);
                const entityString = JSON.stringify(entities[0]);
                resolve(entityString);
            });
        });
        return promise;
    }
    /**
       * deletes entity object from collection given entity id
       * precondition: mongodb client must be connected and
     *               entity must exist in collection
       * @param {string} - id of entity to delete
       * @return {void}
       */
    delete(entityId) {
        const promise = new Promise((resolve, reject) => {
            this.entityCollection.deleteOne({ 'id': entityId }, (err, res) => {
                if (err)
                    reject(err);
                resolve();
            });
        });
        return promise;
    }
    /**
     * determines if entity is in mongodb collection based
   * parameter object
   * precondition: mongodb client must be connected
   *               correct paramater fields for object must be passed in
     * @param {object} - entity id field object
     * @returns {boolean} - represents if entity exists
     */
    existByField(field) {
        const promise = new Promise((resolve, reject) => {
            this.entityCollection.find(field).limit(1).count((err, entityCount) => {
                if (err)
                    reject(err);
                const doesEntityExist = entityCount >= 1;
                resolve(doesEntityExist);
            });
        });
        return promise;
    }
    /**
       * returns the number of entity objects in mongodb collection
     * precondition: mongodb client must be connected
       * @param {void}
       * @returns {number} - entity count in collection
       */
    getCount() {
        const promise = new Promise((resolve, reject) => {
            this.entityCollection.countDocuments((err, entityCount) => {
                if (err)
                    reject(err);
                resolve(entityCount);
            });
        });
        return promise;
    }
    /**
     * clears mongodb collection of objects
     * precondition: mongodb client must be connected
     * @param {void}
     * @return {void}
     * @effects clears mongodb collection
     */
    clear() {
        const promise = new Promise((resolve, reject) => {
            this.entityCollection.deleteMany({}, (err, isDropSuccessful) => {
                if (err)
                    reject(err);
                if (isDropSuccessful)
                    resolve();
            });
        });
        return promise;
    }
    /**
     * drops mongodb collection
     * precondition: mongodb client must be connected
     * @param {void}
     * @return {void}
     * @effects clears mongodb collection
     */
    dropCollection() {
        const promise = new Promise((resolve, reject) => {
            this.entityCollection.drop((err, isDropSuccessful) => {
                if (err)
                    reject(err);
                if (isDropSuccessful)
                    resolve();
            });
        });
        return promise;
    }
    /**
     * closes mongodb client connection
     * precondition: mongodb client must be connected
     * @param {void}
     * @return {void}
     */
    closeConnection() {
        this.mongoClient.close();
    }
}
exports.MongoStore = MongoStore;
