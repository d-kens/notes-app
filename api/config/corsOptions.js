const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'))
        }
    },
    credentials: true, // sets the Access-Control-Allow-Credential
    optionsSuccessStatus: 200
}

module.exports = corsOptions