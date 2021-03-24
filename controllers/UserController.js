const DeviceModel = require("../models/device/Device");
const Controller = require("./Controller");

class UserContorller extends Controller {

    static async getDevices() {
        try {
            
            return await DeviceModel.find();
        } catch (err) {
            throw err;
        }
    }

    static post(data) {
        return data;
    }
    


}

module.exports = UserContorller;