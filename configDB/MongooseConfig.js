/**
 * Created by erikzubia on 2/22/17.
 */
var instance;
var config = require('./../environments/EnvironmentsConfig').get(process.env.NODE_ENV);

function createInstance() {
    var mongoose= require('mongoose');
    mongoose.connect(config.database);
    return mongoose;
}

function getMainMongoose() {
    if (instance) {
        return instance;
    } else {
        instance = createInstance();
        return instance;
    }
}

module.exports = {
    getInstance: function (database) {
        if (!instance) {
            console.log("Entre al crear instancia");
            instance = getMainMongoose();
        }
        return instance;
    }
};
