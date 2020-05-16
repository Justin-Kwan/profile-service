"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const ResponseConstants_1 = require("./ResponseConstants");
class UserService {
    constructor(userRepository, userFactory, userSerializer) {
        this.userRepository = userRepository;
        this.userFactory = userFactory;
        this.userSerializer = userSerializer;
        this.userRepository.initDatastoreObjects();
    }
    /**
     * creates new user user
     * @param {string} - id of user to create
     * @param {any} - JSON object of user fields for new user
     * @return {object} - JSON response object (error or success)
     */
    async createUser(userId, userParams) {
        const newEmail = userParams.email;
        const newMobileNum = userParams.mobileNum;
        const doesIdExist = await this.userRepository
            .existById(userId);
        const doesEmailExist = await this.userRepository
            .existByEmail(newEmail);
        const doesMobileNumExist = await this.userRepository
            .existByMobileNum(newMobileNum);
        if (doesIdExist)
            return ResponseConstants_1.RESOURCE_ID_ALREADY_EXISTS;
        if (doesEmailExist)
            return ResponseConstants_1.RESOURCE_EMAIL_ALREADY_EXISTS;
        if (doesMobileNumExist)
            return ResponseConstants_1.RESOURCE_MOBILE_NUM_ALREADY_EXISTS;
        const user = await this.userFactory
            .createNew(userId, JSON.stringify(userParams));
        await this.userRepository.insert(user);
        return ResponseConstants_1.RESOURCE_CREATED;
    }
    /**
     * updates user user by user id, given new user
     * field arguments
     * @param {string} - id of user to update
     * @param {any} - JSON object of user fields to update
     * @return {object} - JSON response object (error or user)
     */
    async updateUser(userId, userParams) {
        const newEmail = userParams.email;
        const newMobileNum = userParams.mobileNum;
        const doesIdExist = await this.userRepository
            .existById(userId);
        const doesEmailExist = await this.userRepository
            .existByEmail(newEmail);
        const doesMobileNumExist = await this.userRepository
            .existByMobileNum(newMobileNum);
        if (!doesIdExist)
            return ResponseConstants_1.RESOURCE_NOT_FOUND;
        const user = await this.userRepository.select(userId);
        const isEmailDifferent = newEmail !== user.getEmail();
        const isMobileNumDifferent = newMobileNum !== user.getMobileNum();
        // if new email provided already exists
        if (isEmailDifferent && doesEmailExist)
            return ResponseConstants_1.RESOURCE_EMAIL_ALREADY_EXISTS;
        // if new mobile number provided already exists
        if (isMobileNumDifferent && doesMobileNumExist)
            return ResponseConstants_1.RESOURCE_MOBILE_NUM_ALREADY_EXISTS;
        user.updateFields(userParams);
        this.userRepository.update(user);
        return {
            body: this.userSerializer.serializeForClient(user),
            code: 200
        };
    }
    /**
     * gets user user by user id
     * @param {string} - id of user to get
     * @return {object} - JSON response object (error or user)
     */
    async getUser(userId) {
        const doesIdExist = await this.userRepository
            .existById(userId);
        if (!doesIdExist)
            return ResponseConstants_1.RESOURCE_NOT_FOUND;
        const user = await this.userRepository.select(userId);
        return {
            body: this.userSerializer.serializeForClient(user),
            code: 200
        };
    }
    /**
     * deletes user user by user id
     * @param {string} - id of user to delete
     * @return {object} - JSON response object (error or success)
     */
    async deleteUser(userId) {
        const doesIdExist = await this.userRepository
            .existById(userId);
        if (!doesIdExist)
            return ResponseConstants_1.RESOURCE_NOT_FOUND;
        await this.userRepository.delete(userId);
        return ResponseConstants_1.RESOURCE_DELETED;
    }
}
exports.UserService = UserService;
