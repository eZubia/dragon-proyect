/**
 * Created by erikzubia on 3/2/17.
 */

var config = {
    production: {
        session: {
            key: 'the.express.session.id',
            secret: 'something.super.secret'
        },
        database: 'mongodb://scrumAdmin:12345@ds035806.mlab.com:35806/scrum_sensei'
    },
    default: {
        session: {
            key: 'the.express.session.id',
            secret: 'something.super.secret'
        },
        database: 'mongodb://127.0.0.1:27017/scrum_sensei',
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}